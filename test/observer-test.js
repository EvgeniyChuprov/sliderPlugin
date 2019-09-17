/* eslint-disable no-underscore-dangle */
import assert from 'assert';
import sinon from 'sinon';
import Observer from '../src/plugin/classes/observer';

describe('Проверка вызова внутрених методов класса Observer', () => {
  const observer = new Observer();
  const push = sinon.spy(observer._subscribers, 'push');
  const splice = sinon.spy(observer._subscribers, 'splice');
  const forEach = sinon.spy(observer._subscribers, 'forEach');

  it('Проверка вызова push в функции addSubscriber', () => {
    observer.addSubscriber();
    assert(push.called);
  });
  
  it('Проверка вызова splice в функции removeSubscriber', () => {
    observer.removeSubscriber();
    assert(splice.called);
  });

  it('Проверка вызова forEach в функции notifySubscribers', () => {
    observer.notifySubscribers();
    assert(forEach.called);
  });
});
