/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
// eslint-disable-next-line no-unused-vars
import myFirstSliderPlugin from '../../plugin/jquery.myFirstSliderPlugin';

class SliderInterface {
  constructor($element) {
    this.$sliderInterface = $element;
    this._initMenu();
  }

  _initMenu() {
    const sliderState = this.$sliderInterface.find('.js-range-slider').data('options');
    this.sliderSetting = this.$sliderInterface.find('.js-range-slider').myFirstSliderPlugin(sliderState);

    this._findDOMElements();

    this.sliderSetting.getPluginSetting(this._showData.bind(this));

    this._showData(this.sliderSetting.sliderSetting);
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
      this.sliderSetting.changePluginSettings({ propertyName: 'min', value: +this.$min.val() });
    });

    this.$max.change(() => {
      this.sliderSetting.changePluginSettings({ propertyName: 'max', value: +this.$max.val() });
    });

    this.$step.change(() => {
      this.sliderSetting.changePluginSettings({ propertyName: 'step', value: +this.$step.val() });
    });

    this.$minorHandleValue.change(() => {
      this.sliderSetting.changePluginSettings({ propertyName: 'minorHandleValue', value: +this.$minorHandleValue.val() });
    });

    this.$majorHandleValue.change(() => {
      this.sliderSetting.changePluginSettings({ propertyName: 'majorHandleValue', value: +this.$majorHandleValue.val() });
    });

    this.$vertical.change(() => {
      this.sliderSetting.changePluginSettings({ propertyName: 'vertical', value: this.$vertical.is(':checked') });
    });

    this.$tooltip.change(() => {
      this.sliderSetting.changePluginSettings({ propertyName: 'tooltip', value: this.$tooltip.is(':checked') });
    });

    this.isDouble.change(() => {
      this.sliderSetting.changePluginSettings({ propertyName: 'isDouble', value: this.isDouble.is(':checked') });

      this._showSettingMajorHandleValue(this.isDouble.is(':checked'));
    });
  }

  _showData(options) {
    this.$min.val(options.min);
    this.$max.val(options.max);
    this.$step.val(options.step);
    this.$minorHandleValue.val(options.minorHandleValue);
    this.$minorHandleValue.attr('step', options.step);
    this.$majorHandleValue.val(options.majorHandleValue);
    this.$majorHandleValue.attr('step', options.step);
    this.$tooltip.prop('checked', options.tooltip);
    this.$vertical.prop('checked', options.vertical);
    this.isDouble.prop('checked', options.isDouble);
    this._showSettingMajorHandleValue(options.isDouble);
  }

  _showSettingMajorHandleValue(isDouble) {
    const visibilityMajorHandle = isDouble ? 'block' : 'none';
    this.$majorHandleValue.css('display', visibilityMajorHandle);
    this.$sliderText.css('display', visibilityMajorHandle);
  }
}

$('.js-slider').each((index, element) => {
  new SliderInterface($(element));
});
