/* eslint-disable no-underscore-dangle */
import assert from 'assert';
import sinon from 'sinon';
import Observer from '../src/plugin/classes/Observer';

describe('Проверка вызова внутрених методов класса Observer', () => {
  const observer = new Observer();
  const push = sinon.spy(observer._subscribers, 'push');
  const splice = sinon.spy(observer._subscribers, 'splice');
  const forEach = sinon.spy(observer._subscribers, 'forEach');



  it('Проверка вызова publish в функции init', () => {
    observer.subscribe();
    assert(push.called);
  });
  
  it('Проверка вызова publish в функции init', () => {
    observer.unsubscribe();
    assert(splice.called);
  });

  it('Проверка вызова publish в функции init', () => {
    observer.publish();
    assert(forEach.called);
  });
});
