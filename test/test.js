const chai = require('chai');
const expect = chai.expect;
const assert = require("assert");

const a = require('../src/plugin/jquery.myFirstSliderPlugin')
const Model = a.model
const View = a.view
const Controller = a.controller
describe("Доступ к параметрам класса Model", function () {
    let model = new Model()
        model.setMin(1)
        model.setMax(90)
        model.setStep(2)
        model.setValueOne(2)
        model.setValueTwo(80)
        model.setToolteap(true)
        model.setSlider2(true)
        model.setVertical(false)
    it("model setMin getMin", function () {
        assert.equal(model.getMin(), 1)
    });
    it("model setMax getMax", function () { 
        assert.equal(model.getMax(), 90)
    });
    it("model setStep getStep", function () {
        assert.equal(model.getStep(), 2)
    });
    it("model setValueOne getValueOne", function () {
        assert.equal(model.getValueOne(), 2)
    });
    it("model setValueTwo getValueTwo", function () {
        assert.equal(model.getValueTwo(), 80)
    });
    it("model setToolteap getToolteap", function () {
        assert.equal(model.getToolteap(), true)
    });
    it("model setSlider2 getSlider2", function () {
        assert.equal(model.getSlider2(), true)
    });
    it("model setVertical getVertical", function () {
        assert.equal(model.getVertical(), false)
    });
  });

  describe("Проверка валидности set класса Model", function () {
        let model = new Model()
        let max = model.getMax()
        let min = model.getMin()
        let step = model.getStep()
        let valueOne = model.getValueOne()
        let valueTwo = model.getValueTwo()
        let toolteap = model.getToolteap();
        let slider2 = model.getSlider2();
        let vertical = model.getVertical();
    it("Если setMax меньше getMin - max не изменяется", function () {
        model.setMax(-10)
        assert.equal(model.getMax(), max)
    });
    it("Если setMax не число - max не изменяется", function () {
        model.setMax("")
        assert.equal(model.getMax(), max)
    });
    it("Если setMin больше getMax - min не изменяется", function () {
        model.setMin(10000)
        assert.equal(model.getMin(), min)
    });
    it("Если setMin не число - min не изменяется", function () {
        model.setMin("")
        assert.equal(model.getMin(), min)
    });
    it("Если setStep не число - step не изменяется", function () {
        model.setStep("")
        assert.equal(model.getStep(), step)
    });
    it("Если setStep больше model.max - step не изменяется", function () {
        model.setStep(10000)
        assert.equal(model.getStep(), step)
    });
    it("Если setStep меньше нуля - step не изменяется", function () {
        model.setStep(-1)
        assert.equal(model.getStep(), step)
    });
    it("Если setValueOne меньше model.min или больше model.max - step не изменяется", function () {
        model.setValueOne(-10000)
        assert.equal(model.getValueOne(), valueOne)
        model.setValueOne(10000)
        assert.equal(model.getValueOne(), valueOne)
    });
    it("Если setValueTwo меньше model.min или больше model.max - step не изменяется", function () {
        model.setValueTwo(-10000)
        assert.equal(model.getValueTwo(), valueTwo)
        model.setValueTwo(10000)
        assert.equal(model.getValueTwo(), valueTwo)
    });
    it("Если setToolteap не boolean - model.toolteap не изменяется", function () {
        model.setToolteap(1)
        assert.equal(model.getToolteap(), toolteap)
    });
    it("Если setSlider2 не boolean - model.slider2 не изменяется", function () {
        model.setSlider2(1)
        assert.equal(model.getSlider2(), slider2)
    });
    it("Если setSlider2 не boolean - model.vertical не изменяется", function () {
        model.setVertical(1)
        assert.equal(model.getVertical(), vertical)
    });
});

