angular.module('app')

.controller("overviewCtrl",function($scope, SettingIndexConfigs, OverviewRoomStatics, OverviewDcStatics, OverviewAlarmsStatics, AssetsManegeDevices){
    var srcs = ['modules/overview/index_tag1.html','modules/overview/index_tag2.html','modules/overview/index_tag3.html','modules/overview/index_tag4.html','modules/overview/index_tag5.html']
    SettingIndexConfigs.get(function(datas){
        var order = [1,2,3,4,5];
        for(var i=0;i<6;i++){
            if(datas.data[i].order==1) order[0] = i+1;
            if(datas.data[i].order==2) order[1] = i+1;
            if(datas.data[i].order==3) order[2] = i+1;
            if(datas.data[i].order==4) order[3] = i+1;
            if(datas.data[i].order==5) order[4] = i+1;
            if(datas.data[i].order==6) {
                console.log(datas.data[i].isShow)
                $scope.showAlarms = datas.data[i].isShow=='Y' ? true : false;
            }
            if(datas.data[i].content){
                $scope.contents = eval('(' + datas.data[i].content + ')');
            }
        }
        $scope.orders = order;
        $scope.settings = datas;

        $scope.baseInfo = OverviewRoomStatics.get({type:'resourcesCount'});
        $scope.DcInfo = OverviewDcStatics.get({type:'resourcesCount'});
        $scope.datacenters = OverviewDcStatics.get({type:'details'});
        OverviewDcStatics.query({type:'compare'},function(res1){
            $scope.buildColumn(res1.data);
        });
        OverviewDcStatics.query({type:'quotas'},function(res2){
            $scope.buildPie(res2);
        });
        $scope.alarms = OverviewAlarmsStatics.query({type:'alarmsSummary'});
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
                type: 'column'
            },
            title: {
                text: ''
            },
            colors:["#fbb254","#39bee9"],
            xAxis: {
                categories: DCs
            },
            yAxis: {
                min: 0,
                title: {
                    enabled:false
                },
                labels:{
                    format:'{value} 台'
                },
                allowDecimals:false
            },
            legend:{
                enabled:true,
                align:"right",
                verticalAlign:"top",
                labelFormat:'<span style="font-weight:300">{name}</span>'
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
                type: 'column'
            },
            title: {
                text: ''
            },
            colors:["#38a385","#39bee9"],
            xAxis: {
                categories: DCs
            },
            yAxis: {
                min: 0,
                title: {
                    enabled:false
                },
                labels:{
                    format:'{value} 台'
                },
                allowDecimals:false
            },
            legend:{
                enabled:true,
                align:"right",
                verticalAlign:"top",
                labelFormat:'<span style="font-weight:300">{name}</span>'
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
                type: 'column'
            },
            title: {
                text: ''
            },
            colors:["#6fd5fd","#212d47"],
            xAxis: {
                categories: DCs
            },
            yAxis: {
                min: 0,
                title: {
                    enabled:false
                },
                labels:{
                    format:'{value} G'
                }
            },
            legend:{
                enabled:true,
                align:"right",
                verticalAlign:"top",
                labelFormat:'<span style="font-weight:300">{name}</span>'
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
                type: 'column'
            },
            title: {
                text: 'X86服务器统计',
                style:{"fontSize": "14px" }
            },
            xAxis: {
                categories: DCs
            },
            yAxis: {
                min: 0,
                title: {
                    enabled:false
                },
                labels:{
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
                type: 'column'
            },
            title: {
                text: '小型机统计',
                style:{"fontSize": "14px" }
            },
            xAxis: {
                categories: DCs
            },
            yAxis: {
                min: 0,
                title: {
                    enabled:false
                },
                labels:{
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
                type: 'column'
            },
            title: {
                text: '虚拟机统计',
                style:{"fontSize": "14px" }
            },
            xAxis: {
                categories: DCs
            },
            yAxis: {
                min: 0,
                title: {
                    enabled:false
                },
                labels:{
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
                type: 'column'
            },
            title: {
                text: '总存储统计',
                style:{"fontSize": "14px" }
            },
            xAxis: {
                categories: DCs
            },
            yAxis: {
                min: 0,
                title: {
                    enabled:false
                },
                labels:{
                    format:'{value} G'
                }
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
                text: 'CPU(总量'+datas.cpuTotal+'个)'
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
                align:"left",
                verticalAlign:"bottom",
                layout:"vertical",
                floating:true,
                labelFormat:'<span style="font-weight:300">{name}</span>'

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
                text: '内存(总量'+datas.memoryTotal+'G)'
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
                align:"left",
                verticalAlign:"bottom",
                layout:"vertical",
                floating:true,
                labelFormat:'<span style="font-weight:300">{name}</span>'

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
                text: '存储(总量'+datas.storageTotal+'G)'
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
                align:"left",
                verticalAlign:"bottom",
                layout:"vertical",
                floating:true,
                labelFormat:'<span style="font-weight:300">{name}</span>'

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
.controller("overviewShowCtrl",function($scope, $timeout, $interval, fileUrl, SettingProfileConfigs, SettingProfileDetailList){
    $scope.fileUrl = fileUrl;
    function getConfig1(id){
        SettingProfileDetailList.get({id:id},function(res){
            var newDate = [];
            $.each(res.data,function(index,val){
                if(val.isShow == 'Y'){
                    newDate.push(res.data[index]);
                }
            });
            $scope.settings1 = newDate;
        });
    }
    function getConfig2(id){
        SettingProfileDetailList.get({id:id},function(res){
            var newDate = [];
            $.each(res.data,function(index,val){
                if(val.isShow == 'Y'){
                    newDate.push(res.data[index]);
                }
            });
            $scope.settings2 = newDate;
        });
    }
    function getConfig3(id){
        SettingProfileDetailList.get({id:id},function(res){
            var newDate = [];
            $.each(res.data,function(index,val){
                if(val.isShow == 'Y'){
                    newDate.push(res.data[index]);
                }
            });
            $scope.settings3 = newDate;
        });
    }
    SettingProfileConfigs.get(function(res){
        var orders=[];
        for(var i=0;i<res.data.length;i++){
            if(res.data[i].name=="业务流程"){
                getConfig1(res.data[i].id);
                $scope.show1 = res.data[i].viewable=='Y' ? true : false;
                $scope.order1 = res.data[i].order;
                if($scope.show1) orders.push(parseInt(res.data[i].order));
            }
            if(res.data[i].name=="业务展示"){
                getConfig2(res.data[i].id);
                $scope.show2 = res.data[i].viewable=='Y' ? true : false;
                $scope.order2 = res.data[i].order;
                if($scope.show2) orders.push(parseInt(res.data[i].order));
            }
            if(res.data[i].name=="整体概况简介"){
                getConfig3(res.data[i].id);
                $scope.show3 = res.data[i].viewable=='Y' ? true : false;
                $scope.order3 = res.data[i].order;
                if($scope.show3) orders.push(parseInt(res.data[i].order));
            }
        }
        orders.sort();
        $scope.orders = orders;
        $scope.step=$scope.orders[0];
        $scope.dotimeout();
        console.log('业务流程：'+$scope.show1+' order:'+$scope.order1+'\n'+'业务展示：'+$scope.show2+' order:'+$scope.order2+'\n'+'概况简介：'+$scope.show3+' order:'+$scope.order3)
    })

    

    $scope.slideNum1 = 0;
    $scope.dointerval1 = function(){
        $interval.cancel($scope.mytime1);
        $scope.mytime1 = $interval(function(){
            if($scope.slideNum1 == $scope.settings3.length-1){
                $scope.slideNum1 = 0;
                $scope.dotimeout();
            }else{
                $scope.slideNum1 ++
            }
        },10000);
    }

    $scope.slideNum2 = 0;
    $scope.dointerval2 = function(){
        $interval.cancel($scope.mytime2);
        $scope.mytime2 = $interval(function(){
            if($scope.slideNum2 == $scope.settings2.length-1){
                $scope.slideNum2 = 0;
                $scope.dotimeout();
            }else{
                $scope.slideNum2 ++
            }
        },10000);
    }
    var step_i = -1;
    $scope.dotimeout = function(num){
        $interval.cancel($scope.mytime1);
        $interval.cancel($scope.mytime2);
        $scope.slideNum1 = 0;
        $scope.slideNum2 = 0;
        step_i = num ? num : step_i + 1;
        if(step_i>$scope.orders.length-1) step_i = 0;
        $scope.step = $scope.orders[step_i];
        if($scope.step==$scope.order1){
            $timeout(function(){
                 $scope.dotimeout();
            },10000)
        }
        if($scope.step==$scope.order3){
            $scope.dointerval1();
        }
        if($scope.step==$scope.order2){
            $scope.dointerval2();
        }
    }

    $scope.changeTab = function(order){
        $scope.dotimeout(order);
    }
    
    $scope.m_over = function(){
        $scope.isHover = true;
        $interval.cancel($scope.mytime1);
        $interval.cancel($scope.mytime2);
    }
    $scope.m_leave = function(num){
        $scope.isHover = false;
        if(num==2){
            $interval.cancel($scope.mytime2);
            $scope.dointerval2();
        }
        if(num==3){
            $interval.cancel($scope.mytime1);
            $scope.dointerval1();
        }
    }

})

