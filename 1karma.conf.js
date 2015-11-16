module.exports = function(config){
  config.set({

    basePath : './client/',

    files : [
      'components/angular/angular.js',
      'components/angular-route/angular-route.js',
      'components/angular-mocks/angular-mocks.js',
      'app/**/*.js'
     ],

    autoWatch : true,

    frameworks: ['jasmine'],

    browsers : ['Chrome', 'Firefox'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};
