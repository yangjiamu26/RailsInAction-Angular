/**
 * Created by peishilong on 2015/4/1.
 */
'use strict';

//JS数组排序方法
function byParam(param, type) {
    return function (o, p) {
        var a, b;
        if (typeof o === "object" && typeof p === "object" && o && p) {
            a = o[param];
            b = p[param];
            if (type === "str") {
                //如果是字母
                if (a === b) {
                    return 0;
                }
                if (typeof a === typeof b) {
                    return a < b ? -1 : 1;
                }
                return typeof a < typeof b ? -1 : 1;
            } else if (type === "num") {
                //如果是数字
                return parseInt(a, 10) - parseInt(b, 10);
            } else {
                throw ("error");
            }
        }
        else {
            throw ("error");
        }
    }
}
//去掉字符串前后空格
function Trim(str)
{ 
    return str.replace(/(^\s*)|(\s*$)/g, ""); 
}
