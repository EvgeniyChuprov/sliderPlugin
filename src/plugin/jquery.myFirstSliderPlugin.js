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
            this.changeTooltip = $('');
            this.changeSlider2 = $('');
            this.changeVertical = $('');
            this.changeMin = $('');
            this.changeMax = $('');
            this.changeStep = $('');
            this.changeValue1 = $('');
            this.changeValue2 = $('');
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
        setting(options){
            if(options !== undefined){
                if(options.min !== undefined){this.setMin(options.min)};
                if(options.max !== undefined){this.setMax(options.max)};
                if(options.step !== undefined){this.setStep(options.step)};
                if(options.valueOne !== undefined){this.setValueOne(options.valueOne)};
                if(options.valueTwo !== undefined){this.setValueTwo(options.valueTwo)};
                if(options.toolteap !== undefined){this.setToolteap(options.toolteap)};
                if(options.slider2 !== undefined){this.setSlider2(options.slider2)};
                if(options.vertical !== undefined){this.setVertical(options.vertical)};
                if(options.changeTooltip !== undefined){ this.changeTooltip = options.changeTooltip};
                if(options.changeSlider2 !== undefined){ this.changeSlider2 = options.changeSlider2};
                if(options.changeVertical !== undefined){ this.changeVertical = options.changeVertical};
                if(options.changeMin !== undefined){ this.changeMin = options.changeMin};
                if(options.changeMax !== undefined){ this.changeMax = options.changeMax};
                if(options.changeStep !== undefined){ this.changeStep = options.changeStep};
                if(options.changeValue1 !== undefined){ this.changeValue1 = options.changeValue1};
                if(options.changeValue2 !== undefined){ this.changeValue2 = options.changeValue2};
            }
        }
        gorizontTool(value){
            return  Math.round((value - this.getMin()) * 100 / Math.round(this.getMax()- this.getMin())) -2.5 + '%';
        }
        verticalTool(value){
            return 100 - Math.round((value - this.getMin()) * 100 / Math.round(this.getMax() - this.getMin())) - 3 + '%';
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
        vertical(value, blockId){
            if(value){
                $(`${blockId} .sliderOne`).addClass('slider-vertical').removeClass('slider-gorizont');
                $(`${blockId} .sliderTwo`).addClass('slider-vertical').removeClass('slider-gorizont');
                $(`${blockId} .range-slider`).css({'width':'90px','height':'100%'});
                $(`${blockId} .numOne`).css({'left':'65px'});  
                $(`${blockId} .numTwo`).css({'left':'65px'}); 
            }else{
                $(`${blockId} .sliderOne`).addClass('slider-gorizont').removeClass('slider-vertical');
                $(`${blockId} .sliderTwo`).addClass('slider-gorizont').removeClass('slider-vertical');
                $(`${blockId} .range-slider`).css({'width':'100%','height':'70px'});
                $(`${blockId} .numOne`).css({'top':'0'});  
                $(`${blockId} .numTwo`).css({'top':'0'}); 
            }
        }
    }
    class Controller{    
        transferAttr(model, view, blockId){
            view.sliderOne.min = view.sliderTwo.min = model.getMin();
            view.sliderOne.max = view.sliderTwo.max = model.getMax();
            view.sliderOne.step = view.sliderTwo.step = model.getStep();
            view.sliderOne.value = model.getValueOne();
            view.sliderTwo.value = model.getValueTwo();
            view.numOne.innerHTML = model.getValueOne();
            view.numTwo.innerHTML = model.getValueTwo();
            view.toolteapAndSlider(model.getToolteap(), model.getSlider2());
            view.vertical(model.getVertical(), blockId);
            if(model.getVertical()){ 
                view.numOne.style.top = model.verticalTool(model.getValueOne());
                view.numTwo.style.top = model.verticalTool(model.getValueTwo());
            }else{
                view.numOne.style.left = model.gorizontTool(model.getValueOne());
                view.numTwo.style.left = model.gorizontTool(model.getValueTwo());
            }
            model.changeMin.val(model.getMin());
            model.changeMax.val(model.getMax());
            model.changeStep.val(model.getStep());
            model.changeValue1.val(model.getValueOne());
            model.changeValue2.val(model.getValueTwo());
            model.changeTooltip.prop('checked', model.getToolteap());
            model.changeSlider2.prop('checked', model.getSlider2());
            model.changeVertical.prop('checked', model.getVertical());
        } 
        externalChanges(model, view, blockId ){
            var thas = this;
            model.changeMin.change(function() {
                model.setMin(model.changeMin.val());
                thas.transferAttr(model, view, blockId)
            })
            model.changeMin.change(function() {
                model.setMin(model.changeMin.val());
                thas.transferAttr(model, view, blockId)
            });
            model.changeMax.change(function() {
                model.setMax(model.changeMax.val());
                thas.transferAttr(model, view, blockId)
            });
            model.changeStep.change(function() {
                model.setStep(model.changeStep.val());
                thas.transferAttr(model, view, blockId)
            });
            model.changeValue1.change(function() {
                model.setValueOne(model.changeValue1.val());
                thas.transferAttr(model, view, blockId)
            });
            model.changeValue2.change(function() {
                model.setValueTwo(model.changeValue2.val());
                thas.transferAttr(model, view, blockId)
            });
            model.changeTooltip.change(function() {
                if(model.changeTooltip.is(':checked')){
                    model.setToolteap(true)
                    view.toolteapAndSlider(model.getToolteap(), model.getSlider2());
                }else{
                    model.setToolteap(false) 
                    view.toolteapAndSlider(model.getToolteap(), model.getSlider2());
                }
            });
            model.changeSlider2.change(function() {
                if(model.changeSlider2.is(':checked')){
                    model.setSlider2(true)
                    view.toolteapAndSlider(model.getToolteap(), model.getSlider2());
                }else{
                    model.setSlider2(false) 
                    view.toolteapAndSlider(model.getToolteap(), model.getSlider2());
                }
            });
            model.changeVertical.change(function() {
                if(model.changeVertical.is(':checked')){
                    model.setVertical(true)
                    thas.transferAttr(model, view, blockId)
                }else{
                    model.setVertical(false) 
                    thas.transferAttr(model, view, blockId)
                }
            });
        }
        move(model, view, blockId){
            var thas = this
            view.sliderOne.oninput = function() {
                if(model.getVertical()){
                    model.setValueOne(view.sliderOne.value);
                    thas.transferAttr(model, view, blockId)
                }else{
                    model.setValueOne(view.sliderOne.value);
                    thas.transferAttr(model, view, blockId) 
                }
            };
            view.sliderTwo.oninput = function() {
                if(model.getVertical()){
                    model.setValueTwo(view.sliderTwo.value);
                    thas.transferAttr(model, view, blockId)
                }else{
                    model.setValueTwo(view.sliderTwo.value);
                    thas.transferAttr(model, view, blockId) 
                }
            };
        }
    }
    $.fn.myFirstSliderPlugin = function(options) {
        const blockId ='#'+ this[0].id;
        const model = new  Model();
        const view = new View();
        const controller = new Controller();
        return this.each(function(){ 
            view.createBlock(blockId);
            view.sliderOne = document.querySelector(`${blockId} .sliderOne`);
            view.sliderTwo = document.querySelector(`${blockId} .sliderTwo`);
            view.numOne = document.querySelector(`${blockId} .numOne`);
            view.numTwo = document.querySelector(`${blockId} .numTwo`);
            model.setting(options);
            controller.transferAttr(model, view, blockId);
            controller.externalChanges(model, view, blockId )
            controller.move(model, view, blockId) 
       });
    }
    module.exports.model = Model;
    module.exports.view = View;
    module.exports.controller = Controller;
})(jQuery, window);