angular.module('app').controller('RaphaelMapCtrl', ['$scope', function MainCtrl($scope) {

	$scope.areaname = ['海南', '湖南', '新疆'];
	$scope.data = {'海南':125, '湖南':998};
  $scope.show = function(name) {
    var obj = {};
    obj[name] = 100000;
    $scope.data = obj;
  };
  $scope.createData = function() {
     var objs =[{a:1},{a:2}];
    angular.forEach(objs, function(data){
    console.log(data.a);
    });
  };
  $scope.createData();
  
}]);