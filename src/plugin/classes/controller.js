/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
import EventEmitter from 'event-emitter';

class Controller {
  constructor($this) {
    this.$domEl = $this;
  }

  changedParameters(options) {
    this.emit('parametersChanged', options);
  }

  createView(options) {
    this.emit('modelStateChanged', options);
  }
}

EventEmitter(Controller.prototype);
export default Controller;
