/* eslint-disable no-underscore-dangle */
import assert from 'assert';
import sinon from 'sinon';
import View from '../src/plugin/classes/view';

describe('Доступ к параметрам класса View', () => {
  const create = $(`<div class="range-slider js-range-slider"><div class="range-slider__handle js-range-slider__handle" >
  <span class = "range-slider__tool-handle js-range-slider__tool-handle" ></span></div>
  <div class="range-slider__second-handle js-range-slider__second-handle" >
  <span class = "range-slider__tool-second-handle js-range-slider__tool-second-handle" ></span></div></div>`);
  const $dom = $('body').append(create);
  const $domEl = $dom.find('.js-range-slider');
  const view = new View($domEl);

  const _handleSliderClick = sinon.spy(view, '_handleSliderClick');
  const _handleMinorHandleMousedown = sinon.spy(view, '_handleMinorHandleMousedown');
  const _handleSliderMouseup = sinon.spy(view, '_handleSliderMouseup');
  const _handleMajorHandleMousedown = sinon.spy(view, '_handleMajorHandleMousedown');
  const _handleMinorHandleMousemove = sinon.spy(view, '_handleMinorHandleMousemove');
  const _handleMajorHandleMousemove = sinon.spy(view, '_handleMajorHandleMousemove');

  it('Значения до вызова displayView', () => {
    assert.equal(view.$minorHandleValue.css('top'), 'auto');
    assert.equal(view.$minorHandleValue.css('left'), 'auto');
    assert.equal(view.$toolMin.css('visibility'), 'visible');
    assert.equal(view.$majorHandleValue.css('display'), 'block');
    assert.equal(view.$minorHandleValue.hasClass('range-slider__handle_vertical'), false);
  });

  it('Значения css добавление классов после вызова displayView', () => {
    const options = {
      min: 0,
      max: 100,
      step: 1,
      minorHandleValue: 10,
      majorHandleValue: 90,
      vertical: true,
      tooltip: true,
      isDouble: true,
    };

    view.displayView(options);
    assert.equal(view.$minorHandleValue.css('top'), `${view.offsetParameters.minPoint}%`);
    assert.equal(view.$minorHandleValue.css('left'), `${-10}px`);
    assert.equal(view.$toolMin.css('visibility'), 'visible');
    assert.equal(view.$majorHandleValue.css('display'), 'block');
    assert.equal(view.$minorHandleValue.hasClass('range-slider__handle_vertical'), true);

    const opt = {
      min: 10,
      max: 50,
      step: 10,
      minorHandleValue: 10,
      majorHandleValue: 30,
      vertical: false,
      tooltip: false,
      isDouble: false,
    };

    view.displayView(opt);
    assert.equal(view.$minorHandleValue.css('left'), `${view.offsetParameters.minPoint}%`);
    assert.equal(view.$minorHandleValue.css('top'), `${-10}px`);
    assert.equal(view.$toolMin.css('visibility'), 'hidden');
    assert.equal(view.$majorHandleValue.css('display'), 'none');
    assert.equal(view.$minorHandleValue.hasClass('range-slider__handle_vertical'), false);
  });

  it('Проверка вызова _handleSliderClick в методе _calculateHandleShift', () => {
    view._addEventListeners();
    view.$domEl.trigger('click');
    assert(_handleSliderClick.called);
  });

  it('Проверка вызова _handleMinorHandleMousemove в методе _addEventListeners', () => {
    view._addEventListeners();
    view.$minorHandleValue.trigger('mousedown');
    assert(_handleMinorHandleMousedown.called);
  });

  it('Проверка вызова _handleMinorHandleMousemove в методе _handleMinorHandleMousemove', () => {
    view._handleMinorHandleMousemove({});
    $(document).trigger('mousemove');
    assert(_handleMinorHandleMousemove.called);
  });

  it('Проверка вызова _handleMajorHandleMousedown в методе _addEventListeners', () => {
    view._addEventListeners();
    view.$majorHandleValue.trigger('mousedown');
    assert(_handleMajorHandleMousedown.called);
  });

  it('Проверка вызова _handleMajorHandleMousemove в методе _handleMajorHandleMousemove', () => {
    view._handleMajorHandleMousemove({});
    $(document).trigger('mousemove');
    assert(_handleMajorHandleMousemove.called);
  });

  it('Проверка вызова _handleSliderMouseup в методе _handleMinorHandleMousedown', () => {
    const e = { target: { nodeName: '' } };
    view._handleMinorHandleMousedown(e);
    $(document).trigger('mouseup');
    assert(_handleSliderMouseup.called);
  });
});
