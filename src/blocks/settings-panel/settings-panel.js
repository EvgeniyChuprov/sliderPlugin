import myFirstSliderPlugin from '../../plugin/jquery.myFirstSliderPlugin';

class SettingsPanel {
  constructor($element) {
    this.$settingsPanel = $element;
    this._initPanel();
  }

  writeDataToPanelInputs(options) {
    const {
      min, max, step, minorHandleValue,
      majorHandleValue, tooltip, vertical, isDouble,
    } = options;

    this.$min.val(min);
    this.$max.val(max);
    this.$step.val(step);
    this.$minorHandleValue.val(minorHandleValue);
    this.$minorHandleValue.attr('step', step);
    this.$majorHandleValue.val(majorHandleValue);
    this.$majorHandleValue.attr('step', step);
    this.$tooltip.prop('checked', tooltip);
    this.$vertical.prop('checked', vertical);
    this.$isDouble.prop('checked', isDouble);
    this._showMajorHandelInput(isDouble);
  }

  _initPanel() {
    this._findDOMElements();

    const sliderState = this.$plugin.data('options');

    this.slider = this.$plugin.myFirstSliderPlugin(sliderState);

    this.slider.on('pluginStateChanged', (data) => {
      this.writeDataToPanelInputs(data);
    });

    this.writeDataToPanelInputs(this.slider.getPluginSettings());
    this._addEventListeners();
  }

  _findDOMElements() {
    this.$min = this.$settingsPanel.find('.js-slider__min');
    this.$max = this.$settingsPanel.find('.js-slider__max');
    this.$step = this.$settingsPanel.find('.js-slider__step');
    this.$minorHandleValue = this.$settingsPanel.find('.js-slider__handle');
    this.$majorHandleValue = this.$settingsPanel.find('.js-slider__second-handle');
    this.$vertical = this.$settingsPanel.find('.js-slider__vertical');
    this.$tooltip = this.$settingsPanel.find('.js-slider__tooltip');
    this.$isDouble = this.$settingsPanel.find('.js-slider__is-double');
    this.$plugin = this.$settingsPanel.find('.js-range-slider');
    this.$sliderText = this.$settingsPanel.find('.js-slider__text');
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

    this.$isDouble.change(() => {
      this.slider.changePluginSettings({ isDouble: this.$isDouble.is(':checked') });

      this._showMajorHandelInput(this.$isDouble.is(':checked'));
    });
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
