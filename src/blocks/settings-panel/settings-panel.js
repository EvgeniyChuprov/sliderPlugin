/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
// eslint-disable-next-line no-unused-vars
import myFirstSliderPlugin from '../../plugin/jquery.myFirstSliderPlugin';

class SettingsPanel {
  constructor($element) {
    this.$sliderInterface = $element;
    this._initPanel();
  }

  _initPanel() {
    const sliderState = this.$sliderInterface.find('.js-range-slider').data('options');
    this.slider = this.$sliderInterface.find('.js-range-slider').myFirstSliderPlugin(sliderState);

    this._findDOMElements();

    this.slider.on('pluginStateChanged', (data) => {
      this.showData(data);
    });

    //this.showData(this.slider.sliderSetting);
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
      this.slider.changePluginSettings({ min: +this.$min.val() });
    });

    this.$max.change(() => {
      this.slider.changePluginSettings({ max: +this.$max.val() });
    });

    this.$step.change(() => {
      this.slider.changePluginSettings({ step: +this.$step.val() });
    });

    this.$minorHandleValue.change(() => {
      this.slider.changePluginSettings({ minorHandleValue: +this.$minorHandleValue.val() });
    });

    this.$majorHandleValue.change(() => {
      this.slider.changePluginSettings({ majorHandleValue: +this.$majorHandleValue.val() });
    });

    this.$vertical.change(() => {
      this.slider.changePluginSettings({ vertical: this.$vertical.is(':checked') });
    });

    this.$tooltip.change(() => {
      this.slider.changePluginSettings({ tooltip: this.$tooltip.is(':checked') });
    });

    this.isDouble.change(() => {
      this.slider.changePluginSettings({ isDouble: this.isDouble.is(':checked') });

      this._showMajorHandelInput(this.isDouble.is(':checked'));
    });
  }

  showData(options) {
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
    this._showMajorHandelInput(options.isDouble);
  }

  _showMajorHandelInput(isDouble) {
    const visibilityMajorHandle = isDouble ? 'block' : 'none';
    this.$majorHandleValue.css('display', visibilityMajorHandle);
    this.$sliderText.css('display', visibilityMajorHandle);
  }
}

$('.js-settings-panel').each((index, element) => {
  new SettingsPanel($(element));
});
