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
			},
			/**
			 * 可用于绑定的负载均衡器列表
			 */
			getBindableVipList:function(param,callback,errorCallback){
				 var param = csc.util.httpQueryParamConvert(param);
				 csc.rest.get('api/v5.0.0/ports/bindableVips?'+param,function(data){
				     callback(data);
    		     }); 
			},
			/**
			 * 可用于创建负载均衡器成员的云主机列表
			 */
			getLbMemberVmList:function(param,callback,errorCallback){
				 var param = csc.util.httpQueryParamConvert(param);
				 csc.rest.get('api/v5.0.0/ports/getLbMemberVms?'+param,function(data){
				     callback(data);
    		     }); 
			}
	};
}(window.jQuery);
