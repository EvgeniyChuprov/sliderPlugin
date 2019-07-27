require('../../plugin/jquery.myFirstSliderPlugin.js');

$('#firstSlider').myFirstSliderPlugin({
  min: 0,
  max: 100,
  step: 2,
  valueMin: 10,
  valueMax: 50,
  vertical: false,
  tooltip: true,
});

$('#secondSlider').myFirstSliderPlugin({
  min: 10,
  max: 60,
  step: 5,
  valueMin: 15,
  valueMax: 20,
  vertical: false,
  tooltip: true,
});
