var path        = require('path'),
  gulp        = require('gulp'),
  $           = require('gulp-load-plugins')(),
  gulpsync    = $.sync(gulp),
  del         = require('del');
webserver   = require('gulp-webserver');


// ignore everything that begins with underscore
var hidden_files = '**/_*.*';
var ignored_files = '!'+hidden_files;

// MAIN PATHS
var paths = {
  app:     './',
  styles:  'css/',
  scripts: 'js/'
};


// SOURCES CONFIG
var source = {
  scripts: [paths.scripts + '*.js',
    paths.scripts + '/**/*.js'
  ],
  styles: {
    app:    [ paths.styles + '*.*'],
    watch:  [ paths.styles + '**/*']
  }
};

// BUILD TARGET CONFIG
var build = {
  scripts: paths.app + 'js',
  styles:  paths.app + 'css',
};

//---------------
// TASKS
//---------------


// JS APP
//gulp.task('scripts:app', function() {
//  log('Building scripts..');
//  // Minify and copy all JavaScript (except vendor scripts)
//  return gulp.src(source.scripts)
//    .pipe($.jsvalidate())
//    .on('error', handleError)
//    .pipe( $.if( useSourceMaps, $.sourcemaps.init() ))
//    .pipe($.concat( 'app.js' ))
//    .pipe($.ngAnnotate())
//    .on('error', handleError)
//    .pipe( $.if(isProduction, $.uglify({preserveComments:'some'}) ))
//    .on('error', handleError)
//    .pipe( $.if( useSourceMaps, $.sourcemaps.write() ))
//    .pipe(gulp.dest(build.scripts));
//});


//---------------
// WATCH
//---------------

// Rerun the task when a file changes
gulp.task('watch', function() {
  log('Starting watch and LiveReload..');

  $.livereload.listen();

  gulp.watch(source.scripts,         ['']);
  gulp.watch(source.styles.watch,    ['']);

  // a delay before triggering browser reload to ensure everything is compiled
  var livereloadDelay = 500;
  // list of source file to watch for live reload
  var watchSource = [].concat(
    source.scripts,
    source.styles.watch,
    "index.html"
  );

  gulp
    .watch(watchSource)
    .on('change', function(event) {
      setTimeout(function() {
        $.livereload.changed( event.path );
      }, livereloadDelay);
    });

});

// lint javascript
gulp.task('lint', function() {
  return gulp
    .src(source.scripts)
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
    .pipe($.jshint.reporter('fail'));
});

// Remove all files from the build paths
//gulp.task('clean', function(done) {
//  var delconfig = [].concat(
//    build.styles,
//    build.scripts,
//    build.templates.index + 'index.html',
//    build.templates.views + 'views',
//    build.templates.views + 'pages',
//    vendor.app.dest
//  );
//
//  log('Cleaning: ' + $.util.colors.blue(delconfig));
//  // force: clean files outside current directory
//  del(delconfig, {force: true}, done);
//});

//---------------
// MAIN TASKS
//---------------


// default (no minify)
gulp.task('default', gulpsync.sync([
  'watch',
  'webserver'
]), function(){

  log('************');
  log('* All Done * You can start editing your code, LiveReload will update your browser after any change..');
  log('************');

});

gulp.task('webserver', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      open: true,
      defaultFile: 'index.html'
    }));
});
/////////////////////


// Error handler
function handleError(err) {
  log(err.toString());
  this.emit('end');
}

// log to console using
function log(msg) {
  $.util.log( $.util.colors.blue( msg ) );
}
