
app.controller("overviewBigFirstCtrl",function($scope, $timeout, OverviewRoomStatics, OverviewDcStatics, AssetsManegeDevices){
    $scope.baseInfo = OverviewRoomStatics.get({type:'resourcesCount'});
    $scope.DcInfo = OverviewDcStatics.get({type:'resourcesCount'});
    OverviewDcStatics.get({type:'details'},function(res){
        $scope.datacenters = res;
        $scope.i = 0;
        if(res.data.length<3) return;
        function mytime(){
            if($scope.i==res.data.length-1) $scope.i=0;
            $timeout(function(){
                $scope.i+=1;
                mytime();
            },5000);
        }
        mytime();
    });

    AssetsManegeDevices.query(function(res){
        $scope.devices = res;
        var arr = [];
        $.each(res.data,function(index,val){
            var times = arr.length;
            if(times==0){
                arr.push({
                    'name':val.deviceTypeName,
                    'num':1
                })
            }else{
                var isnew = true;
                for(var i=0;i<times;i++){
                    if(arr[i].name == val.deviceTypeName){
                        arr[i].num=arr[i].num+1;
                        isnew = false;
                    }
                }
                if(isnew){
                    arr.push({
                        'name':val.deviceTypeName,
                        'num':1
                    })
                }
            }
        });
        $scope.deviceTypes = arr;
    });
    
    $scope.canshow = function(index){
        if(index==$scope.i || index==$scope.i+1){
            return true;
        }
    }
})
app.controller("overviewBigSecondCtrl",function($scope, OverviewDcStatics, OverviewAlarmsStatics){
    OverviewDcStatics.query({type:'compare'},function(res1){
        $scope.buildColumn(res1.data);
    });
    OverviewDcStatics.query({type:'quotas'},function(res2){
        $scope.buildPie(res2);
    });
    $scope.alarms = OverviewAlarmsStatics.query({type:'alarmsSummary'});

    $scope.getName = function(type){
        if(type=='cpu'){
            return 'CPU告警'
        }
        if(type=='memory'){
            return '内存告警'
        }
        if(type=='disk'){
            return '磁盘告警'
        }
    }

    $scope.buildColumn = function(datas){
        var DCs = [];
        var _x86 = [];
        var _x86vms = [];
        var _minis = [];
        var _minivms = [];
        var _resouces = [];
        var _usedResouces = [];
        var X86count = [];
        var Miniscount = [];
        var Vmscount = [];
        var Rescount = [];
        for(var i=0;i<datas.length;i++){
            DCs.push(datas[i].datacenterName);
            _x86.push(parseInt(datas[i].X86Num));
            _x86vms.push(parseInt(datas[i].X86VmNum));
            _minis.push(parseInt(datas[i].miniNum));
            _minivms.push(parseInt(datas[i].miniVmNum));
            _resouces.push(parseInt(datas[i].volumeNum));
            _usedResouces.push(parseInt(datas[i].usedvolumeNum));
            X86count.push({
                color:i==0||i==3||i==6 ? "#39bee9" : i==1||i==4||i==7 ? "#fbb254" : "#38a385",
                y:parseInt(datas[i].X86Num)
            });
            Miniscount.push({
                color:i==0||i==3||i==6 ? "#39bee9" : i==1||i==4||i==7 ? "#fbb254" : "#38a385",
                y:parseInt(datas[i].miniNum)
            });
            Vmscount.push({
                color:i==0||i==3||i==6 ? "#39bee9" : i==1||i==4||i==7 ? "#fbb254" : "#38a385",
                y:parseInt(datas[i].allVmNum)
            });
            Rescount.push({
                color:i==0||i==3||i==6 ? "#39bee9" : i==1||i==4||i==7 ? "#fbb254" : "#38a385",
                y:parseInt(datas[i].volumeNum)
            });
        }

    	$scope.rescount1 = {
            chart: {
                type: 'column',
                backgroundColor:null
            },
            title: {
                text: ''
            },
            colors:["#fbb254","#39a385"],
            xAxis: {
                categories: DCs,
                labels:{
                    style:{
                        color: '#fff'
                    }
                }
            },
            yAxis: {
                min: 0,
                title: {
                    enabled:false
                },
                labels:{
                    style:{
                        color: '#fff'
                    },
                    format:'{value} 台'
                },
                allowDecimals:false
            },
            legend:{
            	enabled:true,
            	align:"right",
            	verticalAlign:"top",
            	labelFormat:'<span style="color:#fff;font-weight:300">{name}</span>'
            },
            credits:{
            	enabled:false
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y}</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            series: [{
                name: 'X86数量',
                data: _x86

            }, {
                name: '虚拟机数量',
                data: _x86vms

            }]
        }

        $scope.rescount2 = {
            chart: {
                type: 'column',
                backgroundColor:null
            },
            title: {
                text: ''
            },
            colors:["#fbb254","#39a385"],
            xAxis: {
                categories: DCs,
                labels:{
                    style:{
                        color: '#fff'
                    }
                }
            },
            yAxis: {
                min: 0,
                title: {
                    enabled:false
                },
                labels:{
                    style:{
                        color: '#fff'
                    },
                    format:'{value} 台'
                },
                allowDecimals:false
            },
            legend:{
            	enabled:true,
            	align:"right",
            	verticalAlign:"top",
            	labelFormat:'<span style="color:#fff;font-weight:300">{name}</span>'
            },
            credits:{
            	enabled:false
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y}</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            series: [{
                name: '小型机',
                data: _minis

            }, {
                name: '虚拟机数量',
                data: _minivms

            }]
        }

        $scope.rescount3 = {
            chart: {
                type: 'column',
                backgroundColor:null
            },
            title: {
                text: ''
            },
            colors:["#fbb254","#39a385"],
            xAxis: {
                categories: DCs,
                labels:{
                    style:{
                        color: '#fff'
                    }
                }
            },
            yAxis: {
                min: 0,
                title: {
                    enabled:false
                },
                labels:{
                    style:{
                        color: '#fff'
                    },
                    format:'{value} G'
                },
                allowDecimals:false
            },
            legend:{
            	enabled:true,
            	align:"right",
            	verticalAlign:"top",
            	labelFormat:'<span style="color:#fff;font-weight:300">{name}</span>'
            },
            credits:{
            	enabled:false
            },
            tooltip: {
                headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                    '<td style="padding:0"><b>{point.y}</b></td></tr>',
                footerFormat: '</table>',
                shared: true,
                useHTML: true
            },
            series: [{
                name: '总存储',
                data: _resouces

            }, {
                name: '已使用',
                data: _usedResouces

            }]
        }

        $scope.contrast1 = {
            chart: {
                type: 'column',
                backgroundColor:null
            },
            title: {
                text: 'X86服务器统计',
                style:{
                    "fontSize": "14px",
                    'color':"#fff"
                }
            },
            xAxis: {
                categories: DCs,
                labels:{
                    style:{
                        color: '#fff'
                    }
                }
            },
            yAxis: {
                min: 0,
                title: {
                    enabled:false
                },
                labels:{
                    style:{
                        color: '#fff'
                    },
                    format:'{value} 台'
                },
                allowDecimals:false
            },
            legend:{
            	enabled:false
            },
            credits:{
            	enabled:false
            },
            tooltip: {
                pointFormat: '<span style="font-size:10px">{point.key}{point.y}</span>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
            	column: {
            		pointWidth:20
            	}
            },
            series: [{
                data: X86count
            }]
        }

        $scope.contrast2 = {
            chart: {
                type: 'column',
                backgroundColor:null
            },
            title: {
                text: '小型机统计',
                style:{
                    "fontSize": "14px",
                    'color':"#fff"
                }
            },
            xAxis: {
                categories: DCs,
                labels:{
                    style:{
                        color: '#fff'
                    }
                }
            },
            yAxis: {
                min: 0,
                title: {
                    enabled:false
                },
                labels:{
                    style:{
                        color: '#fff'
                    },
                    format:'{value} 台'
                },
                allowDecimals:false
            },
            legend:{
            	enabled:false
            },
            credits:{
            	enabled:false
            },
            tooltip: {
                pointFormat: '<span style="font-size:10px">{point.key}{point.y}</span>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
            	column: {
            		pointWidth:20
            	}
            },
            series: [{
                data: Miniscount
            }]
        }

        $scope.contrast3 = {
            chart: {
                type: 'column',
                backgroundColor:null
            },
            title: {
                text: '虚拟机统计',
                style:{
                    "fontSize": "14px",
                    'color':"#fff"
                }
            },
            xAxis: {
                categories: DCs,
                labels:{
                    style:{
                        color: '#fff'
                    }
                }
            },
            yAxis: {
                min: 0,
                title: {
                    enabled:false
                },
                labels:{
                    style:{
                        color: '#fff'
                    },
                    format:'{value} 台'
                },
                allowDecimals:false
            },
            legend:{
            	enabled:false
            },
            credits:{
            	enabled:false
            },
            tooltip: {
                pointFormat: '<span style="font-size:10px">{point.key}{point.y}</span>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
            	column: {
            		pointWidth:20
            	}
            },
            series: [{
                data: Vmscount
            }]
        }

        $scope.contrast4 = {
            chart: {
                type: 'column',
                backgroundColor:null
            },
            title: {
                text: '总存储统计',
                style:{
                    "fontSize": "14px",
                    'color':"#fff"
                }
            },
            xAxis: {
                categories: DCs,
                labels:{
                    style:{
                        color: '#fff'
                    }
                }
            },
            yAxis: {
                min: 0,
                title: {
                    enabled:false
                },
                labels:{
                    style:{
                        color: '#fff'
                    },
                    format:'{value} G'
                },
                allowDecimals:false
            },
            legend:{
            	enabled:false
            },
            credits:{
            	enabled:false
            },
            tooltip: {
                pointFormat: '<span style="font-size:10px">{point.key}{point.y}</span>',
                shared: true,
                useHTML: true
            },
            plotOptions: {
            	column: {
            		pointWidth:20
            	}
            },
            series: [{
                data: Rescount
            }]
        }
    }

    $scope.buildPie = function(datas){
        $scope.quota1 = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                backgroundColor:null
            },
            title: {
                text: 'CPU',
                align:'left',
                style:{
                    color:'#fff'
                }
            },
            colors:["#39bee9","#fbb254"],
            credits:{
            	enabled:false
            },
            tooltip: {
        	    pointFormat: '{point.y}个</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: false,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            legend:{
            	enabled:true,
            	align:"right",
            	verticalAlign:"top",
            	layout:"horizontal",
            	floating:true,
            	labelFormat:'<span style="font-weight:300;color:#fff">{name}</span>'

            },
            series: [{
                type: 'pie',
                data: [
                    ['未使用',  datas.cpuTotal-datas.cpuUsed],
                    ['已使用',  datas.cpuUsed]
                ]
            }]
        }

        $scope.quota2 = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                backgroundColor:null
            },
            title: {
                text: '内存',
                align:'left',
                style:{
                    color:'#fff'
                }
            },
            colors:["#39bee9","#fbb254"],
            credits:{
            	enabled:false
            },
            tooltip: {
        	    pointFormat: '{point.y}G</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: false,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            legend:{
                enabled:true,
                align:"right",
                verticalAlign:"top",
                layout:"horizontal",
                floating:true,
                labelFormat:'<span style="font-weight:300;color:#fff">{name}</span>'

            },
            series: [{
                type: 'pie',
                data: [
                    ['未使用',  datas.memoryTotal-datas.memoryUsed],
                    ['已使用',  datas.memoryUsed]
                ]
            }]
        }

        $scope.quota3 = {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                backgroundColor:null
            },
            title: {
                text: '存储',
                align:'left',
                style:{
                    color:'#fff'
                }
            },
            colors:["#39bee9","#fbb254"],
            credits:{
            	enabled:false
            },
            tooltip: {
        	    pointFormat: '{point.y}G</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: false,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: false
                    },
                    showInLegend: true
                }
            },
            legend:{
                enabled:true,
                align:"right",
                verticalAlign:"top",
                layout:"horizontal",
                floating:true,
                labelFormat:'<span style="font-weight:300;color:#fff">{name}</span>'

            },
            series: [{
                type: 'pie',
                data: [
                    ['未使用',  datas.storageTotal-datas.storageUsed],
                    ['已使用',  datas.storageUsed]
                ]
            }]
        }
    }
})
