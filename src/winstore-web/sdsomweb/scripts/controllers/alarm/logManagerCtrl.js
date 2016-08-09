/**
    * created by wuchanggui 2014/12/19
    */
vsanApp.controller("logManagerCtrl", ["$scope", "alarmFactory", "eventFactory", "$filter", "$state", "$timeout", "$stateParams",
    function ($scope, alarmFactory, eventFactory, $filter, $state, $timeout, $stateParams) {
    "use strict";
    /**
        * 初始化函数
        */
    $scope.initPage = function () {
        //初始化告警日志列表查询
        $scope.queryParams = {
            resolved: "",
            severity: ["critical", "warning"],
            pageno: "1",
            pagesize: "10"
        };
        //初始化事件查询条件
        $scope.eventQueryParams = {
            resolved: "",
            severity: ["info"],
            pageno: "1",
            pagesize: "10"
        };
        //查询系统日志
        $scope.getLogList();
        $scope.showTab = "log";
    };

    /**
        * 获取告警列表
        */
    $scope.getAlarmList = function (pageSize, goPage) {
        if (pageSize && goPage) {
            $scope.queryParams.pageno = goPage;
            $scope.queryParams.pagesize = pageSize;
        } else {
            $scope.queryParams.pageno = 1;
        }
        alarmFactory.sdsAlarmList($scope.queryParams, function (response) {
            if(response.success) {
                $scope.alarmList = response.data.results;
                $scope.resolveIndex.length = 0;
                $scope.allIsChecked = false;
                $scope.page = {
                    pageSize: response.data.pagesize || $scope.queryParams.pagesize,
                    currentPage: $scope.queryParams.pageno,
                    totalCount: response.data.totalCount
                }
            }
        });
    };

    /**
        * 获取事件列表
        */
    $scope.getEventList = function (pageSize, goPage) {
        if (pageSize && goPage) {
            $scope.eventQueryParams.pageno = goPage;
            $scope.eventQueryParams.pagesize = pageSize;
        } else {
            $scope.eventQueryParams.pageno = 1;
        }
        eventFactory.sdsEventList($scope.eventQueryParams, function (response) {
            if(response.success) {
                $scope.eventList = response.data.results;
                $scope.eventPage = {
                    pageSize: response.data.pagesize || $scope.eventQueryParams.pagesize,
                    currentPage: $scope.eventQueryParams.pageno,
                    totalCount: response.data.totalCount
                }
            }
        });
    };

    /**
        * 获取日志列表
        */
    $scope.getLogListRemote = function () {
        alarmFactory.sdsClusterLog(function (res) {
            if (res.success) {
                $scope.logList = res.data;
                $scope.allLogIsChecked = false;
                $scope.selectedHostList = [];
                var creating = false;
                angular.forEach($scope.logList, function(obj,index) {
                    if (obj.status == "creating"){
                        creating = true;
                    };
                });
                if (creating == false){
                    $scope.creating = false;
                } else {
                    $scope.creating = true;
                }
            }
        });
    };

    $scope.getLogListLoop = function () {
        if(false == $scope.creating){
            if($scope.creatingTimeout){
                clearTimeout($scope.creatingTimeout);
            };
        } else {
            $scope.getLogListRemote();
            if($scope.creatingTimeout){
                clearTimeout($scope.creatingTimeout);
            };
            $scope.creatingTimeout = setTimeout(function(){
                $scope.getLogListLoop();
            }, 5000);
        };
    };

    $scope.getLogList = function () {
        $scope.creating = true;
        $scope.getLogListLoop();
    };

    /**
        * create log
        */
    $scope.queryServer = function () {
        mainFactory.queryServer(function(response){
            $scope.serverList = response.data;
        })
    }


    $scope.collectLog = function() {
        $('#createLog').modal('hide');
        alarmFactory.createSdsClusterLog({"hostList": $scope.selectedHostList, "time": $scope.logTime, "module": $scope.logModule}, function (resp) {
            if (resp.success) {
                $scope.getLogList();
                $scope.setSuccNoticeMsg("日志收集请求发送成功！");
            } else {
                $scope.showDialog(resp.message);
            }
        });
    }
    $scope.goCreateLog = function () {
        if ($scope.selectedHostList.length === 0) {
            $scope.showDialog("请选择主机！");
            return;
        }
        $scope.logTime = "onemonth";
        $scope.logModule = "all";
        $('#createLog').modal('show');
    };

    /**
        * 清除日志
        */
    $scope.deleteLog = function () {
        $('#deleteLog').modal('hide');
        alarmFactory.deleteSdsClusterLog({"hostList": $scope.selectedHostList}, function (resp) {
            if (resp.success) {
                $scope.getLogList();
                $scope.setSuccNoticeMsg("清除成功！");
            } else {
                $scope.showDialog(resp.message);
            }
        });
    }
    $scope.goDeleteLog = function () {
        if ($scope.selectedHostList.length === 0) {
            $scope.showDialog("请选择要清除的日志！");
            return;
        }
        $("#deleteLog").modal('show');
    };
    $scope.downloadLog = function(ip) {
        alarmFactory.downloadSdsLog({"ip":ip}, function(content){
            if(content.success != 1){
                $scope.showDialog("获取日志失败");
                return;
            }
            window.location.href=content.data;
        });
    };
    //日志多选
    $scope.selectedHostList = [];
    $scope.checkedAllLog = function () {
        $scope.allLogIsChecked = !$scope.allLogIsChecked;
        $scope.selectedHostList.length = 0;
        angular.forEach($scope.logList, function(log) {
            if ($scope.allLogIsChecked) {
                log.$checked = true;
                $scope.selectedHostList.push({hostid: log.hostid, ipaddr: log.ipaddr});
            } else {
                log.$checked = false;
            }
        });
    };
    $scope.checkedLog = function (log) {
        log.$checked = !log.$checked;
        $scope.selectedHostList.length = 0;
        angular.forEach($scope.logList, function(log) {
            if (log.$checked) {
                $scope.selectedHostList.push({hostid: log.hostid, ipaddr: log.ipaddr});
            }
        });
        if ($scope.selectedHostList.length === $scope.logList.length) {
            $scope.allLogIsChecked = true;
        } else {
            $scope.allLogIsChecked = false;
        }
    };

    /**
        * 警告确认中
        */
    $scope.confirmAlarm = function () {
        if (!$scope.resolveIndex.length) {
            $scope.showDialog("请至少选择一项!");
            return;
        }
        if (confirm("确定确认？\nindex: " + $scope.resolveIndex.join(","))) {
            alarmFactory.sdsAlarmConfirm({resolveIndex: $scope.resolveIndex}, function (response) {
                if (response.success) {
                    $scope.getAlarmList();
                    $scope.showDialog("确认成功！");
                } else {
                    $scope.showDialog(response.message);
                }
            });
        }
    };

    /**
        * 打开确认框
        */
    $scope.showModal = function () {
        if (!$scope.resolveIndex.length) {
            $scope.showDialog("请至少选择一项!");
            return;
        }
        $scope.remark = "";
        $("#alertModal").modal("show");
    };

    /**
        * 警告解决中
        */
    $scope.resolveAlarm = function () {
        if (!$scope.resolveIndex.length) {
            $scope.showDialog("请至少选择一项!");
            return;
        }
        $scope.operater = "admin";
        alarmFactory.sdsAlarmResolve({resolveIndex: $scope.resolveIndex, remark: $scope.remark, operater: $scope.operater}, function (response) {
            if (response.success) {
                $scope.getAlarmList();
                $scope.showDialog("手工修复成功！");
            } else {
                $scope.showDialog(response.message);
            }
        });
        $("#alertModal").modal("hide");
    };

    /**
        * 全选
        */
    $scope.resolveIndex = [];
    $scope.checkedAll = function () {
        $scope.allIsChecked = !$scope.allIsChecked;
        $scope.resolveIndex.length = 0;
        angular.forEach($scope.alarmList, function (alarm) {
            alarm.$checked = $scope.allIsChecked;
            if (alarm.$checked){
                $scope.resolveIndex.push(alarm.index);
            }
        });
    };
    $scope.checked = function (alarm) {
        alarm.$checked = !alarm.$checked;
        if (alarm.$checked) {
            $scope.resolveIndex.push(alarm.index);
        } else {
            angular.forEach($scope.resolveIndex, function (id, index) {
                if (id == alarm.index) {
                    $scope.resolveIndex.splice(index, 1);
                }
            })
        }
        $scope.allIsChecked = ($scope.resolveIndex.length > 0 && $scope.resolveIndex.length == $scope.alarmList.length) ? true : false;
    };

    /**
        * 显示告警列表或者事件列表
        */
    $scope.showAlarmTab = function () {
        $scope.getAlarmList();
        $scope.showTab = "alarm";
    };
    $scope.showEventTab = function () {
        $scope.getEventList();
        $scope.showTab = "event";
    };
    $scope.showLogTab = function () {
        $scope.getLogList();
        $scope.showTab = "log";
    };

    /**
        * 初始化双击展示详情
        */
    $scope.dblClick = function (id, alarm) {
        var _this = $("#alarmTr"+id);
        if ($scope.alarmTrIdTemp) {
            var _that = $(".rrr");
            if ($scope.alarmTrIdTemp == id && _that.length > 0) {
                _that.remove();
                return;
            }
            _that.remove();
        }
        var content = "<tr class=rrr style='background-color:#253143;'><td colspan=8 style='padding:15px 20px;line-height:20px;'><table width='100%' class='table'>"
            + "<tr>"
            + "<td>修复时间：</td><td>" + $filter("date")(alarm.resolveTime, "yyyy-MM-dd HH:mm:ss") + "</td>"
            + "</tr><tr>"
            + "<td>操作者：</td><td>" + alarm.operater + "</td>"
            + "</tr><tr>"
            + "<td>备注：</td><td>" + alarm.detail + "</td>"
            + "</tr><tr>"
            + "</tr></table></td></tr>";
        _this.after(content);
        $scope.alarmTrIdTemp = id;
    };

    /**
        * 事件列表初始化双击展示详情
        */
    $scope.eventDblClick = function (id, alarm) {
        var _this = $("#eventTr"+id);
        if ($scope.eventTrIdTemp) {
            var _that = $(".errr");
            if ($scope.eventTrIdTemp == id && _that.length > 0) {
                _that.remove();
                return;
            }
            _that.remove();
        }
        var content = "<tr class=errr style='background-color:#253143;'><td colspan=8 style='padding:15px 20px;line-height:20px;'><table width='100%' class='table'><tr>"
            + "<td width='200px'>描述：</td><td>" + alarm.description + "</td>"
            + "</tr><tr>"
            + "<td>修复时间：</td><td>" + $filter("date")(alarm.resolveTime, "yyyy-MM-dd HH:mm:ss") + "</td>"
            + "</tr><tr>"
            + "<td>操作者：</td><td>" + alarm.operater + "</td>"
            + "</tr><tr>"
            + "<td>详情：</td><td>" + alarm.detail + "</td>"
            + "</tr><tr>"
            + "<td>修复建议：</td><td>" + alarm.tips + "</td>"
            + "</tr><tr>"
            + "</tr></table></td></tr>";
        _this.after(content);
        $scope.eventTrIdTemp = id;
    };

    /**
        * 颜色状态改变
        */
    $scope.alarmSevColor = function (value) {
        switch (value.toUpperCase()) {
        case "WARNING": return "#FFB400";
        case "CRITICAL": return "#F60510";
        case "INFO": return "#ACB3BE";
        default: return "white";
        }
    };

    /*color for if or not resolved*/
    $scope.alarmStateColor = function (value) {
        switch (value) {
        case 0: return "#F60510";
        case 1: return "#27a555";
        default: return "white";
        }
    };


}]);
