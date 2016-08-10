!function ($) {
	$.SSH_KEY = {
			/**
			 * 创建SSH密钥
			 * @param param SSHKey创建入参
			 */
			createSSHKey:function(param,callback,errorCallback){
				 csc.rest.post('api/v5.0.0/sshKeys',param,function(data){
					     callback(data);
	    		    },function(data){
	    		    	errorCallback(data);
	    		    }); 
			},
			/**
			 * 修改SSHKey
			 * @param uuid SSHKey uuid
			 * @param param SSHKey修改入参
			 */
			modifySSHKey:function(uuid,param,callback,errorCallback){
				 csc.rest.put('api/v5.0.0/sshKeys/'+uuid,param,function(data){
					 callback(data)
    		    }); 
			},
			/**
			 * 删除SSHKey
			 *  @param uuid SSHKey uuid
			 */
			deleteSSHKey:function(uuid,callback){
				csc.rest.del('api/v5.0.0/sshKeys/'+uuid,function(data){
					 callback(data)
   		        })
			},
			/**
			 * 获取SSHKey列表
			 * @param param  查询条件
			 */
			getSSHKeys:function(param,callback,errorCallback){
				 var param = csc.util.httpQueryParamConvert(param);
				 csc.rest.get('api/v5.0.0/sshKeys?'+param,function(data){
					     callback(data);
	    		    }); 
			},
			/**
			 * 获取绑定的SSHKey 云主机列表
			 * 
			 */
			getVms:function(uuid,callback,errorCallback){
				 csc.rest.get('api/v5.0.0/sshKeys/'+uuid+"/vms",function(data){
					     callback(data);
	    		    }); 
			},
			/**
			 * 获取绑定的SSHKey
			 * 
			 */
			getSshKeyByUuid:function(uuid,callback,errorCallback,callbackParam){
				 csc.rest.get('api/v5.0.0/sshKeys/'+uuid,function(data,textStatus,callbackParam){
					     callback(data,textStatus,callbackParam);
	    		    },function(){},callbackParam); 
			}
			
	};
}(window.jQuery);
