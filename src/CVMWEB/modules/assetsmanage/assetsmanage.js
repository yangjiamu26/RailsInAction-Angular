angular.module('app')

.controller('assetsmanageCtrl', function($scope, $state ,$rootScope, $timeout, AssetsManegeTreeNode, AssetsManegeRooms) {
	function addSkin(node, isFirst, callback, level){
	    //node.iconSkin = "monitor-tree-skin"+node.proType;
	    node.title = node.label;
	    node.level = level+1;
	    if(node.children){
	        for(var i=0; i<node.children.length; i++){ 
	          addSkin(node.children[i], false, null, node.level)
	        }  
	    }
	    if(isFirst){
	    	node.level = 1;
	        callback(node);
	    }
	  }
	AssetsManegeTreeNode.query(function(data){
		addSkin(data, true, function(node){
			$scope.assetsTree = [node];
			$scope.my_tree=tree={};
			$scope.showtree = true;
			$timeout(function(){
				$rootScope.selectTreeNode = function(params){
					if(!$scope.showtree) return;
					if($state.includes("app.assetsmanage.base.list")||$state.includes("app.assetsmanage.base.devices")){
						$scope.my_tree.select_branch_by_id("assetView");
					}else if(params.rackId){
						$scope.my_tree.select_branch_by_id("rack-"+params.rackId);
					}else if(params.floorId){
						$scope.my_tree.select_branch_by_id("floor-"+params.floorId);
					}else if(params.roomId){
						$scope.my_tree.select_branch_by_id("room-"+params.roomId);
					}
				}
				$rootScope.selectTreeNode($state.params);
			})
			
		},0);
	});

	function getObjectInTree(tree, id){
		if(tree.nodeId && tree.nodeId == id){ 
			return tree;
		}
		var result = null;
		for(var i=0; i<tree.children.length; i++){ 
			result = getObjectInTree(tree.children[i],id);
			if(result!=null){ 
				break;
			}
		}
		return result;
	}

	$rootScope.rebuildAssetsTree = function(){
		$scope.isEdit = true;
		AssetsManegeTreeNode.query(function(data){
			addSkin(data, true, function(node){
				$scope.assetsTree = [node];
				$timeout(function(){
					$scope.my_tree.expand_all(2);
					$rootScope.selectTreeNode($state.params);
				})
			},0);
		});
	}

	$scope.inited = false;
	$scope.my_tree_handler = function(branch) {
		if(!$scope.inited) {
			$scope.inited = true;
			return;
		}
		if($scope.isEdit){
			$scope.isEdit = false;
			return;
		}
    	switch(branch.level){
    		case 1:
    			if($state.includes("app.assetsmanage.base.servers")){
    				$state.go("app.assetsmanage.base.servers");
    			}else{
    				$state.go("app.assetsmanage.base.list");
    			}
    			break;
    		case 2:
    			$state.go("app.assetsmanage.rooms.list",{roomId:branch.nodeId.substr(5)});
    			break;
    		case 3:
    			var parent = $scope.my_tree.get_parent_branch(branch);
    			$state.go("app.assetsmanage.rooms.floors.list",{roomId:parent.nodeId.substr(5),floorId:branch.nodeId.substr(6)});
    			break;
    		case 4:
    			var parent = $scope.my_tree.get_parent_branch(branch);
    			var grandpa = $scope.my_tree.get_parent_branch(parent);
    			$state.go("app.assetsmanage.rooms.floors.racks.list",{roomId:grandpa.nodeId.substr(5),floorId:parent.nodeId.substr(6),rackId:branch.nodeId.substr(5)});
    			break;
    		default:
    			break;
    	}
    };

})
.controller('assetsRoomsCtrl', function($scope, $http, $rootScope, $state, $modal, $timeout, AssetsManegeRooms, baseUrl, Upload) {
	if($rootScope.selectTreeNode) $rootScope.selectTreeNode($state.params);

	$scope.inputSearch = {
		Code:'',
		name:''
	};

	/*pagination and search start*/
	$scope.searchCode=null;
	$scope.searchName=null;
	$scope.search=function(code,name){
		var reg1 = /^\w+$/;
		var reg2 = /[\u4e00-\u9fa5]/;
		var newcode = code.replace(/\-/g,'');
		if(!reg1.test(newcode) && !!newcode){
			alert('编号请勿输入除“-”、“_”以外的特殊字符和中文！');
			return;
		}
		var newname = name.replace(/[\u4e00-\u9fa5]/g,'').replace(/\-/g,'');
		if(!reg1.test(newname) && !!newname){
			alert('名称请勿输入除“-”、“_”以外的特殊字符！');
			return;
		}
		$scope.searchCode = code;
		$scope.searchName = name;
		$scope.pageConf.currentPage = 1;
	}
	$scope.keyup = function(e,search){
        var keycode = window.event?e.keyCode:e.which;
        if(keycode==13){
            $scope.search(search.Code,search.name);
        }
    };
	/*pagination start*/
	$scope.pgCtrl = paginationCtrl = {};
	AssetsManegeRooms.query({firstResult:0,currentPage:1,maxResult:15},function(res){
	 	$scope.rooms = res;
		$scope.pageConf = {
	        total : $scope.rooms.size,// 总条数
	        currentPage : 1,// 当前页
	        itemPageLimit : 15,// 一页展示多少条
	    }
	    // 监控你的页码 ， 发生改变既请求
	    $scope.$watch('pageConf.currentPage + pageConf.itemPageLimit + searchCode + searchName' , function(news){
	    	if(!$scope.notFirst){
	    		$scope.notFirst = true;
	    		return;
	    	}
			// 把你的http请求放到这里  }
			$scope.ISsearching = true;
			$scope.rooms = AssetsManegeRooms.query({firstResult:($scope.pageConf.currentPage-1)*$scope.pageConf.itemPageLimit,currentPage:$scope.pageConf.currentPage,maxResult:$scope.pageConf.itemPageLimit,roomCode:$scope.searchCode,name:$scope.searchName},function(res){
				$scope.pgCtrl.rebuild();
				$scope.pageConf.total = res.size;
				$scope.ISsearching = false;
			});
	    })
	});
	/*pagination end*/

	$scope.edit = function(pid){
		$modal.open({
	        templateUrl:'modules/assetsmanage/roomEditModal.html',
	        controller: 'assetsRoomsEditModalCtrl',
	        backdrop:'static',
	        resolve:{
            	Pid:function(){return pid},
            	callback:function(){
            		return function(record){
            			$scope.rooms.data = $.each($scope.rooms.data,function(index,data){
            				if(data.id == record.id) $scope.rooms.data[index] = record;
            			});
            			$rootScope.rebuildAssetsTree();
						//$state.reload();
            		}
            	}
            }
	    });
	}

	/*flie upload start*/
	$scope.invalidFiles = [];
	$scope.pattern = '.xls';
	$scope.acceptSelect = '.xls';
	$scope.duration = "$duration < 10000";
	$scope.modelOptionsObj = {debounce:100};
	$scope.$watch('files', function (files) {
    	$scope.formUpload = false;
	    if (files != null) {
	      if (!angular.isArray(files)) {
	        $timeout(function () {
	          $scope.files = files = [files];
	        });
	        return;
	      }
	      for (var i = 0; i < files.length; i++) {
	        Upload.imageDimensions(files[i]).then(function (d) {
	          $scope.d = d;
	        });
	        $scope.errorMsg = null;
	        (function (f) {
	          $scope.upload(f, true);
	        })(files[i]);
	      }
	    }
	});
	$scope.upload = function(file, resumable) {
	    $scope.errorMsg = null;
	    uploadNow(file);
	};
	function uploadNow(file) {
		$rootScope.showLoading = true;
		Upload.upload({
            url: baseUrl+'/rooms/import',
            data: {},
            file: file
        }).progress(function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progess:' + progressPercentage + '%' + evt.config.file.name);
        }).success(function (data, status, headers, config) {
            alert('导入成功!');
            $rootScope.showLoading = false;
            $state.reload();
            //$scope.reload();
        }).error(function (data, status, headers, config) {
        	alert(data.exception);
        	$rootScope.showLoading = false;
        });
	}
	/*flie upload end*/

})
.controller('assetsRoomsEditModalCtrl', function($scope, Pid, callback, $modal, baseUrl, fileUrl, Upload, $modalInstance, Datacenters, AssetsManegeRooms) {
	Datacenters.query(function(res){
		$scope.datacenters = res;
		$scope.changeDatacenter();
	});
    $scope.fileUrl = fileUrl;

	$scope.changeDatacenter = function(){
		$.each($scope.datacenters.data,function(index,val){
			if(val.id==$scope.roomOptions.dcId){
				$scope.roomOptions.dcName = val.name;
			}
		})
	}

	$scope.roomOptions = AssetsManegeRooms.get({id:Pid},function(data){
		$scope.oldImage = data.image;
	});

	$scope.update_action = function(){
		$scope.submitStart = true;
		$scope.Required = $scope.roomOptions.roomCode==''||$scope.roomOptions.name==''||$scope.roomOptions.dcId==''||$scope.roomOptions.city==''||$scope.roomOptions.roomArea=='';
		if($scope.Required){
			$scope.submitStart = false;
			return;
		}
		var reg1 = /^\w+$/;
		var name = $scope.roomOptions.name.replace(/[\u4e00-\u9fa5]/g,'').replace(/\-/g,'');
		if(!reg1.test(name) && !!name){
			alert('名称请勿输入除“-”、“_”以外的特殊字符！');
			$scope.submitStart = false;
			return;
		}
		if($scope.roomOptions.telephone && $scope.roomOptions.telephone.length>0){
			if($scope.roomOptions.telephone.length!=7 && $scope.roomOptions.telephone.length!=8 && $scope.roomOptions.telephone.length!=11 && $scope.roomOptions.telephone.length!=12){
				alert('请输入规范的责任人电话位数(7位、8位、11位、12位)！');
				$scope.submitStart = false;
				return;
			}
		}
		
		$scope.roomOptions.$update(function(record){
			$scope.roomOptions = record;
			callback(record);
			$scope.close();
		},function(err){
			alert(err.data.exception);
			$scope.submitStart = false;
		})
	}

	$scope.close = function(){
		$modalInstance.close();
	}

	/*flie upload start*/
	$scope.picFile = null;
	$scope.invalidFiles = [];
	$scope.pattern = 'image/*';
	$scope.acceptSelect = 'image/*';
	$scope.duration = "$duration < 10000";
	$scope.modelOptionsObj = {debounce:100};
	$scope.uploadPic = function (file) {
	    if (file != null) {
			var type = file.type.split("/")[0];
			if(type!="image"){
				alert("只能上传图片文件！")
				return;
			}
		    $scope.formUpload = true;
		    $scope.upload(file);
	    }
	};
	$scope.upload = function(file, resumable) {
	    $scope.errorMsg = null;
	    uploadNow(file);
	};
	function uploadNow(file) {
		$scope.progressPercentage = 0;
		Upload.upload({
            url: baseUrl+'/upload',
            data: {
            	type:"room"
        	},
            file: file
        }).progress(function (evt) {
            $scope.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        }).success(function (data, status, headers, config) {
        	$scope.roomOptions.image = data.realFilepath;
        	$scope.imgPreview = true;
        	alert('上传成功!');
        }).error(function (data, status, headers, config) {
        	alert(data.exception);
        });
	}
	/*flie upload end*/

})

