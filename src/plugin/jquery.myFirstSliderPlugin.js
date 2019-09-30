import EventEmitter from 'event-emitter';
import Controller from './classes/controller';

class Slider {
  constructor($domEl, options) {
    this.$domEl = $domEl;
    this.options = options;
    this._init();
  }

  changePluginSettings(obj) {
    this.controller.changeParameters(obj);
  }

  getPluginSettings() {
    return this.controller.getOptions();
  }

  _init() {
    this.controller = new Controller(this.$domEl);

    this.controller.changeParameters(this.options);

    this.controller.on('transferSettings', (data) => {
      this.emit('pluginStateChanged', data);
    });
  }
}

EventEmitter(Slider.prototype);

$.fn.myFirstSliderPlugin = function initPlugin(options) {
  return new Slider(this, options);
};
