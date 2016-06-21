
angular.module('app')
  .run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;
  }])


.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {
   
    $urlRouterProvider
        .otherwise('/login');
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'modules/login/login.html',
            controller:'loginCtrl'
        })
        .state('app', {
            abstract:true,
            url: '/app',
            templateUrl: 'modules/blocks/layout.html',
            controller:"mainCtrl"
        })
        .state('app.overview', {
            abstract:true,
            url: '/overview',
            template: '<div ui-view></div>'
        })
        .state('app.overview.index', {
            url: '/index',
            templateUrl: 'modules/overview/index.html',
            controller:"overviewCtrl"
        })
        .state('app.overview.introduction', {
            url: '/introduction',
            templateUrl: 'modules/overview/show.html',
            controller:"overviewShowCtrl"
        })
        .state('app.overview_big', {
            abstract:true,
            url: '/overview_big',
            template: '<div ui-view></div>'
        })
        .state('app.overview_big.first', {
            url: '/first',
            templateUrl: 'modules/overview/index_big_first.html',
            controller:"overviewBigFirstCtrl"
        })
        .state('app.overview_big.second', {
            url: '/second',
            templateUrl: 'modules/overview/index_big_second.html',
            controller:"overviewBigSecondCtrl"
        })
        .state('app.overview_big.introduction', {
            url: '/introduction',
            templateUrl: 'modules/overview/show.html',
            controller:"overviewShowCtrl"
        })
        .state('app.resourcemonitor', {
            abstract:true,
            url: '/resourcemonitor',
            template:"<div ui-view></div>"
        })
        .state('app.resourcemonitor.business', {
            abstract:true,
            url: '/business',
            templateUrl: 'modules/assetsmanage/block.html',
            controller:"monitorTreeCtrl",
            resolve: {
                deps: ['$ocLazyLoad',
                  function( $ocLazyLoad ){
                    return $ocLazyLoad.load('angularBootstrapNavTree');
                  }
                ]
            }
        })
        .state('app.resourcemonitor.business.statics', {
            url: '/statics',
            templateUrl: 'modules/resourcemonitor/statics_domian.html',
            controller:"monitorDomainCtrl"
        })
        .state('app.resourcemonitor.business.domains', {
            abstract:true,
            url: '/domains/:domainId',
            template: "<div ui-view></div>"
        })
        .state('app.resourcemonitor.business.domains.statics', {
            url: '/statics',
            templateUrl: 'modules/resourcemonitor/statics_domian.html',
            controller:"monitorDomainCtrl"
        })
        .state('app.resourcemonitor.business.domains.systems', {
            abstract:true,
            url: '/systems/:systemId',
            template: "<div ui-view></div>"
        })
        .state('app.resourcemonitor.business.domains.systems.page', {
            url: '/page',
            templateUrl: "modules/resourcemonitor/block_system.html",
            controller:"monitorSystemPageCtrl"
        })  
        .state('app.resourcemonitor.business.domains.systems.page.statics', {
            url: '/statics',
            templateUrl: 'modules/resourcemonitor/statics_system.html',
            controller:"monitorSystemTrendCtrl"
        })
        .state('app.resourcemonitor.business.domains.systems.page.topo', {
            url: '/topo',
            templateUrl: 'modules/resourcemonitor/topo_system.html',
            resolve: {
                deps: ['$ocLazyLoad',
                  function( $ocLazyLoad ){
                    return $ocLazyLoad.load('jtopo');
                  }
                ]
            },
            controller:"monitorSystemTopoCtrl"
        })
        .state('app.resourcemonitor.business.domains.systems.vms', {
            abstract:true,
            url: '/vms/:vmId/:dcId',
            templateUrl: "modules/resourcemonitor/block_vm.html",
            controller:"monitorVmPageCtrl"
        })
        .state('app.resourcemonitor.business.domains.systems.vms.statics', {
            url: '/statics',
            templateUrl: 'modules/resourcemonitor/statics_vm.html',
            controller:"monitorVmTrendCtrl"
        })
        .state('app.resourcemonitor.business.domains.systems.vms.monitor', {
            url: '/monitor',
            templateUrl: 'modules/resourcemonitor/monitor_vm.html',
            controller:"monitorVmMonitorCtrl"
        })
        .state('app.resourcemonitor.monitor',{
            url:'/monitor/:dcId',
            template:'<div ui-view></div>',
            controller:"monitorIndexCtrl"
        })
        .state('app.resourcemonitor.monitor.show', {
            url: '/show',
            templateUrl: 'modules/resourcemonitor/monitor.html',
            resolve: {
                deps: ['$ocLazyLoad',
                  function( $ocLazyLoad ){
                    return $ocLazyLoad.load('ctopo');
                  }
                ]
            },
            controller:"monitorShowCtrl"
        })
        .state('app.monitor_big',{
            url:'/monitor_big/:dcId',
            template:'<div ui-view></div>',
            controller:"monitorBigIndexCtrl"
        })
        .state('app.monitor_big.show', {
            url: '/show',
            templateUrl: 'modules/resourcemonitor/monitor_big.html',
            resolve: {
                deps: ['$ocLazyLoad',
                  function( $ocLazyLoad ){
                    return $ocLazyLoad.load('ctopo');
                  }
                ]
            },
            controller:"monitorBigShowCtrl"
        })

        .state('app.visualmap', {
            url: '/visualmap',
            templateUrl: 'modules/visualization/map.html',
            controller:"visualmapCtrl"
        })
        .state('app.floors', {
            url: '/floors/:roomId',
            templateUrl: 'modules/visualization/index.html',
            controller:"visualizationIndexCtrl"
        })
        .state('app.floors.show', {
            url: '/show/:floorId',
            templateUrl: 'modules/visualization/view.html',
            controller:"visualizationCtrl"
        })
        .state('app.floors_big', {
            url: '/floors_big/:roomId',
            template: '<div ui-view></div>'
        })
        .state('app.floors_big.show', {
            url: '/show/:floorId',
            templateUrl: 'modules/visualization/view_bigview.html',
            controller:"visualizationBigCtrl"
        })
        .state('app.assetsmanage', {
            abstract:true,
            url: '/assetsmanage',
            templateUrl: 'modules/assetsmanage/block.html',
            controller:"assetsmanageCtrl",
            resolve: {
                deps: ['$ocLazyLoad',
                  function( $ocLazyLoad ){
                    return $ocLazyLoad.load('angularBootstrapNavTree');
                  }
                ]
            }
        })
        .state('app.assetsmanage.base', {
            abstract:true,
            url: '/base',
            template: '<div ui-view></div>'
        })
        .state('app.assetsmanage.base.list', {
            url: '/list',
            templateUrl: 'modules/assetsmanage/list_rooms.html',
            controller:"assetsRoomsCtrl"
        })
        .state('app.assetsmanage.base.devices', {
            url: '/devices',
            templateUrl: 'modules/assetsmanage/list_devices.html',
            controller:"assetsDevicesCtrl"
        })
        .state('app.assetsmanage.rooms', {
            abstract:true,
            url: '/rooms/:roomId',
            template: '<div ui-view></div>'
        })
        .state('app.assetsmanage.rooms.list', {
            url: '/list',
            templateUrl: 'modules/assetsmanage/list_floors.html',
            controller:"assetsFloorsCtrl"
        })
        .state('app.assetsmanage.rooms.devices', {
            url: '/devices',
            templateUrl: 'modules/assetsmanage/list_devices.html',
            controller:"assetsDevicesCtrl"
        })
        .state('app.assetsmanage.rooms.floors', {
            abstract:true,
            url: '/floors/:floorId',
            template: '<div ui-view></div>'
        })
        .state('app.assetsmanage.rooms.floors.list', {
            url: '/list',
            templateUrl: 'modules/assetsmanage/list_racks.html',
            controller:"assetsRacksCtrl"
        })
        .state('app.assetsmanage.rooms.floors.devices', {
            url: '/devices',
            templateUrl: 'modules/assetsmanage/list_devices.html',
            controller:"assetsDevicesCtrl"
        })
        .state('app.assetsmanage.rooms.floors.racks', {
            abstract:true,
            url: '/racks/:rackId',
            template: '<div ui-view></div>'
        })
        .state('app.assetsmanage.rooms.floors.racks.list', {
            url: '/list',
            templateUrl: 'modules/assetsmanage/list_devices.html',
            controller:"assetsDevicesCtrl"
        })
        .state('app.bigview', {
            url: '/bigview',
            templateUrl: 'modules/bigview/bigview.html',
            controller:'bigviewCtrl'
        })
        .state('app.setting', {
            abstract:true,
            url: '/setting',
            templateUrl: 'modules/setting/block.html'
        })
        .state('app.setting.overview', {
            url: '/overview',
            templateUrl: 'modules/setting/setting_overview.html',
            controller:'settingOverviewCtrl'
        })
        .state('app.setting.bigview', {
            url: '/bigview',
            templateUrl: 'modules/setting/setting_bigview.html',
            controller:'settingBigviewCtrl',
            resolve: {
                deps: ['$ocLazyLoad',
                  function( $ocLazyLoad ){
                    return $ocLazyLoad.load('ztree').then(
                        function(){
                            return $ocLazyLoad.load('bower_components/zTree-master/js/jquery.ztree.excheck.js');
                        }
                    );
                  }
                ]
            }
        })
        .state('app.setting.summary', {
            abstract:true,
            url: '/summary',
            template: '<ul class="nav nav-tabs center"><li role="presentation" class="active"><a>整体概况简介配置</a></li></ul><div class="tab-content" ui-view></div>'
        })
        .state('app.setting.summary.list', {
            url: '/list',
            templateUrl: 'modules/setting/setting_summary.html',
            controller:'settingSummaryCtrl'
        })
        .state('app.setting.summary.detail', {
            url: '/:summaryId/detail?settingName',
            templateUrl: 'modules/setting/setting_summaryDetail.html',
            controller:'settingSummaryDetailCtrl'
        })
              
}]);
