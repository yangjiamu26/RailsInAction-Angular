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
          $urlRouterProvider
              .otherwise('app/home');
              
          $stateProvider
          .state('app', {
              abstract: true,
              url: '/app',
              templateUrl: 'tpl/blocks/app.html',
              ncyBreadcrumb: {
                label: '首页'
              }
          })
          .state('app.home', {
              url: '/home',
              templateUrl: 'tpl/home/home.html',
              ncyBreadcrumb: {
                  label: '公告板'
              },
              resolve: load('tpl/home/home.js')
          })
          .state('app.custom', {
              url: '/custom',
              templateUrl: 'tpl/home/custom.html',
              ncyBreadcrumb: {
                  label: '首页配置'
              }
          })   
          
          /********

            服务

          ********/

        .state('app.service', {
          abstract: true,
          url: '/service',
          template: '<div id="app_service" ui-view></div>',
          ncyBreadcrumb: {
            label: '服务'
          }
        })
        .state('app.service.productlist', {
          url: '/productlist',
          templateUrl: 'tpl/service/productlist.html',
          ncyBreadcrumb: {
            label: '产品'
          },
          resolve: load("tpl/service/productlist.js")
        })
        .state('app.service.product', {
          url: '/product',
          templateUrl: 'tpl/service/product.html',
          controller: 'serviceProductCtrl',
          ncyBreadcrumb: {
            label: '???'
          },
          resolve: load(['xeditable', 'angularBootstrapNavTree'])
        })
        .state('app.service.productlist-add-steps', {
          url: '/productlist-add-steps',
          templateUrl: 'tpl/service/productlist-add-steps.html',
          controller: 'proAddStepsCtrl',
          ncyBreadcrumb: {
            label: '???'
          },
          resolve: load(['ztree', 'daterangepicker'])
        })
        .state('app.service.requisition', {
          url: '/requisition',
          templateUrl: 'tpl/service/requisition.html',
          ncyBreadcrumb: {
            label: '我的申请单'
          }
        })
        .state('app.service.requisitionlist', {
          url: '/requisitionlist',
          templateUrl: 'tpl/service/requisitionlist.html',
          ncyBreadcrumb: {
            label: '申请服务'
          },
          resolve: load("tpl/service/requisitionlist.js")
        })
        .state('app.service.requisition-detailed', {
          url: '/requisition-detailed',
          templateUrl: 'tpl/service/requisition-detailed.html',
          ncyBreadcrumb: {
            label: '申请详情'
          }
        })
        .state('app.service.requis-steps', {
          url: '/requis-steps',
          templateUrl: 'tpl/service/requis-steps.html',
          //controller:'appServiceRequisStepsCtrl',
          resolve: load('ngJquerySteps')
        })
        .state('app.service.requis-custom-steps', {
          url: '/requis-custom-steps',
          templateUrl: 'tpl/service/requis-custom-steps.html',
          //controller:'appServiceRequisStepsCtrl',
          resolve: load('ngJquerySteps')
        })
        .state('app.service.constructionlist', {
          url: '/constructionlist',
          templateUrl: 'tpl/service/constructionlist.html',
          controller: 'serviceCstlCtrl',
          ncyBreadcrumb: {
            label: '施工'
          },
          resolve: load(['moment', 'daterangepicker', 'tpl/service/constructionlist.js'])
        })
        .state('app.service.construction', {
          url: '/construction',
          templateUrl: 'tpl/service/construction.html'
        })
        .state('app.service.pricesetup', {
          url: '/pricesetup',
          templateUrl: 'tpl/service/pricesetup.html',
          ncyBreadcrumb: {
            label: '计费配置'
          }
        })
        .state('app.service.billlist', {
          url: '/billlist',
          templateUrl: 'tpl/service/billlist.html',
          controller: 'serviceBillCtrl',
          ncyBreadcrumb: {
            label: '账单'
          }
        })
        .state('app.service.softwarelist', {
          url: '/softwarelist',
          templateUrl: 'tpl/service/softwarelist.html',
          ncyBreadcrumb: {
            label: '软件库'
          }
        })
        .state('app.service.softwaretype', {
          url: '/softwaretype',
          templateUrl: 'tpl/service/softwaretype.html',
          ncyBreadcrumb: {
            label: '软件类型配置'
          }
        })
        .state('app.service.scriptlist', {
          url: '/scriptlist',
          templateUrl: 'tpl/service/scriptlist.html',
          ncyBreadcrumb: {
            label: '脚本库'
          }
        })
        .state('app.service.installlist', {
          url: '/installlist',
          templateUrl: 'tpl/service/installlist.html',
          ncyBreadcrumb: {
            label: '软件安装'
          }
        })
        .state('app.service.loglist', {
          url: '/loglist',
          templateUrl: 'tpl/service/loglist.html',
          controller: 'serviceLogCtrl',
          ncyBreadcrumb: {
            label: '安装日志'
          }
        })

        /********

          业务

        ********/

        .state('app.business', {
          url: '/business',
          template: '<div class="app-content-body" ui-view></div>',
          ncyBreadcrumb: {
            label: '业务'
          }
        })
        .state('app.business.domain', {
          url: '/domain',
          templateUrl: 'tpl/business/domain.html',
          controller: 'businessZtreeController',
          ncyBreadcrumb: {
            label: '业务域'
          },
          resolve: load('ztree')
        })

      .state('app.business.system', {
          url: '/system',
          templateUrl: 'tpl/business/system.html',
          controller: 'businessZtreeController',
          ncyBreadcrumb: {
            label: '业务系统'
          },
          resolve: load('ztree')
        })
        .state('app.business.sysdetails', {
          url: '/sysdetails',
          templateUrl: 'tpl/business/sysdetails.html',
          controller: 'businessZtreeController',
          resolve: load('ztree')
        })


        /********

          资源

        ********/  

        .state('app.resource', {
          url: '/resource',
          template: '<div class="app-content-body" ui-view></div>'
        })
        .state('app.resource.host', {
          url: '/host',
          templateUrl: 'tpl/resource/host.html'
        })
        .state('app.resource.storage', {
          url: '/storage',
          templateUrl: 'tpl/resource/storage.html'
        })
        .state('app.resource.operationhost', {
          url: '/operationhost',
          templateUrl: 'tpl/resource/operationhost.html'
        })
        .state('app.resource.operationstorage', {
          url: '/operationstorage',
          templateUrl: 'tpl/resource/operationstorage.html'
        })
        .state('app.resource.template', {
          url: '/template',
          templateUrl: 'tpl/resource/template.html'
        })

      .state('app.resource.resourcesrecovery', {
          url: '/resourcesrecovery',
          templateUrl: 'tpl/resource/resourcesrecovery.html'
        })
        .state('app.resource.ippool', {
          url: '/ippool',
          templateUrl: 'tpl/resource/ippool.html'
        })
        .state('app.resource.cabinettype', {
          url: '/cabinettype',
          templateUrl: 'tpl/resource/cabinettype.html'
        })
        .state('app.resource.property', {
          url: '/property',
          templateUrl: 'tpl/resource/property.html',
          controller: 'AbnTestController',
          resolve: load('ztree')
        })
        .state('app.resource.computerroom', {
          url: '/computerroom',
          templateUrl: 'tpl/resource/computerroom.html',
          controller: 'AbnTestController',
          resolve: load('ztree')
        })
        .state('app.resource.hostlevel', {
          url: '/hostlevel',
          templateUrl: 'tpl/resource/hostlevel.html',
          controller: 'AbnTestController',
          resolve: load('ztree')
        })
        .state('app.resource.cabinet', {
          url: '/cabinet',
          templateUrl: 'tpl/resource/cabinet.html',
          controller: 'AbnTestController',
          resolve: load('ztree')
        })
        .state('app.resource.cloudview', {
          url: '/cloudview',
          templateUrl: 'tpl/resource/cloudview.html'
        })
        .state('app.resource.synthesizeview', {
          url: '/synthesizeview',
          templateUrl: 'tpl/resource/synthesizeview.html'
        })
        .state('app.resource.mould', {
          url: '/mould',
          templateUrl: 'tpl/resource/mould.html'
        })
        .state('app.resource.software', {
          url: '/software',
          template: '<div class="app-content-body" ui-view></div>'
        })
        .state('app.resource.software.install', {
          url: '/install',
          templateUrl: 'tpl/resource/install.html'
        })
        .state('app.resource.software.installlog', {
          url: '/installlog',
          templateUrl: 'tpl/resource/install-log.html'
        })              


        /********

          订单

        ********/  

        .state('app.order', {
          url: '/order',
          template: '<div class="app-content-body" ui-view></div>'
        })
        .state('app.order.backlogorder', {
          url: '/backlogorder',
          templateUrl: 'tpl/order/backlogorder.html'
        })
        .state('app.order.myorder', {
          url: '/myorder',
          templateUrl: 'tpl/order/myorder.html'
        })

        /********

          报表

        ********/  

        .state('app.report', {
          url: '/report',
          template: '<div class="app-content-body" ui-view></div>'
        })
        .state('app.report.businessreport', {
          url: '/businessreport',
          templateUrl: 'tpl/report/businessreport.html'
        })
        .state('app.report.vmreport', {
          url: '/vmreport',
          templateUrl: 'tpl/report/vmreport.html'
        })


        /********

          监控

        ********/       

        .state('app.monitor', {
            url: '/monitor',
            template: '<div class="app-content-body" ui-view></div>'
        })
        .state('app.monitor.warning', {
            url: '/warning',
            templateUrl: 'tpl/monitor/warning.html'
        })
        .state('app.monitor.notic', {
            url: '/notic',
            templateUrl: 'tpl/monitor/notic.html'
        })
        .state('app.monitor.log', {
            url: '/log',
            templateUrl: 'tpl/monitor/log.html'
        })


        /********

          设置

        ********/  

        .state('app.setting', {
          url: '/setting',
          template: '<div class="app-content-body" ui-view></div>'
        })
        .state('app.setting.organization', {
          url: '/organization',
          templateUrl: 'tpl/setting/organization.html',
          resolve: load('ztree')
        })
        .state('app.setting.user', {
          url: '/user',
          templateUrl: 'tpl/setting/user.html',
          resolve: load('ztree')
        })
        .state('app.setting.role', {
          url: '/role',
          templateUrl: 'tpl/setting/role.html'
        })
        .state('app.setting.config', {
          url: '/config',
          templateUrl: 'tpl/setting/config.html'
        })
        .state('app.setting.dictionary', {
          url: '/dictionary',
          templateUrl: 'tpl/setting/dictionary.html'
        })




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
