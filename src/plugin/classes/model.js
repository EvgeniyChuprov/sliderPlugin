/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
import Observer from './observer';

class Model extends Observer {
  processEvent(event, ...arg) {
    switch (event) {
      case 'parametersChanged':
        this._normalizeInputData(arg[0]);
        break;
      case 'coordinatesChanged':
        this._calculateCoordinates(arg[0], arg[1], arg[2]);
        break;
      default:
        break;
    }
  }

  _normalizeInputData(opt) {
    this._addMissingValues(opt);
    this._validateMinimumValue();
    this._validateMaximumValue();
    this._validateStepValue();
    this._validateMinorHandleValue();
    this._validateMajorHandleValue();
    this.publish('modelStateChanged', this._calculateSliderParameters(), this.options);
  }

  _addMissingValues(opt) {
    this.options = {
      min: 0,
      max: 100,
      step: 1,
      minorHandleValue: 10,
      majorHandleValue: 90,
      vertical: false,
      tooltip: true,
      severalHandles: true,
      onChange: null,
      update: null,
    };

    if (typeof opt.min === 'number') {
      this.options.min = opt.min;
    }
    if (typeof opt.max === 'number') {
      this.options.max = opt.max;
    }
    if (typeof opt.step === 'number') {
      this.options.step = opt.step;
    }
    if (typeof opt.minorHandleValue === 'number') {
      this.options.minorHandleValue = opt.minorHandleValue;
    }
    if (typeof opt.majorHandleValue === 'number') {
      this.options.majorHandleValue = opt.majorHandleValue;
    }
    if (typeof opt.vertical === 'boolean') {
      this.options.vertical = opt.vertical;
    }
    if (typeof opt.tooltip === 'boolean') {
      this.options.tooltip = opt.tooltip;
    }
    if (typeof opt.severalHandles === 'boolean') {
      this.options.severalHandles = opt.severalHandles;
    }
    this.options.onChange = opt.onChange;
    this.options.update = opt.update;
  }

  _validateMinimumValue() {
    if (this.options.min > this.options.minorHandleValue) {
      this.options.min = this.options.minorHandleValue;
    }
    if (this.options.min >= this.options.max) {
      this.options.min = this.options.max - this.options.step;
    }
  }

  _validateMaximumValue() {
    if (this.options.severalHandles) {
      if (this.options.max < this.options.majorHandleValue) {
        this.options.max = this.options.majorHandleValue;
      }
    }

    if (this.options.max < this.options.minorHandleValue) {
      this.options.max = this.options.minorHandleValue;
    }
    if (this.options.min >= this.options.max) {
      this.options.max = this.options.min + this.options.step;
    }
  }

  _validateStepValue() {
    if (this._isChangeAllowedForStep()) {
      this.options.step = 1;
    }
  }

  _isChangeAllowedForStep() {
    return this.options.step < 0 || this.options.step > (this.options.max - this.options.min);
  }

  _validateMinorHandleValue() {
    if (this.options.severalHandles) {
      if (this.options.minorHandleValue + this.options.step > this.options.majorHandleValue) {
        this.options.minorHandleValue = this.options.majorHandleValue - this.options.step;
      }
      if (this.options.minorHandleValue >= this.options.majorHandleValue) {
        this.options.minorHandleValue = this.options.majorHandleValue - this.options.step;
      }
    }

    if (this.options.minorHandleValue > this.options.max) {
      this.options.minorHandleValue = this.options.max;
    }

    if (this.options.minorHandleValue < this.options.min) {
      this.options.minorHandleValue = this.options.min;
    }
  }

  _validateMajorHandleValue() {
    if (this.options.minorHandleValue > this.options.majorHandleValue - this.options.step) {
      this.options.majorHandleValue = this.options.minorHandleValue + this.options.step;
    }
    if (this.options.majorHandleValue <= this.options.minorHandleValue) {
      this.options.majorHandleValue = this.options.minorHandleValue + this.options.step;
    }
    if (this.options.majorHandleValue > this.options.max) {
      this.options.majorHandleValue = this.options.max;
    }
    if (!this.options.severalHandles) {
      this.options.majorHandleValue = this.options.max;
    }
  }

  _calculateSliderParameters() {
    const minPoint = ((this.options.minorHandleValue - this.options.min) * 100)
    / (this.options.max - this.options.min);
    const maxPoint = ((this.options.majorHandleValue - this.options.min) * 100)
    / (this.options.max - this.options.min);
    const step = 100 / ((this.options.max - this.options.min)
    / this.options.step);
    const upright = this.options.vertical;
    const toolMin = this.options.minorHandleValue;
    const toolMax = this.options.majorHandleValue;
    const tool = this.options.tooltip;
    return {
      minPoint,
      maxPoint,
      step,
      upright,
      toolMin,
      toolMax,
      severalHandles: this.options.severalHandles,
      tool,
    };
  }

  _calculateMovingCoordinatesByClick(newTop, length) {
    const shiftPercentage = (newTop * 100) / length;
    const middle = (this.options.max - this.options.min) / 2;
    const positionSlider = this.options.step * Math.round(shiftPercentage
     / this._calculateSliderParameters().step) + this.options.min;

    if (this.options.severalHandles) {
      if (positionSlider - this.options.min < middle) {
        if (positionSlider - this.options.min < this.options.majorHandleValue) {
          this.options.minorHandleValue = positionSlider;
        }
      } else {
        // eslint-disable-next-line no-lonely-if
        if (positionSlider - this.options.min > this.options.minorHandleValue) {
          this.options.majorHandleValue = positionSlider;
        }
      }
    } else {
      this.options.minorHandleValue = positionSlider;
    }
    this.publish('modelStateChanged', this._calculateSliderParameters(), this.options);
  }

  _calculateMovingCoordinates(newTop, length, moveMinorHandle) {
    const shiftPercentage = (newTop * 100) / length;
    const value = this.options.step * Math.round(shiftPercentage
    / this._calculateSliderParameters().step) + this.options.min;

    if (moveMinorHandle) {
      if (value <= this.options.max) {
        if (value >= this.options.min
          && value <= this.options.majorHandleValue - this.options.step) {
          if (value !== this.options.minorHandleValue) {
            this.options.minorHandleValue = value;
            this.publish('modelStateChanged', this._calculateSliderParameters(), this.options);
          }
        }
      }
    } else if (!moveMinorHandle) {
      if (value >= this.options.min) {
        if (value <= this.options.max
          && value >= this.options.minorHandleValue + this.options.step) {
          if (value !== this.options.majorHandleValue) {
            this.options.majorHandleValue = value;
            this.publish('modelStateChanged', this._calculateSliderParameters(), this.options);
          }
        }
      }
    }
  }

  _calculateCoordinates(newTop, length, moveMinorHandle) {
    if (typeof moveMinorHandle === 'boolean') {
      this._calculateMovingCoordinates(newTop, length, moveMinorHandle);
    } else if (moveMinorHandle === null) {
      this._calculateMovingCoordinatesByClick(newTop, length);
    }
  }
}

export default Model;
