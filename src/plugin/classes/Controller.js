/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
import Observer from './Observer';

class Controller extends Observer {
  constructor(opt, $this) {
    super();
    this.$domEl = $this;
    this.options = opt;
  }

  init() {
    this.publish('receptionData', this.options);
  }

  transferData(event, ...arg) {
    switch (event) {
      case 'coordinatesChangedByClick':
        this._clickSlider(arg[0], arg[1]);
        break;
      case 'coordinatesChangedByHandleMove':
        this._moveSlider(arg[0], arg[1], arg[2]);
        break;
      case 'modelStateChanged':
        if (typeof arg[1].onChange === 'function') {
          arg[1].onChange(arg[1]);
        }
        this._initView(arg[0], arg[1]);
        break;
      default:
        break;
    }
  }

  _initView(data, options) {
    this.publish('drawSlider', this.$domEl, data);
    this._createCallbackFunction(options);
  }

  _createCallbackFunction(options) {
    this.options = options;
    this.options.update = (value) => {
      this.publish('receptionData', value);
    };
  }

  _clickSlider(newTop, length) {
    this.publish('coordinatesChangedByClick', newTop, length);
  }

  _moveSlider(newTop, length, moveMinorHandle) {
    this.publish('coordinatesChangedByHandleMove', newTop, length, moveMinorHandle);
  }
}

export default Controller;
