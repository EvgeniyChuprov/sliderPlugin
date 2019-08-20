// const assert = require('assert');
// //const Model = require('../src/plugin/classes/Model');
// import Model from '../src/plugin/classes/Model';
// describe('Доступ к параметрам класса Model', () => {
//   const options = {
//     min: -15,
//     max: 15,
//     step: 2,
//     valueMin: -14,
//     valueMax: 15,
//     vertical: false,
//     tooltip: true,
//     twoSliders: true,
//   };
//   const model = new Model(options);

//   it ('model входящие параметры', () => {
//     assert.equal(model.options.min, -15);
//     assert.equal(model.options.max, 15);
//   });

//   it ('проверка стартовых значений и заданных при инициализаци плагина', () => {
//     assert.equal(model.setting.min, -15);
//     assert.equal(model.setting.valueMin, -14);
//   });

//   it ('Если ползунки выходят за пределы максимума и минимума', () => {
//     model.options.valueMin = -20;
//     model.options.valueMax = 50;
//     model.setting = model.normalizationOfSettings();
//     assert.equal(model.setting.valueMin, -15);
//     assert.equal(model.setting.valueMax, 15);
//     model.options = model.setting;
//   });

//   it ('Если step <= 0', () => {
//     model.options.step = -2;
//     model.setting = model.normalizationOfSettings();
//     assert.equal(model.setting.step, 1);
//     model.options = model.setting;
//   });

//   it ('Если step > max', () => {
//     model.options.step = model.options.max + 1;
//     model.setting = model.normalizationOfSettings();
//     assert.equal(model.setting.step, model.options.max);
//     model.options = model.setting;
//   });

//   it ('Если min > max', () => {
//     model.options.min = model.options.max + 1;
//     model.setting = model.normalizationOfSettings();
//     assert.equal(model.setting.min, model.options.max - model.options.step);
//     model.options = model.setting;
//   });

//   // it ('Если valueMin > valueMax', () => {
//   //   model.options.valueMin = model.options.valueMax + 1;
//   //   model.setting = model.normalizationOfSettings();
//   //   assert.equal(model.setting.valueMin, model.options.valueMax);
//   //   model.options = model.setting;
//   // });
  
//   it ('Если valueMin > valueMax', () => {
//     model.options.twoSliders = true;

//     if (model.options.twoSliders) {
//       model.options.valueMin = model.options.valueMax + 1;
//       model.setting = model.normalizationOfSettings();
//       assert.equal(model.setting.valueMin, model.options.valueMax);
//       model.options = model.setting;
//     }

//     model.options.twoSliders = false;
//     if (!model.options.twoSliders) {
//       model.options.valueMin = model.options.max + 1;
//       model.setting = model.normalizationOfSettings();
//       assert.equal(model.setting.valueMin, model.options.max);
//       model.options = model.setting;
//     }
//   });
// });
