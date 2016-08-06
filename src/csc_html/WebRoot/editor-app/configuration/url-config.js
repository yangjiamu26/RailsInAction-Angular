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
var KISBPM = KISBPM || {};

/*
KISBPM.URL = {
    getModel: function(modelId) {
        return ACTIVITI.CONFIG.contextRoot + '/model/' + modelId + '/json';
    },

    getStencilSet: function() {
        return ACTIVITI.CONFIG.contextRoot + '/editor/stencilset?version=' + Date.now();
    },

    putModel: function(modelId) {
        return ACTIVITI.CONFIG.contextRoot + '/model/' + modelId + '/save';
    }
};
*/

//适应CSC系统的REST风格, Modified by liupx,15/12/24
var CscRest = {
	getBaseUrl: function(apiKey,params){
		return ACTIVITI.CONFIG.contextRoot+"restServlet?connectorId=0&apiKey="+ apiKey
			+"&params="+params+"&placeholder=";
	}
};

KISBPM.URL = {
    getModel: function(modelId) {
    	return ACTIVITI.CONFIG.contextRoot+"csc/api/v5.0.0/workflows/model/"+modelId+"/json";
        /*return CscRest.getBaseUrl("csc.service.workflow.getModelByModelId","")
        	 + modelId;*/
    },

    getStencilSet: function() {
    	/*return CscRest.getBaseUrl("csc.service.workflow.getEditorStencilset")
    	+ "&version=" + Date.now();*/
    	return "/csc/editor-app/i18n/stencilset_zh_CN.json?version="+Date.now();
    },

    putModel: function(modelId) {
    	return ACTIVITI.CONFIG.contextRoot+"csc/api/v5.0.0/workflows/model/"+modelId+"/save";
    	/*return CscRest.getBaseUrl("csc.service.workflow.saveModelByModelId","")
        	+ modelId+ "&apiContent=true";//特别设置apiContent参数
*/    },
    //根据模型ID获取节点
    getNodesByModelId: function(modelId) {
    	return CscRest.getBaseUrl("csc.service.workflow.getNodesByModelId","")
        	+ modelId;
    },
    //获取用户
    getUsers: function(params) {
    	return ACTIVITI.CONFIG.contextRoot+"csc/api/v5.0.0/uap/users?"+params;
    	//return CscRest.getBaseUrl("pc.sys.getUsers",params);
    },
    //获取组织
    getOrgs: function() {
    	return ACTIVITI.CONFIG.contextRoot+"csc/api/v5.0.0/uap/organizations";
    	//return CscRest.getBaseUrl("pc.sys.getOrgs","remainOrgsTree=0");
    },
    //获取组织用户
    queryBusDomainUsers: function(params) {
    	return CscRest.getBaseUrl("pc.sys.findUsersByBusdomainCode",params);
    },
    //根据用户ID获取详情
    getUserById: function(id){
    	return CscRest.getBaseUrl("pc.sys.getUserById","")+id;
    }
};