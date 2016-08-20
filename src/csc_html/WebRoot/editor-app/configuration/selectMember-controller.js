var SelectMemberPopupCtrl = [ '$scope', '$modal', '$http', function($scope, $modal, $http) {
//	$scope.members = $scope.allMembers;
//	$scope.members.selected = $scope.assignment.assignee || "";	

	var usersArr = new Array();
    var selUserArr = $scope.selectUsersList;       
    var delUserArr = new Array();
	var nodeCode = "";
	var nodeName = "";
	var nodeId = "";
	var treeNodeUrl = "";
	var userType = "";
	var settingRoleOrg = {
		callback: {
			beforeClick: function(treeId,treeNode,clickFlag){
					return true;
			},
			onClick: function(srcEvent, treeId, node, clickFlag){
				nodeCode = "";
				nodeName = "";
				nodeId = "";
				nodeCode = node.code;
				nodeName = node.name;
				nodeId = node.id;
				userType = node.userType;
				usersArr = [];
				var param ="userType="+userType;
				if(node.code!='0' && node.code!='-1'){
					param+="&orgId="+node.code;
				}else{
					param+="&size=0";
				}
				var userUrl = KISBPM.URL.getUsers(param);
				$http({method: 'GET', url: userUrl}).
			       success(function (data, status, headers, config) {
			    	   var users = data.results;
			    	    var result = "";
						var listTmpl = jQuery("#org_user_list_tmpl1").html();
						for(var i=0; i<users.length; i++){
							users[i].nodeName = node.name;							
							var selUserList = $scope.assignment.candidateUsers;
							var cc = "";
							for(var j = 0;j < selUserList.length;j++){
								cc += selUserList[j].value + ",";
							}
							var userId = '';
							if(userType == 0){
								userId = users[i].id;
							}else{
								userId = users[i].account;
							}
							if(cc != ""){
								if(cc.indexOf(users[i].id+',') == -1){
									//result += zy_tmpl_s(listTmpl,users[i],null);
									result += "<tr><td><input type='radio' name='orgRadioId' value='"+userId+"'"
										+"sname='"+users[i].name+"' userType='"+userType+"' /></td>"
										+"<td data-title='用户名'><div>"+users[i].name+"</div></td></tr>";
								}
							}else{
								//result += zy_tmpl_s(listTmpl,users[i],null);
								result += "<tr><td><input type='radio' name='orgRadioId' value='"+userId+"'"
									+"sname='"+users[i].name+"' userType='"+userType+"' /></td>"
									+"<td data-title='用户名'><div>"+users[i].name+"</div></td></tr>";
							}				
						}
						jQuery("#org_user_list1").html(result);						
					    if(selUserArr != null && selUserArr.length > 0){
					    	//给右边列表赋值		
							var table_body = jQuery("#sel_user_body1");
					    	table_body.html("");
					    	for(var i=0;i<selUserArr.length;i++){			
					    		var user = selUserArr[i];
					    		var newRow = "<tr id='del_"+user.id+"'><td><input type='radio' name='delRadio' value='"+user.id
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
			jQuery.fn.zTree.init(jQuery("#role_org_tree1"), settingRoleOrg, data);
			jQuery("#role_org_tree1 a:eq(0)").trigger("mouseover").trigger("click");
			
			var table_body = jQuery("#sel_user_body1");
			table_body.html("");
			var selectuser = $scope.assignment.assignee;
			if(selectuser!=undefined && selectuser.split(":") > 1){	 				
				var userId = selectuser.split(":")[0];
				var userType = selectuser.split(":")[1];
				var userName = $scope.assignment.assignee1;
				
				var newRow = "<tr id='del_"+userId+"'><td><input type='radio' name='delRadio' value='"+userId
				+"' sname='"+userName+"' userType='"+userType+"'/>" +
				"</td><td><label>"+userName+"</label></td></tr>";
				table_body.append(newRow);
			}
			
        }).error(function (data, status, headers, config) {
            console.log('Error loading orgs');
    });		
	/**
	 * 添加功能
	 */
	$scope.addOrgUser = function(){	
		
		jQuery('input:radio[name=orgRadioId]:checked').each(function(i){			
			var user ={};
			user.id = jQuery(this).val();
			user.userName = jQuery(this).attr("sname");
			user.userType = jQuery(this).attr("userType");
			usersArr.push(user);
		});
		
		if(usersArr!=null&&usersArr.length>0){
			if(selUserArr!=null&&selUserArr.length>0){				
				alert("默认办理人用户只能选择一个！");
			}else{
				for(var i=0;i<usersArr.length;i++){
					selUserArr.push(usersArr[i]);
				}
			}
			//给右边列表赋值		
			var table_body = jQuery("#sel_user_body1");
			table_body.html("");
			for(var i=0;i<selUserArr.length;i++){				
				var user = selUserArr[i];
				var userId = '';
				if(userType == 0){
					userId = user.id;
				}else{
					userId = user.account;
				}
				var newRow = "<tr id='del_"+userId+"'><td><input type='radio' name='delRadio' value='"+userId
					+"' sname='"+user.userName+"' userType='"+userType+"'/>" +
						"</td><td><label>"+user.userName+"</label></td></tr>";
				table_body.append(newRow);
			}
		}else{
			alert("请选择需要添加的用户！");
			return;
		}
	};
	/**
	 * 删除功能
	 */
	$scope.delOrgUser = function(){
		jQuery('input:radio[name=delRadio]:checked').each(function(i){			
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
			var table_body = jQuery("#sel_user_body1");
			table_body.html("");
			for(var i=0;i<selUserArr.length;i++){				
				var user = selUserArr[i];
				var userId = '';
				if(userType == 0){
					userId = user.id;
				}else{
					userId = user.account;
				}
				var newRow = "<tr id='del_"+userId+"'><td><input type='radio' name='delRadio' value='"+userId
					+"' sname='"+user.userName+"' userType='"+userType+"'/>" +
						"</td><td><label>"+user.userName+"</label></td></tr>";
				table_body.append(newRow);
			}
			usersArr = new Array();
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
		if(selUserArr.length > 0){
			$scope.assignment.assignee1 = selUserArr[0].userName;
			$scope.assignment.assignee = selUserArr[0].userType+":"+selUserArr[0].id;
		}else{
			$scope.assignment.assignee1 = "";
			$scope.assignment.assignee = "";
		}		
		$scope.$hide();
	};

	$scope.modifySelected = function(){
		$scope.assignment.assignee = $scope.members.selected;
	};
}];