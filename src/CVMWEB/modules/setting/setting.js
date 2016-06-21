angular.module('app')

.controller('settingOverviewCtrl', function($scope, $modal, SettingIndexConfigs) {
	$scope.settings = SettingIndexConfigs.get();

	$scope.edit = function(pid){
		$modal.open({
	        templateUrl:'modules/setting/overviewEditModal.html',
	        controller: 'settingOverviewEditModalCtrl',
	        backdrop:'static',
	        resolve:{
	        	Pid:function(){
	        		return pid
	        	},
		        callback:function(){
		        	return function(){
		        		$scope.settings = SettingIndexConfigs.get();
		        	}
		        }
		    }

	    });
	}
})
.controller('settingOverviewEditModalCtrl', function($scope, Pid, callback, $state, $modalInstance, SettingIndexConfigs) {
	SettingIndexConfigs.get({id:Pid},function(res){
		if(res.name!="云平台资源统计") res.content = null;
		$scope.setting = res;
		if(res.name=="即时告警汇总") $scope.lockOrder = true;
		if(!res.content) return;
		var contents = eval('(' + res.content + ')');
		$scope.content1 = contents.content1 ? contents.content1 : false;
		$scope.content2 = contents.content2 ? contents.content2 : false;
	});

	$scope.change1 = function(e){
		var checkbox = e.target;
		$scope.content1 = checkbox.checked ? true : false;
	}
	$scope.change2 = function(e){
		var checkbox = e.target;
		$scope.content2 = checkbox.checked ? true : false;
	}

	$scope.close = function(){
		$modalInstance.close();
	}

	$scope.update_action = function(){
		$scope.submitStart = true;
		if($scope.setting.name=='云平台资源统计'){
			if($scope.content1==false && $scope.content2==false){
				alert('请至少勾选1项内容！')
				$scope.submitStart = false;
				return;
			}
			var str1 = $scope.content1 ? 'true' : 'false';
			var str2 = $scope.content2 ? 'true' : 'false';
			$scope.setting.content = '{"content1":'+str1+',"content2":'+str2+'}'
		}
		$scope.Required = $scope.setting.name=='';
		if($scope.Required){
			$scope.submitStart = false;
			return;
		}
		$scope.setting.$update(function(record){
			callback()
			$scope.close();
		})
	}
})

