var gulp = require('gulp')
var webpack = require('webpack')
var mocha = require('gulp-mocha')
var {exec} = require('child_process')

gulp.task('default', function(done) { 
    webpack(require('./webpack.config.js')).run((err, stats) => {
        err && console.error(err)
        done()
    })
})

gulp.task('build', function(done) {
    var tsLaunch = exec('tsc')
    tsLaunch.on('error', (err) => console.error(err))
    tsLaunch.on('exit', (code, sig) => {
        done()
    })
})

gulp.task('test', ['build'], function(done) {
    return gulp.src('./tests/**/*.js', { read: false})
        .pipe(mocha({
            reporter: 'spec',
            globals: {
                should: require('should')
            }
        }))
})