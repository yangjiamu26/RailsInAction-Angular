angular.module('app')

.controller('monitorBigIndexCtrl', function($scope, $state, Datacenters){
  if($state.params.dcId){
    $state.go('app.monitor_big.show',{dcId:$state.params.dcId});
  }else{
    Datacenters.query(function(res){
      $state.go('app.monitor_big.show',{dcId:res.data[0].id});
    })
  }
})
.controller('monitorBigShowCtrl', function($scope, $rootScope, $timeout, $state, Datacenters, MonitorDatacentersStatics, MonitorDatacentersHosts, MonitorDcAlarmsStatics) {
    $scope.selected_dcId = $state.params.dcId;

    Datacenters.query(function(res){
      $scope.datacenters = res.data;
      $.each(res.data,function(index,val){
        if(val.id==$state.params.dcId){
          $scope.selected_dcName = val.name;
        }
      })
    });
    $scope.getResouces = function(dcId){
      MonitorDatacentersStatics.query({id:dcId,type:'resource'},function(val){
        $scope.statics = val;
      })
      MonitorDatacentersHosts.query({id:dcId,type:'alarms'},function(val){
        $scope.hosts = val;
        $scope.buildCpoto(val);
      })
      MonitorDcAlarmsStatics.query({type:'alarmsDetail',dcId:dcId},function(val){
        $scope.alarmsAll= val.data;
        $scope.root_warnings = val.data;
        var arrs = [];
        for(var i=0;i<val.data.length;i++){
          if(val.data[i].alarmLevel==3){
            arrs.push(val.data[i]);
          }
        }
        if(arrs.length<1) return;
        var start = -2;
        var end = 0
        function DangerInterval(){
          $timeout(function(){
            $scope.showDangerbox = true;
            if(end+2<arrs.length){
              start += 2;
              end += 2;
              $scope.dangerAlarms = arrs.slice(start+2,end+2);
            }else if(end+2==arrs.length-1){
              $scope.dangerAlarms = arrs.slice(arrs.length-1);
              start = -2;
              end = 0;
            }else{
              start = 0;
              end = 2;
              $scope.dangerAlarms = arrs.slice(start,end);
            }
            $timeout(function(){
              $scope.showDangerbox = false;
              DangerInterval();
            },5000);
          },1000);
        }
        DangerInterval();
      });

    }
    $scope.getResouces($scope.selected_dcId);

    $scope.calcued = function(val1,val2){
      return parseInt(val1/val2*100);
    }

    $scope.buildPie = function(alarms){
      $scope.alarmPie = {
          chart: {
              plotBackgroundColor: null,
              plotBorderWidth: null,
              plotShadow: false,
              backgroundColor:null,
              spacingTop:20
          },
          title: {
              text: '告警比率',
              align:'center',
              floating:true,
              y:-5,
              style:{
                fontFamily:'Microsoft YaHei',
                fontSize:'14px',
                fontWeight:'600',
                color:'#fff'
              }
          },
          colors:["#6fcaee","#16b27e","#ed7218","#e60012"],
          credits:{
            enabled:false
          },
          tooltip: {
            formatter: function() {
              return '<b>'+ this.point.name +'</b>: '+ Highcharts.numberFormat(this.percentage, 1) +'%';
           }
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
              enabled:false
          },
          series: [{
              type: 'pie',
              data: [
                  ['正常',  $scope.alarmList[0]],
                  ['一般',  $scope.alarmList[1]],
                  ['严重',  $scope.alarmList[2]],
                  ['灾难',  $scope.alarmList[3]]
              ]
          }]
      }
    }

    $scope.alarmList=[0,0,0,0];
    $scope.addAlarms = function(level){
      switch(level){
        case 0:
          $scope.alarmList[0]+=1;
          break;
        case 1:
          $scope.alarmList[1]+=1;
          break;
        case 2:
          $scope.alarmList[2]+=1;
          break;
        case 3:
          $scope.alarmList[3]+=1;
          break;
      }
    }

    $scope.buildCpoto = function(obj){
      var nodes = [{
          "id": "1001",
          "label": $scope.selected_dc,
          "size": 72,
          "type": 1
      }];
      var edges = [];
      for(var i=0;i<obj.resPools.length;i++){
        var arr1 = {
            "id": "200"+i,
            "label": obj.resPools[i].name,
            "size": 56,
            "type": 2
        };
        var edge1 = {"target": arr1.id,"source": "1001"};
        nodes.push(arr1);
        edges.push(edge1);
        if(obj.resPools[i].hosts.length<1) return;
        for(var j=0;j<obj.resPools[i].hosts.length;j++){
          $scope.addAlarms(obj.resPools[i].hosts[j].alarmLevel);//增加告警数量
          var arr2 = {
              "id": "300"+i+"0"+j,
              "label": obj.resPools[i].hosts[j].hostIp,
              "size": 44,
              "type": 3,
              "level":obj.resPools[i].hosts[j].alarmLevel
          };
          var edge2 = {"target": arr2.id,"source": arr1.id};
          nodes.push(arr2);
          edges.push(edge2);
        }
      }
      if(obj.freeHosts.length>0){
        for(var i=0;i<obj.freeHosts.length;i++){
          $scope.addAlarms(obj.freeHosts[i].alarmLevel);//增加告警数量
          var arr = {
              "id": "400"+i,
              "label": obj.freeHosts[i].hostIp,
              "size": 44,
              "type": 3,
              "level":obj.freeHosts[i].alarmLevel
          };
          var edge = {"target": arr.id,"source": "1001"};
          nodes.push(arr);
          edges.push(edge);
        }
      }

      $scope.buildPie($scope.alarmList);//pie

      $scope.cpotoOptions = {
          id:"ctopoCanvas",
          width:"860px",   //说明: canvas的宽度,       写法: 500,500px,50%,auto,默认auto
          height:"580px",  //说明: canvas的高度,       写法: 500,500px,50%,auto,默认auto
          isOnAnimateBall:true,      //说明: 是否启动连线的动画球 写法: true,false,  默认:false
          isShowConsolePanel:false,   //说明: 是否显示控制台,      写法: true,false,  默认true
          isHoverNodeLight:true,     //说明: 是否悬停节点高亮,    写法: true,false,  默认true
          isShowNodeLabel:true,      //说明: 是否显示节点文字,    写法: true,false,  默认true
          isShowNodeTooltip:false,   //说明: 是否显示节点提示框,  写法: true,false,  默认false
          isShowEdgeLabel:false,     //说明: 是否显示连线文字,    写法: true,false,  默认false
          isShowEdgeTooltip:false,   //说明: 是否显示连线提示框,  写法: true,false,  默认false
          isShowEdgeArrow:false,     //说明: 是否显示连线箭头,    写法: true,false,  默认false
          style:{                    //说明: 全局样式
            global:{
              backgroundColor:"rgba(0,0,0,0)",  //说明: 支持fillstyle所有原生写法, 例: rgba(255,255,255,1),默认#ffffff
              //backgroundImage:"../image/ctopobg.png", //说明: 背景网格线, 默认为null
              //backgourndImageOpacity:0.3, //说明: 背景网格线透明度, 配置了backgroundImage此字段才有效, 默认0.3
                                          //备注: backgroundColor灰,白,0.5美观;backgroundColor黑色,蓝色,0.2美观
              tooltipBackgroundColor:"rgba(0, 0, 0, 0.7)", //说明: 悬停提示的背景色样式,默认rgba(0, 0, 0, 0.7)
              tooltipColor:"rgb(255, 255, 255)"  //说明: 悬停提示的文字样式,默认rgb(255, 255, 255)
            },
            node:{
              color:"#00adee",     //说明: 节点颜色, 支持fillstyle所有原生写法, 优先级低于节点自带属性, 默认#00adee
              size:20,             //说明: 节点直径, 优先级低于节点自带属性, 默认20px, 
              textColor:"#fff", //说明: 节点Label颜色, 优先级低于节点自带属性, 默认#878787
              textSize:10          //说明: 节点Label字体大小, 优先级低于节点自带属性, 默认10px
            },
            edge:{
              color:"#c2c2c2",     //说明: 连线颜色, 支持fillstyle所有原生写法, 优先级低于节点自带属性, 默认#c2c2c2
              size:1,              //说明: 连线宽度, 优先级低于节点自带属性, 默认1px
              textColor:"#fff", //说明: 节点Label颜色, 优先级低于节点自带属性, 默认#878787
              textSize:10          //说明: 节点Label字体大小, 优先级低于节点自带属性, 默认10px
            }
          },
          layout:{
            name:"force",          //说明: 布局方式,支持force力导向和preset预设, 默认force
            param:{
              isScale : true,     //说明: 默认第一次应用布局,是否自适应屏幕宽高,等比例缩放,默认false
              isRandom : true,    //说明: 默认初始位置是随机Random还是定位location,默认false
              initAreaW : 100,     //说明: 初始分布是的初始宽,默认100px
              initAreaH : 56,      //说明: 初始分布是的初始高,默认56px
              energy:0.5,          //说明: 能量值范围0.3-1,  默认0.5
              iterations :150,     //说明: 力导向的迭代次数,默认150
              ejectFactor : 2,     //说明: 默认斥力常量,默认2
              ejectRange : 250,    //说明: 最大斥力范围,超过的不计算节点间斥力,默认2
              ejectFadeRange : 30, //说明: 节点簇的减弱范围,此范围内ejectFactor-1,默认30
              condenseFactor : 1,  //说明: 默认引力常量,默认1
              maxtx : 3,           //说明: 每次迭代的x方向最大移动距离,默认3
              maxty : 1.68         //说明: 每次迭代的y方向最大移动距离,默认1.68
            }
          },
          data:{
              "nodes": nodes,
              "edges": edges
          },
          event:{                    //说明: 监听回调
            steerwheel:function(keyCode){     //说明: 上下左右的平移回调, keyCode等于上下左右的键盘按键
              //console.log(keyCode);
            },
            scale:function(prevScale,scale){  //说明: 放大,缩小的回调, prevScale=上一次的比例,scale=当前比例
              //console.log(scale);
            },
            clickNode:function(e,node){       //说明: 点击节点的回调, e=event,node=被点击节点
              //console.log(node);
            },
            hoverNode:function(e,node){       //说明: 悬停节点的回调, e=event,node=被悬停节点
              //console.log(node);
            },
            leaveNode:function(e){            //说明: 离开节点的回调, e=event
              //console.log(e);
            },
            clickEdge:function(e,edge){       //说明: 点击连线的回调, e=event,edge=被点击连线
              //console.log(edge);
            },
            hoverEdge:function(e,edge){       //说明: 悬停连线的回调, e=event,edge=被悬停连线
              //console.log(edge);
            },
            leaveEdge:function(e){            //说明: 离开连线的回调, e=event
              //console.log(e);
            }
          }
      };

    }
    
});