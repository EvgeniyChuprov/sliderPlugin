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
      upright, minPoint, maxPoint,
      severalHandles, tool, toolMin,
      toolMax,
    } = this.options;
    const initialPosition = '-10px';
    const orientation = upright ? 'top' : 'left';
    this.$minorHandleValue.css(orientation, `${minPoint}%`);
    this.$majorHandleValue.css(orientation, `${maxPoint}%`);

    const visibilityMajorHandle = severalHandles ? 'block' : 'none';
    this.$majorHandleValue.css('display', visibilityMajorHandle);
    this.$toolMax.css('display', visibilityMajorHandle);

    const visibility = tool ? 'visible' : 'hidden';
    this.$toolMin.css('visibility', visibility);
    this.$toolMax.css('visibility', visibility);
    this.$toolMin.html(toolMin);
    this.$toolMax.html(toolMax);

    const displacement = upright ? 'left' : 'top';

    this.$domEl.toggleClass('range-slider_vertical', upright);

    this.$minorHandleValue.toggleClass('range-slider__value-min_vertical', upright).css(displacement, initialPosition);
    this.$majorHandleValue.toggleClass('range-slider__value-max_vertical', upright).css(displacement, initialPosition);

    this.$toolMin.toggleClass('range-slider__tool-min_vertical', upright);
    this.$toolMax.toggleClass('range-slider__tool-max_vertical', upright);
  }

  _findDOMElements() {
    this.$minorHandleValue = this.$domEl.find('.range-slider__value-min');
    this.$majorHandleValue = this.$domEl.find('.range-slider__value-max');
    this.$toolMin = this.$domEl.find('.range-slider__tool-min');
    this.$toolMax = this.$domEl.find('.range-slider__tool-max');
  }

  _addEventListeners() {
    this.$domEl.on('click', this._handleSliderMousemove.bind(this));
    this.$minorHandleValue.on('mousedown', this._handleSliderMousedown.bind(this));
    this.$majorHandleValue.on('mousedown', this._handleSliderMousedown.bind(this));
  }

  _handleSliderMousedown(e) {
    this.moveMinorHandle = $(e.target).hasClass('range-slider__value-min');
    $(document).on('mousemove', this._handleSliderMousemove.bind(this));
    $(document).on('mouseup', this._handleSliderMouseup.bind(this));
  }

  _handleSliderMousemove(e) {
    const { upright } = this.options;

    const sliderCoords = upright
      ? this.$domEl.offset().top : this.$domEl.offset().left;
    const page = upright ? e.pageY : e.pageX;
    const length = upright
      ? this.$domEl.height() : this.$domEl.width();
    const newPosition = page - sliderCoords;
    this.publish('coordinatesChanged', newPosition, length, this.moveMinorHandle);
  }

  _handleSliderMouseup() {
    this.moveMinorHandle = null;
    $(document).unbind('mousemove');
  }
}

export default View;
