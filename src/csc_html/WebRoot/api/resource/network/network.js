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
			},
			getNetworkByUuid:function(azUuid,networkUuid,callback,errorCallback){
				csc.rest.get('api/v5.0.0/networks?getOne=true&azUuid'+azUuid+'&networkUuid='+networkUuid,function(data){
				     callback(data);
				}); 
			}
	};
}(window.jQuery);
