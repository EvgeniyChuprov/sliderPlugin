/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */

class View {
  constructor($domEl, options) {
    this.$domEl = $domEl;
    this.options = options;
  }

  initSetting() {
    this._createSlider();
    this._darwPositioning();
    this._darwTwoSliders();
    this._drawTool();
    this._toClick();
    this._drawStartingPositions();
  }

  initConstants() {
    const minPoint = ((this.options.valueMin - this.options.min) * 100)
    / (this.options.max - this.options.min);
    const maxPoint = ((this.options.valueMax - this.options.min) * 100)
    / (this.options.max - this.options.min);
    const sliderTopCoords = this.$domEl.offset().top - pageYOffset;
    const step = 100 / ((this.options.max - this.options.min)
    / this.options.step);

    return {
      minPoint,
      maxPoint,
      sliderTopCoords,
      step,
    };
  }

  _createSlider() {
    this.$valueMin = this.$domEl.find('.range-slider__value-min');
    this.$valueMax = this.$domEl.find('.range-slider__value-max');
    this.$toolMin = this.$domEl.find('.range-slider__tool-min');
    this.$toolMax = this.$domEl.find('.range-slider__tool-max');
  }

  _drawStartingPositions() {
    this.$toolMin.html(this.options.valueMin);
    this.$toolMax.html(this.options.valueMax);

    if (this.options.vertical) {
      this.$valueMin.css('top', `${this.initConstants().minPoint}%`);
      this.$valueMax.css('top', `${this.initConstants().maxPoint}%`);
    } else {
      this.$valueMin.css('left', `${this.initConstants().minPoint}%`);
      this.$valueMax.css('left', `${this.initConstants().maxPoint}%`);
    }
  }

  _movieVertical() {
    const sliderCoords = this.$domEl.offset().top;

    this.$valueMin.mousedown(() => {
      $(document).mousemove((e) => {
        const newTop = e.pageY - sliderCoords;
        const shiftPercentage = (newTop * 100) / this.$domEl.height();
        const value = this.options.step * Math.round(shiftPercentage
        / this.initConstants().step) + this.options.min;

        if (value <= this.options.max) {
          if (value >= this.options.min && value <= this.options.valueMax) {
            this.options.valueMin = value;
            this.$valueMin.css('top', `${this.initConstants().minPoint}%`);
            this.$toolMin.html(this.options.valueMin);
          }
        }
      });
    });

    this.$valueMax.mousedown(() => {
      $(document).mousemove((e) => {
        const newTop = e.pageY - sliderCoords;
        const shiftPercentage = (newTop * 100) / this.$domEl.height();
        const value = this.options.step * Math.round(shiftPercentage
        / this.initConstants().step) + this.options.min;

        if (value >= this.options.min) {
          if (value <= this.options.max && value >= this.options.valueMin) {
            this.options.valueMax = value;
            this.$valueMax.css('top', `${this.initConstants().maxPoint}%`);
            this.$toolMax.html(this.options.valueMax); 
          }
        }
      });
    });

    $(document).mouseup(() => {
      $(document).unbind('mousemove');
    });
  }

  _movieHorizon() {
    const sliderCoords = this.$domEl.offset().left - pageXOffset;

    this.$valueMin.mousedown(() => {
      $(document).mousemove((event) => {
        const newLeft = event.pageX - sliderCoords;
        const shiftPercentage = (newLeft * 100) / this.$domEl.width();
        const value = this.options.step * Math.round(shiftPercentage
        / this.initConstants().step) + this.options.min;

        if (value <= this.options.max) {
          if (value >= this.options.min && value <= this.options.valueMax) {
            this.options.valueMin = value;
            this.$valueMin.css('left', `${this.initConstants().minPoint}%`);
            this.$toolMin.html(this.options.valueMin);
          }
        }
      });
    });

    this.$valueMax.mousedown(() => {
      $(document).mousemove((event) => {
        const newLeft = event.pageX - sliderCoords;
        const shiftPercentage = (newLeft * 100) / this.$domEl.width();
        const value = this.options.step * Math.round(shiftPercentage
        / this.initConstants().step) + this.options.min;

        if (value >= this.options.min) {
          if (value <= this.options.max && value >= this.options.valueMin) {
            this.options.valueMax = value;
            this.$valueMax.css('left', `${this.initConstants().maxPoint}%`);
            this.$toolMax.html(this.options.valueMax);
          }
        }
      });
    });
    $(document).mouseup(() => {
      $(document).unbind('mousemove');
    });
  }

  _toClick() {
    if (this.options.vertical) {
      this.$domEl.unbind('click');
      const sliderCoords = this.$domEl.offset().top;
      this.$domEl.on('click', (e) => {
        const newTop = e.pageY - sliderCoords;
        const shiftPercentage = (newTop * 100) / this.$domEl.height();
        const positionSlider = this.options.step * Math.round(shiftPercentage
        / this.initConstants().step) + this.options.min;

        if (this.options.twoSliders) {
          if (e.pageY < sliderCoords + this.$domEl.height() / 2) {
            this.options.valueMin = positionSlider;
            this.$toolMin.html(this.options.valueMin);
            this.$valueMin.css('top', `${this.initConstants().minPoint}%`);
          } else if (e.pageY > sliderCoords + this.$domEl.height() / 2) {
            this.options.valueMax = positionSlider;
            this.$toolMax.html(this.options.valueMax);
            this.$valueMax.css('top', `${this.initConstants().maxPoint}%`);
          }
        } else {
          this.options.valueMin = positionSlider;
          this.$toolMin.html(this.options.valueMin);
          this.$valueMin.css('top', `${this.initConstants().minPoint}%`);
        }
      });
    } else {
      this.$domEl.unbind('click');
      const sliderCoords = this.$domEl.offset().left;
      this.$domEl.on('click', (e) => {
        const newLeft = e.pageX - sliderCoords;
        const shiftPercentage = (newLeft * 100) / this.$domEl.width();
        const positionSlider = this.options.step
        * Math.round(shiftPercentage / this.initConstants().step)
        + this.options.min;

        if (this.options.twoSliders) {
          if (e.pageX < sliderCoords + this.$domEl.width() / 2) {
            this.options.valueMin = positionSlider;
            this.$toolMin.html(this.options.valueMin);
            this.$valueMin.css('left', `${this.initConstants().minPoint}%`);
          } else if (e.pageX > sliderCoords + this.$domEl.width() / 2) {
            this.options.valueMax = positionSlider;
            this.$toolMax.html(this.options.valueMax);
            this.$valueMax.css('left', `${this.initConstants().maxPoint}%`);
          }
        } else {
          this.options.valueMin = positionSlider;
          this.$toolMin.html(this.options.valueMin);
          this.$valueMin.css('left', `${this.initConstants().minPoint}%`);
        }
      });
    }
  }

  _drawTool() {
    if (this.options.tooltip) {
      this.$toolMin.css('visibility', 'visible');
      this.$toolMax.css('visibility', 'visible');
    } else {
      this.$toolMin.css('visibility', 'hidden');
      this.$toolMax.css('visibility', 'hidden');
    }
  }

  _darwPositioning() {
    if (this.options.vertical) {
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
      this._movieVertical();
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
      this._movieHorizon();
    }
  }

  _darwTwoSliders() {
    if (this.options.twoSliders) {
      this.$valueMax.css('display', 'block');
      this.$toolMax.css('display', 'block');
    } else {
      this.$valueMax.css('display', 'none');
      this.$toolMax.css('display', 'none');
      this.options.valueMax = this.options.max;
    }
  }
}
module.exports = View;
