/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
import EventEmitter from 'event-emitter';
import Model from './model';
import View from './view';

class Controller {
  constructor($domEl) {
    this.$domEl = $domEl;
    this._initMVC();
    this._subscribeEntities();
  }

  getOptions() {
    return this.model.getOptions();
  }

  changeParameters(options) {
    this.model.setOptions(options);
  }

  updateView(options) {
    this.view.displayView(options);
  }

  _initMVC() {
    this.model = new Model();
    this.view = new View(this.$domEl);
  }

  _subscribeEntities() {
    this.model.on('modelStateChanged', (data) => {
      this.emit('transferSettings', data);
      this.updateView(data);
    });

    this.view.on('coordinatesChanged', (data) => {
      this.changeParameters(data);
    });
  }
}

EventEmitter(Controller.prototype);
export default Controller;
