/* eslint-disable no-underscore-dangle */
import assert from 'assert';
import sinon from 'sinon';
import Controller from '../src/plugin/classes/Controller';

describe('Проверка вызова внутрених методов класса Controller', () => {
  const controller = new Controller();

  const options = {
    min: 0,
    max: 100,
    step: 1,
    valueMin: 10,
    valueMax: 90,
    vertical: false,
    tooltip: true,
    twoSliders: true,
    onChange: null,
    update: null,
  };

  const clickSlider = sinon.spy(controller, '_clickSlider');
  const moveSlider = sinon.spy(controller, '_moveSlider');
  const initView = sinon.spy(controller, '_initView');
  const publish = sinon.spy(controller, 'publish');

  it('Проверка вызова publish в функции init', () => {
    controller.init();
    assert(publish.called);
  });

  it('Проверка вызова _clickSlider', () => {
    controller.transferDataBetweenModelView('coordinatesClickForController', 1, 2);
    assert(clickSlider.called);
  });

  it('Проверка вызова _moveSlider', () => {
    controller.transferDataBetweenModelView('coordinatesMoveForController', 1, 2);
    assert(moveSlider.called);
  });

  it('Проверка вызова publish в функции _clickSlider', () => {
    controller._clickSlider(1, 2);
    assert(publish.called);
  });

  it('Проверка вызова publish в функции _moveSlider', () => {
    controller._moveSlider(1, 2, 3);
    assert(publish.called);
  });

  it('Присовение параметру options.update callback функции', () => {
    assert.equal(controller.options, undefined);
    controller._createCallbackFunction(options);
    assert.equal(typeof controller.options.update, 'function');
  });

  it('Проверка вызова publish в функции controller.options.update', () => {
    controller.options.update(1);
    assert(publish.called);
  });

  it('Проверка вызова _initView', () => {
    controller.transferDataBetweenModelView('forController', 1, options);
    assert(initView.called);
  });
});
