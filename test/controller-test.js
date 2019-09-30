/* eslint-disable no-underscore-dangle */
import assert from 'assert';
import sinon from 'sinon';
import Controller from '../src/plugin/classes/controller';

describe('Проверка вызова внутрених методов класса Controller', () => {
  const $domEl = $('body');
  const controller = new Controller($domEl);

  const setOptions = sinon.spy(controller.model, 'setOptions');
  const displayView = sinon.spy(controller.view, 'displayView');

  it('Проверка вызова model.setOptions в методе changeParameters', () => {
    controller.changeParameters({});
    assert(setOptions.called);
  });

  it('Проверка вызова displayView в методе updateView', () => {
    controller.updateView({});
    assert(displayView.called);
  });
});
