angular.module('app').controller('appServiceRequisStepsCtrl', ['$scope', function($scope) {
  angular.element("#slider").on('slideStop', function(data) {
    updateModel(data.value);
  });
}]);