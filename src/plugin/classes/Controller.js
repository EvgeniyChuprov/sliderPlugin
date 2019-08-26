/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
import Observer from './Observer';

class Controller extends Observer {
  constructor(opt, $this) {
    super();
    this.$domEl = $($this[0]);
    this.options = opt;
  }

  init() {
    this.publish('forModel', this.options);
  }

  initView(forController, data, options) {
    if (forController === 'forController') {
      this.publish('forView', this.$domEl, data);
      this.options = options;
      this.options.update = (value) => {
        this.publish('forModel', value);
      };
    }
  }

  clickSlider(coordClickForCont, newTop, length) {
    if (coordClickForCont === 'coordClickForCont') {
      this.publish('coordClickForModel', newTop, length);
    }
  }

  moveSlider(coordMoveForCont, newTop, length, min) {
    if (coordMoveForCont === 'coordMoveForCont') {
      this.publish('coordMoveForModel', newTop, length, min);
    }
  }
}

export default Controller;
