angular.module('resource', ['ui.router']).config(
	[          '$stateProvider', '$urlRouterProvider', 
	function ($stateProvider,   $urlRouterProvider) {
			$stateProvider
			.state('app.resource', {
                url: '/resource',
                template: '<div class="app-content-body" ui-view></div>'
            })
            .state('app.resource.host', {
                url: '/host',
                templateUrl: 'modules/resource/host.html'
            })
            .state('app.resource.storage', {
                url: '/storage',
                templateUrl: 'modules/resource/storage.html'
            })
             .state('app.resource.operationhost', {
                url: '/operationhost',
                templateUrl: 'modules/resource/operationhost.html'
            })
            .state('app.resource.operationstorage', {
                url: '/operationstorage',
                templateUrl: 'modules/resource/operationstorage.html'
            })
            .state('app.resource.template', {
                url: '/template',
                templateUrl: 'modules/resource/template.html'
            })

            .state('app.resource.resourcesrecovery', {
                url: '/resourcesrecovery',
                templateUrl: 'modules/resource/resourcesrecovery.html'
            })
            .state('app.resource.ippool', {
                url: '/ippool',
                templateUrl: 'modules/resource/ippool.html'
            })
            .state('app.resource.cabinettype', {
                url: '/cabinettype',
                templateUrl: 'modules/resource/cabinettype.html'
            })
            .state('app.resource.property', {
                url: '/property',
                templateUrl: 'modules/resource/property.html',
                controller: 'AbnTestController',
                resolve: {
                  deps: ['$ocLazyLoad',
                    function( $ocLazyLoad ){
                      return $ocLazyLoad.load('ngZtree');
                    }
                  ]
              }
            })
            .state('app.resource.computerroom', {
                url: '/computerroom',
                templateUrl: 'modules/resource/computerroom.html',
                controller: 'AbnTestController',
                resolve: {
                  deps: ['$ocLazyLoad',
                    function( $ocLazyLoad ){
                      return $ocLazyLoad.load('ngZtree');
                    }
                  ]
              }
            })
            .state('app.resource.hostlevel', {
                url: '/hostlevel',
                templateUrl: 'modules/resource/hostlevel.html',
                controller: 'AbnTestController',
                resolve: {
                  deps: ['$ocLazyLoad',
                    function( $ocLazyLoad ){
                      return $ocLazyLoad.load('ngZtree');
                    }
                  ]
              }
            })
            .state('app.resource.cabinet', {
                url: '/cabinet',
                templateUrl: 'modules/resource/cabinet.html',
                controller: 'AbnTestController',
                resolve: {
                  deps: ['$ocLazyLoad',
                    function( $ocLazyLoad ){
                      return $ocLazyLoad.load('ngZtree');
                    }
                  ]
              }
            })
            .state('app.resource.cloudview', {
                url: '/cloudview',
                templateUrl: 'modules/resource/cloudview.html'
            })
           .state('app.resource.synthesizeview', {
                url: '/synthesizeview',
                templateUrl: 'modules/resource/synthesizeview.html'
            })
            .state('app.resource.mould', {
                url: '/mould',
                templateUrl: 'modules/resource/mould.html'
            })
            .state('app.resource.software', {
                url: '/software',
                template: '<div class="app-content-body" ui-view></div>'
            })
            .state('app.resource.software.install', {
                url: '/install',
                templateUrl: 'modules/resource/install.html'
            })
            .state('app.resource.software.installlog', {
                url: '/installlog',
                templateUrl: 'modules/resource/install-log.html'
            })
		}
	]
).controller('ModalDemoCtrl', ['$scope', '$modal', '$log', function($scope, $modal, $log) {
    $scope.items = ['item1', 'item2', 'item3'];
    $scope.open = function (size, url) {
        
      var modalInstance = $modal.open({
        templateUrl: url,
        controller: 'ModalInstanceCtrl',
        size: size,
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function () {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
  }]).controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'items', function($scope, $modalInstance, items) {
    $scope.items = items;
    $scope.selected = {
      item: $scope.items[0]
    };

    $scope.ok = function () {
      $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  }]);
  app.controller('AbnTestController', function($scope, $timeout) {
    $scope.ztreeSetting = {
      view: {
        selectedMulti: false
      },
      data: {
        key: {
          title:"t"
        },
        simpleData: {
          enable: true
        }
      },
      callback: {

      }
    };
    $scope.ztreeData = [
    { name:"资产", 
      open:true,
      url:"#/app/resource/property",
      target:"_self",
      children: [
        { name:"机房1",
          url:"#/app/resource/computerroom",
          target:"_self",
          open:true,
          children: [
            { 
              name:"机层1",
              url:"#/app/resource/hostlevel",
              target:"_self",
              open:true,
               children: [
                { 
                  name:"机柜1",
                  url:"#/app/resource/cabinet",
                  target:"_self"
                },
                { 
                  name:"机柜2",
                  url:"#/app/resource/cabinet",
                  target:"_self"
                }]
            },
            { name:"机层2"}
          ]},
        { 
          name:"机房2",
          open:true,
          children: [
            { name:"机层1"},
            { name:"机层1"},
            { name:"机层1"},
            { name:"机层1"}
          ]},
        { name:"机房3", isParent:true}
      ]}
  ];
});
