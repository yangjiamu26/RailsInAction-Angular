angular.module('app')

.controller('monitorTreeCtrl', function($scope, $state, $rootScope, $timeout, MonitorBusinessTree) {
  function addSkin(node, isFirst, callback){
    node.iconSkin = "monitor-tree-skin"+node.proType;
    node.title = node.label;
    if(node.children){
        for(var i=0; i<node.children.length; i++){ 
          addSkin(node.children[i], false, null)
        }  
    }
    if(isFirst){
        callback(node);
    }
  }
  MonitorBusinessTree.get(function(data){
    addSkin(data, true, function(node){
        $scope.assetsTree = [node];
        $scope.my_tree=tree={};
        $scope.showtree = true;
        $timeout(function(){
            $rootScope.selectTreeNode = function(params){
                if(!$scope.showtree) return;
                if($state.includes("app.resourcemonitor.business.statics")){
                  $scope.my_tree.select_branch_by_id("busdomain");
                }else if(params.vmId){
                  $scope.my_tree.select_branch_by_id("v"+params.vmId);
                }else if(params.systemId){
                  $scope.my_tree.select_branch_by_id("p"+params.systemId);
                }else if(params.domainId){
                  $scope.my_tree.select_branch_by_id("b"+params.domainId);
                }
              }
              $rootScope.selectTreeNode($state.params);
        })
    })
  });

  function getObjectInTree(tree, id){
    if(tree.id && tree.id == id){ 
      return tree;
    }
    var result = null;
    if(tree.children){
        for(var i=0; i<tree.children.length; i++){ 
          result = getObjectInTree(tree.children[i],id);
          if(result!=null){ 
            break;
          }
        }  
    }
    return result;
  }

  $scope.inited = false;
  $scope.my_tree_handler = function(branch) {
    if(!$scope.inited) {
      $scope.inited = true;
      return;
    }
    switch(branch.proType){
        case "1":
          if(branch.level==1){
            $state.go("app.resourcemonitor.business.statics");
          }else{
            $state.go("app.resourcemonitor.business.domains.statics",{domainId:branch.id.substr(1)});
          } 
          break;
        case "2":
          var parent = $scope.my_tree.get_parent_branch(branch);
          $state.go("app.resourcemonitor.business.domains.systems.page.statics",{domainId:parent.id.substr(1),systemId:branch.id.substr(1)});
          break;
        case "3":
          var parent = $scope.my_tree.get_parent_branch(branch);
          var grandpa = $scope.my_tree.get_parent_branch(parent);
          $state.go("app.resourcemonitor.business.domains.systems.vms.statics",{domainId:grandpa.id.substr(1),systemId:parent.id.substr(1),vmId:branch.id.substr(1),dcId:branch.dcId});
          break;
        default:
          break;
    }
  };
})
.controller('monitorDomainCtrl', function($scope, $state, $rootScope, MonitorDomainStatics, MonitorDomainInfo) {
    if($rootScope.selectTreeNode) $rootScope.selectTreeNode($state.params);
  $scope.getNum = function(used,total){
    return (used/total*100).toFixed(2);
  }
  $scope.buildCharts = function(chartsData, intervalNum){
    $scope.domainTrend1 = {
        title: {
            text: '存储资源趋势图',
            align: 'left'
        },
        xAxis: {
            categories: chartsData.datetime.titles,
            tickInterval:intervalNum
        },
        yAxis: {
            title: {
                text: 'G'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: 'G'
        },
        credits:{
          enabled:false
        },
        legend: {
            align: 'right',
            verticalAlign: 'top',
            borderWidth: 0
        },
        series: [{
            name: '总配额',
            data: chartsData.disk.totalYaxisValue
        }, {
            name: '已用配额',
            data: chartsData.disk.usedYaxisValue
        }]
    }
    $scope.domainTrend2 = {
        title: {
            text: '内存资源趋势图',
            align: 'left'
        },
        xAxis: {
            categories: chartsData.datetime.titles,
            tickInterval:intervalNum
        },
        yAxis: {
            title: {
                text: 'G'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: 'G'
        },
        credits:{
          enabled:false
        },
        legend: {
            align: 'right',
            verticalAlign: 'top',
            borderWidth: 0
        },
        series: [{
            name: '总配额',
            data: chartsData.memory.totalYaxisValue
        }, {
            name: '已用配额',
            data: chartsData.memory.usedYaxisValue
        }]
    }
    $scope.domainTrend3 = {
        title: {
            text: 'CPU资源趋势图',
            align: 'left'
        },
        xAxis: {
            categories: chartsData.datetime.titles,
            tickInterval:intervalNum
        },
        yAxis: {
            title: {
                text: '个'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '个'
        },
        credits:{
          enabled:false
        },
        legend: {
            align: 'right',
            verticalAlign: 'top',
            borderWidth: 0
        },
        series: [{
            name: '总配额',
            data: chartsData.cpu.totalYaxisValue
        }, {
            name: '已用配额',
            data: chartsData.cpu.usedYaxisValue
        }]
    }
  }
  function getdomainData(timeType){
    if($state.params.domainId){
      $scope.notRootNode = true;
      MonitorDomainInfo.get({id:$state.params.domainId},function(res){
        $scope.domainInfo = res;
        MonitorDomainStatics.get({id:$state.params.domainId,name:res.name,dateType:timeType},function(val){
          $scope.chartsData = val;
          var intervalNum = timeType=='month' ? 2 : 1;
          $scope.buildCharts(val, intervalNum);
          $scope.searching = false;
        },function(){
          $scope.searching = false;
        })
      })
    }else{
      MonitorDomainStatics.get({id:0,name:'根业务域',dateType:timeType},function(val){
        $scope.chartsData = val;
        var intervalNum = timeType=='month' ? 2 : 1;
        $scope.buildCharts(val, intervalNum);
        $scope.searching = false;
      },function(){
        $scope.searching = false;
      })
    }
  }
  getdomainData('week');
  $scope.changeTimeType = function(){
    $scope.searching = true;
    getdomainData($scope.timeType);
  }

  $scope.calcued = function(val1,val2){
    return val2==0 ? 0 : parseInt(val1/val2*100);
  }
  
})
.controller('monitorSystemPageCtrl', function($scope, $state, $rootScope, MonitorProjectsInfo) {
    if($rootScope.selectTreeNode) $rootScope.selectTreeNode($state.params);
  MonitorProjectsInfo.get({id:$state.params.systemId},function(res){
    res.ipPoolName = res.ipPoolName.split('\,');
    $scope.systemInfo = res;
  })
})
.controller('monitorSystemTrendCtrl', function($scope, $state, $rootScope, MonitorProjectsStatics, MonitorProjectsInfo) {
  $scope.buildCharts = function(chartsData, intervalNum){
    $scope.systemTrend1 = {
        title: {
            text: '存储资源趋势图',
            align: 'left'
        },
        xAxis: {
            categories: chartsData.datetime.titles,
            tickInterval:intervalNum
        },
        yAxis: {
            title: {
                text: 'G'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: 'G'
        },
        credits:{
          enabled:false
        },
        legend: {
            align: 'right',
            verticalAlign: 'top',
            borderWidth: 0
        },
        series: [{
            name: '总配额',
            data: chartsData.disk.totalYaxisValue
        }, {
            name: '已用配额',
            data: chartsData.disk.usedYaxisValue
        }]
    }
    $scope.systemTrend2 = {
        title: {
            text: '内存资源趋势图',
            align: 'left'
        },
        xAxis: {
            categories: chartsData.datetime.titles,
            tickInterval:intervalNum
        },
        yAxis: {
            title: {
                text: 'G'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: 'G'
        },
        credits:{
          enabled:false
        },
        legend: {
            align: 'right',
            verticalAlign: 'top',
            borderWidth: 0
        },
        series: [{
            name: '总配额',
            data: chartsData.memory.totalYaxisValue
        }, {
            name: '已用配额',
            data: chartsData.memory.usedYaxisValue
        }]
    }
    $scope.systemTrend3 = {
        title: {
            text: 'CPU资源趋势图',
            align: 'left'
        },
        xAxis: {
            categories: chartsData.datetime.titles,
            tickInterval:intervalNum
        },
        yAxis: {
            title: {
                text: '个'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '个'
        },
        credits:{
          enabled:false
        },
        legend: {
            align: 'right',
            verticalAlign: 'top',
            borderWidth: 0
        },
        series: [{
            name: '总配额',
            data: chartsData.cpu.totalYaxisValue
        }, {
            name: '已用配额',
            data: chartsData.cpu.usedYaxisValue
        }]
    }
  }

  function getsystemData(timeType){
    MonitorProjectsInfo.get({id:$state.params.systemId},function(res){
      MonitorProjectsStatics.get({id:$state.params.systemId,name:res.name,dateType:timeType},function(val){
        $scope.chartsData = val;
        var intervalNum = timeType=='month' ? 2 : 1;
        $scope.buildCharts(val, intervalNum);
        $scope.searching = false;
      },function(){
        $scope.searching = false;
      })
    })
  }

  getsystemData('week');
  $scope.changeTimeType = function(){
    $scope.searching = true;
    getsystemData($scope.timeType);
  }
})
.controller('monitorSystemTopoCtrl', function($scope, $state, $rootScope, MonitorProjectsInfo, MonitorProjectsTopo) {
  MonitorProjectsInfo.get({id:$state.params.systemId},function(res){
    MonitorProjectsTopo.query({projectName:res.name},function(val){
      $scope.systemTopo = val;
      $scope.projectName = res.name;
    });
  })
})

.controller('monitorVmPageCtrl', function($scope, $state, $rootScope, MonitorVmsStatics, MonitorVmsInfo) {
    if($rootScope.selectTreeNode) $rootScope.selectTreeNode($state.params);

    MonitorVmsInfo.get({id:$state.params.vmId,dcId:$state.params.dcId},function(res){
      $scope.vmInfo = res;
    });
})
.controller('monitorVmTrendCtrl', function($scope, $state, $rootScope, MonitorVmsStatics, MonitorVmsInfo) {
  $scope.buildCharts = function(chartsData, intervalNum){
    $scope.vmTrend1 = {
        title: {
            text: '存储资源趋势图',
            align: 'left'
        },
        xAxis: {
            categories: chartsData.datetime.titles,
            tickInterval:intervalNum
        },
        yAxis: {
            title: {
                text: 'G'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: 'G'
        },
        credits:{
          enabled:false
        },
        legend: {
            align: 'right',
            verticalAlign: 'top',
            borderWidth: 0
        },
        series: [{
            name: '总配额',
            data: chartsData.disk.totalYaxisValue
        }, {
            name: '已用配额',
            data: chartsData.disk.usedYaxisValue
        }]
    }
    $scope.vmTrend2 = {
        title: {
            text: '内存资源趋势图',
            align: 'left'
        },
        xAxis: {
            categories: chartsData.datetime.titles,
            tickInterval:intervalNum
        },
        yAxis: {
            title: {
                text: 'G'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: 'G'
        },
        credits:{
          enabled:false
        },
        legend: {
            align: 'right',
            verticalAlign: 'top',
            borderWidth: 0
        },
        series: [{
            name: '总配额',
            data: chartsData.memory.totalYaxisValue
        }, {
            name: '已用配额',
            data: chartsData.memory.usedYaxisValue
        }]
    }
    $scope.vmTrend3 = {
        title: {
            text: 'CPU资源趋势图',
            align: 'left'
        },
        xAxis: {
            categories: chartsData.datetime.titles,
            tickInterval:intervalNum
        },
        yAxis: {
            title: {
                text: '个'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '个'
        },
        credits:{
          enabled:false
        },
        legend: {
            align: 'right',
            verticalAlign: 'top',
            borderWidth: 0
        },
        series: [{
            name: '总配额',
            data: chartsData.cpu.totalYaxisValue
        }, {
            name: '已用配额',
            data: chartsData.cpu.usedYaxisValue
        }]
    }
  }

  function getvmData(timeType){
      MonitorVmsStatics.get({uuid:$scope.originalId,dcId:$state.params.dcId,dateType:timeType},function(val){
        $scope.chartsData = val;
        var intervalNum = timeType=='month' ? 2 : 1;
        $scope.buildCharts(val, intervalNum);
        $scope.searching = false;
      },function(){
        $scope.searching = false;
      })
  }
  MonitorVmsInfo.get({id:$state.params.vmId,dcId:$state.params.dcId},function(res){
    $scope.originalId = res.originalId;
    getvmData('week');
  })

  $scope.changeTimeType = function(){
    $scope.searching = true;
    getvmData($scope.timeType);
  }
  
})
.controller('monitorVmMonitorCtrl', function($scope, $state, MonitorVmsInfo, MonitorVmBaseInfo, MonitorBusinessTree) {

  function buildpie1(usefull){
    $scope.vm_pie1 = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: ''
        },
        colors:['#39a385','#fbb254'],
        tooltip: {
          pointFormat: '<b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          enabled:false
        },
        credits:{
          enabled:false
        },
        series: [{
            type: 'pie',
            data: [
                ['可用', usefull],
                ['不可用', 100-usefull]
            ]
        }]
    }
  }

  function buildgauge1(total){
    if(total==null) total = 0;
    $scope.vm_gauge1 = {
        chart: {
            type: 'gauge',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false
        },
        title: {
            text: '单位(%)',
            floating:true,
            verticalAlign:'bottom',
            style:{
                fontSize:'14px'
            }
        },
          credits:{
            enabled:false
          },
        pane: {
            startAngle: -150,
            endAngle: 150,
            background: [{
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, '#FFF'],
                        [1, '#333']
                    ]
                },
                borderWidth: 0,
                outerRadius: '109%'
            }, {
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, '#333'],
                        [1, '#FFF']
                    ]
                },
                borderWidth: 1,
                outerRadius: '107%'
            }, {
                // default background
            }, {
                backgroundColor: '#DDD',
                borderWidth: 0,
                outerRadius: '105%',
                innerRadius: '103%'
            }]
        },
        yAxis: {
            min: 0,
            max: 100,
            minorTickInterval: 'auto',
            minorTickWidth: 1,
            minorTickLength: 10,
            minorTickPosition: 'inside',
            minorTickColor: '#666',
    
            tickPixelInterval: 30,
            tickWidth: 2,
            tickPosition: 'inside',
            tickLength: 10,
            tickColor: '#666',
            labels: {
                step: 2,
                rotation: 'auto'
            },
            plotBands: [{
                from: 0,
                to: 40,
                color: '#55BF3B' // green
            }, {
                from: 40,
                to: 70,
                color: '#DDDF0D' // yellow
            }, {
                from: 70,
                to: 100,
                color: '#DF5353' // red
            }]
        },
        series: [{
            name: '已用',
            data: [parseFloat(total)],
            tooltip: {
                valueSuffix: '%'
            }
        }]
    }
    $scope.gauge1_func = function (chart) {
      
    }
  }

  function buildgauge2(total){
    if(total==null) total = 0;
    $scope.vm_gauge2 = {
        chart: {
            type: 'gauge',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false
        },
        title: {
            text: '单位(%)',
            floating:true,
            verticalAlign:'bottom',
            style:{
                fontSize:'14px'
            }
        },
          credits:{
            enabled:false
          },
        pane: {
            startAngle: -150,
            endAngle: 150,
            background: [{
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, '#FFF'],
                        [1, '#333']
                    ]
                },
                borderWidth: 0,
                outerRadius: '109%'
            }, {
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, '#333'],
                        [1, '#FFF']
                    ]
                },
                borderWidth: 1,
                outerRadius: '107%'
            }, {
                // default background
            }, {
                backgroundColor: '#DDD',
                borderWidth: 0,
                outerRadius: '105%',
                innerRadius: '103%'
            }]
        },
        yAxis: {
            min: 0,
            max: 100,
            minorTickInterval: 'auto',
            minorTickWidth: 1,
            minorTickLength: 10,
            minorTickPosition: 'inside',
            minorTickColor: '#666',
    
            tickPixelInterval: 30,
            tickWidth: 2,
            tickPosition: 'inside',
            tickLength: 10,
            tickColor: '#666',
            labels: {
                step: 2,
                rotation: 'auto'
            },
            plotBands: [{
                from: 0,
                to: 40,
                color: '#55BF3B' // green
            }, {
                from: 40,
                to: 70,
                color: '#DDDF0D' // yellow
            }, {
                from: 70,
                to: 100,
                color: '#DF5353' // red
            }]
        },
        series: [{
            name: '已用',
            data: [parseFloat(total)],
            tooltip: {
                valueSuffix: '%'
            }
        }]
    }
    $scope.gauge2_func = function (chart) {
      
    }
  }

  function buildgauge3(total){
    if(total==null) total = 0;
    $scope.vm_gauge3 = {
        chart: {
            type: 'gauge',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false
        },
        title: {
            text: '单位(%)',
            floating:true,
            verticalAlign:'bottom',
            style:{
                fontSize:'14px'
            }
        },
          credits:{
            enabled:false
          },
        pane: {
            startAngle: -150,
            endAngle: 150,
            background: [{
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, '#FFF'],
                        [1, '#333']
                    ]
                },
                borderWidth: 0,
                outerRadius: '109%'
            }, {
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, '#333'],
                        [1, '#FFF']
                    ]
                },
                borderWidth: 1,
                outerRadius: '107%'
            }, {
                // default background
            }, {
                backgroundColor: '#DDD',
                borderWidth: 0,
                outerRadius: '105%',
                innerRadius: '103%'
            }]
        },
        yAxis: {
            min: 0,
            max: 100,
            minorTickInterval: 'auto',
            minorTickWidth: 1,
            minorTickLength: 10,
            minorTickPosition: 'inside',
            minorTickColor: '#666',
    
            tickPixelInterval: 30,
            tickWidth: 2,
            tickPosition: 'inside',
            tickLength: 10,
            tickColor: '#666',
            labels: {
                step: 2,
                rotation: 'auto'
            },
            plotBands: [{
                from: 0,
                to: 40,
                color: '#55BF3B' // green
            }, {
                from: 40,
                to: 70,
                color: '#DDDF0D' // yellow
            }, {
                from: 70,
                to: 100,
                color: '#DF5353' // red
            }]
        },
        series: [{
            name: '已用',
            data: [parseFloat(total)],
            tooltip: {
                valueSuffix: '%'
            }
        }]
    }
    $scope.gauge3_func = function (chart) {
      
    }
  }

  function buildgauge4(total){
    if(total==null) total = 0;
    $scope.vm_gauge4 = {
        chart: {
            type: 'gauge',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false
        },
        title: {
            text: '单位(%)',
            floating:true,
            verticalAlign:'bottom',
            style:{
                fontSize:'14px'
            }
        },
          credits:{
            enabled:false
          },
        pane: {
            startAngle: -150,
            endAngle: 150,
            background: [{
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, '#FFF'],
                        [1, '#333']
                    ]
                },
                borderWidth: 0,
                outerRadius: '109%'
            }, {
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                    stops: [
                        [0, '#333'],
                        [1, '#FFF']
                    ]
                },
                borderWidth: 1,
                outerRadius: '107%'
            }, {
                // default background
            }, {
                backgroundColor: '#DDD',
                borderWidth: 0,
                outerRadius: '105%',
                innerRadius: '103%'
            }]
        },
        yAxis: {
            min: 0,
            max: 100,
            minorTickInterval: 'auto',
            minorTickWidth: 1,
            minorTickLength: 10,
            minorTickPosition: 'inside',
            minorTickColor: '#666',
    
            tickPixelInterval: 30,
            tickWidth: 2,
            tickPosition: 'inside',
            tickLength: 10,
            tickColor: '#666',
            labels: {
                step: 2,
                rotation: 'auto'
            },
            plotBands: [{
                from: 0,
                to: 40,
                color: '#55BF3B' // green
            }, {
                from: 40,
                to: 70,
                color: '#DDDF0D' // yellow
            }, {
                from: 70,
                to: 100,
                color: '#DF5353' // red
            }]        
        },
        series: [{
            name: '已用',
            data: [parseFloat(total)],
            tooltip: {
                valueSuffix: '%'
            }
        }]
    }
    $scope.gauge4_func = function (chart) {
      
    }
  }

  function buildArea1(chartsData){
    $scope.vm_area1 = {
        chart: {
            type: 'area'
        },
        title: {
            text: '',
            align: 'left'
        },
        xAxis: {
            categories: chartsData.datetime.titles
        },
        yAxis: {
            title: {
                text: 'CPU使用率(%)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '',
            shared: true
        },
        credits:{
          enabled:false
        },
        legend: {
            align: 'center',
            verticalAlign: 'bottom',
            borderWidth: 0
        },
        series: [{
            name: 'CPU使用率最大值(%)',
            data: chartsData.useRateMax.yaxisValue
        },{
            name: 'CPU使用率最小值(%)',
            data: chartsData.useRateMin.yaxisValue
        },{
            name: 'CPU使用率平均值(%)',
            data: chartsData.useRateAvg.yaxisValue
        }]
    }
  }
  function buildArea2(chartsData){
    $scope.vm_area2 = {
        chart: {
            type: 'area'
        },
        title: {
            text: '',
            align: 'left'
        },
        xAxis: {
            categories: chartsData.datetime.titles
        },
        yAxis: {
            title: {
                text: '物理内存使用率(%)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '',
            shared: true
        },
        credits:{
          enabled:false
        },
        legend: {
            align: 'center',
            verticalAlign: 'bottom',
            borderWidth: 0
        },
        series: [{
            name: '物理内存使用率最大值(%)',
            data: chartsData.useRateMax.yaxisValue
        },{
            name: '物理内存使用率最小值(%)',
            data: chartsData.useRateMin.yaxisValue
        },{
            name: '物理内存使用率平均值(%)',
            data: chartsData.useRateAvg.yaxisValue
        }]
    }
  }
  function buildArea3(chartsData){
    $scope.vm_area3 = {
        chart: {
            type: 'area'
        },
        title: {
            text: '',
            align: 'left'
        },
        xAxis: {
            categories: chartsData.datetime.titles
        },
        yAxis: {
            title: {
                text: '应用内存使用率(%)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '',
            shared: true
        },
        credits:{
          enabled:false
        },
        legend: {
            align: 'center',
            verticalAlign: 'bottom',
            borderWidth: 0
        },
        series: [{
            name: '应用内存使用率最大值(%)',
            data: chartsData.useRateMax.yaxisValue
        },{
            name: '应用内存使用率最小值(%)',
            data: chartsData.useRateMin.yaxisValue
        },{
            name: '应用内存使用率平均值(%)',
            data: chartsData.useRateAvg.yaxisValue
        }]
    }
  }
  function buildArea4(chartsData){
    $scope.vm_area4 = {
        chart: {
            type: 'area'
        },
        title: {
            text: '',
            align: 'left'
        },
        xAxis: {
            categories: chartsData.datetime.titles
        },
        yAxis: {
            title: {
                text: '吞吐量(KB/s)'
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '',
            shared: true
        },
        credits:{
          enabled:false
        },
        legend: {
            align: 'center',
            verticalAlign: 'bottom',
            borderWidth: 0
        },
        series: [{
            name: '网络接收速率(KB/s)',
            data: chartsData.netInRate.yaxisValue
        },{
            name: '网络发送速率(KB/s)',
            data: chartsData.netOutRate.yaxisValue
        }]
    }
  }
  $scope.changeCpuTimeType = function(originalId,timeType){
    $scope.searching = true;
    MonitorVmBaseInfo.get({id:originalId,originalId:originalId,dcId:$state.params.dcId,type:'cpuUsage',dateType:timeType},function(val){
      $scope.cpuUsage = val;
      buildArea1(val);
      $scope.searching = false;
    },function(){
      $scope.searching = false;
    })
  }

  $scope.changeMemoryTimeType = function(originalId,timeType){
    $scope.searching = true;
    MonitorVmBaseInfo.get({id:originalId,originalId:originalId,dcId:$state.params.dcId,type:'pmMemoryUsage',dateType:timeType},function(val){
      $scope.pmMemoryUsage = val;
      buildArea2(val);
      $scope.searching = false;
    },function(){
      $scope.searching = false;
    })
    MonitorVmBaseInfo.get({id:originalId,originalId:originalId,dcId:$state.params.dcId,type:'amMemoryUsage',dateType:timeType},function(val){
      $scope.amMemoryUsage = val;
      buildArea3(val);
      $scope.searching = false;
    },function(){
      $scope.searching = false;
    })
  }
  $scope.changeNetworkTimeType = function(originalId,timeType){
    $scope.searching = true;
    MonitorVmBaseInfo.get({id:originalId,originalId:originalId,dcId:$state.params.dcId,type:'networkUsage',dateType:timeType},function(val){
      $scope.networkUsage = val;
      buildArea4(val);
      $scope.searching = false;
    },function(){
      $scope.searching = false;
    })
  }

  $scope.getFloat = function(num){
    return parseFloat(num).toFixed(2);
  }
  $scope.getGB = function(num){
    return (parseFloat(num)/1024).toFixed(2);
  }
  $scope.showVmMonitor = true;
  MonitorVmsInfo.get({id:$state.params.vmId,dcId:$state.params.dcId},function(res){
    if(res.isMonitored!='1'){
        $scope.showVmMonitor = false;
        return;
    }
    $scope.showVmMonitor = true;
    $scope.originalId = res.originalId;
    MonitorVmBaseInfo.get({id:res.originalId,originalId:res.originalId,dcId:$state.params.dcId,type:'base'},function(val){
        MonitorBusinessTree.get(function(data){
            var name;
            function getSystemName(node){
                if(node.children){
                    for(var i=0;i<node.children.length;i++){
                        if(node.children[i].label==val.name){
                            name = node.label;
                            break;
                        }else{
                            getSystemName(node.children[i]);
                        }
                    }
                }
            }
            getSystemName(data)
            val.belongsProject.projectName = name;
            $scope.vmBaseInfo = val;
        })
      
      buildpie1(val.usability);
    });
    MonitorVmBaseInfo.get({id:res.originalId,originalId:res.originalId,dcId:$state.params.dcId,type:'alarms'},function(val){
      $scope.vmBaseAlarams = val;
    });
    MonitorVmBaseInfo.get({id:res.originalId,originalId:res.originalId,dcId:$state.params.dcId,type:'cpuBase'},function(val){
      $scope.cpuBaseInfo = val;
      if(!val.useRate) val.useRate = 0;
      buildgauge1(parseFloat(val.useRate).toFixed(2));
    });
    $scope.changeCpuTimeType(res.originalId,'hour');
    MonitorVmBaseInfo.get({id:res.originalId,originalId:res.originalId,dcId:$state.params.dcId,type:'memoryBase'},function(val){
      $scope.memoryBaseInfo = val;
      if(!val.pmUseRate) val.pmUseRate = 0;
      if(!val.amUseRate) val.amUseRate = 0;
      buildgauge2(parseFloat(val.pmUseRate).toFixed(2));
      buildgauge3(parseFloat(val.amUseRate).toFixed(2));
    });
    $scope.changeMemoryTimeType(res.originalId,'hour');
    MonitorVmBaseInfo.get({id:res.originalId,originalId:res.originalId,dcId:$state.params.dcId,type:'diskBase'},function(val){
      $scope.diskBaseInfo = val;
      if(!val.useRate) val.useRate = 0;
      buildgauge4(parseFloat(val.useRate).toFixed(2));
    });
    MonitorVmBaseInfo.get({id:res.originalId,originalId:res.originalId,dcId:$state.params.dcId,type:'diskUsage'},function(val){
      var totals = 0;
      var useds = 0;
      var frees = 0;
      for(var i=0;i<val.data.length;i++){
        totals = totals+parseFloat(val.data[i].diskSize);
        useds = useds+parseFloat(val.data[i].diskUseSize);
        frees = frees+parseFloat(val.data[i].diskFreeSize);
      }
      for(var i=0;i<val.data.length;i++){
        val.data[i].proportion = (parseFloat(val.data[i].diskSize)/totals*100).toFixed(2);
      }
      $scope.diskUselist = val;
      var usedRage = totals==0 ? 0 : (useds/totals*100).toFixed(2);
      var freeRage = totals==0 ? 0 : (100-usedRage).toFixed(2);
      $scope.diskTotal = {
        totals:totals,
        useds:useds,
        frees:frees,
        usedRage:usedRage,
        freeRage:freeRage
      }
    });
    $scope.changeNetworkTimeType(res.originalId,'hour');
  });

  $scope.getTime = function(minseconds){
    var seconds = minseconds/1000;
    var day = parseInt(seconds/86400);
    var hour = parseInt((seconds-86400*day)/3600);
    var minute = parseInt((seconds-86400*day-hour*3600)/60);
    var second = parseInt(seconds-86400*day-hour*3600-minute*60);
    return day+'天'+hour+'小时'+minute+'分'+second+'秒'
  }
  

  
})

