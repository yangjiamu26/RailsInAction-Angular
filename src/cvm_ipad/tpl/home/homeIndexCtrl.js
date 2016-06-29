angular.module('app')
.controller('homeIndexCtrl',function($scope, cvmPadApp){
	$scope.$on("nowChangeDatacenter", function (event, dcInfo) {
         $scope.dcName = dcInfo.dcName;
         cvmPadApp.indexRes().then(function(res){
			$scope.infos = res;
			$scope.buildcharts(res);
		})
    });

	$scope.buildcharts = function(res){

	}
})
