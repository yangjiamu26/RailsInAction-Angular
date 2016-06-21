module = angular.module('ctopo', []);
module.directive("ctopo",function(){
	return{
		restrict: 'E',
		scope:{
			option:"@"
		},
		controller:function($scope){

		},
		replace:true,
		template:"<div style='position:relative'><canvas id='ctopoCanvas'></canvas></div>",
		link:function(scope,el,attrs){
			var data = JSON.parse(attrs.data);
			ctopo({
				data:data,
				width:attrs.width,
				heigth:attrs.height,
				isOnAnimateBall:true,      //说明: 是否启动连线的动画球 写法: true,false,  默认:false
	            isShowConsolePanel:true,   //说明: 是否显示控制台,      写法: true,false,  默认true
	            isHoverNodeLight:true,     //说明: 是否悬停节点高亮,    写法: true,false,  默认true
	            isShowNodeLabel:true,      //说明: 是否显示节点文字,    写法: true,false,  默认true
	            isShowNodeTooltip:false,   //说明: 是否显示节点提示框,  写法: true,false,  默认false
	            isShowEdgeLabel:false,     //说明: 是否显示连线文字,    写法: true,false,  默认false
	            isShowEdgeTooltip:false,   //说明: 是否显示连线提示框,  写法: true,false,  默认false
	            isShowEdgeArrow:false,     //说明: 是否显示连线箭头,    写法: true,false,  默认false
		        style:{                    //说明: 全局样式
		          	global:{
		              backgroundColor:"#ffffff",  //说明: 支持fillstyle所有原生写法, 例: rgba(255,255,255,1),默认#ffffff
		              backgroundImage:"../image/ctopobg.png", //说明: 背景网格线, 默认为null
		              backgourndImageOpacity:0.3, //说明: 背景网格线透明度, 配置了backgroundImage此字段才有效, 默认0.3
		                                          //备注: backgroundColor灰,白,0.5美观;backgroundColor黑色,蓝色,0.2美观
		              tooltipBackgroundColor:"rgba(0, 0, 0, 0.7)", //说明: 悬停提示的背景色样式,默认rgba(0, 0, 0, 0.7)
		              tooltipColor:"rgb(255, 255, 255)"  //说明: 悬停提示的文字样式,默认rgb(255, 255, 255)
		              },
		            node:{
		                color:"#00adee",     //说明: 节点颜色, 支持fillstyle所有原生写法, 优先级低于节点自带属性, 默认#00adee
		                size:20,             //说明: 节点直径, 优先级低于节点自带属性, 默认20px, 
		                textColor:"#878787", //说明: 节点Label颜色, 优先级低于节点自带属性, 默认#878787
		                textSize:10          //说明: 节点Label字体大小, 优先级低于节点自带属性, 默认10px
		            },
		            edge:{
		                color:"#c2c2c2",     //说明: 连线颜色, 支持fillstyle所有原生写法, 优先级低于节点自带属性, 默认#c2c2c2
		                size:1,              //说明: 连线宽度, 优先级低于节点自带属性, 默认1px
		                textColor:"#878787", //说明: 节点Label颜色, 优先级低于节点自带属性, 默认#878787
		                textSize:10          //说明: 节点Label字体大小, 优先级低于节点自带属性, 默认10px
		            }
		        },
		        layout:{
		            name:"preset",          //说明: 布局方式,支持force力导向和preset预设, 默认force
		            param:{
		              isScale : false,     //说明: 默认第一次应用布局,是否自适应屏幕宽高,等比例缩放,默认false
		              isRandom : false,    //说明: 默认初始位置是随机Random还是定位location,默认false
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
		        }
		    });
	    }
	}
});