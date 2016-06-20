// lazyload config
function getTimeMass(){
  var time = new Date();
  var str = time.getFullYear()+''+(time.getMonth()+1)+''+time.getDate()+''+time.getHours()+''+time.getMinutes()+''+time.getSeconds();
  return str;
}

angular.module('app')
    /**
   * jQuery plugin config use ui-jq directive , config the js and css files that required
   * key: function name of the jQuery plugin
   * value: array of the css js file located
   */
  .constant('JQ_CONFIG', {
    easyPieChart:   [   'bower_components/jquery.easy-pie-chart/dist/jquery.easypiechart.fill.js'],
    sparkline:      [   'bower_components/jquery.sparkline/dist/jquery.sparkline.retina.js'],
    plot:           [   'bower_components/flot/jquery.flot.js',
                          'bower_components/flot/jquery.flot.pie.js', 
                          'bower_components/flot/jquery.flot.resize.js',
                          'bower_components/flot.tooltip/js/jquery.flot.tooltip.js',
                          'bower_components/flot.orderbars/js/jquery.flot.orderBars.js',
                          'bower_components/flot-spline/js/jquery.flot.spline.js']            

    }
  )
  // oclazyload config
  .config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
      // We configure ocLazyLoad to use the lib script.js as the async loader
      $ocLazyLoadProvider.config({
          debug:  true,
          events: true,
          modules: [
              {
                  name: 'angularBootstrapNavTree',
                  files: [
                      'bower_components/angular-bootstrap-nav-tree/dist/abn_tree_directive.js',
                      'bower_components/angular-bootstrap-nav-tree/dist/abn_tree.css'
                  ]
              },
              {
                  name: 'ctopo',
                  files: [
                      'bower_components/ctopo-master/css/consolepanel.css',
                      'bower_components/ctopo-master/src/consolepanel.js',
                      'bower_components/ctopo-master/src/ctopo.js',
                      'bower_components/ctopo-master/src/ctopo-directive.js'
                  ]
              },
              {
                  name: 'jtopo',
                  files: [
                      'bower_components/jtopo/jtopo.js',
                      'bower_components/jtopo/ng-jtopo.js'
                  ]
              },
              {
                  name:'ztree',
                  files:[
                      'bower_components/zTree-master/css/zTreeStyle/zTreeStyle.css',
                      'bower_components/zTree-master/js/jquery.ztree.core.min.js',
                      'bower_components/zTree-master/js/ng-ztree.js'
                  ]
              }
          ]
      });
  }])
;
