/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */

class sliderInterface {
  constructor($element) {
    this.$sliderInterface = $element;
    this._menu();
    this._changeOutput();
    this._changeInput();
  }

  _menu() {
    this.min = this.$sliderInterface.find('.slider__input_min');
    this.max = this.$sliderInterface.find('.slider__input_max');
    this.step = this.$sliderInterface.find('.slider__input_step');
    this.valueMin = this.$sliderInterface.find('.slider__input_value-min');
    this.valueMax = this.$sliderInterface.find('.slider__input_value-max');
    this.vertical = this.$sliderInterface.find('.slider__vertically-horizontally');
    this.tooltip = this.$sliderInterface.find('.slider__tooltip');
    this.twoSliders = this.$sliderInterface.find('.slider__twoSlider');
    this.plugin = this.$sliderInterface.find('.js-slider-range');
    this.options = this.plugin.myFirstSliderPlugin('get');
  }

  _changeInput() {
    this.min.change(() => {
      this.options.min = +this.min.val();
      this.plugin.myFirstSliderPlugin('set', this.options);
    });

    this.max.change(() => {
      this.options.max = +this.max.val();
      this.plugin.myFirstSliderPlugin('set', this.options);
    });

    this.step.change(() => {
      this.options.step = +this.step.val();
      this.plugin.myFirstSliderPlugin('set', this.options);
    });

    this.valueMin.change(() => {
      this.options.valueMin = +this.valueMin.val();
      this.plugin.myFirstSliderPlugin('set', this.options);
    });

    this.valueMax.change(() => {
      this.options.valueMax = +this.valueMax.val();
      this.plugin.myFirstSliderPlugin('set', this.options);
    });

    this.vertical.change(() => {
      this.options.vertical = this.vertical.is(':checked');
      this.plugin.myFirstSliderPlugin('set', this.options);
    });

    this.tooltip.change(() => {
      this.options.tooltip = this.tooltip.is(':checked');
      this.plugin.myFirstSliderPlugin('set', this.options);
    });

    this.twoSliders.change(() => {
      this.options.twoSliders = this.twoSliders.is(':checked');
      this.plugin.myFirstSliderPlugin('set', this.options);
    });
  }

  _changeOutput() {
    let min = this.options.valueMin;
    let max = this.options.valueMax;

    setInterval(() => {
      if (this.options.valueMin !== min) {
        min = this.options.valueMin;
        this.valueMin.val(min);
      }
      if (this.options.valueMax !== max) {
        max = this.options.valueMax;
        this.valueMax.val(max);
      }
    }, 400);

    this.min.val(this.options.min);
    this.max.val(this.options.max);
    this.step.val(this.options.step);
    this.valueMin.val(this.options.valueMin);
    this.valueMax.val(this.options.valueMax);
    this.tooltip.prop('checked', this.options.tooltip);
    this.vertical.prop('checked', this.options.vertical);
    this.twoSliders.prop('checked', this.options.twosliders);
  }
}

$('.js-slider').each((index, element) => {
  new sliderInterface($(element));
});
