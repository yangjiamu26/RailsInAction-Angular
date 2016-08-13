!function ($) {
	$.OBJECT_STORAGE = {
			/**
			 * 创建对象存储
			 * @param param ObjectStorage创建入参
			 */
			createObjectStorage:function(param,callback,errorCallback){
				 csc.rest.post('api/v5.0.0/objectStorages',param,function(data){
					     callback(data);
	    		    },function(data){
	    		    	errorCallback(data);
	    		    }); 
			},
			/**
			 * 修改ObjectStorage
			 * @param uuid ObjectStorage uuid
			 * @param param ObjectStorage修改入参
			 */
			modifyObjectStorage:function(uuid,param,callback,errorCallback){
				 csc.rest.put('api/v5.0.0/objectStorages/'+uuid,param,function(data){
					 callback(data)
    		    }); 
			},
			/**
			 * 删除ObjectStorage
			 *  @param uuid ObjectStorage uuid
			 */
			deleteObjectStorage:function(uuid,callback){
				csc.rest.del('api/v5.0.0/objectStorages/'+uuid,function(data){
					 callback(data)
   		        })
			},
			/**
			 * 删除ObjectStorage
			 *  @param uuid ObjectStorage uuid
			 */
			getObjectStorage:function(uuid,callback){
				csc.rest.get('api/v5.0.0/objectStorages/'+uuid,function(data){
					 callback(data)
   		        })
			},
			/**
			 * 获取ObjectStorage列表
			 * @param param  查询条件
			 */
			getObjectStorages:function(param,callback,errorCallback){
				 var param = csc.util.httpQueryParamConvert(param);
				 csc.rest.get('api/v5.0.0/objectStorages?'+param,function(data){
					     callback(data);
	    		    }); 
			},
			/**
			 * 删除Object
			 *  @param  uuid
			 */
			deleteObject:function(objectStorageUuid,name,callback){
				csc.rest.del('api/v5.0.0/objectStorages/'+objectStorageUuid+'/objects/'+name,function(data){
					 callback(data)
   		        })
			},
			/**
			 * 停止上传，发送到servlet
			 */
			stopUpload:function(url,data,successFun,errorFun){
				$.ajax({					
					url : url,
					type : 'POST',
					dataType : "json",
					data : data,
					error : function(XMLHttpRequest, textStatus, errorThrown) {
						if (errorFun) {
							errorFun(XMLHttpRequest, textStatus, errorThrown);
						}
					},
					success : function(data, textStatus) {
						successFun(data, textStatus);
					}
				});
			}
			
	};
}(window.jQuery);
