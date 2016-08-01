!function ($) {
	$.AZ = {
			/**
			 * 获取AZ下的VPCs
			 * @param uuid vpc uuid
			 */
			getAzVpcs:function(param,callback){
				 var param = csc.util.httpQueryParamConvert(param);
				 csc.rest.get('api/v5.0.0/azs?'+param,function(data){
					     callback(data);
	    		 }); 
			}
	};
}(window.jQuery);