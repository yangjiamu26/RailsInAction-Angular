/**
    * IP修改controller
    * created by wuchanggui
    * 2015-5-23
    */
vsanApp.controller('hddManagerCtrl', ['$scope', 'nodeFactory', function ($scope, nodeFactory) {
    'use strict';

    /**
        * 页面初始化
        */
    var IP_REGEXP = /^((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/;
    var ZERO_IP_REGEXP = /^([0]{1,}\.){3}[0]{1,}$/;
    var FULL_IP_REGEXP = /^(255\.){3}255$/;

    /******************************公共函数**********************************/
    /**
    * 显示提示信息
    */
    $scope.showTipMsg = function (tipMsg, ngModel) {
        var _this = $("[ng-model='"+ngModel+"']");
        _this.data("tipMsg", tipMsg);
        _this.popover("show");
        if (_this.data("timeoutId")) {
            clearTimeout(_this.data("timeoutId"));
        }
        var timeoutId = setTimeout(function () {
            _this.popover("hide");
        }, 3000);
        _this.data("timeoutId", timeoutId);
        _this.focus();
    };


    $scope.setHddErrMsg = function(msg) {
        $scope.errMsg = msg;
        var timeoutId = setTimeout(function () {
            $scope.errMsg = "";
        }, 5000);
    };

    /**
    * 显示弹出框
    */
    $scope.showModal = function (to, obj) {
        $scope.setHddErrMsg("");
        switch (to) {
            case "addHdd":
                $scope.modal.set("添加硬盘", to, $scope.addHdd);
                $("#serverList").val("-1").change();
                $("#hddModal").modal("show");
                return;
        }
    };
    /******************************公共函数End**********************************/
    /**
    * 查询已安装硬盘列表
    */
    $scope.getDiskList = function () {
        //查询列表
        NProgress.start();
        nodeFactory.nodeDisksGet({
            servers: []
        }, function (res) {
            if (res.success) {
                $scope.disks = res.data;
            }
            NProgress.done();
        });
    };

    $scope.initPage = function () {
        //弹出框控制器
        $scope.modal = {
            message: "", //弹出框标题信息
            to: "", //当前要去做的业务
            sureTo: "", //确定时调用的方法
            set: function (message, to, func) {
                this.message = message;
                this.to = to;
                this.sureTo = func;
            },
            sure: function () {
                //当点击确定按钮，跳转到指定方法
                if (this.sureTo) {
                    this.sureTo();
                }
            }
        };
        // 获取已安装硬盘列表
        $scope.getDiskList();

        //// 查询已安装服务器列表
        //nodeFactory.nodeServerScan({}, function (res) {
        //    if (res.success) {
        //        $scope.servers = res.data;
        //    } else {
        //        $scope.showDialog(res.message);
        //    }
        //});

        $("#hddtablebody").empty();
    };
    $scope.scanningHdd = function () {
        //$("#hddList").empty();
        $("#errMsgDiv").empty();
        $("#hddtablebody").empty();
        //显示加载图标
        $scope.showLoading = true;
        var serverVal = $("#serverList").val().split('_');
        var hostid = serverVal[0];
        var startIp = serverVal[1];
        var param = {
            ip: startIp
        };
        nodeFactory.nodeDiskScan(param, function(response) {
            // 隐藏加载图标
            $scope.showLoading = false;
            if (response.success) {
                //$scope.adisks = response.data;
                response.data.forEach(function(disk) {
                    $("#hddtablebody").append('<tr><td><input name="devname" type="checkbox" value="'
                        + disk.wwid + '_' + disk.type + '_' + disk.capacity +  '"/></td><td>/dev/' + disk.name + '</td><td>'
                        + disk.type + '</td><td>' + disk.wwid + '</td><td>' + disk.capacity + '</td></tr>');
                });
            } else {
                $scope.setHddErrMsg(response.message);
            }
        });
    };
    // 添加硬盘逻辑
    $scope.addHdd = function () {
        var serverSelect = $("#serverList").val();
        if (serverSelect == "-1") {
            $scope.setHddErrMsg("请选择服务器节点.");
            return;
        }
        var serverVal = serverSelect.split('_')
        var hostid = serverVal[0];
        var serverIp = serverVal[1];
        NProgress.start();
        $scope.isAdd = true;
        var selectDisks = $("#hddtable").find("tbody tr td input:checkbox:checked").map(function(){
            return $(this).val();
        }).get();
        var params = {
            hostid: hostid,
            serverIp: serverIp,
            selectDisks: selectDisks
        };
        nodeFactory.nodeDiskAddDisk(params, function (response) {
            if (response.success) {
                // 获取已安装硬盘列表
                $scope.getDiskList();
                $("#hddModal").modal("hide");
            } else {
                $scope.setHddErrMsg(response.message);
            }
            NProgress.done();
            $scope.isAdd = false;
        });
    };

}]);
