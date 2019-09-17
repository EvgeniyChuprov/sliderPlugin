/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
require('../../plugin/jquery.myFirstSliderPlugin.js');

class SliderCreate {
  constructor($element) {
    this.$sliderCreate = $element;
    this._createPlugin();
  }

  _createPlugin() {
    const options = this.$sliderCreate.data('options');
    this.$sliderCreate.myFirstSliderPlugin(options);
  }
}
$('.js-range-slider').each((index, element) => {
    new SliderCreate($(element));
});
