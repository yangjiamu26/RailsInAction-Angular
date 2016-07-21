!function ($) {
	$.VPC = {
			/**
			 * 创建VPC
			 * @param param VPC创建入参
			 */
			createVpc:function(param,callback,errorCallback){
				 csc.rest.post('api/v5.0.0/vpcs',param,function(data){
					     callback(data);
	    		    }); 
			},
			/**
			 * 修改VPC
			 * @param uuid vpc uuid
			 * @param param VPC修改入参
			 */
			modifyVpc:function(uuid,param,callback,errorCallback){
				 csc.rest.put('api/v5.0.0/vpcs/'+uuid,param,function(data){
					 callback(data)
    		    }); 
			},
			/**
			 * 删除VPC
			 *  @param uuid vpc uuid
			 */
			delVPc:function(uuid,callback){
				csc.rest.del('api/v5.0.0/vpcs/'+uuid,function(data){
					 callback(data)
   		        })
			},
			/**
			 * 获取VPC列表
			 * @param param  查询条件
			 */
			getVpcs:function(param,callback,errorCallback){
				 var param = csc.util.httpQueryParamConvert(param);
				 csc.rest.get('api/v5.0.0/vpcs?'+param,function(data){
					     callback(data);
	    		    }); 
			},
	};
}(window.jQuery);
