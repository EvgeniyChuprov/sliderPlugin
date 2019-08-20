
/* eslint-env mocha */
//const assert = require('assert');
import assert from 'assert';
//const View = require('../src/plugin/classes/View');
import View from '../src/plugin/classes/View';
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
  const create = $(`<div class="range-slider__value-min" ><div class = "range-slider__tool-min" ></div></div>
        <div class="range-slider__value-max" ><div class = "range-slider__tool-max" ></div></div>`);
  domEl.append(create);
  const view = new View(domEl, options);


  it ('view входящие параметры', () => {
    assert.equal(view.options.min, 10);
    assert.equal(view.options.max, 90);
  });

  it ('view создание DOM элементов', () => {
    assert.equal(view.$valueMin, undefined);
    view._createSlider();
    assert.equal(view.$valueMin.hasClass('range-slider__value-min'), true);
    assert.equal(view.$valueMax.hasClass('range-slider__value-max'), true);
  });

  it ('view начальные позиции ползунков', () => {
    view.options.vertical = true;
    view.initConstants();
    view._drawStartingPositions();
    assert.equal(view.$valueMin.css('top'), `${view.initConstants().minPoint}%`);
    view.options.vertical = false;
    view._drawStartingPositions();
    assert.equal(view.$valueMax.css('left'), `${view.initConstants().maxPoint}%`);
  });

  it ('view видимость тултипов', () => {
    view.options.tooltip = true;
    view._drawTool();
    assert.equal(view.$toolMin.css('visibility'), 'visible');
    view.options.tooltip = false;
    view._drawTool();
    assert.equal(view.$toolMin.css('visibility'), 'hidden');
  });

  it ('view вертикальное - горизонтальное  расположение слайдера', () => {
    view.options.vertical = true;
    view._darwPositioning();
    assert.equal(view.$domEl.hasClass('range-slider_vertical'), true);
    assert.equal(view.$valueMin.hasClass('range-slider__value-min_horizon'), false);
    view.options.vertical = false;
    view._darwPositioning();
    assert.equal(view.$domEl.hasClass('range-slider_horizon'), true);
    assert.equal(view.$valueMin.hasClass('range-slider__value-min_vertical'), false);
  });

  it ('view один или два ползунка', () => {
    view.options.twoSliders = true;
    view._darwTwoSliders();
    assert.equal(view.$valueMax.css('display'), 'block');
    view.options.twoSliders = false;
    view._darwTwoSliders();
    assert.equal(view.$toolMax.css('display'), 'none');
  });
});
