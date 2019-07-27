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
  const minPoint = ((view.options.valueMin - view.options.min) * 100)
  / (view.options.max - view.options.min);
  const maxPoint = ((view.options.valueMax - view.options.min) * 100) 
    / (view.options.max - view.options.min);
  it ('view входящие параметры', () => {
    assert.equal(view.$domEl, '<div></div>');
    assert.equal(view.options.min, 10);
    assert.equal(view.options.max, 90);
  });
  it ('стартовые позиции ползунков и значения тултипов', () => {
    assert.equal(view.$toolMin.html(), options.valueMin);
    assert.equal(view.$toolMax.html(), options.valueMax);
    assert.equal(view.startingPositions().minPoint, minPoint);
    assert.equal(view.startingPositions().maxPoint, maxPoint);
  });
});
