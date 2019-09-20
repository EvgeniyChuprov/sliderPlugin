import Controller from './classes/controller';
import Model from './classes/model';
import View from './classes/view';

(($) => {
  // eslint-disable-next-line no-param-reassign
  $.fn.myFirstSliderPlugin = function initPlugin(options) {
    const addHTMLElements = $(`
        <div class="range-slider__handle js-range-slider__handle" >
          <span class = "range-slider__tool-handle js-range-slider__tool-handle" ></span>
        </div>
        <div class="range-slider__second-handle js-range-slider__second-handle" >
          <span class = "range-slider__tool-second-handle js-range-slider__tool-second-handle" ></span>
        </div>
    `);
    this.append(addHTMLElements);

    this.model = new Model();
    this.view = new View(this);
    this.controller = new Controller(options, this);

    this.controller.addSubscriber(this.model.processEvent);
    this.controller.addSubscriber(this.view.processEvent);
    this.model.addSubscriber(this.controller.processEvent);
    this.view.addSubscriber(this.controller.processEvent);

    this.controller.init();

    return this.model.options;
  };
})(jQuery, window);

