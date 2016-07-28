!function ($) {
	$.VDC = {
			/**
			 * 获取VDC列表
			 * @param param  查询条件
			 */
			getVDCs:function(param,callback,errorCallback){
				 var param = csc.util.httpQueryParamConvert(param);
				 csc.rest.get('api/v5.0.0/vdcs?'+param,function(data){
					     callback(data);
	    		    }); 
			},
			/**
			 * 查询VDC下AZ
			 */
			getVdcAzs:function(uuid,param,callback){
				 var param = csc.util.httpQueryParamConvert(param);
				 csc.rest.get('api/v5.0.0/vdcs/'+uuid+"/azs?"+param,function(data){
					     callback(data);
	    		 }); 
			},
			/**
			 * 创建VDC
			 * @param param 创建入参
			 */
			createVDC:function(param,callback,errorCallback){
				 csc.rest.post('api/v5.0.0/vdcs',param,function(data){
					     callback(data);
	    		    }); 
			},
			/**
			 * 获取VDC配额
			 * @param param  查询条件
			 */
			getVdcQuota:function(uuid,param,callback,errorCallback){
				 var param = csc.util.httpQueryParamConvert(param);
				 csc.rest.get('api/v5.0.0/vdcs/'+uuid+"/quota?"+param,function(data){
					     callback(data);
	    		    }); 
			},
			/**
			 * 更新VDC配额
			 */
			updateQuota:function(uuid,param,callback,errorCallback){
				 csc.rest.put('api/v5.0.0/vdcs/'+uuid+"/quota",param,function(data){
					 callback(data)
    		    }); 
			}
			
	};
}(window.jQuery);
