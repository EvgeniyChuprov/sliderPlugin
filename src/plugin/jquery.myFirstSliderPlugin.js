import Controller from './classes/Controller';
import Model from './classes/Model';
import View from './classes/View';

(($, window, undefined) => {
  const methods = {
    init(options) {
      const model = new Model(options);
      const view = new View();
      const controller = new Controller(model, view, this);
      return this.each(() => {
        controller.options = options;
        const create = $(`<div class="range-slider__value-min" ><div class = "range-slider__tool-min" ></div></div>
        <div class="range-slider__value-max" ><div class = "range-slider__tool-max" ></div></div>`);
        this.append(create);
        model.modelEmit();
        this.data('setting', controller);
      });
    },
    get() {
      return this.data('setting');
    },
  };

  $.fn.myFirstSliderPlugin = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if(typeof method === 'object' || ! method) {
      return methods.init.apply(this, arguments);
    }
  }
})(jQuery, window);
