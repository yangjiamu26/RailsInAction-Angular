var MultiselectMemberPopupCtrl = [ '$scope', '$modal', '$http', function($scope, $modal, $http) {
//	$scope.members = $scope.allMembers;
//	$scope.members.selected = $scope.assignment.candidateUsers1.name || "";
	
	var usersArr = new Array();
    var selUserArr = $scope.usersList;       
    var delUserArr = new Array();
	var nodeCode = "";
	var nodeName = "";
	var nodeId = "";
	var treeNodeUrl = "";
	var userType = "";
	var settingRoleOrg = {
		callback: {
			beforeClick: function(treeId,treeNode,clickFlag){
					return (1==1);
				},
			onClick: function(srcEvent, treeId, node, clickFlag){
				nodeCode = "";
				nodeName = "";
				nodeId = "";
				nodeCode = node.code;
				nodeName = node.name;
				nodeId = node.id;
				usersArr = [];
				userType = node.userType;
				var param ="orgId="+node.code+"&userType="+userType;
				var userUrl = KISBPM.URL.getUsers(param);
				$http({method: 'GET', url: userUrl}).
			       success(function (data, status, headers, config) {	
			    	   var users = data.results;
			    	    var result = "";
						var listTmpl = jQuery("#org_user_list_tmpl").html();
						for(var i=0; i<users.length; i++){
							users[i].nodeName = node.name;					
							if(users[i].id != $scope.assignment.assignee){
								var userId = '';
								if(userType == 0){
									userId = users[i].id;
								}else{
									userId = users[i].account;
								}
								//result += zy_tmpl_s(listTmpl,users[i],null);
								result += "<tr><td><input type='checkbox' name='orgUserId' value='"+userId+"'"
									+"sname='"+users[i].name+"' userType='"+userType+"' /></td>"
									+"<td data-title='用户名'><div>"+users[i].name+"</div></td></tr>";
							}							
						}
						jQuery("#org_user_list").html(result);						
					    if(selUserArr != null && selUserArr.length > 0){
					    	//给右边列表赋值		
							var table_body = jQuery("#sel_user_body");
					    	table_body.html("");
					    	for(var i=0;i<selUserArr.length;i++){			
					    		var user = selUserArr[i];
					    		var newRow = "<tr id='del_"+user.id+"'><td><input type='checkBox' name='delInput' value='"+user.id
					    			+"' sname='"+user.userName+"' userType='"+userType+"'/>" +
					    				"</td><td><label>"+user.userName+"</label></td></tr>";
					    		table_body.append(newRow);
					    	}
					    } 
			        }).error(function (data, status, headers, config) {
			            console.log('Error loading orgs');
			    });				
			}
		},
		data:{
			simpleData:{
				enable:true,
				idKey:"code",
				pIdKey:"parentorgcode",
			}
		}
	};
	var orgUrl = KISBPM.URL.getOrgs();
	$http({method: 'GET', url: orgUrl}).
       success(function (data, status, headers, config) {	    	   
    	   /*for(var i=0; i<data.orgs.length; i++){
				data.orgs[i] = data.orgs[i];
				data.orgs[i].iconSkin="zz";
				data.orgs[i].open = true;
			}
			var rootNode = {code:"0",parentorgcode:"",name:"组织结构",iconSkin:"zzml",open:true};
			data.orgs.push(rootNode);*/				
			jQuery.fn.zTree.init(jQuery("#role_org_tree"), settingRoleOrg, data);
			jQuery("#role_org_tree a:eq(0)").trigger("mouseover").trigger("click");
        }).error(function (data, status, headers, config) {
            console.log('Error loading orgs');
    });		
	/**
	 * 添加功能
	 */
	$scope.addOrgUser = function(){		
		jQuery('input:checkbox[name=orgUserId]:checked').each(function(i){			
			var user ={};
			user.id = jQuery(this).val();
			user.userName = jQuery(this).attr("sname");
			user.userType = jQuery(this).attr("userType");
			usersArr.push(user);
		});
		
		if(usersArr!=null&&usersArr.length>0){
			if(selUserArr!=null&&selUserArr.length>0){
				var isExsist ="";
				for(var i=0;i<usersArr.length;i++){
					var flag = false;
					for(var j=0;j<selUserArr.length;j++){
						if(usersArr[i].id==selUserArr[j].id){
							flag = false;
							isExsist = isExsist==""?"【"+usersArr[i].userName+"】":isExsist+"、【"+usersArr[i].userName+"】";
							break;
						}else{
							flag = true;
						}
					}
					if(flag){
						selUserArr.push(usersArr[i]);
					}
				}
				if(isExsist!=""){
					alert("用户"+isExsist+"已存在！");
				}
			}else{
				for(var i=0;i<usersArr.length;i++){
					selUserArr.push(usersArr[i]);
				}
			}
			//给右边列表赋值		
			var table_body = jQuery("#sel_user_body");
			var allRows = jQuery("#sel_user_body tr");
			table_body.html("");
			for(var i=0;i<selUserArr.length;i++){				
				var user = selUserArr[i];
				var userId = '';
				if(userType == 0){
					userId = user.id;
				}else{
					userId = user.account;
				}
				var newRow = "<tr id='del_"+user.id+"'><td><input type='checkBox' name='delInput' value='"+userId
					+"' sname='"+user.userName+"' userType='"+user.userType+"'/>" +
						"</td><td><label>"+user.userName+"</label></td></tr>";
				table_body.append(newRow);
			}
			usersArr = new Array();
		}else{
			alert("请选择需要添加的用户！");
			return;
		}
	};
	/**
	 * 删除功能
	 */
	$scope.delOrgUser = function(){
		jQuery('input:checkbox[name=delInput]:checked').each(function(i){			
			var user ={};
			user.id = jQuery(this).val();
			user.userName = jQuery(this).attr("sname");
			user.userType = jQuery(this).attr("userType");
			delUserArr.push(user);
		});		
		if(delUserArr!=null&&delUserArr.length>0){
			if(selUserArr!=null&&selUserArr.length>0){
				for(var i=0;i<delUserArr.length;i++){
					for(var j=0;j<selUserArr.length;j++){
						if(delUserArr[i].id==selUserArr[j].id){
							selUserArr.splice(j,1);
							break;
						}
					}
				}
			}
			//给右边列表赋值		
			var table_body = jQuery("#sel_user_body");
			var allRows = jQuery("#sel_user_body tr");
			table_body.html("");
			for(var i=0;i<selUserArr.length;i++){				
				var user = selUserArr[i];
				var userId = '';
				if(userType == 0){
					userId = user.id;
				}else{
					userId = user.account;
				}
				var newRow = "<tr id='del_"+user.id+"'><td><input type='checkBox' name='delInput' value='"+userId
					+"' sname='"+user.userName+"' userType='"+user.userType+"'/>" +
						"</td><td><label>"+user.userName+"</label></td></tr>";
				table_body.append(newRow);
			}
		}else{
			alert("请选择需要删除的用户！");
			return;
		}
		delUserArr = new Array();
	};

	
	$scope.closeSelectModal = function(){
		$scope.$hide();
	};

	$scope.saveSelectModal = function(){		
		var selectedMember = [];
		var selectedMemberId = [];
		var users = [];
		for(var i = 0;i<selUserArr.length;i++){
			var user = selUserArr[i];
			selectedMember.push(user.userName);
			selectedMemberId.push(user.userType+":"+user.id);
			var aa = {value:""};
			aa.value = user.userType+":"+user.id;
			users.push(aa);
		}
		$scope.assignment.candidateUsers = users;
		$scope.assignment.candidateUsers1.value = selectedMemberId.join(",");
		$scope.assignment.candidateUsers1.name = selectedMember.join(",");
		$scope.$hide();
	};
	$scope.modifySelected = function(){
		var selectedMember = [];
		var selectedMemberId = [];
		$($scope.members).each(function(n){
			
			if(n.action){
				selectedMember.push(n.name);
				var aa = {value:""};
				aa.value = n.id;
				selectedMemberId.push(n.id);			
			}
		})		
		$scope.assignment.candidateUsers[0].name = selectedMember.join(",");
		$scope.assignment.candidateUsers[0].value = selectedMemberId.join(",");
	};
}];