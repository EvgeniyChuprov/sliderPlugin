const Controller = require('./classes/Controller');

(($, window, undefined) => {
  const controller = new Controller();
  const methods = {
    init(options) {
      return this.each(() => {
        const $this = $(this);
        controller.$domEl = $this;
        const create = $(`<div class="slider-range__value-min" ><div class = "slider-range__tool-min" ></div></div>
        <div class="slider-range__value-max" ><div class = "slider-range__tool-max" ></div></div>`);
        $this.append(create);
        controller.options = options;
        controller.setting();
        $this.data('ggg', controller.view.options);
      });
    },
    get() {
      const $this = $(this);
      const dat = $this.data("ggg") ;
      return dat
    },
    set(opt) {
      const $this = $(this);
      controller.view.options = $this.data("ggg", opt) ;
      console.log($this.data("ggg"))
    }
  };

  $.fn.myFirstSliderPlugin = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if(typeof method === 'object' || ! method) {
      return methods.init.apply(this, arguments);
    }
  }
})(jQuery, window);
