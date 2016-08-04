!function ($) {
	$.LOAD_BALANCER = {
			lbMethods:[
			           "LEAST_CONNECTIONS",
			           "ROUND_ROBIN ",
			           "SOURCE_IP"
			           ],
			lbProtocols:[
			             "HTTP",
			             "HTTPS",
			             "TCP"
			             ],
			             
             /**
 			 * 获取负载均衡器列表
 			 * @param param  查询条件
 			 */
 			getLoadBalancers:function(param,callback,errorCallback){
 				 var param = csc.util.httpQueryParamConvert(param);
 				 csc.rest.get('api/v5.0.0/loadBalancers?'+param, function(data){
 					     callback(data);
 	    		    }); 
 			},
			/**
			 * 创建负载均衡器
			 * @param param 负载均衡器创建入参
			 */
			createLoadBalancer:function(param,callback,errorCallback){
				 csc.rest.post('api/v5.0.0/loadBalancers', param, function(data){
					     callback(data);
	    		    },function(data){
	    		    	errorCallback(data);
	    		    }); 
			},
			
			/**
			 * 删除负载均衡器
			 *  @param uuid 负载均衡器 uuid
			 */
			deleteLoadBalancer:function(uuid,callback){
				csc.rest.del('api/v5.0.0/loadBalancers/'+uuid, function(data){
					 callback(data)
   		        })
			},
			
			/**
			 * 删除负载均衡器成员
			 *  @param  uuid
			 */
			deleteLbMember:function(uuid,name,callback){
				csc.rest.del('api/v5.0.0/loadBalancerMembers/' + uuid,function(data){
					 callback(data)
   		        })
			}
			
	};
}(window.jQuery);