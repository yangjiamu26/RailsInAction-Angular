angular.module('app')

.controller('visualizationIndexCtrl', function($scope, $state, $stateParams, $timeout, $modal, $log, AssetsManegeRooms, AssetsManegeFloors, AssetsManegeDevicesType, AssetsManegeDevices) {
    
    function getNum(text){
      var value = text.replace(/[^0-9]/ig,""); 
      return value;
    }
    /*function getnavtree(rooms){
      for(var i=0; i<rooms.length; i++){ 
        rooms[i].nodeId = getNum(rooms[i].nodeId);
        if(rooms[i].children){
          if(rooms[i].children.length>0){
            for(var j=0; j<rooms[i].children.length; j++){
              rooms[i].children[j].nodeId = getNum(rooms[i].children[j].nodeId);
            }
          }
        }
      }
      return rooms;
    }
    function getObjectInTree(tree, id){
        var result = null;
        for(var i=0; i<tree.length; i++){ 
            if(tree[i].nodeId==id) {
                result = tree[i];
                break;
            }
        }
        return result;
    }
    AssetsManegeTreeNode.get(function(res){
        $scope.navtrees = getnavtree(res.children);
        var targetNode = getObjectInTree($scope.navtrees,$stateParams.roomId);
        $state.go("app.floors.show",{roomId:$stateParams.roomId,floorId:targetNode.children[0].nodeId});
    })*/
    AssetsManegeRooms.get({id:$stateParams.roomId},function(res){
        AssetsManegeFloors.query({roomId:$stateParams.roomId},function(val){
            if(val.data.length>0){
                $scope.floors = val.data;
                $state.go("app.floors.show",{roomId:$stateParams.roomId,floorId:val.data[0].id});
            }else{
                alert('当前机房没有机层！')
                $state.go("app.visualmap");
            }
        })
        $scope.thisRoom = res;
    })

    $scope.li_mouseover = function(evt,obj){
        if($scope.isInLi) return;
        $scope.isInLi = true;
        $scope.popTop=evt.currentTarget.offsetTop+40;
        $scope.hoverStyle={
            'top':$scope.popTop || 0,
            'left':200
        }
        AssetsManegeDevices.query({floorId:obj.id},function(res){
            $scope.devices = res;
            var arr = [];
            $.each(res.data,function(index,val){
                var times = arr.length;
                if(times==0){
                    arr.push({
                        'name':val.deviceTypeName,
                        'num':1
                    })
                }else{
                    var isnew = true;
                    for(var i=0;i<times;i++){
                        if(arr[i].name == val.deviceTypeName){
                            arr[i].num=arr[i].num+1;
                            isnew = false;
                        }
                    }
                    if(isnew){
                        arr.push({
                            'name':val.deviceTypeName,
                            'num':1
                        })
                    }
                }
            });
            $scope.deviceTypes = arr;
        });
    }
    $scope.li_mouseleave = function(){
        $scope.isInLi = false;
    }
    $scope.changeFloor = function(roomId,floorId){
        $state.go('app.floors.show',{roomId:roomId,floorId:floorId});
    }
})
.controller('visualizationCtrl', function($scope, $state, $stateParams, $http, $modal, $log, fileUrl, AssetsManegeFloors, AssetsManegeFloorRacks) {
    if($stateParams.floorId==''||$stateParams.roomId=='') $state.go('app.visualmap');
    AssetsManegeFloors.get({id:$stateParams.floorId},function(res){
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
.directive("visualizationView", function(){ 
  	return {
  		restrict: "A",
  		controller : function($scope, $modal, $stateParams, $http, $q){

  			$scope.urls = [null,'modules/visualization/JG_Modal.html','modules/visualization/DX_Modal.html','modules/visualization/ZJ_Modal.html'];

			$scope.ShowModal = function(object){
				$modal.open({
			        templateUrl:'modules/visualization/Modals.html',
			        controller: 'visualizationModalCtrl',
                    resolve:{
                        obj:function(){return object}
                    }

			    });
			}
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
					demo.Default.handleDoubleClick(e, gl3dview);
				});
				gl3dview.getRootView().addEventListener('click', function(e) {
					setTimeout(function(){
						if(isDoubleClick) return;
						var gleye = gl3dview.getGleye();
						var interaction = gl3dview.getDefaultInteraction();
						var firstObject = demo.Default.findFirstObjectByMouse(gl3dview, e);
						if (firstObject) {
							if(firstObject.object._eleType){
								scope.ShowModal(firstObject.object);
							}
						}
					},500);
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
.controller('visualizationModalCtrl',function($scope, obj, $timeout, $state, $modalInstance, $rootScope, fileUrl, AssetsManegeRacks, AssetsManegeDevices, AssetsManegeRackDevices, AssetsManegeDevicesType, AssetsManegeFreeLabel, VisualizationVms, MonitorVmsInfo) {
	$scope.fileUrl = fileUrl;
    $scope.close = function(){
		$modalInstance.close();
	}
	$scope.step = 1;
	$scope.prestep = [];
	$scope.slideForward = function(obj){
        $scope.prestep.push($scope.step);
        if(obj.deviceTypeId){
            AssetsManegeDevicesType.get({id:obj.deviceTypeId},function(res){
                if(res.hasChildType == 'Y') {
                    $scope.step = 2;
                    $scope.dxOption = obj;
                    $scope.buildBox($scope.Servers,$scope.dxOption);
                }else{
                    $scope.step = 3;
                    $scope.serverOption = obj;
                    $scope.vms = null;
                    AssetsManegeFreeLabel.query({deviceTypeId:obj.deviceTypeId},function(res){
                        if(obj.fieldValues){
                            var fieldValues = eval('(' + obj.fieldValues + ')');
                            var arr1 = [];
                            for(var i=0;i<res.data.length;i++){
                                if(res.data[i].type=='select'){
                                    res.data[i].enums = res.data[i].enums.split(',');
                                }
                                arr1.push(fieldValues[i].value);
                            }
                            $scope.freeLabelKeyValue = arr1;
                        }else{
                            var arr2 = [];
                            for(var i=0;i<res.data.length;i++){
                                if(res.data[i].type=='select'){
                                    res.data[i].enums = res.data[i].enums.split(',');
                                }
                                arr2.push('');
                            }
                            $scope.freeLabelKeyValue = arr2;
                        }
                        $scope.freeLabels = res.data;
                    })
                    VisualizationVms.query({id:$scope.serverOption.id},function(res){
                        $.each(res.data,function(index,val){
                            res.data[index].dcId = $scope.serverOption.dcId;
                        })
                        $scope.vms = res;
                        $scope.vmError = false;
                    },function(err){
                        $scope.vmError = err.data.exception;
                    });
                }
            })
            
        }else{
            console.log(obj)
            $rootScope.showLoading = true;
            MonitorVmsInfo.get({id:obj.id,dcId:obj.dcId},function(res){
                $scope.vmOption = res;
                $rootScope.showLoading = false;
            },function(err){
                $rootScope.showLoading = false;
            })
            $scope.step = 4;
        }
	}

    $scope.gotoMoniter = function(busdomainId,projectId,id,dcId){
        $state.go('app.resourcemonitor.business.domains.systems.vms.monitor',{domainId:busdomainId,systemId:projectId,vmId:id,dcId:dcId})
    }

    $scope.getDxU = function(begin,end){
        return parseInt(end)+1-parseInt(begin);
    }

	$scope.slideBack = function(){
		$scope.step = $scope.prestep[$scope.prestep.length-1];
		$scope.prestep.pop();
	}

    $scope.buildBox = function(devices,blade){
        var devicesInblade = [];
        $.each(devices.data,function(index,val){
            if(val.parentId && val.parentId == blade.id){
                devicesInblade.push(val);
            }
        })
        $scope.devicesInblade = devicesInblade;
    }
    //$scope.Servers = AssetsManegeRackDevices.query({id:obj._pid});
    function buildpie1(used,free){
        $scope.jgpie1 = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
            },
            title: {
                text: ''
            },
            tooltip: {
                pointFormat: '<b>{point.percentage:.1f}%</b>'
            },
            credits:{
                enabled:false
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    colors:['#ffbe6c','#6fd4fe'],
                    showInLegend: true
                }
            },
            series: [{
                type: 'pie',
                data: [
                    ['已使用',  used],
                    ['未使用',  free]
                ]
            }]
        }
    }

    $scope.rackOption = AssetsManegeRacks.get({id:obj._pid},function(res){
        buildpie1(parseInt(res.availableU),parseInt(res.rackUNum)-parseInt(res.availableU));
    });
    AssetsManegeDevices.query({roomId:$state.params.roomId,floorId:$state.params.floorId,rackId:obj._pid},function(res){
        AssetsManegeDevicesType.query(function(types){
            $.each(types.data,function(index,val){
                for(var i=0;i<res.data.length;i++){
                    if(res.data[i].deviceTypeId==val.id){
                        res.data[i].image=val.image;
                    }
                }
            })
            $scope.Servers = res;
        })
    });
    //console.log($scope.Servers);
    $scope.getPosition = function(position){
        var bottom = parseInt(position)*10+12+"px";
        var style = {
            'bottom':bottom
        }
        return style
    }

    $scope.myFilter = function (item) {
        return !!item.beginU && item.parentId==null;
    };

})
.controller("visZjCtrl",['$scope', function($scope) {
    
}])
.controller("visVmCtrl",function($scope){
    $scope.pie1 = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
        },
        title: {
            text: ''
        },
        tooltip: {
            pointFormat: '<b>{point.percentage:.1f}%</b>'
        },
        credits:{
            enabled:false
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                colors:['#ffbe6c','#6fd4fe'],
                showInLegend: true
            }
        },
        series: [{
            type: 'pie',
            data: [
                ['不可用',   30.0],
                ['可用',   70.0]
            ]
        }]
    }
})
