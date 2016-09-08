/**
 * Created by yuguangda on 2015/3/1.
 */

vsanApp.controller("nodeBottomCtrl", ["$scope","nodeFactory","$rootScope",function ($scope,nodeFactory,$rootScope) {
    var statusData = {};//集群硬件详细信息请求参数
    $scope.nodeStatus = {};//集群硬件详细信息
    /*var nodeCpuTimeLineData = [];//集群cpux轴数据
    var nodeMemroyTimeLineData = [];//集群内存x轴数据
    var nodeDiskTimeLineData = [];//集群磁盘容量x轴数据
    var nodeIopsTimeLineData = [];//集群Iops的x轴数据
    var nodeMbpsTimeLineData = [];//集群Mbps的x轴数据*/

    var showNodeChart = function(num){
        statusData = {};
        var cpuData = {
            from:"-1h",
            target:"cluster.sandstone.cpu.total"
        };
        var memoryData = {
            from:"-1h",
            target:"cluster.sandstone.memory.total"
        };
        var diskData = {
            from:"-1h",
            target:"cluster.sandstone.diskspace.total"
        };
        var iopsData = {
            from:"-1h",
            target:"cluster.sandstone.iops"
        };
        var mbpsData = {
            from:"-1h",
            target:"cluster.sandstone.mbps"
        };
        if(2===num){
            statusData ={
                nodeName:"",
                nodeNum:""
            };
            cpuData = {
                from:"-1h",
                target:"cluster.sandstone.cpu.total"
            };
            memoryData = {
                from:"-1h",
                target:"cluster.sandstone.memory.total"
            };
            diskData = {
                from:"-1h",
                target:"cluster.sandstone.diskspace.total"
            };
            iopsData = {
                from:"-1h",
                target:"cluster.sandstone.iops"
            };
            mbpsData = {
                from:"-1h",
                target:"cluster.sandstone.mbps"
            };
        }
        nodeFactory.getNodeStatus(statusData,function(datas){
            $scope.nodeStatus.nodeCount = datas.data.nodeCount;//主机总数
            $scope.nodeStatus.totalMem = datas.data.totalMem;//总内存
            $scope.nodeStatus.ssdCount = datas.data.ssdCount;//硬盘数ssd
            $scope.nodeStatus.hddCount = datas.data.hddCount;//硬盘数hdd
            $scope.nodeStatus.totalCPU = datas.data.totalCPU;//总cpu容量
        });
        //集群cpu使用详情
        nodeFactory.getNodeCpu(cpuData,function(datas){
            var times = [];
            var values = [];
            var pointDatas = datas.data.datapoints;
            for(var i=0; i<pointDatas.length;i++){
                times.push(pointDatas[i][0]);
                if(null===pointDatas[i][1]){
                    values.push(0);
                }else{
                    values.push(pointDatas[i][1]);
                }
            }
            if(1===datas.success){
                //nodeCpuTimeLineData = times;
                fNodeCpu(times,values);
            }
        });
        //集群内存使用详情
        nodeFactory.getNodeMemory(memoryData,function(datas){
            var times = [];
            var values = [];
            var pointDatas = datas.data.datapoints;
            for(var i=0; i<pointDatas.length;i++){
                times.push(pointDatas[i][0]);
                if(null===pointDatas[i][1]){
                    values.push(0);
                }else{
                    values.push(pointDatas[i][1]);
                }
            }
            if(1===datas.success){
                //nodeMemoryTimeLineData = times;
                fNodeMemory(times,values);
            }
        });
        //集群磁盘容量详情
        nodeFactory.getNodeDisk(diskData,function(datas){
            var times = [];
            var values = [];
            var pointDatas = datas.data.datapoints;
            for(var i=0; i<pointDatas.length;i++){
                times.push(pointDatas[i][0]);
                if(null===pointDatas[i][1]){
                    values.push(0);
                }else{
                    values.push(pointDatas[i][1]);
                }
            }
            if(1===datas.success){
                //nodeDiskTimeLineData = times;
                fNodeDisk(times,values);
            }
        });
        //集群IOPS详情
        nodeFactory.getNodeIops(iopsData,function(datas){
            var times = [];
            var values = [];
            var pointDatas = datas.data.datapoints;
            for(var i=0; i<pointDatas.length;i++){
                times.push(pointDatas[i][0]);
                if(null===pointDatas[i][1]){
                    values.push(0);
                }else{
                    values.push(pointDatas[i][1]);
                }
            }
            if(1===datas.success){
                //nodeIopsTimeLineData = times;
                fNodeIops(times,values);
            }
        });
        //集群MBPS详情
        nodeFactory.getNodeMbps(mbpsData,function(datas){
            var times = [];
            var values = [];
            var pointDatas = datas.data.datapoints;
            for(var i=0; i<pointDatas.length;i++){
                times.push(pointDatas[i][0]);
                if(null===pointDatas[i][1]){
                    values.push(0);
                }else{
                    values.push(pointDatas[i][1]);
                }
            }
            if(1===datas.success){
                //nodeMbpsTimeLineData = times;
                fNodeMbps(times,values);
            }
        });
    };

    $scope.init = function(){
        showNodeChart(1);
    }
    //集群CPU使用详情
    var nodeCpuChart = echarts.init(document.getElementById('nodeCpu'));
    var fNodeCpu = function(times,values){
        var nodeCpuOption = {
            tooltip : {
                show:false,
                trigger: 'axis'
            },
            grid:{
                x:40,
                y:20,
                x2:20,
                y2:30,
                borderWidth:0
            },
            calculable : false,
            xAxis : [
                {
                    type : 'category',
                    boundaryGap: true,
                    axisLine: {
                        lineStyle: { //x轴线样式
                            color: '#728092',
                            width: 1
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
                        textStyle: {
                            color: '#728092',
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    data : (function(){
                        var newTime = []
                        for(var i=0;i<times.length;i++){
                            var sTime = new Date(1000*times[i]);
                            var sHour = sTime.getHours();
                            var sMinu = sTime.getMinutes();
                            var nowTime = zalign(sHour) +':'+ zalign(sMinu);
                            newTime.push(nowTime);
                        }
                        return newTime;
                    })()
                }
            ],
            yAxis : [
                {
                    name:'集群CPU',
                    type : 'value',
                    splitNumber:4,
                    axisLine: {
                        show: true,
                        lineStyle: { //y轴线样式
                            color: '#728092',
                            width: 1
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#728092',
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#e2e2e2'
                        }
                    }
                }
            ],
            series : [
                {
                    type:'line',
                    smooth:true,
                    data:values,
                    symbol:'none',
                    itemStyle: {
                        normal: {
                            color:'#458ed3',
                            lineStyle: {
                                type: 'solid',
                                width: 0.9,
                            },
                            areaStyle: {type: 'default'},
                        }
                    }
                }
            ]
        };
        nodeCpuChart.setOption(nodeCpuOption);
    }

    //集群内存使用详情
    var nodeMemoryChart = echarts.init(document.getElementById('nodeMemory'));
    var fNodeMemory = function(times,values){
        var nodeMemoryOption = {
            tooltip : {
                show:false,
                trigger: 'axis'
            },
            grid:{
                x:40,
                y:20,
                x2:20,
                y2:30,
                borderWidth:0
            },
            calculable : false,
            xAxis : [
                {
                    type : 'category',
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
                            fontSize:10
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    data : (function(){
                        var newTime = []
                        for(var i=0;i<times.length;i++){
                            var sTime = new Date(1000*times[i]);
                            var sHour = sTime.getHours();
                            var sMinu = sTime.getMinutes();
                            var nowTime = zalign(sHour) +':'+ zalign(sMinu);
                            newTime.push(nowTime);
                        }
                        return newTime;
                    })()
                }
            ],
            yAxis : [
                {
                    name:'内存使用率',
                    type : 'value',
                    splitNumber:4,
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
                            fontSize:10
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
            series : [
                {
                    type:'line',
                    data:values,
                    symbol:'none',
                    itemStyle: {
                        normal: {
                            color:'#F5824C',
                            areaStyle: {
                                color:'#78747C',
                                type: 'default'
                            }
                        }
                    }
                }
            ]
        };
        nodeMemoryChart.setOption(nodeMemoryOption);
    }

    //集群磁盘容量详情
    var nodeDiskChart = echarts.init(document.getElementById('nodeDisk'));
    var fNodeDisk = function(times,values){
        var nodeDiskOption = {
            tooltip : {
                show:false,
                trigger: 'axis'
            },
            grid:{
                x:40,
                y:20,
                x2:20,
                y2:30,
                borderWidth:0
            },
            calculable : false,
            xAxis : [
                {
                    type : 'category',
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
                            fontSize:10
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    data : (function(){
                        var newTime = []
                        for(var i=0;i<times.length;i++){
                            var sTime = new Date(1000*times[i]);
                            var sHour = sTime.getHours();
                            var sMinu = sTime.getMinutes();
                            var nowTime = zalign(sHour) +':'+ zalign(sMinu);
                            newTime.push(nowTime);
                        }
                        return newTime;
                    })()
                }
            ],
            yAxis : [
                {
                    name:'容量使用率',
                    type : 'value',
                    splitNumber:4,
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
                            fontSize:10
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
            series : [
                {
                    type:'line',
                    data:values,
                    symbol:'none',
                    itemStyle: {
                        normal: {
                            color:'#F5824C',
                            areaStyle: {
                                color:'#78747C',
                                type: 'default'
                            }
                        }
                    }
                }
            ]
        };
        nodeDiskChart.setOption(nodeDiskOption);
    }

    //集群IOPS性能
    var nodeIopsChart = echarts.init(document.getElementById('nodeIops'));
    var fNodeIops = function(times,values){
        var nodeIopsOption = {
            tooltip : {
                show:false,
                trigger: 'axis'
            },
            grid:{
                x:40,
                y:20,
                x2:20,
                y2:30,
                borderWidth:0
            },
            calculable : false,
            xAxis : [
                {
                    type : 'category',
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
                            fontSize:10
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    data : (function(){
                        var newTime = []
                        for(var i=0;i<times.length;i++){
                            var sTime = new Date(1000*times[i]);
                            var sHour = sTime.getHours();
                            var sMinu = sTime.getMinutes();
                            var nowTime = zalign(sHour) +':'+ zalign(sMinu);
                            newTime.push(nowTime);
                        }
                        return newTime;
                    })()
                }
            ],
            yAxis : [
                {
                    name:'IOPS',
                    type : 'value',
                    splitNumber:4,
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
                            fontSize:10
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
            series : [
                {
                    type:'line',
                    data:values,
                    symbol:'none',
                    itemStyle: {
                        normal: {
                            color:'#04CA4F',
                            areaStyle: {
                                color:'#537172',
                                type: 'default'
                            }
                        }
                    }
                }
            ]
        };
        nodeIopsChart.setOption(nodeIopsOption);
    }

    //集群MBPS性能
    var nodeMbpsChart = echarts.init(document.getElementById('nodeMbps'));
    var fNodeMbps = function(times,values){
        var nodeMbpsOption = {
            tooltip : {
                show:false,
                trigger: 'axis'
            },
            grid:{
                x:40,
                y:20,
                x2:20,
                y2:30,
                borderWidth:0
            },
            calculable : false,
            xAxis : [
                {
                    type : 'category',
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
                            fontSize:10
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    data : (function(){
                        var newTime = []
                        for(var i=0;i<times.length;i++){
                            var sTime = new Date(1000*times[i]);
                            var sHour = sTime.getHours();
                            var sMinu = sTime.getMinutes();
                            var nowTime = zalign(sHour) +':'+ zalign(sMinu);
                            newTime.push(nowTime);
                        }
                        return newTime;
                    })()
                }
            ],
            yAxis : [
                {
                    name:'MBPS',
                    type : 'value',
                    splitNumber:4,
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
                            fontSize:10
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
            series : [
                {
                    type:'line',
                    data:values,
                    symbol:'none',
                    itemStyle: {
                        normal: {
                            color:'#00ACFF',
                            areaStyle: {
                                color:'#305977',
                                type: 'default'
                            }
                        }
                    }
                }
            ]
        };
        nodeMbpsChart.setOption(nodeMbpsOption);
    }

    //页面刷新
    window.onresize = function() {
        nodeCpuChart.resize();
        nodeMemoryChart.resize();
        nodeDiskChart.resize();
        nodeIopsChart.resize();
        nodeMbpsChart.resize();
    };

    //设置定时任务
    /*clearInterval(mainTopTimeTicker);
    var mainTopTimeTicker = setInterval(function(){
        //查询集群集群CPU使用详情
        var cpuTimeLine = nodeCpuTimeLineData;
        var cpuLastTime = cpuTimeLine[cpuTimeLine.length-1];//获取最后点时间
        var cpuParams = {'from':cpuLastTime,'target':'iops.rw'};
        nodeFactory.getNodeCpu(cpuParams,function(datas){
            var pointDatas = datas.data.datapoints;
            var chartAddData = [];
            for(var i=0; i<pointDatas.length;i++){
                nodeCpuTimeLineData.splice(0,1);
                nodeCpuTimeLineData.push(pointDatas[i][0]);
                var sTime = new Date(1000*pointDatas[i][0]);
                var sHour = sTime.getHours();
                var sMinu = sTime.getMinutes();
                var nowTime = zalign(sHour) +':'+ zalign(sMinu);
                var nowValue =pointDatas[i][1];
                if(null===pointDatas[i][1]){
                    nowValue=0;
                }
                chartAddData.push([
                    0,//数据索引
                    nowValue,//新增数据
                    false,
                    false,
                    nowTime//新增横轴
                ]);
            }
            nodeCpuChart.addData(chartAddData);
        });

        //查询集群集群内存使用详情
        var memoryTimeLine = nodeMemroyTimeLineData;
        var memoryLastTime = memoryTimeLine[memoryTimeLine.length-1];//获取最后点时间
        var memoryParams = {'from':memoryLastTime,'target':'iops.rw'};
        nodeFactory.getNodeMemory(memoryParams,function(datas){
            var pointDatas = datas.data.datapoints;
            var chartAddData = [];
            for(var i=0; i<pointDatas.length;i++){
                nodeMemroyTimeLineData.splice(0,1);
                nodeMemroyTimeLineData.push(pointDatas[i][0]);
                var sTime = new Date(1000*pointDatas[i][0]);
                var sHour = sTime.getHours();
                var sMinu = sTime.getMinutes();
                var nowTime = zalign(sHour) +':'+ zalign(sMinu);
                var nowValue =pointDatas[i][1];
                if(null===pointDatas[i][1]){
                    nowValue=0;
                }
                chartAddData.push([
                    0,//数据索引
                    nowValue,//新增数据
                    false,
                    false,
                    nowTime//新增横轴
                ]);
            }
            nodeMemoryChart.addData(chartAddData);
        });

        //查询集群集群磁盘使用详情
        var diskTimeLine = nodeDiskTimeLineData;
        var diskLastTime = diskTimeLine[diskTimeLine.length-1];//获取最后点时间
        var diskParams = {'from':diskLastTime,'target':'iops.rw'};
        nodeFactory.getNodeDisk(diskParams,function(datas){
            var pointDatas = datas.data.datapoints;
            var chartAddData = [];
            for(var i=0; i<pointDatas.length;i++){
                nodeDiskTimeLineData.splice(0,1);
                nodeDiskTimeLineData.push(pointDatas[i][0]);
                var sTime = new Date(1000*pointDatas[i][0]);
                var sHour = sTime.getHours();
                var sMinu = sTime.getMinutes();
                var nowTime = zalign(sHour) +':'+ zalign(sMinu);
                var nowValue =pointDatas[i][1];
                if(null===pointDatas[i][1]){
                    nowValue=0;
                }
                chartAddData.push([
                    0,//数据索引
                    nowValue,//新增数据
                    false,
                    false,
                    nowTime//新增横轴
                ]);
            }
            nodeDiskChart.addData(chartAddData);
        });
        //查询集群集群iops使用详情
        var iopsTimeLine = nodeIopsTimeLineData;
        var iopsLastTime = iopsTimeLine[iopsTimeLine.length-1];//获取最后点时间
        var iopsParams = {'from':iopsLastTime,'target':'iops.rw'};
        nodeFactory.getNodeIops(iopsParams,function(datas){
            var pointDatas = datas.data.datapoints;
            var chartAddData = [];
            for(var i=0; i<pointDatas.length;i++){
                nodeIopsTimeLineData.splice(0,1);
                nodeIopsTimeLineData.push(pointDatas[i][0]);
                var sTime = new Date(1000*pointDatas[i][0]);
                var sHour = sTime.getHours();
                var sMinu = sTime.getMinutes();
                var nowTime = zalign(sHour) +':'+ zalign(sMinu);
                var nowValue =pointDatas[i][1];
                if(null===pointDatas[i][1]){
                    nowValue=0;
                }
                chartAddData.push([
                    0,//数据索引
                    nowValue,//新增数据
                    false,
                    false,
                    nowTime//新增横轴
                ]);
            }
            nodeIopsChart.addData(chartAddData);
        });
        //查询集群集群mbps使用详情
        var mbpsTimeLine = nodeMbpsTimeLineData;
        var mbpsLastTime = mbpsTimeLine[mbpsTimeLine.length-1];//获取最后点时间
        var mbpsParams = {'from':mbpsLastTime,'target':'iops.rw'};
        nodeFactory.getNodeMbps(iopsParams,function(datas){
            var pointDatas = datas.data.datapoints;
            var chartAddData = [];
            for(var i=0; i<pointDatas.length;i++){
                nodeMbpsTimeLineData.splice(0,1);
                nodeMbpsTimeLineData.push(pointDatas[i][0]);
                var sTime = new Date(1000*pointDatas[i][0]);
                var sHour = sTime.getHours();
                var sMinu = sTime.getMinutes();
                var nowTime = zalign(sHour) +':'+ zalign(sMinu);
                var nowValue =pointDatas[i][1];
                if(null===pointDatas[i][1]){
                    nowValue=0;
                }
                chartAddData.push([
                    0,//数据索引
                    nowValue,//新增数据
                    false,
                    false,
                    nowTime//新增横轴
                ]);
            }
            nodeMbpsChart.addData(chartAddData);
        });
    },30000);

    $rootScope.$on("$stateChangeStart", cancelTimer);
    function cancelTimer(event, toState, toParams, fromState, fromParams) {
        clearInterval(mainTopTimeTicker);
    }*/
}]);