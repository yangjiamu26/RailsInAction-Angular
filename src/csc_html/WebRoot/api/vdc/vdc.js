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
			}
	};
}(window.jQuery);
