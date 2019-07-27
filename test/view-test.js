const assert = require('assert');
const View = require('../src/plugin/classes/View');

describe('Доступ к параметрам класса View', () => {
  const options = {
    min: 10,
    max: 90,
    step: 2,
    valueMin: 10,
    valueMax: 50,
    vertical: false,
    tooltip: true,
  };
  const domEl = '<div></div>';
  const view = new View(domEl, options);
  it ('view входящие параметры', () => {
    assert.equal(view.$domEl, '<div></div>');
    assert.equal(view.options.min, 10);
    assert.equal(view.options.max, 90);
  });
});
