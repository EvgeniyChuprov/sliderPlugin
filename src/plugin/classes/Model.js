class Model {
  constructor(options) {
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

    if (options.valueMin <= options.min) {
      options.valueMin = options.min;
    }

    if (options.step < 1) {
      options.step = 1;
    }

    if (options.min >= options.max) {
      options.min = options.max - options.step;
    }

    if (options.min >= options.valueMin) {
      options.min = options.valueMin;
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

}
module.exports = Model;
