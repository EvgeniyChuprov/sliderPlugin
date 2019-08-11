/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
const Model = require('./Model');
const View = require('./View');

class Controller {
  constructor($domEl, options) {
    this.$domEl = $domEl;
    this.options = options;
  }

  init() {
    this.model = new Model(this.options);
    this.view = new View(this.$domEl, this.model.setting);
    this.view.setting();
  }

  setting() {
    this.view.$domEl = this.$domEl;
    this.model.options = this.options;
    this.view.options = this.model.normalizationOfSettings();
    this.view.constants();
    this.view.setting();
  }
}
module.exports = Controller;
