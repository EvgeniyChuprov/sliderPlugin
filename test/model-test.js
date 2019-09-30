import assert from 'assert';
import Model from '../src/plugin/classes/model';

describe('Доступ к параметрам класса Model', () => {
  const model = new Model();

  it('Проверка получения параметров по умолчанию', () => {
    model.setOptions({});
    const obj = model.getOptions();
    assert(obj !== null && typeof obj === 'object', true);
    assert('min' in obj, true);
    assert('max' in obj, true);
    assert('step' in obj, true);
    assert('majorHandleValue' in obj, true);
    assert('minorHandleValue' in obj, true);
    assert('isDouble' in obj, true);
    assert('tooltip' in obj, true);
    assert('vertical' in obj, true);
  });

  it('Проверка передачи объекта с корректными параметрами', () => {
    const options = {
      min: 30,
      max: 90,
      step: 5,
      minorHandleValue: 40,
      majorHandleValue: 70,
      vertical: false,
      tooltip: true,
      isDouble: true,
    };

    model.setOptions(options);
    const obj = model.getOptions();
    assert(obj !== null && typeof obj === 'object', true);
    assert(options.min === obj.min, true);
    assert(options.max === obj.max, true);
    assert(options.step === obj.step, true);
    assert(options.majorHandleValue === obj.majorHandleValue, true);
    assert(options.minorHandleValue === obj.minorHandleValue, true);
    assert(options.isDouble === obj.isDouble, true);
    assert(options.tooltip === obj.tooltip, true);
    assert(options.vertical === obj.vertical, true);
  });

  it('Проверка передачи объекта с некорректными параметрами', () => {
    const options = {
      min: 90,
      max: 30,
      step: -4,
      minorHandleValue: 140,
      majorHandleValue: 0,
    };

    model.setOptions(options);
    const obj = model.getOptions();
    assert(obj.min < obj.max, true);
    assert(obj.step >= 1, true);
    assert(obj.minorHandleValue >= obj.min, true);
    assert(obj.minorHandleValue <= obj.max, true);
    assert(obj.minorHandleValue < obj.majorHandleValue, true);
    assert(obj.majorHandleValue >= obj.min, true);
    assert(obj.majorHandleValue <= obj.max, true);
    assert(obj.majorHandleValue > obj.minorHandleValue, true);
  });

  it('Проверка передачи объекта с некорректными типами данных', () => {
    const options = {
      min: '90',
      max: null,
      step: NaN,
      minorHandleValue: '',
      majorHandleValue: 0,
      vertical: {},
      tooltip: x => x,
      isDouble: 123,
    };

    model.setOptions(options);
    const obj = model.getOptions();
    assert(typeof obj.min, 'number');
    assert(typeof obj.max, 'number');
    assert(typeof obj.step, 'number');
    assert(typeof obj.majorHandleValue, 'number');
    assert(typeof obj.minorHandleValue, 'number');
    assert(typeof obj.isDouble, 'number');
    assert(typeof obj.tooltip, 'number');
    assert(typeof obj.vertical, 'number');
  });
});
