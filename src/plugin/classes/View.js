/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
import Observer from './Observer';

class View extends Observer {
  init(drawSlider, $this, options) {
    if (drawSlider === 'drawSlider') {
      this._receivingData($this, options);
      this._drawPositionsHandles();
      this._writeValues();
      this._drawPositioning();
      this._drawSeveralHandles();
      this._drawTool();
      this._clickSlider();
      this._moveHandle();
    }
  }

  _receivingData($this, options) {
    this.$domEl = $this;
    this.options = options;
    this.$minorHandleValue = this.$domEl.find('.range-slider__value-min');
    this.$majorHandleValue = this.$domEl.find('.range-slider__value-max');
    this.$toolMin = this.$domEl.find('.range-slider__tool-min');
    this.$toolMax = this.$domEl.find('.range-slider__tool-max');
  }

  _drawPositionsHandles() {
    if (this.options.upright) {
      this.$minorHandleValue.css('top', `${this.options.minPoint}%`);
      this.$majorHandleValue.css('top', `${this.options.maxPoint}%`);
    } else {
      this.$minorHandleValue.css('left', `${this.options.minPoint}%`);
      this.$majorHandleValue.css('left', `${this.options.maxPoint}%`);
    }
  }

  _writeValues() {
    this.$toolMin.html(this.options.toolMin);
    this.$toolMax.html(this.options.toolMax);
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
      this.$minorHandleValue
        .addClass('range-slider__value-min_vertical').css('left', `${-10}px`)
        .removeClass('range-slider__value-min_horizon');
      this.$majorHandleValue
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
      this.$minorHandleValue
        .addClass('range-slider__value-min_horizon').css('top', `${-10}px`)
        .removeClass('range-slider__value-min_vertical');
      this.$majorHandleValue
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

  _drawSeveralHandles() {
    if (this.options.severalHandles) {
      this.$majorHandleValue.css('display', 'block');
      this.$toolMax.css('display', 'block');
    } else {
      this.$majorHandleValue.css('display', 'none');
      this.$toolMax.css('display', 'none');
    }
  }


  _clickSlider() {
    if (this.options.upright) {
      this.$domEl.unbind('click');

      const sliderCoords = this.$domEl.offset().top;
      const length = this.$domEl.height();

      this.$domEl.on('click', (e) => {
        const newTop = e.pageY - sliderCoords;
        this.publish('coordinatesChangedByClick', newTop, length);
      });
    } else {
      this.$domEl.unbind('click');

      const sliderCoords = this.$domEl.offset().left;
      const length = this.$domEl.width();

      this.$domEl.on('click', (e) => {
        const newTop = e.pageX - sliderCoords;
        this.publish('coordinatesChangedByClick', newTop, length);
      });
    }
  }

  _moveHandle() {
    let moveMinorHandle;
    if (this.options.upright) {
      const sliderCoords = this.$domEl.offset().top;

      this.$minorHandleValue.mousedown(() => {
        $(document).mousemove((e) => {
          moveMinorHandle = true;
          const newTop = e.pageY - sliderCoords;
          const length = this.$domEl.height();
          this.publish('coordinatesChangedByHandleMove', newTop, length, moveMinorHandle);
        });
      });

      this.$majorHandleValue.mousedown(() => {
        $(document).mousemove((e) => {
          moveMinorHandle = false;
          const newTop = e.pageY - sliderCoords;
          const length = this.$domEl.height();
          this.publish('coordinatesChangedByHandleMove', newTop, length, moveMinorHandle);
        });
      });

      $(document).mouseup(() => {
        $(document).unbind('mousemove');
      });
    } else {
      const sliderCoords = this.$domEl.offset().left;

      this.$minorHandleValue.mousedown(() => {
        $(document).mousemove((e) => {
          moveMinorHandle = true;
          const newTop = e.pageX - sliderCoords;
          const length = this.$domEl.width();
          this.publish('coordinatesChangedByHandleMove', newTop, length, moveMinorHandle);
        });
      });

      this.$majorHandleValue.mousedown(() => {
        $(document).mousemove((e) => {
          moveMinorHandle = false;
          const newTop = e.pageX - sliderCoords;
          const length = this.$domEl.width();
          this.publish('coordinatesChangedByHandleMove', newTop, length, moveMinorHandle);
        });
      });

      $(document).mouseup(() => {
        $(document).unbind('mousemove');
      });
    }
  }
}

export default View;
