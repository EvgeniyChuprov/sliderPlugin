/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
require('../../plugin/jquery.myFirstSliderPlugin.js');

class sliderInterface {
  constructor($element) {
    this.$sliderInterface = $element;
    this._initMenu();
  }

  _initMenu() {
    this.min = this.$sliderInterface.find('.slider__input_min');
    this.max = this.$sliderInterface.find('.slider__input_max');
    this.step = this.$sliderInterface.find('.slider__input_step');
    this.valueMin = this.$sliderInterface.find('.slider__input_value-min');
    this.valueMax = this.$sliderInterface.find('.slider__input_value-max');
    this.vertical = this.$sliderInterface.find('.slider__vertically-horizontally');
    this.tooltip = this.$sliderInterface.find('.slider__tooltip');
    this.twoSliders = this.$sliderInterface.find('.slider__twoSlider');
    this.plugin = this.$sliderInterface.find('.js-range-slider');
    this.options = this.plugin.myFirstSliderPlugin('get')[0].setting;
    this.plugin.myFirstSliderPlugin('get')[1].subscribe('event', this._dar.bind(this));
    this._changeOutput();
    this._changeInput();
  }

  _dar(data) {
    this.valueMin.val(data.valueMin);
    this.valueMax.val(data.valueMax);
  }

  _changeInput() {
    this.min.change(() => {
      this.options.min = +this.min.val();
      this.plugin.myFirstSliderPlugin('get')[0].emit('event', this.options);
    });

    this.max.change(() => {
      this.options.max = +this.max.val();
      this.plugin.myFirstSliderPlugin('get')[0].emit('event', this.options);
    });

    this.step.change(() => {
      this.options.step = +this.step.val();
      this.plugin.myFirstSliderPlugin('get')[0].emit('event', this.options);
    });

    this.valueMin.change(() => {
      this.options.valueMin = +this.valueMin.val();
      this.plugin.myFirstSliderPlugin('get')[0].emit('event', this.options);
    });

    this.valueMax.change(() => {
      this.options.valueMax = +this.valueMax.val();
      this.plugin.myFirstSliderPlugin('get')[0].emit('event', this.options);
    });

    this.vertical.change(() => {
      this.options.vertical = this.vertical.is(':checked');
      this.plugin.myFirstSliderPlugin('get')[0].emit('event', this.options);
    });

    this.tooltip.change(() => {
      this.options.tooltip = this.tooltip.is(':checked');
      this.plugin.myFirstSliderPlugin('get')[0].emit('event', this.options);
    });

    this.twoSliders.change(() => {
      this.options.twoSliders = this.twoSliders.is(':checked');
      this.plugin.myFirstSliderPlugin('get')[0].emit('event', this.options);
    });
  }

  _changeOutput() {
    this.min.val(this.options.min);
    this.max.val(this.options.max);
    this.step.val(this.options.step);
    this.valueMin.val(this.options.valueMin);
    this.valueMax.val(this.options.valueMax);
    this.tooltip.prop('checked', this.options.tooltip);
    this.vertical.prop('checked', this.options.vertical);
    this.twoSliders.prop('checked', this.options.twoSliders);
  }
}

$('.js-slider').each((index, element) => {
  new sliderInterface($(element));
});
