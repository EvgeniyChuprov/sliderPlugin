import Controller from './classes/Controller';
import Model from './classes/Model';
import View from './classes/View';

(($) => {
  const methods = {
    init(options) {
      this.model = new Model();
      this.view = new View(this);
      this.controller = new Controller(options, this);

      return this.each(() => {
        const create = $(`<div class="range-slider__value-min" ><div class = "range-slider__tool-min" ></div></div>
        <div class="range-slider__value-max" ><div class = "range-slider__tool-max" ></div></div>`);
        this.append(create);

        this.controller.subscribe(this.model.processEvent.bind(this.model));
        this.controller.subscribe(this.view.processEvent.bind(this.view));
        this.model.subscribe(this.controller.transferData.bind(this.controller));
        this.view.subscribe(this.controller.transferData.bind(this.controller));

        this.controller.init();

        this.data('setting', this.model.options);
      });
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
