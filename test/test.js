const chai = require('chai');
const expect = chai.expect;
const assert = require("assert");

const a = require('../src/plugin/jquery.myFirstSliderPlugin')
const Model = a.model
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
        console.log($)
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
        let model2 = new Model()
        let max = model2.getMax()
        let min = model2.getMin()
        let step = model2.getStep()
        let valueOne = model2.getValueOne()
        let valueTwo = model2.getValueTwo()
        let toolteap = model2.getToolteap();
        let slider2 = model2.getSlider2();
        let vertical = model2.getVertical();
    it("Если setMax меньше getMin - max не изменяется", function () {
        model2.setMax(-10)
        assert.equal(model2.getMax(), max)
    });
    it("Если setMax не число - max не изменяется", function () {
        model2.setMax("")
        assert.equal(model2.getMax(), max)
    });
    it("Если setMin больше getMax - min не изменяется", function () {
        model2.setMin(10000)
        assert.equal(model2.getMin(), min)
    });
    it("Если setMin не число - min не изменяется", function () {
        model2.setMin("")
        assert.equal(model2.getMin(), min)
    });
    it("Если setStep не число - step не изменяется", function () {
        model2.setStep("")
        assert.equal(model2.getStep(), step)
    });
    it("Если setStep больше model.max - step не изменяется", function () {
        model2.setStep(10000)
        assert.equal(model2.getStep(), step)
    });
    it("Если setStep меньше нуля - step не изменяется", function () {
        model2.setStep(-1)
        assert.equal(model2.getStep(), step)
    });
    it("Если setValueOne меньше model.min или больше model.max - step не изменяется", function () {
        model2.setValueOne(-10000)
        assert.equal(model2.getValueOne(), valueOne)
        model2.setValueOne(10000)
        assert.equal(model2.getValueOne(), valueOne)
    });
    it("Если setValueTwo меньше model.min или больше model.max - step не изменяется", function () {
        model2.setValueTwo(-10000)
        assert.equal(model2.getValueTwo(), valueTwo)
        model2.setValueTwo(10000)
        assert.equal(model2.getValueTwo(), valueTwo)
    });
    it("Если setToolteap не boolean - model.toolteap не изменяется", function () {
        model2.setToolteap(1)
        assert.equal(model2.getToolteap(), toolteap)
    });
    it("Если setSlider2 не boolean - model.slider2 не изменяется", function () {
        model2.setSlider2(1)
        assert.equal(model2.getSlider2(), slider2)
    });
    it("Если setSlider2 не boolean - model.vertical не изменяется", function () {
        model2.setVertical(1)
        assert.equal(model2.getVertical(), vertical)
    });
});