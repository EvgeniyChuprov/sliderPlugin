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
    this.emit('parametersChanged', options);
  }

  updateView(options) {
    this.emit('modelStateChanged', options);
  }

  _initMVC() {
    this.model = new Model();
    this.view = new View(this.$domEl);
  }

  _subscribeEntities() {
    this.on('parametersChanged', (data) => {
      this.model.setOptions(data);
    });
    this.model.on('modelStateChanged', (data) => {
      this.emit('transferSettings', data);
      this.updateView(data);
    });
    this.on('modelStateChanged', (data) => {
      this.view.displayView(data);
    });
    this.view.on('coordinatesChanged', (data) => {
      this.changeParameters(data);
    });
  }
}

EventEmitter(Controller.prototype);
export default Controller;
