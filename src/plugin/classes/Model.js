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
      this.publish('forController', this._initConstants());
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
}

export default Model;
