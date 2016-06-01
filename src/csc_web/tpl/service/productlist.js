app.controller('ProductListCtrl', ['$scope', function($scope) {

	$scope.tabData   = [
      {
        heading: '云主机',
        route:   'app.service.productlist.host'
      },
      {
        heading: '云硬盘',
        route:   'app.service.productlist.disk'
      }
    ];

}]);
    