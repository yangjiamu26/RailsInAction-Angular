angular.module('setting', ['ui.router']).config(
	[          '$stateProvider', '$urlRouterProvider', 
	function ($stateProvider,   $urlRouterProvider) {
			$stateProvider
            .state('app.setting', {
                url: '/setting',
                template: '<div class="app-content-body" ui-view></div>'
            })
			.state('app.setting.organization', {
                url: '/organization',
                templateUrl: 'modules/setting/organization.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                      function( $ocLazyLoad ){
                        return $ocLazyLoad.load('ngZtree').then(
                          function(){
                        }
                      );
                    }]
                }
            })
            .state('app.setting.user', {
                url: '/user',
                templateUrl: 'modules/setting/user.html',
                resolve: {
                    deps: ['$ocLazyLoad',
                      function( $ocLazyLoad ){
                        return $ocLazyLoad.load('ngZtree').then(
                          function(){
                        }
                      );
                    }]
                }
            })
            .state('app.setting.role', {
                url: '/role',
                templateUrl: 'modules/setting/role.html'
            })
            .state('app.setting.config', {
                url: '/config',
                templateUrl: 'modules/setting/config.html'
            })
            .state('app.setting.dictionary', {
                url: '/dictionary',
                templateUrl: 'modules/setting/dictionary.html'
            })
		}
	]
);
app.controller('settingOrganizationController', function($scope, $timeout) {
    $scope.ztreeSetting = {
      //
    };
    $scope.ztreeData = [
    { name:"组织目录", open:true,
      children: [
        { name:"研发部"},
        { name:"市场部"},
        { name:"财务部"},
        { name:"人事部"},
        { name:"总裁办"}
      ]}
  ];
});
app.controller('settingUserController', function($scope, $timeout) {
    $scope.ztreeSetting = {
      //
    };

    $scope.ztreeData = [
    { name:"组织目录", open:true,
      children: [
        { name:"研发部"},
        { name:"市场部"},
        { name:"财务部"},
        { name:"人事部"},
        { name:"总裁办"}
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