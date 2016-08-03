!function ($) {
	$.PORT = {
			/**
			 * 可用于绑定的云主机列表
			 */
			getBindableVmList:function(param,callback,errorCallback){
				 var param = csc.util.httpQueryParamConvert(param);
				 csc.rest.get('api/v5.0.0/ports/bindableVms?'+param,function(data){
				     callback(data);
    		     }); 
			}
	};
}(window.jQuery);
