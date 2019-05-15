import "./style.scss";
import "./plugin/jquery.myFirstSliderPlugin.js";

$('#sliderBlockOne').myFirstSliderPlugin();
$('#sliderBlockTwo').myFirstSliderPlugin({
      valueOne : 15,
    valueTwo : 35,
    vertical:true,
    tooltip: true,
});
$('#sliderBlockThree').myFirstSliderPlugin({
    min : 10,
    max : 90,
      valueOne : 45,
    valueTwo : 85,
    step : 5,
    vertical:false,
    tooltip: true,
});
$('#sliderBlockFourth').myFirstSliderPlugin({
    min : -10,
    max : 10,
    step : 2,
    valueOne : -5,
    valueTwo : 5,
    vertical:true,
    tooltip: false,
});