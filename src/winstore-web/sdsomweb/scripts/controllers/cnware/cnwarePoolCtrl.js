/***
 * zjt
 */
vsanApp.controller("cnwarePoolCtrl", ["$scope", "cnwareFactory",  "$filter",
    function ($scope, cnwareFactory,  $filter) {
"use strict";



    /**
    * 初始化函数
    */
    $scope.initPage = function () {

        $scope.initiatorShow = false;
        //初始显示存储池tab
        $scope.showTab = "pool";
        //初始化查询参数
        $scope.poolQueryParams = {
            pageno: 1,
            pagesize: 10
        };

        //初始化存储策略
        $scope.storagePolicy = {
            default: "replicated",
            replicated: {
                enable: 1,
                default: 1,
                options: [2],
            },
            erasure: {
                enable: 0,
                datablock: {
                    default: 2,
                    options: [2],
                },
                parityblock: {
                    default: 1,
                    options: [1],
                }
            }
        };


        //获取存储池列表
        $scope.getPoolList();

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
        //初始化信息提示
        var selectors = ["#poolModal input,select"]
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

        //阻止enter提交
        $("input[type='text']").keydown(function (event) {
            if(event.keyCode === 13) {
                event.preventDefault();
                event.returnValue = false;
                return;
            }
        });
    };


    /******************************公共函数********************************************/




    /**
        * 轮换显示标签
        */
    $scope.showPoolTab = function () {
        $scope.showTab = "pool";
        $scope.getPoolList();
    };
    $scope.showLunTab = function () {
        $scope.showTab = "lun";
        $scope.getLunList();
    };
    $scope.showViewTab = function () {
        $scope.showTab = "view";
        $scope.tabChange();
    };

    /**
        * tab切换时清除函数
        */
    $scope.tabChange = function () {
        $scope.hideChartDiv();
        $scope.hideSnapTable();
        $scope.hideAclSet();
    };
    $scope.hideAclSet = function () {
        $("initiatorTabDiv").hide();
        $("#ShowInitiatorTr").remove();
        $scope.initiatorShow = false;
    };
    $scope.hideChartDiv = function() {
        $("#chartDiv").hide();
        $(".rrr").remove();
        $(".lrrr").remove();
    };
    $scope.hideSnapTable = function() {
        $("#snapTableDiv").hide();
        $('#ShowSnapshotTr').remove();
        $scope.snapshotShow = false;
    };

    /**
        * 增加选中样式
        */
    $scope.checkedOrNot = function (isOrNot) {
        if (isOrNot) {
            return "url('/winstore/images/storage/btn_fuxuan_select.png') no-repeat left 55%";
        } else {
            return "url('/winstore/images/storage/btn_fuxuan_default.png') no-repeat left 55%";
        }
    };
    /******************************公共函数完********************************************/

    /******************************存储池增删改查****************************************/
    //将系统容量全部给当前存储池
    $scope.givePoolAllCapacity = function () {
        $scope.apoolRadios = !$scope.apoolRadios;
    };

    //显示高级选项
    $scope.showRepSelect = function () {
        $scope.apoolCheck = !$scope.apoolCheck;
    };

    /**
    * 查询存储池列表
    */
    $scope.getPoolList = function () {
        //清除详情
        $scope.tabChange();
        //查询列表
        NProgress.start();
        cnwareFactory.queryCNwarePool($scope.poolQueryParams, function (response) {
            if (response.success) {
                //alert(JSON.stringify(response.data[0]));
                $scope.poolList = response.data[0];
                $scope.hideAclSet();
            }
            NProgress.done();
        });
    };


    /******************************存储池增删改查完****************************************/

    /******************************存储池授权控制****************************************/

    /******************************存储池授权控制结束****************************************/

    /******************************LUN增删改查****************************************/

    /**
    * 查询存储池列表
    */


    /******************************LUN增删改查完****************************************/

    /*********************************详情图形展示*******************************************/
    $(window).resize(function () {
        if ($scope.poolOrLun && $scope.poolTrIdTemp && $("#chartDiv").is(":visible")) {
            $scope.dblClick($scope.poolTrIdTemp, $scope.poolOrLun);
            $scope.dblClick($scope.poolTrIdTemp, $scope.poolOrLun);
        }
    });
    /**
    * 双击显示详情
    */
    $scope.dblClick = function (id, pool) {
        $scope.hideAclSet();
        var _this = $("#poolTr"+id);
        $(".fa-caret-up",_this.parents('table')).removeClass("fa-caret-up");
        if ($scope.poolTrIdTemp) {
            var _that = $(".rrr");
            if ($scope.poolTrIdTemp == id && _that.length > 0) {
                $("#chartDiv").hide();
                _that.remove();
                return;
            }
            _that.remove();
        }
        $(".fa-caret",_this).addClass('fa-caret-up');
        var content = "<tr class=rrr><td colspan=9 class='subtdbg' style='height:370px;'></td></tr>";
        _this.after(content);
        $("#chartDiv").show().css({left: _this.offset().left, top: _this.offset().top + 37, width: _this.width()});
        $scope.poolOrLun = pool;
        $scope.poolTrIdTemp = id;
        $("#chartDiv").height(370);
        setTimeout($scope.canvas, 10);
    };


    /**
        * 绘制详情图
        */
    $scope.canvas = function () {
        //集群IOPS
        $scope.iopsChart = echarts.init(document.getElementById("iops"));
        //集群宽度
        $scope.mbpsChart = echarts.init(document.getElementById("mbps"));
        //时延
        //if (!$scope.capacityChart) $scope.capacityChart = echarts.init(document.getElementById("capacity"));
        //图形请求参数
        var queryParmas;
        if ($scope.poolOrLun.lunId) {
            queryParmas = {
            "lunId": $scope.poolOrLun.lunId,
            "from": "-1w",
            "target": "iops.rw mbps.rw capacity.rw"
            }
            cnwareFactory.lunPref(queryParmas, function (response) {
                if (response.success) {
                    var time = [];
                    var iops = [];
                    var mbps = [];
                    var capacity = [];
                    var datas = response.data.datapoints;
                    var maxIops = 0, maxMbps = 0;
                    for (var i = 0; i < datas.length; i++) {
                        time.push($filter("date")(1000*datas[i][0], "MM-dd"));
                        iops.push(datas[i][1]);
                        mbps.push(parseFloat((datas[i][2] / 1024).toFixed(2)));
                        capacity.push((datas[i][3]/ (1024 * 1024 * 1024)).toFixed(2));
                        if (datas[i][1] > maxIops) maxIops = datas[i][1];
                        if (datas[i][2] > maxMbps) maxMbps = datas[i][2];
                    }
                    var interval = Math.round(datas.length / 16);
                    maxMbps = parseInt((maxMbps/1024)) + 1;
                    $scope.iopsChart.setOption(iopsOption(time, iops, interval, maxIops), true);
                    $scope.mbpsChart.setOption(mbpsOption(time, mbps, interval, maxMbps), true);
                    //$scope.capacityChart.setOption(capacityOption(time,capacity,maxCapacity,interval), true);
                }
            });
        } else {
            queryParmas = {
            "poolId": $scope.poolOrLun.poolId,
            "from": "-1w",
            "target": "iops.rw mbps.rw capacity.rw"
            }
            cnwareFactory.poolPref(queryParmas, function (response) {
                if (response.success) {
                    var time = [];
                    var iops = [];
                    var mbps = [];
                    var capacity = [];
                    var datas = response.data.datapoints;
                    var maxIops = 0, maxMbps = 0;
                    for (var i = 0; i < datas.length; i++) {
                        time.push($filter("date")(1000*datas[i][0], "MM-dd"));
                        iops.push(datas[i][1]);
                        mbps.push(parseFloat((datas[i][2]/1024).toFixed(2)));
                        capacity.push((datas[i][3]/1073741824).toFixed(2));
                        if (datas[i][1] > maxIops) maxIops = datas[i][1];
                        if (datas[i][2] > maxMbps) maxMbps = datas[i][2];
                    }
                    var interval = Math.round(datas.length / 8);
                    maxMbps = parseInt((maxMbps/1024)) + 1;
                    $scope.iopsChart.setOption(iopsOption(time, iops, interval, maxIops), true);
                    $scope.mbpsChart.setOption(mbpsOption(time, mbps, interval, maxMbps), true);
                    //$scope.capacityChart.setOption(capacityOption(time,capacity,maxCapacity,interval), true);
                }
            });
        }
    };

    //绘制使用空间图
    var fSummaryOption = function(usedSpace,freeSpace){
        return {
            calculable : false,
            series : [
                {
                    name:'存储资源',
                    type:'pie',
                    center:['50%','50%'],
                    radius : ['60%', '80%'],
                    itemStyle : {
                        normal : {
                            label : {
                                show : false,
                                formatter : function (a,b,c){
                                    return 100 - c + '%'
                            },
                                textStyle: {
                                    baseline : 'top'
                                }
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
                                    fontSize : '20',
                                    fontWeight : 'bold'
                                }
                            }
                        }
                    },
                    data:[
                        {
                            name: "使用空间",
                                value:usedSpace,
                                itemStyle:{
                                    normal:{
                                        color:'#488FD2',
                                    }
                                }
                        },{
                            name: "剩余空间",
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
    }

    //集群iops
    var iopsOption = function(times,values,interval,max){
        return {
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
                    data : times
                }
            ],
            yAxis : [
                {
                    name:'IOPS',
                    type : 'value',
                    precision : 2,
                    max:max || 200,
                    min:0,
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
                    data:values,
                    smooth:true,
                    symbol:'none',
                    itemStyle: {
                        normal: {
                            color:'#458ed3',
                            lineStyle: {
                                type: 'solid',
                                width: 0.9,
                            },
                            areaStyle: {color:'#d2e1f0',type: 'default'},
                        }
                    }
                }
            ]
        };
    }

    //集群io宽带
    var mbpsOption = function(times,values,interval,max){
        return {
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
                    data :times
                }
            ],
            yAxis : [
                {
                    name:'MBps',
                    type : 'value',
                    precision : 2,
                    boundaryGap : [0, 0],
                    max:max || 100,
                    min:0,
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
                    data:values,
                    smooth:true,
                    symbol:'none',
                    itemStyle: {
                        normal: {
                            color:'#458ed3',
                            lineStyle: {
                                type: 'solid',
                                width: 0.9,
                            },
                            areaStyle: {color:'#d4ecef',type: 'default'},
                        }
                    }
                }
            ]
        };
    }

    //容量
    var capacityOption = function(times,values,max,interval){
        return {
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
                        interval: interval || 3, //坐标轴显示全部
                        rotate: 0, //坐标轴顺时针45°显示
                        textStyle: {
                            color: '#728092',
                            fontSize:10
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    data :times
                }
            ],
            yAxis : [
                {
                    name:'TB',
                    type : 'value',
                    precision : 2,
                    max:max || 100,
                    min:0,
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
    }
    /*********************************详情图形展示完*******************************************/

    /*******************************主机映射图********************************************/
//bootstrap2 popover控制方法

/****************************主机映射完************************************************************/
}]);
