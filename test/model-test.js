/* eslint-disable no-underscore-dangle */
import assert from 'assert';
import sinon from 'sinon';
import Model from '../src/plugin/classes/Model';

describe('Доступ к параметрам класса Model', () => {
  const model = new Model();
  const externalOptions = {
    min: 30,
    max: 90,
    step: 5,
    valueMin: 40,
    valueMax: 70,
    vertical: false,
    tooltip: true,
    twoSliders: true,
    onChange: null,
    update: null,
  };

  const normalizationOfSettings = sinon.spy(model, '_normalizationOfSettings');
  const toClick = sinon.spy(model, '_toClick');
  const toMove = sinon.spy(model, '_toMove');
  const publish = sinon.spy(model, 'publish');

  it('Проверка получения параметров по умолчанию', () => {
    const emptyObj = {};
    assert.equal(typeof model.options === 'undefined', true);
    model._addMissingValues(emptyObj);
    assert.equal(typeof model.options.min, 'number');
    assert.equal(typeof model.options.tooltip, 'boolean');
  });

  it('Проверка получения параметров', () => {
    model._addMissingValues(externalOptions);
    assert.equal(model.options.min, 30);
    assert.equal(model.options.tooltip, true);
  });

  it('Проверка вызова _normalizationOfSettings в методе getDataFromController', () => {
    model.getDataFromController('forModel', 1);
    assert(normalizationOfSettings.called);
  });

  it('Проверка вызова toClick в методе getDataFromController', () => {
    model.options.onChange = x => x;
    model.getDataFromController('coordinatesClickForModel', 1, 2);
    assert(toClick.called);
  });

  it('Проверка вызова _toMove в методе getDataFromController', () => {
    model.getDataFromController('coordinatesMoveForModel', 1);
    assert(toMove.called);
  });

  it('Проверка вызова publish в методе _normalizationOfSettings', () => {
    model._normalizationOfSettings(externalOptions);
    assert(publish.called);
  });

  it('Проверка измения минимума', () => {
    model.options.min = model.options.valueMin + 100;
    model._checkMin();
    assert.equal(model.options.min <= model.options.valueMin, true);
    model.options.valueMin = model.options.max;
    model.options.min = model.options.max;
    model._checkMin();
    assert.equal(model.options.min < model.options.max, true);
  });

  it('Проверка изменения максимума', () => {
    model._addMissingValues(externalOptions);
    model.options.twoSliders = true;
    model.options.max = model.options.valueMax - 100;
    model._checkMax();
    assert.equal(model.options.max >= model.options.valueMax, true);
    model.options.twoSliders = false;
    model.options.max = model.options.valueMin - 100;
    model._checkMax();
    assert.equal(model.options.max >= model.options.valueMin, true);
    model.options.valueMin = model.options.min;
    model.options.max = model.options.min;
    model._checkMax();
    assert.equal(model.options.max > model.options.min, true);
  });

  it('Проверка изменения шага', () => {
    model._addMissingValues(externalOptions);
    model.options.step = -2;
    model._checkStep();
    assert.equal(model.options.step === 1, true);
    model.options.step = model.options.max + 10;
    model._checkStep();
    assert.equal(model.options.step === 1, true);
  });

  it('Проверка изменения меньшего ползунка', () => {
    model._addMissingValues(externalOptions);
    model.options.twoSliders = true;
    model.options.valueMin = model.options.valueMax + 1;
    model._checkValueMin();
    assert.equal(model.options.valueMin === model.options.valueMax, true);
    model.options.valueMin = model.options.min - 1;
    model._checkValueMin();
    assert.equal(model.options.valueMin === model.options.min, true);
    model.options.twoSliders = false;
    model.options.valueMin = model.options.max + 1;
    model._checkValueMin();
    assert.equal(model.options.valueMin === model.options.max, true);
  });

  it('Проверка изменения большего ползунка', () => {
    model._addMissingValues(externalOptions);
    model.options.twoSliders = true;
    model.options.valueMax = model.options.valueMin - 1;
    model._checkValueMax();
    assert.equal(model.options.valueMin === model.options.valueMax, true);
    model.options.valueMax = model.options.max + 1;
    model._checkValueMax();
    assert.equal(model.options.valueMax === model.options.max, true);
  });

  it('Проверка получения констант', () => {
    model._addMissingValues(externalOptions);
    const minPoint = ((model.options.valueMin - model.options.min) * 100)
    / (model.options.max - model.options.min);
    const maxPoint = ((model.options.valueMax - model.options.min) * 100)
    / (model.options.max - model.options.min);
    const step = 100 / ((model.options.max - model.options.min)
    / model.options.step);
    model._initConstants();
    assert.equal(model._initConstants().minPoint, minPoint);
    assert.equal(model._initConstants().maxPoint, maxPoint);
    assert.equal(model._initConstants().step, step);
  });

  it('Проверка расчета перемещения по клику', () => {
    model._addMissingValues(externalOptions);
    model.options.onChange = x => x;
    const newTop = 2;
    const length = 10;
    const shiftPercentage = (newTop * 100) / length;
    const middle = (model.options.max - model.options.min) / 2;
    const positionSlider = model.options.step * Math.round(shiftPercentage
     / model._initConstants().step) + model.options.min;

    model.options.twoSliders = true;
    model._toClick(newTop, length);
    if (positionSlider - model.options.min < middle) {
      assert.equal(model.options.valueMin, positionSlider);
    } else {
      assert.equal(model.options.valueMax, positionSlider);
    }
    model.options.twoSliders = false;
    model._toClick(newTop, length);
    assert.equal(model.options.valueMin, positionSlider);
  });

  it('Проверка расчета перетаскивания ползунка', () => {
    model._addMissingValues(externalOptions);
    model.options.onChange = x => x;
    const newTop = 10;
    const length = 20;
    const shiftPercentage = (newTop * 100) / length;
    const value = model.options.step * Math.round(shiftPercentage
    / model._initConstants().step) + model.options.min;
    let min = true;
    model._toMove(newTop, length, min);
    assert.equal(model.options.valueMin, value);
    min = false;
    model._toMove(newTop, length, min);
    assert.equal(model.options.valueMax, value);
  });
});
