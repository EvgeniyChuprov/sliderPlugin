/* eslint-disable no-underscore-dangle */
import Controller from './classes/controller';
import Model from './classes/model';
import View from './classes/view';

class Slider {
  constructor($this, options) {
    this.$domEl = $this;
    this.options = options;
    this._init();
  }

  _init() {
    this._addDomElements();
    this._addMVC();
    this._addListener();
  }

  _addMVC() {
    this.model = new Model();
    this.view = new View(this.$domEl);
    this.controller = new Controller(this.options, this.$domEl);
  }

  _addListener() {
    this.controller.on('parametersChanged', (data) => {
      this.model._normalizeInputData(data);
    });
    this.model.on('modelStateChanged', (data) => {
      this.controller._createView(data);
    });
    this.controller.on('modelStateChanged', (data) => {
      this.view.processEvent(data);
    });
    this.view.on('coordinatesChanged', (data) => {
      this.controller._moveSlider(data);
    });
    this.controller.on('coordinatesChanged', (data) => {
      this.model._calculateCoordinates(data);
    });

    this.controller.emit('parametersChanged', this.options);
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
}

(($) => {
  // eslint-disable-next-line no-param-reassign
  $.fn.myFirstSliderPlugin = function initPlugin(options) {
    return new Slider(this, options);
  };
})(jQuery, window);
