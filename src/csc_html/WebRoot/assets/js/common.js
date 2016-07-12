var pc = {};
pc.msg = {
    _getErrorHtml: function() {
        return '<div id="Msg__errorInfoDialog"  class="error-info-dialog ">' + '<div id="Msg__errorTitleArea" class="error-title-area">' + '<span id="Msg__errorName"  class="error-name"></span> <span  onclick="$.unblockUI();" class="_close">关闭</span>' + '</div>' + '<div id="Msg__errorContentArea" class="error-content-area">' + '<div>' + '<span class="error-title">错误编码：</span><p id="Msg__errorCode"  class="error-content"></p>' + '<span class="error-title">错误信息：</span><p  id="Msg__errorMessage"  class="error-content"></p >' + '<div class="error-title error-detail-link"   onclick="pc.msg.swicthErrorStackTraceView(this);">查看详情</div>' + '<p  id="Msg__errorStackTrace"  class="error-content" style="display:none;"></p>' + '</div>' + '</div>';
    },
    /**显示错误信息，name=标题，msg={exceptionMessage:"",exceptionCode:"",stackTrace:""}**/
    showError: function(name, msg) {
    	//避免含有加载的调用报错时无法隐藏加载图标
//    	if(typeof(hideLoading) == "function"){hideLoading();}
    	
    	$("#Msg__errorInfoDialog").remove();
        $("body").append(this._getErrorHtml());
        $('#Msg__errorName').html(name);
        $('#Msg__errorMessage').html(msg.exceptionMessage);
        $('#Msg__errorCode').html(msg.exceptionCode);
        $('#Msg__errorStackTrace').html(msg.stackTrace);
        if ($(window).width() * 0.8 > 700) {
            $.blockUI({
                message: $('#Msg__errorInfoDialog'),
                css: {
                    width: '700',
                    height: '500',
                    top: '20%',
                    left: '30%',
                    textAlign: 'left',
                    cursor: 'default',
                    border: '1px solid #987654'
                },
                onOverlayClick: null
            });
            $("#Msg__errorContentArea").height(475);
        } else {
            $.blockUI({
                message: $('#Msg__errorInfoDialog'),
                css: {
                    width: '80%',
                    top: '10%',
                    left: '10%',
                    textAlign: 'left',
                    cursor: 'default',
                    border: '1px solid #987654'
                },
                onOverlayClick: null
            });
            $("#Msg__errorContentArea").height($(window).height() * 0.8 - 25);
        }
        $(".errorContent").width($("#Msg__errorTitleArea").width() - 40);
    },
    swicthErrorStackTraceView: function(src) {
        var st = $("#Msg__errorStackTrace").get(0);
        if (st.style.display == "none") {
            st.style.display = "block";
            src.style.borderBottom = "solid 1px blue";
        } else {
            st.style.display = "none";
            src.style.borderBottom = "";
        }
    }
};

