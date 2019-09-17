/* eslint-disable no-underscore-dangle */
import assert from 'assert';
import sinon from 'sinon';
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

  const _normalizeInputData = sinon.spy(model, '_normalizeInputData');
  const _calculateCoordinates = sinon.spy(model, '_calculateCoordinates');
  const _calculateMovingCoordinatesByClick = sinon.spy(model, '_calculateMovingCoordinatesByClick');
  const _calculateMovingCoordinates = sinon.spy(model, '_calculateMovingCoordinates');
  const notifySubscribers = sinon.spy(model, 'notifySubscribers');

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

  it('Проверка вызова _normalizeInputData в методе processEvent', () => {
    model.processEvent('parametersChanged', 1);
    assert(_normalizeInputData.called);
  });

  it('Проверка вызова _calculateCoordinates в методе processEvent', () => {
    model.options.onChange = x => x;
    model.processEvent('coordinatesChanged', 1, 2);
    assert(_calculateCoordinates.called);
  });

  it('Проверка вызова notifySubscribers в методе _normalizeInputData', () => {
    model._normalizeInputData(externalOptions);
    assert(notifySubscribers.called);
  });

  it('Проверка вызова _calculateMovingCoordinates в методе _calculateCoordinates', () => {
    const newTop = 10;
    const length = 10;
    const moveMinorHandle = true;
    model._calculateCoordinates(newTop, length, moveMinorHandle);
    assert(_calculateMovingCoordinates.called);
  });

  it('Проверка вызова _calculateMovingCoordinatesByClick в методе _calculateCoordinates', () => {
    const newTop = 10;
    const length = 10;
    const moveMinorHandle = null;
    model._calculateCoordinates(newTop, length, moveMinorHandle);
    assert(_calculateMovingCoordinatesByClick.called);
  });

  it('Проверка измения минимума', () => {
    model.options.min = model.options.minorHandleValue + 100;
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
    model.options.max = model.options.majorHandleValue - 100;
    model._validateMaximumValue();
    assert.equal(model.options.max >= model.options.majorHandleValue, true);
    model.options.isDouble = false;
    model.options.max = model.options.minorHandleValue - 100;
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
    model.options.minorHandleValue = model.options.majorHandleValue + 1;
    model._validateMinorHandleValue();
    assert.equal(model.options.minorHandleValue === model.options.majorHandleValue - model.options.step, true);
    model.options.minorHandleValue = model.options.min - 1;
    model._validateMinorHandleValue();
    assert.equal(model.options.minorHandleValue === model.options.min, true);
    model.options.isDouble = false;
    model.options.minorHandleValue = model.options.max + 1;
    model._validateMinorHandleValue();
    assert.equal(model.options.minorHandleValue === model.options.max, true);
  });

  it('Проверка изменения большего ползунка', () => {
    model._addMissingValues(externalOptions);
    model.options.isDouble = true;
    model.options.majorHandleValue = model.options.minorHandleValue - 1;
    model._validateMajorHandleValue();
    assert.equal(model.options.minorHandleValue === model.options.majorHandleValue - model.options.step, true);
    model.options.majorHandleValue = model.options.max + 1;
    model._validateMajorHandleValue();
    assert.equal(model.options.majorHandleValue === model.options.max, true);
  });

  it('Проверка получения констант', () => {
    model._addMissingValues(externalOptions);
    const minPoint = ((model.options.minorHandleValue - model.options.min) * 100)
    / (model.options.max - model.options.min);
    const maxPoint = ((model.options.majorHandleValue - model.options.min) * 100)
    / (model.options.max - model.options.min);
    const step = 100 / ((model.options.max - model.options.min)
    / model.options.step);
    model._calculateSliderParameters();
    assert.equal(model._calculateSliderParameters().minPoint, minPoint);
    assert.equal(model._calculateSliderParameters().maxPoint, maxPoint);
    assert.equal(model._calculateSliderParameters().step, step);
  });

  it('Проверка расчета перемещения по клику', () => {
    model._addMissingValues(externalOptions);
    model.options.onChange = x => x;
    const newTop = 2;
    const length = 10;
    const shiftPercentage = (newTop * 100) / length;
    const middle = (model.options.max - model.options.min) / 2;
    const positionSlider = model.options.step * Math.round(shiftPercentage
     / model._calculateSliderParameters().step) + model.options.min;

    model.options.isDouble = true;
    model._calculateMovingCoordinatesByClick(newTop, length);
    if (positionSlider - model.options.min < middle) {
      assert.equal(model.options.minorHandleValue, positionSlider);
    } else {
      assert.equal(model.options.majorHandleValue, positionSlider);
    }
    model.options.isDouble = false;
    model._calculateMovingCoordinatesByClick(newTop, length);
    assert.equal(model.options.minorHandleValue, positionSlider);
  });

  it('Проверка расчета перетаскивания ползунка', () => {
    model._addMissingValues(externalOptions);
    model.options.onChange = x => x;
    const newTop = 10;
    const length = 20;
    const shiftPercentage = (newTop * 100) / length;
    const value = model.options.step * Math.round(shiftPercentage
    / model._calculateSliderParameters().step) + model.options.min;
    let min = true;
    model._calculateMovingCoordinates(newTop, length, min);
    if (value >= model.options.min
      && value <= model.options.majorHandleValue - model.options.step) {
      assert.equal(model.options.minorHandleValue, value);
    }
    assert.equal(model.options.minorHandleValue, value);

    min = false;
    model._calculateMovingCoordinates(newTop, length, min);
    if (value >= model.options.max
      && value >= model.options.minorHandleValue + model.options.step) {
      assert.equal(model.options.majorHandleValue, value);
    }
  });
});
