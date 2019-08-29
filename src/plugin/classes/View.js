/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
import Observer from './Observer';

class View extends Observer {
  init(forView, $this, options) {
    if (forView === 'forView') {
      this.$domEl = $this;
      this.options = options;
      this._createSlider();
      this._drawStartingPositions();
      this._drawPositioning();
      this._drawTwoSliders();
      this._drawTool();
      this._toClick();
      this._movie();
    }
  }

  _createSlider() {
    this.$valueMin = this.$domEl.find('.range-slider__value-min');
    this.$valueMax = this.$domEl.find('.range-slider__value-max');
    this.$toolMin = this.$domEl.find('.range-slider__tool-min');
    this.$toolMax = this.$domEl.find('.range-slider__tool-max');
  }

  _drawStartingPositions() {
    this.$toolMin.html(this.options.toolMin);
    this.$toolMax.html(this.options.toolMax);

    if (this.options.upright) {
      this.$valueMin.css('top', `${this.options.minPoint}%`);
      this.$valueMax.css('top', `${this.options.maxPoint}%`);
    } else {
      this.$valueMin.css('left', `${this.options.minPoint}%`);
      this.$valueMax.css('left', `${this.options.maxPoint}%`);
    }
  }

  _drawTool() {
    if (this.options.tool) {
      this.$toolMin.css('visibility', 'visible');
      this.$toolMax.css('visibility', 'visible');
    } else {
      this.$toolMin.css('visibility', 'hidden');
      this.$toolMax.css('visibility', 'hidden');
    }
  }

  _drawPositioning() {
    if (this.options.upright) {
      this.$domEl
        .addClass('range-slider_vertical')
        .removeClass('range-slider_horizon');
      this.$valueMin
        .addClass('range-slider__value-min_vertical').css('left', `${-10}px`)
        .removeClass('range-slider__value-min_horizon');
      this.$valueMax
        .addClass('range-slider__value-max_vertical').css('left', `${-10}px`)
        .removeClass('range-slider__value-max_horizon');
      this.$toolMin
        .addClass('range-slider__tool-min_vertical')
        .removeClass('range-slider__tool-min_horizon');
      this.$toolMax
        .addClass('range-slider__tool-max_vertical')
        .removeClass('range-slider__tool-max_horizon');
    } else {
      this.$domEl
        .addClass('range-slider_horizon')
        .removeClass('range-slider_vertical');
      this.$valueMin
        .addClass('range-slider__value-min_horizon').css('top', `${-10}px`)
        .removeClass('range-slider__value-min_vertical');
      this.$valueMax
        .addClass('range-slider__value-max_horizon').css('top', `${-10}px`)
        .removeClass('range-slider__value-max_vertical');
      this.$toolMin
        .addClass('range-slider__tool-min_horizon')
        .removeClass('range-slider__tool-min_vertical');
      this.$toolMax
        .addClass('range-slider__tool-max_horizon')
        .removeClass('range-slider__tool-max_vertical');
    }
  }

  _drawTwoSliders() {
    if (this.options.twoRange) {
      this.$valueMax.css('display', 'block');
      this.$toolMax.css('display', 'block');
    } else {
      this.$valueMax.css('display', 'none');
      this.$toolMax.css('display', 'none');
    }
  }


  _toClick() {
    if (this.options.upright) {
      this.$domEl.unbind('click');

      const sliderCoords = this.$domEl.offset().top;
      const length = this.$domEl.height();

      this.$domEl.on('click', (e) => {
        const newTop = e.pageY - sliderCoords;
        this.publish('coordinatesClickForController', newTop, length);
      });
    } else {
      this.$domEl.unbind('click');

      const sliderCoords = this.$domEl.offset().left;
      const length = this.$domEl.width();

      this.$domEl.on('click', (e) => {
        const newTop = e.pageX - sliderCoords;
        this.publish('coordinatesClickForController', newTop, length);
      });
    }
  }

  _movie() {
    let min;
    if (this.options.upright) {
      const sliderCoords = this.$domEl.offset().top;

      this.$valueMin.mousedown(() => {
        $(document).mousemove((e) => {
          min = true;
          const newTop = e.pageY - sliderCoords;
          const length = this.$domEl.height();
          this.publish('coordinatesMoveForController', newTop, length, min);
        });
      });

      this.$valueMax.mousedown(() => {
        $(document).mousemove((e) => {
          min = false;
          const newTop = e.pageY - sliderCoords;
          const length = this.$domEl.height();
          this.publish('coordinatesMoveForController', newTop, length, min);
        });
      });

      $(document).mouseup(() => {
        $(document).unbind('mousemove');
      });
    } else {
      const sliderCoords = this.$domEl.offset().left;

      this.$valueMin.mousedown(() => {
        $(document).mousemove((e) => {
          min = true;
          const newTop = e.pageX - sliderCoords;
          const length = this.$domEl.width();
          this.publish('coordinatesMoveForController', newTop, length, min);
        });
      });

      this.$valueMax.mousedown(() => {
        $(document).mousemove((e) => {
          min = false;
          const newTop = e.pageX - sliderCoords;
          const length = this.$domEl.width();
          this.publish('coordinatesMoveForController', newTop, length, min);
        });
      });

      $(document).mouseup(() => {
        $(document).unbind('mousemove');
      });
    }
  }
}

export default View;
