
app.controller('settingOrganizationController', function($scope, $timeout) {
  $scope.ztreeSetting = {
    //
  };
  $scope.ztreeData = [{
    name: "组织目录",
    open: true,
    children: [{
      name: "研发部"
    }, {
      name: "市场部"
    }, {
      name: "财务部"
    }, {
      name: "人事部"
    }, {
      name: "总裁办"
    }]
  }];
});
app.controller('settingUserController', function($scope, $timeout) {
  $scope.ztreeSetting = {
    //
  };

  $scope.ztreeData = [{
      name: "组织目录",
      open: true,
      children: [{
        name: "研发部"
      }, {
        name: "市场部"
      }, {
        name: "财务部"
      }, {
        name: "人事部"
      }, {
        name: "总裁办"
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