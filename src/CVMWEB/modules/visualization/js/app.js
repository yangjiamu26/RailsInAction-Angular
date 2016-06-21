var isDoubleClick = false;
var ROOT_Severities = [mono.AlarmSeverity.CRITICAL, null, mono.AlarmSeverity.MINOR, mono.AlarmSeverity.WARNING,];
var scenceJson={	
	//clearColor: 'red',
	objects: null,
};

function setup(htmlElementId) {
	var gl3dview = new mono.Gl3dview3D();

	var gleye = new mono.PerspectiveGleye(30, 1.5, 30, 30000);
	gleye.setPosition(4000, 2200, 5000);
	gl3dview.setGleye(gleye);

	var interaction = gl3dview.getDefaultInteraction();
	interaction.yLowerLimitAngle = Math.PI / 180 * 2;
	interaction.yUpLimitAngle = Math.PI / 2;
	interaction.maxDistance = 10000;
	interaction.minDistance = 50;
	interaction.zoomSpeed = 1;
	interaction.panSpeed = 0.2;

	gl3dview.isSelectable = function(element) {
		return false;
	};
	document.getElementById(htmlElementId).appendChild(gl3dview.getRootView());
	mono.Utils.autoAdjustGl3dviewBounds(gl3dview, document.documentElement, 'clientWidth', 'clientHeight');
	gl3dview.getRootView().addEventListener('dblclick', function(e) {
		demo.Default.handleDoubleClick(e, gl3dview);
	});
	gl3dview.getRootView().addEventListener('click', function(e) {
		demo.Default.handleClick(e, gl3dview);
	});

	setupLights(gl3dview.getServa());

	var time1 = new Date().getTime();
	var json = demo.Default.filterJson(gl3dview.getServa(), scenceJson.objects);
	demo.Default.loadJson(gl3dview, json);
	var time2 = new Date().getTime();
}

function setupLights(box) {
	var pointLight = new mono.PointLight(0xFFFFFF, 0.3);
	pointLight.setPosition(0, 1000, -1000);
	box.add(pointLight);

	var pointLight = new mono.PointLight(0xFFFFFF, 0.3);
	pointLight.setPosition(0, 1000, 1000);
	box.add(pointLight);

	var pointLight = new mono.PointLight(0xFFFFFF, 0.3);
	pointLight.setPosition(1000, -1000, -1000);
	box.add(pointLight);

	box.add(new mono.AmbientLight('white'));
}



$(function(){
	var loadingDIV = document.createElement("div");
	$(loadingDIV).html("loading……");
	$(loadingDIV).addClass('loading');
	$('body').prepend(loadingDIV);
	setTimeout(function(){
		$.when($.ajax("jigui"+ROOT_FLOOR+".json"),$.ajax("build"+ROOT_FLOOR+".json"))
		.done(function(data1,data2){
			scenceJson.objects = eval(data2[0])[1];
			S_positonX = eval(data2[0])[0].S_positonX;
			S_positonY = eval(data2[0])[0].S_positonY;
			scenceJson.objects = $.each(scenceJson.objects,function(index,res){
				if(res.type=="racks"){
					res.data = eval(data1[0]);
					res.severities = ROOT_Severities;
				}
				return res;
			});
			setup("3d_view");
		});
	},1)
	
})


angular.module('app')
module.service("DataService", function($http, $q){ 
	this.getModelJson = function(){ 

		var defered = $q.defer();

		$http.get("...json").success(function(data1){ 
			
			$http.get("...json").success(function(data2){ 
				defered.resolved(data1, data2);
			}
		})
		return defered.promise;
	}
})

module.directive("3d-view", function(){ 
  return { 
  	restrict: "E",
  	controller : function($scope, DataService){ 
  		DataService.getModelJson().then(function(datas){ 
  			$scope.datas = datas;

  			scenceJson.objects = eval(data2[0])[1];
			S_positonX = eval(data2[0])[0].S_positonX;
			S_positonY = eval(data2[0])[0].S_positonY;
			scenceJson.objects = $.each(scenceJson.objects,function(index,res){
				if(res.type=="racks"){
					res.data = eval(data1[0]);
					res.severities = ROOT_Severities;
				}
				return res;
			});
			setup("3d_view");
  		})
  	}
  }

})