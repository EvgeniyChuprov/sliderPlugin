class Model {
  constructor(options) {
    this.options = options;
  }

  setting() {
    const options = {
      min: 0,
      max: 100,
      step: 1,
      valueMin: 10,
      valueMax: 90,
      vertical: false,
      tooltip: true,
      twoSliders: true,
    };

    this.options = this.options !== undefined ? this.options : {};
    Object.keys(options).forEach(e => this.options.hasOwnProperty(e) ? options[e]
    = this.options[e] : options[e]);

    return options;
  }
}
module.exports = Model;
