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
				var param ="orgcode="+node.code;
				var userUrl = KISBPM.URL.getUsers(param);
				$http({method: 'GET', url: userUrl}).
			       success(function (data, status, headers, config) {					    	   
			    	    var result = "";
						var listTmpl = jQuery("#org_user_list_tmpl").html();
						for(var i=0; i<data.users.length; i++){
							data.users[i].nodeName = node.name;					
							if(data.users[i].id != $scope.assignment.assignee){
								result += zy_tmpl_s(listTmpl,data.users[i],null);
							}							
						}
						jQuery("#org_user_list").html(result);						
					    if(selUserArr != null && selUserArr.length > 0){
					    	//给右边列表赋值		
							var table_body = jQuery("#sel_user_body");
					    	table_body.html("");
					    	for(var i=0;i<selUserArr.length;i++){			
					    		var user = selUserArr[i];
					    		var newRow = "<tr id='del_"+user.id+"'><td><input type='checkBox' name='delInput' value='"+user.id+"' sname='"+user.userName+"'/>" +
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
    	   for(var i=0; i<data.orgs.length; i++){
				data.orgs[i] = data.orgs[i];
				data.orgs[i].iconSkin="zz";
				data.orgs[i].open = true;
			}
			var rootNode = {code:"0",parentorgcode:"",name:"组织结构",iconSkin:"zzml",open:true};
			data.orgs.push(rootNode);				
			jQuery.fn.zTree.init(jQuery("#role_org_tree"), settingRoleOrg, data.orgs);
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
				var newRow = "<tr id='del_"+user.id+"'><td><input type='checkBox' name='delInput' value='"+user.id+"' sname='"+user.userName+"'/>" +
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
				var newRow = "<tr id='del_"+user.id+"'><td><input type='checkBox' name='delInput' value='"+user.id+"' sname='"+user.userName+"'/>" +
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
			selectedMemberId.push(user.id);
			var aa = {value:""};
			aa.value = user.id;
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