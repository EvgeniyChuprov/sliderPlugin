import Controller from './classes/Controller';
import Model from './classes/Model';
import View from './classes/View';

(($) => {
  const methods = {
    init(options) {
      this.model = new Model();
      this.view = new View();
      this.controller = new Controller(options, this);

      return this.each(() => {
        const create = $(`<div class="range-slider__value-min" ><div class = "range-slider__tool-min" ></div></div>
        <div class="range-slider__value-max" ><div class = "range-slider__tool-max" ></div></div>`);
        this.append(create);
        this.controller.subscribe(this.model.normalizationOfSettings.bind(this.model));
        this.controller.subscribe(this.view.init.bind(this.view));
        this.model.subscribe(this.controller.initView.bind(this.controller));
        this.controller.init();
        //this.data('setting', controller);
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
