vsanApp.controller("configController",["$scope","$state","configFactory",function($scope,$state,configFactory){
    "use strict";

    //ip正则
    var IP_REGEXP = /^((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/;
    var ZERO_IP_REGEXP = /^([0]{1,}\.){3}[0]{1,}$/;
    var FULL_IP_REGEXP = /^(255\.){3}255$/;
    var HOST_ID_NAME_REGEXP = /^[a-zA-Z][a-zA-Z]{0,11}$/

    $scope.now_show_log = ""
    //var ipTest = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;

    /**
     * 请求创建进度展示
     */

    $scope.node_log_cache = {};
    $scope.show_log_init_flag = false;

    $scope.has_show_log_init = function (){
        if($scope.show_log_init_flag == false){
            angular.forEach($scope.nodeObj.servers, function(node){
                //can't use $scope.ipArray ,because $scope.ipArray is different between before create and start create
                $scope.node_log_cache[node.originalIp.ipaddr] = " ";
            });
            $scope.show_log_init_flag = true;
        }
        return true;
    }


    /*
    *  显示安装log
    */
    $scope.showInstallLog = function(hostip) {
        if($scope.has_show_log_init()){
            $scope.now_show_log = hostip;
            var index = 0;
            $scope.showInstallLogRecorder = "";
            if($scope.node_log_cache[hostip].length != 0){
                var record_list = $scope.node_log_cache[hostip].split('\n');
                var log_length = record_list[hostip];
                var i = 0;
                for(i=log_length-1;i>=0;i--){
                    $scope.showInstallLogRecorder += ("<br />" + record_list[i]);
                }
            }
            $("#LogShow").modal('show');
            var scroll_height = $("#LogRecorder").height();
            $("#LogRecorderDiv").scrollTop(scroll_height);
        }
    }

    $scope.getConfigureProgress = function() {
        if(0 == $scope.ipArray.length){
            return;
        }else{
            angular.forEach($scope.ipArray, function(obj,index){
                configFactory.getProgress({"ipaddr": obj}, function(response){
                    if(response.success){
                        var progressObjTemp = response.data;
                        angular.forEach($scope.nodeObj.servers, function(node){
                            if(node.originalIp.ipaddr == progressObjTemp.ipaddr || node.bussinessIP.ipaddr == progressObjTemp.ipaddr  || node.clusterIP.ipaddr == progressObjTemp.ipaddr){
                                var progress = parseInt(progressObjTemp.progress);
                                if(progress > 100) progress = 100;
                                node.progress = progress;

                                // add log cache
                                var biz_ip = response.data.ipaddr;
                                if($scope.has_show_log_init()){
                                    $scope.node_log_cache[biz_ip] = response.data.initialize_log;
                                }
                                //add node install log
                                if(biz_ip==$scope.now_show_log){
                                    var record_list = response.data.initialize_log.split('\n');
                                    var length = record_list.length;
                                    var i = 0;
                                    $scope.showInstallLogRecorder = "";
                                    for(i=length-1;i>=0;i--){
                                        $scope.showInstallLogRecorder += ("<br />" + record_list[i]);
                                    }
                                    var scroll_height = $("#LogRecorder").height() ;
                                    $("#LogRecorderDiv").scrollTop(scroll_height);
                                }

                            };
                        });
                        if(progressObjTemp.progress >= 100){
                            $scope.showInstallProccessing = false;
                            $scope.ipArray.splice(index, 1);
                        };
                    };
                });
            });
        };
    };

    $scope.getProgress = function() {
        if(0 == $scope.ipArray.length){
            $scope.isComplete = false;
            $("#LogShow").modal('hide');
            $('#complete').modal('show');
            if($scope.progressId) clearTimeout($scope.progressId);
        } else {
            $scope.getConfigureProgress();
            if($scope.progressId) clearTimeout($scope.progressId);
            $scope.progressId = setTimeout(function(){
                $scope.getProgress();
            }, 3000);
        };
    };

    $scope.initPage = function (){
        $scope.seniorModeValue = 0;
        $scope.isScanning = true;
        $scope.isBizNetAndClusterNetSharedNics = false;
        $scope.isOmBizNetAndBizNetSharedNics = true;
        $scope.isReadWriteCacheMix = false;
        $scope.showInstallProccessing = false;
        $scope.showAdvancedOption = false;
        $scope.tabIsShow = true;
        $scope.disablecreate = false;

    }
    $scope.closeProgress = function(){
        $('#complete').modal('hide');
        $scope.toLogin();
    }
    /**
     * 扫描网段
     */
    $scope.scanningIp = function () {
        var startIpRangeList = document.getElementsByName("startIpRangeList");
        var endIpRangeList = document.getElementsByName("endIpRangeList");
        var ipList = document.getElementsByName("ipList");

        for(var i = 0; i < startIpRangeList.length; i++){
            startIpRangeList[i].style.borderColor = "#CCC";
            endIpRangeList[i].style.borderColor = "#CCC";
            var start_ip_check = !IP_REGEXP.test(startIpRangeList[i].value);
            var end_ip_check = !IP_REGEXP.test(endIpRangeList[i].value);
            if(start_ip_check || end_ip_check){
                if(startIpRangeList.length == 1 && startIpRangeList[0].value == "" && endIpRangeList[0].value == ""){
                    if(ipList[0].value != ""){
                        break;
                    }
                    else{
                        $scope.setIpRangeErrorMsg("请输入参数");
                        return;
                    }
                }
                if(start_ip_check){
                    startIpRangeList[i].style.borderColor = "#FF0000";
                }
                if(end_ip_check){
                    endIpRangeList[i].style.borderColor = "#FF0000";
                }
                $scope.setIpRangeErrorMsg("请输入正确的ip地址");
                return;
            }
        }

        //make sure the iprange is ok, so we can break when length = 1 and value = ""
        for(var i = 0; i < ipList.length; i++){
            ipList[i].style.borderColor = "#CCC";
            if(!IP_REGEXP.test(ipList[i].value)){
                if(ipList.length == 1 && ipList[0].value == ""){
                    break;
                }
                ipList[i].style.borderColor = "#FF0000";
                $scope.setIpRangeErrorMsg("非法ip,请输入正确的ip地址");
                return;
            }
        }
        //显示加载图标
        $scope.showLoading = true;
        $scope.configResourse();
    }
    /**
     * 跳转到登陆页面
     */

    $scope.toLogin = function () {
        $state.transitionTo("loginManager");
    }
    /**
     * 请求集群名称,外部访问IP地址,NTP Server
     */
    $scope.configResourse = function () {
        $scope.showTimeTips = true;
        $scope.ipArray = [];
        $scope.progressRecord = 0;
        $scope.scanIPRangeDict = {
            "ipRangeList":[],
            "ipList":[]
        };

        var startIpRangeList = document.getElementsByName("startIpRangeList");
        var endIpRangeList = document.getElementsByName("endIpRangeList");
        var ipList = document.getElementsByName("ipList");
        for(var i = 0;i < startIpRangeList.length;i ++){
            if(startIpRangeList[i].value == "" && endIpRangeList[i].value == ""){
                continue;
            }
            var obj = {
                "startIp":startIpRangeList[i].value,
                "endIp":endIpRangeList[i].value
            }
            $scope.scanIPRangeDict["ipRangeList"].push(obj);
        }

        for(var i = 0;i < ipList.length;i ++){
            if(ipList[i].value == ""){
                continue;
            }
            var obj = {
                "ip":ipList[i].value
            }
            $scope.scanIPRangeDict["ipList"].push(obj);
        }

        configFactory.getSysNode( $scope.scanIPRangeDict, function(response){
            $scope.showLoading = false;
            setTimeout($scope.fitWindowSize, 10);

            if(response.success){
                $scope.isConfig = true;
                $scope.isScanning = false;
                $scope.nodeObj = response.data;
                $scope.num = 0;
                angular.forEach($scope.nodeObj.servers, function(node){
                    if(node.progress != -1){
                        $scope.progressRecord = $scope.progressRecord + 1;
                        $scope.disablecreate = true;
                        $scope.showTimeTips = false;
                    }
                    if(node.selected) {
                        node.$checked = true;
                        $scope.num++;
                        $scope.ipArray.push(node.originalIp.ipaddr);
                    }
                });
                if($scope.progressRecord > 0){
                    $scope.isComplete = true;
                    $scope.getProgress();
                };
                $scope.allIsChecked = false;
                if($scope.num == $scope.nodeObj.servers.length) $scope.allIsChecked = true;

                //add by hosfore
                if($scope.showTimeTips == true && $scope.nodeObj.servers.length != 0){
                    if($scope.nodeObj.timeinfo.skewedFlag == true){
                        $scope.setConfigMessage("节点时差超过10秒，请先同步节点时间！");
                        $scope.showTimeAlertDialog("扫描成功，但节点时差超过10秒，请点击确认，先同步节点时间！");
                        $scope.disablecreate = true;
                    }else{
                        $scope.showTimeAlertDialog("扫描成功，请确认服务器时间无误后再开始配置操作！");
                    };
                }else{
                    $scope.setNormalFailNoticeMsg("节点扫描失败，请确认您输入的IP地址正确!");
                }

            }else{
                $scope.showDialog("扫描失败");
            };
        });

    };

    $scope.rescanConfig = function ()
    {
        $scope.showTimeTips = true;
        $scope.showReLoading = true;
        $scope.nodeObj = ""
        configFactory.getSysNode( $scope.scanIPRangeDict, function(response){
            $scope.showReLoading = false;
            //setTimeout($scope.fitWindowSize, 10);

            if(response.success){
                $scope.isConfig = true;
                $scope.isScanning = false;
                $scope.nodeObj = response.data;
                $scope.num = 0;
                angular.forEach($scope.nodeObj.servers, function(node){
                    if(node.progress != -1){
                        $scope.progressRecord = $scope.progressRecord + 1;
                        $scope.disablecreate = true;
                        $scope.showTimeTips = false;
                    }
                    if(node.selected) {
                        node.$checked = true;
                        $scope.num++;
                        $scope.ipArray.push(node.originalIp.ipaddr);
                    }
                });
                if($scope.progressRecord > 0){
                    $scope.isComplete = true;
                    $scope.getProgress();
                };
                $scope.allIsChecked = false;
                if($scope.num == $scope.nodeObj.servers.length) $scope.allIsChecked = true;

                //add by hosfore
                if($scope.showTimeTips == true && $scope.nodeObj.servers.length != 0){
                    if($scope.nodeObj.timeinfo.skewedFlag == true){
                        $scope.setConfigMessage("节点时差超过10秒，请先同步节点时间！");
                        $scope.showTimeAlertDialog("扫描成功，但节点时差超过10秒，请点击确认，先同步节点时间！");
                        $scope.disablecreate = true;
                    }else{
                        $scope.showTimeAlertDialog("扫描成功，请确认服务器时间无误后再开始配置操作！");
                    };
                }else{
                    $scope.setNormalFailNoticeMsg("节点扫描失败，请确认您输入的IP地址正确!");
                }

            }else{
                $scope.showDialog("扫描失败");
            };
        });
    }

    /**
     * 切换tab标签
     */
    $scope.refreshTimeInfo = function (showtip)
    {
        if (showtip){
            $scope.timeConfigNoticeMessage = "Notice: 正在刷新节点时间信息，请稍后......";
            $("#timeConfigNoticeMessage").show();
        }

        var ipList = []
        angular.forEach($scope.nodeObj.servers, function (node) {
            ipList.push(node.originalIp.ipaddr)
        })
        configFactory.getNodeListTime( {"nodeIpList":ipList}, function(response){
            if(response.success){
                $scope.freshTimeInfo = response.data;
                angular.forEach($scope.nodeObj.servers, function (node) {
                    angular.forEach($scope.freshTimeInfo.timeInfoList, function (nodeTime) {
                        if (nodeTime.ipaddr == node.originalIp.ipaddr){
                            node.humanCheckTime = nodeTime.time;
                        };
                    });

                });

                if (showtip){
                    $scope.timeConfigNoticeMessage = "Notice: 节点时间信息刷新完成！"
                }

            }else{
                if (showtip){
                    $scope.timeConfigNoticeMessage = "Notice: 节点时间信息刷新失败！"
                }
            }
        }); //end configFactory

    }

    $scope.showTimeManagementBox = function () {
        $('#timeManagement').modal('show');
    }

    $scope.closeTimeManagementBox = function () {
        $('#timeManagement').modal('hide');
    }

    $scope.showSetNodeTime = function (server) {
        $scope.nodeToChangeTime = server;
        $scope.newSystemTime = server.humanCheckTime;
        $('#timeManagement').modal('hide');
        $('#nodeTimeSet').modal('show');
    }

    $scope.closeNodeTimeSet = function () {
        $('#nodeTimeSet').modal('hide');
        $('#timeManagement').modal('show');
    }

    $scope.updateNodeTime = function ()
    {
        //TODO: check if time format is legal
        $scope.closeNodeTimeSet()
        $scope.timeConfigNoticeMessage = "Notice: 正在更新节点(" + $scope.nodeToChangeTime.originalIp.ipaddr + ")时间，请稍后...";

        configFactory.setNodeTime({"nodeIp":$scope.nodeToChangeTime.originalIp.ipaddr, "newSystemTime":$scope.newSystemTime}, function(resp){
            $("#timeConfigNoticeMessage").show();
            if (resp.success) {
                $scope.timeConfigNoticeMessage = "Notice: 节点" + $scope.nodeToChangeTime.originalIp.ipaddr + " 时间成功更新为   " + $scope.newSystemTime;
                $scope.refreshTimeInfo(false);
            } else {
                $scope.timeConfigNoticeMessage = "Notice: 节点" + $scope.nodeToChangeTime.originalIp.ipaddr + "时间更新失败!";
            };
        });

    }

    $scope.syncServersTime = function ()
    {
        $scope.closeConfirmSyncTimeDialog()
        var ipList = []
        angular.forEach($scope.nodeObj.servers, function (node) {
            ipList.push(node.originalIp.ipaddr)
        })

        $scope.timeConfigNoticeMessage = "Notice: 正在通过NTPServer:" + $scope.ntpserver.originalIp.ipaddr + "同步所有节点时间，请稍后...";
        configFactory.syncClusterNodeTime({"ntpServerIp":$scope.ntpserver.originalIp.ipaddr,
                                           "netmask":$scope.ntpserver.originalIp.netmask,
                                           "newSystemTime":$scope.newSystemTime,
                                           "nodeIpList":ipList},
                                           function(resp){
            if (resp.success) {
                $scope.disablecreate = false;
                $scope.configMessage = "";
                $scope.timeConfigNoticeMessage = ("Notice: 所有节点均已通过NTPServer:" + $scope.ntpserver.originalIp.ipaddr + "完成时间同步！")
                $scope.refreshTimeInfo(false);
            } else {
                $scope.timeConfigNoticeMessage = ("Notice: 通过NTPServer:" + $scope.ntpserver.originalIp.ipaddr + "同步所有节点时间失败！");
            };
        });

    }

    $scope.showConfirmSyncTimeDialog = function (ntpserver)
    {
        $scope.ntpserver = ntpserver;
        $('#syncConfirmDialog').modal('show');
        $('#timeManagement').modal('hide');
    }

    $scope.closeConfirmSyncTimeDialog = function ()
    {
        $('#syncConfirmDialog').modal('hide');
        $('#timeManagement').modal('show');
    }

    $scope.showTimeAlertDialog = function (msg)
    {
        $('#alertTimeDrift').modal('show');
        $scope.DialogInfo = msg;
    }

    $scope.showDialog = function (msg)
    {
        $('#AlertInfo').modal('show');
        $scope.DialogInfo = msg;
    }

    $scope.showClusterTab = function () {
        $scope.tabIsShow = true;
    }

    $scope.showServiceTab = function () {
        $scope.tabIsShow = false;
        setTimeout(function () {
            $("#rightTDiv").width($("#TDiv").width() - 415);
            $("#rightTable").scrollLeft(0);
            $("#rightTable").scrollTop(0);
        }, 10);
    }
    /**
     * 双击节点列表展示详情
     */
    $scope.clickNum = 0;
    $scope.nodeDblClick = function (index) {
        if($scope.clickNum == 0 || $scope.detailIsShow != index){
            $scope.detailIsShow = index;
            $scope.clickNum ++;
        }else{
            $scope.clickNum = 0;
            $scope.detailIsShow = null;
        }
    };
    /**
     * 全选
     */
    $scope.checkAll = function () {
        $scope.allIsChecked = !$scope.allIsChecked;
        $scope.num = 0;
        angular.forEach($scope.nodeObj.servers, function (node) {
            node.$checked = $scope.allIsChecked;
            if(node.$checked){
                $scope.num++;
                node.selected = 1;
            }else{
                node.selected = 0;
            }
        })
    }

    /**
     * 单选
     */
    $scope.oneCheck = function (node) {
        node.$checked = !node.$checked;
        if(node.$checked){
            $scope.num++;
            node.selected = 1;
        }else{
            $scope.num--;
            node.selected = 0;
        }
        $scope.allIsChecked = ($scope.nodeObj.servers.length >　0 && ($scope.num == $scope.nodeObj.servers.length)) ? true:false;
    }

    $scope.initPage();

    $scope.appSelectValue = 0;
    $scope.appSelect = function(){
        if($scope.appSelectValue == 0){
            $scope.noPro();
        }
        else if($scope.appSelectValue == 1){
            $scope.jzgkIsSelected();
        }
        else{
            $scope.openStackIsSelected();
        }
    }

    $scope.noPro = function (){
        $scope.nodeObj.cluster.application.jzgk.selected = 0;
        $scope.nodeObj.cluster.application.openstack.selected = 0;
        $scope.nodeObj.cluster.diskReplaceMode = "manual";
        $scope.nodeObj.cluster.application.used_application = "common";
    }

    $scope.jzgkIsSelected = function () {
        $scope.nodeObj.cluster.application.openstack.selected = 0;
        $scope.nodeObj.cluster.application.jzgk.selected = 1;
        $scope.nodeObj.cluster.application.used_application = "jzgk";
        $scope.nodeObj.cluster.diskReplaceMode = "auto";
    }

    $scope.openStackIsSelected = function () {
        $scope.nodeObj.cluster.application.openstack.selected = 1;
        $scope.nodeObj.cluster.application.jzgk.selected = 0;
        $scope.nodeObj.cluster.application.used_application = "openstack";
        $scope.nodeObj.cluster.diskReplaceMode = "manual";
    }

    $scope.diskIsSelected = function (disk) {
        if(!disk.selected){
            disk.selected = 1;
        }else{
            disk.selected = 0;
        }
    }

    $scope.nicIsSelected = function (nic) {
        if(!nic.selected){
            nic.selected = 1;
        }else{
            nic.selected = 0;
        }
    }

    $scope.omBizNetworkingModeChanged = function(mode) {
        if(mode == 1 && $scope.isOmBizNetAndBizNetSharedNics != true){
            $scope.nodeObj.cluster.omBizNetAndBizNetSharedNics = 1;
            $scope.isOmBizNetAndBizNetSharedNics = true;
            $("#configureTable").width($("#configureTable").width() - 160);
        } else if (mode == 0 && $scope.isOmBizNetAndBizNetSharedNics != false){
            $scope.nodeObj.cluster.omBizNetAndBizNetSharedNics = 0;
            $scope.isOmBizNetAndBizNetSharedNics = false;
            $("#configureTable").width($("#configureTable").width() + 160);
        }
    }

    $scope.readWriteCacheMixChanged = function(mode) {
        if(mode == 1 && $scope.isReadWriteCacheMix != true){
            $scope.nodeObj.cluster.isReadWriteCacheMix = 1;
            $scope.isReadWriteCacheMix = true;
            $("#configureTable").width($("#configureTable").width() - 260);
            for(var i = 0; i < $scope.nodeObj.servers.length; i ++){
                for(var j = 0; j < $scope.nodeObj.servers[i].disks.length; j++){
                    if ($scope.nodeObj.servers[i].disks[j].purpose == "writecache" || $scope.nodeObj.servers[i].disks[j].purpose == "readcache") {
                        $scope.nodeObj.servers[i].disks[j].purpose = "rwcache";
                    }
                }
            }
        } else if(mode == 0 && $scope.isReadWriteCacheMix != false){
            $scope.nodeObj.cluster.isReadWriteCacheMix = 0;
            $scope.isReadWriteCacheMix = false;
            $("#configureTable").width($("#configureTable").width() + 260);
            for(var i = 0; i < $scope.nodeObj.servers.length; i ++){
                var allc_cache = 0;
                for(var j = 0; j < $scope.nodeObj.servers[i].disks.length; j++){
                    if ($scope.nodeObj.servers[i].disks[j].purpose == "rwcache") {
                        if (allc_cache % 2 == 0) {
                            $scope.nodeObj.servers[i].disks[j].purpose = "writecache";
                        } else {
                            $scope.nodeObj.servers[i].disks[j].purpose = "readcache";
                        };
                        allc_cache += 1;
                    };
                };
            };
        };
    };

    $scope.networkingModeChanged = function(mode) {
        if(mode == 0 && $scope.isBizNetAndClusterNetSharedNics != false){
            $scope.nodeObj.cluster.bizNetAndClusterNetSharedNics = 0
            $scope.isBizNetAndClusterNetSharedNics = false;
            $("#configureTable").width($("#configureTable").width() + 280);
            for(var i = 0; i < $scope.nodeObj.servers.length; i ++){
                for(var j = 0; j < $scope.nodeObj.servers[i].nics.length; j++){
                    if (j == 0 || (j == 1 && $scope.nodeObj.servers[i].nics.length > 3)) {
                        $scope.nodeObj.servers[i].nics[j].network = "bussiness";
                    } else {
                        $scope.nodeObj.servers[i].nics[j].network = "cluster";
                    }
                }
            }
        }else if(mode == 1 && $scope.isBizNetAndClusterNetSharedNics != true){
            $scope.nodeObj.cluster.bizNetAndClusterNetSharedNics = 1
            $scope.isBizNetAndClusterNetSharedNics = true;
            $("#configureTable").width($("#configureTable").width() - 280);
            for(var i = 0; i < $scope.nodeObj.servers.length; i ++){
                for(var j = 0; j < $scope.nodeObj.servers[i].nics.length; j++){
                    if($scope.nodeObj.servers[i].nics[j].network == "bussiness"){
                        $scope.nodeObj.servers[i].nics[j].network = "cluster";
                    }
                }
            }
        };
    };

    $scope.setIpRangeErrorMsg = function (val) {
        $scope.errorMessageBox = val;
        if ($scope.succTime) clearTimeout($scope.succTime);
        $("#errorMessageBox").show();
        $scope.succTime = setTimeout(function () {
            $scope.configMessage = "";
            $scope.succTime = null;
            $("#errorMessageBox").hide();
        }, 5000);
    };

    //add by hosfore 20160224
    $scope.setConfigMessage = function (val) {
        $scope.configMessage = val;
        $("#configMessage").show();
    };

    $scope.setSuccNoticeMsg = function (val) {
        $scope.configMessage = val;
        if ($scope.succTime) clearTimeout($scope.succTime);
        $("#configMessage").show();
        $scope.succTime = setTimeout(function () {
            $scope.configMessage = "";
            $scope.succTime = null;
            $("#configMessage").hide();
        }, 5000);
    };
    $scope.setFailNoticeMsg = function (val) {
        $scope.configMessage = val;
        if ($scope.failTime) clearTimeout($scope.failTime);
        //$("#configMessage").style = 'color:red';
        $("#configMessage").show();
        $scope.failTime = setTimeout(function () {
            $scope.configMessage = "";
            $scope.failTime = null;
            $("#configMessage").hide();
        }, 8000);
    };

    $scope.setNormalFailNoticeMsg = function(msg){
        $scope.ipaddrNetmaskConfictFlag = true;
        $scope.setFailNoticeMsg(msg);
    };
    var selectors = [".div-config input"]
    for (var i = 0; i < selectors.length; i++) {
        $(selectors[i]).each(function () {
            var _this = $(this);
            _this.popover({
                trigger: "manual",
                placement: "top",
                html: true,
                content: function () {
                    if (_this.data("tipMsg")) {
                        return "<div>" + _this.data("tipMsg") + "</div>";
                    }
                    return "";
                }
            });
        });

    }

    $scope.ip2int = function(ip){
        var num = 0;
        ip = ip.split(".");
        num = Number(ip[0]) * 256 * 256 * 256 + Number(ip[1]) * 256 * 256 + Number(ip[2]) * 256 + Number(ip[3]);
        num = num >>> 0;
        return num;
    }

    // 检查IP地址冲突，子网掩码，IP地址是否存在网段冲突
    $scope.check_ipaddr_netmask_samenet = function(hostid1, ip1, mask1, hostid2, ip2, mask2){
        if ($scope.check_ipaddr_netmask1(hostid1, ip1, mask1, hostid2, ip2, mask2) == false) {
            return false;
        };
        if (mask1 != mask2){
            $scope.setNormalFailNoticeMsg("子网掩码有误  " +  hostid1 + ": " + ip1 + "/" + mask1 + "  " + hostid2 + ": " + ip2 + "/" + mask2);
            return false;
        };
        var ip1_net = ($scope.ip2int(ip1) & $scope.ip2int(mask1));
        var ip2_net = ($scope.ip2int(ip2) & $scope.ip2int(mask2));
        if (ip1_net != ip2_net){
            $scope.setNormalFailNoticeMsg("IP地址不在同一网段  " + hostid1 + ": " + ip1 + "/" + mask1 + "  " + hostid2 + ": " + ip2 + "/" + mask2);
            return false;
        };
        return true;
    };
    $scope.check_ipaddr_netmask_diffnet = function(hostid1, ip1, mask1, hostid2, ip2, mask2){
        if ($scope.check_ipaddr_netmask1(hostid1, ip1, mask1, hostid2, ip2, mask2) == false) {
            return false;
        };
        var ip1_net = ($scope.ip2int(ip1) & $scope.ip2int(mask1));
        var ip2_net = ($scope.ip2int(ip2) & $scope.ip2int(mask2));
        if (ip1_net == ip2_net){
            $scope.setNormalFailNoticeMsg("IP地址在同一网段  " + hostid1 + ": " + ip1 + "/" + mask1 + "  " + hostid2 + ": " + ip2 + "/" + mask2);
            return false;
        };
        return true;
    };

    $scope.check_ipaddr_netmask1 = function(hostid1, ip1, mask1, hostid2, ip2, mask2){
        if (!IP_REGEXP.test(ip1)) {
            $scope.setNormalFailNoticeMsg("IP地址不合法  " + hostid1 + ": " + ip1);
            return false;
        };
        if (!IP_REGEXP.test(ip2)) {
            $scope.setNormalFailNoticeMsg("IP地址不合法  " + hostid2 + ": " + ip2);
            return false;
        };
        if (ip1 == ip2){
            $scope.setNormalFailNoticeMsg("IP冲突  " + hostid1 + ": " + ip1 + "/" + mask1 + "  " + hostid2 + ": " + ip2 + "/" + mask2);
            return false;
        };
        if (!IP_REGEXP.test(mask1)) {
            $scope.setNormalFailNoticeMsg("子网掩码不合法  " + hostid1 + ": " + ip1 + "/" + mask1);
            return false;
        };
        if (!IP_REGEXP.test(mask2)) {
            $scope.setNormalFailNoticeMsg("子网掩码不合法  " + hostid2 + ": " + ip2 + "/" + mask2);
            return false;
        };
        return true;
    };
    /**
     * 创建
     */
    $scope.createConfig = function () {
        $scope.ipaddrNetmaskConfictFlag = false;
        $scope.nodeAddingCount = 0;
        if (!HOST_ID_NAME_REGEXP.test($scope.nodeObj.cluster.nodeNamePrefix)){
            $scope.setFailNoticeMsg("高级选项->节点名称前缀，仅支持英文字母，长度为1-12");
            return;
        };
        angular.forEach( $scope.nodeObj.servers, function(node4AddServer,iindex){
            if(node4AddServer.selected != 1){
                return;
            };
            $scope.nodeAddingCount = $scope.nodeAddingCount + 1;
            //检查网关IP设置是否正常
            var gateway = node4AddServer.bussinessIP.gateway;
            if (!IP_REGEXP.test(gateway)) {
                $scope.setNormalFailNoticeMsg("默认网关IP不合法  " + node4AddServer.hostid + ": " + gateway);
                return false;
            };
            if (!(ZERO_IP_REGEXP.test(gateway) || FULL_IP_REGEXP.test(gateway))) {
                var ip1_net = ($scope.ip2int(gateway) & $scope.ip2int(node4AddServer.bussinessIP.netmask));
                var ip2_net = ($scope.ip2int(node4AddServer.bussinessIP.ipaddr) & $scope.ip2int(node4AddServer.bussinessIP.netmask));
                if (ip1_net != ip2_net){
                    $scope.setNormalFailNoticeMsg("默认网关IP地址和iSCSI服务IP地址不在同一网段  " + node4AddServer.hostid + ": " + node4AddServer.bussinessIP.ipaddr + "/" + node4AddServer.bussinessIP.netmask + "  " + gateway + "/" + node4AddServer.bussinessIP.netmask);
                    return;
                };
            };
            //检查是否与OM的IP设置冲突
            if (!$scope.isOmBizNetAndBizNetSharedNics) {
                var om_netmask = $scope.nodeObj.cluster.omBussinessNetmask;
                var om_gateway = $scope.nodeObj.cluster.omBussinessGateway;
                if (!(ZERO_IP_REGEXP.test(om_gateway) || FULL_IP_REGEXP.test(om_gateway))) {
                    var ip1_net = ($scope.ip2int(om_gateway) & $scope.ip2int(om_netmask));
                    var ip2_net = ($scope.ip2int($scope.nodeObj.cluster.omBussinessIpaddr) & $scope.ip2int(om_netmask));
                    if (ip1_net != ip2_net){
                        $scope.setNormalFailNoticeMsg("管理系统IP地址和网关不在同一网段  " + ": " + $scope.nodeObj.cluster.omBussinessIpaddr + "/" + om_netmask + " 网关: " + om_gateway + "/" + om_netmask);
                        return;
                    };
                };
                //外网IP和浮动IP
                var ret = $scope.check_ipaddr_netmask_diffnet(node4AddServer.hostid, node4AddServer.bussinessIP.ipaddr, node4AddServer.bussinessIP.netmask, "管理系统IP地址", $scope.nodeObj.cluster.omBussinessIpaddr, om_netmask);
                if (ret == false) {
                    return;
                };
            } else {
                //外网IP和浮动IP
                var ret = $scope.check_ipaddr_netmask_samenet(node4AddServer.hostid, node4AddServer.bussinessIP.ipaddr, node4AddServer.bussinessIP.netmask, "管理系统IP地址", $scope.nodeObj.cluster.omBussinessIpaddr, node4AddServer.bussinessIP.netmask);
                if (ret == false) {
                    return;
                };
            };
            //内网IP和浮动IP 
            ret = $scope.check_ipaddr_netmask_samenet(node4AddServer.hostid, node4AddServer.clusterIP.ipaddr, node4AddServer.clusterIP.netmask, "管理系统IP地址", $scope.nodeObj.cluster.omClusterIpaddr, node4AddServer.clusterIP.netmask);
            if (ret == false) {
                return;
            };

            if(!$scope.isBizNetAndClusterNetSharedNics){
                var ret = $scope.check_ipaddr_netmask_diffnet(node4AddServer.hostid, node4AddServer.bussinessIP.ipaddr, node4AddServer.bussinessIP.netmask, node4AddServer.hostid, node4AddServer.clusterIP.ipaddr, node4AddServer.clusterIP.netmask);
                if (ret == false) {
                    return;
                };
            }

            //检查节点之间IP是否相互冲突
            angular.forEach($scope.nodeObj.servers, function(node, jindex){
                //iSCSI服务IP地址,内部网络IP地址,比较
                if (iindex <= jindex){
                    if (node4AddServer.bussinessIP.ipaddr == node.clusterIP.ipaddr){
                        $scope.setNormalFailNoticeMsg("IP地址冲突  " + node4AddServer.hostid + ", iSCSI服务IP地址: " + node4AddServer.bussinessIP.ipaddr + "  " + node.hostid + ", 内部网络IP地址: " + node.clusterIP.ipaddr);
                        return;
                    };
                }

                //只需检查比iindex大的值
                if (iindex >= jindex){
                    return;
                };

                //检查bussiness
                var ret = $scope.check_ipaddr_netmask_samenet(node4AddServer.hostid, node4AddServer.bussinessIP.ipaddr, node4AddServer.bussinessIP.netmask, node.hostid, node.bussinessIP.ipaddr, node.bussinessIP.netmask);
                if(ret == false){
                    return;
                };
                //TODO:检查public
                //检查cluster
                ret = $scope.check_ipaddr_netmask_samenet(node4AddServer.hostid, node4AddServer.clusterIP.ipaddr, node4AddServer.clusterIP.netmask, node.hostid, node.clusterIP.ipaddr, node.clusterIP.netmask);
                if(ret == false){
                    return;
                };
            });
        });

        if ($scope.nodeAddingCount < 1){
            $scope.setFailNoticeMsg("请选择1个或以上的节点");
            return;
        };
        if ($scope.ipaddrNetmaskConfictFlag == true){
            return;
        };

        // Check nic
        var checkNicError = false;
        angular.forEach($scope.nodeObj.servers, function(node){
            if(node.selected != 1){
                return;
            }
            var bussiness_nic = false;
            var cluster_nic = false;
            var om_bussiness_nic = false;
            angular.forEach(node.nics, function(nic){
                if(nic.selected) {
                    if(nic.network == "bussiness") {
                        bussiness_nic = true;
                        return;
                    };
                    if(nic.network == "cluster") {
                        cluster_nic = true;
                        return;
                    };
                    if(nic.network == "om_bussiness") {
                        om_bussiness_nic = true;
                        return;
                    };
                };
            });
            // iSCSI 和 cluster 不合并
            if (!$scope.isBizNetAndClusterNetSharedNics) {
                if (!bussiness_nic){
                    $scope.setFailNoticeMsg("请选择 " + node.hostid +" iSCSI服务网络网卡" );
                    checkNicError = true;
                    return;
                };
                if (!cluster_nic){
                    $scope.setFailNoticeMsg("请选择 " + node.hostid +" 内部网络网卡" );
                    checkNicError = true;
                    return;
                };
            } else { // 合并
                if (!cluster_nic){
                    $scope.setFailNoticeMsg("请选择 " + node.hostid +" iSCSI服务/内部网络网卡" );
                    checkNicError = true;
                    return;
                };
            };
            // om bussiness 和 iSCSI 不合并
            if (!$scope.isOmBizNetAndBizNetSharedNics && !om_bussiness_nic){
                $scope.setFailNoticeMsg("请选择 " + node.hostid +" 管理系统网卡" );
                checkNicError = true;
                return;
            };
        });

        if (checkNicError == true) {
            return;
        };

        $scope.ipArray = []
        configFactory.updateSysNode($scope.nodeObj, function(resp){
            if (resp.success) {
                $scope.isComplete = true;
                $scope.disablecreate = true;
                $scope.showInstallProccessing = true;
                $scope.setSuccNoticeMsg("配置提交成功！");
                angular.forEach($scope.nodeObj.servers, function(node){
                    if(node.selected == 1){
                        node.progress = 0;
                        $scope.ipArray.push(node.clusterIP.ipaddr);
                    };
                });
                $scope.getProgress();
            } else {
                $scope.isComplete = false;
                $scope.disablecreate = false;
                $scope.setFailNoticeMsg("配置提交失败！Message: " + resp.message);
            };
        });
    };

    /**
     * 选择编辑
     */
    $scope.selectCell = function (arr) {
        $scope.selectArr = arr;
    };
    /**
     * 选择
     */
    $scope.select = function (obj, type) {
        if (type) {
            if (obj.network === type) {
                obj.selected = obj.selected == 1 ? 0 : 1;
            } else {
                obj.network = type;
                obj.selected = 1;
            }
            return;
        }
        obj.selected = obj.selected == 1 ? 0 : 1;
    };


    //os support model show
    $scope.showOsSupport = function () {
            $('#osSupport').modal.defaults.backdrop = "static";
            $('#osSupport').modal.defaults.keyboard = false;
            $('#osSupport').modal('show');
        };

    $scope.osSupportObj = "";
    $scope.osSupportShowObj = {};
    $scope.diskobj = "";
    $scope.select2 = function (obj, type, node) {
        if(node.osSupport.min_version_support == 0 && type != "osddisk" && type != "writecache"){
            $scope.osSupportObj = obj;
            $scope.osSupportShowObj.wwid = obj.wwid;
            $scope.osSupportShowObj.hostid = node.hostid;
            $scope.osSupportShowObj.versionName = node.osSupport.kernel_version_name;
            $scope.osSupportShowObj.diskName = obj.name;
            $scope.osSupportShowObj.maxVersionSupport = node.osSupport.max_version_support;
            $scope.osSupportShowObj.kernelVersionSupportList = node.osSupport.kernel_version_support_list;

            $scope.diskobj = $('#' + $scope.wwid + type);
            if (obj.purpose === type) {
                if(obj.selected == 0){
                    obj.selected = 1;
                    $scope.diskobj.attr('checked','checked')
                    $scope.showOsSupport();
                }
                else {
                    obj.selected = 0;
                }
            }
            else{
                obj.purpose = type;
                obj.selected = 0;
                $scope.showOsSupport();
            }
            return;
        }
        if (type) {
            if (obj.purpose === type) {
                obj.selected = obj.selected == 1 ? 0 : 1;
            } else {
                obj.purpose = type;
                obj.selected = 1;
            }
            return;
        }
        obj.selected = obj.selected == 1 ? 0 : 1;
    };

    $scope.osSupportClick = function (){
        $scope.osSupportObj.selected = 1;
    };

    $scope.osSupportCancel = function (){
        $scope.diskobj.removeAttr('checked','checked')
        $scope.osSupportObj.selected = 0;
    };

    $scope.selectRadio = function (obj, type) {
        angular.forEach($scope.selectArr, function(obj1){
            if (obj1.network == type) {
                obj1.selected = 0;
            };
        });
        $scope.select(obj, type);
    };

    $scope.selectBond = function (obj) {
        obj.network = "cluster";
        obj.selected = obj.selected == 1 ? 0 : 1;
        return;
    };
    /**
     *     动态固定
     */
    $scope.regDropdown = function () {
        //将下拉框固定
        $(".dropdown-menu").click(function (event) {
            event.stopPropagation();
        });
    };

    $scope.fitWindowSize = function () {
        //让背景自适应屏幕大小
        $("#configContainer").height($(window).height());
        $("#configContainer").width($(window).width());
        $("#rightTDiv").width($("#TDiv").width() - 415);
    };

    $scope.initWindow = function () {
        /************************************************************************************/
        //窗口大小变化时
        window.onresize = function () {
            $scope.fitWindowSize();
        }

        $scope.fitWindowSize();
        $("#rightTable").scroll(function () {
            $("#leftTable").scrollTop($("#rightTable").scrollTop());
            $("#rightHead").scrollLeft($("#rightTable").scrollLeft());
        });

        /************************************************************************************/
    };
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
    /**
        * 显示弹出框
        */
    $scope.showModal = function (to, obj) {
        //$scope.setStorageErrMsg("");
        switch (to) {
        case "advancedOption":
            $scope.modal.message = " 高级选项";
            $scope.modal.to = to;
            return;
        }
    };

    $scope.advancedOptionClickTimes = 0;
    $scope.showFeatureSelected = function () {
        $scope.advancedOptionClickTimes ++;
        if($scope.advancedOptionClickTimes == 2){
            if($scope.showAdvancedOption == true){
                $scope.showAdvancedOption = false;
            }else{
                $scope.showAdvancedOption = true;
            }
            $scope.advancedOptionClickTimes = 0;
        }
        $scope.clickATimout = setTimeout(function () {
            $scope.advancedOptionClickTimes = 0;
        }, 400);
    };
}]);
