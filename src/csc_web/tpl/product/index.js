app.controller('ProductIndexCtrl', ['$scope', '$http', '$filter', 'editableOptions', 'editableThemes', function($scope, $http, $filter,editableOptions, editableThemes) {
  editableThemes.bs3.inputClass = 'input-sm';
  editableThemes.bs3.buttonsClass = 'btn-sm';
  editableOptions.theme = 'bs3';

  $http.get('tpl/product/index.json').then(function (resp) {
    $scope.products = resp.data.products;
    // set default product
    $scope.product = $scope.products[0];
    $scope.products[0].selected = true;
  });

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

  $scope.colors = ['primary', 'info', 'success', 'warning', 'danger', 'dark'];

  $scope.createproduct = function(){
    var product = {
      content: 'New product',
      color: $scope.colors[Math.floor((Math.random()*3))],
      date: Date.now()
    };
    $scope.products.push(product);
    $scope.selectproduct(product);
  }

  $scope.deleteproduct = function(product){
    $scope.products.splice($scope.products.indexOf(product), 1);
    if(product.selected){
      $scope.product = $scope.products[0];
      $scope.products.length && ($scope.products[0].selected = true);
    }
  }

  $scope.selectproduct = function(product){
    angular.forEach($scope.products, function(product) {
      product.selected = false;
    });
    $scope.product = product;
    $scope.product.selected = true;
  }

}]);