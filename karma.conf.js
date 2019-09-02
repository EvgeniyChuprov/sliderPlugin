const path = require('path');

module.exports = (config) => {
  config.set({

    files: [
      'test/test.js',
    ],
    frameworks: ['mocha', 'jquery-3.3.1', 'sinon-chai'],
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
      mode: 'development',
      module: {
        rules: [
          {
            enforce: 'post',
            exclude: [
              path.resolve('node_modules/'),
            ],
            include: path.resolve('src/'),
            test: /\.js$/,
            use: {
              loader: 'istanbul-instrumenter-loader',
              query: {
                esModules: true,
              },
            },
          },
        ],
      },
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
      'karma-sinon-chai',
    ],
    browsers: ['Chrome'],
  });
};
