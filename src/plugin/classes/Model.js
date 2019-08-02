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
      inputMin: $(''),
      inputMax: $(''),
      inputStep: $(''),
      inputValueMin: $(''),
      inputValueMax: $(''),
      inputVertical: $(''),
      inputTooltip: $(''),
      inputTwoSliders: $(''),
    };

    options = $.extend( {}, options, this.options);

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
