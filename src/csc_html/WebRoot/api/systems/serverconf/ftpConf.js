!function($){
	$FTP_CONF = {
			
			
			/**
			 * 判断是否连接成功
			 * @param putbody
			 * @param callback
			 */
			checkFtpIsConnect:function(putBody,callback) {
				pc.rest.put( "api/v5.0.0/severconfsftp", putBody,  function(data) {
					callback(data);
				});
			}
	}
}