.controller('assetsFloorsCtrl', function($scope, $rootScope, $modal, $state, $timeout, AssetsManegeRooms, AssetsManegeFloors, baseUrl, Upload) {
	if($rootScope.selectTreeNode) $rootScope.selectTreeNode($state.params);
	$scope.room = AssetsManegeRooms.get({id:$state.params.roomId});

	$scope.inputSearch = {
		Code:'',
		name:''
	};

	/*pagination and search start*/
	$scope.searchCode=null;
	$scope.searchName=null;
	$scope.search=function(code,name){
		var reg1 = /^\w+$/;
		var reg2 = /[\u4e00-\u9fa5]/;
		var newcode = code.replace(/\-/g,'');
		if(!reg1.test(newcode) && !!newcode){
			alert('编号请勿输入除“-”、“_”以外的特殊字符和中文！');
			return;
		}
		var newname = name.replace(/[\u4e00-\u9fa5]/g,'').replace(/\-/g,'');
		if(!reg1.test(newname) && !!newname){
			alert('名称请勿输入除“-”、“_”以外的特殊字符！');
			return;
		}
		$scope.searchCode = code;
		$scope.searchName = name;
		$scope.pageConf.currentPage = 1;
	}
	$scope.keyup = function(e,search){
        var keycode = window.event?e.keyCode:e.which;
        if(keycode==13){
            $scope.search(search.Code,search.name);
        }
    };
	$scope.pgCtrl = paginationCtrl = {};
	AssetsManegeFloors.query({firstResult:0,currentPage:1,maxResult:15,roomId:$state.params.roomId},function(res){

	 	$scope.floors = res;
		$scope.pageConf = {
	        total : $scope.floors.size,// 总条数
	        currentPage : 1,// 当前页
	        itemPageLimit : 15,// 一页展示多少条
	    }
	    // 监控你的页码 ， 发生改变既请求
	    $scope.$watch('pageConf.currentPage + pageConf.itemPageLimit + searchCode + searchName' , function(news){
	    	if(!$scope.notFirst){
	    		$scope.notFirst = true;
	    		return;
	    	}
			// 把你的http请求放到这里  }
			$scope.ISsearching = true;
			$scope.floors = AssetsManegeFloors.query({firstResult:($scope.pageConf.currentPage-1)*$scope.pageConf.itemPageLimit,currentPage:$scope.pageConf.currentPage,maxResult:$scope.pageConf.itemPageLimit,roomId:$state.params.roomId,floorCode:$scope.searchCode,name:$scope.searchName},function(res){
				if($scope.pgCtrl.rebuild){
					$scope.pgCtrl.rebuild();
				}
				$scope.pageConf.total = res.size;
				$scope.ISsearching = false;
			});
	    })
	});
	/*pagination and search end*/

	/*flie upload start*/
	$scope.invalidFiles = [];
	$scope.pattern = '.xls';
	$scope.acceptSelect = '.xls';
	$scope.duration = "$duration < 10000";
	$scope.modelOptionsObj = {debounce:100};
	$scope.$watch('files', function (files) {
    	$scope.formUpload = false;
	    if (files != null) {
	      if (!angular.isArray(files)) {
	        $timeout(function () {
	          $scope.files = files = [files];
	        });
	        return;
	      }
	      for (var i = 0; i < files.length; i++) {
	        Upload.imageDimensions(files[i]).then(function (d) {
	          $scope.d = d;
	        });
	        $scope.errorMsg = null;
	        (function (f) {
	          $scope.upload(f, true);
	        })(files[i]);
	      }
	    }
	});
	$scope.upload = function(file, resumable) {
	    $scope.errorMsg = null;
	    uploadNow(file);
	};
	function uploadNow(file) {
		$rootScope.showLoading = true;
		Upload.upload({
            url: baseUrl+'/floors/import',
            data: {},
            file: file
        }).progress(function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progess:' + progressPercentage + '%' + evt.config.file.name);
        }).success(function (data, status, headers, config) {
        	alert('导入成功!');
            $state.reload();
            $rootScope.showLoading = false;
        }).error(function (data, status, headers, config) {
        	alert(data.exception);
        	$rootScope.showLoading = false;
        });
	}
	/*flie upload end*/

	$scope.edit = function(pid){
		$modal.open({
	        templateUrl:'modules/assetsmanage/floorEditModal.html',
	        controller: 'assetsFloorsEditModalCtrl',
	        backdrop:'static',
	        resolve:{
            	Pid:function(){return pid},
            	callback:function(){
            		return function(record){
            			$scope.floors.data = $.each($scope.floors.data,function(index,data){
            				if(data.id == record.id) $scope.floors.data[index] = record;
            			});
            			$rootScope.rebuildAssetsTree();
						//$state.reload();
            		}
            	}
            }
	    });
	}
})
.controller('assetsFloorsEditModalCtrl', function($scope, Pid, callback, baseUrl, $modalInstance, AssetsManegeFloors) {
	$scope.floorOptions = AssetsManegeFloors.get({id:Pid});

	$scope.close = function(){
		$modalInstance.close();
	}

	$scope.update_action = function(){
		$scope.submitStart = true;
		$scope.Required = $scope.floorOptions.name==''||$scope.floorOptions.area==''||$scope.floorOptions.volum==''||$scope.floorOptions.maxRow==''||$scope.floorOptions.maxColumn=='';
		if($scope.Required){
			$scope.submitStart = false;
			return;
		}
		var reg1 = /^\w+$/;
		var name = $scope.floorOptions.name.replace(/[\u4e00-\u9fa5]/g,'').replace(/\-/g,'');
		if(!reg1.test(name) && !!name){
			alert('名称请勿输入除“-”、“_”以外的特殊字符！');
			$scope.submitStart = false;
			return;
		}
		if($scope.floorOptions.telephone && $scope.floorOptions.telephone.length>0){
			if($scope.floorOptions.telephone.length!=7 && $scope.floorOptions.telephone.length!=8 && $scope.floorOptions.telephone.length!=11 && $scope.floorOptions.telephone.length!=12){
				alert('请输入规范的责任人电话位数(7位、8位、11位、12位)！');
				$scope.submitStart = false;
				return;
			}
		}
		
		$scope.floorOptions.$update(function(record){
			$scope.floorOptions = record;
			callback(record);
			$scope.close();
		},function(err){
			alert(err.data.exception);
			$scope.submitStart = false;
		})
	}
})

