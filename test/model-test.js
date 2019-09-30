/* eslint-disable no-underscore-dangle */
import assert from 'assert';
import Model from '../src/plugin/classes/model';

describe('Доступ к параметрам класса Model', () => {
  const model = new Model();
  const externalOptions = {
    min: 30,
    max: 90,
    step: 5,
    minorHandleValue: 40,
    majorHandleValue: 70,
    vertical: false,
    tooltip: true,
    isDouble: true,
    onChange: null,
    update: null,
  };

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

  it('Проверка измения минимума', () => {
    model.options.min = model.options.minorHandleValue + 1;
    model._validateMinimumValue();
    assert.equal(model.options.min <= model.options.minorHandleValue, true);
    model.options.minorHandleValue = model.options.max;
    model.options.min = model.options.max;
    model._validateMinimumValue();
    assert.equal(model.options.min < model.options.max, true);
  });

  it('Проверка изменения максимума', () => {
    model._addMissingValues(externalOptions);
    model.options.isDouble = true;
    model.options.max = model.options.majorHandleValue - 1;
    model._validateMaximumValue();
    assert.equal(model.options.max >= model.options.majorHandleValue, true);
    model.options.isDouble = false;
    model.options.max = model.options.minorHandleValue - 1;
    model._validateMaximumValue();
    assert.equal(model.options.max >= model.options.minorHandleValue, true);
    model.options.minorHandleValue = model.options.min;
    model.options.max = model.options.min;
    model._validateMaximumValue();
    assert.equal(model.options.max > model.options.min, true);
  });

  it('Проверка изменения шага', () => {
    model._addMissingValues(externalOptions);
    model.options.step = -2;
    model._validateStepValue();
    assert.equal(model.options.step === 1, true);
    model.options.step = model.options.max + 10;
    model._validateStepValue();
    assert.equal(model.options.step === 1, true);
  });

  it('Проверка изменения меньшего ползунка', () => {
    model._addMissingValues(externalOptions);

    model.options.isDouble = true;

    model.options.minorHandleValue = 40;
    model.options.step = 5;
    model.options.minorHandleValue += 3;
    model._validateMinorHandleValue();

    assert.equal(model.options.minorHandleValue === 45, true);

    model.options.minorHandleValue = model.options.min - 1;
    model._validateMinorHandleValue();

    assert.equal(model.options.minorHandleValue === model.options.min, true);

    model.options.isDouble = false;

    model.options.minorHandleValue = 40;
    model.options.step = 5;
    model.options.minorHandleValue += 3;
    model._validateMinorHandleValue();

    assert.equal(model.options.minorHandleValue === 45, true);

    model.options.minorHandleValue = model.options.max + 1;
    model._validateMinorHandleValue();
    assert.equal(model.options.minorHandleValue === model.options.max, true);
  });

  it('Проверка изменения большего ползунка', () => {
    model._addMissingValues(externalOptions);

    model.options.isDouble = true;

    model.options.majorHandleValue = 70;
    model.options.step = 5;
    model.options.majorHandleValue -= 3;
    model._validateMajorHandleValue();

    assert.equal(model.options.majorHandleValue === 65, true);

    model.options.majorHandleValue = model.options.minorHandleValue - 1;
    model._validateMajorHandleValue();

    assert.equal(model.options.minorHandleValue
       === model.options.majorHandleValue - model.options.step, true);

    model.options.majorHandleValue = model.options.max + 1;
    model._validateMajorHandleValue();
    assert.equal(model.options.majorHandleValue === model.options.max, true);

    model.options.isDouble = false;
    model._validateMajorHandleValue();
    model.options.majorHandleValue = model.options.max;
  });
});
