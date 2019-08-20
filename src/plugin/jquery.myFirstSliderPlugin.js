const Controller = require('./classes/Controller');
const Model = require('./classes/Model');
const View = require('./classes/View');

(($, window, undefined) => {
  const model = new Model();
  const view = new View();
  const controller = new Controller(model, view);
  const methods = {
    init(options) {
      return this.each(() => {
        controller.$domEl = this;
        const create = $(`<div class="range-slider__value-min" ><div class = "range-slider__tool-min" ></div></div>
        <div class="range-slider__value-max" ><div class = "range-slider__tool-max" ></div></div>`);
        this.append(create);
        model.event();
        controller.init();
        this.data('setting', model.setting);
      });
    },
    get() {
      // const setting = this.data('setting');
      // return setting;
    },
    set(options) {
      // controller.$domEl = this;
      // controller.options = this.data('setting');
      // controller.initSetting();
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
