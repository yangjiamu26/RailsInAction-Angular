!function ($) {
	$.HOST = {
			/**
			 * 获取主机列表
			 * @param param  查询条件
			 */
			getHosts:function(param,callback,errorCallback){
				 var param = csc.util.httpQueryParamConvert(param);
				 csc.rest.get('api/v5.0.0/hosts?'+param,function(data){
					     callback(data);
	    		    }); 
			},
			/**
			 * 获取主机
			 * @param param  查询条件
			 */
			getHost:function(id, param,callback,errorCallback){
				var param = csc.util.httpQueryParamConvert(param);
				csc.rest.get('api/v5.0.0/hosts/'+ id + '?'+param, function(data){
					callback(data);
	    		}); 
			},
			/**
			 * 获取主机的资源统计数据
			 * @param param  查询条件
			 */
			getResourceStatics:function(id, param,callback,errorCallback){
				var param = csc.util.httpQueryParamConvert(param);
				csc.rest.get('api/v5.0.0/hosts/'+ id + '/resourceStatics?'+param, function(data){
					callback(data);
	    		}, errorCallback, null, true); 
			},
			
			/**
			 * 主机开机
			 * @param param  查询条件
			 */
			powerOnHost:function(id, param,callback,errorCallback){
				csc.rest.put('api/v5.0.0/hosts/'+ id + '/powerOn' ,param, function(data){
					callback(data);
	    		}); 
			},
			/**
			 * 主机关机
			 * @param param  查询条件
			 */
			powerOffHost:function(id, param,callback,errorCallback){
				csc.rest.put('api/v5.0.0/hosts/'+ id + '/powerOff' ,param, function(data){
					callback(data);
	    		}); 
			},
			/**
			 * 主机重启
			 * @param param  查询条件
			 */
			rebootHost:function(id, param,callback,errorCallback){
				csc.rest.put('api/v5.0.0/hosts/'+ id + '/reboot' ,param, function(data){
					callback(data);
	    		}); 
			},
			/**
			 * 主机进入维护模式
			 * @param param  查询条件
			 */
			enterMaintain:function(id, param,callback,errorCallback){
				csc.rest.put('api/v5.0.0/hosts/'+ id + '/enterMaintain' ,param, function(data){
					callback(data);
	    		}); 
			},
			/**
			 * 主机退出维护模式
			 * @param param  查询条件
			 */
			exitMaintain:function(id, param,callback,errorCallback){
				csc.rest.put('api/v5.0.0/hosts/'+ id + '/exitMaintain' ,param, function(data){
					callback(data);
	    		}); 
			}
	
	
	};
}(window.jQuery);