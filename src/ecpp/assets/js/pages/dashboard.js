/*
* 百度echarts
*/
// 路径配置
require.config({
    paths: {
        echarts: 'assets/js/plugins/echarts'
    }
});

// 系统数据量
require(
    [
        'echarts',
        'echarts/theme/macarons', //加载主题macarons
        'echarts/chart/line' // 使用折线图，按需加载
    ],
    function (ec,theme) {
        // 基于准备好的dom，初始化echarts图表
        var systemDataNumber = ec.init(document.getElementById('systemDataNumber'),theme); 
		var option = {
		    title : {
		        text: '系统数据量',
		        textStyle:{
					fontSize: 15, 
					fontWeight: '700', 
					color: '#565656',
					},
				padding: 10
		    },
		    tooltip : {
		        trigger: 'axis'
		    },
		    legend: {
		        data:['文件数']
		    },
		    calculable : true,
		    xAxis : [
		        {
		            type : 'category',
		            boundaryGap : false,
		            data : ['周一','周二','周三','周四','周五','周六','周日']
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value'
		        }
		    ],
		    series : [
		        {
		            name:'文件数',
		            type:'line',
		            smooth:true,
		            itemStyle: {normal: {areaStyle: {type: 'default'}}},
		            data:[456896, 456823, 1236547, 15747865, 25869635, 1582356, 8844717]
		        }
		    ]
		};      

        // 为echarts对象加载数据 
        systemDataNumber.setOption(option); 
    }
);

// 今天已处理数据量
require(
    [
        'echarts',
        'echarts/chart/pie' // 使用饼图，按需加载
    ],
    function (ec) {
        // 基于准备好的dom，初始化echarts图表
        var todayFileDataChart = ec.init(document.getElementById('todayFileDataChart')); 
	    var option = {

			    tooltip : {
			        trigger: 'item',
			        formatter: "{a} <br/>{b} : {c} ({d}%)"
			    },
			    legend: {
			        orient : 'vertical',
			        x : 'left',
			        data:['未处理','已处理']
			    },
			    calculable : true,
			    series : [
			        {
			            name:'数据量',
			            type:'pie',
			            radius : ['10%', '80%'],
			            itemStyle : {
			                normal : {
			                    label : {
			                        show : true,
			                       formatter : '{d}%',
			                      position : 'inner'
			                    },
			                    labelLine : {
			                        show : false
			                    }
			                },
			                emphasis : {
			                    label : {
			                        show : false,		                   
			                        position : 'center',
			                        textStyle : {
			                            fontSize : '30',
			                            fontWeight : 'bold'
			                        }
			                    }
			                }
			            },
			            data:[
			                {value:335, name:'已处理'},
			                {value:310, name:'未处理'},
			            ]
			        }
			    ]

	    }        

        // 为echarts对象加载数据 
        todayFileDataChart.setOption(option); 
    }
);

// 群组用户覆盖率
require(
    [
        'echarts',
        'echarts/theme/macarons', //加载主题macarons
        'echarts/chart/pie' // 使用饼图，按需加载
    ],
    function (ec,theme) {
        // 基于准备好的dom，初始化echarts图表
        var memberCoverageChart = ec.init(document.getElementById('memberCoverageChart'),theme); 
	    var option = {
			    tooltip : {
			        trigger: 'item',
			        formatter: "{a} <br/>{b} : {c} ({d}%)"
			    },
			    legend: {
			        orient : 'vertical',
			        x : 'left',
			        data:['未覆盖','已覆盖']
			    },
			    calculable : true,
			    series : [
			        {
			            name:'覆盖量',
			            type:'pie',
			            radius : ['10%', '80%'],
			            itemStyle : {
			                normal : {
			                    label : {
			                        show : true,
			                       	formatter : '{d}%',
			                      	position : 'inner'
			                    },
			                    labelLine : {
			                        show : false
			                    }
			                },
			                emphasis : {
			                    label : {
			                        show : false,		                   
			                        position : 'center',
			                        textStyle : {
			                            fontSize : '30',
			                            fontWeight : 'bold'
			                        }
			                    }
			                }
			            },
			            data:[
			                {value:15, name:'已覆盖'},
			                {value:10, name:'未覆盖'}
			            ]
			        }
			    ]

	    }     

        // 为echarts对象加载数据 
        memberCoverageChart.setOption(option); 
    }
);

