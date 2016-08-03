!function($) {
	$.SOFTWARE = {
			/**
			 * 创建软件
			 */
			createSoftware: function(params, callback, errorCallback) {
				csc.rest.post('api/v5.0.0/soft/software', params, function(data) {
				     callback(data);
				}); 
			},
			
			/**
			 * 更新软件
			 */
			updateSoftware: function(params, callback, errorCallback) {
				csc.rest.put('api/v5.0.0/soft/software/' + params.uuid, params, function(data) {
				     callback(data);
				}); 
			},
			
			/**
			 * 获取软件数据
			 */
			getSoftware: function(params, callback, errorCallback) {
				var param = csc.util.httpQueryParamConvert(params);
				
				csc.rest.get('api/v5.0.0/soft/softwares?' + param, function(data) {
				     callback(data);
				}); 
			},
			
			/**
			 * 删除软件
			 */
			deleteSoftware: function(params, callback, errorCallback) {
				var param = csc.util.httpQueryParamConvert(params);
				
				csc.rest.del('api/v5.0.0/soft/software?' + param, function(data) {
					callback(data);
				});
			},
			
			/**
			 * 获取进度数据
			 */
			getProgress: function (dataKey, callback, errorCallback) {
				csc.rest.get('api/v5.0.0/progress?dataKey=' + dataKey, function (data) {
					callback(data);
				});
			}
	};
	$.SOFT_TYPE = {
			/**
			 * 创建软件类型
			 */
			createSoftType: function (params, callback, errorCallback) {
				csc.rest.post('api/v5.0.0/soft/softType', params, function(data) {
				     callback(data);
    		    }); 
			},
			
			/**
			 * 修改软件类型
			 */
			updateSoftType: function (uuid, params, callback, errorCallback) {
				csc.rest.put('api/v5.0.0/soft/softType/' + uuid, params, function(data) {
					 callback(data);
				}); 
			},
			
			/**
			 * 删除软件类型
			 */
			deleteSoftType: function (params, callback) {
				var param = csc.util.httpQueryParamConvert(params);
				
				csc.rest.del('api/v5.0.0/soft/softType?' + param, function(data) {
					 callback(data);
  		        });
			},
			
			/**
			 * 获取软件类型数据
			 */
			getSoftType: function (params, callback, errorCallback) {
				var param = csc.util.httpQueryParamConvert(params);
				
				 csc.rest.get('api/v5.0.0/soft/softTypes?' + param,function(data) {
				     callback(data);
    		    }); 
			},
			
			/**
			 * 获取软件类型下拉列数据
			 */
			loadSoftTypeList: function (params, callback, errorCallback) {
				var param = csc.util.httpQueryParamConvert(params);
				
				csc.rest.get('api/v5.0.0/soft/list/softTypes?' + param, function(data) {
				     callback(data);
				});
			},
			
			/**
			 * 获取软件类型树结构数据
			 */
			loadSoftTypeTree: function (callback) {
				csc.rest.get('api/v5.0.0/soft/tree/softTypes', function(data) {
				     callback(data);
				});
			}
			
	};
	$.SOFT_SCRIPT = {
		/**
		 * 删除FTP脚本文件
		 */
		deleteScriptFile: function (params, callback, errorCallback) {
			var param = csc.util.httpQueryParamConvert(params);
			
			csc.rest.del('api/v5.0.0/script/file', params, function(data) {
			     callback(data);
			});
		},
		/**
		 * 加载关联的脚本文件数据
		 */
		loadScriptFileData: function (params, callback, errorCallback) {
			var param = csc.util.httpQueryParamConvert(params);
			
			csc.rest.get('api/v5.0.0/script/files', params, function(data) {
			     callback(data);
			});
		},
		/**
		 * 加载关联的默认安装属性
		 */
		loadDefaultAttrData: function (params, callback, errorCallback) {
			var param = csc.util.httpQueryParamConvert(params);
			
			csc.rest.get('api/v5.0.0/script/defaultAttrs', params, function(data) {
				callback(data);
			});
		}
	};
}(window.jQuery);