.controller('settingBigviewCtrl', function($scope, $modal, $state, SettingLargeScreenConfigs) {
	$scope.settings = SettingLargeScreenConfigs.query();

	$scope.getContent = function(url){
		var urls = eval('(' + url + ')');
		var content = '';
		for(var i=0;i<urls.length;i++){
			if(urls[i].roomName){
				content = content + urls[i].roomName+' -> '+urls[i].name + '、'
			}else{
				content = content + urls[i].name + '、'
			}
			
		}
		var newstr = content.substring(0,content.length-1);
		return newstr;
	}

	$scope.add = function(){
		$modal.open({
	        templateUrl:'modules/setting/bigviewAddModal.html',
	        controller: 'settingBigviewAddModalCtrl',
	        backdrop:'static',
	        resolve:{
		        callback:function(){
		        	return function(){
		        		$scope.settings = SettingLargeScreenConfigs.query();
		        	}
		        }
		    }

	    });
	}
	$scope.edit = function(pid){
		$modal.open({
	        templateUrl:'modules/setting/bigviewEditModal.html',
	        controller: 'settingBigviewEditModalCtrl',
	        backdrop:'static',
	        resolve:{
	        	Pid:function(){
	        		return pid
	        	},
		        callback:function(){
		        	return function(){
		        		$scope.settings = SettingLargeScreenConfigs.query();
		        	}
		        }
		    }

	    });
	}
	$scope.del = function(id){
		if(confirm("确定要删除吗？"))
		{
			SettingLargeScreenConfigs.del({id:id},function(){
				alert('删除成功！');
				$state.reload();
			},function(err){
				alert(err.data.exception);
			});
		}
	}
})
.controller('settingBigviewAddModalCtrl', function($scope, callback, $modalInstance, AssetsManegeRooms, AssetsManegeRoomFloors, SettingLargeScreenConfigs, Datacenters) {
	$scope.setting = {
		name:'',
		interval:'',
		url:''
	}

	$scope.urls = [];

	function checkTrue(treeNode){
		if(treeNode._url){
			if(treeNode._url.params){
				$scope.urls.push({
					roomName:treeNode.getParentNode().name,
					name:treeNode.name,
					url:treeNode._url
				})
			}else{
				$scope.urls.push({
					name:treeNode.name,
					url:treeNode._url
				})
			}
			$scope.needTime = $scope.urls.length>1 ? true : false;
			if(angular.isArray(treeNode._url)) $scope.needTime = true;
			if(!$scope.needTime) $scope.setting.interval = '';
		}
		if(treeNode.children && treeNode.children.length>0){
			for(var i=0;i<treeNode.children.length;i++){
				if(treeNode.children[i].checked == true){
					checkTrue(treeNode.children[i]);
				}
			}
		}
	}

	function checkFalse(treeNode){
		if(treeNode._url){
			for(var i=$scope.urls.length-1;i>=0;i--){
				if(treeNode.name==$scope.urls[i].name){
					$scope.urls.splice(i,1);
				}
			}
			if($scope.urls.length>1){
				$scope.needTime = true;
			}else{
				if($scope.urls.length==1 && angular.isArray($scope.urls[0].url)){
					$scope.needTime = true;
				}else{
					$scope.needTime = false;
				}
			}
			if(!$scope.needTime) $scope.setting.interval = '';
		}
		if(treeNode.children && treeNode.children.length>0){
			for(var j=0;j<treeNode.children.length;j++){
				if(treeNode.children[j].checked == false){
					checkFalse(treeNode.children[j]);
				}
			}
		}
	}

	function getChildren(id){
		var defer = $q.defer();
		
		return defer.promise;
	}
	AssetsManegeRooms.get(function(res){
		var rooms = [];
		var i=0;
		function wait(){
			if(i<res.data.length){
				AssetsManegeRoomFloors.get({id:res.data[i].id},function(val){
					if(val.data.length>0){
						var children = [];
						$.each(val.data,function(index,resolve){
							var floor = {
								name:resolve.name,
								_url:{
									state:'app.floors_big.show',
									params:{
										roomId:resolve.roomId,
										floorId:resolve.id
									}
								}
							}
							children.push(floor);
						});
						var room = {
							name:res.data[i].name,
							children:children
						};
						rooms.push(room);
						i = i+1;
						wait();
					}else{
						i = i+1;
						wait();
					}
				});
			}else{
				$scope.buildMonitor(rooms);
			}
		}
		wait();
	});

	$scope.buildMonitor = function(rooms){
		Datacenters.query(function(res){
			var monitors = [];
			for(var i=0;i<res.data.length;i++){
				var monitor = {
					name:res.data[i].name,
					_url:{
						state:'app.monitor_big.show',
						params:{
							dcId:res.data[i].id
						}
					}
				}
				monitors.push(monitor);
			}
			$scope.buildTree(rooms,monitors);
		})
	}
	

	$scope.buildTree = function(rooms,monitors){
		$scope.treeData = {
			setting:{
				view: {
					selectedMulti: false,
					showIcon:false
				},
				check: {
					enable: true
				},
				callback: {
					onCheck: function(e, treeId, treeNode){
						if(treeNode.checked == true){
							checkTrue(treeNode);
						}else{
							checkFalse(treeNode);
						}
					},
					onClick:function(){  
                        return false;
                    }
				}
			},
			zNodes:[
				{
					name:"私有云概况",
					open:true,
					children: [
						{
							name:"整体资源概况",
							_url:[
								{
									state:'app.overview_big.first'
								},
								{
									state:'app.overview_big.second'
								}
							]
						},
						{
							name:"整体概况简介",
							_url:{
								state:'app.overview_big.introduction'
							}
						}
					]},
				{
					name:"机房可视化",
					open:true,
					children: rooms
				},
				{
					name:"资源监控",
					open:true,
					children: monitors
				}
			]
		}
	}
	

	$scope.close = function(){
		$modalInstance.close();
	}

	$scope.add_action = function(){
		$scope.submitStart = true;
		$scope.Required = $scope.setting.name=='';
		if($scope.Required){
			$scope.submitStart = false;
			return;
		}
		var reg1 = /^\w+$/;
		var reg2 = /[\u4e00-\u9fa5]/;
		var name = $scope.setting.name.replace(/[\u4e00-\u9fa5]/g,'').replace(/\-/g,'');
		if(!reg1.test(name) && !!name){
			alert('名称请勿输入除“-”、“_”以外的特殊字符！');
			$scope.submitStart = false;
			return;
		}

		if($scope.urls.length<1){
			$scope.submitStart = false;
			alert('请至少选择1个页面！');
			return;
		}
		if($scope.needTime&&$scope.setting.interval==''){
			$scope.Required = true;
			$scope.submitStart = false;
			return;
		}
		if($scope.needTime&&$scope.setting.interval<10){
			$scope.submitStart = false;
			alert('请设置间隔时间不小于10秒！');
			return;
		}
		$scope.setting.url = JSON.stringify($scope.urls);
		$scope.setting.interval = parseInt($scope.setting.interval);
		SettingLargeScreenConfigs.add($scope.setting,function(record){
			callback()
			$scope.close();
		})
	}
})
.controller('settingBigviewEditModalCtrl', function($scope, Pid, callback, $modalInstance, AssetsManegeRooms, AssetsManegeRoomFloors, SettingLargeScreenConfigs, Datacenters) {
	SettingLargeScreenConfigs.get({id:Pid},function(res){
		$scope.setting = res;
		$scope.urls = eval('(' + res.url + ')');
		if($scope.urls.length>1){
			$scope.needTime = true;
		}else{
			if(angular.isArray($scope.urls[0].url)){
				$scope.needTime = true;
			}else{
				$scope.needTime = false;
			}
		}
		$.each($scope.urls,function(index,val){
			if(val.name=="整体资源概况") $scope.checked11=true;
			if(val.name=="整体概况简介") $scope.checked12=true;
		})
	});
	$scope.urls = [];

	function checkTrue(treeNode){
		if(treeNode._url){
			if(treeNode._url.params){
				$scope.urls.push({
					roomName:treeNode.getParentNode().name,
					name:treeNode.name,
					url:treeNode._url
				})
			}else{
				$scope.urls.push({
					name:treeNode.name,
					url:treeNode._url
				})
			}
			$scope.needTime = $scope.urls.length>1 ? true : false;
			if(angular.isArray(treeNode._url)) $scope.needTime = true;
			if(!$scope.needTime) $scope.setting.interval = '';
		}
		if(treeNode.children && treeNode.children.length>0){
			for(var i=0;i<treeNode.children.length;i++){
				if(treeNode.children[i].checked == true){
					checkTrue(treeNode.children[i]);
				}
			}
		}
	}

	function checkFalse(treeNode){
		if(treeNode._url){
			for(var i=$scope.urls.length-1;i>=0;i--){
				if(treeNode.name==$scope.urls[i].name){
					$scope.urls.splice(i,1);
				}
			}
			if($scope.urls.length>1){
				$scope.needTime = true;
			}else{
				if($scope.urls.length==1 && angular.isArray($scope.urls[0].url)){
					$scope.needTime = true;
				}else{
					$scope.needTime = false;
				}
			}
			if(!$scope.needTime) $scope.setting.interval = '';
		}
		if(treeNode.children && treeNode.children.length>0){
			for(var j=0;j<treeNode.children.length;j++){
				if(treeNode.children[j].checked == false){
					checkFalse(treeNode.children[j]);
				}
			}
		}
	}

	function getChildren(id){
		var defer = $q.defer();
		
		return defer.promise;
	}
	AssetsManegeRooms.get(function(res){
		var rooms = [];
		var i=0;
		function wait(){
			var hasChecked = false;
			if(i<res.data.length){
				AssetsManegeRoomFloors.get({id:res.data[i].id},function(val){
					if(val.data.length>0){
						var children = [];
						$.each(val.data,function(index,resolve){
							function check(){
								for(var i=0;i<$scope.urls.length;i++){
									if($scope.urls[i].name==resolve.name && $scope.urls[i].roomName == resolve.roomName){
										hasChecked = true;
										return true;
									}
								}
								return false;
							}
							
							var floor = {
								name:resolve.name,
								checked:check(),
								_url:{
									state:'app.floors_big.show',
									params:{
										roomId:resolve.roomId,
										floorId:resolve.id
									}
								}
							}
							children.push(floor);
						});
						if(hasChecked) $scope.checkRoom = true;
						var room = {
							name:res.data[i].name,
							open:true,
							checked:hasChecked,
							children:children
						};
						rooms.push(room);
						i = i+1;
						wait();
					}else{
						i = i+1;
						wait();
					}
				});
			}else{
				$scope.buildMonitor(rooms);
			}
		}
		wait();
	});
	
	$scope.buildMonitor = function(rooms){
		var monitorCheck = false;
		Datacenters.query(function(res){
			var monitors = [];
			$.each(res.data,function(index,val){
				function check(){
					for(var i=0;i<$scope.urls.length;i++){
						if($scope.urls[i].name==val.name){
							monitorCheck = true;
							return true;
						}
					}
					return false;
				}
				var monitor = {
					name:val.name,
					checked:check(),
					_url:{
						state:'app.monitor_big.show',
						params:{
							dcId:val.id
						}
					}
				}
				monitors.push(monitor);
			})
			$scope.buildTree(rooms,monitors,monitorCheck);
		})
	}

	$scope.buildTree = function(rooms,monitors,monitorCheck){
		$scope.treeData = {
			setting:{
				view: {
					selectedMulti: false,
					showIcon:false
				},
				check: {
					enable: true
				},
				callback: {
					onCheck: function(e, treeId, treeNode){
						if(treeNode.checked == true){
							checkTrue(treeNode);
						}else{
							checkFalse(treeNode);
						}
					}
				}
			},
			zNodes:[
				{
					name:"私有云概况",
					open:true,
					checked:$scope.checked11||$scope.checked12,
					children: [
						{
							name:"整体资源概况",
							checked:$scope.checked11,
							_url:[
								{
									state:'app.overview_big.first'
								},
								{
									state:'app.overview_big.second'
								}
							]
						},
						{
							name:"整体概况简介",
							checked:$scope.checked12,
							_url:{
								state:'app.overview_big.introduction'
							}
						}
					]},
				{
					name:"机房可视化",
					open:true,
					checked:$scope.checkRoom,
					children: rooms
				},
				{
					name:"资源监控",
					checked:monitorCheck,
					open:true,
					children: monitors
				}
			]
		}
	}

	$scope.close = function(){
		$modalInstance.close();
	}

	$scope.update_action = function(){
		$scope.submitStart = true;
		$scope.Required = $scope.setting.name=='';
		if($scope.Required){
			$scope.submitStart = false;
			return;
		}
		var reg1 = /^\w+$/;
		var reg2 = /[\u4e00-\u9fa5]/;
		var name = $scope.setting.name.replace(/[\u4e00-\u9fa5]/g,'').replace(/\-/g,'');
		if(!reg1.test(name) && !!name){
			alert('名称请勿输入除“-”、“_”以外的特殊字符！');
			$scope.submitStart = false;
			return;
		}
		if($scope.urls.length<1){
			$scope.submitStart = false;
			alert('请至少选择1个页面！');
			return;
		}
		if($scope.needTime&&$scope.setting.interval==''){
			$scope.Required = true;
			$scope.submitStart = false;
			return;
		}
		if($scope.needTime&&$scope.setting.interval<10){
			$scope.submitStart = false;
			alert('请设置间隔时间不小于10秒！');
			return;
		}
		$scope.setting.url = JSON.stringify($scope.urls);
		$scope.setting.interval = parseInt($scope.setting.interval);
		$scope.setting.$update(function(record){
			callback()
			$scope.close();
		})
	}
})

