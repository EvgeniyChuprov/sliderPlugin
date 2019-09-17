import Controller from './classes/controller';
import Model from './classes/model';
import View from './classes/view';

(($) => {
  const methods = {
    init(options) {
      const create = $(`<div class="range-slider__handle js-range-slider__handle" >
      <span class = "range-slider__tool-handle js-range-slider__tool-handle" ></span></div>
      <div class="range-slider__second-handle js-range-slider__second-handle" >
      <span class = "range-slider__tool-second-handle js-range-slider__tool-second-handle" ></span></div>`);
      this.append(create);

      this.model = new Model();
      this.view = new View(this);
      this.controller = new Controller(options, this);

      this.controller.addSubscriber(this.model.processEvent.bind(this.model));
      this.controller.addSubscriber(this.view.processEvent.bind(this.view));
      this.model.addSubscriber(this.controller.processEvent.bind(this.controller));
      this.view.addSubscriber(this.controller.processEvent.bind(this.controller));

      this.controller.init();

      this.data('setting', this.model.options);
    },
    get() {
      return this.data('setting');
    },
  };

  // eslint-disable-next-line no-param-reassign
  $.fn.myFirstSliderPlugin = function initPlugin(method) {
    if (methods[method]) {
      // eslint-disable-next-line prefer-rest-params
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    }
    // eslint-disable-next-line prefer-rest-params
    return methods.init.apply(this, arguments);
  };
})(jQuery, window);
