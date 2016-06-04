'use strict';

/**
 * Config for the router
 */
angular.module('app')
  .run(
    [          '$rootScope', '$state', '$stateParams',
      function ($rootScope,   $state,   $stateParams) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;        
      }
    ]
  )
  .config(
    [          '$stateProvider', '$urlRouterProvider', 'JQ_CONFIG', 'MODULE_CONFIG', 
      function ($stateProvider,   $urlRouterProvider, JQ_CONFIG, MODULE_CONFIG) {
          var layout = "tpl/app.html";
          if(window.location.href.indexOf("material") > 0){
            layout = "tpl/blocks/material.layout.html";
            $urlRouterProvider
              .otherwise('/app/dashboard/dashboard-v3');
          }else{
            $urlRouterProvider
              .otherwise('/app/dashboard/dashboard-v1');
          }
          
          $stateProvider
              .state('app', {
                  //abstract: true,
                  url: '/app',
                  templateUrl: layout,
                  data: {
                    //*: any user, including both anonymous and authenticated users.
                    //?: anonymous users.
                    //@: authenticated users.
                    roles: '@'
                  },
                  ncyBreadcrumb: {
                    label: 'Home'
                  },
                  redirectTo: 'app.dashboard-v1'
              })
              .state('app.dashboard', {
                  url: '/dashboard',
                  template: "<div ui-view></div>",
                  ncyBreadcrumb: {
                    label: 'Dashboard'
                  },
                  menu: {
                    name: 'Dashboard',
                    icon: 'glyphicon-stats text-primary-dker',
                    tag: 'Navigation'
                  },
                  redirectTo: 'app.dashboard-v1'
              })
              .state('app.dashboard-v1', {
                  parent: 'app.dashboard',
                  url: '/dashboard-v1',
                  templateUrl: 'tpl/dashboard/dashboard_v1.html',
                  resolve: load(['tpl/dashboard/dashboard.js','tpl/components/ui/ui_chart.js']),
                  ncyBreadcrumb: {
                    label: 'Dashboard V1'
                  },
                  menu: {
                    name: 'Dashboard v1'
                  }
              })
              .state('app.dashboard-v2', {
                  parent: 'app.dashboard',
                  url: '/dashboard-v2',
                  templateUrl: 'tpl/dashboard/dashboard_v2.html',
                  resolve: load(['tpl/dashboard/dashboard.js','tpl/components/ui/ui_chart.js']),
                  data: {
                    roles: ['admin']
                  },
                  ncyBreadcrumb: {
                    label: 'Dashboard V2'
                  },
                  menu: {
                    name: 'Dashboard V2',
                    isNew: true
                  }
              })
              .state('app.dashboard-v3', {
                  parent: 'app.dashboard',
                  url: '/dashboard-v3',
                  templateUrl: 'tpl/dashboard/dashboard_v3.html',
                  resolve: load(['tpl/dashboard/dashboard.js','tpl/components/ui/ui_chart.js']),
                  ncyBreadcrumb: {
                    label: 'Dashboard V3'
                  },
                  menu: {
                    name: 'Dashboard v3',
                    hidden: true
                  }
              })
              .state('app.dashboard-v4', {
                  parent: 'app.dashboard',
                  url: '/dashboard-v4',
                  templateUrl: 'tpl/dashboard/dashboard_v4.html',
                  resolve: load([
                    'malhar.dashboard',
                    'tpl/dashboard/settings.js',
                    'tpl/dashboard/datamodel.js',
                    'tpl/dashboard/service.js',
                    'tpl/dashboard/gateway.js',
                    'tpl/dashboard/widgets.js',
                    '../../lib/google-jsapi/google-jsapi.js',
                    'tpl/dashboard/dashboard_v4.js'], function(){
                      //google.load('visualization', '1', {'packages':['corechart']});
                    }),
                  ncyBreadcrumb: {
                    label: 'Dashboard V4'
                  },
                  menu: {
                    name: 'Dashboard V4'
                  }
              })
              .state('app.ui', {
                  //abstract: true,
                  url: '/ui',
                  template: '<div ui-view class="fade-in-up"></div>',
                  ncyBreadcrumb: {
                    label: 'UI'
                  },
                  redirectTo: 'app.ui.buttons',
                  menu: {
                    name: 'UI Kits',
                    icon: 'glyphicon-briefcase',
                    tag: 'Components'
                  }
              })
              .state('app.ui.buttons', {
                  url: '/buttons',
                  templateUrl: 'tpl/components/ui/ui_buttons.html',
                  ncyBreadcrumb: {
                    label: 'Buttons'
                  },
                  menu: {
                    name: 'Buttons'
                  }
              })
              .state('app.ui.icons', {
                  url: '/icons',
                  templateUrl: 'tpl/components/ui/ui_icons.html',
                  ncyBreadcrumb: {
                    label: 'Icons'
                  },
                  menu: {
                    name: 'Icons'
                  }
              })
              .state('app.ui.grid', {
                  url: '/grid',
                  templateUrl: 'tpl/components/ui/ui_grid.html',
                  ncyBreadcrumb: {
                    label: 'Grid'
                  },
                  menu: {
                    name: 'Grid'
                  }
              })
              .state('app.ui.widgets', {
                  url: '/widgets',
                  templateUrl: 'tpl/components/ui/ui_widgets.html',
                  ncyBreadcrumb: {
                    label: 'Widgets'
                  },
                  menu: {
                    name: 'Widgets'
                  }
              })          
              .state('app.ui.bootstrap', {
                  url: '/bootstrap?itemIndex',
                  templateUrl: 'tpl/components/ui/ui_bootstrap.html',
                  ncyBreadcrumb: {
                    label: 'Bootstrap'
                  },
                  menu: {
                    name: 'Bootstrap'
                  }
              })
              .state('app.ui.bootstrap.modal', {
                  url: '/modal',
                  modal: ['items', 'itemIndex'],
                  size: 'lg',
                  templateUrl: 'tpl/components/ui/modal.html',
                  controller: 'ModalInstanceCtrl',
                  resolve: {
                    items: function(){
                      return ['item1', 'item2', 'item3']
                    },
                    itemIndex: ['$stateParams', function($stateParams){
                      return $stateParams.itemIndex;
                    }]
                  }
              })
              .state('app.ui.bootstrap.modal.modal', {
                  url: '/modal',
                  modal: ['items', 'itemIndex'],
                  templateUrl: 'tpl/components/ui/modal.html',
                  controller: 'ModalInstanceCtrl',
                  resolve: {
                    items: function(){
                      return ['item1', 'item2', 'item3']
                    },
                    itemIndex: ['$stateParams', function($stateParams){
                      return $stateParams.itemIndex;
                    }]
                  }
              })              
              .state('app.ui.sortable', {
                  url: '/sortable',
                  templateUrl: 'tpl/components/ui/ui_sortable.html',
                  ncyBreadcrumb: {
                    label: 'Sortable'
                  },
                  menu: {
                    name: 'Sortable'
                  }
              })
              .state('app.ui.scroll', {
                  url: '/scroll',
                  templateUrl: 'tpl/components/ui/ui_scroll.html',
                  resolve: load('tpl/components/ui/ui_scroll.js'),
                  ncyBreadcrumb: {
                    label: 'Scroll'
                  },
                  menu: {
                    name: 'Scroll'
                  }
              })
              .state('app.ui.portlet', {
                  url: '/portlet',
                  templateUrl: 'tpl/components/ui/ui_portlet.html',
                  ncyBreadcrumb: {
                    label: 'Portlet'
                  },
                  menu: {
                    name: 'Portlet'
                  }
              })
              .state('app.ui.timeline', {
                  url: '/timeline',
                  templateUrl: 'tpl/components/ui/ui_timeline.html',
                  ncyBreadcrumb: {
                    label: 'Timeline'
                  },
                  menu: {
                    name: 'TimeLine'
                  }
              })
              .state('app.ui.tree', {
                  url: '/tree',
                  templateUrl: 'tpl/components/ui/ui_tree.html',
                  resolve: load(['angularBootstrapNavTree', 'tpl/components/ui/ui_tree.js']),
                  ncyBreadcrumb: {
                    label: 'Tree'
                  },
                  menu: {
                    name: 'Tree'
                  }
              })
              .state('app.ui.toaster', {
                  url: '/toaster',
                  templateUrl: 'tpl/components/ui/ui_toaster.html',
                  resolve: load(['toaster', 'tpl/components/ui/ui_toaster.js']),
                  ncyBreadcrumb: {
                    label: 'Toaster'
                  },
                  menu: {
                    name: 'Toaster'
                  }
              })
              .state('app.ui.jvectormap', {
                  url: '/jvectormap',
                  templateUrl: 'tpl/components/ui/ui_jvectormap.html',
                  resolve: load('tpl/components/ui/ui_jvectormap.js'),
                  ncyBreadcrumb: {
                    label: 'Vector Map'
                  },
                  menu: {
                    name: 'Vector Map'
                  }
              })
              .state('app.ui.googlemap', {
                  url: '/googlemap',
                  templateUrl: 'tpl/components/ui/ui_googlemap.html',
                  resolve: load(['tpl/components/ui/ui_googlemap_load-google-maps.js', 'tpl/components/ui/ui_googlemap.js', 'tpl/components/ui/ui_googlemap_map.js'], function(){ return loadGoogleMaps(); }),
                  ncyBreadcrumb: {
                    label: 'Google Map'
                  },
                  menu: {
                    name: 'Google Map'
                  }
              })
              .state('app.chart', {
                  url: '/chart',
                  templateUrl: 'tpl/components/ui/ui_chart.html',
                  resolve: load(['echarts', 'tpl/components/ui/ui_chart.js']),
                  ncyBreadcrumb: {
                    label: 'Chart'
                  },
                  menu: {
                    name: 'Chart',
                    icon: 'glyphicon-signal',
                    tag: 'Components'
                  }
              })
              // table
              .state('app.table', {
                  url: '/table',
                  template: '<div ui-view></div>',
                  ncyBreadcrumb: {
                    label: 'Table'
                  },
                  redirectTo: 'app.table.static',
                  menu: {
                    name: 'Table',
                    icon: 'glyphicon-list',
                    tag: 'Components'
                  }
              })
              .state('app.table.static', {
                  url: '/static',
                  templateUrl: 'tpl/components/table/table_static.html',
                  ncyBreadcrumb: {
                    label: 'Table Static'
                  },
                  menu: {
                    name: 'Table Static'
                  }
              })
              .state('app.table.datatable', {
                  url: '/datatable',
                  templateUrl: 'tpl/components/table/table_datatable.html',
                  ncyBreadcrumb: {
                    label: 'Datatable'
                  },
                  menu: {
                    name: 'Datatable'
                  },
                  resolve: load('datatables')
              })
              .state('app.table.footable', {
                  url: '/footable',
                  templateUrl: 'tpl/components/table/table_footable.html',
                  ncyBreadcrumb: {
                    label: 'Footable'
                  },
                  menu: {
                    name: 'Footable'
                  }
              })
              .state('app.table.uigrid', {
                  url: '/uigrid',
                  templateUrl: 'tpl/components/table/table_uigrid.html',
                  resolve: load(['ui.grid','tpl/components/table/table_uigrid.js']),
                  ncyBreadcrumb: {
                    label: 'Grid'
                  },
                  menu: {
                    name: 'Grid'
                  }
              })
              .state('app.table.editable', {
                  url: '/editable',
                  templateUrl: 'tpl/components/table/table_editable.html',
                  controller: 'XeditableCtrl',
                  resolve: load(['xeditable','tpl/components/form/form_xeditable.js']),
                  ncyBreadcrumb: {
                    label: 'Editable'
                  },
                  menu: {
                    name: 'Editable'
                  }
              })
              .state('app.table.smart', {
                  url: '/smart',
                  templateUrl: 'tpl/components/table/table_smart.html',
                  resolve: load(['smart-table','tpl/components/table/table_smart.js']),
                  ncyBreadcrumb: {
                    label: 'Smart Table'
                  },
                  menu: {
                    name: 'Smart Table'
                  }
              })
              .state('app.table.objectTable', {
                  url: '/objectTable',
                  templateUrl: 'tpl/components/table/table_object.html',
                  resolve: load(['object-table','tpl/components/table/table_object.js']),
                  ncyBreadcrumb: {
                    label: 'Object Table'
                  },
                  menu: {
                    name: 'Object Table'
                  }
              })   
              .state('app.table.handsonTable', {
                  url: '/handsonTable',
                  templateUrl: 'tpl/components/table/table_handson.html',
                  resolve: load(['handsontable','ng-handsontable', 'tpl/components/table/table_handson.js']),
                  ncyBreadcrumb: {
                    label: 'Handson Table'
                  },
                  menu: {
                    name: 'Handson Table'
                  }
              }) 
              .state('apps.agGrid', {
                  url: '/agGrid',
                  templateUrl: 'tpl/components/table/table_aggrid.html',
                  resolve: load(['ag-grid', 'tpl/components/table/table_aggrid.js']),
                  ncyBreadcrumb: {
                    label: 'AG Grid'
                  },
                  menu: {
                    name: 'AG Grid'
                  }
              })              
              // form
              .state('app.form', {
                  url: '/form',
                  template: '<div ui-view class="fade-in"></div>',
                  resolve: load('tpl/components/form/form.js'),
                  ncyBreadcrumb: {
                    label: 'Form'
                  },
                  redirectTo: 'app.form.elements',
                  menu: {
                    name: 'Form',
                    icon: 'glyphicon-edit',
                    tag: 'Components'
                  }
              })
              .state('app.form.components', {
                  url: '/components',
                  templateUrl: 'tpl/components/form/form_components.html',
                  resolve: load(['ngBootstrap','daterangepicker','tpl/components/form/form.components.js']),
                  ncyBreadcrumb: {
                    label: 'Form Components'
                  },
                  menu: {
                    name: 'Form Components'
                  }
              })
              .state('app.form.elements', {
                  url: '/elements',
                  templateUrl: 'tpl/components/form/form_elements.html',
                  ncyBreadcrumb: {
                    label: 'Form Elements'
                  },
                  menu: {
                    name: 'Form Elements'
                  }
              })
              .state('app.form.elements.modal', {
                  url: '/modal',
                  modal: true,
                  size: 'lg',
                  templateUrl: 'tpl/components/form/modal.form.html'
              })              
              .state('app.form.validation', {
                  url: '/validation',
                  templateUrl: 'tpl/components/form/form_validation.html',
                  ncyBreadcrumb: {
                    label: 'Form Validation'
                  },
                  menu: {
                    name: 'Form Validation'
                  }
              })
              .state('app.form.wizard', {
                  url: '/wizard',
                  templateUrl: 'tpl/components/form/form_wizard.html',
                  ncyBreadcrumb: {
                    label: 'Form Wizard'
                  },
                  menu: {
                    name: 'Form Wizard'
                  },
                  resolve: load(['wizard', 'multi-step-form', 'tpl/components/form/form_wizard.js'])
              })
              .state('app.form.fileupload', {
                  url: '/fileupload',
                  templateUrl: 'tpl/components/form/form_fileupload.html',
                  resolve: load(['angularFileUpload','plupload','tpl/components/form/form_fileupload.js'], function(){
                    angular.module('app').config(['pluploadOptionProvider', function (pluploadOptionProvider) {
                      // global setting
                      pluploadOptionProvider.setOptions({
                        flash_swf_url: '/bower_components/plupload/js/Moxie.swf',
                        silverlight_xap_url: '/bower_components/plupload/js/Moxie.xap',
                        max_file_size: '10mb'
                      });
                    }]);
                  }),
                  ncyBreadcrumb: {
                    label: 'File Upload'
                  },
                  menu: {
                    name: 'File Upload'
                  }
              })
              .state('app.form.imagecrop', {
                  url: '/imagecrop',
                  templateUrl: 'tpl/components/form/form_imagecrop.html',
                  resolve: load(['ngImgCrop','tpl/components/form/form_imagecrop.js']),
                  ncyBreadcrumb: {
                    label: 'Image Crop'
                  },
                  menu: {
                    name: 'Image Crop'
                  }
              })
              .state('app.form.select', {
                  url: '/select',
                  templateUrl: 'tpl/components/form/form_select.html',
                  controller: 'SelectCtrl',
                  resolve: load(['ui.select','tpl/components/form/form_select.js']),
                  ncyBreadcrumb: {
                    label: 'Select'
                  },
                  menu: {
                    name: 'Select'
                  }
              })
              .state('app.form.slider', {
                  url: '/slider',
                  templateUrl: 'tpl/components/form/form_slider.html',
                  controller: 'SliderCtrl',
                  resolve: load(['vr.directives.slider','tpl/components/form/form_slider.js']),
                  ncyBreadcrumb: {
                    label: 'Slider'
                  },
                  menu: {
                    name: 'Slider'
                  }
              })
              .state('app.form.editor', {
                  url: '/editor',
                  templateUrl: 'tpl/components/form/form_editor.html',
                  controller: 'EditorCtrl',
                  resolve: load(['ckeditor', 'ueditor', 'tpl/components/form/form_editor.js']),
                  ncyBreadcrumb: {
                    label: 'Editor'
                  },
                  menu: {
                    name: 'Editor'
                  }
              })
              .state('app.form.xeditable', {
                  url: '/xeditable',
                  templateUrl: 'tpl/components/form/form_xeditable.html',
                  controller: 'XeditableCtrl',
                  resolve: load(['xeditable','tpl/components/form/form_xeditable.js']),
                  ncyBreadcrumb: {
                    label: 'Xeditable'
                  },
                  menu: {
                    name: 'Xeditable'
                  }
              })
              .state('app.form.dynamicForm', {
                  url: '/dynamicForm',
                  templateUrl: 'tpl/components/form/form_dynamic.html',
                  controller: 'DynamicFormCtrl',
                  resolve: load(['dynamic-form','tpl/components/form/form_dynamic.js']),
                  ncyBreadcrumb: {
                    label: 'Dynamic Form'
                  },
                  menu: {
                    name: 'Dynamic Form'
                  }
              })              
              // pages
              .state('app.page', {
                  url: '/page',
                  template: '<div ui-view class="fade-in-down"></div>',
                  ncyBreadcrumb: {
                    label: 'Page'
                  },
                  redirectTo: 'app.page.profile',
                  menu: {
                    name: 'Page',
                    icon: 'glyphicon-file',
                    tag: 'Components'
                  }
              })
              .state('app.page.profile', {
                  url: '/profile',
                  templateUrl: 'tpl/components/page/page_profile.html',
                  ncyBreadcrumb: {
                    label: 'Profile'
                  }
              })
              .state('app.page.post', {
                  url: '/post',
                  templateUrl: 'tpl/components/page/page_post.html',
                  ncyBreadcrumb: {
                    label: 'Post'
                  },
                  menu: {
                    name: 'Post'
                  }
              })
              .state('app.page.search', {
                  url: '/search',
                  templateUrl: 'tpl/components/page/page_search.html',
                  controller: 'SearchDemoCtrl',
                  resolve: load("tpl/components/page/page_search.js"),
                  ncyBreadcrumb: {
                    label: 'Search'
                  },
                  menu: {
                    name: 'Search'
                  },
                  redirectTo: 'app.page.search.all'
              })
              .state('app.page.search.all', {
                  url: '/all',
                  templateUrl: 'tpl/components/page/page_search_all.html',
                  ncyBreadcrumb: {
                    label: 'All'
                  }
              })
              .state('app.page.search.users', {
                  url: '/users',
                  templateUrl: 'tpl/components/page/page_search_users.html',
                  ncyBreadcrumb: {
                    label: 'Users'
                  }
              })
              .state('app.page.search.comments', {
                  url: '/comments',
                  templateUrl: 'tpl/components/page/page_search_comments.html',
                  ncyBreadcrumb: {
                    label: 'Comments'
                  }
              })
              .state('app.page.invoice', {
                  url: '/invoice',
                  templateUrl: 'tpl/components/page/page_invoice.html',
                  ncyBreadcrumb: {
                    label: 'Invoice'
                  },
                  menu: {
                    name: 'Invoice'
                  }
              })
              .state('app.page.price', {
                  url: '/price',
                  templateUrl: 'tpl/components/page/page_price.html',
                  ncyBreadcrumb: {
                    label: 'Price'
                  },
                  menu: {
                    name: 'Price'
                  }
              })
              .state('apps.iframe', {
                  url: '/iframe',
                  templateUrl: 'tpl/components/page/page_iframe.html',
                  ncyBreadcrumb: {
                    label: 'Iframe'
                  },
                  menu: {
                    name: 'Iframe'
                  },
                  resolve: load('iframe-resizer')
              })              
              .state('app.docs', {
                  url: '/docs',
                  templateUrl: 'tpl/docs.html',
                  ncyBreadcrumb: {
                    label: 'Docs'
                  }
              })
              // others
              .state('lockme', {
                  url: '/lockme',
                  templateUrl: 'tpl/components/page/page_lockme.html',
                  ncyBreadcrumb: {
                    label: 'Lockme'
                  }
              })
              .state('access', {
                  url: '/access',
                  template: '<div ui-view class="fade-in-right-big smooth"></div>',
                  ncyBreadcrumb: {
                    label: 'Access'
                  },
                  redirectTo: 'app.signin'
              })
              .state('access.signin', {
                  url: '/signin',
                  templateUrl: 'tpl/components/page/page_signin.html',
                  resolve: load( ['tpl/components/page/page_signin.js'] ),
                  ncyBreadcrumb: {
                    label: 'Sign In'
                  }
              })
              .state('access.signup', {
                  url: '/signup',
                  templateUrl: 'tpl/components/page/page_signup.html',
                  resolve: load( ['tpl/components/page/page_signup.js'] ),
                  ncyBreadcrumb: {
                    label: 'Sign Up'
                  }
              })
              .state('access.forgotpwd', {
                  url: '/forgotpwd',
                  templateUrl: 'tpl/components/page/page_forgotpwd.html',
                  ncyBreadcrumb: {
                    label: 'Forgot Password'
                  }
              })
              .state('access.404', {
                  url: '/404',
                  templateUrl: 'tpl/components/page/page_404.html',
                  ncyBreadcrumb: {
                    label: '404'
                  }
              })

              // fullCalendar
              .state('app.calendar', {
                  url: '/calendar',
                  templateUrl: 'tpl/apps/calendar/calendar.html',
                  // use resolve to load other dependences
                  resolve: load(['moment','fullcalendar','ui.calendar','tpl/apps/calendar/calendar.js']),
                  ncyBreadcrumb: {
                    label: 'Calendar'
                  },
                  menu: {
                    name: 'Calendar',
                    icon: 'glyphicon-calendar text-info-dker',
                    tag: 'Navigation'
                  }
              })

              // mail
              .state('app.mail', {
                  //abstract: true,
                  url: '/mail',
                  templateUrl: 'tpl/apps/mail/mail.html',
                  // use resolve to load other dependences
                  resolve: load( ['tpl/apps/mail/mail.js','tpl/apps/mail/mail-service.js','moment'] ),
                  ncyBreadcrumb: {
                    label: 'Mail'
                  },
                  redirectTo: 'app.mail.list'
              })
              .state('app.mail.list', {
                  url: '/inbox/{fold}',
                  templateUrl: 'tpl/apps/mail/mail.list.html',
                  controller: 'MailListCtrl',
                  ncyBreadcrumb: {
                    label: '{{fold}}'
                  }
              })
              .state('app.mail.detail', {
                  url: '/{mailId:[0-9]{1,4}}',
                  templateUrl: 'tpl/apps/mail/mail.detail.html',
                  controller: 'MailDetailCtrl',
                  ncyBreadcrumb: {
                    label: '{{mailId}}'
                  }
              })
              .state('app.mail.compose', {
                  url: '/compose',
                  templateUrl: 'tpl/apps/mail/mail.new.html',
                  ncyBreadcrumb: {
                    label: 'Compose'
                  }
              })

              .state('layout', {
                  //abstract: true,
                  url: '/layout',
                  templateUrl: 'tpl/components/layout/layout.html',
                  ncyBreadcrumb: {
                    label: 'Layout'
                  },
                  redirectTo: 'layout.fullwidth'
              })
              .state('layout.fullwidth', {
                  url: '/fullwidth',
                  views: {
                      '': {
                          templateUrl: 'tpl/components/layout/fullwidth.html'
                      },
                      'footer': {
                          templateUrl: 'tpl/components/layout/footer_fullwidth.html'
                      }
                  },
                  resolve: load( ['tpl/components/ui/ui_jvectormap.js'] ),
                  ncyBreadcrumb: {
                    label: 'FullWidth'
                  }
              })
              .state('layout.mobile', {
                  url: '/mobile',
                  views: {
                      '': {
                          templateUrl: 'tpl/components/layout/mobile.html'
                      },
                      'footer': {
                          templateUrl: 'tpl/components/layout/footer_mobile.html'
                      }
                  },
                  ncyBreadcrumb: {
                    label: 'Mobile'
                  }
              })
              .state('layout.app', {
                  url: '/app',
                  views: {
                      '': {
                          templateUrl: 'tpl/components/layout/app.html'
                      },
                      'footer': {
                          templateUrl: 'tpl/components/layout/footer_fullwidth.html'
                      }
                  },
                  resolve: load( ['tpl/components/layout/layout.js'] ),
                  ncyBreadcrumb: {
                    label: 'App'
                  }
              })
              .state('apps', {
                  //abstract: true,
                  url: '/apps',
                  templateUrl: 'tpl/components/layout/layout.html',
                  ncyBreadcrumb: {
                    label: 'Apps'
                  },
                  redirectTo: 'app.note'
              })
              .state('apps.note', {
                  url: '/note',
                  templateUrl: 'tpl/apps/note/note.html',
                  resolve: load( ['tpl/apps/note/note.js','moment'] ),
                  ncyBreadcrumb: {
                    label: 'Note'
                  }
              })
              .state('apps.contact', {
                  url: '/contact',
                  templateUrl: 'tpl/apps/contact/contact.html',
                  resolve: load( ['tpl/apps/contact/contact.js'] ),
                  ncyBreadcrumb: {
                    label: 'Contact'
                  }
              })
              .state('app.weather', {
                  url: '/weather',
                  templateUrl: 'tpl/apps/weather/weather.html',
                  resolve: load(['tpl/apps/weather/skycons.js','angular-skycons','tpl/apps/weather/weather.js','moment']),
                  ncyBreadcrumb: {
                    label: 'Weather'
                  }
              })
              .state('app.todo', {
                  url: '/todo',
                  templateUrl: 'tpl/apps/todo/todo.html',
                  resolve: load(['tpl/apps/todo/todo.js', 'moment']),
                  controller: 'TodoCtrl',
                  ncyBreadcrumb: {
                    label: 'Todo'
                  }
              })
              .state('app.todo.list', {
                  url: '/{fold}',
                  ncyBreadcrumb: {
                    label: '{{fold}}'
                  }
              })
              .state('app.note', {
                  url: '/note',
                  templateUrl: 'tpl/apps/note/note_material.html',
                  resolve: load(['tpl/apps/note/note.js', 'moment']),
                  ncyBreadcrumb: {
                    label: 'Note'
                  }
              })
              .state('music', {
                  url: '/music',
                  templateUrl: 'tpl/apps/music/music.html',
                  controller: 'MusicCtrl',
                  resolve: load([
                            'com.2fdevs.videogular', 
                            'com.2fdevs.videogular.themes.default',
                            'com.2fdevs.videogular.plugins.controls', 
                            'com.2fdevs.videogular.plugins.overlayplay',
                            'com.2fdevs.videogular.plugins.poster',
                            'com.2fdevs.videogular.plugins.buffering',
                            'tpl/apps/music/music.js', 
                            'tpl/apps/music/theme.css'
                          ]),
                  ncyBreadcrumb: {
                    label: 'Music'
                  },
                  redirectTo: 'music.home'
              })
              .state('music.home', {
                  url: '/home',
                  templateUrl: 'tpl/apps/music/music.home.html',
                  ncyBreadcrumb: {
                    label: 'Home'
                  }
              })
              .state('music.genres', {
                  url: '/genres',
                  templateUrl: 'tpl/apps/music/music.genres.html',
                  ncyBreadcrumb: {
                    label: 'Genres'
                  }
              })
              .state('music.detail', {
                  url: '/detail',
                  templateUrl: 'tpl/apps/music/music.detail.html',
                  ncyBreadcrumb: {
                    label: 'Detail'
                  }
              })
              .state('music.mtv', {
                  url: '/mtv',
                  templateUrl: 'tpl/apps/music/music.mtv.html',
                  ncyBreadcrumb: {
                    label: 'MTV'
                  }
              })
              .state('music.mtvdetail', {
                  url: '/mtvdetail',
                  templateUrl: 'tpl/apps/music/music.mtv.detail.html',
                  ncyBreadcrumb: {
                    label: 'MTVDetail'
                  }
              })
              .state('music.playlist', {
                  url: '/playlist/{fold}',
                  templateUrl: 'tpl/music.playlist.html',
                  ncyBreadcrumb: {
                    label: 'Playlist'
                  }
              })
              .state('app.material', {
                  url: '/material',
                  template: '<div ui-view class="wrapper-md"></div>',
                  resolve: load(['tpl/components/material/material.js']),
                  ncyBreadcrumb: {
                    label: 'Material'
                  },
                  redirectTo: 'app.material.buttons'
              })
              .state('app.material.button', {
                  url: '/button',
                  templateUrl: 'tpl/components/material/button.html',
                  ncyBreadcrumb: {
                    label: 'Buttons'
                  }
              })
              .state('app.material.color', {
                  url: '/color',
                  templateUrl: 'tpl/components/material/color.html',
                  ncyBreadcrumb: {
                    label: 'Color'
                  }
              })
              .state('app.material.icon', {
                  url: '/icon',
                  templateUrl: 'tpl/components/material/icon.html',
                  ncyBreadcrumb: {
                    label: 'Icon'
                  }
              })
              .state('app.material.card', {
                  url: '/card',
                  templateUrl: 'tpl/components/material/card.html',
                  ncyBreadcrumb: {
                    label: 'Card'
                  }
              })
              .state('app.material.form', {
                  url: '/form',
                  templateUrl: 'tpl/components/material/form.html',
                  ncyBreadcrumb: {
                    label: 'Form'
                  }
              })
              .state('app.material.list', {
                  url: '/list',
                  templateUrl: 'tpl/components/material/list.html',
                  ncyBreadcrumb: {
                    label: 'List'
                  }
              })
              .state('app.material.ngmaterial', {
                  url: '/ngmaterial',
                  templateUrl: 'tpl/components/material/ngmaterial.html',
                  ncyBreadcrumb: {
                    label: 'NG Material'
                  }
              });

          function load(srcs, callback) {
            return {
                deps: ['$ocLazyLoad', '$q',
                  function( $ocLazyLoad, $q ){
                    var deferred = $q.defer();
                    var promise  = false;
                    srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
                    if(!promise){
                      promise = deferred.promise;
                    }
                    angular.forEach(srcs, function(src) {
                      promise = promise.then( function(){
                        if(JQ_CONFIG[src]){
                          return $ocLazyLoad.load(JQ_CONFIG[src]);
                        }
                        angular.forEach(MODULE_CONFIG, function(module) {
                          if( module.name == src){
                            name = module.name;
                          }else{
                            name = src;
                          }
                        });
                        return $ocLazyLoad.load(name);
                      } );
                    });
                    deferred.resolve();
                    return callback ? promise.then(function(){ return callback(); }) : promise;
                }]
            }
          }


      }
    ]
  );