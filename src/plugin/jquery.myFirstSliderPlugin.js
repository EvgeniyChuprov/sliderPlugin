/* eslint-disable no-underscore-dangle */
import EventEmitter from 'event-emitter';
import Controller from './classes/controller';
import Model from './classes/model';
import View from './classes/view';

class Slider {
  constructor($domEl, options) {
    this.$domEl = $domEl;
    this.options = options;
    this._init();
  }

  _init() {
    this._addDomElements();
    this._addMVC();
    this._addListeners();
  }

  _addMVC() {
    this.model = new Model();
    this.view = new View(this.$domEl);
    this.controller = new Controller(this.$domEl);
  }

  _addListeners() {
    this.controller.on('parametersChanged', (data) => {
      this.model.normalizeInputData(data);
    });
    this.model.on('modelStateChanged', (data) => {
      this.emit('pluginStateChanged', data);
      this.sliderSetting = data;
      this.controller.createView(data);
    });
    this.controller.on('modelStateChanged', (data) => {
      this.view.processEvent(data);
    });
    this.view.on('coordinatesChanged', (data) => {
      this.controller.changedParameters(data);
    });

    this.on('setSettings', (data) => {
      this.controller.changedParameters(data);
    });

    this.controller.changedParameters(this.options);
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
    this.sliderSetting[obj.propertyName] = obj.value;
    this.emit('setSettings', this.sliderSetting);
  }

  getPluginSetting(obj) {
    this.on('pluginStateChanged', (data) => {
      obj(data);
    });
  }
}

EventEmitter(Slider.prototype);

(($) => {
  // eslint-disable-next-line no-param-reassign
  $.fn.myFirstSliderPlugin = function initPlugin(options) {
    return new Slider(this, options);
  };
})(jQuery, window);