.controller('settingSummaryCtrl', function($scope, $modal, SettingProfileConfigs) {
	$scope.settings = SettingProfileConfigs.get();
	$scope.edit = function(pid){
		$modal.open({
	        templateUrl:'modules/setting/summaryEditModal.html',
	        controller: 'settingSummaryEditModalCtrl',
	        backdrop:'static',
	        resolve:{
	        	Pid:function(){
	        		return pid
	        	},
		        callback:function(){
		        	return function(){
		        		$scope.settings = SettingProfileConfigs.query();
		        	}
		        }
		    }

	    });
	}
})

.controller('settingSummaryEditModalCtrl', function($scope, Pid, callback, $modalInstance, SettingProfileConfigs) {
	$scope.setting = SettingProfileConfigs.get({id:Pid});

	$scope.close = function(){
		$modalInstance.close();
	}

	$scope.update_action = function(){
		$scope.submitStart = true;
		$scope.Required = $scope.setting.name=='';
		if($scope.Required){
			$scope.submitStart = false;
			return;
		}
		$scope.setting.$update(function(record){
			callback()
			$scope.close();
		})
	}
})

.controller('settingSummaryDetailCtrl', function($scope, $modal, $state, SettingProfileDetailList, SettingProfileDetails, fileUrl) {
	$scope.settings = SettingProfileDetailList.get({id:$state.params.summaryId});
	$scope.fileUrl = fileUrl;
	if($state.params.settingName == '业务流程'){
		$scope.multiple = false;
	}else{
		$scope.multiple = true;
	}
	$scope.add = function(){
		$modal.open({
	        templateUrl:'modules/setting/summaryDetailAddModal.html',
	        controller: 'settingSummaryDetailAddModalCtrl',
	        backdrop:'static',
	        resolve:{
		        callback:function(){
		        	return function(){
		        		$scope.settings = SettingProfileDetailList.get({id:$state.params.summaryId});
		        	}
		        }
		    }

	    });
	}
	$scope.edit = function(id){
		$modal.open({
	        templateUrl:'modules/setting/summaryDetailEditModal.html',
	        controller: 'settingSummaryDetailEditModalCtrl',
	        backdrop:'static',
	        resolve:{
	        	Pid:function(){
	        		return id
	        	},
		        callback:function(){
		        	return function(){
		        		$scope.settings = SettingProfileDetailList.get({id:$state.params.summaryId});
		        	}
		        }
		    }

	    });
	}

	$scope.del = function(id){
		if(confirm("确定要删除吗？"))
		{
			SettingProfileDetails.del({id:id},function(){
				alert('删除成功！');
				$state.reload();
			});
		}
	}
	
})

