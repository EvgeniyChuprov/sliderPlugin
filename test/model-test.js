const assert = require('assert');
const Model = require('../src/plugin/classes/Model');

describe('Доступ к параметрам класса Model', () => {
  const options = { min: 10, max: 90 };
  const model = new Model(options);
  it ('model входящие параметры', () => {
    assert.equal(model.options.min, 10);
    assert.equal(model.options.max, 90);
  });
  it ('проверка стартовых значений и заданных при инициализаци плагина', () => {
    assert.equal(model.setting().min, 10);
    assert.equal(model.setting().valueMin, 10);
  });
});
