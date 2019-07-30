const Controller = require('./classes/Controller');


(function ($, window, undefined) {

  const methods = {
    init : function( options ) {  },
    show : function( ) { },
    hide : function( ) { },
    update : function( content ) { }
  };

  $.fn.myFirstSliderPlugin = function (options)  {
    const controller = new Controller(this, options);
  //  console.log(controller.setting())
    return this.each(() => {
      controller.setting();
    });
  }
})(jQuery, window);