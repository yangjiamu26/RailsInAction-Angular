// lazyload config

angular.module('app')
    /**
   * jQuery plugin config use ui-jq directive , config the js and css files that required
   * key: function name of the jQuery plugin
   * value: array of the css js file located
   */
  .constant('JQ_CONFIG', {
      easyPieChart:   [   '../../lib/jquery.easy-pie-chart/dist/jquery.easypiechart.fill.js'],
      sparkline:      [   '../../bower_components/bower-jquery-sparkline/dist/jquery.sparkline.retina.js'],
      plot:           [   '../../bower_components/flot/jquery.flot.js',
                          '../../bower_components/flot/jquery.flot.pie.js', 
                          '../../bower_components/flot/jquery.flot.resize.js',
                          '../../bower_components/flot.tooltip/js/jquery.flot.tooltip.js',
                          '../../bower_components/flot.orderbars/js/jquery.flot.orderBars.js',
                          '../../bower_components/flot-spline/js/jquery.flot.spline.js'],
      moment:         [   '../../bower_components/moment/moment.js'],
      screenfull:     [   '../../bower_components/screenfull/dist/screenfull.min.js'],
      slimScroll:     [   '../../bower_components/slimscroll/jquery.slimscroll.min.js'],
      sortable:       [   '../../bower_components/html5sortable/jquery.sortable.js'],
      nestable:       [   '../../bower_components/nestable/jquery.nestable.js',
                          '../../lib/nestable/jquery.nestable.css'],
      filestyle:      [   '../../bower_components/bootstrap-filestyle/src/bootstrap-filestyle.js'],
      slider:         [   '../../bower_components/bootstrap-slider/bootstrap-slider.js',
                          '../../lib/bootstrap-slider/bootstrap-slider.css'],
      chosen:         [   '../../bower_components/chosen/chosen.jquery.js',
                          '../../lib/bootstrap-chosen/bootstrap-chosen.css'],
      TouchSpin:      [   '../../bower_components/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.js',
                          '../../bower_components/bootstrap-touchspin/dist/jquery.bootstrap-touchspin.min.css'],
      wysiwyg:        [   '../../bower_components/bootstrap-wysiwyg/bootstrap-wysiwyg.js',
                          '../../bower_components/bootstrap-wysiwyg/external/jquery.hotkeys.js'],
      dataTable:      [   '../../bower_components/datatables/media/js/jquery.dataTables.min.js',
                          '../../bower_components/datatables-plugins/integration/bootstrap/3/dataTables.bootstrap.js',
                          '../../bower_components/datatables-plugins/integration/bootstrap/3/dataTables.bootstrap.css'],
      vectorMap:      [   '../../bower_components/bower-jvectormap/jquery-jvectormap-1.2.2.min.js', 
                          '../../bower_components/bower-jvectormap/jquery-jvectormap-world-mill-en.js',
                          '../../lib/bower-jvectormap/jquery-jvectormap-us-aea-en.js',
                          '../../lib/bower-jvectormap/jquery-jvectormap-1.2.2.css'],
      footable:       [   '../../bower_components/footable/compiled/footable.min.js',
                          '../../bower_components/footable/compiled/footable.core.bootstrap.css'],
      fullcalendar:   [   '../../bower_components/moment/moment.js',
                          '../../bower_components/fullcalendar/dist/fullcalendar.min.js',
                          '../../bower_components/fullcalendar/dist/lang/zh-cn.js',
                          '../../bower_components/fullcalendar/dist/fullcalendar.min.css',
                          '../../lib/fullcalendar/dist/fullcalendar.theme.css'],
      daterangepicker:[   '../../bower_components/moment/moment.js',
                          '../../bower_components/bootstrap-daterangepicker/daterangepicker.js',
                          '../../bower_components/bootstrap-daterangepicker/daterangepicker.css'],
      tagsinput:      [   '../../bower_components/bootstrap-tagsinput/dist/bootstrap-tagsinput.js',
                          '../../bower_components/bootstrap-tagsinput/dist/bootstrap-tagsinput.css']
                      
    }
  )
  .constant('MODULE_CONFIG', [
      {
          name: 'malhar.dashboard',
          files: [
              '../../bower_components/lodash/dist/lodash.min.js',
              '../../bower_components/jquery-ui/jquery-ui.min.js',
              '../../bower_components/angular-ui-sortable/sortable.min.js',
              '../../bower_components/d3/d3.js',
              '../../bower_components/nvd3/nv.d3.js',
              '../../bower_components/angularjs-nvd3-directives/dist/angularjs-nvd3-directives.js',
              '../../bower_components/malhar-angular-dashboard/dist/malhar-angular-dashboard.css',
              '../../bower_components/malhar-angular-dashboard/dist/malhar-angular-dashboard.js',
              '../../bower_components/malhar-angular-widgets/dist/malhar-angular-widgets.js',
              '../../bower_components/malhar-angular-table/dist/mlhr-table.js',
              '../../bower_components/pines-notify/pnotify.core.js',
              '../../bower_components/angular-pines-notify/src/pnotify.js',
              '../../bower_components/visibilityjs/lib/visibility.core.js'
          ]
      },
      {
          name: 'ui.grid',
          files: [
              '../../bower_components/angular-ui-grid/ui-grid.min.js',
              '../../bower_components/angular-ui-grid/ui-grid.min.css'
          ]
      },
      {
          name: 'ui.select',
          files: [
              '../../bower_components/angular-ui-select/dist/select.min.js',
              '../../bower_components/angular-ui-select/dist/select.min.css'
          ]
      },
      {
          name:'angularFileUpload',
          files: [
            '../../bower_components/angular-file-upload/dist/angular-file-upload.min.js'
          ]
      },
      {
          name:'plupload',
          files: [
            '../../bower_components/plupload/js/plupload.full.min.js',
            '../../bower_components/angular-plupload/dist/angular-plupload.min.js'
          ]
      },
      {
          name:'ui.calendar',
          files: ['../../bower_components/angular-ui-calendar/src/calendar.js']
      },
      {
          name: 'ngImgCrop',
          files: [
              '../../bower_components/ng-img-crop/compile/minified/ng-img-crop.js',
              '../../bower_components/ng-img-crop/compile/minified/ng-img-crop.css'
          ]
      },
      {
          name: 'angularBootstrapNavTree',
          files: [
              '../../bower_components/angular-bootstrap-nav-tree/dist/abn_tree_directive.js',
              '../../bower_components/angular-bootstrap-nav-tree/dist/abn_tree.css'
          ]
      },
      {
          name: 'toaster',
          files: [
              '../../bower_components/angularjs-toaster/toaster.js',
              '../../bower_components/angularjs-toaster/toaster.css'
          ]
      },
      {
          name: 'vr.directives.slider',
          files: [
              '../../bower_components/angular-slider/build/angular-slider.min.js',
              '../../lib/angular-slider/build/angular-slider.css'
          ]
      },
      {
          name: 'com.2fdevs.videogular',
          files: [
              '../../bower_components/videogular/videogular.min.js'
          ]
      },
      {
          name: 'com.2fdevs.videogular.themes.default',
          files: [
              '../../bower_components/videogular-themes-default/videogular.css'
          ]
      },
      {
          name: 'com.2fdevs.videogular.plugins.controls',
          files: [
              '../../bower_components/videogular-controls/vg-controls.min.js'
          ]
      },
      {
          name: 'com.2fdevs.videogular.plugins.buffering',
          files: [
              '../../bower_components/videogular-buffering/vg-buffering.min.js'
          ]
      },
      {
          name: 'com.2fdevs.videogular.plugins.overlayplay',
          files: [
              '../../bower_components/videogular-overlay-play/vg-overlay-play.min.js'
          ]
      },
      {
          name: 'com.2fdevs.videogular.plugins.poster',
          files: [
              '../../bower_components/videogular-poster/vg-poster.min.js'
          ]
      },
      {
          name: 'com.2fdevs.videogular.plugins.imaads',
          files: [
              '../../bower_components/videogular-ima-ads/vg-ima-ads.min.js'
          ]
      },
      {
          name: 'xeditable',
          files: [
              '../../bower_components/angular-xeditable/dist/js/xeditable.min.js',
              '../../bower_components/angular-xeditable/dist/css/xeditable.css'
          ]
      },
      {
          name: 'smart-table',
          files: [
              '../../bower_components/angular-smart-table/dist/smart-table.min.js'
          ]
      },
      {
          name: 'object-table',
          files: [
              '../../bower_components/angular-object-table/build/object-table-style.css',
              '../../bower_components/angular-object-table/build/object-table.js',
          ]
      },
      {
          name: 'dynamic-form',
          files: [
              '../../bower_components/angularjs-dynamic-form/src/angulardynamicform.js'
          ]
      },
      {
          name: 'iframe-resizer',
          files: [
              '../../bower_components/iframe-resizer/js/iframeResizer.min.js',
              '../../bower_components/ng-iframe-resizer/dist/iframe-resizer.min.js'
          ]
      },      
      {
          name: 'angular-skycons',
          files: [
              '../../lib/angular-skycons/angular-skycons.js'
          ]
      },
      {
          name: 'echarts',
          files: [
              '../../bower_components/echarts/build/dist/echarts-all.js',
              '../../bower_components/angular-echarts/dist/angular-echarts.js'
          ]
      },
      {
          name: 'ckeditor',
          files: [
              '../../bower_components/ckeditor/ckeditor.js',
              '../../bower_components/angular-ckeditor/angular-ckeditor.js'
          ]
      },
      {
          name: 'ueditor',
          files: [
              '../../bower_components/angular-bdeditor/dist/ueditor.config.js',
              '../../bower_components/angular-bdeditor/dist/ueditor.all.min.js',
              '../../bower_components/angular-bdeditor/dist/angular-ueditor.js'
          ]
      },
      {
        name: 'ztree',
        files: [
            '../../bower_components/zTree/css/metroStyle/metroStyle.css',
            '../../bower_components/zTree/js/jquery.ztree.all.min.js',
            '../../lib/zTree/ng-ztree.js'
        ]
      },
      {
        name: 'handsontable',
        files: [
            '../../bower_components/handsontable/dist/handsontable.css',
            '../../bower_components/pikaday/pikaday.js',
            '../../bower_components/moment/moment.js',
            '../../bower_components/zeroclipboard/dist/ZeroClipboard.js',
            '../../bower_components/handsontable/dist/handsontable.full.min.js'
        ]
      },
      {
        name: 'ng-handsontable',
        files: [
            '../../bower_components/ngHandsontable/dist/ngHandsontable.js'
        ]
      }
    ]
  )
  // oclazyload config
  .config(['$ocLazyLoadProvider', 'MODULE_CONFIG', function($ocLazyLoadProvider, MODULE_CONFIG) {
      // We configure ocLazyLoad to use the lib script.js as the async loader
      $ocLazyLoadProvider.config({
          debug:  false,
          events: true,
          modules: MODULE_CONFIG
      });
  }])
;
