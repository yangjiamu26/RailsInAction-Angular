
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