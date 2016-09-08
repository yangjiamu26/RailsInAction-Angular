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
				 var cloudPlatform = ""; 
				 if(param.cloudPlatform){
					 cloudPlatform = param.cloudPlatform;
				 }
				 var param = csc.util.httpQueryParamConvert(param);
				 csc.rest.get('api/v5.0.0/vdcs/'+uuid+"/azs?"+param,function(data){
					 if(csc.util.isNotNull(cloudPlatform) && data.results && data.total>0){
						 var resData = [];
						 for(var i=0; i<data.results.length; i++){
							 if(data.results[i].cloudPlatform == cloudPlatform){
								 resData.push(data.results[i]);
							 }
						 }
						 data.results = resData;
						 data.total = resData.length;
						 callback(data);
					 }else{
						 callback(data);
					 }
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
			 * 修改VDC下AZ,这里接口要把VDC下的所有AZ都传过去
			 */
			modifyVdcAzs:function(uuid,param,callback){
				 csc.rest.put('api/v5.0.0/vdcs/'+uuid+"/azs",param,function(data){
					 callback(data)
    		    }); 
			},
			/**
			 * 添加AZ到VDC下
			 */
			addVzsToVdc:function(uuid,param,callback){
				 csc.rest.put('api/v5.0.0/vdcs/'+uuid+"/addAzs",param,function(data){
					 callback(data)
   		    }); 
			},
			/**
			 * 修改VDC下AZ 网络
			 */
			addNetworks:function(uuid,param,callback){
				 csc.rest.put('api/v5.0.0/vdcs/'+uuid+"/addNetworks",param,function(data){
					 callback(data)
    		    }); 
			},
			/**
			 * 删除vdc下网络
			 */
			removeVdcNetwork:function(vdcUuid,networkUuid,callback){
				 csc.rest.del('api/v5.0.0/vdcs/'+vdcUuid+"/networks/"+networkUuid,function(data){
					 callback(data)
    		    }); 
			},
			/**
			 * 获取vdc下的用户
			 */
			getVdcUsers:function(uuid,param,callback,errorCallback){
				var param = csc.util.httpQueryParamConvert(param);
				csc.rest.get("api/v5.0.0/vdcs/"+uuid+"/users",function(data){
					 callback(data);
	    		});
			},
			
			/**
			 * 添加VDC下的用户
			 */
			addUsers:function(uuid,param,callback){
			    csc.rest.put("api/v5.0.0/vdcs/"+uuid+"/addUsers",param,function(data){
					 callback(data)
    		    }); 
			},
			/**
			 * 修改VDC下单个用户
			 */
			modifyVdcUserByOne:function(uuid,userUuid,param,callback){
				 csc.rest.put("api/v5.0.0/vdcs/"+uuid+"/users/"+userUuid,param,function(data){
					 callback(data)
   		    }); 
			},
			/**
			 * 删除VDC下的用户
			 */
			deleteVdcUsers:function(uuid,userUuid,callback){
				 csc.rest.del("api/v5.0.0/vdcs/"+uuid+"/users/"+userUuid,function(data){
					 callback(data)
    		    }); 
			},
			
			/**
			 * 查询VDC总配额
			 */
			getVdcGlobalQuota:function(callback,errorCallback){
				 csc.rest.get('api/v5.0.0/vdcs/system/global/quota', function(data){
					     callback(data);
	    		    }); 
			},
			
			/**
			 * 修改VDC总配额
			 */
			modifyVdcGlobalQuota:function(param, callback, errorCallback){
				 csc.rest.put('api/v5.0.0/vdcs/system/global/quota', param, function(data){
					     callback(data);
	    		    }); 
			}
	};
}(window.jQuery);
