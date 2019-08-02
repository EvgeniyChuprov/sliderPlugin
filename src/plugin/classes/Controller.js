/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
const Model = require('./Model');
const View = require('./View');

class Controller {
  constructor($domEl, options) {
    this.$domEl = $domEl;
    this.options = options;
  }

  setting() {
    this.model = new Model(this.$domEl, this.options);
    this.view = new View(this.$domEl, this.model.setting);
    this.view.createSlider();
    this._startingPositions();
    this._tooltipVisibility();
    this._position();
    this._twoSliders();
    this._changeMin();
    this._changeMax();
    this._changeStep();
    this._changeValueMin();
    this._changeValueMax();
  }

  _startingPositions() {
    this.view.$toolMin.html(this.model.setting.valueMin);
    this.view.$toolMax.html(this.model.setting.valueMax);

    if (this.model.setting.vertical) {
      this.view.$valueMin.css('top', `${this.model.constants().minPoint}%`);
      this.view.$valueMax.css('top', `${this.model.constants().maxPoint}%`);
    } else {
      this.view.$valueMin.css('left', `${this.model.constants().minPoint}%`);
      this.view.$valueMax.css('left', `${this.model.constants().maxPoint}%`);
    }

    this.model.setting.inputMin.val(this.model.setting.min);
    this.model.setting.inputMax.val(this.model.setting.max);
    this.model.setting.inputStep.val(this.model.setting.step);
    this.model.setting.inputValueMin.val(this.model.setting.valueMin);
    this.model.setting.inputValueMax.val(this.model.setting.valueMax);
    this.model.setting.inputTooltip.prop('checked', this.model.setting.tooltip);
    this.model.setting.inputTwoSliders.prop('checked', this.model.setting.twoSliders);
    this.model.setting.inputVertical.prop('checked', this.model.setting.vertical);

    this.view.position(this.model.setting.inputVertical.is(':checked'));
  }

  _tooltipVisibility() {
    this.model.setting.inputTooltip.change(() => {
      this.view.tool(this.model.setting.inputTooltip.is(':checked'));
    });
  }

  _position() {
    this.model.setting.inputVertical.change(() => {
      this.view.position(this.model.setting.inputVertical.is(':checked'));
      this.model.setting.vertical = this.model.setting.inputVertical.is(':checked');
    });
  }

  _twoSliders() {
    this.model.setting.inputTwoSliders.change(() => {
      if (this.model.setting.inputTwoSliders.is(':checked')) {
        this.view.twoSliders(true);
      } else {
        this.view.twoSliders(false);
        this.model.setting.valueMax = this.model.setting.max;
      }
    });
  }

  _changeMin() {
    this.model.setting.inputMin.change(() => {
      this.model.setting.min = this.model.setting.inputMin.val();
    });
  }

  _changeMax() {
    this.model.setting.inputMax.change(() => {
      this.model.setting.max = this.model.setting.inputMax.val();
    });
  }

  _changeStep() {
    this.model.setting.inputStep.change(() => {
      this.model.setting.step = this.model.setting.inputStep.val();
    });
  }

  _changeValueMin() {
    this.model.setting.inputValueMin.change(() => {
      this.model.setting.valueMin = this.model.setting.inputValueMin.val();
      this._startingPositions();
    });
  }

  _changeValueMax() {
    this.model.setting.inputValueMax.change(() => {
      this.model.setting.valueMax = this.model.setting.inputValueMax.val();
      this._startingPositions();
    });
  }
}
module.exports = Controller;
