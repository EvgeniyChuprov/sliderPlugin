const Controller = require('./classes/Controller');

(function ($, window, undefined) {
  $.fn.myFirstSliderPlugin = function (options)  {
    const controller = new Controller(this, options);
    return this.each(() => {
      controller.setting();
    });
  }
})(jQuery, window);