/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
import EventEmitter from 'event-emitter';

class View {
  constructor($this) {
    this.$domEl = $this;
    this._findDOMElements();
    this._addEventListeners();
  }

  processEvent(options) {
    this.options = options;
    this._calculateSliderParameters();
    this._drawSlider();
  }

  _calculateSliderParameters() {
    const {
      min, max, majorHandleValue,
      minorHandleValue,
    } = this.options;

    const minPoint = ((minorHandleValue - min) * 100)
    / (max - min);
    const maxPoint = ((majorHandleValue - min) * 100)
    / (max - this.options.min);
    const step = 100 / ((max - min)
    / this.options.step);

    this.offsetParameters = {
      minPoint,
      maxPoint,
      step,
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
    this.$domEl.on('click', this._handleSliderMousemove.bind(this, 'slider'));
    this.$minorHandleValue.on('mousedown', this._handleSliderMousedown.bind(this, 'handle'));
    this.$majorHandleValue.on('mousedown', this._handleSliderMousedown.bind(this, 'secondHandle'));
  }

  _handleSliderMousedown(placePressing, e) {
    if (e.target.nodeName !== 'SPAN') {
      $(document).on('mousemove', this._handleSliderMousemove.bind(this, placePressing));
    }
    $(document).on('mouseup', this._handleSliderMouseup.bind(this));
  }

  _handleSliderMousemove(placePressing, e) {
    const {
      min, max, vertical, minorHandleValue,
      majorHandleValue, isDouble, step,
    } = this.options;

    const sliderCoords = vertical
      ? this.$domEl.offset().top : this.$domEl.offset().left;
    const page = vertical ? e.pageY : e.pageX;
    const length = vertical
      ? this.$domEl.height() : this.$domEl.width();
    const newPosition = page - sliderCoords;


    const shiftPercentage = (newPosition * 100) / length;
    const middle = (max - min) / 2;
    const positionSlider = step * Math.round(shiftPercentage
     / this.offsetParameters.step) + min;

    if (placePressing === 'handle') {
      this.options.minorHandleValue = positionSlider;
      this.emit('coordinatesChanged', this.options);
    }

    if (placePressing === 'secondHandle') {
      this.options.majorHandleValue = positionSlider;
      this.emit('coordinatesChanged', this.options);
    }

    if (placePressing === 'slider') {
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
  }

  // eslint-disable-next-line class-methods-use-this
  _handleSliderMouseup() {
    $(document).unbind('mousemove');
  }
}

EventEmitter(View.prototype);
export default View;
