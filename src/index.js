import "./plugin/jquery.myFirstSliderPlugin.js";
import "./style.scss";

require('./plugin/jquery.myFirstSliderPlugin.js');
$('#sliderBlockOne').myFirstSliderPlugin({
  changeTooltip:$('#firstBlock .tooltip'),
  changeSlider2:$('#firstBlock .twoSlider'),
  changeVertical:$('#firstBlock .vert-goriz'),
  changeMin:$('#firstBlock .min'),
  changeMax:$('#firstBlock .max'),
  changeStep:$('#firstBlock .step'),
  changeValue1:$('#firstBlock .value1'),
  changeValue2:$('#firstBlock .value2'),
});
$('#sliderBlockTwo').myFirstSliderPlugin({
      valueOne : 15,
    valueTwo : 35,
    vertical:true,
    tooltip: true,
    changeTooltip:$('#secondBlock .tooltip'),
    changeSlider2:$('#secondBlock .twoSlider'),
    changeVertical:$('#secondBlock .vert-goriz'),
    changeMin:$('#secondBlock .min'),
    changeMax:$('#secondBlock .max'),
    changeStep:$('#secondBlock .step'),
    changeValue1:$('#secondBlock .value1'),
    changeValue2:$('#secondBlock .value2'),
});
$('#sliderBlockThree').myFirstSliderPlugin({
    min : 10,
    max : 90,
      valueOne : 45,
    valueTwo : 85,
    step : 5,
    vertical:false,
    tooltip: true,
    changeTooltip:$('#thirdBlock .tooltip'),
    changeSlider2:$('#thirdBlock .twoSlider'),
    changeVertical:$('#thirdBlock .vert-goriz'),
    changeMin:$('#thirdBlock .min'),
    changeMax:$('#thirdBlock .max'),
    changeStep:$('#thirdBlock .step'),
    changeValue1:$('#thirdBlock .value1'),
    changeValue2:$('#thirdBlock .value2'),
});
$('#sliderBlockFourth').myFirstSliderPlugin({
    min : -10,
    max : 10,
    step : 2,
    valueOne : -5,
    valueTwo : 5,
    vertical:true,
    tooltip: false,
    changeTooltip:$('#fourthBlock .tooltip'),
    changeSlider2:$('#fourthBlock .twoSlider'),
    changeVertical:$('#fourthBlock .vert-goriz'),
    changeMin:$('#fourthBlock .min'),
    changeMax:$('#fourthBlock .max'),
    changeStep:$('#fourthBlock .step'),
    changeValue1:$('#fourthBlock .value1'),
    changeValue2:$('#fourthBlock .value2'),
});