const assert = require('assert');
const Controller = require('../src/plugin/classes/Controller');

describe('Доступ к параметрам класса Controller', () => {
  const options = { min: 10, max: 90 };
  const domEl = '<div></div>';
  const controller = new Controller(domEl, options);
  it ('controller входящие параметры', () => {
    assert.equal(controller.$domEl, '<div></div>');
    assert.equal(controller.options.min, 10);
    assert.equal(controller.options.max, 90);
  });
});
