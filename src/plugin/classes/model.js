import EventEmitter from 'event-emitter';

class Model {
  setOptions(opt) {
    this._addMissingValues(opt);
    this._validateStepValue();
    this._validateMinimumValue();
    this._validateMaximumValue();
    this._validateMinorHandleValue();
    this._validateMajorHandleValue();

    this.emit('modelStateChanged', this.options);
  }

  getOptions() {
    return this.options;
  }

  _addMissingValues(opt) {
    const {
      min, max, step, minorHandleValue,
      majorHandleValue, vertical, tooltip,
      isDouble,
    } = opt;

    const defaultSettings = {
      min: 0,
      max: 100,
      step: 1,
      minorHandleValue: 10,
      majorHandleValue: 90,
      vertical: false,
      tooltip: true,
      isDouble: true,
    };

    if (typeof this.options === 'undefined') {
      this.options = defaultSettings;
    }

    if (typeof min === 'number' && !isNaN(min)) {
      this.options.min = min;
    }
    if (typeof max === 'number' && !isNaN(max)) {
      this.options.max = max;
    }
    if (typeof step === 'number' && !isNaN(step)) {
      this.options.step = step;
    }
    if (typeof minorHandleValue === 'number' && !isNaN(minorHandleValue)) {
      this.options.minorHandleValue = minorHandleValue;
    }

    if (!isNaN(majorHandleValue) && typeof majorHandleValue === 'number') {
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
  }

  _validateMinimumValue() {
    const {
      min, max, step, minorHandleValue,
    } = this.options;

    if (min > minorHandleValue) {
      this.options.minorHandleValue = min;
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
        this.options.majorHandleValue = max;
      }
    }

    if (max < minorHandleValue) {
      this.options.minorHandleValue = max;
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

    return step < 1 || step > (max - min);
  }

  _validateMinorHandleValue() {
    const {
      min, max, step, majorHandleValue, isDouble,
    } = this.options;

    let { minorHandleValue } = this.options;

    if (isDouble) {
      if (minorHandleValue + step > majorHandleValue) {
        this.options.majorHandleValue = minorHandleValue - step;
      }
      if (minorHandleValue >= majorHandleValue) {
        minorHandleValue = majorHandleValue - step;
      }
      if (minorHandleValue > min && minorHandleValue < majorHandleValue - step) {
        if ((minorHandleValue - min) % step !== 0) {
          minorHandleValue = min + (Math.round((minorHandleValue - min) / step) * step);
        }
      }
    }
    if (minorHandleValue > min && minorHandleValue < max) {
      if ((minorHandleValue - min) % step !== 0) {
        minorHandleValue = min + (Math.round((minorHandleValue - min) / step) * step);
      }
    }
    if (minorHandleValue > max) {
      minorHandleValue = max;
    }

    if (minorHandleValue < min) {
      minorHandleValue = min;
    }
    this.options.minorHandleValue = minorHandleValue;
  }

  _validateMajorHandleValue() {
    const {
      min, max, step, minorHandleValue, isDouble,
    } = this.options;

    let { majorHandleValue } = this.options;

    if (majorHandleValue < max && majorHandleValue - step > minorHandleValue) {
      if ((majorHandleValue - min) % step !== 0) {
        majorHandleValue = min + (Math.round((majorHandleValue - min) / step) * step);
      }
    }
    if (minorHandleValue > majorHandleValue - step) {
      majorHandleValue = minorHandleValue + step;
    }

    if (majorHandleValue > max) {
      majorHandleValue = max;
    }
    if (!isDouble) {
      majorHandleValue = max;
    }
    this.options.majorHandleValue = majorHandleValue;
  }
}

EventEmitter(Model.prototype);
export default Model;
