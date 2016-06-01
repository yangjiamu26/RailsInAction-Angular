angular.module('app').config(
  ['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {
      $stateProvider
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
          resolve: {
            deps: ['$ocLazyLoad',
              function($ocLazyLoad) {
                return $ocLazyLoad.load('ztree');
              }
            ]
          }
        })

      .state('app.business.system', {
          url: '/system',
          templateUrl: 'tpl/business/system.html',
          controller: 'businessZtreeController',
          ncyBreadcrumb: {
            label: '业务系统'
          },
          resolve: {
            deps: ['$ocLazyLoad',
              function($ocLazyLoad) {
                return $ocLazyLoad.load('ztree');
              }
            ]
          }
        })
        .state('app.business.sysdetails', {
          url: '/sysdetails',
          templateUrl: 'tpl/business/sysdetails.html',
          controller: 'businessZtreeController',
          resolve: {
            deps: ['$ocLazyLoad',
              function($ocLazyLoad) {
                return $ocLazyLoad.load('ztree');
              }
            ]
          }
        })
    }
  ]
);
app.controller('businessZtreeController', function($scope, $timeout) {
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
      name: "业务系统目录",
      open: true,

      children: [{
        name: "业务域1",
        open: true,
        url: "#/app/business/system",
        children: [{
          name: "业务系统1",

          url: "#/app/business/sysdetails",
          target: "_self"
        }, {
          name: "业务系统2"
        }, {
          name: "业务系统3"
        }, {
          name: "业务系统4"
        }]
      }, {
        name: "业务域2",
        children: [{
          name: "业务系统1"
        }, {
          name: "业务系统1"
        }, {
          name: "业务系统1"
        }, {
          name: "业务系统1"
        }]
      }]
    }


  ];
});

app.controller('ModalInstanceCtrl', ['$scope', '$uibModalInstance', 'items', function($scope, $uibModalInstance, items) {
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

app.controller('ModalDemoCtrl', ['$scope', '$uibModal', '$log', function($scope, $uibModal, $log) {
  $scope.items = ['item1', 'item2', 'item3'];
  $scope.open = function(size) {
    var modalInstance = $uibModal.open({
      templateUrl: 'myModalContent.html',
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