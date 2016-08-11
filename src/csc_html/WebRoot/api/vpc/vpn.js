!function ($) {
	$.VPN = {
			/**
			 * 创建VPN
			 * @param param VPN创建入参
			 */
			createVpn:function(param,callback,errorCallback){
				 csc.rest.post('api/v5.0.0/vpns',param,function(data){
					     callback(data);
	    		    }); 
			},
			/**
			 * 修改VPN
			 * @param uuid vpN uuid
			 * @param param VPN修改入参
			 */
			modifyVpn:function(uuid,param,callback,errorCallback){
				 csc.rest.put('api/v5.0.0/vpns/'+uuid,param,function(data){
					 callback(data)
    		    }); 
			},
			/**
			 * 删除VPN
			 *  @param uuid vpc uuid
			 */
			delVpn:function(uuid,callback){
				csc.rest.del('api/v5.0.0/vpns/'+uuid,function(data){
					 callback(data)
   		        })
			},
			/**
			 * 获取单个VPN信息
			 * @param uuid  查询条件
			 */
			getVpnByUuid:function(uuid,callback,errorCallback){
				 csc.rest.get('api/v5.0.0/vpns/'+uuid,function(data){
					     callback(data);
	    		    }); 
			},
			
			/**
			 * 创建VPN远程网络
			 * @param param VPN网络创建入参
			 */
			createVpnNetwork:function(vpnUuid,param,callback,errorCallback){
				 csc.rest.post('api/v5.0.0/vpns/'+vpnUuid+'/ipsecSite',param,function(data){
					     callback(data);
	    		    }); 
			},
			/**
			 * 修改VPN远程网络
			 * @param uuid vpN uuid
			 * @param param VPN远程网络
			 */
			modifyVpnNetwork:function(uuid,param,callback,errorCallback){
				 csc.rest.put('api/v5.0.0/vpns/'+uuid,param,function(data){
					 callback(data)
    		    }); 
			},
			/**
			 * 删除VPN远程网络
			 *  @param uuid vpc uuid
			 */
			delVpnNet:function(vpnUuid,uuid,callback){
				csc.rest.del('api/v5.0.0/vpns/'+vpnUuid+'/ipsecSite/'+uuid,function(data){
					 callback(data)
   		        })
			},
			/**
			 * 查看Site下的策略(policy)
			 *  @param vpnUuid vpnUuid
			 *  @param ipseceUuid ipseceUuid
			 */
			getVpnIpsecSitePolicy:function(vpnUuid, ipseceUuid, callback){
				csc.rest.get('api/v5.0.0/vpns/'+vpnUuid+'/ipsecSite/'+ipseceUuid+'/policy', function(data){
					callback(data)
				})
			}
	};
}(window.jQuery);
