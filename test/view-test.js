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
    severalHandles: true,
    tool: true,
  };

  const view = new View();
  const create = $(`<div class="range-slider js-range-slider"><div class="range-slider__value-min" ><div class = "range-slider__tool-min" ></div></div>
        <div class="range-slider__value-max" ><div class = "range-slider__tool-max" ></div></div></div>`);
  const $dom = $('body').append(create);
  view.$domEl = $dom.find('.js-range-slider');
  view.options = options;

  const move = sinon.spy(view, '_moveHandle');
  const publish = sinon.spy(view, 'publish');

  it('Присвоение параметру $minorHandleValue DOM элемента', () => {
    assert.equal(view.$minorHandleValue, undefined);
    view._receivingData($dom, options);
    assert.equal(typeof view.$minorHandleValue, 'object');
  });

  it('Присвоение параметру $toolMin значения ползунка', () => {
    assert.equal(view.$toolMin.html(), '');
    view._writeValues();
    assert.equal(view.$toolMin.html(), view.options.toolMin);
  });

  it('Присвоение параметру $toolMin css значения', () => {
    assert.equal(view.$minorHandleValue.css('top'), 'auto');
    assert.equal(view.$minorHandleValue.css('left'), 'auto');
    view.options.upright = true;
    view._drawPositionsHandles();
    assert.equal(view.$minorHandleValue.css('top'), `${view.options.minPoint}%`);
    view.options.upright = false;
    view._drawPositionsHandles();
    assert.equal(view.$minorHandleValue.css('left'), `${view.options.minPoint}%`);
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
    view.options.severalHandles = true;
    view._drawSeveralHandles();
    assert.equal(view.$majorHandleValue.css('display'), 'block');
    view.options.severalHandles = false;
    view._drawSeveralHandles();
    assert.equal(view.$majorHandleValue.css('display'), 'none');
  });

  it('Позиционирование слайдера', () => {
    view.options.upright = true;
    view._drawPositioning();
    assert.equal(view.$minorHandleValue.hasClass('range-slider__value-min_vertical'), true);
    assert.equal(view.$minorHandleValue.hasClass('range-slider__value-min_horizon'), false);
    view.options.upright = false;
    view._drawPositioning();
    assert.equal(view.$minorHandleValue.hasClass('range-slider__value-min_vertical'), false);
    assert.equal(view.$minorHandleValue.hasClass('range-slider__value-min_horizon'), true);
  });

  it('Проверка вызова move в методе init', () => {
    view.init('drawSlider', $dom.find('.js-range-slider'), options);
    assert(move.called);
  });

  it('Проверка вызова publish в методе _toClick', () => {
    view.$domEl.trigger('click');
    sinon.assert.called(publish);
  });

  it('Проверка вызова publish в методе _moveHandle', () => {
    view.$minorHandleValue.trigger('mousedown');
    $(document).trigger('mousemove');
    sinon.assert.called(publish);

    view.$majorHandleValue.trigger('mousedown');
    $(document).trigger('mousemove');
    sinon.assert.called(publish);
    if ($(document).trigger('mouseup')) {
      $(document).trigger('unbind');
    }
  });
});
