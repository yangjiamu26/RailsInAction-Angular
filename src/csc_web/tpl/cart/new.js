app.controller('CartNewCtrl', ['$scope', '$http', '$filter', 'editableOptions', 'editableThemes', function($scope, $http, $filter,editableOptions, editableThemes) {
  editableThemes.bs3.inputClass = 'input-sm';
  editableThemes.bs3.buttonsClass = 'btn-sm';
  editableOptions.theme = 'bs3';

  $scope.showStatus = function() {
    var selected = $filter('filter')($scope.statuses, {value: $scope.user.status});
    return ($scope.user.status && selected.length) ? selected[0].text : 'Not set';
  };

  $scope.showAgenda = function() {
    var selected = $filter('filter')($scope.agenda, {value: $scope.user.agenda});
    return ($scope.user.agenda && selected.length) ? selected[0].text : 'Not set';
  };
   // editable table
  $scope.configs = [
    {id: 1, name: 'awesome user1', status: 2, group: 4, groupName: 'admin'},
    {id: 2, name: 'awesome user2', status: undefined, group: 3, groupName: 'vip'},
    {id: 3, name: 'awesome user3', status: 2, group: null}
  ];


}]);