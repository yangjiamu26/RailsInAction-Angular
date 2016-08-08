/**
    * IP修改controller
    * created by wuchanggui
    * 2015-5-23
    */
vsanApp.controller('ipManagerCtrl', ['$scope', 'nodeFactory', function ($scope, nodeFactory) {
    'use strict';

    /**
        * 页面初始化
        */
    var IP_REGEXP = /^((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/;
    var ZERO_IP_REGEXP = /^([0]{1,}\.){3}[0]{1,}$/;
    var FULL_IP_REGEXP = /^(255\.){3}255$/;

    $scope.initPage = function () {
        $scope.isOmBizNetAndBizNetSharedNics = true;
        //查询节点IP
        nodeFactory.netBussGet({
            servers: []
        }, function (res) {
            if (res.success) {
                $scope.servers = res.data.servers;
            } else {
                $scope.showDialog(res.message);
            }
        });
        //查询OMIP
        nodeFactory.omNetBussGet(function (res) {
            if (res.success) {
                if (res.data.omBizNetAndBizNetSharedNics == 0){
                    $scope.isOmBizNetAndBizNetSharedNics = false;
                } else {
                    $scope.isOmBizNetAndBizNetSharedNics = true;
                };
                $scope.omServer = {
                    bussinessNetwork: res.data.bussinessNetwork
                }
            } else {
                $scope.showDialog(res.message);
            }
        });
    };

    /**
        * 显示IP输入更新框
        */
    $scope.showEdit = function (server) {
        server.$edit = true;
        server.edit = angular.copy(server.bussinessNetwork);
    };
    /**
        * 关闭IP输入框
        */
    $scope.hideEdit = function (server) {
        server.$edit = false;
    };

    $scope.ip2int = function(ip){
        var num = 0;
        ip = ip.split(".");
        num = Number(ip[0]) * 256 * 256 * 256 + Number(ip[1]) * 256 * 256 + Number(ip[2]) * 256 + Number(ip[3]);
        num = num >>> 0;
        return num;
    }

    /**
        * 更新业务IP
        */
    $scope.saveEdit = function (server) {
        if (!IP_REGEXP.test(server.edit.ipaddr)) {
            $scope.setFailNoticeMsg('IP不合法!');
            return;
        };
        if (!IP_REGEXP.test(server.edit.netmask)) {
            $scope.setFailNoticeMsg('子网掩码不合法!');
            return;
        };
        var serverIndex = 0;
        var BussIpList = [];
        var HostIp = {};
        for (var server_Index=0; serverIndex < $scope.servers.length; serverIndex++) {
            BussIpList.push($scope.servers[serverIndex].bussinessNetwork.ipaddr);
            HostIp[$scope.servers[serverIndex].hostid] = $scope.servers[serverIndex].bussinessNetwork.ipaddr
        }
        if (server.hostid) {
            if (server.edit.ipaddr == $scope.omServer.bussinessNetwork.ipaddr ){
                $scope.setFailNoticeMsg('该IP和OM IP冲突了');
                return;
            }
            for (var i = 0 ; i < BussIpList.length ; i++ ) {
                if ( server.edit.ipaddr == BussIpList[i] ) {
                    if ( server.edit.ipaddr != HostIp[server.hostid] ){
                        $scope.setFailNoticeMsg('该IP已在使用，请尝试其他IP');
                        return ;
                    }
                }
            }
            var gateway = server.edit.gateway;
            if (!IP_REGEXP.test(gateway)) {
                $scope.setFailNoticeMsg('默认网关IP不合法!');
                return;
            };
            //检查网关IP设置是否正常
            if (!(ZERO_IP_REGEXP.test(gateway) || FULL_IP_REGEXP.test(gateway))) {
                var ip1_net = ($scope.ip2int(gateway) & $scope.ip2int(server.edit.netmask));
                var ip2_net = ($scope.ip2int(server.edit.ipaddr) & $scope.ip2int(server.edit.netmask));
                if (ip1_net != ip2_net){
                    $scope.setFailNoticeMsg("IP地址和默认网关不在同一网段  " + server.hostid + ": " + server.edit.ipaddr + "/" + server.edit.netmask + "  " + gateway + "/" + server.edit.netmask);
                    return;
                };
            };
            $scope.setWaitNoticeMsg('正在修改，请稍后。。。');
            nodeFactory.netBussUpdate({
                hostid: server.hostid,
                bussinessNetwork: {
                    ipaddr: server.edit.ipaddr,
                    netmask: server.edit.netmask,
                    gateway: server.edit.gateway
                }
            }, function (res) {
                if (res.success) {
                    $scope.setSuccNoticeMsg('修改成功！');
                    server.bussinessNetwork.ipaddr = server.edit.ipaddr;
                    server.bussinessNetwork.netmask = server.edit.netmask;
                    server.bussinessNetwork.gateway = server.edit.gateway;
                    server.$edit = false;
                } else {
                    $scope.setFailNoticeMsg(res.message);
                }
            });
        } else {

            for ( var i = 0 ; i < BussIpList.length ; i++ ) {
                if( server.edit.ipaddr == BussIpList[i] ) {
                    $scope.setFailNoticeMsg('该IP与业务IP冲突了');
                    return ;
                }
            };
            if (!IP_REGEXP.test(server.edit.gateway)) {
                $scope.setFailNoticeMsg('默认网关IP不合法!');
                return;
            };
            $scope.setWaitNoticeMsg('正在修改，请稍后。。。');
            nodeFactory.omNetBussUpdate({
                bussinessNetwork: {
                    ipaddr: server.edit.ipaddr,
                    netmask: server.edit.netmask,
                    gateway: server.edit.gateway
                }
            }, function (res) {
                if (res.success) {
                    $scope.setSuccNoticeMsg('修改成功！');
                    server.bussinessNetwork.ipaddr = server.edit.ipaddr;
                    server.bussinessNetwork.netmask = server.edit.netmask;
                    server.bussinessNetwork.gateway = server.edit.gateway;
                    server.$edit = false;
                } else {
                    $scope.setFailNoticeMsg(res.message);
                }
            });
        }
    };

}]);
