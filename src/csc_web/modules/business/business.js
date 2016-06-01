angular.module('business', ['ui.router']).config(
	[          '$stateProvider', '$urlRouterProvider', 
	function ($stateProvider,   $urlRouterProvider) {
			$stateProvider
      .state('app.business', {
                url: '/business',
                template: '<div class="app-content-body" ui-view></div>'
            })
			.state('app.business.domain', {
                url: '/domain',
                templateUrl: 'modules/business/domain.html',
                controller: 'businessZtreeController',
                resolve: {
                  deps: ['$ocLazyLoad',
                    function( $ocLazyLoad ){
                      return $ocLazyLoad.load('ngZtree');
                    }
                  ]
              }
            })
		
    .state('app.business.system', {
                url: '/system',
                templateUrl: 'modules/business/system.html',
                controller: 'businessZtreeController',
                resolve: {
                  deps: ['$ocLazyLoad',
                    function( $ocLazyLoad ){
                      return $ocLazyLoad.load('ngZtree');
                    }
                  ]
              }
            })
     .state('app.business.sysdetails', {
                url: '/sysdetails',
                templateUrl: 'modules/business/sysdetails.html',
                controller: 'businessZtreeController',
                resolve: {
                  deps: ['$ocLazyLoad',
                    function( $ocLazyLoad ){
                      return $ocLazyLoad.load('ngZtree');
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
    { name:"业务系统目录", 
      open:true,
      
      children: [
        { 
          name:"业务域1",
          open:true,
          url:"#/app/business/system",
          children: [
            { 
              name:"业务系统1",
              
              url:"#/app/business/sysdetails",
              target:"_self"
          },
            { name:"业务系统2"},
            { name:"业务系统3"},
            { name:"业务系统4"}
          ]},
        { name:"业务域2",
          children: [
            { name:"业务系统1"},
            { name:"业务系统1"},
            { name:"业务系统1"},
            { name:"业务系统1"}
          ]}
      ]}

      
  ];
});

app.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'items', function($scope, $modalInstance, items) {
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
  }])
  ; 

app.controller('ModalDemoCtrl', ['$scope', '$modal', '$log', function($scope, $modal, $log) {
    $scope.items = ['item1', 'item2', 'item3'];
    $scope.open = function (size) {
      var modalInstance = $modal.open({
        templateUrl: 'myModalContent.html',
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
  }])
  ; 