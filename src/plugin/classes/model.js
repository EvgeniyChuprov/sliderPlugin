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
    const {
      min, max, step, minorHandleValue,
      majorHandleValue, vertical, tooltip,
      isDouble, onChange, update,
    } = opt;

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

    if (typeof min === 'number') {
      this.options.min = min;
    }
    if (typeof max === 'number') {
      this.options.max = max;
    }
    if (typeof step === 'number') {
      this.options.step = step;
    }
    if (typeof minorHandleValue === 'number') {
      this.options.minorHandleValue = minorHandleValue;
    }
    if (typeof majorHandleValue === 'number') {
      this.options.majorHandleValue = majorHandleValue;
    }
    if (typeof vertical === 'boolean') {
      this.options.vertical = vertical;
    }
    if (typeof tooltip === 'boolean') {
      this.options.tooltip = tooltip;
    }
    if (typeof isDouble === 'boolean') {
      this.options.isDouble = isDouble;
    }
    this.options.onChange = onChange;
    this.options.update = update;
  }

  _validateMinimumValue() {
    const {
      min, max, step, minorHandleValue,
    } = this.options;

    if (min > minorHandleValue) {
      this.options.min = minorHandleValue;
    }
    if (min >= max) {
      this.options.min = max - step;
    }
  }

  _validateMaximumValue() {
    const {
      min, max, step, minorHandleValue,
      majorHandleValue, isDouble,
    } = this.options;

    if (isDouble) {
      if (max < majorHandleValue) {
        this.options.max = majorHandleValue;
      }
    }

    if (max < minorHandleValue) {
      this.options.max = minorHandleValue;
    }
    if (min >= max) {
      this.options.max = min + step;
    }
  }

  _validateStepValue() {
    if (this._isChangeAllowedForStep()) {
      this.options.step = 1;
    }
  }

  _isChangeAllowedForStep() {
    const {
      min, max, step,
    } = this.options;

    return step < 0 || step > (max - min);
  }

  _validateMinorHandleValue() {
    const {
      min, max, step, minorHandleValue,
      majorHandleValue, isDouble,
    } = this.options;

    if (isDouble) {
      if (minorHandleValue + step > majorHandleValue) {
        this.options.minorHandleValue = majorHandleValue - step;
      }
      if (minorHandleValue >= majorHandleValue) {
        this.options.minorHandleValue = majorHandleValue - step;
      }
    }

    if (minorHandleValue > max) {
      this.options.minorHandleValue = max;
    }

    if (minorHandleValue < min) {
      this.options.minorHandleValue = min;
    }
  }

  _validateMajorHandleValue() {
    const {
      max, step, minorHandleValue,
      majorHandleValue, isDouble,
    } = this.options;

    if (minorHandleValue > majorHandleValue - step) {
      this.options.majorHandleValue = minorHandleValue + step;
    }
    if (majorHandleValue <= minorHandleValue) {
      this.options.majorHandleValue = minorHandleValue + step;
    }
    if (majorHandleValue > max) {
      this.options.majorHandleValue = max;
    }
    if (!isDouble) {
      this.options.majorHandleValue = max;
    }
  }

  _calculateSliderParameters() {
    const {
      min, max, majorHandleValue,
      minorHandleValue, vertical,
      isDouble, tooltip,
    } = this.options;

    const minPoint = ((minorHandleValue - min) * 100)
    / (max - min);
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
    const {
      min, max, step, minorHandleValue,
      majorHandleValue, isDouble,
    } = this.options;

    const shiftPercentage = (newTop * 100) / length;
    const middle = (max - min) / 2;
    const positionSlider = step * Math.round(shiftPercentage
     / this._calculateSliderParameters().step) + min;

    if (isDouble) {
      if (positionSlider - min < middle) {
        if (positionSlider < majorHandleValue) {
          this.options.minorHandleValue = positionSlider;
        }
      } else {
        // eslint-disable-next-line no-lonely-if
        if (positionSlider > minorHandleValue) {
          if (positionSlider <= max) {
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
    const {
      min, max, step, minorHandleValue,
      majorHandleValue, isDouble,
    } = this.options;

    const shiftPercentage = (newTop * 100) / length;
    const value = step * Math.round(shiftPercentage
    / this._calculateSliderParameters().step) + min;

    if (moveMinorHandle) {
      if (value <= max && value >= min) {
        if (isDouble) {
          if (value <= majorHandleValue - step) {
            this.options.minorHandleValue = value;
            this.notifySubscribers('modelStateChanged', this._calculateSliderParameters(), this.options);
          }
        } else {
          this.options.minorHandleValue = value;
          this.notifySubscribers('modelStateChanged', this._calculateSliderParameters(), this.options);
        }
      }
    } else if (!moveMinorHandle) {
      if (value >= min) {
        if (value <= max
          && value >= minorHandleValue + step) {
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
