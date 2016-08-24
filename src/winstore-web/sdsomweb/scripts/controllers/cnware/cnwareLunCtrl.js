/*  *
    * created by wuchanggui 2014/12/19
    */
vsanApp.controller("cnwareLunCtrl", ["$scope", "cnwareFactory", "$filter",
    function ($scope, cnwareFactory, $filter) {
"use strict";



    /**
    * 初始化函数
    */
    $scope.initPage = function () {
        $scope.initiatorShow = false;
        $scope.showTab = "lun";
        //初始化查询参数
        $scope.poolQueryParams = {
            pageno: 1,
            pagesize: 10
        };
        $scope.getLunList();


        //阻止enter提交
        $("input[type='text']").keydown(function (event) {
            if(event.keyCode === 13) {
                event.preventDefault();
                event.returnValue = false;
                return;
            }
        });
    };


    /**
        * 轮换显示标签
        */
    $scope.showPoolTab = function () {
        $scope.showTab = "pool";
        $scope.getPoolList();
    };
    $scope.showLunTab = function () {
        $scope.showTab = "lun";
        $scope.getLunList();
    };
    $scope.showViewTab = function () {
        $scope.showTab = "view";
        $scope.tabChange();
    };

    /**
        * tab切换时清除函数
        */
    $scope.tabChange = function () {
        $scope.hideChartDiv();
        $scope.hideSnapTable();
        $scope.hideAclSet();
    };
    $scope.hideAclSet = function () {
        $("initiatorTabDiv").hide();
        $("#ShowInitiatorTr").remove();
        $scope.initiatorShow = false;
    };
    $scope.hideChartDiv = function() {
        $("#chartDiv").hide();
        $(".rrr").remove();
        $(".lrrr").remove();
    };
    $scope.hideSnapTable = function() {
        $("#snapTableDiv").hide();
        $('#ShowSnapshotTr').remove();
        $scope.snapshotShow = false;
    };

    /**
        * 增加选中样式
        */
    $scope.checkedOrNot = function (isOrNot) {
        if (isOrNot) {
            return "url('/winstore/images/storage/btn_fuxuan_select.png') no-repeat left 55%";
        } else {
            return "url('/winstore/images/storage/btn_fuxuan_default.png') no-repeat left 55%";
        }
    };



    /**
    * 查询LUN列表
    */
    $scope.getLunList = function () {
        //清除详情
        $scope.tabChange();
        //查询列表
        NProgress.start();
        cnwareFactory.queryCNwareLun($scope.poolQueryParams, function (response) {
            if (response.success) {
                $scope.lunList = response.data;
                $scope.hideSnapTable();
            }
            NProgress.done();
        });
    };


}]);
