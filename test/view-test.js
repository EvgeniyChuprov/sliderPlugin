/* eslint-disable no-underscore-dangle */
import assert from 'assert';
import sinon from 'sinon';
import View from '../src/plugin/classes/View';

describe('Доступ к параметрам класса View', () => {
  const options = {
    minPoint: 5,
    maxPoint: 10,
    step: 1,
    toolMin: 5,
    toolMax: 10,
    upright: true,
    twoRange: true,
    tool: true,
  };

  const view = new View();
  const create = $(`<div class="range-slider js-range-slider"><div class="range-slider__value-min" ><div class = "range-slider__tool-min" ></div></div>
        <div class="range-slider__value-max" ><div class = "range-slider__tool-max" ></div></div></div>`);
  const $dom = $('body').append(create);
  view.$domEl = $dom.find('.js-range-slider');
  view.options = options;

  const move = sinon.spy(view, '_move');
  const publish = sinon.spy(view, 'publish');

  it('Присвоение параметру $valueMin DOM элемента', () => {
    assert.equal(view.$valueMin, undefined);
    view._createSlider();
    assert.equal(typeof view.$valueMin, 'object');
  });

  it('Присвоение параметру $toolMin значения ползунка', () => {
    assert.equal(view.$toolMin.html(), '');
    view._drawStartingTooltip();
    assert.equal(view.$toolMin.html(), view.options.toolMin);
  });

  it('Присвоение параметру $toolMin css значения', () => {
    assert.equal(view.$valueMin.css('top'), 'auto');
    assert.equal(view.$valueMin.css('left'), 'auto');
    view.options.upright = true;
    view._drawStartingPositions();
    assert.equal(view.$valueMin.css('top'), `${view.options.minPoint}%`);
    view.options.upright = false;
    view._drawStartingPositions();
    assert.equal(view.$valueMin.css('left'), `${view.options.minPoint}%`);
  });

  it('Отображение тултипов', () => {
    view.options.tool = true;
    view._drawTool();
    assert.equal(view.$toolMin.css('visibility'), 'visible');
    view.options.tool = false;
    view._drawTool();
    assert.equal(view.$toolMin.css('visibility'), 'hidden');
  });

  it('Отображение двух слайдеров', () => {
    view.options.twoRange = true;
    view._drawTwoSliders();
    assert.equal(view.$valueMax.css('display'), 'block');
    view.options.twoRange = false;
    view._drawTwoSliders();
    assert.equal(view.$valueMax.css('display'), 'none');
  });

  it('Позиционирование слайдера', () => {
    view.options.upright = true;
    view._drawPositioning();
    assert.equal(view.$valueMin.hasClass('range-slider__value-min_vertical'), true);
    assert.equal(view.$valueMin.hasClass('range-slider__value-min_horizon'), false);
    view.options.upright = false;
    view._drawPositioning();
    assert.equal(view.$valueMin.hasClass('range-slider__value-min_vertical'), false);
    assert.equal(view.$valueMin.hasClass('range-slider__value-min_horizon'), true);
  });

  it('Проверка вызова move в методе init', () => {
    view.init('forView', $dom.find('.js-range-slider'), options);
    assert(move.called);
  });

  it('Проверка вызова publish в методе _toClick', () => {
    view.$domEl.trigger('click');
    sinon.assert.called(publish);
  });

  it('Проверка вызова publish в методе _move', () => {
    view.$valueMin.trigger('mousedown');
    $(document).trigger('mousemove');
    sinon.assert.called(publish);

    view.$valueMax.trigger('mousedown');
    $(document).trigger('mousemove');
    sinon.assert.called(publish);
    if ($(document).trigger('mouseup')) {
      $(document).trigger('unbind');
    }
  });
});
