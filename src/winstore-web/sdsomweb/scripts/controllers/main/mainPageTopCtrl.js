/**
    * Created by yuguangda on 2014/12/18.
    */

    function zalign(s) {
        return s < 10 ? '0' + s: s;
    }

vsanApp.controller('mainPageTopCtrl',function($scope,$rootScope,mainFactory){

    $scope.capacity = {};//存储容量
    $scope.summary = {};//硬件summary节点数
    $scope.chost = {};//应用主机

    var ioPsTimeLineData = [];//集群x轴数据
    var mbpsTimeLineData = [];//mbps的x轴数据
    var latencyTimeLineData = [];//latency的x轴数据

    $scope.init = function(){
        //存储容量显示
        mainFactory.queryCapacity(function(datas){
            if(1===datas.success){
                var usedSpace = datas.data.used_bytes//已用
                var freeSpace = datas.data.free_bytes//剩余空间
                var totalSpace = datas.data.capacity_bytes;//总共
                //$scope.capacity ={'free_bytes': };
                $scope.capacity.used_bytes = usedSpace;
                $scope.capacity.free_bytes = freeSpace;
                $scope.capacity.capacity_bytes =totalSpace;
                fSummary(usedSpace,freeSpace);
            }
        });
        //查询硬件summary节点数
        mainFactory.querySysNodes(function(datas){
            if(1===datas.success){
                $scope.summary.total = datas.data.total;
                $scope.summary.ok = datas.data.ok;
                $scope.summary.down = datas.data.down;
            }else{
                console.log(datas.message);
            }
        });

    //请求存储池数量
    mainFactory.queryResourcePool({pagesize: 100, pageno: 1}, function (res) {
        if (res.data != null) {
            $scope.mainPoolCount = res.data[0].length || 0;
        } else {
            $scope.mainPoolCount = 0;
        }

    });
    //请求lun数量
    mainFactory.queryResourceLun({pagesize: 100, pageno: 1}, function (res) {
        $scope.mainLunCount = res.data.length || 0;
    });
    //查询集群数据
    mainFactory.queryPerf({'from':'-1h','target':'iops.rw'},function(datas){
        var times = [];
        var values = [];
        var values2 = [];
        var pointDatas = datas.data.datapoints;
        for(var i=0; i<pointDatas.length;i++){
            times.push(pointDatas[i][0]);
            if(null===pointDatas[i][1]){
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
        if(1===datas.success){
            ioPsTimeLineData = times;
            fIops(times,values,values2);
        }
    });
    mainFactory.queryPerf({'from':'-1h','target':'mbps.rw'},function(datas){
        var times = [];
        var values = [];
        var values2 = [];
        var pointDatas = datas.data.datapoints;
        for(var i=0; i<pointDatas.length;i++){
            times.push(pointDatas[i][0]);
            if(null===pointDatas[i][1]){
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
        if(1===datas.success){
            mbpsTimeLineData = times;
            fIobroadband(times,values,values2);
        }
    });
    mainFactory.queryPerf({'from':'-1h','target':'latency.rw'},function(datas){
        var times = [];
        var values = [];
        var values2 = [];
        var pointDatas = datas.data.datapoints;
        for(var i = 0; i < pointDatas.length;i ++){
            times.push(pointDatas[i][0]);
            if(null === pointDatas[i][1]){
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
        if(1===datas.success){
            latencyTimeLineData = times;
            fAvLatency(times,values,values2);
        }
    });
};

    //存储summary
    var summaryChart = echarts.init(document.getElementById('remainSpace'));
    var fSummary = function(usedSpace,freeSpace){
        var summaryOption = {
            calculable : false,
            series : [
                {
                    name:'访问来源',
                    type:'pie',
                    center:['50%','50%'],
                    radius : ['70%', '90%'],
                    itemStyle : {
                        normal : {
                            label : {
                                show : false
                            },
                            labelLine : {
                                show : false
                            }
                        },
                        emphasis : {
                            label : {
                                show : true,
                                position : 'center',
                                textStyle : {
                                    fontSize : '30',
                                    fontWeight : 'bold'
                                }
                            }
                        }
                    },
                    data:[
                        {
                            value:usedSpace,
                            itemStyle:{
                                normal:{
                                    color:'#488FD2'
                                }
                            }
                        },{
                            value:freeSpace,
                            itemStyle:{
                                normal:{
                                    color:'#F1F0F0'
                                }
                            }
                        }
                    ]
                }
            ]
        };
        summaryChart.setOption(summaryOption);
    }

    //集群iops
    var ioPsChart = echarts.init(document.getElementById('ioPs'));
    var fIops = function(times,values,values2){

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

        var ioPsOption = {
            tooltip : {
                trigger: 'axis',
                backgroundColor: 'rgba(138,159,179,0.7)',
            },
            grid:{
                x:40,
                y:20,
                x2:20,
                y2:30,
                borderWidth:0
            },
            legend: {
                data:['read','write'],
                x: 'right',
                y: 'top',
                textStyle: {
                    color: 'auto'
                },
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
                    name:'IOPS' + unit[unit_index],
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
                    name:'read',
                    type:'line',
                    data:values,
                    symbol:'none',
                    itemStyle: {
                        normal: {
                            color:'#04CA4F',
                            lineStyle: {
                                type: 'solid',
                                width: 0.9,
                            },
                        }
                    }
                },{
                    name:'write',
                    type:'line',
                    data:values2,
                    symbol:'none',
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
        ioPsChart.setOption(ioPsOption);
    };

    //集群io宽带
    var ioBroadbandChart = echarts.init(document.getElementById('ioBroadband'));
    var fIobroadband = function(times,values,values2){

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
        while( max_point > 1000 ) {
            max_point /= 1000;
            multiply *= 1000;
            unit_index++;
        }
        $scope.capacity.bandwidth = unit[unit_index] + 'Bps';
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

        var ioBroadbandOption = {
            tooltip : {
                trigger: 'axis',
                backgroundColor: 'rgba(138, 159, 179,0.7)',
            },
            grid:{
                x:55,
                y:20,
                x2:20,
                y2:30,
                borderWidth:0
            },
            legend: {
                data:['read','write'],
                x: 'right',
                y: 'top',
                textStyle: {
                    color: 'auto'
                },
            },
            calculable : false,
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : true,
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
                        //interval: 10, //坐标轴显示全部
                        rotate: 0, //坐标轴顺时针45°显示
                        textStyle: {
                            color: '#728092',
                            fontSize:10
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    data :(function(){
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
                    name: unit[unit_index] + 'Bps',
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
                    name:'read',
                    type:'line',
                    data:values,
                    symbol:'none',
                    itemStyle: {
                        normal: {
                            color:'#00ACFF',
                            lineStyle: {
                                type: 'solid',
                                width: 0.9,
                            },
                        }
                    }
                },{
                    name:'write',
                    type:'line',
                    data:values2,
                    symbol:'none',
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
        ioBroadbandChart.setOption(ioBroadbandOption);
    }

    //平均时延
    var avLatencyChart = echarts.init(document.getElementById('avLatency'));
    var fAvLatency = function(times,values,values2){
        max_timeout = 0;
        for (var i = 0 ; i < values.length; i++ ) {
            if ( values[i] > max_timeout ) {
                max_timeout = values[i];
            }
        }
        for (var i = 0 ; i < values2.length ; i++ ) {
            if (values[i] > max_timeout ) {
                max_timeout = values2[i] ;
            }
        }
        unit = ['ms','s'];
        var unit_index = 0;
        multiply = 1;
        while (max_timeout > 1000 ) {
            max_timeout /= 1000;
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

        var avLatencyOption = {
            tooltip : {
                trigger: 'axis',
                backgroundColor: 'rgba(138, 159, 179,0.7)',
            },
            grid:{
                x:40,
                y:20,
                x2:20,
                y2:30,
                borderWidth:0
            },
            legend: {
                data:['read','write'],
                x: 'right',
                y: 'top',
                textStyle: {
                    color: 'auto'
                },
            },
            calculable : false,
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : true,
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
                    data :(function(){
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
                    name: unit[unit_index],
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
                    name:'read',
                    type:'line',
                    data:values,
                    symbol:'none',
                    itemStyle: {
                        normal: {
                            color:'#FB4834',
                            lineStyle: {
                                type: 'solid',
                                width: 0.9,
                            },
                        },
                    },
                }, {
                    name:'write',
                    type:'line',
                    data:values2,
                    symbol:'none',
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
        avLatencyChart.setOption(avLatencyOption);
    }

    //页面刷新
    window.onresize = function() {
        ioPsChart.resize();
        ioBroadbandChart.resize();
        avLatencyChart.resize();
    };

    //设置定时任务
    clearInterval(mainTopTimeTicker);
    var mainTopTimeTicker = setInterval(function(){
        //存储容量显示
        mainFactory.queryCapacity(function(datas){
            if(1===datas.success){
                var usedSpace = datas.data.used_bytes//已用
                var freeSpace = datas.data.free_bytes//剩余空间
                var totalSpace = datas.data.capacity_bytes;//总共
                $scope.capacity.used_bytes = usedSpace;
                $scope.capacity.free_bytes = freeSpace;
                $scope.capacity.capacity_bytes =totalSpace;
                fSummary(usedSpace,freeSpace);
            }
        });

    //查询集群数据
    var ioTimeLine = ioPsTimeLineData;
    var ioLastTime = ioTimeLine[ioTimeLine.length-1];//获取最后点时间
    var ioParams = {'from':ioLastTime,'target':'iops.rw'};
    mainFactory.queryPerf(ioParams,function(datas){
        var pointDatas = datas.data.datapoints;
        var ioAddData = [];
        for(var i=0; i<pointDatas.length;i++){
            ioPsTimeLineData.splice(0,1);
            ioPsTimeLineData.push(pointDatas[i][0]);
            var sTime = new Date(1000*pointDatas[i][0]);
            var sHour = sTime.getHours();
            var sMinu = sTime.getMinutes();
            var nowTime = zalign(sHour) +':'+ zalign(sMinu);
            var nowValue =pointDatas[i][1];
            var nowValue2 = pointDatas[i][2];
            if(null===pointDatas[i][1]){
                nowValue=0;
            }
            if(null===pointDatas[i][2]){
                nowValue2 = 0;
            }
            ioAddData.push([
                0,//数据索引
                nowValue,//新增数据
                false,
                false,
                nowTime//新增横轴
            ],[
                1,//数据索引
                nowValue2,//新增数据
                false,
                false
            ]
            );
        }
        ioPsChart.addData(ioAddData);
    });

    //查询集群io带宽
    var broTimeLine = mbpsTimeLineData;
    var broLastTime = broTimeLine[broTimeLine.length-1];//获取最后点时间
    var broParams = {'from':broLastTime,'target':'mbps.rw'};
    mainFactory.queryPerf(broParams,function(datas){
        var pointDatas = datas.data.datapoints;
        var broAddData = [];
        for(var i=0; i<pointDatas.length;i++){
            mbpsTimeLineData.splice(0,1);
            mbpsTimeLineData.push(pointDatas[i][0]);
            var sTime = new Date(1000*pointDatas[i][0]);
            var sHour = sTime.getHours();
            var sMinu = sTime.getMinutes();
            var nowTime = zalign(sHour) +':'+ zalign(sMinu);
            var nowValue =pointDatas[i][1];
            var nowValue2 = pointDatas[i][2];
            if(null===pointDatas[i][1]){
                nowValue=0;
            }
            if(null===pointDatas[i][2]){
                nowValue2 = 0;
            }
            broAddData.push([
                0,//数据索引
                nowValue,//新增数据
                false,
                false,
                nowTime//新增横轴
            ],[
                1,//数据索引
                nowValue2,//新增数据
                false,
                false
            ]);
        }
        ioBroadbandChart.addData(broAddData);
    });

    //查询平均时延
    var avTimeLine = latencyTimeLineData;
    var avLastTime = avTimeLine[avTimeLine.length-1];//获取最后点时间
    var avParams = {'from':avLastTime,'target':'latency.rw'};
    mainFactory.queryPerf(avParams,function(datas){
        var pointDatas = datas.data.datapoints;
        var avAddData = [];

    for(var i=0; i < pointDatas.length; i++){
        latencyTimeLineData.splice(0,1);
        latencyTimeLineData.push(pointDatas[i][0]);

    var sTime = new Date(1000*pointDatas[i][0]);
    var sHour = sTime.getHours();
    var sMinu = sTime.getMinutes();
    var nowTime = zalign(sHour) +':'+ zalign(sMinu);
    var nowValue =pointDatas[i][1];
    var nowValue2 = pointDatas[i][2];
    if(null===pointDatas[i][1]){
        nowValue = 0;
    }
    if(null===pointDatas[i][2]){
        nowValue2 = 0;
    }

    avAddData.push([
        0,//数据索引
        nowValue,//新增数据
        false,
        false,
        nowTime//新增横轴
    ],[
        1,//数据索引
        nowValue2,//新增数据
        false,
        false
    ]);
}
avLatencyChart.addData(avAddData);
});

    },30000);		// refresh least interval is 30s, for bakend server update data once every 30s

    $rootScope.$on("$stateChangeStart", cancelTimer);
    function cancelTimer(event, toState, toParams, fromState, fromParams) {
        clearInterval(mainTopTimeTicker);
    }
});
