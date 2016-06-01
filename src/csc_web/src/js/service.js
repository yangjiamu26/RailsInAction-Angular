var useSimulatedData = true;//是否使用模拟数据
var serviceAddr = "https://192.168.208.68:8099";
var simulatedUrl = {
    'resStatistics':'tempdata/resStatistics.json',
    'countOnIndex':'tempdata/countOnIndex.json',
    'expiredtodelete':'tempdata/expiredtodelete.json',
    'areaResCount':'tempdata/areaResCount.json',
    'productCount':'tempdata/productCount.json'
};
var realUrl = {
    'resStatistics': serviceAddr + '/restServlet?connectorId=0&apiKey=csc.service.home.getResStatistics&placeholder=&params=',
    'countOnIndex': serviceAddr + '/restServlet?connectorId=0&apiKey=csc.service.orders.countOnIndex&placeholder=&params=',
    'expiredtodelete': serviceAddr + '/restServlet?connectorId=0&apiKey=csc.service.serviceInstance.countServiceInstancesToBecollect&placeholder=&params=',
    'areaResCount': serviceAddr + '/restServlet?connectorId=0&apiKey=csc.service.home.getAreaResCount&placeholder=&params=',
    'productCount': serviceAddr + '/restServlet?connectorId=0&apiKey=csc.service.home.getProductCount&placeholder=&params='
};
var CSCDataResource = useSimulatedData ? simulatedUrl : realUrl;
angular.module('app')
.service('resStatistics',['$rootScope','$http',function($rootScope,$http){
    this.getResStatistics = function(callBack) { 
        $http({
            url:CSCDataResource.resStatistics,
            method:'GET'
        }).success(function(data,header,config,status){
            callBack(data,null);
        }).error(function(data,header,config,status){
            alert("获取资源统计数据失败！");
        }); 
    };
}])
.service('countOnIndex',['$rootScope','$http',function($rootScope,$http){
    this.getCountOnIndex = function(callBack) { 
        $http({
            url:CSCDataResource.countOnIndex,
            method:'GET'
        }).success(function(data,header,config,status){
            callBack(data,null);
        }).error(function(data,header,config,status){
            alert("获取资源统计数据失败！");
        }); 
    };
}])
.service('expiredtodelete',['$rootScope','$http',function($rootScope,$http){
    this.getExpiredtodelete = function(callBack) { 
        $http({
            url:CSCDataResource.expiredtodelete,
            method:'GET'
        }).success(function(data,header,config,status){
            callBack(data,null);
        }).error(function(data,header,config,status){
            alert("获取资源统计数据失败！");
        }); 
    };
}])
.service('areaResCount',['$rootScope','$http',function($rootScope,$http){
    this.getareaResCount = function(callBack) { 
        $http({
            url:CSCDataResource.areaResCount,
            method:'GET'
        }).success(function(data,header,config,status){
            callBack(data,null);
        }).error(function(data,header,config,status){
            alert("获取资源统计数据失败！");
        }); 
    };
}])
.service('productCount',['$rootScope','$http',function($rootScope,$http){
    this.getproductCount = function(callBack) { 
        $http({
            url:CSCDataResource.productCount,
            method:'GET'
        }).success(function(data,header,config,status){
            callBack(data,null);
        }).error(function(data,header,config,status){
            alert("获取资源统计数据失败！");
        }); 
    };
}])
.service('product',['$rootScope','$http',function($rootScope,$http){
    this.getHostData = function(callBack) { 
        $http({
            url:'tempdata/product-host.json',
            method:'GET'
        }).success(function(data,header,config,status){
            callBack(data,null);
        }).error(function(data,header,config,status){
            alert("获取云主机数据失败！");
        }); 
    };
    this.getStorageData = function(callBack) { 
        $http({
            url:'tempdata/product-storage.json',
            method:'GET'
        }).success(function(data,header,config,status){
            callBack(data,null);
        }).error(function(data,header,config,status){
            alert("获取云硬盘数据失败！");
        }); 
    };
}])
.service('server',['$rootScope','$http',function($rootScope,$http){
    this.getHostData = function(callBack) { 
        $http({
            url:'tempdata/requisitionlist-host.json',
            method:'GET'
        }).success(function(data,header,config,status){
            callBack(data,null);
        }).error(function(data,header,config,status){
            alert("获取云主机数据失败！");
        }); 
    };
    this.getStorageData = function(callBack) { 
        $http({
            url:'tempdata/product-storage.json',
            method:'GET'
        }).success(function(data,header,config,status){
            callBack(data,null);
        }).error(function(data,header,config,status){
            alert("获取云硬盘数据失败！");
        }); 
    };
}])