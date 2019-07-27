const Model = require('./Model');
const View = require('./View');

class Controller {
  constructor(domEl, options) {
    this.domEl = domEl;
    this.options = options;
  }
}
module.exports = Controller;
