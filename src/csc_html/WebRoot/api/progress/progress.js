!function($) {
	$.PROGRESS = {
			/**
			 * 获取后台进度数据
			 */
			getProgress: function (dataKey, callback, errorCallback) {
				csc.rest.get('api/v5.0.0/progress?dataKey=' + dataKey, function (data) {
					callback(data);
				});
			}
	};
}(window.jQuery);