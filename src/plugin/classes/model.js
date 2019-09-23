/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
import EventEmitter from 'event-emitter';

class Model {
  _normalizeInputData(opt) {
    this._addMissingValues(opt);
    this._validateMinorHandleValue();
    this._validateMajorHandleValue();
    this._validateMinimumValue();
    this._validateMaximumValue();
    this._validateStepValue();

    this.emit('modelStateChanged', this.options);
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

  _calculateCoordinates(upgrade) {
    const {
      positionSlider, middle, moveMinorHandle,
    } = upgrade;

    const {
      min, max, step, minorHandleValue,
      majorHandleValue, isDouble,
    } = this.options;

    if (typeof moveMinorHandle === 'boolean') {
      if (moveMinorHandle) {
        if (positionSlider <= max && positionSlider >= min) {
          if (isDouble) {
            if (positionSlider <= majorHandleValue - step) {
              this.options.minorHandleValue = positionSlider;

              this.emit('modelStateChanged', this.options);
            }
          } else {
            this.options.minorHandleValue = positionSlider;

            this.emit('modelStateChanged', this.options);
          }
        }
      } else if (!moveMinorHandle) {
        if (positionSlider >= min) {
          if (positionSlider <= max
            && positionSlider >= minorHandleValue + step) {
            this.options.majorHandleValue = positionSlider;

            this.emit('modelStateChanged', this.options);
          }
        }
      }
    } else if (moveMinorHandle === null) {
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
      this.emit('modelStateChanged', this.options);
    }
  }
}

EventEmitter(Model.prototype);
export default Model;
