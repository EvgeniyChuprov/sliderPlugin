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
    this.view.initialization();
  }
}
module.exports = Controller;
