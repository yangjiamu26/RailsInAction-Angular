$.ajaxSetup({
	cache : false
})
var loading_counter = 0;
function showLoading(){
	loading_counter++;
	_.debounce(function(){
	  	if(loading_counter>0){
	 		$('[data-ajax-content=true]').ace_ajax('startLoading', true);
	 	}
	}, 1000)();
}
function hideLoading(){
	loading_counter--;
	if(loading_counter<=0){
		$('[data-ajax-content=true]').ace_ajax('stopLoading', true);
	}
}
var csc = {};

csc.rest = {
	post : function(url, content, successFun, errorFun,notShowError,callbackCustParam) {
		showLoading();
		$.ajax({
			//headers: {'Cookie' : document.cookie },
			url : url,
			type : 'POST',
			dataType : "json",
			data : JSON.stringify(content),
			contentType : 'application/json; charset=utf-8',
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				hideLoading();
				if(!notShowError){//默认错误时显示错误提示框
					try {
						var resText = XMLHttpRequest.responseText
						res = JSON.parse(resText);
						alert("["+res.exceptionCode+"]"+res.exceptionMessage);
					} catch (e) {
					}
				}
				if (errorFun) {
					errorFun(XMLHttpRequest, textStatus, errorThrown);
				}
			},
			success : function(data, textStatus) {
				hideLoading();
				successFun(data, textStatus,callbackCustParam);
			}
		});

	},
	put : function(url, content, successFun, errorFun,notShowError,callbackCustParam) {
		showLoading();
		$.ajax({
			//headers: {'Cookie' : document.cookie },
			url : url,
			type : 'PUT',
			data : JSON.stringify(content),
			dataType : "json",
			contentType : 'application/json; charset=utf-8',
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				hideLoading();
				if(!notShowError){//默认错误时显示错误提示框
					try {
						var resText = XMLHttpRequest.responseText
						res = JSON.parse(resText);
						alert("["+res.exceptionCode+"]"+res.exceptionMessage);
					} catch (e) {
					}
				}
				if (errorFun) {
					errorFun(XMLHttpRequest, textStatus, errorThrown);
				}
			},
			success : function(data, textStatus) {
				hideLoading();
				successFun(data, textStatus,callbackCustParam);
			}
		});

	},
	del : function(url, successFun, errorFun,notShowError) {
		showLoading();
		$.ajax({
			//headers: {'Cookie' : document.cookie },
			url : url,
			type : 'DELETE',
			dataType : "json",
			contentType : 'application/json; charset=utf-8',
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				hideLoading();
				if(!notShowError){//默认错误时显示错误提示框
					try {
						var resText = XMLHttpRequest.responseText
						res = JSON.parse(resText);
						alert("["+res.exceptionCode+"]"+res.exceptionMessage);
					} catch (e) {
					}
				}
				if (errorFun) {
					errorFun(XMLHttpRequest, textStatus, errorThrown);
				}
			},
			success : function(data, textStatus) {
				hideLoading();
				successFun(data, textStatus);
			}
		});
	},
	get : function(url, successFun, errorFun,callbackCustParam,notShowLoading) {
		if(!notShowLoading){
			showLoading();
		}
		$.ajax({
			//headers: {'Cookie' : document.cookie },
			url : url,
			type : 'GET',
			cache : false,
			dataType : 'json',
			contentType : 'application/json; charset=utf-8',
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				if(!notShowLoading){
					hideLoading();
				}
				if (errorFun) {
					errorFun(XMLHttpRequest, textStatus, errorThrown);
				}
			},
			success : function(data, textStatus) {
				if(!notShowLoading){
					hideLoading();
				}
				successFun(data, textStatus,callbackCustParam);
			}
		});
	}
}

