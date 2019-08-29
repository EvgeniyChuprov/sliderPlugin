const path = require('path');

module.exports = (config) => {
  config.set({

    files: [
      'test/test.js',
    ],
    frameworks: ['mocha', 'jquery-3.3.1'],
    preprocessors: {
      'test/test.js': ['webpack'],
    },
    reporters: ['mocha', 'coverage-istanbul'],
    coverageIstanbulReporter: {
      reports: ['html', 'lcovonly', 'text-summary'],
      dir: path.join(__dirname, 'coverage'),
      combineBrowserReports: true,
      fixWebpackSourcePaths: true,
      skipFilesWithNoCoverage: true,
      'report-config': {
        html: {
          subdir: 'html',
        },
      },
    },
    webpack: {
      mode: 'none',
      // module: {
      //   rules: [{
      //     test: /\.js$/,
      //     include: path.resolve('src/'),
      //     use: {
      //       loader: 'istanbul-instrumenter-loader'
      //     },
      //   }]
      // }
    },
    webpackMiddleware: {
      noInfo: true,
    },
    plugins: [
      'karma-jquery',
      'karma-webpack',
      'karma-mocha',
      'karma-chai',
      'karma-chrome-launcher',
      'karma-mocha-reporter',
      'karma-coverage-istanbul-reporter',
      'istanbul-instrumenter-loader',
    ],
    browsers: ['Chrome'],
  });
};
