/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
/* eslint-env mocha */
const assert = require('assert');
const View = require('../src/plugin/classes/View');

describe('Доступ к параметрам класса View', () => {
  const options = {
    min: 10,
    max: 90,
    step: 2,
    valueMin: 15,
    valueMax: 50,
    vertical: false,
    tooltip: true,
    twoSliders: true,
  };
  const domEl = $('body');
  const view = new View(domEl, options);


  it ('view входящие параметры', () => {
    assert.equal(view.options.min, 10);
    assert.equal(view.options.max, 90);
  });

  it ('view создание DOM элементов', () => {
    assert.equal(view.$valueMin, undefined);
    view._createSlider();
    assert.equal(view.$valueMin.hasClass('slider-range__value-min'), true);
    assert.equal(view.$valueMax.hasClass('slider-range__value-max'), true);
  });

  it ('view начальные позиции ползунков', () => {
    view.options.vertical = true;
    view._constants();
    view._startingPositions();
    assert.equal(view.$valueMin.css('top'), `${view._constants().minPoint}%`);
    view.options.vertical = false;
    view._startingPositions();
    assert.equal(view.$valueMax.css('left'), `${view._constants().maxPoint}%`);
  });

  it ('view видимость тултипов', () => {
    view.options.tooltip = true;
    view._tool();
    assert.equal(view.$toolMin.css('visibility'), 'visible');
    view.options.tooltip = false;
    view._tool();
    assert.equal(view.$toolMin.css('visibility'), 'hidden');
  });

  it ('view вертикальное - горизонтальное  расположение слайдера', () => {
    view.options.vertical = true;
    view._vertical();
    assert.equal(view.$domEl.hasClass('slider-range_vertical'), true);
    assert.equal(view.$valueMin.hasClass('slider-range__value-min_horizon'), false);
    view.options.vertical = false;
    view._vertical();
    assert.equal(view.$domEl.hasClass('slider-range_horizon'), true);
    assert.equal(view.$valueMin.hasClass('slider-range__value-min_vertical'), false);
  });

  it ('view один или два ползунка', () => {
    view.options.twoSliders = true;
    view._twoSliders();
    assert.equal(view.$valueMax.css('display'), 'block');
    view.options.twoSliders = false;
    view._twoSliders();
    assert.equal(view.$toolMax.css('display'), 'none');
  });
});
