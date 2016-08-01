!function ($) {
	$.NETWORK = {
			/**
			 * 查询网络
			 */
			getNetworks:function(param,callback,errorCallback){
				 var param = csc.util.httpQueryParamConvert(param);
				 csc.rest.get('api/v5.0.0/networks?'+param,function(data){
					     callback(data);
	    		    }); 
			}
	};
}(window.jQuery);