// 会员用户数
require(
    [
        'echarts',
        'echarts/chart/bar' // 使用柱状图，按需加载
    ],
    function (ec) {
        // 基于准备好的dom，初始化echarts图表
        var userValueChart = ec.init(document.getElementById('userValueChart')); 
		var option = {
		    tooltip: {
		        trigger: 'item'
		    },
		    grid: {
		        borderWidth: 0,
		        y: 10,
		        y2: 10
		    },
		    xAxis: [
		        {
		            type: 'category',
		            show: false,
		            data: ['重要价值', '一般价值', '重要发展', '一般发展', '重要保持', '一般保持', '重要挽留', '一般挽留']
		        }
		    ],
		    yAxis: [
		        {
		            type: 'value',
		            show: false
		        }
		    ],
		    series: [
		        {
		            name: '会员特性统计',
		            type: 'bar',
		            itemStyle: {
		                normal: {
		                    color: function(params) {
		                        // build a color map as your need.
		                        var colorList = [
		                          '#2ec7c9','#bbb','#b6a2de','#bbb','#5ab1ef',
		                           '#bbb','#ffb980','#bbb','#d87a80','#bbb',
		                           '#8d98b3','#bbb','#e5cf0d','#bbb','#97b552'
		                        ];
		                        return colorList[params.dataIndex]
		                    },
		                    label: {
		                        show: true,
		                        position: 'top',
		                        formatter: '{b}\n{c}'
		                    }
		                }
		            },
		            data: [102,21,120,40,312,50,100,45],

		        }
		    ]
		};
                    
        // 为echarts对象加载数据 
        userValueChart.setOption(option); 
    }
);

// 人均ARPU
require(
    [
        'echarts',
        'echarts/theme/macarons', //加载主题macarons
        'echarts/chart/gauge' // 使用仪表盘，按需加载
    ],
    function (ec,theme) {
        // 基于准备好的dom，初始化echarts图表
        var perCapitaARPUChart = ec.init(document.getElementById('perCapitaARPUChart'),theme); 
		var option = {
		    tooltip : {
		        formatter: "{a} <br/>{b} : {c}%"
		    },
		    series : [
		        {
		            name:'人均ARPU',
		            type:'gauge',
		            radius : '95%',
		            splitNumber: 5,
		            detail : {formatter:'{value}%'},
		            data:[{value: 50, name: '完成率'}]
		        }
		    ]
		};
                        
        // 为echarts对象加载数据 
        perCapitaARPUChart.setOption(option); 
    }
);

// 营销活动收入
require(
    [
        'echarts',
        'echarts/theme/macarons', //加载主题macarons
        'echarts/chart/gauge' // 使用仪表盘，按需加载
    ],
    function (ec,theme) {
        // 基于准备好的dom，初始化echarts图表
        var marketingActivitiesAmountChart = ec.init(document.getElementById('marketingActivitiesAmountChart'),theme); 
		var option = {
		    series : [
		        {
		            name:'人均ARPU',
		            type:'gauge',
		            radius : '95%',
		            splitNumber: 5,
		            detail : {formatter:'{value}%'},
		            data:[{value: 80, name: '完成率'}]
		        }
		    ]
		};
                        
        // 为echarts对象加载数据 
        marketingActivitiesAmountChart.setOption(option); 
    }
);

