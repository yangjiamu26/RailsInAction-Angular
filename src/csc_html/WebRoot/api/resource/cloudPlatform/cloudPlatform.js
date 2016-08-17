!function ($) {
	$.CLOUD_PLATFORM = {
			/**
			 * 创建云管理平台
			 * @param param 
			 */
			createCloudPlatform:function(param,callback,errorCallback){
				 csc.rest.post('api/v5.0.0/cloudPlatforms',param,function(data){
					     callback(data);
	    		    }); 
			},
			/**
			 * 修改CloudPlatform
			 * @param uuid 
			 * @param param CloudPlatform修改入参
			 */
			modifyCloudPlatform:function(uuid,param,callback,errorCallback){
				 csc.rest.put('api/v5.0.0/cloudPlatforms/'+uuid,param,function(data){
					 callback(data)
    		    }); 
			},
			/**
			 * 删除CloudPlatform
			 *  @param uuid CloudPlatform uuid
			 */
			deleteCloudPlatform:function(uuid,callback){
				csc.rest.del('api/v5.0.0/cloudPlatforms/'+uuid,function(data){
					 callback(data)
   		        })
			},
			/**
			 * 获取CloudPlatform列表
			 * @param param  查询条件
			 */
			getCloudPlatforms:function(param,callback,errorCallback){
				 var param = csc.util.httpQueryParamConvert(param);
				 csc.rest.get('api/v5.0.0/cloudPlatforms?'+param,function(data){
					     callback(data);
	    		    }); 
			},
			
			
	};
}(window.jQuery);
