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

  _initMVC() {
    this.model = new Model();
    this.view = new View(this.$domEl);
  }

  _subscribeEntities() {
    this.on('parametersChanged', (data) => {
      this.model.setOptions(data);
    });
    this.model.on('modelStateChanged', (data) => {
      this.emit('transferSettings', data);  // передает настройки из модели в класс слайдер
      this.updateView(data);
    });
    this.on('modelStateChanged', (data) => {
      this.view.displayView(data);
    });
    this.view.on('coordinatesChanged', (data) => {
      this.changeParameters(data);
    });
  }

  changeParameters(options) {
    this.options = { ...this.options, ...options }; // проверяет пришел полный объект опций или только часть передает в модель
    this.emit('parametersChanged', this.options);
  }

  updateView(options) {
    this.emit('modelStateChanged', options);
  }
}

EventEmitter(Controller.prototype);
export default Controller;
