/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */

class Controller {
  constructor(model, view, $this) {
    this.model = model;
    this.view = view;
    this.$domEl = $this;
    //this.model.subscribe('event', this._data.bind(this));
    this.test();
    this.view.subscribe('event', this._da.bind(this));
  }

  test() {
    this.model.subscribe('event', this._data.bind(this));
  }

  _data(data) {
    this.view.initSetting(data, this.$domEl);
  }

  _da(data) {
    this.model.options = data;
    this.model.normalizationOfSettings();
  }
}

export default Controller;
