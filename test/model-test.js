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
    minorHandleValue: 40,
    majorHandleValue: 70,
    vertical: false,
    tooltip: true,
    severalHandles: true,
    onChange: null,
    update: null,
  };

  const _normalizeInputData = sinon.spy(model, '_normalizeInputData');
  const _calculateMovingCoordinatesByClick = sinon.spy(model, '_calculateMovingCoordinatesByClick');
  const toMove = sinon.spy(model, '_calculateMovingCoordinates');
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

  it('Проверка вызова __normalizeInputData в методе processEvent', () => {
    model.processEvent('receptionData', 1);
    assert(_normalizeInputData.called);
  });

  it('Проверка вызова _calculateMovingCoordinatesByClick в методе processEvent', () => {
    model.options.onChange = x => x;
    model.processEvent('coordinatesChangedByClick', 1, 2);
    assert(_calculateMovingCoordinatesByClick.called);
  });

  it('Проверка вызова _calculateMovingCoordinates в методе processEvent', () => {
    model.processEvent('coordinatesChangedByHandleMove', 1);
    assert(toMove.called);
  });

  it('Проверка вызова publish в методе _normalizeInputData', () => {
    model._normalizeInputData(externalOptions);
    assert(publish.called);
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
    model.options.severalHandles = true;
    model.options.max = model.options.majorHandleValue - 100;
    model._validateMaximumValue();
    assert.equal(model.options.max >= model.options.majorHandleValue, true);
    model.options.severalHandles = false;
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
    model.options.severalHandles = true;
    model.options.minorHandleValue = model.options.majorHandleValue + 1;
    model._validateMinorHandleValue();
    assert.equal(model.options.minorHandleValue === model.options.majorHandleValue, true);
    model.options.minorHandleValue = model.options.min - 1;
    model._validateMinorHandleValue();
    assert.equal(model.options.minorHandleValue === model.options.min, true);
    model.options.severalHandles = false;
    model.options.minorHandleValue = model.options.max + 1;
    model._validateMinorHandleValue();
    assert.equal(model.options.minorHandleValue === model.options.max, true);
  });

  it('Проверка изменения большего ползунка', () => {
    model._addMissingValues(externalOptions);
    model.options.severalHandles = true;
    model.options.majorHandleValue = model.options.minorHandleValue - 1;
    model._validateMajorHandleValue();
    assert.equal(model.options.minorHandleValue === model.options.majorHandleValue, true);
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

    model.options.severalHandles = true;
    model._calculateMovingCoordinatesByClick(newTop, length);
    if (positionSlider - model.options.min < middle) {
      assert.equal(model.options.minorHandleValue, positionSlider);
    } else {
      assert.equal(model.options.majorHandleValue, positionSlider);
    }
    model.options.severalHandles = false;
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
    assert.equal(model.options.minorHandleValue, value);
    min = false;
    model._calculateMovingCoordinates(newTop, length, min);
    assert.equal(model.options.majorHandleValue, value);
  });
});
