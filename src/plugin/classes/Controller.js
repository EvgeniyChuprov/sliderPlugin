const Model = require('./Model');
const View = require('./View');

class Controller {
  constructor(domEl, options) {
    this.domEl = domEl;
    this.options = options;
    this.setting();
  }

  setting() {
    this.model = new Model(this.options);
  }
}
module.exports = Controller;
