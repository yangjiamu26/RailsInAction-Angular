/**
    * created by wuchanggui
    */
//告警状态
vsanApp.filter("alarmSevState", function () {
    return function (value) {
        switch (value.toUpperCase()) {
            case "WARNING":
                return "重要";
            case "CRITICAL":
                return "紧急";
            case "INFO":
                return "警告";
            default:
                return "";
        }
    }
});

//1是, 0否
vsanApp.filter("isOrNot", function () {
    return function (value) {
        switch (value) {
            case 1:
                return "已修复";
            case 0:
                return "未修复";
            default:
                return "";
        }
    }
});

//将选中的数组提取name
vsanApp.filter("selectedToStr", function () {
    "use strict";
    return function (arr, type) {
        var strArr = [];
        arr = arr || [];
        for (var i = 0; i < arr.length; i++) {
            if (type && arr[i].selected && arr[i].network === type) {
                strArr.push(arr[i].name);
            } else if (!type && arr[i].selected) {
                strArr.push(arr[i].name);
            }
        }
        var retStr = strArr.toString();
        if (retStr.length > 30) {
            return retStr.substr(0, 30) + "...";
        } else {
            return retStr;
        }
    }
});
vsanApp.filter("selectedToStr2", function () {
    "use strict";
    return function (arr, type) {
        var strArr = [];
        arr = arr || [];
        for (var i = 0; i < arr.length; i++) {
            if (type && arr[i].selected && arr[i].purpose === type) {
                strArr.push(arr[i].name);
            } else if (!type && arr[i].selected) {
                strArr.push(arr[i].name);
            }
        }
        var retStr = strArr.toString();
        if (retStr.length > 30) {
            return retStr.substr(0, 30) + "...";
        } else {
            return retStr;
        }
    }
});

//字段过长显示省略号
vsanApp.filter("lessWorld", function () {
    return function (value, len) {
        value = value || "";
        len = len || 3;
        if (value.length > len) {
            // 双字符长度转为单字符长度
            var str = value.substring(0, len);
            strlen = str.replace(/[^\x00-\xff]/g,"01").length;
            return value.substring(0, len - (strlen - len) / 2) + "...";
        } else {
            return value;
        }
    };
});

//单位转换过滤
vsanApp.filter("unit", function () {
    return function (value, unit) {
        if (isNaN(value)) return "";
        switch (unit) {
        case "bToTb":
            return (value/1073741824).toFixed(1) + " TB";
        case "bToT":
            return (value/1073741824).toFixed(1);
        case "iops":
            if (value < 1024) return value + " (IO/s)";
            var vv = value/1024;
            if (vv < 1024) return vv.toFixed(1) + " K(IO/s)";
            return (vv/1024).toFixed(1) + " M(IO/s)";
        case "mbps":
            if (value < 1024) return value + " (Bytes/s)";
            var vv = value/1024;
            if (vv < 1024) return vv.toFixed(1) + " (KB/s)";
            return (vv/1024).toFixed(1) + " (MB/s)";
        case "ms":
            return value + " ms";
        case "cpu":
        case "mem":
            return value + "%";
        default: return value;
        }
    }
});

//bytes转换为GB或者TB
vsanApp.filter("GBorTB", function () {
    return function (value) {
        if (!value || isNaN(value)) return "";
        var gbValue = value/1048576;
        if (gbValue < 1024) return gbValue.toFixed(1) + " GB";
        else return (gbValue/1024).toFixed(1) + " TB";
    }
});

//bytes转换为MB ????
vsanApp.filter("MB", function () {
    return function (value) {
        if (!value || isNaN(value)) return "";
        var mbValue = value/1024;
        if (mbValue < 1024) return mbValue.toFixed(1) + " MB";
        var gbValue = mbValue/1024;
        if (gbValue < 1024) return gbValue.toFixed(1) + " GB";
        else return (gbValue/1024).toFixed(1) + " TB";
    }
});

