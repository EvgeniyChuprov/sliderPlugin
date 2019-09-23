/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
import EventEmitter from 'event-emitter';

class Controller {
  constructor(opt, $this) {
    this.$domEl = $this;
    this.options = opt;
  }

  _createView(options) {
    this.emit('modelStateChanged', options);
  }

  _moveSlider(upgrade) {
    this.emit('coordinatesChanged', upgrade);
  }
}

EventEmitter(Controller.prototype);
export default Controller;