pc.rest = {
    /**
		connectorId 数据库表connector的id
		apiKey 类RestApi的key值
		placeholder 请求的url中的占位符的值
		params 请求的url后面?跟随的值 注意： 这个方法可以接受json格式的参数， 分页字段:currentPage perPageNum
		content 请求中body的值
		errorFun 发生错误时的函数,参数data:请求返回的数据|textStatus:请求的返回状态|custParam:自定义参数，对应callbackCustParam
		successFun 成功是的函数，参数data:请求返回的数据|textStatus:请求的返回状态|custParam:自定义参数，对应callbackCustParam
		async 是否异步 默认为true
		callbackCustParam:回调函数中要传递的自定义参数，用于提供回调函数上下文以外的对象。
		*/
    get: function(connectorId, apiKey, placeholder, params, errorFun, successFun, async, callbackCustParam) {
    	if(connectorId == null || connectorId == "null"){ return;  }//防止加载其他页面时 js继续运行 connectorId 为null的情况
    	params = pc.util.httpQueryParamConvert(params);
        $.ajax({
            url: '/restServlet',    
            type: 'POST',
            cache: false,
            data: {
                connectorId: connectorId,
                apiKey: apiKey,
                placeholder: placeholder,
                params:params,
                apiType: 'GET'
            },
            dataType: 'json',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            async: pc.rest.isAsync(async),
            error: function(XMLHttpRequest, textStatus, errorThrown) {
            	//避免含有加载的调用报错时无法隐藏加载图标
//            	if(typeof(hideLoading) == "function"){hideLoading();}
                /*var errorData = {
            			"exceptionCode:":productLogo.toLocaleUpperCase()+"001",
            			"exceptionMessage":"ajax请求失败：[GET] connectorId:" + connectorId + ",apiKey:" + apiKey + ",placeholder:" + placeholder + ",params:" + params + " -" + errorThrown,
            			"stackTrace:":textStatus
            	}
               errorFun(errorData);*/
            },
            success: function(data, textStatus) {
            	//避免含有加载的调用报错时无法隐藏加载图标
//            	if(typeof(hideLoading) == "function"){hideLoading();}
                if (data.exceptionMessage || data.exceptionCode) {
                    //				alert("错误编码:"+data.exceptionCode+"\n错误原因："+data.exceptionMessage);
                    errorFun(data, textStatus, callbackCustParam);
                } else {
                    successFun(data, textStatus, callbackCustParam);
                }
            }
        });
    },
    /**
	connectorId 数据库表connector的id
	apiKey 类RestApi的key值
	placeholder 请求的url中的占位符的值
	params 请求的url后面?跟随的值
	content 请求中body的值
	errorFun 发生错误时的函数,参数data:请求返回的数据|textStatus:请求的返回状态|custParam:自定义参数，对应callbackCustParam
	successFun 成功是的函数，参数data:请求返回的数据|textStatus:请求的返回状态|custParam:自定义参数，对应callbackCustParam
	async 是否异步 默认为true
	callbackCustParam:回调函数中要传递的自定义参数，用于提供回调函数上下文以外的对象。
	*/
  getHtml: function(connectorId, apiKey, placeholder, params, errorFun, successFun, async, callbackCustParam) {
	if(connectorId == null || connectorId == "null"){ return;  }//防止加载其他页面时 js继续运行 connectorId 为null的情况
    $.ajax({
        url: '/restServlet',
        type: 'POST',
        cache: false,
        data: {
            connectorId: connectorId,
            apiKey: apiKey,
            placeholder: placeholder,
            params:params,
            apiType: 'GET'
        },
        dataType: 'text',
        contentType: 'application/x-www-form-urlencoded; charset=utf-8',
        async: pc.rest.isAsync(async),
        error: function(XMLHttpRequest, textStatus, errorThrown) {
        	//避免含有加载的调用报错时无法隐藏加载图标
//        	if(typeof(hideLoading) == "function"){hideLoading();}
            /*var errorData = {
        			"exceptionCode:":productLogo.toLocaleUpperCase()+"001",
        			"exceptionMessage":"ajax请求失败：[GET] connectorId:" + connectorId + ",apiKey:" + apiKey + ",placeholder:" + placeholder + ",params:" + params + " -" + errorThrown,
        			"stackTrace:":textStatus
        	}
           errorFun(errorData);*/
        },
        success: function(data, textStatus) {
        	//避免含有加载的调用报错时无法隐藏加载图标
//        	if(typeof(hideLoading) == "function"){hideLoading();}
            if (data.exceptionMessage || data.exceptionCode) {
                //				alert("错误编码:"+data.exceptionCode+"\n错误原因："+data.exceptionMessage);
                errorFun(data, textStatus, callbackCustParam);
            } else {
                successFun(data, textStatus, callbackCustParam);
            }
        }
    });
   },
    post: function(connectorId, apiKey, placeholder, content, errorFun, successFun, async, showLoadingEffect, callbackCustParam) {
        if(showLoadingEffect==undefined || showLoadingEffect != false){
            showLoading();
        }
        $.ajax({
            url: '/restServlet',
            type: 'POST',
            data: {
                connectorId: connectorId,
                apiKey: apiKey,
                placeholder: placeholder,
                content: content,
                apiType: 'POST'
            },
            dataType: 'json',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            async: pc.rest.isAsync(async),
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                //alert("ajax请求失败：[POST]" + apiKey + " -" + errorThrown);
                //alert("ajax请求失败：[POST] connectorId:" + connectorId + ",apiKey:" + apiKey + ",placeholder:" + placeholder + ",content:" + content + " -" + errorThrown);
                if(showLoadingEffect==undefined || showLoadingEffect != false){
                    hideLoading();
                }
                var errorData = {
                        "exceptionCode:":productLogo.toLocaleUpperCase()+"001",
                        "exceptionMessage":"ajax请求失败：[POST] connectorId:" + connectorId + ",apiKey:" + apiKey + ",placeholder:" + placeholder + " -" + errorThrown,
                        "stackTrace:":textStatus
                }
                errorFun(errorData,textStatus,callbackCustParam);
            },
            success: function(data, textStatus) {
                if(showLoadingEffect==undefined || showLoadingEffect != false){
                    hideLoading();
                }
                if (data.exceptionMessage || data.exceptionCode) {
                    //alert("错误编码:"+data.exceptionCode+"\n错误原因："+data.exceptionMessage);
                    errorFun(data, textStatus,callbackCustParam);
                } else {
                    successFun(data, textStatus,callbackCustParam);
                }
            }
        });

    },
    postWithQueryParam: function(connectorId, apiKey, placeholder,params, content, errorFun, successFun, async, showLoadingEffect) {
    	params = pc.util.httpQueryParamConvert(params);
        if(showLoadingEffect==undefined || showLoadingEffect != false){
            showLoading();
        }
        $.ajax({
            url: '/restServlet',
            type: 'POST',
            data: {
                connectorId: connectorId,
                apiKey: apiKey,
                placeholder: placeholder,
                content: content,
                params:params,
                apiType: 'POST'
            },
            dataType: 'json',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            async: pc.rest.isAsync(async),
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                //alert("ajax请求失败：[POST]" + apiKey + " -" + errorThrown);
                //alert("ajax请求失败：[POST] connectorId:" + connectorId + ",apiKey:" + apiKey + ",placeholder:" + placeholder + ",content:" + content + " -" + errorThrown);
                if(showLoadingEffect==undefined || showLoadingEffect != false){
                    hideLoading();
                }
                var errorData = {
                        "exceptionCode:":productLogo.toLocaleUpperCase()+"001",
                        "exceptionMessage":"ajax请求失败：[POST] connectorId:" + connectorId + ",apiKey:" + apiKey + ",placeholder:" + placeholder + " -" + errorThrown,
                        "stackTrace:":textStatus
                }
                errorFun(errorData);
            },
            success: function(data, textStatus) {
                if(showLoadingEffect==undefined || showLoadingEffect != false){
                    hideLoading();
                }
                if (data.exceptionMessage || data.exceptionCode) {
                    //alert("错误编码:"+data.exceptionCode+"\n错误原因："+data.exceptionMessage);
                    errorFun(data, textStatus);
                } else {
                    successFun(data, textStatus);
                }
            }
        });

    },
    put: function(connectorId, apiKey, placeholder, content, errorFun, successFun, async, showLoadingEffect) {
        if(showLoadingEffect==undefined || showLoadingEffect != false){
            showLoading();
        }
        $.ajax({
            url: '/restServlet',
            type: 'POST',
            cache: false,
            data: {
                connectorId: connectorId,
                apiKey: apiKey,
                placeholder: placeholder,
                content: content,
                apiType: 'PUT'
            },
            async: pc.rest.isAsync(async),
            dataType: 'json',
            error: function(XMLHttpRequest, textStatus, errorThrown) {
            	//alert("ajax请求失败：[PUT]" + apiKey + " -" + errorThrown);
            	//alert("ajax请求失败：[PUT] connectorId:" + connectorId + ",apiKey:" + apiKey + ",placeholder:" + placeholder + ",content:" + content + " -" + errorThrown);
                if(showLoadingEffect==undefined || showLoadingEffect != false){
                    hideLoading();
                }
                errorFun(internationalizationObj.common_pc_rest_error+"[PUT] connectorId:" + connectorId + ",apiKey:" + apiKey + ",placeholder:" + placeholder + ",content:" + content + " -" + errorThrown, textStatus);
            },//ajax请求失败：
            success: function(data, textStatus) {
                if(showLoadingEffect==undefined || showLoadingEffect != false){
                    hideLoading();
                }
                if (data.exceptionMessage || data.exceptionCode) {
                    errorFun(data, textStatus);
                } else {
                    successFun(data, textStatus);
                }
            }
        });
    },

    del: function(connectorId, apiKey, placeholder, params, errorFun, successFun, async, showLoadingEffect) {
        if(showLoadingEffect==undefined || showLoadingEffect != false){
            showLoading();
        }
        $.ajax({
            url: '/restServlet',
            type: 'POST',
            data: {
                connectorId: connectorId,
                apiKey: apiKey,
                placeholder: placeholder,
                params:params,
                apiType: 'DELETE'
            },
            async: pc.rest.isAsync(async),
            dataType: 'json',
            error: function(XMLHttpRequest, textStatus, errorThrown) {
            	//alert("ajax请求失败：[DELETE]" + apiKey + " -" + errorThrown);
            	//alert("ajax请求失败：[DELETE] connectorId:" + connectorId + ",apiKey:" + apiKey + ",placeholder:" + placeholder + ",content:" + content + " -" + errorThrown);
                if(showLoadingEffect==undefined || showLoadingEffect != false){
                    hideLoading();
                }
                errorFun(internationalizationObj.common_pc_rest_error+"[DELETE] connectorId:" + connectorId + ",apiKey:" + apiKey + ",placeholder:" + placeholder + ",params:" + params + " -" + errorThrown, textStatus);
            },//ajax请求失败：
            success: function(data, textStatus) {
                if(showLoadingEffect==undefined || showLoadingEffect != false){
                    hideLoading();
                }
                if (data.exceptionMessage || data.exceptionCode) {
                    errorFun(data, textStatus);
                } else {
                    successFun(data, textStatus);
                }
            }
        });
    },

    delWithBody: function(connectorId, apiKey, placeholder, params, errorFun, successFun, async) {
        $.ajax({
            url: '/restServlet',
            type: 'POST',
            data: {
                connectorId: connectorId,
                apiKey: apiKey,
                placeholder: placeholder,
                params: params,
                apiType: 'DELETE'
            },
            async: pc.rest.isAsync(async),
            dataType: 'json',
            error: function(XMLHttpRequest, textStatus, errorThrown) {
            	//alert("ajax请求失败：[DELETE]" + apiKey + " -" + errorThrown);
            	//alert("ajax请求失败：[DELETE] connectorId:" + connectorId + ",apiKey:" + apiKey + ",placeholder:" + placeholder + ",params:" + params + " -" + errorThrown);
                errorFun(internationalizationObj.common_pc_rest_error+"[DELETE] connectorId:" + connectorId + ",apiKey:" + apiKey + ",placeholder:" + placeholder + ",params:" + params + " -" + errorThrown, textStatus);
            },//ajax请求失败：
            success: function(data, textStatus) {
                if (data.exceptionMessage || data.exceptionCode) {
                    errorFun(data, textStatus);
                } else {
                    successFun(data, textStatus);
                }
            }
        });
    },

    //资源纳管单独的请求方法(因为ip不知道)
    getByIp: function(ip, apiKey, placeholder, params, errorFun, successFun, async) {
        $.ajax({
            url: '/restServlet',
            type: 'GET',
            cache: false,
            data: {
                ip: ip,
                apiKey: apiKey,
                placeholder: placeholder,
                params: params
            },
            dataType: 'json',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            async: pc.rest.isAsync(async),
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                errorFun(errorThrown, textStatus);
            },
            success: function(data, textStatus) {
                if (data.exceptionMessage) {
                    errorFun(data, textStatus);
                } else {
                    successFun(data, textStatus);
                }
            }
        });
    },

    postByIp: function(ip, apiKey, placeholder, content, errorFun, successFun, async) {
        $.ajax({
            url: '/restServlet',
            type: 'POST',
            data: {
                ip: ip,
                apiKey: apiKey,
                placeholder: placeholder,
                content: content
            },
            dataType: 'json',
            contentType: 'application/x-www-form-urlencoded; charset=utf-8',
            async: pc.rest.isAsync(async),
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                errorFun(errorThrown, textStatus);
            },
            success: function(data, textStatus) {
                if (data.exceptionMessage) {
                    errorFun(data, textStatus);
                } else {
                    successFun(data, textStatus);
                }
            }
        });
    },

    putByIp: function(ip, apiKey, placeholder, content, errorFun, successFun, async) {
        $.ajax({
            url: '/restServlet',
            cache: false,
            data: {
                ip: ip,
                apiKey: apiKey,
                placeholder: placeholder,
                content: content,
                apiType: 'PUT'
            },
            async: pc.rest.isAsync(async),
            dataType: 'json',
            error: function(XMLHttpRequest, textStatus, errorThrown) {},
            success: function(data, textStatus) {
                if (data.exceptionMessage || data.exceptionCode) {
                    errorFun(data, textStatus);
                } else {
                    successFun(data, textStatus);
                }
            }
        });
    },
    isAsync: function(async) {
        var asyncText = true;
        if (async != undefined) {
            asyncText = async;
        }
        return asyncText;
    },
    getBatchData: function(urls, onGet) {
        var BatchGetStore = new Array();
        var results = {};
        BatchGetStore.push(results);
        var indexAtStore = BatchGetStore.length - 1;

        var isBatchExecuted = function(results) {
            for (var s in results) {
                if (results[s].data == null) return false;
            }
            return true;
        }

        var eachError = function(data, textStatus, context) {
            var results = BatchGetStore[context.index];
            results[context.connectorId].data = data;
            results[context.connectorId].type = "faild";
            if (isBatchExecuted(results)) return onGet(results);
        };
        var eachSuccess = function(data, textStatus, context) {
            var results = BatchGetStore[context.index];
            results[context.connectorId].data = data;
            results[context.connectorId].type = "success";
            if (isBatchExecuted(results)) return onGet(results);
        };

        for (var i = 0; i < urls.length; i++) {
            var url = urls[i];
            results[url.connectorId + ""] = {
                "cid": url.connectorId,
                "url": url,
                "result": null,
                "resultType": null
            };
            pc.rest.get(url.connectorId, url.apiKey, url.placeholder, url.params, eachError, eachSuccess, true, {
                "index": indexAtStore,
                "connectorId": url.connectorId
            });

        }
    },
    postBatchData: function(urls, onGet) {
        var BatchGetStore = new Array();
        var results = {};
        BatchGetStore.push(results);
        var indexAtStore = BatchGetStore.length - 1;

        var isBatchExecuted = function(results) {
            for (var s in results) {
                if (results[s].data == null) return false;
            }
            return true;
        }

        var eachError = function(data, textStatus, context) {
            var results = BatchGetStore[context.index];
            results[context.connectorId].data = data;
            results[context.connectorId].type = "faild";
            if (isBatchExecuted(results)) return onGet(results);
        };
        var eachSuccess = function(data, textStatus, context) {
        	
            var results = BatchGetStore[context.index];
            results[context.connectorId].data = data;
            results[context.connectorId].type = "success";
            if (isBatchExecuted(results)) return onGet(results);
        };

        for (var i = 0; i < urls.length; i++) {
            var url = urls[i];
            results[url.connectorId + ""] = {
                "cid": url.connectorId,
                "url": url,
                "result": null,
                "resultType": null
            };
            pc.rest.post(url.connectorId, url.apiKey,url.placeholder, url.content, eachError, eachSuccess, true, false,{
                "index": indexAtStore,
                "connectorId": url.connectorId
            });

        }
    },

    /**
     * 批量执行get
     */
    batchGetData : function(urls,onGet){
        var results = {};
        
        var isBatchExecuted = function(results) {
            for (var s in results) {
                if (results[s].data == null || results[s].data == undefined){
                    return false;
                }
            }
            return true;
        }
        var eachError = function(data, textStatus, context) {
            results[context.index].data = data;
            results[context.index].type = "faild";
            if (isBatchExecuted(results)){
                return onGet(results);
            }
        };
        var eachSuccess = function(data, textStatus, context) {
            results[context.index].data = data;
            results[context.index].type = "success";
            if (isBatchExecuted(results)){
                return onGet(results);
            }
        };
        for (var i = 0; i < urls.length; i++) {
            var url = urls[i];
            results[i] = {
                "cid": url.connectorId,
                "url": url,
                "result": null,
                "resultType": null
            };
            pc.rest.get(url.connectorId, url.apiKey, url.placeholder, url.params, eachError, eachSuccess, true, {
                "index": i,
                "connectorId": url.connectorId
            });
        }
    }
}

