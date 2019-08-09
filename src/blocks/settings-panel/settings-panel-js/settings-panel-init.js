require('../../../plugin/jquery.myFirstSliderPlugin.js');

$('#firstSlider').myFirstSliderPlugin({
  min: 25,
  max: 75,
  step: 5,
  valueMin: 25,
  valueMax: 45,
  vertical: true,
  tooltip: true,
  twoSliders: true,
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
});

$('#thirdSlider').myFirstSliderPlugin({
  min: 0,
  max: 100,
  step: 1,
  valueMin: 15,
  valueMax: 75,
  vertical: false,
  tooltip: true,
  twoSliders: true,
});

$('#fourthSlider').myFirstSliderPlugin({
  min: 2,
  max: 8,
  step: 1,
  valueMin: 5,
  valueMax: 7,
  vertical: false,
  tooltip: true,
  twoSliders: true,
});
