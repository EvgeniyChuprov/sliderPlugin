/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
import Observer from './observer';

class Controller extends Observer {
  constructor(opt, $this) {
    super();
    this.$domEl = $this;
    this.options = opt;
    this.processEvent = this.processEvent.bind(this);
  }

  init() {
    this.notifySubscribers('parametersChanged', this.options);
  }

  processEvent(event, ...arg) {
    switch (event) {
      case 'coordinatesChanged':
        this._moveSlider(arg[0], arg[1], arg[2]);
        break;
      case 'modelStateChanged':
        if (typeof arg[1].onChange === 'function') {
          arg[1].onChange(arg[1]);
        }
        this._createView(arg[0], arg[1]);
        break;
      default:
        break;
    }
  }

  _createView(data, options) {
    this.notifySubscribers('drawSlider', data);
    this.options = options;
    this.options.update = (value) => {
      this.notifySubscribers('parametersChanged', value);
    };
  }

  _moveSlider(newTop, length, moveMinorHandle) {
    this.notifySubscribers('coordinatesChanged', newTop, length, moveMinorHandle);
  }
}

export default Controller;
