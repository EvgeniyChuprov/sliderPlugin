/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
class SliderInterface {
  constructor($element) {
    this.$sliderInterface = $element;
    this._initMenu();
  }

  _initMenu() {
    //
    const sliderState = this.$sliderInterface.find('.js-range-slider').data('options');
    this.options = this.$sliderInterface.find('.js-range-slider').myFirstSliderPlugin(sliderState);
    console.log(this.options)
    //
    this._findDOMElements();
    this._showSettingMajorHandleValue();
    this._showData();
    this._addEventListeners();
  }

  _findDOMElements() {
    this.$min = this.$sliderInterface.find('.js-slider__min');
    this.$max = this.$sliderInterface.find('.js-slider__max');
    this.$step = this.$sliderInterface.find('.js-slider__step');
    this.$minorHandleValue = this.$sliderInterface.find('.js-slider__handle');
    this.$majorHandleValue = this.$sliderInterface.find('.js-slider__second-handle');
    this.$vertical = this.$sliderInterface.find('.js-slider__vertical');
    this.$tooltip = this.$sliderInterface.find('.js-slider__tooltip');
    this.isDouble = this.$sliderInterface.find('.js-slider__is-double');
    this.$plugin = this.$sliderInterface.find('.js-range-slider');
    this.$sliderText = this.$sliderInterface.find('.js-slider__text');
  }

  _addEventListeners() {
    this.$min.change(() => {
      this.options.min = +this.$min.val();
      this.options.update(this.options);
    });

    this.$max.change(() => {
      this.options.max = +this.$max.val();
      this.options.update(this.options);
    });

    this.$step.change(() => {
      this.options.step = +this.$step.val();
      this.options.update(this.options);
    });

    this.$minorHandleValue.change(() => {
      this.options.minorHandleValue = +this.$minorHandleValue.val();
      this.options.update(this.options);
    });

    this.$majorHandleValue.change(() => {
      this.options.majorHandleValue = +this.$majorHandleValue.val();
      this.options.update(this.options);
    });

    this.$vertical.change(() => {
      this.options.vertical = this.$vertical.is(':checked');
      this.options.update(this.options);
    });

    this.$tooltip.change(() => {
      this.options.tooltip = this.$tooltip.is(':checked');
      this.options.update(this.options);
    });

    this.isDouble.change(() => {
      this.options.isDouble = this.isDouble.is(':checked');
      this.options.update(this.options);

      this._showSettingMajorHandleValue();
    });
  }

  _showData() {
    this.$min.val(this.options.min);
    this.$max.val(this.options.max);
    this.$step.val(this.options.step);
    this.$minorHandleValue.val(this.options.minorHandleValue);
    this.$majorHandleValue.val(this.options.majorHandleValue);
    this.$tooltip.prop('checked', this.options.tooltip);
    this.$vertical.prop('checked', this.options.vertical);
    this.isDouble.prop('checked', this.options.isDouble);
    this.options.onChange = (options) => {
      this.options = options;
      this._showData();
    };
  }

  

  _showSettingMajorHandleValue() {
    const visibilityMajorHandle = this.options.isDouble ? 'block' : 'none';
    this.$majorHandleValue.css('display', visibilityMajorHandle);
    this.$sliderText.css('display', visibilityMajorHandle);
  }
}

$('.js-slider').each((index, element) => {
  new SliderInterface($(element));
});
