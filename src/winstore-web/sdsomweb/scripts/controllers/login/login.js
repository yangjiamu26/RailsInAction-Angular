vsanApp.controller("loginController",["$scope", "$state", "Restangular", function($scope, $state, Restangular){
    "use strict";
    $scope.login = function () {
    	var params={username: $scope.userName, password: $scope.passWord}
    	Restangular.all(urlConfig.get("sysLogin")).post(params).then(function (response) {
    		if(response.success){
    			urlConfig.put("userName",$scope.userName);
    			$state.transitionTo("mainManager.mainPage");
    		}else{
    			$scope.errMsg = response.message;
    		}
    	})
    }
}]);
