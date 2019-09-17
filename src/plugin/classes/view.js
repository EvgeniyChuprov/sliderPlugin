/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
import Observer from './observer';

class View extends Observer {
  constructor($this) {
    super();
    this.$domEl = $this;
    this.moveMinorHandle = null;
    this._findDOMElements();
    this._addEventListeners();
  }

  processEvent(event, options) {
    if (event === 'drawSlider') {
      this.options = options;
      this._drawSlider();
    }
  }

  _drawSlider() {
    const {
      vertical, minPoint, maxPoint,
      isDouble, tooltip, toolMin,
      toolMax,
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
    this.$toolMin.html(toolMin);
    this.$toolMax.html(toolMax);

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
    this.$domEl.on('click', this._handleSliderMousemove.bind(this));
    this.$minorHandleValue.on('mousedown', this._handleSliderMousedown.bind(this));
    this.$majorHandleValue.on('mousedown', this._handleSliderMousedown.bind(this));
  }

  _handleSliderMousedown(e) {
    if (e.target.nodeName !== 'SPAN') {
      this.moveMinorHandle = $(e.target).hasClass('js-range-slider__handle');
      $(document).on('mousemove', this._handleSliderMousemove.bind(this));
    }
    $(document).on('mouseup', this._handleSliderMouseup.bind(this));
  }

  _handleSliderMousemove(e) {
    const { vertical } = this.options;

    const sliderCoords = vertical
      ? this.$domEl.offset().top : this.$domEl.offset().left;
    const page = vertical ? e.pageY : e.pageX;
    const length = vertical
      ? this.$domEl.height() : this.$domEl.width();
    const newPosition = page - sliderCoords;
    this.notifySubscribers('coordinatesChanged', newPosition, length, this.moveMinorHandle);
  }

  _handleSliderMouseup() {
    this.moveMinorHandle = null;
    $(document).unbind('mousemove');
  }
}

export default View;
