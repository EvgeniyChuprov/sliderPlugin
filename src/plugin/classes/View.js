/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */
import Observer from './Observer';

class View extends Observer {
  constructor($this) {
    super();
    this.$domEl = $this;
    this._findDOMElements();
    this._addEventListeners();
  }

  processEvent(event, options) {
    if (event === 'drawSlider') {
      this.options = options;
      this.drawSlider();
    }
  }

  _drawSlider() {
    const orientation = this.options.upright ? 'top' : 'left';
    this.$minorHandleValue.css(orientation, `${this.options.minPoint}%`);
    this.$majorHandleValue.css(orientation, `${this.options.maxPoint}%`);

    const visibilityMajorHandle = this.options.severalHandles ? 'block' : 'none';
    this.$majorHandleValue.css('display', visibilityMajorHandle);
    this.$toolMax.css('display', visibilityMajorHandle);

    const visibility = this.options.tool ? 'visible' : 'hidden';
    this.$toolMin.css('visibility', visibility);
    this.$toolMax.css('visibility', visibility);
    this.$toolMin.html(this.options.toolMin);
    this.$toolMax.html(this.options.toolMax);

    const addClass = this.options.upright ? 'vertical' : 'horizon';
    const delClass = this.options.upright ? 'horizon' : 'vertical';
    const displacement = this.options.upright ? 'left' : 'top';
    this.$domEl
      .addClass(`range-slider_${addClass}`)
      .removeClass(`range-slider_${delClass}`);
    this.$minorHandleValue
      .addClass(`range-slider__value-min_${addClass}`).css(displacement, `${-10}px`)
      .removeClass(`range-slider__value-min_${delClass}`);
    this.$majorHandleValue
      .addClass(`range-slider__value-max_${addClass}`).css(displacement, `${-10}px`)
      .removeClass(`range-slider__value-max_${delClass}`);
    this.$toolMin
      .addClass(`range-slider__tool-min_${addClass}`)
      .removeClass(`range-slider__tool-min_${delClass}`);
    this.$toolMax
      .addClass(`range-slider__tool-max_${addClass}`)
      .removeClass(`range-slider__tool-max_${delClass}`);
  }

  _findDOMElements() {
    this.$minorHandleValue = this.$domEl.find('.range-slider__value-min');
    this.$majorHandleValue = this.$domEl.find('.range-slider__value-max');
    this.$toolMin = this.$domEl.find('.range-slider__tool-min');
    this.$toolMax = this.$domEl.find('.range-slider__tool-max');
    this.moveMinorHandle = null;
  }

  _handleSliderMousemove(e) {
    const sliderCoords = this.options.upright
      ? this.$domEl.offset().top : this.$domEl.offset().left;
    const page = this.options.upright ? e.pageY : e.pageX;
    const length = this.options.upright
      ? this.$domEl.height() : this.$domEl.width();
    const newPosition = page - sliderCoords;
    this.publish('coordinatesChanged', newPosition, length, this.moveMinorHandle);
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

  _handleSliderMouseup() {
    this.moveMinorHandle = null;
    $(document).unbind('mousemove');
  }
}

export default View;
