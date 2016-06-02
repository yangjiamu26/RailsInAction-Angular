angular.module('app').controller('SalesListCtrl', ['$scope', '$filter', 'server', '$stateParams', function($scope, $filter, server, $stateParams) {

	$scope.fold = $stateParams.fold;
  	
  	server.getHostData(function(data) {
	    var Data = data.cloudHostServices;
	    _.map(Data, function(num, key) {
	      num.priceType = "小时计费";
	      num.parameter = num.cpuSize + "core/" + num.memorySize + "G/" + num.diskSize + "G";
	    });
	    $scope.datas = data.cloudHostServices;

  	});
}])