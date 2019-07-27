class View {
  constructor($domEl, options) {
    this.$domEl = $domEl;
    this.options = options;
  }

  createSlider() {
    const create = $('<div class="slider-range__value-min" ><div class = "slider-range__tool-min" ></div></div>'
                     + '<div class="slider-range__value-max" ><div class = "slider-range__tool-max" ></div></div>');
    this.$domEl.append(create);
    this.$valueMin = this.$domEl.find('.slider-range__value-min');
    this.$valueMax = this.$domEl.find('.slider-range__value-max');
    this.$toolMin = this.$domEl.find('.slider-range__tool-min');
    this.$toolMax = this.$domEl.find('.slider-range__tool-max');
  }

  startingPositions() {

  }
}
module.exports = View;
