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
    this._validateMinorHandleValue();
    this._validateMajorHandleValue();
    this._validateMinimumValue();
    this._validateMaximumValue();
    this._validateStepValue();

    this.notifySubscribers('modelStateChanged', this._calculateSliderParameters(), this.options);
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
      isDouble: true,
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
    if (typeof opt.isDouble === 'boolean') {
      this.options.isDouble = opt.isDouble;
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
    if (this.options.isDouble) {
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
    if (this.options.isDouble) {
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
    if (!this.options.isDouble) {
      this.options.majorHandleValue = this.options.max;
    }
  }

  _calculateSliderParameters() {
    const {
      min, max, majorHandleValue,
      minorHandleValue, vertical,
      isDouble, tooltip,
    } = this.options;

    const minPoint = ((minorHandleValue - min) * 100)
    / (max - this.options.min);
    const maxPoint = ((majorHandleValue - min) * 100)
    / (max - this.options.min);
    const step = 100 / ((max - min)
    / this.options.step);
    const toolMin = minorHandleValue;
    const toolMax = majorHandleValue;
    return {
      minPoint,
      maxPoint,
      step,
      vertical,
      toolMin,
      toolMax,
      isDouble,
      tooltip,
    };
  }

  _calculateMovingCoordinatesByClick(newTop, length) {
    const shiftPercentage = (newTop * 100) / length;
    const middle = (this.options.max - this.options.min) / 2;
    const positionSlider = this.options.step * Math.round(shiftPercentage
     / this._calculateSliderParameters().step) + this.options.min;

    if (this.options.isDouble) {
      if (positionSlider - this.options.min < middle) {
        if (positionSlider < this.options.majorHandleValue) {
          this.options.minorHandleValue = positionSlider;
        }
      } else {
        // eslint-disable-next-line no-lonely-if
        if (positionSlider > this.options.minorHandleValue) {
          if (positionSlider <= this.options.max) {
            this.options.majorHandleValue = positionSlider;
          }
        }
      }
    } else {
      this.options.minorHandleValue = positionSlider;
    }
    this.notifySubscribers('modelStateChanged', this._calculateSliderParameters(), this.options);
  }

  _calculateMovingCoordinates(newTop, length, moveMinorHandle) {
    const shiftPercentage = (newTop * 100) / length;
    const value = this.options.step * Math.round(shiftPercentage
    / this._calculateSliderParameters().step) + this.options.min;

    if (moveMinorHandle) {
      if (value <= this.options.max && value >= this.options.min) {
        if (this.options.isDouble) {
          if (value <= this.options.majorHandleValue - this.options.step) {
            this.options.minorHandleValue = value;
            this.notifySubscribers('modelStateChanged', this._calculateSliderParameters(), this.options);
          }
        } else {
          this.options.minorHandleValue = value;
          this.notifySubscribers('modelStateChanged', this._calculateSliderParameters(), this.options);
        }
      }
    } else if (!moveMinorHandle) {
      if (value >= this.options.min) {
        if (value <= this.options.max
          && value >= this.options.minorHandleValue + this.options.step) {
          this.options.majorHandleValue = value;
          this.notifySubscribers('modelStateChanged', this._calculateSliderParameters(), this.options);
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
