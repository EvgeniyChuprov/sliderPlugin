/* eslint-disable no-underscore-dangle */
import assert from 'assert';
import sinon from 'sinon';
import View from '../src/plugin/classes/view';

describe('Доступ к параметрам класса View', () => {
  const options = {
    min: 0,
    max: 100,
    step: 1,
    minorHandleValue: 10,
    majorHandleValue: 90,
    vertical: false,
    tooltip: true,
    isDouble: true,
  };

  const create = $(`<div class="range-slider js-range-slider"><div class="range-slider__handle js-range-slider__handle" >
  <span class = "range-slider__tool-handle js-range-slider__tool-handle" ></span></div>
  <div class="range-slider__second-handle js-range-slider__second-handle" >
  <span class = "range-slider__tool-second-handle js-range-slider__tool-second-handle" ></span></div></div>`);
  const $dom = $('body').append(create);
  const $domEl = $dom.find('.js-range-slider');
  const view = new View($domEl);

  view.options = options;

  const _drawSlider = sinon.spy(view, '_drawSlider');
  const _handleSliderClick = sinon.spy(view, '_handleSliderClick');
  const _handleMinorHandleMousedown = sinon.spy(view, '_handleMinorHandleMousedown');
  const _handleSliderMouseup = sinon.spy(view, '_handleSliderMouseup');

  it('Присвоение позункам css значения', () => {
    view._convertPositionsToPercent();
    view.options.vertical = true;
    assert.equal(view.$minorHandleValue.css('top'), 'auto');
    view._drawSlider();
    assert.equal(view.$minorHandleValue.css('top'), `${view.offsetParameters.minPoint}%`);

    view.options.vertical = true;
    view._drawSlider();
    assert.equal(view.$minorHandleValue.css('top'), `${view.offsetParameters.minPoint}%`);
    view.options.vertical = false;
    view._drawSlider();
    assert.equal(view.$minorHandleValue.css('left'), `${view.offsetParameters.minPoint}%`);
  });

  it('Отображение тултипов', () => {
    view.options.tooltip = true;
    view._drawSlider();
    assert.equal(view.$toolMin.css('visibility'), 'visible');
    view.options.tooltip = false;
    view._drawSlider();
    assert.equal(view.$toolMin.css('visibility'), 'hidden');
  });

  it('Отображение двух слайдеров', () => {
    view.options.isDouble = true;
    view._drawSlider();
    assert.equal(view.$majorHandleValue.css('display'), 'block');
    view.options.isDouble = false;
    view._drawSlider();
    assert.equal(view.$majorHandleValue.css('display'), 'none');
  });

  it('Позиционирование слайдера', () => {
    view.options.vertical = true;
    view._drawSlider();
    assert.equal(view.$minorHandleValue.hasClass('range-slider__handle_vertical'), true);
    view.options.vertical = false;
    view._drawSlider();
    assert.equal(view.$minorHandleValue.hasClass('range-slider__handle_vertical'), false);
  });

  it('Проверка вызова _drawSlider в методе displayView', () => {
    view.displayView(options);
    assert(_drawSlider.called);
  });

  it('Проверка вызова _handleSliderClick в методе _calculateHandleShift', () => {
    view._addEventListeners();
    view.$domEl.trigger('click');
    assert(_handleSliderClick.called);
  });

  it('Проверка вызова _handleMinorHandleMousedown в методе _addEventListeners', () => {
    view._addEventListeners();
    view.$minorHandleValue.trigger('mousedown');
    assert(_handleMinorHandleMousedown.called);
  });

  it('Проверка вызова _handleSliderMouseup в методе _handleMinorHandleMousedown', () => {
    const e = { target: { nodeName: '' } };
    view._handleMinorHandleMousedown(e);
    $(document).trigger('mouseup');
    assert(_handleSliderMouseup.called);
  });
});
