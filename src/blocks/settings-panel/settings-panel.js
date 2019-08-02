require('../../plugin/jquery.myFirstSliderPlugin.js');

$('#firstSlider').myFirstSliderPlugin({
  min: 25,
  max: 75,
  step: 5,
  valueMin: 25,
  valueMax: 45,
  vertical: true,
  tooltip: true,
  twoSliders: true,
  inputMin: $('#firstBlock .slider__input_min'),
  inputMax: $('#firstBlock .slider__input_max'),
  inputStep: $('#firstBlock .slider__input_step'),
  inputValueMin: $('#firstBlock .slider__input_value-min'),
  inputValueMax: $('#firstBlock .slider__input_value-max'),
  inputVertical: $('#firstBlock .slider__vertically-horizontally'),
  inputTooltip: $('#firstBlock .slider__tooltip'),
  inputTwoSliders: $('#firstBlock .slider__twoSlider'),
});

$('#secondSlider').myFirstSliderPlugin({
  min: -15,
  max: 15,
  step: 5,
  valueMin: -15,
  valueMax: 15,
  vertical: false,
  tooltip: true,
  twoSliders: true,
  inputMin: $('#secondBlock .slider__input_min'),
  inputMax: $('#secondBlock .slider__input_max'),
  inputStep: $('#secondBlock .slider__input_step'),
  inputValueMin: $('#secondBlock .slider__input_value-min'),
  inputValueMax: $('#secondBlock .slider__input_value-max'),
  inputVertical: $('#secondBlock .slider__vertically-horizontally'),
  inputTooltip: $('#secondBlock .slider__tooltip'),
  inputTwoSliders: $('#secondBlock .slider__twoSlider'),
});

$('#thirdSlider').myFirstSliderPlugin({
  min: 0,
  max: 100,
  step: 1,
  valueMin: 15,
  valueMax: 75,
  vertical: true,
  tooltip: true,
  twoSliders: false,
  inputMin: $('#thirdBlock .slider__input_min'),
  inputMax: $('#thirdBlock .slider__input_max'),
  inputStep: $('#thirdBlock .slider__input_step'),
  inputValueMin: $('#thirdBlock .slider__input_value-min'),
  inputValueMax: $('#thirdBlock .slider__input_value-max'),
  inputVertical: $('#thirdBlock .slider__vertically-horizontally'),
  inputTooltip: $('#thirdBlock .slider__tooltip'),
  inputTwoSliders: $('#thirdBlock .slider__twoSlider'),
});

$('#fourthSlider').myFirstSliderPlugin({
  inputMin: $('#fourthBlock .slider__input_min'),
  inputMax: $('#fourthBlock .slider__input_max'),
  inputStep: $('#fourthBlock .slider__input_step'),
  inputValueMin: $('#fourthBlock .slider__input_value-min'),
  inputValueMax: $('#fourthBlock .slider__input_value-max'),
  inputVertical: $('#fourthBlock .slider__vertically-horizontally'),
  inputTooltip: $('#fourthBlock .slider__tooltip'),
  inputTwoSliders: $('#fourthBlock .slider__twoSlider'),
});
