/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
import EventEmitter from 'event-emitter';

class View {
  constructor($this) {
    this.$domEl = $this;
    this._drawInitialSliderElements();
    this._findDOMElements();
    this._addEventListeners();
  }

  displayView(options) {
    this.options = options;
    this._convertPositionsToPercent();
    this._drawSlider();
  }

  _drawInitialSliderElements() {
    const initialSliderElements = $(`
      <div class="range-slider__handle js-range-slider__handle" >
        <span class = "range-slider__tool-handle js-range-slider__tool-handle" ></span>
      </div>
      <div class="range-slider__second-handle js-range-slider__second-handle" >
        <span class = "range-slider__tool-second-handle js-range-slider__tool-second-handle" ></span>
      </div>
    `);
    this.$domEl.append(initialSliderElements);
  }

  _convertPositionsToPercent() {
    const {
      min, max, majorHandleValue,
      minorHandleValue,
    } = this.options;

    this.offsetParameters = {
      minPoint: ((minorHandleValue - min) * 100) / (max - min),
      maxPoint: ((majorHandleValue - min) * 100) / (max - this.options.min),
      step: 100 / ((max - min) / this.options.step),
    };
  }

  _drawSlider() {
    const {
      minPoint, maxPoint,
    } = this.offsetParameters;

    const {
      minorHandleValue,
      majorHandleValue,
      vertical,
      tooltip,
      isDouble,
    } = this.options;

    const initialPosition = '-10px';
    const orientation = vertical ? 'top' : 'left';
    this.$minorHandleValue.css(orientation, `${minPoint}%`);
    this.$majorHandleValue.css(orientation, `${maxPoint}%`);

    const visibilityMajorHandle = isDouble ? 'block' : 'none';
    this.$majorHandleValue.css('display', visibilityMajorHandle);
    this.$toolMax.css('display', visibilityMajorHandle);

    const visibility = tooltip ? 'visible' : 'hidden';
    this.$toolMin.css('visibility', visibility);
    this.$toolMax.css('visibility', visibility);
    this.$toolMin.html(minorHandleValue);
    this.$toolMax.html(majorHandleValue);

    const displacement = vertical ? 'left' : 'top';

    this.$domEl.toggleClass('range-slider_vertical', vertical);

    this.$minorHandleValue.toggleClass('range-slider__handle_vertical', vertical).css(displacement, initialPosition);
    this.$majorHandleValue.toggleClass('range-slider__second-handle_vertical', vertical).css(displacement, initialPosition);

    this.$toolMin.toggleClass('range-slider__tool-handle_vertical', vertical);
    this.$toolMax.toggleClass('range-slider__tool-second-handle_vertical', vertical);
  }

  _findDOMElements() {
    this.$minorHandleValue = this.$domEl.find('.js-range-slider__handle');
    this.$majorHandleValue = this.$domEl.find('.js-range-slider__second-handle');
    this.$toolMin = this.$domEl.find('.js-range-slider__tool-handle');
    this.$toolMax = this.$domEl.find('.js-range-slider__tool-second-handle');
  }

  _addEventListeners() {
    this.$domEl.on('click', this._handleSliderClick.bind(this));
    this.$minorHandleValue.on('mousedown', this._handleMinorHandleMousedown.bind(this));
    this.$majorHandleValue.on('mousedown', this._handleMajorHandleMousedown.bind(this));
  }

  _handleMinorHandleMousedown(e) {
    if (e.target.nodeName !== 'SPAN') {
      $(document).on('mousemove', this._handleMinorHandleMousemove.bind(this));
    }
    $(document).on('mouseup', this._handleSliderMouseup.bind(this));
  }

  _handleMinorHandleMousemove(e) {
    this.options.minorHandleValue = this._calculateHandleShift(e);
    this.emit('coordinatesChanged', this.options);
  }

  _handleMajorHandleMousedown(e) {
    if (e.target.nodeName !== 'SPAN') {
      $(document).on('mousemove', this._handleMajorHandleMousemove.bind(this));
    }
    $(document).on('mouseup', this._handleSliderMouseup.bind(this));
  }

  _handleMajorHandleMousemove(e) {
    this.options.majorHandleValue = this._calculateHandleShift(e);
    this.emit('coordinatesChanged', this.options);
  }

  _calculateHandleShift(e) {
    const {
      min, vertical, step,
    } = this.options;

    const sliderCoords = vertical
      ? this.$domEl.offset().top : this.$domEl.offset().left;
    const page = vertical ? e.pageY : e.pageX;
    const length = vertical
      ? this.$domEl.height() : this.$domEl.width();
    const newPosition = page - sliderCoords;
    const shiftPercentage = (newPosition * 100) / length;

    return (step * Math.round(shiftPercentage / this.offsetParameters.step) + min);
  }

  _handleSliderClick(e) {
    const {
      min, max, minorHandleValue,
      majorHandleValue, isDouble,
    } = this.options;

    const positionSlider = this._calculateHandleShift(e);

    const middle = (max - min) / 2;

    if (isDouble) {
      if (positionSlider - min < middle) {
        if (positionSlider < majorHandleValue) {
          this.options.minorHandleValue = positionSlider;
        }
      } else {
        // eslint-disable-next-line no-lonely-if
        if (positionSlider > minorHandleValue) {
          if (positionSlider <= max) {
            this.options.majorHandleValue = positionSlider;
          }
        }
      }
    } else {
      this.options.minorHandleValue = positionSlider;
    }
    this.emit('coordinatesChanged', this.options);
  }

  // eslint-disable-next-line class-methods-use-this
  _handleSliderMouseup() {
    $(document).unbind('mousemove');
  }
}

EventEmitter(View.prototype);
export default View;
