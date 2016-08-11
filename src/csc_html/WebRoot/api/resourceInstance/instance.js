!function($) {
	$.INSTANCE = {
		/**
		 * 设置有效期
		 * 
		 * @param param expiryDate
		 *            PublicIp创建入参
		 */
		setExpiredDate : function(uuid, param, callback, errorCallback) {
			csc.rest.put('api/v5.0.0/resourceInstances/' + uuid, param, function(data) {
				callback(data);
			});
		},
		/**
		 * 终止服务
		 * 
		 * @param uuid
		 *            PublicIp uuid
		 * @param param
		 *            PublicIp修改入参
		 */
		terminalService : function(uuid, callback, errorCallback) {
			var p = {
					"expiryDate":" "
			};
			$.INSTANCE.setExpiredDate(uuid, {}, callback, errorCallback);
		},
		/**
		 * 终止服务
		 * 
		 * @param uuid
		 *            PublicIp uuid
		 * @param param
		 *            PublicIp修改入参
		 */
		setNoExpired : function(uuid, callback, errorCallback) {
			var p = {
					"expiryDate":"2099-12-30 23:59:59"
			};
			$.INSTANCE.setExpiredDate(uuid, {}, callback, errorCallback);
		},
		/**
		 * 是否有重名
		 * 
		 *            
		 * @param param
		 *            name: 资源实例名称
		 *            type: 资源实例类型
		 */
		hasSameName : function(params, callback, errorCallback) {
			csc.rest.get('api/v5.0.0/resourceInstances/hasSameName', param, function(data) {
				callback(data);
			});
		}
	};
}(window.jQuery);