class Model {
  constructor($domEl, options) {
    this.$domEl = $domEl;
    this.options = options;
    this.setting = this.setting();
  }

  setting() {
    let options = {
      min: 0,
      max: 100,
      step: 1,
      valueMin: 10,
      valueMax: 90,
      vertical: false,
      tooltip: true,
      twoSliders: true,
    };

    options = $.extend( {}, options, this.options);

    if (options.step < 1) {
      options.step = 1;
    }

    if (options.min >= options.max) {
      options.min = options.max - options.step;
    }

    if (options.valueMin < options.min) {
      options.valueMin = options.min;
    }

    if (options.twoSliders) {
      if (options.valueMin > options.max) {
        options.valueMin = options.valueMax;
      }
    } else if (!options.twoSliders) {
      if (options.valueMin > options.max) {
        options.valueMin = options.max;
      }
    }


    if (options.valueMin > options.valueMax) {
      options.valueMin = options.valueMax;
    }
    if (options.valueMax > options.max) {
      options.valueMax = options.max;
    }

    return options;
  }

  constants() {
    const minPoint = ((this.setting.valueMin - this.setting.min) * 100)
    / (this.setting.max - this.setting.min);
    const maxPoint = ((this.setting.valueMax - this.setting.min) * 100)
    / (this.setting.max - this.setting.min);
    const sliderTopCoords = this.$domEl.offset().top - pageYOffset;
    const step = 100 / ((this.setting.max - this.setting.min)
    / this.setting.step);

    return {
      minPoint,
      maxPoint,
      sliderTopCoords,
      step,
    };
  }
}
module.exports = Model;
