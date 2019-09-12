/* eslint-disable no-underscore-dangle */
import assert from 'assert';
import sinon from 'sinon';
import Controller from '../src/plugin/classes/controller';

describe('Проверка вызова внутрених методов класса Controller', () => {
  const controller = new Controller();

  const _moveSlider = sinon.spy(controller, '_moveSlider');
  const _createView = sinon.spy(controller, '_createView');
  const publish = sinon.spy(controller, 'publish');

  it('Проверка вызова publish в функции init', () => {
    controller.init();
    assert(publish.called);
  });

  it('Проверка вызова _moveSlider в методе processEvent', () => {
    controller.processEvent('coordinatesChanged', 1, 2, 3);
    assert(_moveSlider.called);
  });

  it('Проверка вызова _createView в методе processEvent', () => {
    controller.processEvent('modelStateChanged', 1, {});
    assert(_createView.called);
  });

  it('Проверка вызова publish в функции controller.options.update', () => {
    controller.options.update(1);
    assert(publish.called);
  });
});
