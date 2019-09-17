/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
class Observer {
  constructor() {
    this._subscribers = [];
  }

  addSubscriber(subscriber) {
    this._subscribers.push(subscriber);
  }

  removeSubscriber(subscriber) {
    this._subscribers.splice(this._subscribers.indexOf(subscriber), 1);
  }

  notifySubscribers(...parameters) {
    this._subscribers.forEach((subscriber) => {
      subscriber(...parameters);
    });
  }
}

export default Observer;
