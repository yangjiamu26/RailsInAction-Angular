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
			monitorType: [
			              "PING", 
			              "TCP", 
			              "HTTP", 
			              "HTTPS"
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
			createLoadBalancer:function(param, callback, errorCallback){
				 csc.rest.post('api/v5.0.0/loadBalancers', param, function(data){
					     callback(data);
	    		    }); 
			},
			/**
			 * 修改负载均衡器
			 *  @param uuid 负载均衡器 uuid
			 */
			editLoadBalancer:function(uuid, params, callback){
				csc.rest.put('api/v5.0.0/loadBalancers/'+uuid, function(data){
					 callback(data)
   		        })
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
			/////////////////////////////////////  负载均衡器成员    ////////////////////////////
			/**
 			 * 获取负载均衡器列表
 			 * @param param  查询条件
 			 */
 			getLoadBalancerMembers:function(param,callback,errorCallback){
 				 var param = csc.util.httpQueryParamConvert(param);
 				 csc.rest.get('api/v5.0.0/loadBalancerMembers?'+param, function(data){
 					     callback(data);
 	    		    }); 
 			},
			/**
			 * 创建负载均衡器
			 * @param param 负载均衡器创建入参
			 */
			createLoadBalancerMember:function(param, callback, errorCallback){
				 csc.rest.post('api/v5.0.0/loadBalancerMembers', param, function(data){
					     callback(data);
	    		    }); 
			},
			/**
			 * 修改负载均衡器
			 *  @param uuid 负载均衡器 uuid
			 */
			editLoadBalancerMember:function(uuid, params, callback){
				csc.rest.put('api/v5.0.0/loadBalancerMembers/'+uuid, function(data){
					 callback(data)
   		        })
			},
			/**
			 * 删除负载均衡器成员
			 *  @param  uuid
			 */
			deleteLoadBalancerMember:function(uuid,name,callback){
				csc.rest.del('api/v5.0.0/loadBalancerMembers/' + uuid,function(data){
					 callback(data)
   		        })
			},
			
			/////////////////////////////////////  负载均衡器监控    ////////////////////////////
			
			/**
 			 * 获取负载均衡器监控列表
 			 * @param param  查询条件
 			 */
 			getLoadBalancerMonitors:function(param,callback,errorCallback){
 				 var param = csc.util.httpQueryParamConvert(param);
 				 csc.rest.get('api/v5.0.0/loadBalancerMonitors?'+param, function(data){
 					     callback(data);
 	    		    }); 
 			},
			/**
			 * 创建负载均衡器监控
			 * @param param 负载均衡器创建入参
			 */
			createLoadBalancerMonitor:function(param, callback, errorCallback){
				 csc.rest.post('api/v5.0.0/loadBalancerMonitors', param, function(data){
					     callback(data);
	    		    }); 
			},
			/**
			 * 修改负载均衡器监控
			 *  @param uuid 负载均衡器 uuid
			 */
			editLoadBalancerMonitor:function(uuid, params, callback){
				csc.rest.put('api/v5.0.0/loadBalancerMonitors/'+uuid, function(data){
					 callback(data)
   		        })
			},
			/**
			 * 删除负载均衡器监控
			 *  @param  uuid
			 */
			deleteLoadBalancerMonitor:function(uuid,name,callback){
				csc.rest.del('api/v5.0.0/loadBalancerMonitors/' + uuid,function(data){
					 callback(data)
   		        })
			},
			
			/////////////////////////////////////  负载均衡器VIP    ////////////////////////////
			/**
 			 * 获取负载均衡器VIP列表
 			 * @param param  查询条件
 			 */
 			getLoadBalancerVips:function(param,callback,errorCallback){
 				 var param = csc.util.httpQueryParamConvert(param);
 				 csc.rest.get('api/v5.0.0/loadBalancerVips?'+param, function(data){
 					     callback(data);
 	    		    }); 
 			},
			/**
			 * 创建负载均衡器VIP
			 * @param param 负载均衡器创建入参
			 */
			createLoadBalancerVip:function(param, callback, errorCallback){
				 csc.rest.post('api/v5.0.0/loadBalancerVips', param, function(data){
					     callback(data);
	    		    }); 
			},
			/**
			 * 修改负载均衡器VIP
			 *  @param uuid 负载均衡器 uuid
			 */
			editLoadBalancerVip:function(uuid, params, callback){
				csc.rest.put('api/v5.0.0/loadBalancerVips/'+uuid, function(data){
					 callback(data)
   		        })
			},
			/**
			 * 删除负载均衡器VIP
			 *  @param  uuid
			 */
			deleteLoadBalancerVip:function(uuid,name,callback){
				csc.rest.del('api/v5.0.0/loadBalancerVips/' + uuid,function(data){
					 callback(data)
   		        })
			},
			
			getMemberVms: [{"vmName":"qmTest1", "address": "20.20.20.115"}, 
					        {"vmName":"qmTest2", "address": "20.20.20.116"}]
	};
}(window.jQuery);