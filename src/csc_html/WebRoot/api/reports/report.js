!function($) {
	$.REPORT = {
		/**
		 * 获取所有自定义报表
		 * 
		 * @param param
		 *            查询条件
		 */
		getCustomReports : function(param, callback, errorCallback) {
			param.firstResult = -1;
			param.maxResult = -1;
			var param = csc.util.httpQueryParamConvert(param);
			csc.rest.get('api/v5.0.0/reports/customReports?' + param, function(data) {
				callback(data);
			});
		}
	};
}(window.jQuery);