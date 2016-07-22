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
			getSecretGroups:function(param,callback,errorCallback){
				 var param = csc.util.httpQueryParamConvert(param);
				 csc.rest.get('api/v5.0.0/secretGroups?'+param,function(data){
					     callback(data);
	    		    }); 
			},
	};
}(window.jQuery);
