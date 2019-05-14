;(function($, window, undefined){
    class Model{
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
        setMin(value){
            if(value < this.max && !isNaN(value)){
                this.min = value;
            }
        }
        getMin(){
           return this.min;
        }
        setMax(value){
            if(value > this.min && !isNaN(value)){
                this.max = value;
            }
        }
        getMax(){
           return this.max;
        }
        setStep(value){
            if(value > 0 && value < this.max && !isNaN(value)){
                this.step = value;
            }
        }
        getStep(){
           return this.step;
        }
        setValueOne(value){
            if(value >= this.min && value <= this.max && !isNaN(value)){
                this.valueOne = value;
            }
        }
        getValueOne(){
            return this.valueOne;
        }
        setValueTwo(value){
            if(value >= this.min && value <= this.max && !isNaN(value)){
                this.valueTwo = value;
            }
        }
        getValueTwo(){
            return this.valueTwo;
        }
        setToolteap(value){
            if(typeof(value) === "boolean"){
                this.toolteap = value;
            }
        }
        getToolteap(){
            return this.toolteap;
        }
        setSlider2(value){
            if(typeof(value) === "boolean"){
                this.slider2 = value;
            }
        }
        getSlider2(){
            return this.slider2;
        }
        setVertical(value){
            if(typeof(value) === "boolean"){
                this.vertical = value;
            }
        }
        getVertical(){
            return this.vertical;
        }
    }
    
    class View{
        constructor(){
            this.numOne; 
            this.numTwo; 
            this.sliderOne;
            this.sliderTwo;
        }
        createBlock(blockId){
            $(blockId).append('<section class="range-slider"><div  class="numOne"/><div  class="numTwo"/><input type="range" class="sliderOne slider-gorizont"/><input  type="range" class="sliderTwo slider-gorizont"/></section>');
        }
        toolteapAndSlider(toolteap, slider2){
            if(toolteap && slider2){
                this.numOne.style.visibility  = this.numTwo.style.visibility = this.sliderTwo.style.visibility ='visible';
            }else if(toolteap && !slider2){
                this.numOne.style.visibility ='visible';
                this.numTwo.style.visibility = this.sliderTwo.style.visibility ='hidden';
            }else if(!toolteap && slider2){
                this.numOne.style.visibility  = this.numTwo.style.visibility = 'hidden';
                this.sliderTwo.style.visibility ='visible';
            }else{
                this.numOne.style.visibility  = this.numTwo.style.visibility = this.sliderTwo.style.visibility ='hidden';
            }
        }
    }
    class Controller{
        transferAttr(model, view){
            view.sliderOne.min = view.sliderTwo.min = model.getMin();
            view.sliderOne.max = view.sliderTwo.max = model.getMax();
            view.sliderOne.step = view.sliderTwo.step = model.getStep();
            view.sliderOne.value = model.getValueOne();
            view.sliderTwo.value = model.getValueTwo();
            view.numOne.innerHTML = model.getValueOne();
            view.numTwo.innerHTML = model.getValueTwo();
            view.toolteapAndSlider(model.getToolteap(), model.getSlider2());
        } 
    }
    $.fn.myFirstSliderPlugin = function(options) {
        const blockId ='#'+ this[0].id;
        const model = new  Model();
        const view = new View();
        const controller = new Controller();
        return this.each(function(){ 
            view.createBlock(blockId)
            view.sliderOne = document.querySelector(`${blockId} .sliderOne`);
            view.sliderTwo = document.querySelector(`${blockId} .sliderTwo`);
            view.numOne = document.querySelector(`${blockId} .numOne`);
            view.numTwo = document.querySelector(`${blockId} .numTwo`);
            controller.transferAttr(model, view)
       });
    }
    module.exports.model = Model;
    module.exports.view = View;
    module.exports.controller = Controller;
})(jQuery, window);
