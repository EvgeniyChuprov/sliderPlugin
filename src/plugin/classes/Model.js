/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
import Observer from './Observer';

class Model extends Observer {
  normalizationOfSettings(forModel, opt) {
    if (forModel === 'forModel') {
      this._addMissingValues(opt);
      this._checkMin();
      this._checkMax();
      this._checkStep();
      this._checkValueMin();
      this._checkValueMax();
      this.publish('forController', this._initConstants(), this.options);
    }
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

    this.options = $.extend({}, this.options, opt);
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
    if (this.options.twoSliders && this.options.max < this.options.valueMax) {
      this.options.max = this.options.valueMax;
    } else if (this.options.max < this.options.valueMin) {
      this.options.max = this.options.valueMin;
    }
    if (this.options.min > this.options.max) {
      this.options.max = this.options.min + this.options.step;
    }
  }

  _checkStep() {
    if (this.options.step <= 0 || this.options.step > (this.options.max - this.options.min)) {
      this.options.step = 1;
    }
  }

  _checkValueMin() {
    if (this.options.twoSliders && this.options.valueMin > this.options.valueMax) {
      this.options.valueMin = this.options.valueMax;
    }
    if (!this.options.twoSliders && this.options.valueMin > this.options.max) {
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

  toClick(coordClickForModel, newTop, length) {
    if (coordClickForModel === 'coordClickForModel') {
      const shiftPercentage = (newTop * 100) / length;
      const positionSlider = this.options.step * Math.round(shiftPercentage
      / this._initConstants().step) + this.options.min;
      if (this.options.twoSliders) {
        if (positionSlider - this.options.min < (this.options.max - this.options.min) / 2) {
          this.options.valueMin = positionSlider;
          this.options.onChange(this.options.valueMin, this.options.valueMax);
        } else {
          this.options.valueMax = positionSlider;
          this.options.onChange(this.options.valueMin, this.options.valueMax);
        }
      } else {
        this.options.valueMin = positionSlider;
        this.options.onChange(this.options.valueMin, this.options.valueMax);
      }
      this.publish('forController', this._initConstants(), this.options);
    }
  }

  toMove(coordMoveForModel, newTop, length, min) {
    if (coordMoveForModel === 'coordMoveForModel') {
      const shiftPercentage = (newTop * 100) / length;
      const value = this.options.step * Math.round(shiftPercentage
      / this._initConstants().step) + this.options.min;
      if (min) {
        if (value <= this.options.max) {
          if (value >= this.options.min && value <= this.options.valueMax) {
            this.options.valueMin = value;
            this.options.onChange(this.options.valueMin, this.options.valueMax);
            this.publish('forController', this._initConstants(), this.options);
          }
        }
      } else if (!min) {
        if (value >= this.options.min) {
          if (value <= this.options.max && value >= this.options.valueMin) {
            this.options.valueMax = value;
            this.options.onChange(this.options.valueMin, this.options.valueMax);
            this.publish('forController', this._initConstants(), this.options);
          }
        }
      }
    }
  }
}

export default Model;
