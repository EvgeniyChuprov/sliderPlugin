/* eslint no-underscore-dangle: ["error", { "allowAftermodel": true }] */
const assert = require('assert');

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

  it('Проверка получения параметров по умолчанию', () => {
    const emptyObj = {};

    assert.equal(typeof model.options === 'undefined', true);

    // eslint-disable-next-line no-underscore-dangle
    model._addMissingValues(emptyObj);

    assert.equal(typeof model.options.min, 'number');
    assert.equal(typeof model.options.tooltip, 'boolean');
  });

  it('Проверка получения параметров', () => {
    // eslint-disable-next-line no-underscore-dangle
    model._addMissingValues(externalOptions);

    assert.equal(model.options.min, 30);
    assert.equal(model.options.tooltip, true);
  });

  it('Проверка измения минимума', () => {
    model.options.min = model.options.valueMin + 100;
    // eslint-disable-next-line no-underscore-dangle
    model._checkMin();
    assert.equal(model.options.min <= model.options.valueMin, true);
    model.options.valueMin = model.options.max;
    model.options.min = model.options.max;
    // eslint-disable-next-line no-underscore-dangle
    model._checkMin();
    assert.equal(model.options.min < model.options.max, true);
  });

  it('Проверка изменения максимума', () => {
    model._addMissingValues(externalOptions);
    model.options.twoSliders = true;
    model.options.max = model.options.valueMax - 100;
    // eslint-disable-next-line no-underscore-dangle
    model._checkMax();
    assert.equal(model.options.max >= model.options.valueMax, true);

    model.options.twoSliders = false;
    model.options.max = model.options.valueMin - 100;
    // eslint-disable-next-line no-underscore-dangle
    model._checkMax();
    assert.equal(model.options.max >= model.options.valueMin, true);
    model.options.valueMin = model.options.min;
    model.options.max = model.options.min;
    // eslint-disable-next-line no-underscore-dangle
    model._checkMax();
    assert.equal(model.options.max > model.options.min, true);
  });

  it('Проверка изменения шага', () => {
    model._addMissingValues(externalOptions);
    model.options.step = -2;
    // eslint-disable-next-line no-underscore-dangle
    model._checkStep();
    assert.equal(model.options.step === 1, true);

    model.options.step = model.options.max + 10;
    // eslint-disable-next-line no-underscore-dangle
    model._checkStep();
    assert.equal(model.options.step === 1, true);
  });

  it('Проверка изменения меньшего ползунка', () => {
    // eslint-disable-next-line no-underscore-dangle
    model._addMissingValues(externalOptions);
    model.options.twoSliders = true;

    model.options.valueMin = model.options.valueMax + 1;
    // eslint-disable-next-line no-underscore-dangle
    model._checkValueMin();
    assert.equal(model.options.valueMin === model.options.valueMax, true);

    model.options.valueMin = model.options.min - 1;
    // eslint-disable-next-line no-underscore-dangle
    model._checkValueMin();
    assert.equal(model.options.valueMin === model.options.min, true);

    model.options.twoSliders = false;
    model.options.valueMin = model.options.max + 1;
    // eslint-disable-next-line no-underscore-dangle
    model._checkValueMin();
    assert.equal(model.options.valueMin === model.options.max, true);
  });

  it('Проверка изменения большего ползунка', () => {
    // eslint-disable-next-line no-underscore-dangle
    model._addMissingValues(externalOptions);
    model.options.twoSliders = true;

    model.options.valueMax = model.options.valueMin - 1;
    // eslint-disable-next-line no-underscore-dangle
    model._checkValueMax();
    assert.equal(model.options.valueMin === model.options.valueMax, true);

    model.options.valueMax = model.options.max + 1;
    // eslint-disable-next-line no-underscore-dangle
    model._checkValueMax();
    assert.equal(model.options.valueMax === model.options.max, true);
  });

  it('Проверка получения констант', () => {
    // eslint-disable-next-line no-underscore-dangle
    model._addMissingValues(externalOptions);
    const minPoint = ((model.options.valueMin - model.options.min) * 100)
    / (model.options.max - model.options.min);
    const maxPoint = ((model.options.valueMax - model.options.min) * 100)
    / (model.options.max - model.options.min);
    const step = 100 / ((model.options.max - model.options.min)
    / model.options.step);
    // eslint-disable-next-line no-underscore-dangle
    model._initConstants();


    assert.equal(model._initConstants().minPoint, minPoint);
    assert.equal(model._initConstants().maxPoint, maxPoint);
    assert.equal(model._initConstants().step, step);
  });

  it('Проверка расчета перемещения по клику', () => {
    // eslint-disable-next-line no-underscore-dangle
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
    // eslint-disable-next-line no-underscore-dangle
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
