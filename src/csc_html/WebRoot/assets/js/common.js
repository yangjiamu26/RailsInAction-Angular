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
			},
			segGetMask : function (segmentValue){
			    	var mask = segmentValue.split("/")[1];
			    	var bit="";
			    	for(var i=0;i<mask;i++){
			    		bit +="1";
			    	}
			    	var binary = csc.util.paddingRightByZero(bit,32);
			    	var binaryCode =[];
			    	binaryCode[0] = binary.substring(0,8);
			    	binaryCode[1] = binary.substring(8,16);
			    	binaryCode[2] = binary.substring(16,24);
			    	binaryCode[3] = binary.substring(24,32);
			    	var segment = "";
			    	for(var i=0;i<binaryCode.length;i++){
			    		segment += this.bin2dec(binaryCode[i])+".";
			    	}
			    	return segment.substring(0, segment.length-1);
			 },
			  bin2dec : function(bin){
			    	var c = bin.split("");
			    	var len = c.length;
			    	var dec = 0;
			    	for(i=0; i<len; i++){
			    	  var temp = 1;
			    	  if(c[i] == 1){
				    	  for(j=i+1; j<len; j++) temp *= 2;
				    	  dec += temp;
			    	  }else if(c[i] != 0){
				    	  return false;
			    	  }
			    	}
			    	 return dec;
			  },
			 paddingRightByZero: function(orgi, digit) {
			        /*数字位数达不到预期位数时，在左边位置补0。注：只适用整数。orig:原始数字，digit:预期位数*/
			        var str = orgi + "";
			        if (str.length < digit) {
			            var needPadding = digit - str.length;
			            for (var i = 0; i < needPadding; i++) {
			                str =  str + "0";
			            }
			        }
			        return str;
			  }
}

// 全局上传
// ouhang 2016-07-21
csc.uploader = {
		holder: {},
		
		bind: function(dataKey, uploader) {
			this.holder[dataKey] = uploader; 
		},
		
		getUploader: function(dataKey) {
			return this.holder[dataKey];
		},
		
		unbind: function(dataKey) {
			var uploader = this.holder[dataKey];
			
			if (uploader) {
				uploader.reset();
				uploader = null;
				
				delete this.holder[dataKey];
			}
		}
}

