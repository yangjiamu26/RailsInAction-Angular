!function($) {
	$.PUBLIC_IP = {
		/**
		 * 创建PublicIp
		 * 
		 * @param param
		 *            PublicIp创建入参
		 */
		createPublicIp : function(param, callback, errorCallback) {
			csc.rest.post('api/v5.0.0/publicIps', param, function(data) {
				callback(data);
			});
		},
		/**
		 * 绑定云主机
		 * 
		 * @param uuid
		 *            PublicIp uuid
		 * @param param
		 *            PublicIp修改入参
		 */
		bindPublicIp : function(uuid, param, callback, errorCallback) {
			csc.rest.put('api/v5.0.0/publicIps/' + uuid + "/bind", param,
					function(data) {
						callback(data)
					});
		},
		/**
		 * 解绑
		 * 
		 * @param uuid
		 *            PublicIp uuid
		 * @param param
		 *            PublicIp修改入参
		 */
		unbindPublicIp : function(uuid, param, callback, errorCallback) {
			csc.rest.put('api/v5.0.0/publicIps/' + uuid + "/unbind", param,
					function(data) {
						callback(data)
					});
		},
		/**
		 * 删除PublicIp
		 * 
		 * @param uuid
		 *            PublicIp uuid
		 */
		delPublicIp : function(uuid, callback) {
			csc.rest.del('api/v5.0.0/publicIps/' + uuid, function(data) {
				callback(data)
			})
		},
		/**
		 * 获取PublicIp列表
		 * 
		 * @param param
		 *            查询条件
		 */
		getPublicIps : function(param, callback, errorCallback) {
			var param = csc.util.httpQueryParamConvert(param);
			csc.rest.get('api/v5.0.0/publicIps?' + param, function(data) {
				callback(data);
			});
		},
		/**
		 * 获取PublicIp
		 * 
		 * @param param
		 *            查询条件
		 */
		getPublicIp : function(uuid, param, callback, errorCallback) {
			var param = csc.util.httpQueryParamConvert(param);
			csc.rest.get('api/v5.0.0/publicIps/' + uuid + '?' + param, function(
					data) {
				callback(data);
			});
		}
	};
}(window.jQuery);