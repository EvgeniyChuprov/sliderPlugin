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

  initView(forController, data) {
    if (forController === 'forController') {
      this.publish('forView', this.$domEl, data);
    }
  }
}

export default Controller;
