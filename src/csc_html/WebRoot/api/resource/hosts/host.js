!function ($) {
	$.HOST = {
			
			_stateViews : {
				"DISCONNECT" : "<span class='label label-danger'>未运行</span>",
				"RESTART"    : "<span class='label label-info'>重启中</span>",
				"OK"         : "<span class='label label-success'>运行中</span>",
				"MAINTAIN"   : "<span class='label label-info'>维护模式</span>"
			},
			/**
			 * 获取登录日志列表
			 * @param param  查询条件
			 */
			getLoginLogs:function(param,callback,errorCallback){
				 var param = csc.util.httpQueryParamConvert(param);
				 csc.rest.get('api/v5.0.0/hosts?'+param,function(data){
					     callback(data);
	    		    }); 
			}
			
	
	
	
	};
}(window.jQuery);