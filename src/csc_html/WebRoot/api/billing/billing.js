!function($) {
	$.BILLING = {
			/**
			 * 获取计费因子
			 */
			getBillingFactor:function(param,callback){
				param.display=false;
				var param = csc.util.httpQueryParamConvert(param);
				csc.rest.get('api/v5.0.0/devs?'+param,function(data){
					     callback(data);
	    		    }); 
				
				 

			}
	};
}(window.jQuery);