/**
 * Created by yuguangda on 2014/12/18.
 */
vsanApp.controller('mainPageBotCtrl',function($scope,$rootScope,mainFactory, eventFactory){

    $scope.critical = {};
    $scope.warning = {};
    $scope.infoDa = {};

    var sCritical = {
        comfrimed:1,     //是否确认
        resolved:0,   //是否解决:0未解决，1解决
        severity:[
            "critical"    //如果有多个类别可传多个
        ],
        pageno:"1",
        pagesize:"5"
    }
    var sWarning = {
        comfrimed:1,     //是否确认
        resolved:0,   //是否解决
        severity:[
            "warning"    //如果有多个类别可传多个
        ],
        pageno:"1",
        pagesize:"5"
    }
    var sInfoDa = {
        comfrimed:1,     //是否确认
        resolved:0,   //是否解决
        severity:[
            'info'    //如果有多个类别可传多个
        ],
        pageno:"1",
        pagesize:"5"
    }
    //请求告警数据
    var getStorageData = function(){
        mainFactory.queryConfirm(sCritical,function(datas){
            $scope.critical = datas.data.results;
        });
        mainFactory.queryConfirm(sWarning,function(datas){
            $scope.warning = datas.data.results;;
        });
        eventFactory.sdsEventList(sInfoDa,function(datas){
            $scope.infoDa = datas.data.results;;
        });
    }
    $scope.init = function(){
        getStorageData();
    }

});