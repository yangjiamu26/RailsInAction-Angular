!function($){
	$REPO_CONF = {
			
			
			/**
			 * 判断是否连接成功
			 * @param putbody
			 * @param callback
			 */
			checkCollRepoIsConnect:function(putBody,callback) {
				pc.rest.put( "api/v5.0.0/severconfsrepo", putBody,  function(data) {
					callback(data);
				});
			}
	}
}