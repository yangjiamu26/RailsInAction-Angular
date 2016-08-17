!function ($) {
	$.ROUTER = {
			/**
			 * 创建路由器
			 * @param param 创建入参
			 */
			createRouter:function(param,callback,errorCallback){
				 csc.rest.post('api/v5.0.0/routers',param,function(data){
					     callback(data);
	    		    }); 
			},
			/**
			 * 修改路由器
			 * @param uuid vpc uuid
			 * @param param 修改入参
			 */
			modifyRouter:function(uuid,param,callback,errorCallback){
				 csc.rest.put('api/v5.0.0/routers/'+uuid,param,function(data){
					 callback(data)
    		    }); 
			},
			/**
			 * 删除路由器
			 *  @param uuid router uuid
			 */
			delRouter:function(uuid,callback){
				csc.rest.del('api/v5.0.0/routers/'+uuid,function(data){
					 callback(data)
   		        })
			},
			/**
			 * 获取路由器列表
			 * @param param  查询条件
			 */
			getRouters:function(param,callback,errorCallback){
				 var param = csc.util.httpQueryParamConvert(param);
				 csc.rest.get('api/v5.0.0/routers?'+param,function(data){
					     callback(data);
	    		    }); 
			},
			/**
			 * 添加路由器关联网络
			 */
			addSubinterfaces:function(routerUuid,param,callback,errorCallback){
				csc.rest.post('api/v5.0.0/routers/'+routerUuid+'/subinterfaces',param,function(data){
				     callback(data);
   		        }); 
			},
			/**
			 * 删除路由器下网络
			 *  @param uuid router uuid
			 */
			delSubinterfaces:function(routerUuid,netUuid,callback){
				csc.rest.del('api/v5.0.0/routers/'+routerUuid+'/subinterfaces/'+netUuid,function(data){
					 callback(data)
   		        })
			},
			/**
			 * 获取router下的网络
			 * @param routerUuid
			 */
			getNetworkByRouterUuid:function(routerUuid, callback){
				 csc.rest.get('api/v5.0.0/routers/' + routerUuid + '/subinterfaces?type=INNER',function(data){
					     callback(data);
	    		    }); 
			}
	};
}(window.jQuery);
