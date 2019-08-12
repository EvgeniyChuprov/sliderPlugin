const Controller = require('./classes/Controller');

(($, window, undefined) => {
  const controller = new Controller();
  const methods = {
    init(options) {
      return this.each(() => {
        controller.$domEl = this;
        const create = $(`<div class="range-slider__value-min" ><div class = "range-slider__tool-min" ></div></div>
        <div class="range-slider__value-max" ><div class = "range-slider__tool-max" ></div></div>`);
        this.append(create);
        controller.options = options;
        controller.init();

        this.data('setting', controller.model.setting);
      });
    },
    get() {
      const setting = this.data('setting');
      return setting;
    },
    set(options) {
      controller.$domEl = this;
      controller.options = this.data('setting');
      controller.initSetting();
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