csc.util = {
	httpQueryParamConvert : function(params) {
		if (typeof (params) == "object" && params != null) {
			var paramString = "";
			for ( var index in params) {
				if (paramString == "") {
					paramString += index + "="
							+ encodeURIComponent(params[index]);
				} else {
					paramString += "&" + index + "="
							+ encodeURIComponent(params[index]);
				}
			}
		}
		return paramString;
	},
	segGetMask : function(segmentValue) {
		var mask = segmentValue.split("/")[1];
		var bit = "";
		for (var i = 0; i < mask; i++) {
			bit += "1";
		}
		var binary = csc.util.paddingRightByZero(bit, 32);
		var binaryCode = [];
		binaryCode[0] = binary.substring(0, 8);
		binaryCode[1] = binary.substring(8, 16);
		binaryCode[2] = binary.substring(16, 24);
		binaryCode[3] = binary.substring(24, 32);
		var segment = "";
		for (var i = 0; i < binaryCode.length; i++) {
			segment += this.bin2dec(binaryCode[i]) + ".";
		}
		return segment.substring(0, segment.length - 1);
	},
	bin2dec : function(bin) {
		var c = bin.split("");
		var len = c.length;
		var dec = 0;
		for (i = 0; i < len; i++) {
			var temp = 1;
			if (c[i] == 1) {
				for (j = i + 1; j < len; j++)
					temp *= 2;
				dec += temp;
			} else if (c[i] != 0) {
				return false;
			}
		}
		return dec;
	},
	paddingRightByZero : function(orgi, digit) {
		/* 数字位数达不到预期位数时，在左边位置补0。注：只适用整数。orig:原始数字，digit:预期位数 */
		var str = orgi + "";
		if (str.length < digit) {
			var needPadding = digit - str.length;
			for (var i = 0; i < needPadding; i++) {
				str = str + "0";
			}
		}
		return str;
	},
	isNotNull : function(exp) {
		return !(exp == null || exp == "" || typeof (exp) == "undefined"
				|| exp == "undefined" || exp == "null");
	},
	isNull : function(exp) {
		return !csc.util.isNotNull(exp);
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
	bytesToSize : function (bytes) {// 文件大小单位转换
	    if (bytes === 0) return '0 B';
	    var k = 1000, // or 1024
	        sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
	        i = Math.floor(Math.log(bytes) / Math.log(k));
	   return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
	},
	getUuid:function(){
		var s = [];
		var hexDigits = "0123456789abcdef";
		for (var i = 0; i < 36; i++) {
		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
		}
		s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
		s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
		s[8] = s[13] = s[18] = s[23] = "-";
		
		var uuid = s.join("");
		return uuid;
	},
	getLBMothedList : function (){
		return [{name:'轮询',value:'ROUND_ROBIN'},{name:'最少连接',value:'LEAST_CONNECTIONS'},{name:'源IP',value:'SOURCE_IP'}];
	},
	getProtocolList : function (){
		return [{name:'TCP',value:'TCP'},{name:'HTTP',value:'HTTP'},{name:'HTTPS',value:'HTTPS'}];
	},
	getMonthsList : function (){
		return [{name:'1',value:'1'},{name: '2',value:'2'},{name: '3', value:'3'},{name: '4', value:'4'},{name: '5', value:'5'},
		        {name: '6', value:'6'},{name: '7', value:'7'},{name: '8', value:'8'},{name: '9', value:'9'},{name: '10', value:'10'},
		        {name: '11', value:'11'},{name: '12', value:'12'}];
	},
	/**
	 * 获取服务的有效时间文本
	 */
	getExpireText:function(type,val){
		 var v = "";
		 if("1"==type){
             v="永久";
         }else if("2"==type){
             v=val+"个月";
         }else if("3"==type){
             v= "有效期至:"+val.substr(0,10); 
         }
		 return v;
	},
	getBillCycleText:function(billcycle){
	    var billTxt = "";
        if(billcycle=="DAY"){
    	   billTxt = "按天"
		}else if(billcycle=="MONTH"){
			billTxt = "按月"
		}else if(billcycle=="QUARTER"){
			billTxt = "按季度"
		}else if(billcycle = "YEAR"){
			billTxt = "按年"
		}
        return billTxt;
	}, 
	getResourceText:function(resourceType){
		var text = "";
	    switch (resourceType) {
		case "VM":
			text = "云主机";
			break;
		case "DISK":
			text  = "云硬盘";
			break;
		case "ROUTER":
			text = "路由器";
			break;
		case "PUBLICIP":
			text = "公网IP";
			break;
		case "LOAD_BALANCING":
			text =  "负载均衡";
			break;
		case "SECRET_KEY":
			text =  "密钥";
			break;
		case "OBJECT_STORAGE":
			text =  "对象存储";
			break;
		case "CPU":
			text  =  "CPU";
			break;
		case "MEMORY":
			text  =  "内存";
			break;
		case "STORAGE":
			text =  "存储";
			break;
		case "FIREWALL":
			text =  "防火墙";
			break;
		case "VPC":
			text  =  "VPC";
			break;
		case "VPN":
			text =  "VPN";
			break;
		case "SECURITY_GROUP":
			text =  "安全组";
			break;
		case "SOFTWARE":
			text =  "云软件";
			break;
		default:
			break;
		}
        return text;
	},
	getResourceUnit:function(resourceType){
		var text = "";
	    switch (resourceType) {
		case "VM":
			text = "个";
			break;
		case "DISK":
			text  = "个";
			break;
		case "ROUTER":
			text = "个";
			break;
		case "PUBLICIP":
			text = "个";
			break;
		case "LOAD_BALANCING":
			text = "个";
			break;
		case "SECRET_KEY":
			text =  "个";
			break;
		case "OBJECT_STORAGE":
			text =  "GB";
			break;
		case "CPU":
			text  =  "个";
			break;
		case "MEMORY":
			text  =  "GB";
			break;
		case "STORAGE":
			text =  "GB";
			break;
		case "FIREWALL":
			text =  "个";
			break;
		case "VPC":
			text  =  "个";
			break;
		case "VPN":
			text =  "个";
			break;
		case "SECURITY_GROUP":
			text =  "个";
			break;
		case "SOFTWARE":
			text =  "个";
			break;
		default:
			break;
		}
        return text;
	},
    invalidValueParam : function(val){
    	var telReg = /[。~!@#$%\^\+\*&\\\/\?\|:\.<>{}【】';="]+/;
        if(telReg.test(val)){
        	return false;
        }else{
        	return true;
        }
    },
    
    getToFixedNum:function(num){//获取 不四舍五入 的两位小数   5.201 结果为 5.21
    	var bb = num+"";  
        var dian = bb.indexOf('.');  
        var result = "";  
        if(dian == -1){  
            result =  num.toFixed(2);  
        }else{  
            var cc = bb.substring(dian+1,bb.length);  
            if(cc.length >=3){  
                result =  (Number(num.toFixed(2))+0.01);  
            }else{  
                result =  num.toFixed(2);  
            }  
        } 
        return result;
    },
    compTimeIsEffective:function(beginTime,endTime) {/*比较当前时间是否在有效期内  */
    	if(beginTime!=null && endTime!=null){
		    var beginTimes = beginTime.substring(0, 10).split('-');
		    var endTimes = endTime.substring(0, 10).split('-');
		    beginTime = beginTimes[1] + '-' + beginTimes[2] + '-' + beginTimes[0] + ' ' + beginTime.substring(10, 19);
		    endTime = endTimes[1] + '-' + endTimes[2] + '-' + endTimes[0] + ' ' + endTime.substring(10, 19);
		    if(Date.parse(endTime) > Date.parse(new Date()) && Date.parse(beginTime) < Date.parse(new Date())){
			   return true
		    }else {
			   return false
		    }
    	}else{
    		return false
    	}
	}
	  
}

// 全局上传
// ouhang 2016-07-21
csc.uploader = {
	holder : {},

	bind : function(dataKey, uploader) {
		this.holder[dataKey] = uploader;
	},

	getUploader : function(dataKey) {
		return this.holder[dataKey];
	},

	unbind : function(dataKey) {
		var uploader = this.holder[dataKey];

		if (uploader) {
			uploader.reset();
			uploader = null;

			delete this.holder[dataKey];
		}
	}
}

