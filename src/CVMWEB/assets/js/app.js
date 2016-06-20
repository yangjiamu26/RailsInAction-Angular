'use strict';

var app = angular.module('app', [
	'ngResource',
	'ngAnimate',
	'ipCookie',
    'ui.router',
    'oc.lazyLoad',
    'ui.jq',
    'ui.load',
    'ui.bootstrap',
    'ngFileUpload',
    'pagination'
]);

// app.constant("baseUrl","http://10.10.112.226:8095/cvm/v3.0");
// app.constant("fileUrl","http://10.10.112.226:8095/");
app.constant("baseUrl","http://"+window.location.host+"/cvm/v3.0");
app.constant("fileUrl","http://"+window.location.host+"/");
// app.constant("baseUrl","http://192.168.208.51:8095/cvm/v3.0");
// app.constant("fileUrl","http://192.168.208.51:8095/");

app.factory('AuthInterceptor', function ($rootScope, $q) {
  return {
    responseError: function (error) { 
      switch(error.status){
        case 401:
          break;
        case 403:
          break;
        case 404:
          //location.href='/#/login'
          break;
        case 419:
          break;
        case 500:
          //console.log('用户名或密码错误');
          break;
      }
      return $q.reject(error);
    }
  };
})
.config(function($httpProvider){
    $httpProvider.interceptors.push([
      '$injector',
      function ($injector) {
        return $injector.get('AuthInterceptor');
      }
    ]);
})
app.controller("RootController", function($scope, $state, $interval, $rootScope, $modalStack, $document, ipCookie, loginOut){
	$rootScope.$on('$stateChangeStart',function(event, toState, toParams, fromState, fromParams){
		$modalStack.dismissAll(); 

		if(toState.name=='login')return;// 如果是进入登录界面则允许
		$rootScope.userInfo = ipCookie('userInfo');
		// 如果用户不存在
		if(!$rootScope.userInfo){
			alert('请先登录！');
			event.preventDefault();// 取消默认跳转行为
			$rootScope.fromUrl = toState.name;
			$rootScope.fromParams = toParams;
			$state.go("login");//跳转到登录界面
			loginOut.loginOut();
		}
	});

	$rootScope.loginOut = function(){
		if(confirm("确定要退出吗？"))
		{
			ipCookie.remove('userInfo');
			ipCookie.remove('userInfo', { path: '/' });
			$state.go("login");
			loginOut.loginOut();
		}
	}

	$rootScope.timeNow = function(){
		var _time = new Date();
		var moment = _time.getFullYear()+"-"+(_time.getMonth()+1)+"-"+_time.getDate()+" "+_time.getHours()+":"+_time.getMinutes();
		return moment;
	}
	
	$rootScope.isStart = false;
	$scope.execFrame = function(){
		if ($rootScope.isStart) {
			$state.go($rootScope._links[$rootScope._index].state,$rootScope._links[$rootScope._index].params);
			$rootScope._index = ($rootScope._index+1)%$rootScope._links.length;
		};
	};

	$rootScope.startFrame = function(){
		$rootScope.isStart = true;
		$scope.execFrame();
		if($rootScope._links&&$rootScope._links.length>1){
			if ($scope.timer == null){
				$scope.timer = $interval($scope.execFrame, parseInt($rootScope.interval)*1000);
			}
		}
		
	};
	
	$scope.closeFrame = function(){
		$interval.cancel($scope.timer);
		$scope.timer = null;
		$state.go("app.bigview");
		if($rootScope.exitFullscreen){
			$rootScope.exitFullscreen();
			$rootScope.isStart = false;
		}
		
	};
});
app.controller("mainCtrl", function($scope, $state, $rootScope, ipCookie){
	$scope.userName = $rootScope.userInfo ? $rootScope.userInfo.name : '未登录';
	$scope.loginOut = function(){
		$rootScope.loginOut();
	}
});