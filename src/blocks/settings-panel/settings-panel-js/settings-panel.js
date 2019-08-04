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
  }

  _changeInput() {
    this.min.change(() => {
      this.options.min = this.min.val();
      this.plugin.myFirstSliderPlugin('set', this.options);
    });

    this.max.change(() => {
      this.options.max = this.max.val();
      this.plugin.myFirstSliderPlugin('set', this.options);
    });

    this.step.change(() => {
      this.options.step = this.step.val();
      this.plugin.myFirstSliderPlugin('set', this.options);
    });

    this.valueMin.change(() => {
      this.options.valueMin = this.valueMin.val();
      this.plugin.myFirstSliderPlugin('set', this.options);
    });

    this.valueMax.change(() => {
      this.options.valueMax = this.valueMax.val();
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
    this.options = {
      min: this.plugin.data().min,
      max: this.plugin.data().max,
      step: this.plugin.data().step,
      valueMin: this.plugin.data().valuemin,
      valueMax: this.plugin.data().valuemax,
      vertical: this.plugin.data().vertical,
      tooltip: this.plugin.data().tooltip,
      twoSliders: this.plugin.data().twoSliders,
    };
    this.min.val(this.plugin.data().min);
    this.max.val(this.plugin.data().max);
    this.step.val(this.plugin.data().step);
    this.valueMin.val(this.plugin.data().valuemin);
    this.valueMax.val(this.plugin.data().valuemax);
    this.tooltip.prop('checked', this.plugin.data().tooltip);
    this.vertical.prop('checked', this.plugin.data().vertical);
    this.twoSliders.prop('checked', this.plugin.data().twosliders);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        this.valueMin[0].value = mutation.target.dataset.valuemin;
        this.options.valueMin = mutation.target.dataset.valuemin;
        this.valueMax[0].value = mutation.target.dataset.valuemax;
        this.options.valueMax = mutation.target.dataset.valuemax;
      });
    });
    const config = { attributes: true, childList: false, characterData: false };
    observer.observe(this.plugin[0], config);
  }
}

$('.js-slider').each((index, element) => {
  new sliderInterface($(element));
});
