!function ($) {
	$.SECRETGROUP = {
			/**
			 * 创建安全组
			 * @param param 创建入参
			 */
			createSecretGroup:function(param,callback,errorCallback){
				 csc.rest.post('api/v5.0.0/secretGroups',param,function(data){
					     callback(data);
	    		    }); 
			},
			/**
			 * 修改安全组
			 * @param uuid vpc uuid
			 * @param param 修改入参
			 */
			modifySecretGroup:function(uuid,param,callback,errorCallback){
				 csc.rest.put('api/v5.0.0/secretGroups/'+uuid,param,function(data){
					 callback(data)
    		    }); 
			},
			/**
			 * 删除安全组
			 *  @param uuid router uuid
			 */
			delSecretGroup:function(uuid,callback){
				csc.rest.del('api/v5.0.0/secretGroups/'+uuid,function(data){
					 callback(data)
   		        })
			},
			/**
			 * 获取安全组列表
			 * @param param  查询条件
			 */
			getSecretGroups:function(param,callback){
				 var param = csc.util.httpQueryParamConvert(param);
				 csc.rest.get('api/v5.0.0/secretGroups?'+param,function(data){
					     callback(data);
	    		    }); 
			},
			/**
			 *查询安全组规则
			 */
			getSecretGroupRules:function(sgUuid,param,callback){
				 var param = csc.util.httpQueryParamConvert(param);
				 csc.rest.get('api/v5.0.0/secretGroups/'+sgUuid+'/secretGroupRules?'+param,function(data){
					     callback(data);
	    		    }); 
			},
			/**
			 * 删除安全组规则
			 *  @param uuid 
			 */
			delSecretGroupRules:function(sgUuid,uuid,callback){
				csc.rest.del('api/v5.0.0/secretGroups/'+sgUuid+'/secretGroupRules/'+uuid,function(data){
					 callback(data)
   		        })
			},
			/**
			 * 添加安全组规则
			 * @param 
			 */
			addSecretGroupRule:function(sgUuid,param,callback,errorCallback){
				 csc.rest.post('api/v5.0.0/secretGroups/'+sgUuid+'/secretGroupRules',param,function(data){
					     callback(data);
	    		    }); 
			},
			/**
			 * 添加虚拟机到安全组
			 * @param 
			 */
			addVm2SecretGroup:function(sgUuid,param,callback,errorCallback){
				 csc.rest.put('api/v5.0.0/secretGroups/'+sgUuid+'/vms',param,function(data){
					     callback(data);
	    		    }); 
			},
			/**
			 * 删除虚拟机到安全组
			 * @param 
			 */
			removeVmfromSecretGroup:function(sgUuid,vmUuid,callback,errorCallback){
				 csc.rest.del('api/v5.0.0/secretGroups/'+sgUuid+'/secretGroup/'+vmUuid,function(data){
					     callback(data);
	    		    }); 
			}
	};
}(window.jQuery);
