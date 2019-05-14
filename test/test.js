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
    view.sliderOne.style.visibility = view.sliderTwo.style.visibility ='hidden'
    view.numOne.style.visibility = view.numTwo.style.visibility = 'hidden'
    controller.transferAttr(model, view)
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
    it("iew.numTwo.innerHTML = model.valueTwo", function () {
        assert.equal(view.numTwo.innerHTML, model.getValueTwo())
    }); 
});
