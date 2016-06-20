angular.module('app')

.controller('loginCtrl', ['$scope', '$rootScope', '$state', '$stateParams', '$modal', '$timeout', 'baseUrl', 'goLogin', 'ipCookie', function($scope, $rootScope, $state, $stateParams, $modal, $timeout, baseUrl, goLogin, ipCookie) {
	$scope.user = {};
	$scope.keyup = function(e){
        var keycode = window.event?e.keyCode:e.which;
        if(keycode==13){
            $scope.login();
        }
    };
	$scope.login = function(){
		if(!$scope.user.name){
			$scope.noName = true;
			alert('用户名不能为空！');
			$scope.$watch('user.name' , function(news){
				if(news && news.length>0) $scope.noName = false;
		    })
			return;
		}else{
			$scope.noName = false;
		}
		if(!$scope.user.password){
			$scope.noPassword = true;
			alert('密码不能为空！');
			$scope.$watch('user.password' , function(news){
				if(news && news.length>0) $scope.noPassword = false;
		    })
			return;
		}else{
			$scope.noPassword = false;
		}
		if(!$scope.noPassword && !$scope.noPassword){
			goLogin.login({account:$scope.user.name,password:$scope.user.password},function(res){
				ipCookie('userInfo', res, { expires: 365, expirationUnit:'days'});
				$rootScope.userInfo = res;

				var from = $rootScope.fromUrl;
				$state.go(from && from != "login" ? from : "app.overview.index",$rootScope.fromParams);

			},function(err){
				if(err.data && err.data.exception){
					if(err.data.exception=="sys.rest.connect.error"){
						alert('连接CSC校验用户失败，请检查CSC是否已启动！');
					}else{
						alert(err.data.exception);
					}
				}else{
					alert('连接失败，请联系管理员检查服务器环境是否正常!');
					$state.reload();
				}
			})
		}
	}
}])