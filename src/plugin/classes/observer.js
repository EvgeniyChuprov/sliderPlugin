/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
class Observer {
  constructor() {
    this._subscribers = [];
  }

  subscribe(subscriber) {
    this._subscribers.push(subscriber);
  }

  unsubscribe(subscriber) {
    this._subscribers.splice(this._subscribers.indexOf(subscriber), 1);
  }

  publish(...parameters) {
    this._subscribers.forEach((subscriber) => {
      subscriber(...parameters);
    });
  }
}

export default Observer;