.controller('assetsRacksCtrl', function($scope, $http, $rootScope, $state, $modal, $timeout, AssetsManegeFloors, AssetsManegeRacks, baseUrl, fileUrl, Upload) {
	if($rootScope.selectTreeNode) $rootScope.selectTreeNode($state.params);
	
	$scope.inputSearch = {
		Code:'',
		name:''
	};

	/*pagination and search start*/
	$scope.searchCode=null;
	$scope.searchName=null;
	$scope.search=function(code,name){
		var reg1 = /^\w+$/;
		var reg2 = /[\u4e00-\u9fa5]/;
		var newcode = code.replace(/\-/g,'');
		if(!reg1.test(newcode) && !!newcode){
			alert('编号请勿输入除“-”、“_”以外的特殊字符和中文！');
			return;
		}
		var newname = name.replace(/[\u4e00-\u9fa5]/g,'').replace(/\-/g,'');
		if(!reg1.test(newname) && !!newname){
			alert('名称请勿输入除“-”、“_”以外的特殊字符！');
			return;
		}
		$scope.searchCode = code;
		$scope.searchName = name;
		$scope.pageConf.currentPage = 1;
	}
	$scope.keyup = function(e,search){
        var keycode = window.event?e.keyCode:e.which;
        if(keycode==13){
            $scope.search(search.Code,search.name);
        }
    };
	$scope.reload = function(){
		if(!$scope.notFirst) return;
		// 把你的http请求放到这里  }
		$scope.ISsearching = true;
		$scope.racks = AssetsManegeRacks.query({firstResult:($scope.pageConf.currentPage-1)*$scope.pageConf.itemPageLimit,currentPage:$scope.pageConf.currentPage,maxResult:$scope.pageConf.itemPageLimit,roomId:$state.params.roomId,floorId:$state.params.floorId,rackCode:$scope.searchCode,name:$scope.searchName},function(res){
			if($scope.pgCtrl.rebuild){
				$scope.pgCtrl.rebuild();
			}
			$scope.pageConf.total = res.size;
			$scope.ISsearching = false;
		});
	}
	$scope.pgCtrl = paginationCtrl = {};
	AssetsManegeRacks.query({firstResult:0,currentPage:1,maxResult:15,roomId:$state.params.roomId,floorId:$state.params.floorId},function(res){
	 	$scope.racks = res;
		$scope.pageConf = {
	        total : $scope.racks.size,// 总条数
	        currentPage : 1,// 当前页
	        itemPageLimit : 15,// 一页展示多少条
	    }
	    // 监控你的页码 ， 发生改变既请求
	    $scope.$watch('pageConf.currentPage + pageConf.itemPageLimit + searchCode + searchName' , function(news){
			$scope.reload();
			$scope.notFirst = true;
	    })
	});
	/*pagination and search end*/

	/*flie upload start*/
	$scope.invalidFiles = [];
	$scope.pattern = '.xls';
	$scope.acceptSelect = '.xls';
	$scope.duration = "$duration < 10000";
	$scope.modelOptionsObj = {debounce:100};

	$scope.$watch('files', function (files) {
    	$scope.formUpload = false;
	    if (files != null) {
	      if (!angular.isArray(files)) {
	        $timeout(function () {
	          $scope.files = files = [files];
	        });
	        return;
	      }
	      for (var i = 0; i < files.length; i++) {
	        Upload.imageDimensions(files[i]).then(function (d) {
	          $scope.d = d;
	        });
	        $scope.errorMsg = null;
	        (function (f) {
	          $scope.upload(f, true);
	        })(files[i]);
	      }
	    }
	});
	$scope.upload = function(file, resumable) {
	    $scope.errorMsg = null;
	    uploadNow(file);
	};
	function uploadNow(file) {
		$rootScope.showLoading = true;
		Upload.upload({
            url: baseUrl+'/racks/import',
            data: {},
            file: file
        }).progress(function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progess:' + progressPercentage + '%' + evt.config.file.name);
        }).success(function (data, status, headers, config) {
            alert('导入成功！');
            $state.reload();
            $rootScope.showLoading = false;
        }).error(function (data, status, headers, config) {
        	alert(data.exception);
        	$rootScope.showLoading = false;
        });
	}
	/*flie upload end*/

	function reload(){
		var floor = 1;
		var result = [];
		$scope.columns = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
		AssetsManegeFloors.get({id:$state.params.floorId},function(data){
			$http.get(fileUrl+data.floorJsonFilepath).success(function(jsons){

				//$scope.columns = columns.slice(0,data[0].S_positonY.length-1);
				$scope.columns.unshift('');
				$scope.columns.push('');
				for(var i=0; i<jsons[0].S_positonX.length-1; i++){ 
					result[i] = [];
					for(var j=0; j<$scope.columns.length-2; j++){ 
						result[i][j] = {}
					}
				}
				AssetsManegeRacks.query({firstResult:0,currentPage:1,maxResult:999,roomId:$state.params.roomId,floorId:$state.params.floorId},function(resour){
					for(var k=0; k<resour.data.length; k++){
						if(!resour.data[k].rackTypeId) resour.data[k].rackTypeId = 1;
						result[resour.data[k].physicalx-1][resour.data[k].physicaly-1] = resour.data[k];
					}
					$scope.JiguiList = result;
				})
			})
		})
	}
	reload();

	$scope.addRacks = function(){
		$modal.open({
	        templateUrl:'modules/assetsmanage/racksAddModal.html',
	        controller: 'assetsRacksAddModalCtrl',
	        backdrop:'static',
	        resolve:{
            	callback:function(){
            		return function(){
            			$state.reload();
            		}
            	}
            }
	    });
	}
	$scope.edit = function(pid){
		$modal.open({
	        templateUrl:'modules/assetsmanage/racksEditModal.html',
	        controller: 'assetsRacksEditModalCtrl',
	        backdrop:'static',
	        resolve:{
            	Pid:function(){return pid},
            	callback:function(){
            		return function(record){
            			$scope.racks.data = $.each($scope.racks.data,function(index,data){
            				if(data.id == record.id) $scope.racks.data[index] = record;
            			});
            			$rootScope.rebuildAssetsTree();
						//$state.reload();
            		}
            	}
            }
	    });
	}
	$scope.del = function(id){
		if(confirm("确定要删除吗？"))
		{
			AssetsManegeRacks.del({id:id},function(){
				alert('删除成功！');
				$state.reload();
			},function(err){
				if(err.data.exception){
					alert(err.data.exception);
				}else{
					alert('删除失败！')
				}
				$state.reload();
			});
		}
	}

})
.controller('assetsRacksAddModalCtrl', function($scope, callback, $state, $modalInstance, AssetsManegeFloors, AssetsManegeRacks) {
	$scope.rackOptions={
		rackTypeName:'设备柜'
	}
	AssetsManegeFloors.get({id:$state.params.floorId},function(data){
		var maxRow = data.maxRow;
		var maxColumn = data.maxColumn;
		var Rows = [];
		for(var i=0;i<maxRow;i++){
			Rows.push(i+1);
		}
		$scope.Rows = Rows;
		var Columns = [];
		for(var i=0;i<maxColumn;i++){
			Columns.push(i+1);
		}
		$scope.Columns = Columns;
	});

	$scope.rackOptions = {
		roomId:$state.params.roomId,
		floorId:$state.params.floorId,
		rackTypeId:1,
		rackTypeName:"设备柜",
		rackCode:'',
		name:'',
		manufacturer:'',
		rackModel:'',
		physicalx:'',
		physicaly:'',
		rackUNum:'',
		rackPower:''
	};

	$scope.close = function(){
		$modalInstance.close();
	}

	$scope.add_action = function(){
		$scope.submitStart = true;
		$scope.Required = $scope.rackOptions.rackCode==''||$scope.rackOptions.name==''||$scope.rackOptions.manufacturer==''||$scope.rackOptions.rackModel==''||$scope.rackOptions.physicalx==''||$scope.rackOptions.physicaly==''||$scope.rackOptions.rackUNum==''||$scope.rackOptions.rackPower==''; 
		if($scope.Required){
			$scope.submitStart = false;
			return;
		}
		var reg1 = /^\w+$/;
		var reg2 = /[\u4e00-\u9fa5]/;
		var code = $scope.rackOptions.rackCode.replace(/\-/g,'');
		if(!reg1.test(code) && !!code){
			alert('编号请勿输入除“-”、“_”以外的特殊字符和中文！');
			$scope.submitStart = false;
			return;
		}
		var name = $scope.rackOptions.name.replace(/[\u4e00-\u9fa5]/g,'').replace(/\-/g,'');
		if(!reg1.test(name) && !!name){
			alert('名称请勿输入除“-”、“_”以外的特殊字符！');
			$scope.submitStart = false;
			return;
		}
		AssetsManegeRacks.add($scope.rackOptions,function(record){
			$scope.close();
			callback()
		},function(err){
			alert(err.data.exception);
			$scope.submitStart = false;
		})
	}
})
.controller('assetsRacksEditModalCtrl', function($scope, Pid, callback, $state, $modalInstance, AssetsManegeFloors, AssetsManegeRacks) {
	$scope.rackOptions = AssetsManegeRacks.get({id:Pid});

	AssetsManegeFloors.get({id:$state.params.floorId},function(data){
		var maxRow = data.maxRow;
		var maxColumn = data.maxColumn;
		var Rows = [];
		for(var i=0;i<maxRow;i++){
			Rows.push(i+1);
		}
		$scope.Rows = Rows;
		var Columns = [];
		for(var i=0;i<maxColumn;i++){
			Columns.push(i+1);
		}
		$scope.Columns = Columns;
	});

	$scope.close = function(){
		$modalInstance.close();
	}

	$scope.update_action = function(){
		$scope.submitStart = true;
		$scope.Required = $scope.rackOptions.rackCode==''||$scope.rackOptions.name==''||$scope.rackOptions.manufacturer==''||$scope.rackOptions.rackModel==''||$scope.rackOptions.physicalx==''||$scope.rackOptions.physicaly==''||$scope.rackOptions.rackUNum==''||$scope.rackOptions.rackPower=='';
		if($scope.Required){
			$scope.submitStart = false;
			return;
		}
		var reg1 = /^\w+$/;
		var reg2 = /[\u4e00-\u9fa5]/;
		var code = $scope.rackOptions.rackCode.replace(/\-/g,'');
		if(!reg1.test(code) && !!code){
			alert('编号请勿输入除“-”、“_”以外的特殊字符和中文！');
			$scope.submitStart = false;
			return;
		}
		var name = $scope.rackOptions.name.replace(/[\u4e00-\u9fa5]/g,'').replace(/\-/g,'');
		if(!reg1.test(name) && !!name){
			alert('名称请勿输入除“-”、“_”以外的特殊字符！');
			$scope.submitStart = false;
			return;
		}
		$scope.rackOptions.$update(function(record){
			$scope.rackOptions = record;
			callback(record);
			$scope.close();
		},function(err){
			alert(err.data.exception);
			$scope.submitStart = false;
		})
	}
})