.controller('settingSummaryDetailAddModalCtrl', function($scope, callback, $timeout, $state, $modalInstance, SettingProfileDetails, baseUrl, Upload) {
	$scope.close = function(){
		$modalInstance.close();
	}
	if($state.params.settingName == '业务流程'){
		$scope.multiple = false;
	}else{
		$scope.multiple = true;
	}
	$scope.setting = {
		parentId:$state.params.summaryId,
		isShow:'Y',
		img:''
	}

	/*flie upload start*/
	$scope.picFile = null;
	$scope.invalidFiles = [];
	$scope.pattern = 'image/*';
	$scope.acceptSelect = 'image/*';
	$scope.duration = "$duration < 10000";
	$scope.modelOptionsObj = {debounce:100};
	$scope.imgNum = 0;
	$scope.uploadPic = function (files) {
		$scope.setting.img = '';
	    if (files != null) {
	    	if (!angular.isArray(files)) {
		        $scope.files = files = [files];
		    }
		    $scope.imgNum = files.length;
		    $scope.imgNow = 0;
		    for (var i = 0; i < files.length; i++) {
		    	var type = files[i].type.split("/")[0];
				if(type!="image"){
					alert("只能上传图片文件！")
					return;
				}
		        Upload.imageDimensions(files[i]).then(function (d) {
		          $scope.d = d;
		        });
		        $scope.errorMsg = null;
		        (function (f) {
		          $scope.upload(f, true);
		        })(files[i]);
		    }
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
            	type:"configDetail"
        	},
            file: file
        }).progress(function (evt) {
            $scope.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        }).success(function (data, status, headers, config) {
        	console.log(data)
        	$scope.setting.img = $scope.setting.img + data.realFilepath + ',';
        	$scope.imgPreview = true;
        	$scope.imgNow++;
        	if($scope.imgNow == $scope.imgNum){
        		alert('上传成功！');
        	}
        }).error(function (data, status, headers, config) {
        	alert(data.exception);
        });
	}
	/*flie upload end*/

	$scope.add_action = function(){
		$scope.submitStart = true;
		$scope.Required = $scope.setting.img=='';
		if($scope.Required){
			$scope.submitStart = false;
			alert('请先上传图片！')
			return;
		}
		$scope.setting.img = $scope.setting.img.substring(0,$scope.setting.img.length-1);
		SettingProfileDetails.add($scope.setting,function(record){
			callback()
			$scope.close();
		},function(err){
			console.log(err)
		})
	}
})
.controller('settingSummaryDetailEditModalCtrl', function($scope, Pid, callback, $timeout, $state, $modalInstance, SettingProfileDetailList, SettingProfileDetails) {
	SettingProfileDetailList.get({id:$state.params.summaryId},function(res){
		var orders = [];
		for(var i=0;i<res.data.length;i++){
			orders.push(i+1);
		}
		$scope.orders = orders;
	});
	$scope.setting = SettingProfileDetails.get({id:Pid});

	$scope.close = function(){
		$modalInstance.close();
	}

	$scope.update_action = function(){
		$scope.submitStart = true;
		$scope.setting.$update(function(record){
			callback()
			$scope.close();
		},function(err){
			$scope.submitStart = false;
			console.log(err)
		})
	}
})