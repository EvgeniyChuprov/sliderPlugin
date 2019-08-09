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
    this.view.initialization();
    this.view.setting();
  }

  setting() {
    this.view.setting();
    console.log(this.$domEl);
    console.log(this.view.options);
  }
}
module.exports = Controller;
