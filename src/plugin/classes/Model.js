import EventEmitter from './EventEmitter';

class Model extends EventEmitter {
  constructor(options) {
    super();
    this.options = options;
    this.setting = this.normalizationOfSettings();
  }

  modelEmit() {
    //this.emit('event', this.setting);
    this.emit('event', this.data.bind(this));
  }

  data() {
    return this.setting;
  }
  normalizationOfSettings() {
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

    if (options.step <= 0) {
      options.step = 1;
    }

    if (options.step > options.max) {
      options.step = options.max;
    }

    if (options.min >= options.max) {
      options.min = options.max - options.step;
    }

    if (options.min >= options.valueMin) {
      options.min = options.valueMin;
    }

    if (options.valueMin > options.valueMax) {
      options.valueMin = options.valueMax;
    }

    if (options.valueMax > options.max) {
      options.valueMax = options.max;
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

    return options;
  }
}

export default Model;
