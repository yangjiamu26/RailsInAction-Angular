angular.module('app').controller('proModalCtrl', ['$scope', '$uibModal', '$log', function($scope, $uibModal, $log) {
  $scope.items = ['item1', 'item2', 'item3'];
  $scope.open = function(url, size) {
    var modalInstance = $uibModal.open({
      //templateUrl: 'myModalContent.html',
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
}])