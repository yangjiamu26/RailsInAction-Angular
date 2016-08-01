!function ($) {
	$.VDC = {
			/**
			 * 获取VDC列表
			 * @param param  查询条件
			 */
			getVDCs:function(param,callback,errorCallback){
				 var param = csc.util.httpQueryParamConvert(param);
				 csc.rest.get('api/v5.0.0/vdcs?'+param,function(data){
					     callback(data);
	    		    }); 
			},
			/**
			 * 查询VDC下AZ
			 */
			getVdcAzs:function(uuid,param,callback){
				 var param = csc.util.httpQueryParamConvert(param);
				 csc.rest.get('api/v5.0.0/vdcs/'+uuid+"/azs?"+param,function(data){
					     callback(data);
	    		 }); 
			},
			/**
			 * 移除VDC下AZ
			 */
			removeVdcAz:function(vdcUuid,azUuid,callback){
				csc.rest.del('api/v5.0.0/vdcs/'+vdcUuid+"/azs/"+azUuid,function(data){
					 callback(data)
  		        })
			},
			/**
			 * 创建VDC
			 * @param param 创建入参
			 */
			createVDC:function(param,callback,errorCallback){
				 csc.rest.post('api/v5.0.0/vdcs',param,function(data){
					     callback(data);
	    		    }); 
			},
			/**
			 * 修改vdc
			 */
			modifyVDC:function(uuid,param,callback,errorCallback){
				 csc.rest.put('api/v5.0.0/vdcs/'+uuid,param,function(data){
					     callback(data);
	    		    }); 
			},
			/**
			 * 删除vdc
			 */
			delVdc:function(vdcUuid,callback){
				csc.rest.del('api/v5.0.0/vdcs/'+vdcUuid,function(data){
					 callback(data)
  		        })
			},
			/**
			 * 获取VDC配额
			 * @param param  查询条件
			 */
			getVdcQuota:function(uuid,param,callback,errorCallback){
				 var param = csc.util.httpQueryParamConvert(param);
				 csc.rest.get('api/v5.0.0/vdcs/'+uuid+"/quota?"+param,function(data){
					     callback(data);
	    		    }); 
			},
			/**
			 * 更新VDC配额
			 */
			updateQuota:function(uuid,param,callback,errorCallback){
				 csc.rest.put('api/v5.0.0/vdcs/'+uuid+"/quota",param,function(data){
					 callback(data)
    		    }); 
			},
			/**
			 * 获取VDC下面的网络
			 */
			getVdcNetworks:function(uuid,param,callback,errorCallback){
				 var param = csc.util.httpQueryParamConvert(param);
				 csc.rest.get('api/v5.0.0/vdcs/'+uuid+"/networks?"+param,function(data){
					     callback(data);
	    		    }); 
			},
			/**
			 * 获取可用的可用分区
			 * @param param
			 * @param callback
			 * @param errorCallback
			 * @returns
			 */
			getAvailableToVdc:function(param,callback,errorCallback){
				 var param = csc.util.httpQueryParamConvert(param);
				 csc.rest.get("api/v5.0.0/vdcs/azs/availableToVdc?"+param,function(data){
					     callback(data);
	    		    }); 
			},
			/**
			 * 修改VDC下AZ
			 */
			modifyVdcAzs:function(uuid,param,callback){
				 csc.rest.put('api/v5.0.0/vdcs/'+uuid+"/azs",param,function(data){
					 callback(data)
    		    }); 
			},
			/**
			 * 修改VDC下AZ 网络
			 */
			modifyVdcNetworks:function(uuid,param,callback){
				 csc.rest.put('api/v5.0.0/vdcs/'+uuid+"/networks",param,function(data){
					 callback(data)
    		    }); 
			}
	};
}(window.jQuery);
