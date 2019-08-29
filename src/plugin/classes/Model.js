/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
import Observer from './Observer';

class Model extends Observer {
  getDataFromController(event, ...arg) {
    switch (event) {
      case 'forModel':
        this._normalizationOfSettings(arg[0]);
        break;
      case 'coordClickForModel':
        this._toClick(arg[0], arg[1]);
        break;
      case 'coordMoveForModel':
        this._toMove(arg[0], arg[1], arg[2]);
        break;
      default:
        break;
    }
  }

  _normalizationOfSettings(opt) {
    this._addMissingValues(opt);
    this._checkMin();
    this._checkMax();
    this._checkStep();
    this._checkValueMin();
    this._checkValueMax();
    this.publish('forController', this._initConstants(), this.options);
  }

  _addMissingValues(opt) {
    this.options = {
      min: 0,
      max: 100,
      step: 1,
      valueMin: 10,
      valueMax: 90,
      vertical: false,
      tooltip: true,
      twoSliders: true,
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
    if (typeof opt.valueMin === 'number') {
      this.options.valueMin = opt.valueMin;
    }
    if (typeof opt.valueMax === 'number') {
      this.options.valueMax = opt.valueMax;
    }
    if (typeof opt.vertical === 'boolean') {
      this.options.vertical = opt.vertical;
    }
    if (typeof opt.tooltip === 'boolean') {
      this.options.tooltip = opt.tooltip;
    }
    if (typeof opt.twoSliders === 'boolean') {
      this.options.twoSliders = opt.twoSliders;
    }
    this.options.onChange = opt.onChange;
    this.options.update = opt.update;
  }

  _checkMin() {
    if (this.options.min > this.options.valueMin) {
      this.options.min = this.options.valueMin;
    }
    if (this.options.min > this.options.max) {
      this.options.min = this.options.max - this.options.step;
    }
  }

  _checkMax() {
    if (this._isChangeAllowedForMax()) {
      this.options.max = this.options.valueMax;
    } else if (this.options.max < this.options.valueMin) {
      this.options.max = this.options.valueMin;
    }
    if (this.options.min > this.options.max) {
      this.options.max = this.options.min + this.options.step;
    }
  }

  _isChangeAllowedForMax() {
    return this.options.twoSliders && this.options.max < this.options.valueMax;
  }

  _checkStep() {
    if (this._isChangeAllowedForStep()) {
      this.options.step = 1;
    }
  }

  _isChangeAllowedForStep() {
    return this.options.step <= 0 || this.options.step > (this.options.max - this.options.min);
  }

  _checkValueMin() {
    if (this.options.twoSliders) {
      if (this.options.valueMin > this.options.valueMax) {
        this.options.valueMin = this.options.valueMax;
      }
    }

    if (this.options.valueMin > this.options.max) {
      this.options.valueMin = this.options.max;
    }

    if (this.options.valueMin < this.options.min) {
      this.options.valueMin = this.options.min;
    }
  }

  _checkValueMax() {
    if (this.options.valueMax < this.options.valueMin) {
      this.options.valueMax = this.options.valueMin;
    }
    if (this.options.valueMax > this.options.max) {
      this.options.valueMax = this.options.max;
    }
  }

  _initConstants() {
    const minPoint = ((this.options.valueMin - this.options.min) * 100)
    / (this.options.max - this.options.min);
    const maxPoint = ((this.options.valueMax - this.options.min) * 100)
    / (this.options.max - this.options.min);
    const step = 100 / ((this.options.max - this.options.min)
    / this.options.step);
    const upright = this.options.vertical;
    const toolMin = this.options.valueMin;
    const toolMax = this.options.valueMax;
    const twoRange = this.options.twoSliders;
    const tool = this.options.tooltip;
    return {
      minPoint,
      maxPoint,
      step,
      upright,
      toolMin,
      toolMax,
      twoRange,
      tool,
    };
  }

  _toClick(newTop, length) {
    const shiftPercentage = (newTop * 100) / length;
    const middle = (this.options.max - this.options.min) / 2;
    const positionSlider = this.options.step * Math.round(shiftPercentage
     / this._initConstants().step) + this.options.min;

    if (this.options.twoSliders) {
      if (positionSlider - this.options.min < middle) {
        this.options.valueMin = positionSlider;
        this.options.onChange(this.options);
      } else {
        this.options.valueMax = positionSlider;
        this.options.onChange(this.options);
      }
    } else {
      this.options.valueMin = positionSlider;
      this.options.onChange(this.options);
    }
    this.publish('forController', this._initConstants(), this.options);
  }

  _toMove(newTop, length, min) {
    const shiftPercentage = (newTop * 100) / length;
    const value = this.options.step * Math.round(shiftPercentage
    / this._initConstants().step) + this.options.min;

    if (min) {
      if (value <= this.options.max) {
        if (value >= this.options.min && value <= this.options.valueMax) {
          if (value !== this.options.valueMin) {
            this.options.valueMin = value;
            this.options.onChange(this.options);
            this.publish('forController', this._initConstants(), this.options);
          }
        }
      }
    } else if (!min) {
      if (value >= this.options.min) {
        if (value <= this.options.max && value >= this.options.valueMin) {
          if (value !== this.options.valueMax) {
            this.options.valueMax = value;
            this.options.onChange(this.options);
            this.publish('forController', this._initConstants(), this.options);
          }
        }
      }
    }
  }
}

export default Model;
