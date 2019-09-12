import Controller from './classes/controller';
import Model from './classes/model';
import View from './classes/view';

(($) => {
  const methods = {
    init(options) {
      const create = $(`<div class="range-slider__value-min" ><span class = "range-slider__tool-min " ></span></div>
      <div class="range-slider__value-max" ><span class = "range-slider__tool-max " ></span></div>`);
      this.append(create);

      this.model = new Model();
      this.view = new View(this);
      this.controller = new Controller(options, this);

      return this.each(() => {
        this.controller.subscribe(this.model.processEvent.bind(this.model));
        this.controller.subscribe(this.view.processEvent.bind(this.view));
        this.model.subscribe(this.controller.processEvent.bind(this.controller));
        this.view.subscribe(this.controller.processEvent.bind(this.controller));

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
