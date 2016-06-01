angular.module('app').controller('serviceCstlCtrl', ['$scope', function($scope) {
  $scope.switchFilter = function() {
    $('.adv-filter-btn').toggleClass('filterhasbg');
    $('.adv-filter-btn').find("span").toggleClass('rotate180');
    $(".adv-filter").toggleClass('hide');
  }
}])