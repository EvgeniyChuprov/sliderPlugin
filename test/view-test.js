/* eslint-disable no-underscore-dangle */
import assert from 'assert';
import sinon from 'sinon';
import View from '../src/plugin/classes/view';

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

  const create = $(`<div class="range-slider js-range-slider"><div class="range-slider__value-min" ><div class = "range-slider__tool-min" ></div></div>
        <div class="range-slider__value-max" ><div class = "range-slider__tool-max" ></div></div></div>`);
  const $dom = $('body').append(create);
  const $domEl = $dom.find('.js-range-slider');
  const view = new View($domEl);
  view.options = options;

  const _drawSlider = sinon.spy(view, '_drawSlider');
  const _handleSliderMousemove = sinon.spy(view, '_handleSliderMousemove');
  const _handleSliderMousedown = sinon.spy(view, '_handleSliderMousedown');
  const _handleSliderMouseup = sinon.spy(view, '_handleSliderMouseup');
  const publish = sinon.spy(view, 'publish');

  it('Присвоение позункам css значения', () => {
    assert.equal(view.$minorHandleValue.css('top'), 'auto');
    assert.equal(view.$minorHandleValue.css('left'), 'auto');
    view.options.upright = true;
    view._drawSlider();
    assert.equal(view.$minorHandleValue.css('top'), `${view.options.minPoint}%`);
    view.options.upright = false;
    view._drawSlider();
    assert.equal(view.$minorHandleValue.css('left'), `${view.options.minPoint}%`);
  });

  it('Отображение тултипов', () => {
    view.options.tool = true;
    view._drawSlider();
    assert.equal(view.$toolMin.css('visibility'), 'visible');
    view.options.tool = false;
    view._drawSlider();
    assert.equal(view.$toolMin.css('visibility'), 'hidden');
  });

  it('Отображение двух слайдеров', () => {
    view.options.severalHandles = true;
    view._drawSlider();
    assert.equal(view.$majorHandleValue.css('display'), 'block');
    view.options.severalHandles = false;
    view._drawSlider();
    assert.equal(view.$majorHandleValue.css('display'), 'none');
  });

  it('Позиционирование слайдера', () => {
    view.options.upright = true;
    view._drawSlider();
    assert.equal(view.$minorHandleValue.hasClass('range-slider__value-min_vertical'), true);
    view.options.upright = false;
    view._drawSlider();
    assert.equal(view.$minorHandleValue.hasClass('range-slider__value-min_vertical'), false);
  });

  it('Проверка вызова publish в методе _handleSliderMousemove', () => {
    view._handleSliderMousemove({});
    assert(publish.called);
  });

  it('Проверка вызова _drawSlider в методе processEvent', () => {
    view.processEvent('drawSlider', options);
    assert(_drawSlider.called);
  });

  it('Проверка вызова _handleSliderMousemove в методе _addEventListeners', () => {
    view._addEventListeners();
    view.$domEl.trigger('click');
    assert(_handleSliderMousemove.called);
  });

  it('Проверка вызова _handleSliderMousedown в методе _addEventListeners', () => {
    view._addEventListeners();
    view.$minorHandleValue.trigger('mousedown');
    assert(_handleSliderMousedown.called);
  });

  it('Проверка вызова _handleSliderMousedown в методе _addEventListeners', () => {
    view._addEventListeners();
    view.$minorHandleValue.trigger('mousedown');
    assert(_handleSliderMousedown.called);
  });

  it('Проверка вызова _handleSliderMouseup в методе _handleSliderMousedown', () => {
    const e = { target: { nodeName: '' } };
    view._handleSliderMousedown(e);
    $(document).trigger('mouseup');
    assert(_handleSliderMouseup.called);
  });

  it('Проверка вызова присвоения null полю moveMinorHandle в методе  _handleSliderMouseup', () => {
    view.moveMinorHandle = 123;
    view._handleSliderMouseup();
    assert(view.moveMinorHandle === null, true);
  });
});
