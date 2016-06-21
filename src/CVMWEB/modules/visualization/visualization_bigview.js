angular.module('app')

.controller('visualizationBigCtrl', function($scope, $stateParams, $http, $log, fileUrl, AssetsManegeRooms, AssetsManegeFloors, AssetsManegeFloorRacks) {
    $scope.room = AssetsManegeRooms.get({id:$stateParams.roomId});
    AssetsManegeFloors.get({id:$stateParams.floorId},function(res){
        $scope.floor = res;
        $http.get(fileUrl+res.floorJsonFilepath).success(function(data1){
            AssetsManegeFloorRacks.query({id:$stateParams.floorId},function(data2){
                var scenceJson = {objects:null}
                scenceJson.objects = data1[1];
                S_positonX = data1[0].S_positonX;
                S_positonY = data1[0].S_positonY;
                scenceJson.objects = $.each(scenceJson.objects,function(index,res){
                    if(res.rotate){
                        res.rotate[0] = res.rotate[0]*Math.PI/180;
                        res.rotate[1] = res.rotate[1]*Math.PI/180;
                        res.rotate[2] = res.rotate[2]*Math.PI/180;
                    }
                    if(res.type=="racks"){
                        res.data = data2.data;
                        res.severities = ROOT_Severities;
                    }
                    return res;
                });
                $scope.scenceJson = scenceJson;
            })
        })
    });
})
.directive("visualizationBigView", function(){
  	return {
  		restrict: "A",
  		controller : function($scope, $modal, $stateParams, $http, $q){

			$scope.setupLights = function(box) {
				var pointLight = new mono.PointLight(0xFFFFFF, 0.3);
				pointLight.setPosition(0, 1000, -1000);
				box.add(pointLight);

				var pointLight = new mono.PointLight(0xFFFFFF, 0.3);
				pointLight.setPosition(0, 1000, 1000);
				box.add(pointLight);

				var pointLight = new mono.PointLight(0xFFFFFF, 0.3);
				pointLight.setPosition(1000, -1000, -1000);
				box.add(pointLight);

				box.add(new mono.AmbientLight('#fff'));
			}
  		},
        scope:{
            scencejson:"="
        },
  		link: function(scope, element, attrs){

            function inspection(gl3dview) {
                var actions1 = [{
                    'px': 7200,
                    'py': 2200,
                    'pz': 1000
                },{
                    'px': 6000,
                    'py': 2200,
                    'pz': -4000
                },{
                    'px': 1000,
                    'py': 2200,
                    'pz': -7200
                },{
                    'px': -4000,
                    'py': 2200,
                    'pz': -6000
                },{
                    'px': -7200,
                    'py': 2200,
                    'pz': -1000
                },{
                    'px': -6000,
                    'py': 2200,
                    'pz': 4000
                },{
                    'px': -1000,
                    'py': 2200,
                    'pz': 7200
                },{
                    'px': 4000,
                    'py': 2200,
                    'pz': 6000
                }];

                mono.AniUtil.playInspection(gl3dview, actions1, function(){
                    inspection(gl3dview)
                });
            }

            var scenceJson = scope.scencejson;
			if(scenceJson && scenceJson.objects){
				var gl3dview = new mono.Gl3dview3D();
				var gleye = new mono.PerspectiveGleye(30, 1.5, 30, 30000);
				gleye.setPosition(4000, 2200, 6000);
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
				document.getElementById("3d_view").appendChild(gl3dview.getRootView());
				mono.Utils.autoAdjustGl3dviewBounds(gl3dview, document.documentElement, 'clientWidth', 'clientHeight');
				gl3dview.getRootView().addEventListener('dblclick', function(e) {
                    inspection(gl3dview);
                    // setInterval(function(){
                    //     gl3dview.rotationZ = rotateZ;
                    //     rotateZ += 10;
                    // },100)
                    return;
					demo.Default.handleDoubleClick(e, gl3dview);
				});
				gl3dview.getRootView().addEventListener('click', function(e) {
                    return;
				});

				scope.setupLights(gl3dview.getServa());

				var time1 = new Date().getTime();
				var json = demo.Default.filterJson(gl3dview.getServa(), scenceJson.objects);
				demo.Default.loadJson(gl3dview, json);
				var time2 = new Date().getTime();
			}

			
  		}
  	}
})
