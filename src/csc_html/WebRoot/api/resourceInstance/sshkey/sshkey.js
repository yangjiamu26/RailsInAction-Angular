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
			
			
	};
}(window.jQuery);
