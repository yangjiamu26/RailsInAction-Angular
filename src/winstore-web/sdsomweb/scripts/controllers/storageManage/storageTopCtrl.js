/**
    * Created by yuguangda on 2015/1/15.
    */
    function zalign(s) {
        return s < 10 ? '0' + s: s;
    }

vsanApp.controller('storageTopCtrl',function($scope,mainFactory,storageFactory){
    //请求存储池数量
    storageFactory.queryResourcePool({pagesize: 100, pageno: 1}, function (res) {
        if (res.data != null) {
            $scope.poolCount= res.data[0].length || 0;
        } else {
            $scope.poolCount = 0
        }
    });
    //请求lun数量
    storageFactory.queryResourceLun({pagesize: 100, pageno: 1}, function (res) {
        $scope.lunCount = res.data.length || 0;
    });

    $scope.capacity = {};
    $scope.chost = {};
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
        //存储池和容量
        //fStorage();
        //应用主机
        /*mainFactory.queryChost(function(datas){
            if(1===datas.success){
                $scope.chost.running = datas.data.running;//正常运行主机
                $scope.chost.unrunning = datas.data.unrunning;//未正常运行主机
                $scope.chost.total = datas.data.total;//总共
            }
        });*/
        //查询集群数据
        mainFactory.queryPerf({'from':'-1h','target':'iops.rw'},function(datas){
            var times = [];
            var values = [];
            var values2 = [];
            var pointDatas = datas.data.datapoints;
            for(var i=0; i<pointDatas.length;i++){
                times.push(1000*pointDatas[i][0]);
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
        fIops(times,values,values2);
    }
});
//集群io宽带
mainFactory.queryPerf({'from':'-1h','target':'mbps.rw'},function(datas){
    var times = [];
    var values = [];
    var values2 = [];
    var pointDatas = datas.data.datapoints;
    for(var i=0; i<pointDatas.length;i++){
        times.push(1000*pointDatas[i][0]);
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
        fIobroadband(times,values,values2);
    }
});

    };

    //存储summary
    var fSummary = function(usedSpace,freeSpace){
        var summaryChart = echarts.init(document.getElementById('remainSpace'));
        var summaryOption = {
            calculable : false,
            tooltip : {
                show:false,
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
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

    var fStorage = function(){
        var storageChart = echarts.init(document.getElementById('storageSpace'));
        var storageOption = {
            tooltip : {
                show:false,
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            calculable : false,
            series : [
                {
                    name:'总容量',
                    type:'pie',
                    selectedMode: 'single',
                    radius : [0, '50%'],
                    // for funnel
                    itemStyle : {
                        normal : {
                            label : {
                                show:false,
                                position : 'inner'
                            },
                            labelLine : {
                                show : false
                            }
                        }
                    },
                    data:[
                        {value:335,name:'存储池1'},
                        {value:679,name:'存储池2'},
                        {value:1548,name:'存储池3'}
                    ]
                },
                {
                    name:'容量',
                    type:'pie',
                    radius : ['60%', '90%'],
                    itemStyle : {
                        normal : {
                            label : {
                                show:false,
                                position : 'inner'
                            },
                            labelLine : {
                                show : false
                            }
                        }
                    },
                    data:[
                        {value:200, name:'分区1'},
                        {value:135, name:'分区2'},
                        {value:400, name:'分区1'},
                        {value:279, name:'分区2'},
                        {value:1048, name:'分区1'},
                        {value:500, name:'分区2'}
                    ]
                }
            ]
        }
        storageChart.setOption(storageOption);
    };

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
            tooltip: {
                trigger: 'axis',
                backgroundColor: 'rgba(138,159,179,0.7)',
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
                            var sTime = new Date(times[i]);
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
                    name:'read',
                    type:'line',
                    smooth:true,
                    symbol:'none',
                    data:values,
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
                },{
                    name:'write',
                    type:'line',
                    smooth:true,
                    symbol:'none',
                    data:values2,
                    itemStyle: {
                        normal: {
                            color:'#f39c11',
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
            tooltip: {
                trigger: 'axis',
                backgroundColor: 'rgba(138,159,179,0.7)',
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
                    data :(function(){
                        var newTime = []
                        for(var i=0;i<times.length;i++){
                            var sTime = new Date(times[i]);
                            var sHour = sTime.getHours();
                            var sMinu = sTime.getMinutes();
                            var sSeco = sTime.getSeconds();
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
                    name:'read',
                    type:'line',
                    smooth:true,
                    symbol:'none',
                    data:values,
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
                },{
                    name:'write',
                    type:'line',
                    smooth:true,
                    symbol:'none',
                    data:values2,
                    itemStyle: {
                        normal: {
                            color:'#f39c11',
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
        ioBroadbandChart.setOption(ioBroadbandOption);
    }
    //页面刷新
    window.onresize = function() {
        ioPsChart.resize();
        ioBroadbandChart.resize();
    };

});
