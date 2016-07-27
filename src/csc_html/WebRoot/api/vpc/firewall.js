!function ($) {
	$.FIREWALL = {
			/**
			 * 创建防火墙
			 * @param param 创建入参
			 */
			createFirewall:function(param,callback,errorCallback){
				 csc.rest.post('api/v5.0.0/firewalls',param,function(data){
					     callback(data);
	    		    }); 
			},
			/**
			 * 修改防火墙
			 * @param uuid vpc uuid
			 * @param param 修改入参
			 */
			modifyFirewall:function(uuid,param,callback,errorCallback){
				 csc.rest.put('api/v5.0.0/firewalls/'+uuid,param,function(data){
					 callback(data)
    		    }); 
			},
			/**
			 * 删除防火墙 
			 *  @param uuid router uuid
			 */
			delFirewall:function(uuid,callback){
				csc.rest.del('api/v5.0.0/firewalls/'+uuid,function(data){
					 callback(data)
   		        })
			},
			/**
			 * 获取防火墙列表
			 * @param param  查询条件
			 */
			getFirewalls:function(param,callback,errorCallback){
				 var param = csc.util.httpQueryParamConvert(param);
				 csc.rest.get('api/v5.0.0/firewalls?'+param,function(data){
					     callback(data);
	    		    }); 
			},
			/**
			 * 创建防火墙规则
			 * @param param 创建入参
			 */
			createFirewallRule:function(fwUuid,param,callback,errorCallback){
				 csc.rest.post('api/v5.0.0/firewalls/'+fwUuid+'/firewallRules',param,function(data){
					     callback(data);
	    		    }); 
			},
			/**
			 * 删除防火墙规则
			 *  @param uuid router uuid
			 */
			delFirewallRule:function(fwUuid,uuid,callback){
				csc.rest.del('api/v5.0.0/firewalls/'+fwUuid+'/firewallRules/'+uuid,function(data){
					 callback(data)
   		        })
			},
			/**
			 * 修改防火墙规则
			 */
			modifyFirewallRule:function(fwUuid,uuid,param,callback,errorCallback){
				 csc.rest.put('api/v5.0.0/firewalls/'+fwUuid+'/firewallRules/'+uuid,param,function(data){
				     callback(data);
    		    });
			},
			/**
			 * 查询防火墙规则
			 */
			getFirewallRules:function(fwUuid,param,callback,errorCallback){
				 var param = csc.util.httpQueryParamConvert(param);
				 csc.rest.get('api/v5.0.0/firewalls/'+fwUuid+'/firewallRules?'+param,function(data){
					     callback(data);
	    		    }); 
			}
	};
}(window.jQuery);