.controller('assetsDevicesCtrl', function($scope, $modal, $rootScope, $state) {
	if($rootScope.selectTreeNode) $rootScope.selectTreeNode($state.params);

	$scope.deviceList = true;
	$scope.showDeviceType = function(){
		$scope.deviceType = true;
		$scope.deviceList = false;
	}
	$scope.hideDeviceType = function(){
		$scope.deviceType = false;
		$scope.deviceList = true;
	}
	$scope.showFreeLabel = function(typeId){
		$scope.deviceTypeId = typeId;
		$scope.freeLabel = true;
		$scope.deviceType = false;
	}
	$scope.hideFreeLabel = function(){
		$scope.freeLabel = false;
		$scope.deviceType = true;
	}

})
.controller('devicesListCtrl', function($scope, $modal, $timeout, $state, $rootScope, AssetsManegeDevices, baseUrl, Upload) {

	$scope.inputSearch = {
		Code:'',
		name:''
	};

	/*pagination and search start*/
	$scope.searchCode=null;
	$scope.searchName=null;
	$scope.search=function(code,name){
		var reg1 = /^\w+$/;
		var reg2 = /[\u4e00-\u9fa5]/;
		var newcode = code.replace(/\-/g,'');
		if(!reg1.test(newcode) && !!newcode){
			alert('编号请勿输入除“-”、“_”以外的特殊字符和中文！');
			return;
		}
		var newname = name.replace(/[\u4e00-\u9fa5]/g,'').replace(/\-/g,'');
		if(!reg1.test(newname) && !!newname){
			alert('名称请勿输入除“-”、“_”以外的特殊字符！');
			return;
		}
		$scope.searchCode = code;
		$scope.searchName = name;
		$scope.pageConf.currentPage = 1;
	}
	$scope.keyup = function(e,search){
        var keycode = window.event?e.keyCode:e.which;
        if(keycode==13){
            $scope.search(search.Code,search.name);
        }
    };
	$scope.pgCtrl = paginationCtrl = {};
	$scope.reload = function(){
		if(!$scope.notFirst) return;
		// 把你的http请求放到这里  }
		$scope.ISsearching = true;
		$scope.devices = AssetsManegeDevices.query({firstResult:($scope.pageConf.currentPage-1)*$scope.pageConf.itemPageLimit,currentPage:$scope.pageConf.currentPage,maxResult:$scope.pageConf.itemPageLimit,roomId:$state.params.roomId,floorId:$state.params.floorId,rackId:$state.params.rackId,deviceCode:$scope.searchCode,name:$scope.searchName},function(res){
			if($scope.pgCtrl.rebuild){
				$scope.pgCtrl.rebuild();
			}
			$scope.pageConf.total = res.size;
			$scope.ISsearching = false;
		});
	}
	AssetsManegeDevices.query({firstResult:0,currentPage:1,maxResult:15,roomId:$state.params.roomId,floorId:$state.params.floorId,rackId:$state.params.rackId},function(res){
	 	$scope.devices = res;
		$scope.pageConf = {
	        total : $scope.devices.size,// 总条数
	        currentPage : 1,// 当前页
	        itemPageLimit : 15,// 一页展示多少条
	    }
	    // 监控你的页码 ， 发生改变既请求
	    $scope.$watch('pageConf.currentPage + pageConf.itemPageLimit + searchCode + searchName' , function(news){
	        $scope.reload();
	        $scope.notFirst = true;
	    })
	});
	/*pagination and search end*/

	$scope.add = function(id){
		$modal.open({
	        templateUrl:'modules/assetsmanage/deviceAddModal.html',
	        controller: 'assetsDeviceAddModalCtrl',
	        backdrop:'static',
	        resolve:{
		        callback:function(){
		        	return function(){
		        		$scope.reload();
		        	}
		        }
		    }
	    });
	}
	$scope.edit = function(id){
		$modal.open({
	        templateUrl:'modules/assetsmanage/deviceEditModal.html',
	        controller: 'assetsDeviceEditModalCtrl',
	        backdrop:'static',
	        resolve:{
	        	pid:function(){return id},
		        callback:function(){
		        	return function(record){
            			$scope.devices.data = $.each($scope.devices.data,function(index,data){
            				if(data.id == record.id) $scope.devices.data[index] = record;
            			})
            		}
		        }
		    }
	    });
	}
	$scope.del = function(id){
		if(confirm("确定要删除吗？"))
		{
			AssetsManegeDevices.del({id:id},function(){
				alert('删除成功！');
				$scope.reload();
			},function(err){
				if(err.data.exception){
					alert(err.data.exception);
				}else{
					alert('删除失败！')
				}
				$scope.reload();
			});
		}
	}

	/*flie upload start*/
	$scope.invalidFiles = [];
	$scope.pattern = '.xls';
	$scope.acceptSelect = '.xls';
	$scope.duration = "$duration < 10000";
	$scope.modelOptionsObj = {debounce:100};
	$scope.$watch('files', function (files) {
    	$scope.formUpload = false;
	    if (files != null) {
	      if (!angular.isArray(files)) {
	        $timeout(function () {
	          $scope.files = files = [files];
	        });
	        return;
	      }
	      for (var i = 0; i < files.length; i++) {
	        Upload.imageDimensions(files[i]).then(function (d) {
	          $scope.d = d;
	        });
	        $scope.errorMsg = null;
	        (function (f) {
	          $scope.upload(f, true);
	        })(files[i]);
	      }
	    }
	});
	$scope.upload = function(file, resumable) {
	    $scope.errorMsg = null;
	    uploadNow(file);
	};
	function uploadNow(file) {
		$rootScope.showLoading = true;
		Upload.upload({
            url: baseUrl+'/devices/import',
            data: {},
            file: file
        }).progress(function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progess:' + progressPercentage + '%' + evt.config.file.name);
        }).success(function (data, status, headers, config) {
            alert('导入成功！');
            $scope.reload();
            $rootScope.showLoading = false;
        }).error(function (data, status, headers, config) {
        	alert(data.exception);
        	$rootScope.showLoading = false;
        });
	}
	/*flie upload end*/
})
.controller('assetsDeviceAddModalCtrl', function($scope, callback, $state, $modal, $modalInstance, AssetsManegeRooms, AssetsManegeFloors, AssetsManegeRacks, AssetsManegeRoomFloors, AssetsManegeFloorRacks, AssetsManegeDevices, AssetsManegeDevicesType, AssetsManegeFreeLabel) {
	$scope.deviceOptions = {
		deviceCode:'',
		name:'',
		deviceSn:'',
		deviceTypeId:'',
		isInCloud:'',
		roomId:$state.params.roomId||'',
		floorId:$state.params.floorId||'',
		rackId:$state.params.rackId||'',
		endU:'',
		ip:'',
		projectName:'',
		hostId:''
	}
	$scope.rooms = AssetsManegeRooms.get();
	$scope.floors = $state.params.roomId ? AssetsManegeRoomFloors.query({id:$state.params.roomId}) : null;
	$scope.racks = $state.params.floorId ? AssetsManegeFloorRacks.query({id:$state.params.floorId}) : null;
	$scope.thisroom = AssetsManegeRooms.get({id:$state.params.roomId});
	$scope.deviceTypes = AssetsManegeDevicesType.query();
	if($state.params.rackId){
		$scope.devices = AssetsManegeDevices.query({roomId:$state.params.roomId,floorId:$state.params.floorId,rackId:$state.params.rackId});
	}

	$scope.close = function(){
		$modalInstance.close();
	}
	$scope.changeType = function(id){
		$scope.deviceOptions.beginU = '';
		$scope.deviceOptions.endU = '';
		AssetsManegeFreeLabel.query({deviceTypeId:id},function(res){
			$scope.freeLabels = res.data;
			var arr = [];
			for(var i=0;i<res.data.length;i++){
				if($scope.freeLabels[i].type=='select'){
					$scope.freeLabels[i].enums = $scope.freeLabels[i].enums.split(',');
				}
				arr.push('');
			}
			$scope.freeLabelKeyValue = arr;
		})
		$.each($scope.deviceTypes.data,function(index,val){
			if(val.id == id){
				$scope.uNumber = parseInt(val.uNumber);
				$scope.deviceOptions.deviceTypeName = val.name;
				if(val.hasChildType=='Y'){
					$scope.selectBlade = false;
					$scope.deviceOptions.parentId = null;
				}else{
					$scope.selectBlade = true;
				}
			}
		});
		if($scope.availableU) $scope.showU = true;
	}
	$scope.selectedDX = function(id){
		if(id){
			$scope.showU = false;
		}else{
			$scope.showU = true;
		}
	}
	var endUs = '';
	$scope.changeBeginU = function(){
		if($scope.deviceOptions.deviceTypeId==''){
			alert('请先选择设备类型！');
			$scope.deviceOptions.beginU = '';
			return;
		}
		var hasEndU = false;
		for(var i=0;i<$scope.availableU.length;i++){
			if($scope.availableU[i]==parseInt($scope.deviceOptions.beginU)+$scope.uNumber){
				endUs = $scope.availableU[i];
				hasEndU = true;
			};
		}
		if(!hasEndU){
			alert('此处U位不足！');
			$scope.deviceOptions.beginU = '';
			$scope.deviceOptions.endU = '';
			return;
		}
		$scope.deviceOptions.endU = endUs;
	}
	$scope.changeRoom = function(id){
		$scope.RoomHasChange = true;
		$scope.FloorHasChange = false;
		$scope.floors = null;
		$scope.racks = null;
		$scope.floors = AssetsManegeRoomFloors.query({id:id});
		AssetsManegeRooms.get({id:id},function(res){
			$scope.thisroom = res;
			$scope.deviceOptions.roomName = res.name;
		});
	}
	$scope.changeFloor = function(id){
		$scope.FloorHasChange = true;
		$scope.racks = null;
		$scope.racks = AssetsManegeFloorRacks.query({id:id});
		AssetsManegeFloors.get({id:id},function(res){
			$scope.deviceOptions.floorName = res.name;
		});
	}
	$scope.changeRack = function(id){
		$scope.deviceOptions.beginU = '';
		$scope.deviceOptions.endU = '';
		AssetsManegeRacks.get({id:id},function(res){
			$scope.deviceOptions.rackName = res.name;
			
			var freeU = res.availableU.split(",");
			var beginUs = [];
			$.each(freeU,function(index,val){
				freeU[index]=parseInt(val);
				beginUs.push(parseInt(val));
			});
			$scope.availableU = freeU;
			beginUs.pop();
			$scope.beginUs = beginUs;
			if($scope.availableU&&!$scope.deviceOptions.parentId) $scope.showU = true;
		});
		$scope.devices = AssetsManegeDevices.query({firstResult:0,currentPage:1,maxResult:15,roomId:$scope.deviceOptions.roomId,floorId:$scope.deviceOptions.floorId,rackId:$scope.deviceOptions.rackId});
	}
	if($state.params.rackId) $scope.changeRack($state.params.rackId);

	$scope.add_action = function(){
		$scope.submitStart = true;
		$scope.Required = $scope.deviceOptions.deviceCode==''||$scope.deviceOptions.name==''||$scope.deviceOptions.deviceSn==''||$scope.deviceOptions.deviceTypeId==''||$scope.deviceOptions.isInCloud==''||$scope.deviceOptions.roomId==''||$scope.deviceOptions.floorId==''||$scope.deviceOptions.rackId=='';
		if(!$scope.Required){
			if($scope.showU && $scope.deviceOptions.endU=='') $scope.Required = true;
			$.each($scope.freeLabels,function(index,val){
				if(val.isMust=='Y'){
					if($scope.freeLabelKeyValue[index]=='') $scope.Required = true;
				}
			})
		}
		if($scope.Required){
			$scope.submitStart = false;
			return;
		}
		
		var reg1 = /^\w+$/;
		var reg2 = /[\u4e00-\u9fa5]/;
		var code = $scope.deviceOptions.deviceCode.replace(/\-/g,'');
		if(!reg1.test(code) && !!code){
			alert('编号请勿输入除“-”、“_”以外的特殊字符和中文！');
			$scope.submitStart = false;
			return;
		}
		var name = $scope.deviceOptions.name.replace(/[\u4e00-\u9fa5]/g,'').replace(/\-/g,'');
		if(!reg1.test(name) && !!name){
			alert('名称请勿输入除“-”、“_”以外的特殊字符！');
			$scope.submitStart = false;
			return;
		}
		if($scope.deviceOptions.telephone && $scope.deviceOptions.telephone.length>0){
			if($scope.deviceOptions.telephone.length!=7 && $scope.deviceOptions.telephone.length!=8 && $scope.deviceOptions.telephone.length!=11 && $scope.deviceOptions.telephone.length!=12){
				alert('请输入规范的责任人电话位数(7位、8位、11位、12位)！');
				$scope.submitStart = false;
				return;
			}
		}
		if(!$scope.Required&&!!$scope.deviceOptions.ip){
			var re =  /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/  
			if(!re.test($scope.deviceOptions.ip)){  
				$scope.submitStart = false;
				$scope.IpNotRight = true;
				$scope.Required = true;
			    alert("ip地址格式不正确，请修改");  
			    return;  
			}
		}
		var strs="["
		$.each($scope.freeLabels,function(index,val){
			strs=strs+"{'key':'"+val.name+"','value':'"+$scope.freeLabelKeyValue[index]+"'}"
			if(index<$scope.freeLabels.length-1){
				strs=strs+","
			}
		});
		strs=strs+"]";
		$scope.deviceOptions.fieldValues = strs;
		AssetsManegeDevices.add($scope.deviceOptions,function(record){
			callback()
			$scope.close();
		},function(err){
			alert(err.data.exception);
			$scope.submitStart = false;
		})
	}
	$scope.clearHost = function(){
		$scope.deviceOptions.hostName = '';
		$scope.deviceOptions.hostId = '';
		$scope.deviceOptions.hostIp = '';
		$scope.deviceOptions.dcId = '';
		$scope.deviceOptions.hypervisor = '';
		$scope.deviceOptions.cpu = '';
		$scope.deviceOptions.memory = '';
		$scope.deviceOptions.disk = '';
		$scope.deviceOptions.ip = '';
	}
	$scope.clearProject = function(){
		$scope.deviceOptions.projectName = '';
	}
	$scope.showHostList = function(){
		$modal.open({
	        templateUrl:'modules/assetsmanage/select_host.html',
	        controller: 'assetsHostSelectCtrl',
	        backdrop:'static',
	        resolve:{
	        	dcId:function(){
	        		return $scope.thisroom.dcId;
	        	},
	        	hostId:function(){
	        		return $scope.deviceOptions.hostId;
	        	},
		        callback:function(){
		        	return function(host){
		        		$scope.deviceOptions.hostName = host.name;
		        		$scope.deviceOptions.hostId = host.id;
		        		$scope.deviceOptions.hostIp = host.ip;
		        		$scope.deviceOptions.dcId = host.dcId;
		        		$scope.deviceOptions.hypervisor = host.hypervisor;
		        		$scope.deviceOptions.cpu = host.cpu;
		        		$scope.deviceOptions.memory = host.memory;
		        		$scope.deviceOptions.disk = host.disk;
		        		$scope.deviceOptions.ip = host.ip;
		        	}
		        }
		    }
	    });
	}
	$scope.showBsnList = function(){
		$modal.open({
	        templateUrl:'modules/assetsmanage/select_bsn.html',
	        controller: 'assetsBsnSelectCtrl',
	        backdrop:'static',
	        resolve:{
	        	projectName:function(){
	        		return $scope.deviceOptions.projectName;
	        	},
		        callback:function(){
		        	return function(name){
		        		$scope.deviceOptions.projectName = name;
		        	}
		        }
		    }
	    });
	}
})
.controller('assetsHostSelectCtrl', function($scope, dcId, hostId, callback, $state, $modal, $modalInstance, AssetsManegeHosts){
	$scope.hostId = hostId;
	$scope.close = function(){
		$modalInstance.close();
	}

	$scope.inputSearch = {
		Code:'',
		name:''
	};

	/*pagination and search start*/
	$scope.searchCode=null;
	$scope.searchName=null;
	$scope.search=function(code,name){
		var reg1 = /^\w+$/;
		var reg2 = /[\u4e00-\u9fa5]/;
		var newcode = code.replace(/[\u4e00-\u9fa5]/g,'').replace(/\-/g,'');
		if(!reg1.test(newcode) && !!newcode){
			alert('名称请勿输入除“-”、“_”以外的特殊字符！');
			return;
		}
		var newname = name.replace(/[\u4e00-\u9fa5]/g,'').replace(/\-/g,'');
		if(!reg1.test(newname) && !!newname){
			alert('名称请勿输入除“-”、“_”以外的特殊字符！');
			return;
		}
		$scope.searchCode = code;
		$scope.searchName = name;
		$scope.pageConf.currentPage = 1;
	}
	$scope.keyup = function(e,search){
        var keycode = window.event?e.keyCode:e.which;
        if(keycode==13){
            $scope.search(search.Code,search.name);
        }
    };
    
	$scope.ISsearching = true;
	$scope.pgCtrl = paginationCtrl = {};
	$scope.reload = function(){
		if(!$scope.notFirst) return;
		// 把你的http请求放到这里  }
		$scope.ISsearching = true;
		$scope.hosts = AssetsManegeHosts.query({firstResult:($scope.pageConf.currentPage-1)*$scope.pageConf.itemPageLimit,currentPage:$scope.pageConf.currentPage,maxResult:$scope.pageConf.itemPageLimit,dcId:dcId,resPoolName:$scope.searchCode,name:$scope.searchName},function(res){
			if($scope.pgCtrl.rebuild){
				$scope.pgCtrl.rebuild();
			}
			$scope.pageConf.total = res.size;
			$scope.ISsearching = false;
		});
	}
	AssetsManegeHosts.query({firstResult:0,currentPage:1,maxResult:15,dcId:dcId},function(res){
		$scope.ISsearching = false;
	 	$scope.hosts = res;
		$scope.pageConf = {
	        total : $scope.hosts.size,// 总条数
	        currentPage : 1,// 当前页
	        itemPageLimit : 15,// 一页展示多少条
	    }
	    // 监控你的页码 ， 发生改变既请求
	    $scope.$watch('pageConf.currentPage + pageConf.itemPageLimit + searchCode + searchName' , function(news){
	        $scope.reload();
	        $scope.notFirst = true;
	    })
	});
	/*pagination and search end*/

	$scope.goSelect = function(host){
		$scope.hostObj = host;
	}
	$scope.add_action = function(){
		if($scope.hostObj){
			callback($scope.hostObj);
			$scope.close();
		}else{
			alert('请先选择一台物理主机！')
		}
		
	}
})
.controller('assetsBsnSelectCtrl', function($scope, projectName, callback, $state, $modal, $modalInstance, AssetsManegeProjects){
	$scope.projectName = projectName;
	$scope.close = function(){
		$modalInstance.close();
	}

	$scope.inputSearch = {
		Code:'',
		name:''
	};

	/*pagination and search start*/
	$scope.searchCode=null;
	$scope.searchName=null;
	$scope.search=function(code,name){
		var reg1 = /^\w+$/;
		var reg2 = /[\u4e00-\u9fa5]/;
		var newcode = code.replace(/[\u4e00-\u9fa5]/g,'').replace(/\-/g,'');
		if(!reg1.test(newcode) && !!newcode){
			alert('名称请勿输入除“-”、“_”以外的特殊字符！');
			return;
		}
		var newname = name.replace(/[\u4e00-\u9fa5]/g,'').replace(/\-/g,'');
		if(!reg1.test(newname) && !!newname){
			alert('名称请勿输入除“-”、“_”以外的特殊字符！');
			return;
		}
		$scope.searchCode = code;
		$scope.searchName = name;
		$scope.pageConf.currentPage = 1;
	}
	$scope.keyup = function(e,search){
        var keycode = window.event?e.keyCode:e.which;
        if(keycode==13){
            $scope.search(search.Code,search.name);
        }
    };
	
	$scope.ISsearching = true;
	$scope.pgCtrl = paginationCtrl = {};
	$scope.reload = function(){
		if(!$scope.notFirst) return;
		// 把你的http请求放到这里  }
		$scope.ISsearching = true;
		$scope.projects = AssetsManegeProjects.query({firstResult:($scope.pageConf.currentPage-1)*$scope.pageConf.itemPageLimit,currentPage:$scope.pageConf.currentPage,maxResult:$scope.pageConf.itemPageLimit,busdomainName:$scope.searchCode,Name:$scope.searchName},function(res){
			if($scope.pgCtrl.rebuild){
				$scope.pgCtrl.rebuild();
			}
			$scope.pageConf.total = res.size;
			$scope.ISsearching = false;
		});
	}
	AssetsManegeProjects.query({firstResult:0,currentPage:1,maxResult:15},function(res){
		$scope.ISsearching = false;
	 	$scope.projects = res;
		$scope.pageConf = {
	        total : $scope.projects.size,// 总条数
	        currentPage : 1,// 当前页
	        itemPageLimit : 15,// 一页展示多少条
	    }
	    // 监控你的页码 ， 发生改变既请求
	    $scope.$watch('pageConf.currentPage + pageConf.itemPageLimit + searchCode + searchName' , function(news){
	        $scope.reload();
	        $scope.notFirst = true;
	    })
	});
	/*pagination and search end*/

	$scope.goSelect = function(name){
		$scope.projectName = name;
	}
	$scope.add_action = function(){
		if($scope.projectName){
			callback($scope.projectName);
			$scope.close();
		}else{
			alert('请先选择一个业务系统！')
		}
		
	}
})
.controller('assetsDeviceEditModalCtrl', function($scope, pid, callback, $state, $modal, $timeout, $modalInstance, AssetsManegeRooms, AssetsManegeRoomFloors, AssetsManegeFloorRacks, AssetsManegeRacks, AssetsManegeDevices, AssetsManegeDevicesType, AssetsManegeFreeLabel) {
	AssetsManegeDevices.get({id:pid},function(deviceOptionRES){
		if(deviceOptionRES.parentId) $scope.showU = true;
		$scope.uNumber = parseInt(deviceOptionRES.endU)-parseInt(deviceOptionRES.beginU);
		$scope.originRackId = deviceOptionRES.rackId ? deviceOptionRES.rackId : null;
		AssetsManegeDevices.query({roomId:deviceOptionRES.roomId,floorId:deviceOptionRES.floorId,rackId:deviceOptionRES.rackId},function(deviceRES){
			$scope.devices = deviceRES;
			$timeout(function(){
				$scope.deviceOptions = deviceOptionRES;
				if(deviceOptionRES.rackId) $scope.changeRack(deviceOptionRES.rackId);
				if(deviceOptionRES.parentId) {
					$scope.showU = false;
				}
				$scope.floors = AssetsManegeRoomFloors.query({id:$scope.deviceOptions.roomId});
				$scope.racks = AssetsManegeFloorRacks.query({id:$scope.deviceOptions.floorId});
				$scope.thisroom = AssetsManegeRooms.get({id:$scope.deviceOptions.roomId});
			})
			$scope.rooms = AssetsManegeRooms.get();
			$scope.deviceTypes = AssetsManegeDevicesType.query();
		});
		
		AssetsManegeFreeLabel.query({deviceTypeId:deviceOptionRES.deviceTypeId},function(res){
			if(deviceOptionRES.fieldValues && deviceOptionRES.fieldValues!='[]'){
				var fieldValues = eval('(' + deviceOptionRES.fieldValues + ')');
				var arr1 = [];
				for(var i=0;i<res.data.length;i++){
					if(res.data[i].type=='select'){
						res.data[i].enums = res.data[i].enums.split(',');
					}
					arr1.push(fieldValues[i] ? fieldValues[i].value : '');
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
	});

	$scope.close = function(){
		$modalInstance.close();
	}

	var endUs = '';
	$scope.changeBeginU = function(){
		var hasEndU = false;
		for(var i=0;i<$scope.availableU.length;i++){
			if($scope.availableU[i]==parseInt($scope.deviceOptions.beginU)+$scope.uNumber){
				endUs = $scope.availableU[i];
				hasEndU = true;
			};
		}
		if(!hasEndU){
			alert('此处U位不足！');
			$scope.deviceOptions.beginU = '';
			$scope.deviceOptions.endU = '';
			return;
		}
		$scope.deviceOptions.endU = endUs;
	}

	$scope.changeRoom = function(id){
		$scope.RoomHasChange = true;
		$scope.FloorHasChange = false;
		$scope.floors = null;
		$scope.racks = null;
		$scope.floors = AssetsManegeRoomFloors.query({id:id});
		$scope.thisroom = AssetsManegeRooms.get({id:id});
	}
	$scope.changeFloor = function(id){
		$scope.FloorHasChange = true;
		$scope.racks = null;
		$scope.racks = AssetsManegeFloorRacks.query({id:id});
	}
	$scope.rackFirstChange = true;
	$scope.changeRack = function(id){
		if(!$scope.rackFirstChange){
			$scope.deviceOptions.beginU = '';
			$scope.deviceOptions.endU = '';
		}
		$scope.rackFirstChange = false;
		AssetsManegeRacks.get({id:id},function(res){
			$scope.deviceOptions.rackName = res.name;
			var freeU = res.availableU.split(",");
			var beginUs = [];
			$.each(freeU,function(index,val){
				freeU[index]=parseInt(val);
				beginUs.push(parseInt(val));
			});
			if($scope.originRackId && $scope.originRackId==id){
				for(var i=parseInt($scope.deviceOptions.beginU);i<parseInt($scope.deviceOptions.endU)+1;i++){
					freeU.push(i);
					beginUs.push(i);
				}
				freeU.sort(function(a,b){
           		return a-b
	        	});
	        	beginUs.sort(function(a,b){
	           		return a-b
	        	});
			}
			var newFreeU = [];
        	var newbeginUs = [];
        	for(var i=0;i<freeU.length;i++){
				if (freeU[i]!=freeU[i+1]){
					newFreeU.push(freeU[i]);
				}
			}
			for(var i=0;i<beginUs.length;i++){
				if (beginUs[i]!=beginUs[i+1]){
					newbeginUs.push(beginUs[i]);
				}
			}
			freeU = newFreeU;
			beginUs = newbeginUs;
			
			$scope.availableU = freeU;
			beginUs.pop();
			$scope.beginUs = beginUs;
			if($scope.availableU&&!$scope.deviceOptions.parentId){
				$scope.showU = true;
			}else{
				$scope.checkType = true;
			}
		});
		$scope.devices = AssetsManegeDevices.query({roomId:$scope.deviceOptions.roomId,floorId:$scope.deviceOptions.floorId,rackId:$scope.deviceOptions.rackId});
	}

	$scope.update_action = function(){
		$scope.submitStart = true;
		$scope.Required = $scope.deviceOptions.deviceCode==''||$scope.deviceOptions.name==''||$scope.deviceOptions.deviceSn==''||$scope.deviceOptions.deviceTypeId==''||$scope.deviceOptions.isInCloud==''||$scope.deviceOptions.roomId==''||$scope.deviceOptions.floorId==''||$scope.deviceOptions.rackId=='';
		if(!$scope.Required){
			if($scope.showU && $scope.deviceOptions.endU=='') $scope.Required = true;
			$.each($scope.freeLabels,function(index,val){
				if(val.isMust=='Y'){
					if($scope.freeLabelKeyValue[index]=='') $scope.Required = true;
				}
			})
		}
		if($scope.Required){
			$scope.submitStart = false;
			return;
		}
		var reg1 = /^\w+$/;
		var reg2 = /[\u4e00-\u9fa5]/;
		var code = $scope.deviceOptions.deviceCode.replace(/\-/g,'');
		if(!reg1.test(code) && !!code){
			alert('编号请勿输入除“-”、“_”以外的特殊字符和中文！');
			$scope.submitStart = false;
			return;
		}
		var name = $scope.deviceOptions.name.replace(/[\u4e00-\u9fa5]/g,'').replace(/\-/g,'');
		if(!reg1.test(name) && !!name){
			alert('名称请勿输入除“-”、“_”以外的特殊字符！');
			$scope.submitStart = false;
			return;
		}
		if($scope.deviceOptions.telephone && $scope.deviceOptions.telephone.length>0){
			if($scope.deviceOptions.telephone.length!=7 && $scope.deviceOptions.telephone.length!=8 && $scope.deviceOptions.telephone.length!=11 && $scope.deviceOptions.telephone.length!=12){
				alert('请输入规范的责任人电话位数(7位、8位、11位、12位)！');
				$scope.submitStart = false;
				return;
			}
		}
		if(!$scope.Required&&!!$scope.deviceOptions.ip){
			var re =  /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/  
			if(!re.test($scope.deviceOptions.ip)){  
				$scope.submitStart = false;
				$scope.IpNotRight = true;
				$scope.Required = true;
			    alert("ip地址格式不正确，请修改");  
			    return;  
			}
		}
		var strs="["
		$.each($scope.freeLabels,function(index,val){
			strs=strs+"{'key':'"+val.name+"','value':'"+$scope.freeLabelKeyValue[index]+"'}"
			if(index<$scope.freeLabels.length-1){
				strs=strs+","
			}
		});
		strs=strs+"]";
		$scope.deviceOptions.fieldValues = strs;
		$scope.deviceOptions.$update(function(record){
			callback(record)
			$scope.close();
		},function(err){
			alert(err.data.exception);
			$scope.submitStart = false;
		})
	}
	$scope.clearHost = function(){
		$scope.deviceOptions.hostName = '';
		$scope.deviceOptions.hostId = '';
		$scope.deviceOptions.hostIp = '';
		$scope.deviceOptions.dcId = '';
		$scope.deviceOptions.hypervisor = '';
		$scope.deviceOptions.cpu = '';
		$scope.deviceOptions.memory = '';
		$scope.deviceOptions.disk = '';
		$scope.deviceOptions.ip = '';
	}
	$scope.clearProject = function(){
		$scope.deviceOptions.projectName = '';
	}
	$scope.showHostList = function(){
		$modal.open({
	        templateUrl:'modules/assetsmanage/select_host.html',
	        controller: 'assetsHostSelectCtrl',
	        backdrop:'static',
	        resolve:{
	        	dcId:function(){
	        		return $scope.thisroom.dcId;
	        	},
	        	hostId:function(){
	        		return $scope.deviceOptions.hostId;
	        	},
		        callback:function(){
		        	return function(host){
		        		$scope.deviceOptions.hostName = host.name;
		        		$scope.deviceOptions.hostId = host.id;
		        		$scope.deviceOptions.hostIp = host.ip;
		        		$scope.deviceOptions.dcId = host.dcId;
		        		$scope.deviceOptions.hypervisor = host.hypervisor;
		        		$scope.deviceOptions.cpu = host.cpu;
		        		$scope.deviceOptions.memory = host.memory;
		        		$scope.deviceOptions.disk = host.disk;
		        		$scope.deviceOptions.ip = host.ip;
		        	}
		        }
		    }
	    });
	}
	$scope.showBsnList = function(){
		$modal.open({
	        templateUrl:'modules/assetsmanage/select_bsn.html',
	        controller: 'assetsBsnSelectCtrl',
	        backdrop:'static',
	        resolve:{
	        	projectName:function(){
	        		return $scope.deviceOptions.projectName;
	        	},
		        callback:function(){
		        	return function(name){
		        		$scope.deviceOptions.projectName = name;
		        	}
		        }
		    }
	    });
	}
})

.controller('deviceTypeCtrl', function($scope, $modal, $state, AssetsManegeDevicesType, fileUrl) {
	$scope.fileUrl = fileUrl;

	$scope.inputSearch = {
		Code:'',
		name:''
	};

	/*pagination and search start*/
	$scope.searchCode=null;
	$scope.searchName=null;
	$scope.search=function(code,name){
		var reg1 = /^\w+$/;
		var reg2 = /[\u4e00-\u9fa5]/;
		var newcode = code.replace(/\-/g,'');
		if(!reg1.test(newcode) && !!newcode){
			alert('编号请勿输入除“-”、“_”以外的特殊字符和中文！');
			return;
		}
		var newname = name.replace(/[\u4e00-\u9fa5]/g,'').replace(/\-/g,'');
		if(!reg1.test(newname) && !!newname){
			alert('名称请勿输入除“-”、“_”以外的特殊字符！');
			return;
		}
		$scope.searchCode = code;
		$scope.searchName = name;
		$scope.pageConf.currentPage = 1;
	}
	$scope.keyup = function(e,search){
        var keycode = window.event?e.keyCode:e.which;
        if(keycode==13){
            $scope.search(search.Code,search.name);
        }
    };
	$scope.reload = function(){
		if(!$scope.notFirst) return;
		 // 把你的http请求放到这里  }
		 $scope.ISsearching = true;
		$scope.deviceTypes = AssetsManegeDevicesType.query({firstResult:($scope.pageConf.currentPage-1)*$scope.pageConf.itemPageLimit,currentPage:$scope.pageConf.currentPage,maxResult:$scope.pageConf.itemPageLimit,Name:$scope.searchName},function(res){
			if($scope.pgCtrl.rebuild){
				$scope.pgCtrl.rebuild();
			}
			$scope.pageConf.total = res.size;
			$scope.ISsearching = false;
		});
	}
	$scope.pgCtrl = paginationCtrl = {};
	AssetsManegeDevicesType.query({firstResult:0,currentPage:1,maxResult:15},function(res){
	 	$scope.deviceTypes = res;
		$scope.pageConf = {
	        total : $scope.deviceTypes.size,// 总条数
	        currentPage : 1,// 当前页
	        itemPageLimit : 15,// 一页展示多少条
	    }
	    // 监控你的页码 ， 发生改变既请求
	    $scope.$watch('pageConf.currentPage + pageConf.itemPageLimit + searchCode + searchName' , function(news){
	       $scope.reload();
	       $scope.notFirst = true;
	    })
	});
	/*pagination and search end*/

	$scope.add = function(){
		$modal.open({
	        templateUrl:'modules/assetsmanage/deviceTypeAddModal.html',
	        controller: 'assetsDeviceTypeAddModalCtrl',
	        backdrop:'static',
	        resolve:{
		        callback:function(){
		        	return function(){
		        		$scope.reload();
		        	}
		        }
		    }

	    });
	}
	$scope.edit = function(pid){
		$modal.open({
	        templateUrl:'modules/assetsmanage/deviceTypeEditModal.html',
	        controller: 'assetsDeviceTypeEditModalCtrl',
	        backdrop:'static',
	        resolve:{
	        	Pid:function(){
	        		return pid;
	        	},
		        callback:function(){
		        	return function(record){
            			$scope.deviceTypes.data = $.each($scope.deviceTypes.data,function(index,data){
            				if(data.id == record.id) $scope.deviceTypes.data[index] = record;
            			})
            		}
		        }
		    }

	    });
	}
	$scope.del = function(id){
		if(confirm("确定要删除吗？"))
		{
			AssetsManegeDevicesType.del({id:id},function(){
				alert('删除成功！');
				$scope.reload();
			},function(err){
				if(err.data.exception){
					alert(err.data.exception);
				}else{
					alert('删除失败！')
				}
				$scope.reload();
			});
		}
	}
})
.controller('assetsDeviceTypeAddModalCtrl', function($scope, callback, $rootScope, $modalInstance, $state, AssetsManegeDevicesType, baseUrl, fileUrl, Upload) {
	$rootScope.userInfo;
	$scope.fileUrl = fileUrl;

	$scope.deviceTypeOptions = {
		creator:$rootScope.userInfo ? $rootScope.userInfo.name : '',
		name:'',
		hasChildType:'',
		unit:'',
		uNumber:'',
		power:'',
		image:''
	}
	$scope.close = function(){
		$modalInstance.close();
	}
	$scope.add_action = function(){
		$scope.submitStart = true;
		$scope.Required = $scope.deviceTypeOptions.name==''||$scope.deviceTypeOptions.hasChildType==''||$scope.deviceTypeOptions.unit==''||$scope.deviceTypeOptions.uNumber==''||$scope.deviceTypeOptions.power==''||$scope.deviceTypeOptions.image=='';
		if($scope.Required){
			$scope.submitStart = false;
			return;
		}
		var reg1 = /^\w+$/;
		var name = $scope.deviceTypeOptions.name.replace(/[\u4e00-\u9fa5]/g,'').replace(/\-/g,'');
		if(!reg1.test(name) && !!name){
			alert('名称请勿输入除“-”、“_”以外的特殊字符！');
			$scope.submitStart = false;
			return;
		}
		AssetsManegeDevicesType.add($scope.deviceTypeOptions,function(record){
			callback()
			$scope.close();
		},function(err){
			alert(err.data.exception);
			$scope.submitStart = false;
		})
	}

	/*flie upload start*/
	$scope.picFile = null;
	$scope.invalidFiles = [];
	$scope.pattern = 'image/*';
	$scope.acceptSelect = 'image/*';
	$scope.duration = "$duration < 10000";
	$scope.modelOptionsObj = {debounce:100};
	$scope.uploadPic = function (file) {
	    if (file != null) {
			var type = file.type.split("/")[0];
			if(type!="image"){
				alert("只能上传图片文件！")
				return;
			}
		    $scope.formUpload = true;
		    $scope.upload(file);
	    }
	};
	$scope.upload = function(file, resumable) {
	    $scope.errorMsg = null;
	    uploadNow(file);
	};
	function uploadNow(file) {
		$scope.progressPercentage = 0;
		Upload.upload({
            url: baseUrl+'/upload',
            data: {
            	type:"deviceType"
        	},
            file: file
        }).progress(function (evt) {
            $scope.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        }).success(function (data, status, headers, config) {
        	$scope.deviceTypeOptions.image = data.realFilepath;
        	$scope.imgPreview = true;
        	alert('上传成功！');
        }).error(function (data, status, headers, config) {
        	alert(data.exception);
        });
	}
	/*flie upload end*/
})
.controller('assetsDeviceTypeEditModalCtrl', function($scope, Pid, callback, $modalInstance, $state, AssetsManegeDevicesType, baseUrl, fileUrl, Upload) {
	$scope.deviceTypeOptions = AssetsManegeDevicesType.get({id:Pid});
	$scope.fileUrl = fileUrl;

	$scope.close = function(){
		$modalInstance.close();
	}
	$scope.update_action = function(){
		$scope.submitStart = true;
		$scope.Required = $scope.deviceTypeOptions.name==''||$scope.deviceTypeOptions.hasChildType==''||$scope.deviceTypeOptions.unit==''||$scope.deviceTypeOptions.uNumber==''||$scope.deviceTypeOptions.power==''||$scope.deviceTypeOptions.image=='';
		if($scope.Required){
			$scope.submitStart = false;
			return;
		}
		var reg1 = /^\w+$/;
		var name = $scope.deviceTypeOptions.name.replace(/[\u4e00-\u9fa5]/g,'').replace(/\-/g,'');
		if(!reg1.test(name) && !!name){
			alert('名称请勿输入除“-”、“_”以外的特殊字符！');
			$scope.submitStart = false;
			return;
		}
		$scope.deviceTypeOptions.$update(function(record){
			callback(record)
			$scope.close();
		},function(err){
			alert(err.data.exception);
			$scope.submitStart = false;
		})
	}

	/*flie upload start*/
	$scope.picFile = null;
	$scope.invalidFiles = [];
	$scope.pattern = 'image/*';
	$scope.acceptSelect = 'image/*';
	$scope.duration = "$duration < 10000";
	$scope.modelOptionsObj = {debounce:100};
	$scope.uploadPic = function (file) {
	    if (file != null) {
			var type = file.type.split("/")[0];
			if(type!="image"){
				alert("只能上传图片文件！")
				return;
			}
		    $scope.formUpload = true;
		    $scope.upload(file);
	    }
	};
	$scope.upload = function(file, resumable) {
	    $scope.errorMsg = null;
	    uploadNow(file);
	};
	function uploadNow(file) {
		$scope.progressPercentage = 0;
		Upload.upload({
            url: baseUrl+'/upload',
            data: {
            	type:"deviceType"
        	},
            file: file
        }).progress(function (evt) {
            $scope.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        }).success(function (data, status, headers, config) {
        	$scope.deviceTypeOptions.image = data.realFilepath;
        	$scope.imgPreview = true;
        	alert('上传成功！');
        }).error(function (data, status, headers, config) {
        	alert(data.exception);
        });
	}
	/*flie upload end*/
})

.controller('freeLabelCtrl', function($scope, $modal, $state, AssetsManegeFreeLabel) {
	$scope.deviceTypeId = $scope.$parent.$parent.deviceTypeId;

	$scope.inputSearch = {
		Code:'',
		name:''
	};

	/*pagination and search start*/
	$scope.searchCode=null;
	$scope.searchName=null;
	$scope.search=function(code,name){
		var reg1 = /^\w+$/;
		var reg2 = /[\u4e00-\u9fa5]/;
		var newcode = code.replace(/\-/g,'');
		if(!reg1.test(newcode) && !!newcode){
			alert('编号请勿输入除“-”、“_”以外的特殊字符和中文！');
			return;
		}
		var newname = name.replace(/[\u4e00-\u9fa5]/g,'').replace(/\-/g,'');
		if(!reg1.test(newname) && !!newname){
			alert('名称请勿输入除“-”、“_”以外的特殊字符！');
			return;
		}
		$scope.searchCode = code;
		$scope.searchName = name;
		$scope.pageConf.currentPage = 1;
	}
	$scope.keyup = function(e,search){
        var keycode = window.event?e.keyCode:e.which;
        if(keycode==13){
            $scope.search(search.Code,search.name);
        }
    };
	$scope.reload = function(){
		if(!$scope.notFirst) return;
		// 把你的http请求放到这里  }
		$scope.ISsearching = true;
		$scope.freeLabels = AssetsManegeFreeLabel.query({firstResult:($scope.pageConf.currentPage-1)*$scope.pageConf.itemPageLimit,currentPage:$scope.pageConf.currentPage,maxResult:$scope.pageConf.itemPageLimit,deviceTypeId:$scope.deviceTypeId,deviceTypeName:$scope.searchCode,name:$scope.searchName},function(res){
			if($scope.pgCtrl.rebuild){
				$scope.pgCtrl.rebuild();
			}
			$scope.pageConf.total = res.size;
			$scope.ISsearching = false;
		});
	}
	$scope.pgCtrl = paginationCtrl = {};
	AssetsManegeFreeLabel.query({firstResult:0,currentPage:1,maxResult:15,deviceTypeId:$scope.deviceTypeId},function(res){
	 	$scope.freeLabels = res;
		$scope.pageConf = {
	        total : $scope.freeLabels.size,// 总条数
	        currentPage : 1,// 当前页
	        itemPageLimit : 15,// 一页展示多少条
	    }
	    // 监控你的页码 ， 发生改变既请求
	    $scope.$watch('pageConf.currentPage + pageConf.itemPageLimit + searchCode + searchName' , function(news){
	        $scope.reload();
	        $scope.notFirst = true;
	    })
	});
	/*pagination and search end*/

	$scope.addFreeLabel = function(){
		$modal.open({
	        templateUrl:'modules/assetsmanage/freeLabelAddModal.html',
	        controller: 'assetsFreeLabelAddModalCtrl',
	        backdrop:'static',
	        resolve:{
	        	Pid:function(){
	        		return $scope.deviceTypeId;
	        	},
		        callback:function(){
		        	return function(){
		        		$scope.reload();
		        	}
		        }
		    }

	    });
	}
	$scope.edit = function(pid){
		$modal.open({
	        templateUrl:'modules/assetsmanage/freeLabelEditModal.html',
	        controller: 'assetsFreeLabelEditModalCtrl',
	        backdrop:'static',
	        resolve:{
	        	Pid:function(){
	        		return pid;
	        	},
	        	typeId:function(){
	        		return $scope.deviceTypeId;
	        	},
		        callback:function(){
		        	return function(record){
            			$scope.freeLabels.data = $.each($scope.freeLabels.data,function(index,data){
            				if(data.id == record.id) $scope.freeLabels.data[index] = record;
            			})
            		}
		        }
		    }

	    });
	}
	$scope.del = function(id){
		if(confirm("确定要删除吗？"))
		{
			AssetsManegeFreeLabel.del({id:id},function(){
				alert('删除成功！');
				$scope.reload();
			},function(err){
				if(err.data.exception){
					alert(err.data.exception);
				}else{
					alert('删除失败！')
				}
				$scope.reload();
			});
		}
	}
})
.controller('assetsFreeLabelAddModalCtrl', function($scope, Pid, callback, $rootScope, $modal, $modalInstance, AssetsManegeDevicesType, AssetsManegeFreeLabel) {
	AssetsManegeDevicesType.get(function(res){
		$.each(res.data,function(index,val){
			if(val.id == Pid){
				$scope.freelabelOptions.deviceTypeName = val.name;
			}
		})
	});

	$scope.freelabelOptions = {
		deviceTypeId:Pid,
		name:'',
		type:'',
		enums:'',
		isMust:''
	}
	$scope.close = function(){
		$modalInstance.close();
	}
	$scope.add_action = function(){
		$scope.submitStart = true;
		$scope.Required = $scope.freelabelOptions.deviceTypeId==''||$scope.freelabelOptions.name==''||$scope.freelabelOptions.type==''||$scope.freelabelOptions.isMust=='';
		if($scope.freelabelOptions.type=="select"&&$scope.freelabelOptions.enums=='') $scope.Required = true;
		if($scope.Required){
			$scope.submitStart = false;
			return;
		}
		var reg1 = /^\w+$/;
		var name = $scope.freelabelOptions.name.replace(/[\u4e00-\u9fa5]/g,'').replace(/\-/g,'');
		if(!reg1.test(name) && !!name){
			alert('名称请勿输入除“-”、“_”以外的特殊字符！');
			$scope.submitStart = false;
			return;
		}
		AssetsManegeFreeLabel.add($scope.freelabelOptions,function(record){
			callback()
			$scope.close();
		},function(err){
			alert(err.data.exception);
			$scope.submitStart = false;
		});
	}
})
.controller('assetsFreeLabelEditModalCtrl', function($scope, Pid, typeId, callback, $rootScope, $modal, $modalInstance, AssetsManegeDevicesType, AssetsManegeFreeLabel) {

	AssetsManegeFreeLabel.get({id:Pid},function(datas){
		$scope.freelabelOptions = datas;
		AssetsManegeDevicesType.get(function(res){
			$.each(res.data,function(index,val){
				if(val.id == typeId){
					$scope.freelabelOptions.deviceTypeName = val.name;
				}
			})
		});
	});
	$scope.close = function(){
		$modalInstance.close();
	}
	$scope.update_action = function(){
		$scope.submitStart = true;
		$scope.Required = $scope.freelabelOptions.deviceTypeId==''||$scope.freelabelOptions.name==''||$scope.freelabelOptions.type==''||$scope.freelabelOptions.isMust=='';
		if($scope.freelabelOptions.type=="select"&&$scope.freelabelOptions.enums=='') $scope.Required = true;
		if($scope.Required){
			$scope.submitStart = false;
			return;
		}
		var reg1 = /^\w+$/;
		var name = $scope.freelabelOptions.name.replace(/[\u4e00-\u9fa5]/g,'').replace(/\-/g,'');
		if(!reg1.test(name) && !!name){
			alert('名称请勿输入除“-”、“_”以外的特殊字符！');
			$scope.submitStart = false;
			return;
		}
		$scope.freelabelOptions.$update($scope.freelabelOptions,function(record){
			callback(record)
			$scope.close();
		},function(err){
			alert(err.data.exception);
			$scope.submitStart = false;
		})
	}
})
