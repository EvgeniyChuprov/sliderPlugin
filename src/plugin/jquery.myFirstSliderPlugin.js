;(function($, window, undefined){
    module.exports.model = class Model{
        constructor(){
            this.min = 0;
            this.max = 100;
            this.step = 1;
            this.valueOne = 0;
            this.valueTwo = 100;
            this.toolteap = true;
            this.slider2 = true;
            this.vertical = false;
        }
    }
    module.exports.view = class View{}
    module.exports.controller = class Controller{}
    $.fn.myFirstSliderPlugin = function(options) {
        return this.each(function(){ 

       });
    }
})(jQuery, window);
