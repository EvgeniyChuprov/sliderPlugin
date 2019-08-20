/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.Data = 0;
    this.Init = 0;
  }

  init() {
    this.Init++;
    console.log('Init ' + this.Init)
    this.model.subscribe('event', this.data.bind(this));
  }

  data(data) {
    this.Data++;
    console.log('Data ' + this.Data)
    this.view.initSetting(data, this.$domEl);
  }

  // initSetting() {
  //   this.view.$domEl = this.$domEl;
  //   this.model.options = this.options;
  //   this.view.options = this.model.normalizationOfSettings();
  //   this.view.initConstants();
  //   this.view.initSetting();
  // }

  // event() {
  //   this.subscribe('event:name-changed', (data) => {
  //     console.log(data);
  //     this.model.vie(data);
  //   });
  //   this.subscribe('event', (data) => {
  //     this.view.opt = data;
  //     console.log(this.view.opt);
  //     this.view.range.step = this.view.opt.step;
  //     this.view.range.value = this.view.opt.value;
  //     console.log(this.view.range.value);
  //   });
  // }
}
module.exports = Controller;