describe("Передача параметров из Model в View", function () {
    let model = new Model()
    let view = new View()
    let controller = new Controller()
    view.createBlock('body')
    view.sliderOne = document.querySelector('.sliderOne');
    view.sliderTwo = document.querySelector('.sliderTwo');
    view.numOne = document.querySelector('.numOne');
    view.numTwo = document.querySelector('.numTwo');
    view.sliderOne.style.margin = view.sliderTwo.style.margin ='-10000px'
    view.numOne.style.margin = view.numTwo.style.margin = '-10000px'
    controller.transferAttr(model, view, 'body')
    it("view.sliderOne.min == view.sliderTwo.min == model.min", function () {
        assert.equal(view.sliderOne.min, model.getMin())
        assert.equal(view.sliderTwo.min, model.getMin())
        assert.equal(view.sliderOne.min, view.sliderTwo.min)
    });
    it("view.sliderOne.max == view.sliderTwo.max == model.max", function () {
        assert.equal(view.sliderOne.max, model.getMax())
        assert.equal(view.sliderTwo.max, model.getMax())
        assert.equal(view.sliderOne.max, view.sliderTwo.max)
    });
    it("view.sliderOne.step == view.sliderTwo.step == model.step", function () {
        assert.equal(view.sliderOne.step, model.getStep())
        assert.equal(view.sliderTwo.step, model.getStep())
        assert.equal(view.sliderOne.step, view.sliderTwo.step)
    });
    it("view.sliderOne.value == model.valueOne", function () {
        assert.equal(view.sliderOne.value, model.getValueOne())
    });
    it("view.sliderTwo.value == model.valueTwo", function () {
        assert.equal(view.sliderTwo.value, model.getValueTwo())
    });
    it("view.numOne.innerHTML = model.valueOne", function () {
        assert.equal(view.numOne.innerHTML, model.getValueOne())
    }); 
    it("view.numTwo.innerHTML = model.valueTwo", function () {
        assert.equal(view.numTwo.innerHTML, model.getValueTwo())
    }); 
    it("Отображение тултипов и 2 слайдера", function () {
        model.setToolteap(true)
        model.setSlider2(true)
        view.toolteapAndSlider(model.getToolteap(), model.getSlider2());
        if(model.getToolteap() && model.getSlider2()){
            assert.equal(view.numOne.style.visibility, 'visible') 
            assert.equal(view.numTwo.style.visibility, 'visible') 
            assert.equal(view.sliderTwo.style.visibility, 'visible')  
        }
        model.setToolteap(false)
        model.setSlider2(true)
        view.toolteapAndSlider(model.getToolteap(), model.getSlider2());
        if(!model.getToolteap() && model.getSlider2()){
            assert.equal(view.numOne.style.visibility, 'hidden') 
            assert.equal(view.numTwo.style.visibility, 'hidden') 
            assert.equal(view.sliderTwo.style.visibility, 'visible')  
        }
        model.setToolteap(true)
        model.setSlider2(false)
        view.toolteapAndSlider(model.getToolteap(), model.getSlider2());
        if(model.getToolteap() && !model.getSlider2()){
            assert.equal(view.numOne.style.visibility, 'visible') 
            assert.equal(view.numTwo.style.visibility, 'hidden') 
            assert.equal(view.sliderTwo.style.visibility, 'hidden')  
        }
        model.setToolteap(false)
        model.setSlider2(false)
        view.toolteapAndSlider(model.getToolteap(), model.getSlider2());
        if(!model.getToolteap() && !model.getSlider2()){
            assert.equal(view.numOne.style.visibility, 'hidden') 
            assert.equal(view.numTwo.style.visibility, 'hidden') 
            assert.equal(view.sliderTwo.style.visibility, 'hidden')  
        }
    });
    it("Веритикальное или горизонтальное положение слайдеров", function () {
        model.setVertical(true)
        view.vertical(model.getVertical(), 'body')
        if(model.getVertical()){
            assert.equal(view.sliderOne.classList.contains('slider-vertical'), true) 
            assert.equal(view.sliderTwo.classList.contains('slider-vertical'), true) 
        }  
        model.setVertical(false)
        view.vertical(model.getVertical(), 'body')
        if(!model.getVertical()){
            assert.equal(view.sliderOne.classList.contains('slider-gorizont'), true) 
            assert.equal(view.sliderTwo.classList.contains('slider-gorizont'), true) 
        }
    });
});
describe("Установка пользовательских настроек плагина", function () {
    let model = new Model()
    model.setMin(1)
    model.setMax(10)
    let min = model.getMin()
    let max = model.getMax()
    it("Если настроек не задано", function () {
        let options = undefined
        model.setting(options)
        assert.equal(model.getMin(), min)
        assert.equal(model.getMax(), max)
    });
    it("Если настройки заданы полностью", function () {
        let options = {min: 5, max: 20, step: 3, valueOne: 7,valueTwo:18,
            toolteap: true, slider2: true, vertical: false}
        model.setting(options)
        assert.equal(model.getMin(), 5)
        assert.equal(model.getMax(), 20)
        assert.equal(model.getStep(), 3)
        assert.equal(model.getValueOne(), 7)
        assert.equal(model.getValueTwo(), 18)
        assert.equal(model.getToolteap(), true)
        assert.equal(model.getSlider2(), true)
        assert.equal(model.getVertical(), false)
    });
    it("Если настройки заданы не полностью", function () {
        let options = {min: 3}
        model.setMax(10)
        model.setting(options)
        assert.equal(model.getMin(), 3)
        assert.equal(model.getMax(), max)
    });
});
describe("Высчитывает % смещения ползунка слайдера по горизонтали  и передает это значение тултипу", function () {
    let model = new Model()
    it("Если min = 0  max = 100 value = 40 функция должна вернуть 40%", function () {
        let num = 40 - 2.5 +"%"
        model.setMin(0)
        model.setMax(100)
        model.setValueOne(40)
        assert.equal(model.gorizontTool(model.getValueOne()), num)
    });
    it("Если min = -10  max = 10 value = 0 фуенкция должна вернуть 50%", function () {
        let num = 50 - 2.5 +"%"
        model.setMin(-10)
        model.setMax(10)
        model.setValueTwo(0)
        assert.equal(model.gorizontTool(model.getValueTwo()), num)
    });
});
describe("Высчитывает % смещения ползунка слайдера по вертикали и передает это значение тултипу", function () {
    let model = new Model()
    it("Если min = 0  max = 100 value = 60 функция должна вернуть 60%", function () {
        let num =100 - 60 - 3 +"%"
        model.setMin(0)
        model.setMax(100)
        model.setValueOne(60)
        assert.equal(model.verticalTool(model.getValueOne()), num)
    });
    it("Если min = -10  max = 10 value = 0 функция должна вернуть 50%", function () {
        let num =100 - 50 - 3 +"%"
        model.setMin(-10)
        model.setMax(10)
        model.setValueTwo(0)
        assert.equal(model.verticalTool(model.getValueTwo()), num)
    });
});
describe("Проверка передачи внешних элементов управления в model", function () {
    let model = new Model()
    model.changeTooltip = $('');
    model.changeSlider2 = $('');
    model.changeVertical = $('');
    model.changeMin = $('');
    model.changeMax = $('');
    model.changeStep = $('');
    model.changeValue1 = $('');
    model.changeValue2 = $('');
    
    let options = {
        changeTooltip : $('body'),
        changeSlider2 : $('body'),
        changeVertical : $('body'),
        changeMin : $('body'),
        changeMax : $('body'),
        changeStep : $('body'),
        changeValue1 : $('body'),
        changeValue2 : $('body')
    }
    model.setting(options)
    it("setting передаст внешние элементы в model", function () {
        assert.equal(model.changeTooltip, options.changeTooltip)
        assert.equal(model.changeSlider2, options.changeSlider2)
        assert.equal(model.changeVertical, options.changeVertical)
        assert.equal(model.changeMin, options.changeMin)
        assert.equal(model.changeMax, options.changeMax)
        assert.equal(model.changeStep, options.changeStep)
        assert.equal(model.changeValue1, options.changeValue1)
        assert.equal(model.changeValue2, options.changeValue2)
    });
});
