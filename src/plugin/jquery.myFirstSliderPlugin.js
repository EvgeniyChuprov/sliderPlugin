/* eslint-disable no-underscore-dangle */
import EventEmitter from 'event-emitter';
import Controller from './classes/controller';

class Slider {
  constructor($domEl, options) {
    this.$domEl = $domEl;
    this.options = options;
    this._init();
  }

  _init() {
    this._addDomElements();
    this.controller = new Controller(this.$domEl);

    this.controller.changeParameters(this.options); // контроллер получает опции при инициализации плагина и передает в модель 

    this.controller.on('transferSettings', (data) => {
      this.emit('pluginStateChanged', data);  // класс слайдер получает настройки после модели и передает в панель настроек
    });
  }

  _addDomElements() {
    const initialSliderElements = $(`
      <div class="range-slider__handle js-range-slider__handle" >
        <span class = "range-slider__tool-handle js-range-slider__tool-handle" ></span>
      </div>
      <div class="range-slider__second-handle js-range-slider__second-handle" >
        <span class = "range-slider__tool-second-handle js-range-slider__tool-second-handle" ></span>
      </div>
    `);
    this.$domEl.append(initialSliderElements);
  }

  changePluginSettings(obj) {
    this.controller.changeParameters(obj);  // объект с параметрами из панели настроек передается через контролер в модель
  }
}

EventEmitter(Slider.prototype);

$.fn.myFirstSliderPlugin = function initPlugin(options) {
  return new Slider(this, options);
};
