/*
 * Activiti Modeler component part of the Activiti project
 * Copyright 2005-2014 Alfresco Software, Ltd. All rights reserved.
 * 
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.

 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
 */

/*
 * Assignment
 */
var KisBpmAssignmentCtrl = [ '$scope', '$modal', function($scope, $modal) {

    // Config for the modal window
    var opts = {
        template:  'editor-app/configuration/properties/assignment-popup.html?version=' + Date.now(),
        scope: $scope
    };

    // Open the dialog
    $modal(opts);
}];

var KisBpmAssignmentPopupCtrl = [ '$scope','$modal', function($scope,$modal) {
    	
    // Put json representing assignment on scope
    if ($scope.property.value !== undefined && $scope.property.value !== null
        && $scope.property.value.assignment !== undefined
        && $scope.property.value.assignment !== null) 
    {
        $scope.assignment = $scope.property.value.assignment;
    } else {
        $scope.assignment = {};
    }

    if ($scope.assignment.candidateUsers == undefined || $scope.assignment.candidateUsers.length == 0)
    {
    	$scope.assignment.candidateUsers = [];    	
    }
    
    $scope.assignment.candidateUsers1 = [];
    $scope.assignment.assignment1 = "";
    var allUsers = $scope.users1;
    var allAdUsers = $scope.adUsers;
    var assignUser = $scope.assignment.candidateUsers;
    var selectMember = [];
    var selectMemberId = [];
    var usersArr = new Array();
    //给候选人赋值
    if(allUsers !== undefined){    	
    	for(var j = 0;j < assignUser.length;j++){
    		for(var i = 0;i < allUsers.length;i++){
    			var userType = assignUser[j].value.split(":")[0];
    			var value = assignUser[j].value.split(":")[1];
    			if(userType == "0" && value == allUsers[i].id){
    				var user ={};
    				user.id = allUsers[i].id ;
    				user.userType = "0";
    				user.userName = allUsers[i].name;
    				usersArr.push(user);
    				selectMember.push(allUsers[i].name);
    				selectMemberId.push(allUsers[i].id);
    			}
    		}
    	}
    }
    if(allAdUsers !== undefined){    	
    	for(var j = 0;j < assignUser.length;j++){
    		for(var i = 0;i < allAdUsers.length;i++){
    			var userType = assignUser[j].value.split(":")[0];
    			var value = assignUser[j].value.split(":")[1];
    			if(userType == "1" && value == allAdUsers[i].account){
    				var user ={};
    				user.id = allAdUsers[i].account ;
    				user.userType = "1";
    				user.userName = allAdUsers[i].name;
    				usersArr.push(user);
    				selectMember.push(allAdUsers[i].name);
    				selectMemberId.push(allAdUsers[i].account);
    			}
    		}
    	}
    }
    //默认办理人赋值    
    var selectuser = $scope.assignment.assignee;
    var selectUserArr = new Array();
    if(allUsers !== undefined){
	    for(var i = 0;i < allUsers.length;i++){
	    	if(selectuser!=undefined && selectuser.split(":") > 1){	    		
	    		var userType = selectuser.split(":")[0];
	    		var value = selectuser.split(":")[1];
	    		if(userType == "0" && value == allUsers[i].id){
	    			var user ={};
	    			user.id = allUsers[i].id ;
	    			user.userType = "0";
	    			user.userName = allUsers[i].name;
	    			selectUserArr.push(user);
	    		}
	    	}
	    }
    }
    if(allAdUsers !== undefined){
	    for(var i = 0;i < allAdUsers.length;i++){ 
	    	if(selectuser!=undefined && selectuser.split(":") > 1){	    		
	    		var userType = selectuser.split(":")[0];
	    		var value = selectuser.split(":")[1];
	    		if(userType == "1" && value == allAdUsers[i].account){
	    			var user ={};
	    			user.id = allAdUsers[i].account ;
	    			user.userType = "1";
	    			user.userName = allAdUsers[i].name;
	    			selectUserArr.push(user);
	    		}
	    	}
	    }
    }
    $scope.assignment.candidateUsers1.value = selectMemberId.join(",");
	$scope.assignment.candidateUsers1.name = selectMember.join(",");
	$scope.usersList = usersArr;
	$scope.selectUsersList = selectUserArr;
	if(selectUserArr.length > 0){
		$scope.assignment.assignee1 = selectUserArr[0].userName;
	}
	
    
    // Click handler for + button after enum value
    var userValueIndex = 1;
    $scope.addCandidateUserValue = function(index) {
        $scope.assignment.candidateUsers.splice(index + 1, 0, {value: 'value ' + userValueIndex++});
    };

    // Click handler for - button after enum value
    $scope.removeCandidateUserValue = function(index) {
        $scope.assignment.candidateUsers.splice(index, 1);
    };
    
    if ($scope.assignment.candidateGroups == undefined || $scope.assignment.candidateGroups.length == 0)
    {
    	$scope.assignment.candidateGroups = [{value: ''}];
    }
    
    var groupValueIndex = 1;
    $scope.addCandidateGroupValue = function(index) {
        $scope.assignment.candidateGroups.splice(index + 1, 0, {value: 'value ' + groupValueIndex++});
    };

    // Click handler for - button after enum value
    $scope.removeCandidateGroupValue = function(index) {
        $scope.assignment.candidateGroups.splice(index, 1);
    };

    $scope.save = function() {

        $scope.property.value = {};
        handleAssignmentInput($scope);
        $scope.property.value.assignment = $scope.assignment;
        
        $scope.updatePropertyInModel($scope.property);
        /*if($scope.assignment.assignee == ""){
        	alert("请选择默认办理人！");
        	return;
        }*/
        $scope.close();
    };

    // Close button handler
    $scope.close = function() {
    	handleAssignmentInput($scope);
    	$scope.property.mode = 'read';
    	$scope.$hide();
    };

//    $scope.allMembers = $scope.users1;
    $scope.addAssignee = function(){
        var opts = {
            template:  'editor-app/configuration/properties/selectMember-popup.html?version=' + Date.now(),
            scope: $scope
        };
        $modal(opts);
    };

    $scope.addCandidateUser = function(){
        var opts = {
            template:  'editor-app/configuration/properties/multiselectMember-popup.html?version=' + Date.now(),
            scope: $scope
        };
        $modal(opts);
    };

    $scope.addCandidateGroup = function(){
        var opts = {
            template:  'editor-app/configuration/properties/multiselectMember-popup.html?version=' + Date.now(),
            scope: $scope
        };
        $modal(opts);
    };
    
    var handleAssignmentInput = function($scope) {
    	if ($scope.assignment.candidateUsers)
    	{
	    	var emptyUsers = true;
	    	var toRemoveIndexes = [];
	        for (var i = 0; i < $scope.assignment.candidateUsers.length; i++)
	        {
	        	if ($scope.assignment.candidateUsers[i].value != '')
	        	{
	        		emptyUsers = false;
	        	}
	        	else
	        	{
	        		toRemoveIndexes[toRemoveIndexes.length] = i;
	        	}
	        }
	        
	        for (var i = 0; i < toRemoveIndexes.length; i++)
	        {
	        	$scope.assignment.candidateUsers.splice(toRemoveIndexes[i], 1);
	        	$scope.assignment.candidateUsers1.splice(toRemoveIndexes[i], 1);
	        }
	        
	        if (emptyUsers)
	        {
	        	$scope.assignment.candidateUsers = undefined;
	        }
    	}
        
    	if ($scope.assignment.candidateGroups)
    	{
	        var emptyGroups = true;
	        var toRemoveIndexes = [];
	        for (var i = 0; i < $scope.assignment.candidateGroups.length; i++)
	        {
	        	if ($scope.assignment.candidateGroups[i].value != '')
	        	{
	        		emptyGroups = false;
	        	}
	        	else
	        	{
	        		toRemoveIndexes[toRemoveIndexes.length] = i;
	        	}
	        }
	        
	        for (var i = 0; i < toRemoveIndexes.length; i++)
	        {
	        	$scope.assignment.candidateGroups.splice(toRemoveIndexes[i], 1);
	        }
	        
	        if (emptyGroups)
	        {
	        	$scope.assignment.candidateGroups = undefined;
	        }
    	}
    };
}];