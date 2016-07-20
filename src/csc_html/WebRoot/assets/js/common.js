$.ajaxSetup({
	cache: false
})
var csc = {};
csc.rest = {
    post: function(url,content, successFun,errorFun) {
        $.ajax({
            url: url,
            type: 'POST',
            dataType: "json",
            data: JSON.stringify(content),
            contentType: 'application/json; charset=utf-8',
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                if(errorFun){
                	errorFun(XMLHttpRequest, textStatus, errorThrown);
                }
            },
            success: function(data, textStatus) {
                 successFun(data, textStatus);
            }
        });

    },
    put: function(url,content, successFun,errorFun) {
        $.ajax({
            url: url,
            type: 'PUT',
            data: JSON.stringify(content),
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                if(errorFun){
                	errorFun(XMLHttpRequest, textStatus, errorThrown);
                }
            },
            success: function(data, textStatus) {
                 successFun(data, textStatus);
            }
        });

    },
    del: function(url,successFun,errorFun) {
        $.ajax({
            url: url,
            type: 'DELETE',
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            error: function(XMLHttpRequest, textStatus, errorThrown) {
            	if(errorFun){
                	errorFun(XMLHttpRequest, textStatus, errorThrown);
                }
            },
            success: function(data, textStatus) {
            	 successFun(data, textStatus);
            }
        });
    },
    get: function(url,successFun,errorFun) {
        $.ajax({
            url: url,    
            type: 'GET',
            cache: false,
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            error: function(XMLHttpRequest, textStatus, errorThrown) {
            	if(errorFun){
                	errorFun(XMLHttpRequest, textStatus, errorThrown);
                }
            },
            success: function(data, textStatus) {
              	 successFun(data, textStatus);
            }
        });
    }
}


csc.util = {
		  httpQueryParamConvert:function (params){
					if(typeof(params) == "object" && params != null){
			            var paramString = "";
			            for(var index in params){
		                	if(paramString == ""){
		                		paramString +=  index + "=" + encodeURIComponent(params[index]);
		                	}else{
		                		paramString += "&" + index + "=" + encodeURIComponent(params[index]);
		                	}
			            }
			        }
					return paramString;
			}
}
