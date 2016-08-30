/**
 * 自由服务器controller
 * created by xiongneng
 * 2016-08-23
 */
vsanApp.controller('serverManagerCtrl', ['$scope', 'nodeFactory', function ($scope, nodeFactory) {
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
        var _this = $("[ng-model='" + ngModel + "']");
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


    $scope.setHddErrMsg = function (msg) {
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
            case "addServer":
                $scope.modal.set("添加服务器", to, $scope.addServer);
                $("#serverModal").modal("show");
                return;
        }
    };
    /******************************公共函数End**********************************/
    /**
     * 查询已安装硬盘列表
     */
    $scope.getServerList = function () {
        //查询列表
        NProgress.start();
        // 查询节点IP
        nodeFactory.listFreeServer({
            servers: []
        }, function (res) {
            if (res.success) {
                $scope.servers = res.data;
            } else {
                $scope.showDialog(res.message);
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
        // 查询节点IP
        $scope.getServerList()
    };

    // 添加硬盘逻辑
    $scope.addServer = function () {
        var serverList = [];
        $('input[name="serverIp"]').each(function () {
            serverList.push($(this).val());
        });
        // 重复IP检测
        var exi = false;
        $.each(serverList, function (index, serverIp) {
            if (!IP_REGEXP.test(serverIp)) {
                $scope.setFailNoticeMsg('IP不合法!');
                return;
            }
            $('table[id="no-radius-table"] tbody tr td:first-child').each(function () {
                var exists_ip = $(this).text();
                if (serverIp.trim() == exists_ip.trim()) {
                    exi = true;
                    return false;//实现break功能
                }
            });
            if (exi) {
                return false;
            }
        });
        if (exi) {
            $scope.setHddErrMsg("主机IP重复");
            return;
        }
        $scope.isAdd = true;
        spinner.show();
        NProgress.start();
        var fLen = serverList.length;
        var count = 0;
        for (var i = 0; i < fLen; i++) {
            var serverIp = serverList[i];
            if (serverIp.trim() == '') {
                continue;
            }
            var params = {
                ip: serverIp
            };
            nodeFactory.addFreeServer(params, function (response) {
                spinner.hide();
                $scope.isAdd = false;
                if (response.success) {
                    count++;
                    // 获取已安装硬盘列表
                    if (count >= fLen) {
                        $scope.getServerList();
                        $("#serverModal").modal("hide");
                        NProgress.done();
                    }
                } else {
                    $scope.setHddErrMsg(response.message);
                    NProgress.done();
                    return false;
                }
            });
        }
    };

    $scope.rmServer = function (serverIp) {
        NProgress.start();
        var params = {
            ip: serverIp
        };
        nodeFactory.deleteFreeServer(params, function (response) {
            if (response.success) {
                // 查询节点IP
                $scope.getServerList();
                NProgress.done();
            } else {
                $scope.setHddErrMsg(response.message);
            }
            NProgress.done();
        });
    };

}]);
