require.config({
  baseUrl: 'src/js',
  paths: {
    jquery: '//code.jquery.com/jquery-2.1.4',
    bootstrap: '//netdna.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap',
    lang: '../../lang/summernote-ko-KR'
  },
  shim: {
    bootstrap: ['jquery'],
    lang: ['jquery']
  },
  packages: [{
    name: 'summernote',
    main: 'summernote',
    location: './'
  }]
});

require([
  'jquery',
  'summernote'
], function ($) {
  var requireByPromise = function (paths) {
    return $.Deferred(function (deferred) {
      require(paths, function () {
        deferred.resolve.apply(this, arguments);
      });
    });
  };

  var promise = $.Deferred();
  // editor type setting
  switch ($('script[data-editor-type]').data('editor-type')) {
    case 'lite':
      promise = requireByPromise(['summernote/lite/settings']).then(function (lite) {
        $.summernote = $.extend($.summernote, lite);
      });
      break;
    case 'bs3':
      promise = requireByPromise(['bootstrap', 'summernote/bs3/settings']).then(function (bootstrap, bs3) {
        $.summernote = $.extend($.summernote, bs3);
        return requireByPromise(['lang']);
      });
      break;
  }

  promise.then(function () {
    // initialize summernote
    $('.summernote').summernote({
      height: 300,
      lang: 'ko-KR'
    });
  });
});