//bytes转换为MB
vsanApp.filter("BytesToKMGTB", function () {
    return function (value) {
        if (!value || isNaN(value)) return "";
        var kbValue = value/1024;
        if (kbValue < 1024) return kbValue.toFixed(1) + " KB";
        var mbValue = kbValue/1024;
        if (mbValue < 1024) return mbValue.toFixed(1) + " MB";
        var gbValue = mbValue/1024;
        if (gbValue < 1024) return gbValue.toFixed(1) + " GB";
        else return (gbValue/1024).toFixed(1) + " TB";
    }
});

//bytes转换为GB或者TB
vsanApp.filter("TB", function () {
    return function (value) {
        if (!value || isNaN(value)) return "";
        else return (value/1073741824).toFixed(1);
    }
});

//告警时间过滤器
vsanApp.filter("showTime", ["$filter", function ($filter) {
    return function (value) {
        if (!value) return;
        var sec = (new Date().getTime() - Date.parse(value)) / 1000;
        if (sec < 10) return "刚刚";
        if (sec < 60) return sec.toFixed(0) + "秒前";
        var mul = sec / 60;
        if (mul < 60) return mul.toFixed(0) + "分钟前";
        var hou = mul / 60;
        if (hou < 24) return hou.toFixed(0) + "小时前";
        var day = hou / 24;
        if (day == 1) return "昨天 " + $filter("date")(value, "HH:mm:ss");
        if (day < 31) return day.toFixed(0) + "天前 " + $filter("date")(value, "HH:mm:ss");
        return $filter("date")(value, "yyyy-MM-dd HH:mm:ss");
    }
}]);

//显示缩略字符串
vsanApp.filter("limitChar", function () {
    return function (value, len) {
        if (value === null) {
            return " - ";
        }
        //设置默认显示字符数
        if (len == null) {
            len = 15;
        }
        if (value.length <= len)
            return value;
        else
            return value.substr(0, len) + "...";
    }
});

//硬件资源节点缩略节点过滤器
vsanApp.filter("subNodes", function () {
    return function (value, len) {
        if (!len) {
            len = 8;
        }
        if (value.length < 8) {
            return value;
        }
        return value.slice(0, len);
    }
});

//授权时间过期过滤器
vsanApp.filter("licenseFormat", ["$sce",function ($sce) {
    return function (value,val) {
        //三个月

        if(val == ""){
            return $sce.trustAsHtml("<span style='color: #F67C05'>试用</span>");
        }
        else{
            return $sce.trustAsHtml("<span style='color: #4BD37E'>商用</span>");
        }
    }
}]);

//授权时间过期过滤器
vsanApp.filter("licenseFormatTime", ["$sce",function ($sce) {
    return function (value,val) {
        //三个月
        var day = (value) / (60 * 60 * 24);

        if(day > 365){
            return $sce.trustAsHtml("<span style='color: #4BD37E'>" + Math.floor(day / 365) + "年 " + Math.floor(day%365) + "天" + "</span>");
        }else if(1 < day && day <= 365){
            return $sce.trustAsHtml("<span style='color: #F60510'>" + Math.floor(day) + "天 " + Math.floor(day%1*24) + "小时" + "</span>");
        }else if(0 < day && day <= 1){
            //minute
            var minute = day * 24 * 60;
            if(60 < minute){
                return $sce.trustAsHtml("<span style='color: #F60510'>" + Math.floor(minute / 60) + "小时 " + Math.floor(minute%60) + "分钟" + "</span>");
            }else{
                return $sce.trustAsHtml("<span style='color: #F60510'>" + Math.floor(minute) + "分钟" + "</span>");
            }
        }else if(day == 0){
            return $sce.trustAsHtml("<span style='color: #F60510'>已失效</span>");
        }else{
            return $sce.trustAsHtml("<span style='color: #F60510'>异常</span>");
        }
    }
}]);
//字符串显示换行
vsanApp.filter('to_trusted', ['$sce', function ($sce) {
　　return function (text) {
    　　return $sce.trustAsHtml(text);
　　};
}]);
