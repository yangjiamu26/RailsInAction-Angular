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
              url: '/app',
              templateUrl: 'tpl/blocks/app.html',
              ncyBreadcrumb: {
                label: '首页'
              },
              resolve: load('moment'),
              redirectTo: 'app.home'
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
          url: '/service',
          template: '<div id="app_service" class="app-content-full with-ncy-breadcrumb" ui-view></div>',
          ncyBreadcrumb: {
            label: '服务'
          },
          redirectTo: 'app.service.product'
        })
        .state('app.service.product', {
          url: '/product',
          templateUrl: 'tpl/product/index.html',
          ncyBreadcrumb: {
            label: '产品定义'
          },
          resolve: load(['xeditable',"tpl/product/index.js"])
        })
        .state('app.service.index', {
          url: '/index',
          templateUrl: 'tpl/service/index.html',
          ncyBreadcrumb: {
            label: '服务管理'
          },
          resolve: load(["tpl/service/index.js"])
        })        
        .state('app.service.sales', {
          url: '/sales',
          templateUrl: 'tpl/service/sales.html',
          ncyBreadcrumb: {
            label: '服务列表'
          },
          resolve: load("tpl/service/sales.js"),
          redirectTo: 'app.service.sales.list'
        })
        .state('app.service.sales.list', {
          url: '/list/{fold}',
          templateUrl: 'tpl/service/sales.list.html',
          ncyBreadcrumb: {
            label: '{{fold}}'
          },
          resolve: load("tpl/service/sales.list.js")
        })
        .state('app.service.cartnew', {
          url: '/cartnew',
          templateUrl: 'tpl/cart/new.html',
          ncyBreadcrumb: {
            label: '申请服务'
          },
          resolve: load(['xeditable', 'tpl/cart/new.js'])
        })
        .state('app.service.cart', {
          url: '/cart',
          templateUrl: 'tpl/cart/list.html',
          ncyBreadcrumb: {
            label: '申请清单'
          }
        })

        .state('app.service.constructionlist', {
          url: '/constructionlist',
          templateUrl: 'tpl/service/constructionlist.html',
          controller: 'serviceCstlCtrl',
          ncyBreadcrumb: {
            label: '施工'
          },
          resolve: load(['moment', 'daterangepicker', 'tpl/service/constructionlist.js']),
          redirectTo: 'app.service.constructionlist.virtual'
        })
        .state('app.service.constructionlist.virtual', {
          url: '/virtual',
          templateUrl: 'tpl/service/constructionlist.virtual.html',
          ncyBreadcrumb: {
            label: '虚资源施工'
          }
        })
        .state('app.service.constructionlist.software', {
          url: '/software',
          templateUrl: 'tpl/service/constructionlist.software.html',
          ncyBreadcrumb: {
            label: '软件施工'
          }
        })
        .state('app.service.construction', {
          url: '/construction',
          templateUrl: 'tpl/service/construction.html',
          ncyBreadcrumb: {
            label: '施工详情'
          }
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
          ncyBreadcrumb: {
            label: '安装日志'
          },
          resolve: load('tpl/service/loglist.js')
        })

        /********

          业务

        ********/

        .state('app.business', {
          url: '/business',
          template: '<div class="app-content-body" ui-view></div>',
          ncyBreadcrumb: {
            label: '业务'
          },
          redirectTo: 'app.business.domain'
        })
        .state('app.business.domain', {
          url: '/domain',
          templateUrl: 'tpl/business/domain.html',
          ncyBreadcrumb: {
            label: '业务域'
          },
          resolve: load(['ztree', 'tpl/business/domain.js'])
        })

      .state('app.business.system', {
          url: '/system',
          templateUrl: 'tpl/business/system.html',
          ncyBreadcrumb: {
            label: '业务系统'
          },
          resolve: load(['ztree', 'tpl/business/system.js'])
        })
        .state('app.business.sysdetails', {
          url: '/sysdetails',
          templateUrl: 'tpl/business/sysdetails.html',
          ncyBreadcrumb: {
            label: '业务系统详情'
          },
          resolve: load(['ztree', 'tpl/business/sysdetails.js'])
        })


        /********

          资源

        ********/  

        .state('app.resource', {
          url: '/resource',
          template: '<div class="app-content-body" ui-view></div>',
          ncyBreadcrumb: {
            label: '业务系统详情'
          },
          redirectTo: 'app.resource.resource.host'
        })
        .state('app.resource.resource', {
          url: '/resource',
          templateUrl: 'tpl/resource/resource.html',
          ncyBreadcrumb: {
            label: '资产'
          },
          resolve: load('tpl/resource/resource.js'),
          redirectTo: 'app.resource.resource.host'
        })
        .state('app.resource.resource.host', {
          url: '/host',
          templateUrl: 'tpl/resource/resource.host.html',
          ncyBreadcrumb: {
            label: '云主机'
          }
        })
        .state('app.resource.resource.storage', {
          url: '/storage',
          templateUrl: 'tpl/resource/resource.storage.html',
          ncyBreadcrumb: {
            label: '云硬盘'
          }
        })
        .state('app.resource.resource.template', {
          url: '/template',
          templateUrl: 'tpl/resource/resource.template.html',
          ncyBreadcrumb: {
            label: '模板'
          }
        })

      .state('app.resource.resource.recovery', {
          url: '/resourcesrecovery',
          templateUrl: 'tpl/resource/resource.recovery.html',
          ncyBreadcrumb: {
            label: '资源回收'
          }
        })
        .state('app.resource.resource.ippool', {
          url: '/ippool',
          templateUrl: 'tpl/resource/resource.ippool.html',
          ncyBreadcrumb: {
            label: 'IP池'
          }
        })
        .state('app.resource.cabinettype', {
          url: '/cabinettype',
          templateUrl: 'tpl/resource/cabinettype.html',
          ncyBreadcrumb: {
            label: '业务系统详情'
          }
        })
        .state('app.resource.cloudview', {
          url: '/cloudview',
          templateUrl: 'tpl/resource/cloudview.html',
          ncyBreadcrumb: {
            label: '业务系统详情'
          }
        })
        .state('app.resource.synthesizeview', {
          url: '/synthesizeview',
          templateUrl: 'tpl/resource/synthesizeview.html',
          ncyBreadcrumb: {
            label: '业务系统详情'
          }
        })
        .state('app.resource.mould', {
          url: '/mould',
          templateUrl: 'tpl/resource/mould.html',
          ncyBreadcrumb: {
            label: '业务系统详情'
          }
        })
        .state('app.resource.software', {
          url: '/software',
          template: '<div class="app-content-body" ui-view></div>',
          ncyBreadcrumb: {
            label: '业务系统详情'
          }
        })
        .state('app.resource.software.install', {
          url: '/install',
          templateUrl: 'tpl/resource/install.html',
          ncyBreadcrumb: {
            label: '业务系统详情'
          }
        })
        .state('app.resource.software.installlog', {
          url: '/installlog',
          templateUrl: 'tpl/resource/install-log.html',
          ncyBreadcrumb: {
            label: '业务系统详情'
          }
        })              


        /********

          订单

        ********/  

        .state('app.order', {
          url: '/order',
          template: '<div class="app-content-body" ui-view></div>',
          redirectTo: 'app.order.backlogorder',
          ncyBreadcrumb: {
            label: '订单'
          }
        })
        .state('app.order.backlogorder', {
          url: '/backlogorder',
          templateUrl: 'tpl/order/backlogorder.html',
          ncyBreadcrumb: {
            label: '待办订单'
          },
          resolve: load('tpl/order/backlogorder.js')
        })
        .state('app.order.myorder', {
          url: '/myorder',
          templateUrl: 'tpl/order/myorder.html',
          ncyBreadcrumb: {
            label: '我的订单'
          }
        })

        /********

          报表

        ********/  

        .state('app.report', {
          url: '/report',
          template: '<div class="app-content-body" ui-view></div>',
          ncyBreadcrumb: {
            label: '报表'
          },
          redirectTo: 'app.report.businessreport'
        })
        .state('app.report.businessreport', {
          url: '/businessreport',
          templateUrl: 'tpl/report/businessreport.html',
          ncyBreadcrumb: {
            label: '业务系统报表'
          }
        })
        .state('app.report.vmreport', {
          url: '/vmreport',
          templateUrl: 'tpl/report/vmreport.html',
          ncyBreadcrumb: {
            label: '虚拟机报表'
          }
        })


        /********

          监控

        ********/       

        .state('app.monitor', {
          url: '/monitor',
          template: '<div class="app-content-body" ui-view></div>',
          ncyBreadcrumb: {
            label: '监控'
          }
        })
        .state('app.monitor.warning', {
          url: '/warning',
          templateUrl: 'tpl/monitor/warning.html',
          ncyBreadcrumb: {
            label: '告警'
          }
        })
        .state('app.monitor.notice', {
          url: '/notice',
          templateUrl: 'tpl/monitor/notice.html',
          ncyBreadcrumb: {
            label: '通知'
          }
        })
        .state('app.monitor.log', {
          url: '/log',
          templateUrl: 'tpl/monitor/log.html',
          ncyBreadcrumb: {
            label: '操作日志'
          }
        })


        /********

          设置

        ********/  

        .state('app.setting', {
          url: '/setting',
          template: '<div class="app-content-body" ui-view></div>',
          ncyBreadcrumb: {
            label: '操作日志'
          }
        })
        .state('app.setting.organization', {
          url: '/organization',
          templateUrl: 'tpl/setting/organization.html',
          resolve: load(['ztree', 'tpl/setting/organization.js']),
          ncyBreadcrumb: {
            label: '组织结构'
          }
        })
        .state('app.setting.user', {
          url: '/user',
          templateUrl: 'tpl/setting/user.html',
          resolve: load(['ztree', 'tpl/setting/user.js']),
          ncyBreadcrumb: {
            label: '用户'
          }
        })
        .state('app.setting.role', {
          url: '/role',
          templateUrl: 'tpl/setting/role.html',
          ncyBreadcrumb: {
            label: '角色'
          }
        })
        .state('app.setting.config', {
          url: '/config',
          templateUrl: 'tpl/setting/config.html',
          ncyBreadcrumb: {
            label: '配置'
          }
        })
        .state('app.setting.dictionary', {
          url: '/dictionary',
          templateUrl: 'tpl/setting/dictionary.html',
          ncyBreadcrumb: {
            label: '字典'
          }
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
