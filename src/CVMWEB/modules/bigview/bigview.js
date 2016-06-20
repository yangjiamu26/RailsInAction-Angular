app.controller("bigviewCtrl",function($scope, $rootScope, SettingLargeScreenConfigs){
	SettingLargeScreenConfigs.query(function(res){
		var data = res.data;
		for(var i=0;i<data.length;i++){
			if(!angular.isArray(data[i].url)){
				data[i].url = eval('(' + data[i].url + ')');
			}
			
			for(var j=0;j<data[i].url.length;j++){
				if(angular.isArray(data[i].url[j].url)){
					data[i].url[j].image = 'assets/image/bigview/index.jpg';
				}else{
					if(!data[i].url[j].url.state) continue;
					if(data[i].url[j].url.state.indexOf("introduction")!=-1){
						data[i].url[j].image = 'assets/image/bigview/introduction.jpg';
					}
					if(data[i].url[j].url.state.indexOf("monitor_big")!=-1){
						data[i].url[j].image = 'assets/image/bigview/monitor.jpg';
					}
					if(data[i].url[j].url.state.indexOf("floors_big")!=-1){
						data[i].url[j].image = 'assets/image/bigview/floors.jpg';
					}
				}
			}
		}
		$scope.settings = data;
	});

	$scope.fullScreen = function(){
		var de = document.documentElement;
		if (de.requestFullscreen) {
			de.requestFullscreen();
		} else if (de.mozRequestFullScreen) {
			de.mozRequestFullScreen();
		} else if (de.webkitRequestFullScreen) {
			de.webkitRequestFullScreen();
		}
	};

	$rootScope.exitFullscreen = function() {
	  if(document.exitFullscreen) {
	    document.exitFullscreen();
	  } else if(document.mozCancelFullScreen) {
	    document.mozCancelFullScreen();
	  } else if(document.webkitExitFullscreen) {
	    document.webkitExitFullscreen();
	  }
	};

	$scope.startFrame = function(){
		if($scope.selectNum==null){
			alert('请先选择一个配置！');
			return;
		}
		$rootScope._index = 0;
		$rootScope.startFrame();
		$scope.fullScreen();
	};

	$scope.clickView = function(index,setting){
		if($scope.selectNum && $scope.selectNum==index){
			$scope.selectNum = null;
		}else{
			$scope.selectNum = index;
		}

		var links = [];
		var interval = setting.interval ? setting.interval : 999999;
		for(var i=0;i<setting.url.length;i++){
			if(angular.isArray(setting.url[i].url)){
				links.push(setting.url[i].url[0],setting.url[i].url[1]);
			}else{
				links.push(setting.url[i].url);
			}
		}
		$rootScope._links = links;
		$rootScope.interval = interval;
	}
})
