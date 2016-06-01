angular.module('app').config(
  ['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $stateProvider
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
          resolve: {
            deps: ['$ocLazyLoad',
              function($ocLazyLoad) {
                return $ocLazyLoad.load('ztree');
              }
            ]
          }
        })
        .state('app.resource.computerroom', {
          url: '/computerroom',
          templateUrl: 'tpl/resource/computerroom.html',
          controller: 'AbnTestController',
          resolve: {
            deps: ['$ocLazyLoad',
              function($ocLazyLoad) {
                return $ocLazyLoad.load('ztree');
              }
            ]
          }
        })
        .state('app.resource.hostlevel', {
          url: '/hostlevel',
          templateUrl: 'tpl/resource/hostlevel.html',
          controller: 'AbnTestController',
          resolve: {
            deps: ['$ocLazyLoad',
              function($ocLazyLoad) {
                return $ocLazyLoad.load('ztree');
              }
            ]
          }
        })
        .state('app.resource.cabinet', {
          url: '/cabinet',
          templateUrl: 'tpl/resource/cabinet.html',
          controller: 'AbnTestController',
          resolve: {
            deps: ['$ocLazyLoad',
              function($ocLazyLoad) {
                return $ocLazyLoad.load('ztree');
              }
            ]
          }
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
    }
  ]);
angular.module('app').controller('ModalDemoCtrl', ['$scope', '$uibModal', '$log', function($scope, $uibModal, $log) {
  $scope.items = ['item1', 'item2', 'item3'];
  $scope.open = function(size, url) {

    var modalInstance = $uibModal.open({
      templateUrl: url,
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function() {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function(selectedItem) {
      $scope.selected = selectedItem;
    }, function() {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
}]);
angular.module('app').controller('ModalInstanceCtrl', ['$scope', '$uibModalInstance', 'items', function($scope, $uibModalInstance, items) {
  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function() {
    $uibModalInstance.close($scope.selected.item);
  };

  $scope.cancel = function() {
    $uibModalInstance.dismiss('cancel');
  };
}]);
angular.module('app').controller('AbnTestController', function($scope, $timeout) {
  $scope.ztreeSetting = {
    view: {
      selectedMulti: false
    },
    data: {
      key: {
        title: "t"
      },
      simpleData: {
        enable: true
      }
    },
    callback: {

    }
  };
  $scope.ztreeData = [{
    name: "资产",
    open: true,
    url: "#/app/resource/property",
    target: "_self",
    children: [{
      name: "机房1",
      url: "#/app/resource/computerroom",
      target: "_self",
      open: true,
      children: [{
        name: "机层1",
        url: "#/app/resource/hostlevel",
        target: "_self",
        open: true,
        children: [{
          name: "机柜1",
          url: "#/app/resource/cabinet",
          target: "_self"
        }, {
          name: "机柜2",
          url: "#/app/resource/cabinet",
          target: "_self"
        }]
      }, {
        name: "机层2"
      }]
    }, {
      name: "机房2",
      open: true,
      children: [{
        name: "机层1"
      }, {
        name: "机层1"
      }, {
        name: "机层1"
      }, {
        name: "机层1"
      }]
    }, {
      name: "机房3",
      isParent: true
    }]
  }];
});