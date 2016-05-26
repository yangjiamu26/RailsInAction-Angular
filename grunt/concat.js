module.exports = {
  angular:{
    src:[
      'bower_components/jquery/dist/jquery.min.js',

      'bower_components/angular/angular.js',
      
      'bower_components/angular-locale_zh-cn/angular-locale_zh-cn.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-touch/angular-touch.js',

      'bower_components/angular-ui-router/release/angular-ui-router.js', 
      'bower_components/ngstorage/ngStorage.js',
      'bower_components/angular-ui-scroll/dist/ui-scroll.js',
      'bower_components/angular-ui-scrollpoint/dist/scrollpoint.js',
      'bower_components/angular-ui-event/dist/event.js',
      'bower_components/angular-ui-mask/dist/mask.js',
      'bower_components/angular-ui-validate/dist/validate.js',
      'bower_components/angular-ui-indeterminate/dist/indeterminate.js',
      'bower_components/angular-ui-uploader/dist/uploader.js',
      'bower_components/angular-ui-utils/index.js',

      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
     
      'bower_components/oclazyload/dist/ocLazyLoad.js',
     
      'bower_components/angular-translate/angular-translate.js',
      'bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
      'bower_components/angular-translate-storage-cookie/angular-translate-storage-cookie.js',
      'bower_components/angular-translate-storage-local/angular-translate-storage-local.js',

      'bower_components/angular-aria/angular-aria.js',
      'bower_components/angular-messages/angular-messages.js',
      'bower_components/angular-material/angular-material.js',

      'bower_components/textAngular/dist/textAngular-rangy.min.js',
      'bower_components/textAngular/dist/textAngular-sanitize.min.js',
      'bower_components/textAngular/dist/textAngular.min.js',

      'src/js/*.js',
      'src/js/directives/*.js',
      'src/js/services/*.js',
      'src/js/filters/*.js',
      'src/js/controllers/bootstrap.js'
    ],
    dest:'angular/js/app.src.js'
  },
  material:{
    src:[
      'bower_components/jquery/dist/jquery.min.js',

      'bower_components/angular/angular.js',
      
      'bower_components/angular-locale_zh-cn/angular-locale_zh-cn.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-sanitize/angular-sanitize.js',
      'bower_components/angular-touch/angular-touch.js',

      'bower_components/angular-ui-router/release/angular-ui-router.js', 
      'bower_components/ngstorage/ngStorage.js',
      'bower_components/angular-ui-scroll/dist/ui-scroll.js',
      'bower_components/angular-ui-scrollpoint/dist/scrollpoint.js',
      'bower_components/angular-ui-event/dist/event.js',
      'bower_components/angular-ui-mask/dist/mask.js',
      'bower_components/angular-ui-validate/dist/validate.js',
      'bower_components/angular-ui-indeterminate/dist/indeterminate.js',
      'bower_components/angular-ui-uploader/dist/uploader.js',
      'bower_components/angular-ui-utils/index.js',

      'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
     
      'bower_components/oclazyload/dist/ocLazyLoad.js',
     
      'bower_components/angular-translate/angular-translate.js',
      'bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
      'bower_components/angular-translate-storage-cookie/angular-translate-storage-cookie.js',
      'bower_components/angular-translate-storage-local/angular-translate-storage-local.js',

      'bower_components/angular-aria/angular-aria.js',
      'bower_components/angular-messages/angular-messages.js',
      'bower_components/angular-material/angular-material.js',

      'bower_components/textAngular/dist/textAngular-rangy.min.js',
      'bower_components/textAngular/dist/textAngular-sanitize.min.js',
      'bower_components/textAngular/dist/textAngular.min.js',

      'src/js/*.js',
      'src/js/directives/*.js',
      'src/js/services/*.js',
      'src/js/filters/*.js',
      'src/js/controllers/bootstrap.js'
    ],
    dest:'material/js/app.src.js'
  },
  html:{
    src:[
      'bower_components/jquery/dist/jquery.min.js',
      'bower_components/bootstrap/dist/js/bootstrap.js',
      'html/js/*.js'
    ],
    dest:'static/js/app.src.js'
  }
}