function adapterSpeedNames(str, item) {
    if (item.type != "EtherChannel") {
        var strNum = "";
        var strTxt = "";
        var adapterSpeed = item.adapterSpeed;
        if (adapterSpeed == null || adapterSpeed == "") {
            return "";
        }
        var adapterSpeedObj = adapterSpeed.split("_");
        strNum = (adapterSpeedObj[0]);
        if (item.adapterSpeed == "Auto_Negotiation") {
            str = internationalizationObj.common_function_adapterSpeedNames_check1;// 自动
        } else if (adapterSpeedObj[1] == "Full") {
            strTxt = internationalizationObj.common_function_adapterSpeedNames_check2;// 全双工
            str = strNum + strTxt;
        } else if (adapterSpeedObj[1] == "Half") {
            strTxt = internationalizationObj.common_function_adapterSpeedNames_check3;// 半双工
            str = strNum + strTxt;
        }
    }
    return str;
}

pc.util = {
  httpQueryParamConvert:function (params){
			if(typeof(params) == "object" && params != null){
	            var paramString = "";
	            if(params.currentPage != null){
	               paramString += params.perPageNum ?  pc.util.genPageQueryParam( params.currentPage , params.perPageNum ) : pc.util.genPageQueryParam( params.currentPage );
	            }   
	            for(var index in params){
	                if( index != "perPageNum" && index != "currentPage"){
	                	if(paramString == ""){
	                		paramString +=  index + "=" + encodeURIComponent(params[index]);
	                	}else{
	                		paramString += "&" + index + "=" + encodeURIComponent(params[index]);
	                	}
	                }
	            }
	            params = paramString;
	        }
			return params;
	},		
	isIP:function (strIP) {
		//匹配IP地址的正则表达式
		var re=/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g; 
		if(re.test(strIP)){
			if( RegExp.$1 <256 && RegExp.$2<256 && RegExp.$3<256 && RegExp.$4<256) return true;
		} 
		return false;
	},
	checkIpAddress:function(ipStr){
		if(ipStr[0] == ',' || ipStr[ ipStr.length -1 ] == ',') return false;
		var	ips = ipStr.split(",");
		for(var i = 0 ; i < ips.length ; i++){
			var ipss = ips[i].split("/");
			if(ipss[0] == '/' || ipss[ ipss.length -1 ] == '/') return false;
			if(!pc.util.isIP(ipss[0])){
				return false;
				if(isNaN(ipss[1]) && ipss[1] > 0 && ipss[1] <= 32);
				else 
					return false;
			}
		}
		return true;
	},
	replaceQto:function(str){
		return  str == null ? "" :  pc.util.trim(str.replace(/\'/g,""));
	},
	storageUnitFormate:function(num){
		var dateNum = 0;
		var dataUnit = " GB";
		if(pc.util.isNotNull(num)){
			dateNum = parseFloat(num);
			if(dateNum > 1024){
				dateNum = dateNum/1024;
				dataUnit = " TB"; 
			}
			//dateNum = pc.util.formatNumber(dateNum);
			dateNum = dateNum.toFixed(2);
		}
		return dateNum+dataUnit;
	},
	storageSizeFormate:function(num){
		var dateNum = 0;
		if(pc.util.isNotNull(num)){
			dateNum = parseFloat(num);
			if(dateNum > 1024){
				dateNum = dateNum/1024;
			}
			dateNum = dateNum.toFixed(2);
		}
		return dateNum;
	},
	trim:function (str,is_global){
		var result; 
		result = str.replace(/(^\s+)|(\s+$)/g,"");
		if(is_global.toLowerCase()==" ")
			result = result.replace(/\s/g,"");
		return result;
	},
    changeSort: function(columnName, sortOrder, listName) {
        var manager = $(listName).ligerGetGridManager();
        manager.changeSort(columnName, sortOrder);
    },
    isNotNull: function(exp) {
        return ! (exp == null || exp == "" || typeof(exp) == "undefined" || exp == "undefined" || exp == "null");
    },
    isNull: function(exp) {
        return !pc.util.isNotNull(exp);
    },
    alertWarn: function(content, ok_fun) {
        var info = '<div style="height:60px;display:table;"><div style="display:table-cell;vertical-align:middle;padding-right: 10px; ">' + content + '</div></div>';

        $.ligerDialog.warn(info, ok_fun);
    },
    success: function(content, ok_fun) {
        var info = '<div style="height:60px;display:table;"><div style="display:table-cell;vertical-align:middle;padding-right: 10px; ">' + content + '</div></div>';
        $.ligerDialog.success(info, internationalizationObj.common_pc_util_success_check, ok_fun);//提示信息
    },
    confirm: function(content, callback) {
        var info = '<div style="height:60px;display:table;"><div style="display:table-cell;vertical-align:middle;padding-right: 10px; ">' + content + '</div></div>';
        $.ligerDialog.confirm(info, callback);
    },
    waitting: function(content) {
        return $.ligerDialog.waitting(content);
    },
    accMul: function(arg1, arg2) //js 两数相乘  float精度问题 
    {
        var m = 0,
        s1 = arg1.toString();
        s2 = arg2.toString();
        try {
            m += s1.split(".")[1].length
        } catch(e) {}
        try {
            m += s2.split(".")[1].length
        } catch(e) {}
        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
    },
	accDiv:function(arg1,arg2){   //js 两数相除  float精度问题 
	    var t1=0,t2=0,r1,r2;  
	    try{t1=arg1.toString().split(".")[1].length}catch(e){}  
	    try{t2=arg2.toString().split(".")[1].length}catch(e){}  
	    with(Math){  
	        r1=Number(arg1.toString().replace(".",""));  
	        r2=Number(arg2.toString().replace(".",""));  
	        return (r1/r2)*pow(10,t2-t1);  
	    }
	},
	accAdd : function(arg1,arg2){//js 两数相加 float精度问题 
		var r1,r2,m;
		try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
		try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
		m=Math.pow(10,Math.max(r1,r2))
		return (arg1*m+arg2*m)/m
	},
	Subtr: function(arg1,arg2){
	     var r1,r2,m,n;
	     try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
	     try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
	     m=Math.pow(10,Math.max(r1,r2));
	     n=(r1>=r2)?r1:r2;
	     return ((arg1*m-arg2*m)/m).toFixed(n);
	},
    dateToStr: function(time, useType) //将时间类型转换成字符串
    {
    	var year = time.getFullYear();
        var month = time.getMonth();
        var day = time.getDate();
        var hour = time.getHours();
        var min = time.getMinutes();
        var seconds = time.getSeconds();
        
        var dataStr = year + "-" + pc.util.paddingLeftByZero((month + 1), 2) + "-" + pc.util.paddingLeftByZero(day, 2);
        if (useType != "notAddTime") {
        	dataStr += " "+ pc.util.paddingLeftByZero(hour, 2) + ":" + pc.util.paddingLeftByZero(min, 2) + ":" + pc.util.paddingLeftByZero(seconds, 2);
        }
        
        return dataStr;
    },
    dataStrFormat:function(str){//将2013-03-26 21:32:00 000形式的时间字符串，转换成2013-03-26 21:32:00
    	if(pc.util.isNull(str)) return str;
    	return str.substr(0,19);
    }
    ,
    timeToStr: function(time, useType) { //将时间戳类型转换成字符串
        var data = new Date(time);
        return pc.util.dateToStr(data, useType);
    },
    timeToFormatStr : function(time,format){//将时间戳转换成指定的格式字符串
    	 var t = new Date(time);
    	    var tf = function(i) {
    	        return (i < 10 ? '0': '') + i
    	    };
    	    return format.replace(/yyyy|MM|dd|HH|mm|ss/g,
    	    function(a) {
    	        switch (a) {
    	        case 'yyyy':
    	            return tf(t.getFullYear());
    	            break;
    	        case 'MM':
    	            return tf(t.getMonth() + 1);
    	            break;
    	        case 'mm':
    	            return tf(t.getMinutes());
    	            break;
    	        case 'dd':
    	            return tf(t.getDate());
    	            break;
    	        case 'HH':
    	            return tf(t.getHours());
    	            break;
    	        case 'ss':
    	            return tf(t.getSeconds());
    	            break;
    	        }
    	    })
    },
    randomVal:function(){
    	return pc.util.timeToFormatStr(new Date(),"yyyyMMddHHmmss")+Math.round(Math.random()*10000);
    },
    paddingLeftByZero: function(orgi, digit) {
        /*数字位数达不到预期位数时，在左边位置补0。注：只适用整数。orig:原始数字，digit:预期位数*/
        var str = orgi + "";
        if (str.length < digit) {
            var needPadding = digit - str.length;
            for (var i = 0; i < needPadding; i++) {
                str = "0" + str;
            }
        }
        return str;
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
    },
    changeTwoDecimal : function(floatvar){
    	//将浮点数四舍五入，取小数点后2位
    	var f_x = parseFloat(floatvar);
    	if (isNaN(f_x))
    	{
    	return "";
    	}
    	var f_x = Math.round(floatvar*100)/100;
    	return f_x;
    },
    changeTwoDecimal_f : function(floatvar){
    	//将浮点数四舍五入，取小数点后2位，如果不足2位则补0,这个函数返回的是字符串的格式
    	 var f_x = parseFloat(floatvar);
	  	  if (isNaN(f_x))
	  	  {
	  	 	 return "";
	  	  }
	  	  var f_x = Math.round(floatvar*100)/100;
	  	  var s_x = f_x.toString();
	  	  var pos_decimal = s_x.indexOf('.');
	  	  if (pos_decimal < 0)
	  	  {
	  		  pos_decimal = s_x.length;
	  		  s_x += '.';
	  	  }
	  	  while (s_x.length <= pos_decimal + 2)
	  	  {
	  		  s_x += '0';
	  	  }
	  	  return s_x;
    },
    buildTreeUrl:function(connectorId, apiKey, placeholder, params){
    	return "/restServlet?connectorId="+connectorId+"&apiType=get&apiKey="+apiKey+"&placeholder="+placeholder+"&params="+params;
    },
    createIP : function (segmentValue){
    	
    	var mask = segmentValue.split("/")[1];
    	
    	var bit="";
    	for(var i=0;i<mask;i++){
    		bit +="1";
    	}
    	
    	var binary = this.paddingRightByZero(bit,32);
    	
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
	    	  alert(internationalizationObj.common_pc_util_bin2dec_check);//二进制值有错误!
	    	  return false;
    	  }
    	}
    	 return dec;
     },
     formatNumber:function(num){//将数字转格式成千位符显示，num为字符串
    	 if(!isNaN(num)) num = ""+num;
    	 if(num == "0" || num == 0){//去掉0.00
    		 return num;
    	 }
    	 if(/[^0-9\.]/.test(num)) return num;
    	 num=num.replace(/^(\d*)$/,"$1.");
	      num=(num+"00").replace(/(\d*\.\d\d)\d*/,"$1");
	      num=num.replace(".",",");
	      var re=/(\d)(\d{3},)/;
	      while(re.test(num))
	              num=num.replace(re,"$1,$2");
	      num=num.replace(/,(\d\d)$/,".$1");
	      return num.replace(/^\./,"0.");
     },
	/**
	 * 获取当前时间
	 */
	getNowFormatDate:function () {
		var day = new Date();
		var Year = 0;
		var Month = 0;
		var Day = 0;
		var CurrentDate = "";
		//初始化时间 
		//Year= day.getYear();//有火狐下2008年显示108的bug 
		Year = day.getFullYear();//ie火狐下都可以 
		Month = day.getMonth() + 1;
		Day = day.getDate();
		Hour = day.getHours();
		Minute = day.getMinutes();
		Second = day.getSeconds();
		CurrentDate += Year + "-";
		if (Month >= 10) {
			CurrentDate += Month + "-";
		} else {
			CurrentDate += "0" + Month + "-";
		}
		if (Day >= 10) {
			CurrentDate += Day;
		} else {
			CurrentDate += "0" + Day;
		}
		CurrentDate += " ";

		if (Hour >= 10) {
			CurrentDate += Hour + ":";
		} else {
			CurrentDate += "0" + Hour + ":";
		}
		if (Minute >= 10) {
			CurrentDate += Minute + ":";
		} else {
			CurrentDate += "0" + Minute + ":";
		}
		if (Second >= 10) {
			CurrentDate += Second;
		} else {
			CurrentDate += "0" + Second;
		}
		return CurrentDate;
	},
	
	/**
	 * 获取当前日期前N天
	 */
	getAfterDate:function (curDate, days) {
		//获取s系统时间 
		var LSTR_ndate = new Date(Date.parse(curDate.replace(/-/g, "/")));
		var LSTR_Year = LSTR_ndate.getFullYear();
		var LSTR_Month = LSTR_ndate.getMonth();
		var LSTR_Date = LSTR_ndate.getDate();
		//处理 
		var uom = new Date(LSTR_Year, LSTR_Month, LSTR_Date);
		uom.setDate(uom.getDate() - days);//取得系统时间的前一天,重点在这里,负数是前几天,正数是后几天 
		var LINT_MM = uom.getMonth();
		LINT_MM++;
		var LSTR_MM = LINT_MM > 10 ? LINT_MM : ("0" + LINT_MM);
		var LINT_DD = uom.getDate();
		var LSTR_DD = LINT_DD >= 10 ? LINT_DD : ("0" + LINT_DD);
		//得到最终结果 
		uom = uom.getFullYear() + "-" + LSTR_MM + "-" + LSTR_DD;
		return uom + " 00:00:00";
	},
	/**
	 * 获取当前日期前N分钟（小时）
	 */
	getAfterTime:function (curDate, time, type) {
		var hour = "00";
		var minute = "00";
		//获取s系统时间 
		var LSTR_ndate = new Date(Date.parse(curDate.replace(/-/g, "/")));
		var LSTR_Year = LSTR_ndate.getFullYear();
		var LSTR_Month = LSTR_ndate.getMonth();
		var LSTR_Date = LSTR_ndate.getDate();
		var LSTR_Hour = LSTR_ndate.getHours();
		var LSTR_Minute = LSTR_ndate.getMinutes();
		var LSTR_seconds = LSTR_ndate.getSeconds();
		if(LSTR_seconds<10){
			LSTR_seconds ="0"+LSTR_seconds;
		}
		//处理 
		var uom = new Date(LSTR_Year, LSTR_Month, LSTR_Date);
		if(type == "hour"){
			if(LSTR_Hour < 1){
				uom.setDate(uom.getDate() - 1);
				hour = 59;
			}else{
				hour = LSTR_Hour - 1;
			}
			minute = LSTR_Minute;
		}else if(type == "minute"){
			if(LSTR_Minute < 10){
				//uom.setDate(uom.getDate() - 1);
				minute = 60 + LSTR_Minute - 10;
				if(LSTR_Hour > 1){
					hour = LSTR_Hour - 1;
				}else{
					hour = 23;
					uom.setDate(uom.getDate() - 1);
				}
			}else{
				minute = LSTR_Minute - 10;
				hour = LSTR_Hour;
			}
		}
		var LINT_MM = uom.getMonth();
		LINT_MM++;
		var LSTR_MM = LINT_MM > 10 ? LINT_MM : ("0" + LINT_MM);
		var LINT_DD = uom.getDate();
		var LSTR_DD = LINT_DD >= 10 ? LINT_DD : ("0" + LINT_DD);
		//得到最终结果 
		uom = uom.getFullYear() + "-" + LSTR_MM + "-" + LSTR_DD;
		if(hour != "00"){
			hour = hour < 10 ? ("0" + hour) : hour;
		}
		if(minute != "00"){
			minute = minute < 10 ? ("0" + minute) : minute;
		}
		return uom + " "+hour+":"+minute+":"+LSTR_seconds;
	},
    handlerWorkloadNum: function(workloadNum) {
        if (pc.util.isNotNull(workloadNum)) {
            workloadNum--; //虚拟机个数据减去vios
            if (workloadNum < 0) {
                workloadNum = 0;
            }
        } else {
            workloadNum = 0;
        }
        return workloadNum;
    },
    trim : function(str){
    	return str == null ? "": str.replace(/(^\s*)|(\s*$)/g, "");
    },
    showEmpty : function(str){
    	if(pc.util.isNotNull(str)){
    		return str;
    	}
    	return "";
    },
    invalidObjectAlert : function(str, reg, text){
    	if(reg.test(str)){
			alert(text);
			return true;
		} 
		return false;
    },
    /**
     * 检查是否包含查询条件中不允许的特殊字符&?=，包括特殊字符时，会自动提示。
     * @param str 待检查的字符
     * @return boolean值  true:包括特殊字符。false:不包括特殊字符。 
     */
    invalidQueryParam : function(str){
    	var reg = /[&=?#%']+/;
		return pc.util.invalidObjectAlert(str, reg, internationalizationObj.common_pc_util_invalidQueryParam_check);//查询条件不能包含字符&=?#%_(2015-09-07修改去除_限制)
    },
    invalidValueParam : function(str){
    	var reg = /[。~!@#$%\^\+\*&\\\/\?\|:\.<>{}【】';="]+/;
		return pc.util.invalidObjectAlert(str, reg, internationalizationObj.common_pc_util_invalidValueParam);//查询条件不能包含特殊字符
    },
    invalidQueryParamForExportExcel : function(str){
    	var reg = /[&=?#%_']+/;
		return pc.util.invalidObjectAlert(str, reg, internationalizationObj.common_pc_util_invalidQueryParam_check_for_export_excel);//导出报表时，查询条件不能包含字符&=?#%_
    },
    /**
     * pageNo 当前页数
     * perNum 每页容量 默认12
     */
    genPageQueryParam:function(pageNo,perNum){
    	var pNum = 12;
    	if(perNum){
    		pNum = perNum;
    	}
    	var firstResult=pageNo*pNum;
    	if(isNaN(firstResult)) return "firstResult=0&maxResult="+pNum;
    	return "firstResult="+firstResult+"&maxResult="+pNum;
    },
    bToGB:function(b){
    	if(isNaN(b) || b==0) return "0.00";
    	if(b){
    		return (b/Math.pow(1024, 3)).toFixed(2);
    	}else return b;
    },
    bToMB:function(b){
    	if(isNaN(b) || b==0) return "0.00";
    	if(b){
    		return (b/Math.pow(1024, 2)).toFixed(2);
    	}else return b;
    },
    mHzToGHz : function(mb){
    	if(isNaN(mb)) return "";
    	if(mb){
    		return (mb/1000).toFixed(2);
    	}else return mb;
    },
    mbToGb : function(mb, fixed){
        var fixed = fixed == undefined ? 2 : fixed;
    	if(isNaN(mb)) return "";
    	if(mb){
    		return (mb/1024).toFixed(fixed);
    	}else return mb;
    },
    gbToTb :  function(gb){
    	if(isNaN(gb)) return "";
    	if(gb){
    		return (gb/1024).toFixed(2);
    	}else return gb;
    },
    gbToMb : function(gb){
    	if(isNaN(gb)) return 0;
    	return (parseFloat(gb)*1024).toFixed(0);
    },
    gbToKb : function(gb){
    	if(isNaN(gb)) return 0;
    	return (parseFloat(gb)*1024*1024).toFixed(0);
    },
    gbToB : function(gb){
    	if(isNaN(gb)) return 0;
    	return (parseFloat(gb)*1024*1024*1024).toFixed(0);
    },
    strToFloat:function(num){
   	 try {
   		return parseFloat(num == null?0:num);
		} catch (e) {
			return 0;
		}
    },
    strToInt:function(num){
   	 try {
   		return parseInt(num);
		} catch (e) {
			return 0;
		}
    },
    formatLongInfo : function(maxsize,textBox){
    	var textBox=textBox||".format_long_info";
    	$(textBox).each(function(){
		    var info = $(this).text();
		    if(info.length > maxsize){
			    $(this).text(info.substring(0,maxsize-3)+"...");
			    $(this).attr("title",info);
		    }
	    });
    },
    cutOutStr :function(str,limit){
    	    str = (str == null ?  "" : str);
    	    var returnStr = str;
    	    var realLength = 0, len = str.length, charCode = -1;
    	    for (var i = 0; i < len; i++) {
    	        charCode = str.charCodeAt(i);
    	        if (charCode >= 0 && charCode <= 128){
    	        	 realLength += 1;
    	        }else{
    	        	realLength += 2;
    	        }
    	        if(realLength >= limit){
    	        	var tempStr = str.substr(0,i);
    				returnStr = tempStr +"...";
    				break;
    	        }
    	    }
			return returnStr;
    },
    enCode: function (str) {

		var ret = "";

		var strSpecial = "!\"#$%&'()*+,/:;<=>?[]^`{|}~%";

		for ( var i = 0; i < str.length; i++) {

			var chr = str.charAt(i);

			var c = str2asc(chr);

			//tt+= chr+":"+c+"n";

			if (parseInt("0x" + c) > 0x7f) {

				ret += "%" + c.slice(0, 2) + "%" + c.slice(-2);

			} else {

				if (chr == " ")

					ret += "+";

				else if (strSpecial.indexOf(chr) != -1)

					ret += "%" + c.toString(16);

				else

					ret += chr;

			}

		}

		return ret;

	},
    	
    deCode:	function (str) {

    		var ret = "";

    		for ( var i = 0; i < str.length; i++) {

    			var chr = str.charAt(i);

    			if (chr == "+") {

    				ret += " ";

    			} else if (chr == "%") {

    				var asc = str.substring(i + 1, i + 3);

    				if (parseInt("0x" + asc) > 0x7f) {

    					ret += asc2str(parseInt("0x" + asc
    							+ str.substring(i + 4, i + 6)));

    					i += 5;

    				} else {

    					ret += asc2str(parseInt("0x" + asc));

    					i += 2;

    				}

    			} else {

    				ret += chr;

    			}

    		}

    		return ret;

    	},
    	toFixed : function(number,fractionDigits){  
    		if(number ==0 || number == "0"){
    			return 0;
    		}
    	    with(Math){  
    	        return round(number*pow(10,fractionDigits))/pow(10,fractionDigits);  
    	    }  
    	},
    	/**
    	 * 解析html table中的数据
    	 * @data html字符串
    	 * @colName  列名数组 如：["level","time","event"]
    	 * @tableNum 第几个table里面的数据
    	 */
    	parseHtmlTableData:function(data,colName,tableNum,callback){
    		var text = data;
    		var el = $('<div></div>'); 
    		el.html(text);
    		var selectTableTag;
    		if(tableNum){
    		   var tableTagList = el.find("table");
    		   if(tableTagList && tableTagList.length){
    			   for(var i=0;i<tableTagList.length;i++){
    				   if(i == tableNum){
    					   selectTableTag = $(tableTagList[i]);
    					   break;
    				   }
    			   }
    		   }
    		}
    		
    		if(selectTableTag){
    			el = selectTableTag;
    		}
    		var trTagList = el.find("tr");
    		var result = [];
    		if(trTagList && trTagList.length){
    			var rowspan = []//用于记录跨行的数据
    			for(var i=0;i<trTagList.length;i++){
    				 var trTag = $(trTagList[i]);
    				 var tdTagList = trTag.find("td");
    			
    				 if(rowspan && rowspan.length>0){
    					 for(var k=0;k<rowspan.length;k++){
    						 if(rowspan[k]){
    							 rowspan[k].rowspan--;
        						 tdTagList.splice(rowspan[k].col, 0, rowspan[k].td[0]);
        						 if(rowspan[k].rowspan == 1){//如果没有夸行的数据 清除
        							 delete  rowspan[k];
        						 }
    						 }
    					 }
    				 }
    				 
    				 if(tdTagList && tdTagList.length){
    					 var dataVo = {};
    					 for(var j=0;j<tdTagList.length;j++){
    						 if($(tdTagList[j]).attr("rowspan") && $(tdTagList[j]).attr("rowspan") > 1){
    							 var rowspanNum = $(tdTagList[j]).attr("rowspan");
    							 $(tdTagList[j]).attr("rowspan","1");
    							 var rowspanVo = {
    									 col: j,
    									 rowspan:rowspanNum,
    									 td:$(tdTagList[j])
    							 } 
    							 rowspan.push(rowspanVo);//记录跨行的数据
    						 }
    						 if(callback){//存在自定义回调
    							 dataVo[colName[j]] = callback(dataVo,j,$(tdTagList[j]));
    						 }else{
    							 dataVo[colName[j]] =  $(tdTagList[j]).text(); 
    						 }
    					 }
    					 result.push(dataVo);
    				 }
    				 
    			}
    		}
    		return result;
    	},
    	isNum:function(s){//是否是整数
    		var regu = "^([0-9]*[.0-9])$"; // 小数测试
    		 var re = new RegExp(regu);
    		 if (s.search(re) != -1){
    			 return true;
    		 }else{
    			 return false;
    		 }
    	},
    	isSupportedOsType:function(osTypeName, gpuType, supportedTypesStr){//是否支持的操作系统
    		if(pc.util.isNull(supportedTypesStr) ||pc.util.isNull(osTypeName))return false;
    		
    		var jsonObj = $.parseJSON(supportedTypesStr);
    		if(jsonObj && jsonObj.osTypes && jsonObj.osTypes.length && jsonObj.osTypes.length>0){
    			for(var i=0; i<jsonObj.osTypes.length; i++){
    				var tempOsType = jsonObj.osTypes[i];
    				if(pc.util.isNotNull(gpuType) && gpuType.indexOf(tempOsType.gpuType) == -1){
    					//gpu类型不匹配，则过滤
    					continue;
    				}
    				//是否需要去掉替换@
    	    		//_alert("Windows@Server 2012@R Enterprise".replace(/@/g, " "));
    	    		//osTypeName.replace(/@/g, " ")
    				//操作系统名称包含指定名称内容
    				if(osTypeName.indexOf(tempOsType.name) != -1){
    					return true;
    				}
    				//类型、版本、位数一样
    				/*else if(osTypeName.indexOf(tempOsType.osType) != -1 
    						&& osTypeName.indexOf(tempOsType.osVersion) != -1){ //&& osTypeName.indexOf(tempOsType.bit) != -1
    					return true;
    				}*/
    			}
    		}
    		return false;
    	},
    	tableSelectTr:function(e){
    		 var oEvent = e || event;  
     	  	 var target = oEvent.target || 	oEvent.srcElement;
     	  	 var tagetTable = $(target).parents("table");
    	     if(tagetTable)
             { 
               var tR = $(target).parents("tr");
               tagetTable.find(".beclick").removeClass("beclick");
               tR.addClass("beclick");
             };
             
             if(window.event){
      	  		event.cancelBubble=true; 
      	  	 }else{
      	  		oEvent.stopPropagation();
      	  	 }
    	},
    	getBrowserInfo: function(){
	    	var agent = navigator.userAgent.toLowerCase() ;
	    	var regStr_ie = /msie [\d.]+;/gi ;
	    	var regStr_ff = /firefox\/[\d.]+/gi
	    	var regStr_chrome = /chrome\/[\d.]+/gi ;
	    	var regStr_saf = /safari\/[\d.]+/gi ;
	    	//IE
	    	if(agent.indexOf("msie") > 0)
	    	{
	    	   return agent.match(regStr_ie) ;
	    	}
	    	//firefox
	    	if(agent.indexOf("firefox") > 0)
	    	{
	    	   return agent.match(regStr_ff) ;
	    	}
	    	//Chrome
	    	if(agent.indexOf("chrome") > 0)
	    	{
	    	   return agent.match(regStr_chrome) ;
	    	}
	    	//Safari
	    	if(agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0)
	    	{
	    	   return agent.match(regStr_saf) ;
	    	}
     },
     getBrowserVersion : function(){//识别浏览器类型与版本
    	 var agent = navigator.userAgent.toLowerCase();
    		var browserInfo = {
    			"name" : "",
    			"version" : ""
    		};
    		//IE
    		if(!!window.ActiveXObject || "ActiveXObject" in window){
    			browserInfo.name = "ie";
    			browserInfo.version = "NONE";
//    			console.log("navigator.userAgent : "  + navigator.userAgent);
//    			console.log("navigator.appVersion : "  + navigator.appVersion);
//    			console.log("navigator.appName : " + navigator.appName);
//    			console.log(!!window.ActiveXObject);
//				console.log("ActiveXObject" in window);
    			if(agent.indexOf("msie") > 0){
    				if(navigator.appName == "Microsoft Internet Explorer" && navigator.userAgent.indexOf("MSIE 6.0") > -1){
    					browserInfo.version = "6";
    				}else if(navigator.appName == "Microsoft Internet Explorer" && navigator.userAgent.indexOf("MSIE 7.0") > -1){
    					browserInfo.version = "7";
    				}else if(navigator.appName == "Microsoft Internet Explorer" && navigator.userAgent.indexOf("MSIE 8.0") > -1){
    					browserInfo.version = "8";
    				}else if(navigator.appName == "Microsoft Internet Explorer" && navigator.userAgent.indexOf("MSIE 9.0") > -1){
    					browserInfo.version = "9";
    				}else if(navigator.appName == "Microsoft Internet Explorer" && navigator.userAgent.indexOf("MSIE 10.0") > -1){
    					browserInfo.version = "10";
    				//2015年10月21日 10:40:28 lisy 这种方式识别肯定存在问题，因为鬼知道ie12又是什么机制。
    				}else if(!!window.ActiveXObject || "ActiveXObject" in window){
    					browserInfo.version = "11";
    				}
    			}else if(agent.match(/trident\/([\w.]+)/)){
    				//处理IE11
    				var uaMatch = agent.match(/trident\/([\w.]+)/);
    				switch (uaMatch[1]){
	    				case "4.0": browserInfo.version = "8" ;break;
	    				case "5.0": browserInfo.version = "9" ;break;
	    				case "6.0": browserInfo.version = "10";break;
	    				case "7.0": browserInfo.version = "11";break;
	    				default:;  
    				}  
    			}
    		} 
    		//Chrome
    		if(agent.indexOf("chrome") > 0){
    			browserInfo.name = "chrome";
    			browserInfo.version = "NONE";
    			if(navigator.appVersion.indexOf("Chrome/") > -1){
    				var i = navigator.appVersion.indexOf("Chrome/");
    				var v = navigator.appVersion.substr(i+7, 2);
    				browserInfo.version = v;
    			}
    		}
    		//firefox
    		if(agent.indexOf("firefox") > 0){
    			browserInfo.name = "ff";
    			browserInfo.version = "NONE";
    		}
    		//Safari
    		if(agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0){
    			browserInfo.name = "safari";
    			browserInfo.version = "NONE";
    		}
    		return browserInfo;
     },
     getCookieArray : function(){//获取cookie数组
    	 var strCookie = document.cookie;
    	 var arrCookie = new Array();
    	 if(strCookie.indexOf(";") > -1){
    		 arrCookie = strCookie.split(";");
    	 }else{
    		 arrCookie[0] = strCookie;
    	 }
    	 return arrCookie;
     },
     getCookieValue : function(key){
    	 var arrCookie = pc.util.getCookieArray();
    	 for(var i = 0 ; i < arrCookie.length ; i++){
    		 var arr = arrCookie[i].split("=");
    		 if(pc.util.trim(arr[0]) == key){
    			 return arr[1];
    		 }
    	 }
    	 return "";
     },
     /**
      * 获取主机的虚拟化版本号
      */
     getXcpVersion: function(productVersion){
		if(pc.util.isNull(productVersion)){
			return 0;
		}
		var versionStrs = productVersion.split(".");
		if(versionStrs.length < 2){
			return parseFloat(versionStrs);
		}else{
			return parseFloat(versionStrs[0] + "." + versionStrs[1]);
		}
	}
};

pc.validation = {
    /**
	 * 表单校验公共方法
	 * @param {Object} formId FORM表单ID
	 * @param {Object} submit_fun 校验成功的回调方法
	 */
    initValidation: function(formId, submit_fun) {
        $.metadata.setType("attr", "validate");
        var v = $("#" + formId).validate({
            errorPlacement: function(lable, element) {
                if (element.hasClass("l-textarea")) {
                    element.addClass("l-textarea-invalid");
                } else if (element.hasClass("l-text-field")) {
                    element.parent().addClass("l-text-invalid");
                }
                $(element).removeAttr("title").ligerHideTip();
                $(element).attr("title", lable.html()).ligerTip();
            },
            success: function(lable) {
                if (!lable.attr("for")) return;
                var element = $("#" + lable.attr("for"));
                if (element.hasClass("l-textarea")) {
                    element.removeClass("l-textarea-invalid");
                } else if (element.hasClass("l-text-field")) {
                    element.parent().removeClass("l-text-invalid");
                }
                $(element).removeAttr("title").ligerHideTip();
            },
            submitHandler: function() {
                submit_fun();
            }
        });

        $("#" + formId).ligerForm();
    }
};


/**
 * 去左右空格
 */
String.prototype.trim = function() 
{ 
	return this.replace(/(^\s*)|(\s*$)/g, ""); 
} 

/**
 * 去所有空格
 */
String.prototype.allTrim = function() 
{ 
	return this.replace(/\s+/g, ""); 
}

String.prototype.format = function(args){
	if(arguments.length>0){
		var result = this;
		if(arguments.length==1 && typeof(args)=="object"){
			for(var key in args){
				var reg = new RegExp("({"+key+"})","g");
				result = result.replace(reg,args[key]);
			}
		}else{
			for(var i=0;i<arguments.length;i++){
				if(arguments[i]==undefined){
					return "";
				}else{
					var reg = new RegExp("({["+i+"]})","g");
					result = result.replace(reg,arguments[i]);
				}
			}
		}
		return result;
	}else{
		return this;
	}
}

pc.input = {
	//搜索框默认显示内容：获取光标时隐藏、失去光标无value时显示
	autoShow : function(action, val, id, str){
		val = val.trim();
		if(action == "onfocus"){
			if(str == val){
				$("#"+id).val("");
				$("#"+id).focus();
			}
		}else if(action == "onblur"){
			if("" == val){
				$("#"+id).val(str);
			}
		}
	},
	//列表复选框点击行触发勾选事件
	checkboxToggle : function(tr, callback){
		//过滤点击checkbox触发效果
		var E = window.event || e; 
		   var $target = $(E.srcElement) || $(E.target); 
		   if($target.attr('type') == 'checkbox'){ 
		      return; 
		}
		var isSuccess = true;
		if(callback) {
			isSuccess = callback();
		}
		if(isSuccess){
			tr = $(tr);
			tr.find("input[type='checkbox']").prop("checked", !tr.find("input[type='checkbox']").prop("checked")); 
		}
	}
}

pc.alarm = {
	toWarningName : function(name){
		var info = name;
		//物理主机告警类型
		var s = name.split("_");
		if(s.length > 3){
			name = s[0] + "_" +s[1] + "_" + s[2];
			if(name == "WCE_HOST_CPU"){
				info = "WCE物理主机CPU使用率告警";
				return info;
			}
			if(name == "WCE_HOST_MEM"){
				info = "WCE物理主机内存使用率告警";
				return info;
			}
			if(name == "WCE_HOST_NET"){
				info = "WCE物理主机网络使用速率告警";
				return info;
			}
			//虚拟机告警类型
			if(name == "WCE_VM_CPU"){
				info = "WCE虚拟机CPU使用率告警";
				return info;
			}
			if(name == "WCE_VM_NET"){
				info = "WCE虚拟机网络使用速率告警";
				return info;
			}
			if(name == "WCE_VM_DISKSPEED"){
				info = "WCE虚拟机磁盘使用速率告警";
				return info;
			}
			//存储池告警类型
			if(name == "WCE_STORAGE_DISK"){
				info = "WCE存储池存储使用率告警";
				return info;
			}
		}
		return info;
	},
	
	toWarningBody : function(body){
		var info = body;
		//物理主机告警类型
		var s = body.split("]WCE_");
		if(s.length > 1){
			var s2 = s[1].split("_");
			body = "WCE_" + s2[0] + "_" + s2[1];
			if(body == "WCE_HOST_CPU"){
				info = s[0] + "]" + "CPU使用率告警";
				return info;
			}
			if(body == "WCE_HOST_MEM"){
				info = s[0] + "]" + "内存使用率告警";
				return info;
			}
			if(body == "WCE_HOST_NET"){
				info = s[0] + "]" + "网络使用速率告警";
				return info;
			}
			//虚拟机告警类型
			if(body == "WCE_VM_CPU"){
				info = s[0] + "]" + "CPU使用率告警";
				return info;
			}
			if(body == "WCE_VM_NET"){
				info = s[0] + "]" + "网络使用速率告警";
				return info;
			}
			if(body == "WCE_VM_DISKSPEED"){
				info = s[0] + "]" + "磁盘使用速率告警";
				return info;
			}
			//存储池告警类型
			if(body == "WCE_STORAGE_DISK"){
				info = s[0] + "]" + "存储使用率告警";
				return info;
			}
		}
		return info;
	}
}

pc.custom = {
		url: function(customCode,urlKey,cb){
			var customShowPageUrl = "";
			$(document).ready(function(){
			    //使用getJSON方法读取json数据,
			    //注意：info.json可以是不同类型文件，只要其中的数据为json类型即可
			    $.getJSON('/common/customization_code.json',function(data){
			        $.each(data,function(i,item){
			        	if(i == customCode){
			        		var url = item[0];
			        		for(var key in url) {
			        			if(key == urlKey){
			        				customShowPageUrl = url[key];
			        				break;
			        			}
			        		}
			        		if(customShowPageUrl == ""){
			        			alert("无法展开自定义页面，请检查自定义页面配置文件");
			        		}else{
			        			cb(customShowPageUrl);
			        		}
			        	}
			        }); 
			    });
			});
		}
}