// 总收入
require(
    [
        'echarts',
        'echarts/theme/macarons', //加载主题macarons
        'echarts/chart/line' // 使用折线图，按需加载
    ],
    function (ec,theme) {
        // 基于准备好的dom，初始化echarts图表
        var revenueTrendChart = ec.init(document.getElementById('revenueTrendChart'),theme); 
	    var option = {

			    title : {
			        text: '总收入',
			        textStyle:{
						fontSize: 15, 
						fontWeight: '700', 
						color: '#565656',
						fontFamily: 'Microsoft YaHei'
						},
					padding: 10
			    },
			    tooltip : {
			        trigger: 'axis'
			    },
			    legend: {
			        data:['总收入'],
			        padding: 10
			    },
			    grid : {
			    	y: 70,
			    	y2: 40
			    },
			    calculable : true,
			    xAxis : [
			        {
			            type : 'category',
			            boundaryGap : false,
			            data : ['周一','周二','周三','周四','周五','周六','周日'],
			            splitLine : {
			            	lineStyle :{type : 'dashed'}
			            }
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
			            splitLine : {
			            	lineStyle :{type : 'dashed'}
			            }
			        }
			    ],
			    series : [
			        {
			            name:'总收入',
			            type:'line',
			            smooth:true,
			            data:[13320, 11032, 23601, 23400, 12000, 9000, 34520],
			            markPoint : {
			                data : [
			                    {type : 'max', name: '最大值'},
			                    {type : 'min', name: '最小值'}
			                ]
			            },
			            markLine : {
			                data : [
			                    {type : 'average', name: '平均值'}
			                ]
			            }
			        }
			    ]     

	    }        

        // 为echarts对象加载数据 
        revenueTrendChart.setOption(option); 
    }
);

// 营销活动转化率
require(
    [
        'echarts',
        'echarts/theme/macarons', //加载主题macarons
        'echarts/chart/funnel' // 使用漏斗图，按需加载
    ],
    function (ec,theme) {
        // 基于准备好的dom，初始化echarts图表
        var MarketedConversionRateChart = ec.init(document.getElementById('MarketedConversionRateChart'),theme); 
		var option = {
            title : {
                text: '营销活动转化率',
                textStyle:{
                    fontSize: 15, 
                    fontWeight: '700', 
                    color: '#565656',
                    fontFamily: 'Microsoft YaHei'
                    },
                padding: 10
            },
		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c}%"
		    },
		    series : [
		        {
                    name:'营销活动转化率',
                    type:'funnel',
                    x: '5%',
                    y: 40,
                    //x2: 80,
                    y2: 20,
                    width: '60%',
		            itemStyle: {
		                normal: {
		                    borderColor: '#fff',
		                    borderWidth: 1,
		                    label: {
		                        show: true,
		                        formatter: '{b}:{c}%'
		                    }
		                }
		            },
		            data:[
                        {value:20, name:'活动购买'},
                        {value:80, name:'活动参与'},
                        {value:100, name:'活动推广'}
		            ]
		        }
		    ]
		};                       
        // 为echarts对象加载数据 
        MarketedConversionRateChart.setOption(option); 
    }
);

// 销售渠道购买用户数
require(
    [
        'echarts',
        'echarts/theme/macarons', //加载主题macarons
        'echarts/chart/pie' // 使用饼图，按需加载
    ],
    function (ec,theme) {
        // 基于准备好的dom，初始化echarts图表
        var marketingChannelChart = ec.init(document.getElementById('marketingChannelChart'),theme); 
		var option = {
            title : {
                text: '销售渠道购买用户数',
                textStyle:{
                    fontSize: 15, 
                    fontWeight: '700', 
                    color: '#565656',
                    },
                padding: 10
            },		    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
		    },
		    series : [
		        {
		            name:'分类',
		            type:'pie',
		            radius : '70%',
		            center: ['50%', '50%'],
		            itemStyle : {
		            	normal : {
		            		label : {
		            			formatter : '{b}{d}%'
		            		},
		            		labelLine : {length:10},
		            		borderColor: '#fff',
		            	}
		            },
		            data:[
		                {value:335, name:'客户端'},
		                {value:310, name:'短信'},
		                {value:234, name:'线上'},
		                {value:135, name:'门店'}
		            ]
		        }
		    ]
		};      

        // 为echarts对象加载数据 
        marketingChannelChart.setOption(option); 
    }
);
