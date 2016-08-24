/**
 * 硬件管理controller
 * @aothor wuchanggui
 * @date 2015/2/6
 */
vsanApp.controller("nodeViewManager", ["$scope", "$timeout", "nodeFactory", function ($scope, $timeout, nodeFactory) {
    "use strict";

    /**
     * 更新前后视图
     */
    $scope.initView = function () {
        //获取前后视图信息
        nodeFactory.getSysHardView(function (response) {
            if (response.success) {
                $scope.nodeDetails = response.data;
                $scope.nodeDetails.status.sort(byParam("nodeNum", "num"));
                for (var i = 0; i < $scope.nodeDetails.status.length; i++) {
                    $scope.nodeDetails.status[i].disks.sort(byParam("wwid", "str"));
                    $scope.nodeDetails.status[i].nics.sort(byParam("name", "str"));
                }
                //分行显示
                var row = $scope.nodeDetails.status.length;
                $scope.nodeArray = [];
                for (var i = 0; i < row; i += 4) {
                    $scope.nodeArray.push($scope.nodeDetails.status.slice(i, i + 4));
                }
            }
        });
    };
    //初始化信息提示
    var selectors = ["#SwapDisk input,select",]
    for (var i = 0; i < selectors.length ; i++) {
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

    //缩略图默认展示多少个
    $scope.defaultNodes = 8;

    $scope.partOfNode = true;

    $scope.wholeOfNode = false;
    $scope.diskOp = "add";
    $scope.diskDiscoverDone = false;

    $scope.wholeSelected = {color: '#999'};

    $scope.partSelected = {color: '#333'};

    $scope.toggleNodes = function (type) {
        if (type == 'whole') {
            $scope.partOfNode = false;
            $scope.wholeOfNode = true;
            //设置缩略图和全视图的选中状态
            $scope.wholeSelected = {color: '#333'};
            $scope.partSelected = {color: '#999'};
        }
        if (type == 'part') {
            $scope.partOfNode = true;
            $scope.wholeOfNode = false;
            //设置缩略图和全视图的选中状态
            $scope.wholeSelected = {color: '#999'};
            $scope.partSelected = {color: '#333'};
        }
    };

    $scope.selectedNode = null;

    /**
     * 选中NODE节点改变节点的样式，边框变粗变白色
     * @param event
     */
    $scope.nodeSelect = function (event,nodeDetail) {
        if ($scope.selectedNode == null) {
            $scope.selectedNode = event.currentTarget;
            $($scope.selectedNode).addClass("node-selected");
        } else {
            $($scope.selectedNode).removeClass("node-selected");
            $scope.selectedNode = event.currentTarget;
            $($scope.selectedNode).addClass("node-selected");
        }
        $scope.showPartialNode(nodeDetail);
    };
    $scope.swapDiskShow = function (nodeDetail){
        $scope.selectNode = nodeDetail["nodeName"] //for swap disk op ,because that op can't get node name
//        $scope.lostDisk = null;  //for adjust which disk was be selected ,because some time that will be undefined
//        $scope.newDisk = null;   //for adjust whict disk was be selected ,because some time that will be undefined
        $scope.diskOp = "swap" ;
        $('#SwapDisk').modal('show');
        var param = {"nodeName":nodeDetail["nodeName"]}
        var opts = {
            lines: 7, // The number of lines to draw
            length: 0, // The length of each line
            width: 4, // The line thickness
            radius: 6, // The radius of the inner circle
            corners: 1, // Corner roundness (0..1)
            rotate: 0, // The rotation offset
            color: '#08C', // #rgb or #rrggbb
            speed: 1.8, // Rounds per second
            trail: 60, // Afterglow percentage
            shadow: false, // Whether to render a shadow
            hwaccel: false, // Whether to use hardware acceleration
            className: 'spinner', // The CSS class to assign to the spinner
            zIndex: 2e9, // The z-index (defaults to 2000000000)
            top: 'auto', // Top position relative to parent in px
            left: 'auto' // Left position relative to parent in px
        };
        var targets = document.getElementsByName('discover');
        var spinner = Array(targets.length);
        for(var i = 0; i < targets.length; i++) {
            spinner[i] = new Spinner(opts).spin(targets[i]);
        }
        $scope.checkoutDisk(param);
    }
    $scope.addDiskShow = function(){
        $scope.diskOp = "add" ;
        $('#SwapDisk').modal('show');
    }

    $scope.rediscoverDisk = function() {
        var param = {"nodeName":$scope.selectNode}
        $scope.checkoutDisk(param);
    }
    $scope.swapDisk = function() {
        if (!$scope.adisk.lostDisk) {
            $scope.showTipMsg("请选择被替换的磁盘", "adisk.lostDisk");
            return
        }
        if (!$scope.adisk.newDisk) { 
            $scope.showTipMsg("请选择用于替换的磁盘","adisk.newDisk");
            return
        }
        var lostDiskWwid = Trim($scope.adisk.lostDisk.wwid);
        var lostDiskCapacity = $scope.adisk.lostDisk.capacity;
        var newDiskWwid = Trim($scope.adisk.newDisk.wwid);
        var newDiskCapacity = $scope.adisk.newDisk.capacity;
        var param = {"nodeName":$scope.selectNode,'lostDiskWwid':lostDiskWwid,'newDiskWwid':newDiskWwid ,'lostDiskCapacity':lostDiskCapacity,'newDiskCapacity':newDiskCapacity}
        NProgress.start();
        nodeFactory.nodeDiskSwapDisk(param, function(response) {
            if (response.success) {
                $("#SwapDisk").modal("hide");
                $scope.showDialog("换盘成功，正在对新盘做数据恢复。在磁盘状态显为健康之前不要有任何换盘，拔、插盘操作！");
            }else {
                $("#SwapDisk").modal("hide");
                $scope.showDialog(response.message);
            }
        });
        $scope.initView();
        NProgress.done();
    }
    $scope.addDisk = function() {
        NProgress.start();
        NProgress.done();
    }
    $scope.errMsg = "";
    $scope.setStorageErrMsg = function(msg) {
        $scope.errMsg = msg;
    };
    $scope.setStorageNormal = function() {
        $scope.errMsg = "";
    };
    $scope.checkoutDisk = function(param) {
        $scope.setStorageNormal();
        $scope.adisk = {};
        $scope.diskDiscoverDone = false;
        $scope.lostDiskList = new Array();
        $scope.newDiskList = new Array();
         nodeFactory.nodeDiskCheckout(param, function (response) {
            $scope.diskDiscoverDone = true;
            if (response.success) {
                $scope.setStorageNormal();
                $scope.lostDiskList = response.data.lostDiskList;
                $scope.newDiskList = response.data.newDiskList;
                if ($scope.lostDiskList.length == 0 && $scope.newDiskList.length == 0) {
                    $scope.setStorageErrMsg("未扫描到拔插磁盘状态，请拔出旧磁盘并插入新磁盘后重新扫描");
                }
                else {
                    if ($scope.lostDiskList.length == 0) {
                        $scope.setStorageErrMsg("未扫描到被拔出的磁盘,请拔出需要被替换的磁盘再重新扫描");
                    }     
                    if ($scope.newDiskList.length == 0) {
                        $scope.setStorageErrMsg("未扫描到被新插入的磁盘,请插入用于替换的磁盘再重新扫描");
                    }
                }
            } else {              
                $scope.setStorageErrMsg("磁盘状态扫描失败，可能是内部网络通信有阻塞，请稍后再试");
            }
        });
    }
    $scope.diskLight = function (event,nodeDetail,diskDetail) {
        var lightObj = event.currentTarget;
        var nodeName = nodeDetail['nodeName']
        var wwid = diskDetail['wwid']
        if (diskDetail['lightStatus'] == 'off') {
            $scope.diskLightTurn({'hostid':nodeName, 'wwid':wwid, 'lightOps':'turn_on'} );
        } else {
            $scope.diskLightTurn({'hostid':nodeName, 'wwid':wwid, 'lightOps':'turn_off'} );
        }

    };
    $scope.diskLightTurn = function (param) {

        NProgress.start();
        nodeFactory.nodeDiskLightTurn(param,function (response) {
            if (response.success) {
                $scope.initView();
            } else {
                $scope.showDialog(response.message);
            }
            NProgress.done();
        });
    };
    $scope.showNode = "";

    //鼠标进入节点事件
    $scope.nodeMouseenter = function (pIndex, index) {
        $scope.showNode = pIndex + "_" + index;
    };

    //鼠标离开节点事件
    $scope.nodeMouseleave = function (pIndex, index) {
        $scope.showNode = "";
    };
    //鼠标从节点全部信息移动的显隐变化
    $scope.wholeNodeMouseleave = function (pIndex, index) {
        $("#" + pIndex + "_" + index + "_whole").css("display", "none");
        $("#" + pIndex + "_" + index).css("display", "table");
    }

    $scope.delayShow;

    //监听鼠标扫过的节点的ID值
    $scope.$watch("showNode", function (newValue, oldValue) {
        if (newValue === "") {
            $timeout.cancel($scope.delayShow);
        } else {
            $scope.delayShow = $timeout(function () {
                $("#" + newValue).css("display", "none");
                $("#" + newValue + "_whole").css("display", "table");
            }, 1000);
        }
    });
    var statusData = {};//集群硬件详细信息请求参数
    $scope.nodeStatus = {};//集群硬件详细信息

    $scope.showPartialNode = function (data) {
        showNodeChart(data);
    }
    var showNodeChart = function (nodeData) {
        $scope.nodeStatus.selectedNodeIp = " : " + "系统";
        $scope.mainName = "主机";
        statusData = {};
        var cpuData = {
            from: "-1h",
            target: "cluster.sandstone.cpu.total"
        };
        var memoryData = {
            from: "-1h",
            target: "cluster.sandstone.memory.total"
        };
        var diskData = {
            from: "-1h",
            target: "cluster.sandstone.diskspace.total"
        };
        var iopsData = {
            from: "-1h",
            target: "cluster.sandstone.iops"
        };
        var mbpsData = {
            from: "-1h",
            target: "cluster.sandstone.mbps"
        };
        if (null != nodeData) {
            $scope.mainName = "网卡";
            statusData = {
                nodeName: nodeData.nodeName,
                nodeNum: nodeData.nodeIp
            };
            // $scope.nodeStatus.selectedNodeIp = " : " + nodeData.nodeIp;
            $scope.nodeStatus.selectedNodeIp = nodeData.nodeIp;
            cpuData = {
                from: "-1h",
                target: "servers."+nodeData.nodeName+".sandstone.memory.total"
            };
            memoryData = {
                from: "-1h",
                target: "servers."+nodeData.nodeName+".sandstone.cpu.total"
            };
            diskData = {
                from: "-1h",
                target: "servers."+nodeData.nodeName+".sandstone.diskspace.total"
            };
            iopsData = {
                from: "-1h",
                target: "servers."+nodeData.nodeName+".sandstone.iops"
            };
            mbpsData = {
                from: "-1h",
                target: "servers."+nodeData.nodeName+".sandstone.mbps"
            };
        }
        nodeFactory.getNodeStatus(statusData, function (datas) {
            $scope.nodeStatus.nodeCount = datas.data.nodeCount;//主机总数
            $scope.nodeStatus.totalMem = datas.data.totalMem;//总内存
            $scope.nodeStatus.ssdCount = datas.data.ssdCount;//硬盘数ssd
            $scope.nodeStatus.hddCount = datas.data.hddCount;//硬盘数hdd
            $scope.nodeStatus.totalCPU = datas.data.totalCPU;//总cpu容量
        });
        //集群cpu使用详情
        nodeFactory.getNodeCpu(cpuData, function (datas) {
            var times = [];
            var values = [];
            var pointDatas = datas.data.datapoints;
            for (var i = 0; i < pointDatas.length; i++) {
                times.push(pointDatas[i][0]);
                if (null === pointDatas[i][1]) {
                    //values.push(0);
                    if (i > 0) {
                        values.push(values[i - 1])
                    }
                } else {
                    values.push(pointDatas[i][1]);
                }
            }
            if (1 === datas.success) {
                fNodeCpu(times, values);
            }
        });
        //集群内存使用详情
        nodeFactory.getNodeMemory(memoryData, function (datas) {
            var times = [];
            var values = [];
            var pointDatas = datas.data.datapoints;
            for (var i = 0; i < pointDatas.length; i++) {
                times.push(pointDatas[i][0]);
                if (null === pointDatas[i][1]) {
                    //values.push(0);
                    if (i > 0) {
                        values.push(values[i - 1])
                    }
                } else {
                    values.push(pointDatas[i][1]);
                }
            }
            if (1 === datas.success) {
                //nodeMemoryTimeLineData = times;
                fNodeMemory(times, values);
            }
        });
        //集群磁盘容量详情
        nodeFactory.getNodeDisk(diskData, function (datas) {
            var times = [];
            var values = [];
            var pointDatas = datas.data.datapoints;
            for (var i = 0; i < pointDatas.length; i++) {
                times.push(pointDatas[i][0]);
                if (null === pointDatas[i][1]) {
                    //values.push(0);
                    if (i > 0) {
                        values.push(values[i - 1])
                    }
                } else {
                    values.push(pointDatas[i][1]);
                }
            }
            if (1 === datas.success) {
                fNodeDisk(times, values);
            }
        });
        //集群IOPS详情
        nodeFactory.getNodeIops(iopsData, function (datas) {
            var times = [];
            var values = [];
            var values2 = [];
            var pointDatas = datas.data.datapoints;
            for (var i = 0; i < pointDatas.length; i++) {
                times.push(pointDatas[i][0]);
                if (null === pointDatas[i][1]) {
                    values.push(0);
                }else{
                    values.push(pointDatas[i][1]);
                }
                if(null===pointDatas[i][2]){
                    values2.push(0);
                }else{
                    values2.push(pointDatas[i][2]);
                }

            }
            if (1 === datas.success) {
                fNodeIops(times, values, values2);
            }
        });
        //集群MBPS详情
        nodeFactory.getNodeMbps(mbpsData, function (datas) {
            var times = [];
            var values = [];
            var values2 = [];
            var pointDatas = datas.data.datapoints;
            for (var i = 0; i < pointDatas.length; i++) {
                times.push(pointDatas[i][0]);
                if (null === pointDatas[i][1]) {
                    values.push(0);
                }else{
                    values.push(pointDatas[i][1]);
                }
                if(null===pointDatas[i][2]){
                    values2.push(0);
                }else{
                    values2.push(pointDatas[i][2]);
                }
            }
            if (1 === datas.success) {
                fNodeMbps(times, values, values2);

            }
        });
    };

    $scope.init = function () {
        showNodeChart(null);
    }
    //集群CPU使用详情
    var nodeCpuChart = echarts.init(document.getElementById('nodeCpu'));
    var fNodeCpu = function (times, values) {
        var nodeCpuOption = {
            tooltip: {
                trigger: 'axis',
                backgroundColor: 'rgba(138,159,179,0.7)',
            },
            grid: {
                x: 40,
                y: 20,
                x2: 20,
                y2: 30,
                borderWidth: 0
            },
            legend: {
                data:['cpu'],
                x: 'right',
                y: 'top',
                textStyle: {
                    color: 'auto'
                },
            },
            calculable: false,
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: true,
                    axisLine: {
                        show: true,
                        lineStyle: { //x轴线样式
                            color: '#728092',
                            width: 0
                        }
                    },
                    axisTick: { //x坐标轴小标记
                        show: true,
                        onGap: false,
                        lineStyle: {
                            color: '#728092',
                            width: 1
                        }
                    },
                    axisLabel: { //坐标轴文本标签选项
                        show: true,
                        //interval: 3, //坐标轴显示全部
                        rotate: 0, //坐标轴顺时针45°显示
                        textStyle: {
                            color: '#728092',
                            fontSize: 10
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    data: (function () {
                        var newTime = []
                        for (var i = 0; i < times.length; i++) {
                            var sTime = new Date(1000 * times[i]);
                            var sHour = sTime.getHours();
                            var sMinu = sTime.getMinutes();
                            var nowTime = zalign(sHour) + ':' + zalign(sMinu);
                            newTime.push(nowTime);
                        }
                        return newTime;
                    })()
                }
            ],
            yAxis: [
                {
                    name: '%',
                    type: 'value',
                    splitNumber: 4,
                    axisLine: {
                        show: true,
                        lineStyle: { //y轴线样式
                            color: '#728092',
                            width: 1
                        }
                    },
                    axisLabel: {
                        show: true,
                        interval: 3, //坐标轴显示全部
                        rotate: 0, //坐标轴顺时针45°显示
                        textStyle: {
                            color: '#728092',
                            fontSize: 10
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#728092'
                        }
                    }
                }
            ],
            series: [
                {
                    name: 'cpu',
                    type: 'line',
                    data: values,
                    symbol: 'none',
                    itemStyle: {
                        normal: {
                            color: '#F5824C',
                            lineStyle: {
                                type: 'solid',
                                width: 0.9,
                            },
                        }
                    }
                }
            ]
        };
        nodeCpuChart.setOption(nodeCpuOption);
    }

    //集群内存使用详情
    var nodeMemoryChart = echarts.init(document.getElementById('nodeMemory'));
    var fNodeMemory = function (times, values) {
        var nodeMemoryOption = {
            tooltip: {
                trigger: 'axis',
                backgroundColor: 'rgba(138,159,179,0.7)',
            },
            grid: {
                x: 40,
                y: 20,
                x2: 20,
                y2: 30,
                borderWidth: 0
            },
            legend: {
                data:['memory'],
                x: 'right',
                y: 'top',
                textStyle: {
                    color: 'auto'
                },
            },
            calculable: false,
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: true,
                    axisLine: {
                        show: true,
                        lineStyle: { //x轴线样式
                            color: '#728092',
                            width: 0
                        }
                    },
                    axisTick: { //x坐标轴小标记
                        show: true,
                        onGap: false,
                        lineStyle: {
                            color: '#728092',
                            width: 1
                        }
                    },
                    axisLabel: { //坐标轴文本标签选项
                        show: true,
                        //interval: 3, //坐标轴显示全部
                        rotate: 0, //坐标轴顺时针45°显示
                        textStyle: {
                            color: '#728092',
                            fontSize: 10
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    data: (function () {
                        var newTime = []
                        for (var i = 0; i < times.length; i++) {
                            var sTime = new Date(1000 * times[i]);
                            var sHour = sTime.getHours();
                            var sMinu = sTime.getMinutes();
                            var nowTime = zalign(sHour) + ':' + zalign(sMinu);
                            newTime.push(nowTime);
                        }
                        return newTime;
                    })()
                }
            ],
            yAxis: [
                {
                    name: '%',
                    type: 'value',
                    splitNumber: 4,
                    axisLine: {
                        show: true,
                        lineStyle: { //y轴线样式
                            color: '#728092',
                            width: 1
                        }
                    },
                    axisLabel: {
                        show: true,
                        interval: 3, //坐标轴显示全部
                        rotate: 0, //坐标轴顺时针45°显示
                        textStyle: {
                            color: '#728092',
                            fontSize: 10
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#728092'
                        }
                    }
                }
            ],
            series: [
                {
                    name: 'memory',
                    type: 'line',
                    data: values,
                    symbol: 'none',
                    itemStyle: {
                        normal: {
                            color: '#F5824C',
                            lineStyle: {
                                type: 'solid',
                                width: 0.9,
                            },
                        }
                    }
                }
            ]
        };
        nodeMemoryChart.setOption(nodeMemoryOption);
    }

    //集群磁盘容量详情
    var nodeDiskChart = echarts.init(document.getElementById('nodeDisk'));
    var fNodeDisk = function (times, values) {
        var nodeDiskOption = {
            tooltip: {
                trigger: 'axis',
                backgroundColor: 'rgba(138,159,179,0.7)',
            },
            grid: {
                x: 40,
                y: 20,
                x2: 20,
                y2: 30,
                borderWidth: 0
            },
            legend: {
                data:['disk'],
                x: 'right',
                y: 'top',
                textStyle: {
                    color: 'auto'
                },
            },
            calculable: false,
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: true,
                    axisLine: {
                        show: true,
                        lineStyle: { //x轴线样式
                            color: '#728092',
                            width: 0
                        }
                    },
                    axisTick: { //x坐标轴小标记
                        show: true,
                        onGap: false,
                        lineStyle: {
                            color: '#728092',
                            width: 1
                        }
                    },
                    axisLabel: { //坐标轴文本标签选项
                        show: true,
                        //interval: 3, //坐标轴显示全部
                        rotate: 0, //坐标轴顺时针45°显示
                        textStyle: {
                            color: '#728092',
                            fontSize: 10
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    data: (function () {
                        var newTime = []
                        for (var i = 0; i < times.length; i++) {
                            var sTime = new Date(1000 * times[i]);
                            var sHour = sTime.getHours();
                            var sMinu = sTime.getMinutes();
                            var nowTime = zalign(sHour) + ':' + zalign(sMinu);
                            newTime.push(nowTime);
                        }
                        return newTime;
                    })()
                }
            ],
            yAxis: [
                {
                    name: '%',
                    type: 'value',
                    splitNumber: 4,
                    axisLine: {
                        show: true,
                        lineStyle: { //y轴线样式
                            color: '#728092',
                            width: 1
                        }
                    },
                    axisLabel: {
                        show: true,
                        interval: 3, //坐标轴显示全部
                        rotate: 0, //坐标轴顺时针45°显示
                        textStyle: {
                            color: '#728092',
                            fontSize: 10
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#728092'
                        }
                    }
                }
            ],
            series: [
                {
                    name:'disk',
                    type: 'line',
                    data: values,
                    symbol: 'none',
                    itemStyle: {
                        normal: {
                            color: '#F5824C',
                            lineStyle: {
                                type: 'solid',
                                width: 0.9,
                            },
                        }
                    }
                }
            ]
        };
        nodeDiskChart.setOption(nodeDiskOption);
    }

    //集群IOPS性能
    var nodeIopsChart = echarts.init(document.getElementById('nodeIops'));
    var fNodeIops = function (times, values, values2) {
        var max_point = 0;
        for ( var i = 0; i < values.length ; i++ ) {
            if ( values[i] > max_point ) {
                max_point = values[i];
            }
            if ( values2[i] > max_point ) {
                max_point = values2[i];
            }
        }
        var multiply = 1;
        var unit = [ ' ',' ( K ) ',' ( M ) ',' ( G ) ',' ( T ) '];
        var unit_index = 0;
        while( max_point > 1000 ) {
            max_point /= 1000;
            multiply *= 1000;
            unit_index++;
        }
        if ( values.length == values2.length ) {
            for (var i = 0 ; i < values.length ; i ++ ) {
                values[i] /= multiply;
                values2[i] /= multiply;
            }
        }
        else {
            for ( var i = 0 ; i < values.length ; i++ ) {
                values[i] /= multiply;
            }
            for ( var i = 0 ; i < values2.length ; i++ ) {
                values2[i] /= multiply;
            }
        }

        var nodeIopsOption = {
            tooltip: {
                trigger: 'axis',
                backgroundColor: 'rgba(138,159,179,0.7)',
            },
            grid: {
                x: 40,
                y: 20,
                x2: 20,
                y2: 30,
                borderWidth: 0
            },
            legend: {
                data:['read','write'],
                x: 'right',
                y: 'top',
                textStyle: {
                    color: 'auto'
                },
            },
            calculable: false,
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: true,
                    axisLine: {
                        show: true,
                        lineStyle: { //x轴线样式
                            color: '#728092',
                            width: 0
                        }
                    },
                    axisTick: { //x坐标轴小标记
                        show: true,
                        onGap: false,
                        lineStyle: {
                            color: '#728092',
                            width: 1
                        }
                    },
                    axisLabel: { //坐标轴文本标签选项
                        show: true,
                        //interval: 3, //坐标轴显示全部
                        rotate: 0, //坐标轴顺时针45°显示
                        textStyle: {
                            color: '#728092',
                            fontSize: 10
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    data: (function () {
                        var newTime = []
                        for (var i = 0; i < times.length; i++) {
                            var sTime = new Date(1000 * times[i]);
                            var sHour = sTime.getHours();
                            var sMinu = sTime.getMinutes();
                            var nowTime = zalign(sHour) + ':' + zalign(sMinu);
                            newTime.push(nowTime);
                        }
                        return newTime;
                    })()
                }
            ],
            yAxis: [
                {
                    name: 'IOPS' + unit[unit_index] ,
                    type: 'value',
                    splitNumber: 4,
                    axisLine: {
                        show: true,
                        lineStyle: { //y轴线样式
                            color: '#728092',
                            width: 1
                        }
                    },
                    axisLabel: {
                        show: true,
                        interval: 3, //坐标轴显示全部
                        rotate: 0, //坐标轴顺时针45°显示
                        textStyle: {
                            color: '#728092',
                            fontSize: 10
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#728092'
                        }
                    }
                }
            ],
            series: [
                {
                    name: 'read',
                    type: 'line',
                    data: values,
                    symbol: 'none',
                    itemStyle: {
                        normal: {
                            color:'#04CA4F',
                            lineStyle: {
                                type: 'solid',
                                width: 0.9,
                            },
                        }
                    }
                },  {
                    name: 'write',
                    type: 'line',
                    data: values2,
                    symbol: 'none',
                    itemStyle: {
                        normal: {
                            color:'#FFCF00',
                            lineStyle: {
                                type: 'solid',
                                width: 0.9,
                            },
                        }
                    }
                }
            ]
        };
        nodeIopsChart.setOption(nodeIopsOption);
    }

    //集群MBPS性能
    var nodeMbpsChart = echarts.init(document.getElementById('nodeMbps'));
    var fNodeMbps = function (times, values, values2) {
        var max_point = 0;
        for ( var i = 0; i < values.length ; i++ ) {
            if ( values[i] > max_point ) {
                max_point = values[i];
            }
            if ( values2[i] > max_point ) {
                max_point = values2[i];
            }
        }
        var multiply = 1;
        var unit = [ 'K','M','G','T'];
        var unit_index = 0;
        while( max_point > 1024 ) {
            max_point /= 1024;
            multiply *= 1024;
            unit_index++;
        }
        if ( values.length == values2.length ) {
            for (var i = 0 ; i < values.length ; i ++ ) {
                values[i] /= multiply;
                values2[i] /= multiply;
            }
        }
        else {
            for ( var i = 0 ; i < values.length ; i++ ) {
                values[i] /= multiply;
            }
            for ( var i = 0 ; i < values2.length ; i++ ) {
                values2[i] /= multiply;
            }
        }

        var nodeMbpsOption = {
            tooltip: {
                trigger: 'axis',
                backgroundColor: 'rgba(138,159,179,0.7)',
            },
            grid: {
                x: 40,
                y: 20,
                x2: 20,
                y2: 30,
                borderWidth: 0
            },
            legend: {
                data:['read','write'],
                x: 'right',
                y: 'top',
                textStyle: {
                    color: 'auto'
                },
            },
            calculable: false,
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: true,
                    axisLine: {
                        show: true,
                        lineStyle: { //x轴线样式
                            color: '#728092',
                            width: 0
                        }
                    },
                    axisTick: { //x坐标轴小标记
                        show: true,
                        onGap: false,
                        lineStyle: {
                            color: '#728092',
                            width: 1
                        }
                    },
                    axisLabel: { //坐标轴文本标签选项
                        show: true,
                        //interval: 3, //坐标轴显示全部
                        rotate: 0, //坐标轴顺时针45°显示
                        textStyle: {
                            color: '#728092',
                            fontSize: 10
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    data: (function () {
                        var newTime = []
                        for (var i = 0; i < times.length; i++) {
                            var sTime = new Date(1000 * times[i]);
                            var sHour = sTime.getHours();
                            var sMinu = sTime.getMinutes();
                            var nowTime = zalign(sHour) + ':' + zalign(sMinu);
                            newTime.push(nowTime);
                        }
                        return newTime;
                    })()
                }
            ],
            yAxis: [
                {
                    name: unit[unit_index] + 'bps',
                    type: 'value',
                    splitNumber: 4,
                    axisLine: {
                        show: true,
                        lineStyle: { //y轴线样式
                            color: '#728092',
                            width: 1
                        }
                    },
                    axisLabel: {
                        show: true,
                        interval: 3, //坐标轴显示全部
                        rotate: 0, //坐标轴顺时针45°显示
                        textStyle: {
                            color: '#728092',
                            fontSize: 10
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#728092'
                        }
                    }
                }
            ],
            series: [
                {
                    name: 'read',
                    type: 'line',
                    data: values,
                    symbol: 'none',
                    itemStyle: {
                        normal: {
                            color:'#00ACFF',
                            lineStyle: {
                                type: 'solid',
                                width: 0.9,
                            },
                        }
                    }
                }, {
                    name: 'write',
                    type: 'line',
                    data: values2,
                    symbol: 'none',
                    itemStyle: {
                        normal: {
                            color:'#FFCF00',
                            lineStyle: {
                                type: 'solid',
                                width: 0.9,
                            },
                        }
                    }
                }
            ]
        };
        nodeMbpsChart.setOption(nodeMbpsOption);
    }

    //页面刷新
    window.onresize = function () {
        nodeCpuChart.resize();
        nodeMemoryChart.resize();
        nodeDiskChart.resize();
        nodeIopsChart.resize();
        nodeMbpsChart.resize();
    };


    $scope.initView();

}]);
