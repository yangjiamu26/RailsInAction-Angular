/**
 * 节点扩容controller
 * @author wuchanggui
 * @createTime 2015-5-23
 */
vsanApp.controller('nodeAddCtrl', ['$scope', 'nodeFactory', function ($scope, nodeFactory) {
    'use strict';

    /**
     * 页面初始化
     */

    var IP_REGEXP = /^((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/;
    var ZERO_IP_REGEXP = /^([0]{1,}\.){3}[0]{1,}$/;
    var FULL_IP_REGEXP = /^(255\.){3}255$/;

    $scope.initPage = function () {
        $scope.disableNodeAdd = true;
        $scope.disableAllIsChecked = true;
        $scope.disabledScan = false;
        $scope.isBizNetAndClusterNetSharedNics = false;
        $scope.isReadWriteCacheMix = false;
        $scope.isOmBizNetAndBizNetSharedNics = true;
        //获取现有的node节点
        nodeFactory.nodeConfGet(function (res) {
            if (res.success) {
                $scope.nodes = res.data;
                if($scope.nodes.cluster.bizNetAndClusterNetSharedNics == 0) {
                    $scope.isBizNetAndClusterNetSharedNics = false;
                } else {
                    $scope.isBizNetAndClusterNetSharedNics = true;
                };
                if($scope.nodes.cluster.omBizNetAndBizNetSharedNics == 0) {
                    $scope.isOmBizNetAndBizNetSharedNics = false;
                } else {
                    $scope.isOmBizNetAndBizNetSharedNics = true;
                };
                if($scope.nodes.cluster.isReadWriteCacheMix == 0) {
                    $scope.isReadWriteCacheMix =  false;
                } else {
                    $scope.isReadWriteCacheMix =  true;
                };
            } else {
                $scope.setFailNoticeMsg("查询失败！");
            }
        });
        //调整页面布局
        setTimeout(function () {
            $scope.fitWindowSize();
        }, 10);
        $(window).resize(function () {
            $("#rightTDiv").width($("#TDiv").width() - 415);
            $("#rightTDiv2").width($("#TDiv2").width() - 415);
        });
        $("#rightTable").scroll(function () {
            $("#leftTable").scrollTop($("#rightTable").scrollTop());
            $("#rightHead").scrollLeft($("#rightTable").scrollLeft());
        });
        $("#rightTable2").scroll(function () {
            $("#leftTable2").scrollTop($("#rightTable2").scrollTop());
            $("#rightHead2").scrollLeft($("#rightTable2").scrollLeft());
        });
    };

    /**
     * 开始扫描
     */
    $scope.startDiscover = function () {
        if (!IP_REGEXP.test($scope.startIp)) {
            //$scope.setFailNoticeMsg("请输入正确的IP！");
            $scope.showTipMsg('请输入正确IP','startIp');
            return;
        }

        if (!IP_REGEXP.test($scope.endIp)) {
            //$scope.setFailNoticeMsg("请输入正确的IP！");
            $scope.showTipMsg('请输入正确IP','endIp');
            return;
        }
        $scope.isDiscover = true;
        $scope.disabledScan = true;
        $scope.atProccessingNodeCount = 0;
        $scope.nodeAddingIpaddrArray = [];
        nodeFactory.nodeDiscover({
            startIp: $scope.startIp,
            endIp: $scope.endIp
        }, function (res) {
            $scope.isDiscover = false;
            if (res.success) {
                $scope.disableAllIsChecked = false;
                $scope.setSuccNoticeMsg("扫描完成！");
                $scope.node4Add = res.data;
                $scope.isAdd = true;
                $scope.disableNodeAdd = false;
                $scope.disabledScan = false;
                setTimeout(function () {
                    $scope.fitWindowSize();
                }, 10);
                //查看扫描出的节点是否正在初始化
                angular.forEach($scope.node4Add.servers, function(node){
                    if(node.progress != -1 && node.progress != 100){
                        $scope.atProccessingNodeCount = $scope.atProccessingNodeCount + 1;
                        $scope.nodeAddingIpaddrArray.push(node.originalIp.ipaddr);
                        node.selected = 0
                    };
                    if ($scope.isReadWriteCacheMix){
                        for(var j = 0; j < node.disks.length; j++){
                            if (node.disks[j].purpose == "writecache" || node.disks[j].purpose == "readcache") {
                                node.disks[j].purpose = "rwcache";
                            };
                        };
                    };
                });

                $scope.correctSelected();
                if($scope.atProccessingNodeCount > 0){
                    $scope.allIsChecked = false;
                    $scope.getScanedNodeProgress();
                };
            } else {
                $scope.setFailNoticeMsg(res.message);
            }
        });

    };
    $scope.disabledScan = false;
    $scope.getScanedNodeProgressRemote = function() {
        if(0 == $scope.nodeAddingIpaddrArray.length){
            return;
        } else {
            angular.forEach( $scope.nodeAddingIpaddrArray, function(obj,index){
                nodeFactory.nodeProgGet({"ipaddr": obj}, function(response){
                    if(response.success){
                        var progressObjTemp = response.data;
                        angular.forEach($scope.node4Add.servers, function(node){
                            if(node.originalIp.ipaddr == progressObjTemp.ipaddr || node.bussinessIP.ipaddr == progressObjTemp.ipaddr || node.clusterIP.ipaddr == progressObjTemp.ipaddr){
                                var progress = parseInt(progressObjTemp.progress);
                                if(progress > 100) progress = 100;
                                node.progress = progress;
                            };
                        });
                        if(progressObjTemp.progress >= 100){
                            $scope.nodeAddingIpaddrArray.splice(index, 1);
                        };
                    };
                });
            });
        };
    };

    $scope.getScanedNodeProgress = function() {
        if(0 == $scope.nodeAddingIpaddrArray.length){
            $scope.setSuccNoticeMsg("节点添加成功！");
            if($scope.getScanedNodeProgressFlag) {
                clearTimeout($scope.getScanedNodeProgressFlag);
            };
        } else {
            $scope.getScanedNodeProgressRemote();
            if($scope.getScanedNodeProgressFlag) {
                clearTimeout($scope.getScanedNodeProgressFlag);
            };
            $scope.getScanedNodeProgressFlag = setTimeout(function(){
                $scope.getScanedNodeProgress();
            }, 3000);
        };
    };

    $scope.setNormalFailNoticeMsg = function(msg){
        $scope.ipaddrNetmaskConfictFlag = true;
        $scope.setFailNoticeMsg(msg);
    };

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
     * 创建新的节点
     */
    $scope.addNode = function () {
        //检查是否选择的节点数据为空
        //检查IP是否有冲突
        $scope.ipaddrNetmaskConfictFlag = false;
        $scope.nodeAddingCount = 0;
        angular.forEach( $scope.node4Add.servers, function(node4AddServer,iindex){
            if(node4AddServer.selected != 1){
                return;
            };
            $scope.nodeAddingCount = $scope.nodeAddingCount + 1;

            //检查网关IP设置是否正常
            var gateway = node4AddServer.bussinessIP.gateway;
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
                var ret = $scope.check_ipaddr_netmask_diffnet(node4AddServer.hostid, node4AddServer.bussinessIP.ipaddr, node4AddServer.bussinessIP.netmask, "管理系统IP地址", $scope.nodes.cluster.omBussinessIpaddr, $scope.nodes.cluster.omBussinessNetmask);
                if (ret == false) {
                    return;
                };
            } else {
                var ret = $scope.check_ipaddr_netmask_samenet(node4AddServer.hostid, node4AddServer.bussinessIP.ipaddr, node4AddServer.bussinessIP.netmask, "管理系统IP地址", $scope.nodes.cluster.omBussinessIpaddr, node4AddServer.bussinessIP.netmask);
                if (ret == false) {
                    return;
                };
            };

            ret = $scope.check_ipaddr_netmask_samenet(node4AddServer.hostid, node4AddServer.clusterIP.ipaddr, node4AddServer.clusterIP.netmask, "管理系统IP地址", $scope.nodes.cluster.omClusterIpaddr, node4AddServer.clusterIP.netmask);
            if (ret == false) {
                return;
            };

            //检查与已有节点的IP设置是否冲突
            angular.forEach($scope.nodes.servers, function(node, jindex){
                //检查bussiness
                var ret = $scope.check_ipaddr_netmask_samenet(node4AddServer.hostid, node4AddServer.bussinessIP.ipaddr, node4AddServer.bussinessIP.netmask, node.hostid, node.bussinessIP.ipaddr, node.bussinessIP.netmask);
                if(ret == false) {
                    return;
                };
                //TODO:检查public
                //检查cluster
                ret = $scope.check_ipaddr_netmask_samenet(node4AddServer.hostid, node4AddServer.clusterIP.ipaddr, node4AddServer.clusterIP.netmask, node.hostid, node.clusterIP.ipaddr, node.clusterIP.netmask);
                if(ret == false) {
                    return;
                };
            });

            //检查与已有节点的IP设置是否冲突
            angular.forEach($scope.node4Add.servers, function(node4Add_2, kindex){
                //只需检查比iindex大的值
                if (iindex >= kindex){
                    return;
                };
                //检查bussiness
                var ret = $scope.check_ipaddr_netmask_samenet(node4AddServer.hostid, node4AddServer.bussinessIP.ipaddr, node4AddServer.bussinessIP.netmask, node4Add_2.hostid, node4Add_2.bussinessIP.ipaddr, node4Add_2.bussinessIP.netmask);
                if(ret == false) {
                    return;
                };
                //TODO:检查public
                //检查cluster
                ret = $scope.check_ipaddr_netmask_samenet(node4AddServer.hostid, node4AddServer.clusterIP.ipaddr, node4AddServer.clusterIP.netmask, node4Add_2.hostid, node4Add_2.clusterIP.ipaddr, node4Add_2.clusterIP.netmask);
                if(ret == false) {
                    return;
                };
            });
        });

        if ($scope.nodeAddingCount < 1){
            $scope.setFailNoticeMsg("请选择要添加的节点");
            return;
        };
        if ($scope.ipaddrNetmaskConfictFlag == true){
            return;
        };

        // Check nic
        var checkNicError = false;
        angular.forEach($scope.node4Add.servers, function(node){
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
            // 不合并
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

        //不允许扫描
        //$scope.disabledScan = true;
        $scope.disableNodeAdd = true;
        //提交配置
        $scope.nodeAddingIpaddrArray = [];
        nodeFactory.nodeAdd($scope.node4Add, function (res) {
            if (res.success) {
                $scope.setSuccNoticeMsg("节点配置提交成功！");
                angular.forEach($scope.node4Add.servers, function(node){
                    if(node.selected == 1){
                        node.progress = 0;
                        $scope.nodeAddingIpaddrArray.push(node.clusterIP.ipaddr);
                    };
                });
                $scope.getScanedNodeProgress();
            } else {
                $scope.disabledScan = false;
                $scope.disableNodeAdd = false;
                $scope.setFailNoticeMsg("节点添加失败！Message: " + res.message);
            };
        });
    };

    $scope.fitWindowSize = function () {
        //让背景自适应屏幕大小
        $("#rightTDiv").width($("#TDiv").width() - 415);
        $("#rightTDiv2").width($("#TDiv2").width() - 415);
        if (!$scope.isBizNetAndClusterNetSharedNics){
            $("#orgNodeTable").width(1740);
            $("#orgNodeTableHead").width(1757);
            $("#scanedNodeTable").width(1740);
            $("#scanedNodeTableHead").width(1757);
        } else {
            $("#orgNodeTable").width(1560);
            $("#orgNodeTableHead").width(1577);
            $("#scanedNodeTable").width(1560);
            $("#scanedNodeTableHead").width(1577);
        };
    };

    /**
     * 根据用户选择发生的变化而变化
     */
    $scope.correctSelected = function() {
        angular.forEach($scope.node4Add.servers, function (node) {
            if(node.progress != -1) {
                node.selected = 0
            };
            if(node.selected == 1){
                node.$checked = true;
            }else{
                node.$checked = false;
            };
        });
    };

    /**
     * 选择所有节点
     */
    $scope.selectAllNode = function () {
        $scope.allIsChecked = !$scope.allIsChecked;
        angular.forEach($scope.node4Add.servers, function (node) {
            if($scope.allIsChecked){
                node.selected = 1;
            }else{
                node.selected = 0;
            }
        });
        $scope.correctSelected();
    };


    /**
     * 选择节点
     */
    $scope.nodeSeleteAction = function (node) {
        node.$checked = !node.$checked;
        if(node.$checked){
            node.selected = 1;
        }else{
            node.selected = 0;
        };
        $scope.correctSelected();
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

    /**
     *     动态固定
     */
    $scope.regDropdown = function () {
        //将下拉框固定
        $(".dropdown-menu").click(function (event) {
            event.stopPropagation();
        });
    };

    //提示框
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
    var selectors = ["#ip_scan input"]
    for (var i = 0; i < selectors.length; i++) {
        $(selectors[i]).each(function () {
            var _this = $(this);
            _this.popover({
                trigger: "manual",
                placement: "top",
                html: true,
                content: function () {
                    if (_this.data("tipMsg")) {
                        return "<div style='color:#000;'>" + _this.data("tipMsg") + "</div>";
                    }
                    return "";
                }
            });
        });

    }

}]);
