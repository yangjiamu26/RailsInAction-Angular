angular.module('app').controller('homeCtrl', ['$scope', 'resStatistics', 'countOnIndex', 'expiredtodelete', 'areaResCount', 'productCount', function($scope, resStatistics, countOnIndex, expiredtodelete, areaResCount, productCount) {
    resStatistics.getResStatistics(function(data) {
        $scope.ResStatisticData = data;
    });
    countOnIndex.getCountOnIndex(function(data) {
        $scope.countOnIndexData = data;
    });
    expiredtodelete.getExpiredtodelete(function(data) {
        $scope.expiredtodeleteData = data;
    });
    var pie = {
        "cpuPie": {
            "max": 0,
            "used": 0,
            "free": 0
        },
        "memoryPie": {
            "max": 0,
            "used": 0,
            "free": 0
        },
        "storagePie": {
            "max": 0,
            "used": 0,
            "free": 0
        }
    };

    areaResCount.getareaResCount(function(data) {
        // $scope.areaResCountData = data;
        pie.cpuPie = {
            "max": data.quotas.cpu,
            "used": data.quotas.cpuUsed,
            "free": data.quotas.cpu - data.quotas.cpuUsed
        }
        pie.memoryPie = {
            "max": data.quotas.memory,
            "used": data.quotas.memoryUsed,
            "free": data.quotas.memory - data.quotas.memoryUsed
        }
        pie.storagePie = {
            "max": data.quotas.storage,
            "used": data.quotas.storageUsed,
            "free": data.quotas.storage - data.quotas.storageUsed
        }

        $scope.cpuPie = {
            "title": {
                "text": "CPU：" + pie.cpuPie.max + "核",
                "style": {
                    "fontSize": "14px"
                }
            },
            "legend": {
                "itemStyle": {
                    "fontWeight": 'nomal'
                }
            },
            "chart": {
                "plotBackgroundColor": null,
                "plotBorderWidth": null,
                "plotShadow": false,
                "type": 'pie'
            },
            "tooltip": {
                "pointFormat": "{series.name}: <b>{point.percentage:.1f}%</b>"
            },
            "credits": {
                "enabled": false
            },
            "plotOptions": {
                "pie": {
                    "allowPointSelect": true,
                    "cursor": 'pointer',
                    "dataLabels": {
                        "enabled": false
                    },
                    "showInLegend": true
                }
            },
            "series": [{
                "name": "占比",
                "colorByPoint": true,
                "data": [{
                    "name": "未用：" + pie.cpuPie.free + "核",
                    "y": pie.cpuPie.free / pie.cpuPie.max * 100
                }, {
                    "name": "已用：" + pie.cpuPie.used + "核",
                    "y": pie.cpuPie.used / pie.cpuPie.max * 100
                }]
            }]
        }

        $scope.memoryPie = {
            "title": {
                "text": "内存：" + pie.memoryPie.max + "G",
                "style": {
                    "fontSize": "14px"
                }
            },
            "legend": {
                "itemStyle": {
                    "fontWeight": 'nomal'
                }
            },
            "chart": {
                "plotBackgroundColor": null,
                "plotBorderWidth": null,
                "plotShadow": false,
                "type": 'pie'
            },
            "tooltip": {
                "pointFormat": "{series.name}: <b>{point.percentage:.1f}%</b>"
            },
            "credits": {
                "enabled": false
            },
            "plotOptions": {
                "pie": {
                    "allowPointSelect": true,
                    "cursor": 'pointer',
                    "dataLabels": {
                        "enabled": false
                    },
                    "showInLegend": true
                }
            },
            "series": [{
                "name": "占比",
                "colorByPoint": true,
                "data": [{
                    "name": "未用：" + pie.memoryPie.free + "G",
                    "y": pie.memoryPie.free / pie.memoryPie.max * 100
                }, {
                    "name": "已用：" + pie.memoryPie.used + "G",
                    "y": pie.memoryPie.used / pie.memoryPie.max * 100
                }]
            }]
        }

        $scope.storagePie = {
            "title": {
                "text": "存储：" + pie.storagePie.max + "G",
                "style": {
                    "fontSize": "14px"
                }
            },
            "legend": {
                "itemStyle": {
                    "fontWeight": 'nomal'
                }
            },
            "chart": {
                "plotBackgroundColor": null,
                "plotBorderWidth": null,
                "plotShadow": false,
                "type": 'pie'
            },
            "tooltip": {
                "pointFormat": "{series.name}: <b>{point.percentage:.1f}%</b>"
            },
            "credits": {
                "enabled": false
            },
            "plotOptions": {
                "pie": {
                    "allowPointSelect": true,
                    "cursor": 'pointer',
                    "dataLabels": {
                        "enabled": false
                    },
                    "showInLegend": true
                }
            },
            "series": [{
                "name": "占比",
                "colorByPoint": true,
                "data": [{
                    "name": "未用：" + pie.storagePie.free + "G",
                    "y": pie.storagePie.free / pie.storagePie.max * 100
                }, {
                    "name": "已用：" + pie.storagePie.used + "G",
                    "y": pie.storagePie.used / pie.storagePie.max * 100
                }]
            }]
        }

    });

    productCount.getproductCount(function(data) {
        var productCategories = [],
            productData = [];
        var vdiskCategories = [],
            vdiskProductData = [];
        _.map(data.vmTotal, function(v, n) {
            productCategories.push(v.proName);
            productData.push(parseInt(v.count));
        })
        _.map(data.vdiskTotal, function(v, n) {
            vdiskCategories.push(v.proName);
            vdiskProductData.push(parseInt(v.count));
        })
        $scope.columnChart1 = {
            "chart": {
                "type": 'column'
            },
            "title": {
                "text": '云主机服务',
                "style": {
                    "fontSize": "14px"
                }
            },
            "legend": {
                "itemStyle": {
                    "fontWeight": 'nomal'
                }
            },
            "xAxis": {
                "categories": productCategories
            },
            "yAxis": {
                "min": 0,
                "title": {
                    "text": '单位 (个)'
                }
            },
            "tooltip": {
                "headerFormat": '<span style="font-size:10px">{point.key}</span>',
                "pointFormat": '' +
                    '',
                "footerFormat": '<table><tbody><tr><td style="color:{series.color};padding:0">{series.name}: </td><td style="padding:0"><b>{point.y} 个</b></td></tr></tbody></table>',
                "shared": true,
                "useHTML": true
            },
            "credits": {
                "text": '更多',
                "href": '#',
                "position": {
                    "align": 'right',
                    "x": -10,
                    "verticalAlign": 'top',
                    "y": 20
                },
                "style": {
                    "color": "#52bde4"
                }
            },
            "plotOptions": {
                "column": {
                    "pointPadding": 0.2,
                    "borderWidth": 0
                }
            },
            "series": [{
                "name": '申请数量',
                "data": productData
            }]
        }

        $scope.columnChart2 = {
            "chart": {
                "type": 'column'
            },
            "title": {
                "text": '云硬盘服务',
                "style": {
                    "fontSize": "14px"
                }
            },
            "legend": {
                "itemStyle": {
                    "fontWeight": 'nomal'
                }
            },
            "xAxis": {
                "categories": vdiskCategories
            },
            "yAxis": {
                "min": 0,
                "title": {
                    "text": '单位 (个)'
                }
            },
            "tooltip": {
                "headerFormat": '<span style="font-size:10px">{point.key}</span>',
                "pointFormat": '' +
                    '',
                "footerFormat": '<table><tbody><tr><td style="color:{series.color};padding:0">{series.name}: </td><td style="padding:0"><b>{point.y} 个</b></td></tr></tbody></table>',
                "shared": true,
                "useHTML": true
            },
            "credits": {
                "text": '更多',
                "href": '#',
                "position": {
                    "align": 'right',
                    "x": -10,
                    "verticalAlign": 'top',
                    "y": 20
                },
                "style": {
                    "color": "#52bde4"
                }
            },
            "plotOptions": {
                "column": {
                    "pointPadding": 0.2,
                    "borderWidth": 0
                }
            },
            "series": [{
                "name": '申请数量',
                "data": vdiskProductData
            }]
        }
    })



    $scope.columnChart3 = {
        "chart": {
            "type": 'column'
        },
        "title": {
            "text": '',
            "style": {
                "fontSize": "14px"
            }
        },
        "legend": {
            "itemStyle": {
                "fontWeight": 'nomal'
            }
        },
        "xAxis": {
            "categories": [
                '云主机',
                '云硬盘'
            ]
        },
        "yAxis": {
            "min": 0,
            "title": {
                "text": '单位 (个)'
            }
        },
        "tooltip": {
            "headerFormat": '<span style="font-size:10px">{point.key}</span>',
            "pointFormat": '' +
                '',
            "footerFormat": '<table><tbody><tr><td style="color:{series.color};padding:0">{series.name}: </td><td style="padding:0"><b>{point.y} 个</b></td></tr></tbody></table>',
            "shared": true,
            "useHTML": true
        },
        "credits": {
            "enabled": false
        },
        "plotOptions": {
            "column": {
                "pointPadding": 0.2,
                "borderWidth": 0
            }
        },
        "series": [{
            "name": '已申请',
            "data": [51, 99]
        }, {
            "name": '使用中',
            "data": [48, 76]
        }, {
            "name": '已过期',
            "data": [3, 23]
        }]
    }


    $scope.lineChart1 = {
        "chart": {
            "type": 'line'
        },
        "title": {
            "text": '虚拟机申请',
            "style": {
                "fontSize": "14px"
            }
        },
        "legend": {
            "enabled": false
        },
        "xAxis": {
            "categories": [
                '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'
            ]
        },
        "yAxis": {
            "min": 0,
            "title": {
                "text": '虚拟机 (个)'
            }
        },
        "tooltip": {
            "headerFormat": '<span style="font-size:10px">{point.key}</span>',
            "pointFormat": '' +
                '',
            "footerFormat": '<table><tbody><tr><td style="color:{series.color};padding:0">{series.name}: </td><td style="padding:0"><b>{point.y} 个</b></td></tr></tbody></table>',
            "shared": true,
            "useHTML": true
        },
        "credits": {
            "enabled": false
        },
        "plotOptions": {
            "column": {
                "pointPadding": 0.2,
                "borderWidth": 0
            }
        },
        "series": [{
            "name": '虚拟机',
            "data": [230, 320, 201, 350, 460, 670, 880, 650, 1221, 620, 230, 120]
        }]
    }


    $scope.lineChart2 = {
        "chart": {
            "type": 'line'
        },
        "title": {
            "text": '业务系统申请',
            "style": {
                "fontSize": "14px"
            }
        },
        "legend": {
            "enabled": false
        },
        "xAxis": {
            "categories": [
                '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'
            ]
        },
        "yAxis": {
            "min": 0,
            "title": {
                "text": '业务系统 (个)'
            }
        },
        "tooltip": {
            "headerFormat": '<span style="font-size:10px">{point.key}</span>',
            "pointFormat": '' +
                '',
            "footerFormat": '<table><tbody><tr><td style="color:{series.color};padding:0">{series.name}: </td><td style="padding:0"><b>{point.y} 个</b></td></tr></tbody></table>',
            "shared": true,
            "useHTML": true
        },
        "credits": {
            "enabled": false
        },
        "plotOptions": {
            "column": {
                "pointPadding": 0.2,
                "borderWidth": 0
            }
        },
        "series": [{
            "name": '业务系统',
            "data": [230, 320, 201, 350, 460, 670, 880, 650, 1221, 620, 230, 120]
        }]
    }


    $scope.columnChart4 = {
        "chart": {
            "type": 'column'
        },
        "title": {
            "text": '',
            "style": {
                "fontSize": "14px"
            }
        },
        "legend": {
            'verticalAlign': 'top',
            "itemStyle": {
                "fontWeight": 'nomal'
            }
        },
        "xAxis": {
            "categories": [
                'ww102', '不存在vlan', 'hgk102', 'yzt业务', 'hgk69', '子域业务系统69', 'hhh', 'xmf69业务'
            ]
        },
        "yAxis": {
            "min": 0,
            "title": {
                "text": '单位 (个)'
            }
        },
        "tooltip": {
            "headerFormat": '<span style="font-size:10px">{point.key}</span>',
            "pointFormat": '' +
                '',
            "footerFormat": '<table><tbody><tr><td style="color:{series.color};padding:0">{series.name}: </td><td style="padding:0"><b>{point.y} 个</b></td></tr></tbody></table>',
            "shared": true,
            "useHTML": true
        },
        "credits": {
            "text": '更多',
            "href": '#',
            "position": {
                "align": 'right',
                "x": -10,
                "verticalAlign": 'top',
                "y": 20
            },
            "style": {
                "color": "#52bde4"
            }
        },
        "plotOptions": {
            "column": {
                "pointPadding": 0.2,
                "borderWidth": 0
            }
        },
        "series": [{
            "name": '云主机',
            "data": [2, 2, 2, 1, 3, 0, 4, 1]
        }, {
            "name": '云硬盘',
            "data": [7, 4, 2, 1, 5, 0, 10, 2]
        }]
    }


    $scope.columnChart5 = {
        "chart": {
            "type": 'column'
        },
        "title": {
            "align": 'left',
            "text": '资源告警统计',
            "style": {
                "fontSize": "14px"
            }
        },
        "legend": {
            'verticalAlign': 'top',
            "itemStyle": {
                "fontWeight": 'nomal'
            }
        },
        "xAxis": {
            "categories": [
                '云主机', '配额告警'
            ]
        },
        "yAxis": {
            "min": 0,
            "title": {
                "text": '单位 (条)'
            }
        },
        "tooltip": {
            "headerFormat": '<span style="font-size:10px">{point.key}</span>',
            "pointFormat": '' +
                '',
            "footerFormat": '<table><tbody><tr><td style="color:{series.color};padding:0">{series.name}: </td><td style="padding:0"><b>{point.y} 条</b></td></tr></tbody></table>',
            "shared": true,
            "useHTML": true
        },
        "credits": {
            "enabled": false
        },
        "plotOptions": {
            "column": {
                "pointPadding": 0.2,
                "borderWidth": 0
            }
        },
        "series": [{
            "name": '告警数量',
            "data": [2, 5]
        }]
    }


    $scope.columnChart6 = {
        "chart": {
            "type": 'column'
        },
        "title": {
            "align": 'left',
            "text": '业务配额告警统计',
            "style": {
                "fontSize": "14px"
            }
        },
        "legend": {
            'verticalAlign': 'top',
            "itemStyle": {
                "fontWeight": 'nomal'
            }
        },
        "xAxis": {
            "categories": [
                'CPU', '内存', '存储'
            ]
        },
        "yAxis": {
            "min": 0,
            "title": {
                "text": '单位 (条)'
            }
        },
        "tooltip": {
            "headerFormat": '<span style="font-size:10px">{point.key}</span>',
            "pointFormat": '' +
                '',
            "footerFormat": '<table><tbody><tr><td style="color:{series.color};padding:0">{series.name}: </td><td style="padding:0"><b>{point.y} 条</b></td></tr></tbody></table>',
            "shared": true,
            "useHTML": true
        },
        "credits": {
            "enabled": false
        },
        "plotOptions": {
            "column": {
                "pointPadding": 0.2,
                "borderWidth": 0
            }
        },
        "series": [{
            "name": '告警数量',
            "data": [2, 5, 3]
        }]
    }


    $scope.columnChart7 = {
        "chart": {
            "type": 'column'
        },
        "title": {
            "align": 'left',
            "text": '',
            "style": {
                "fontSize": "14px"
            }
        },
        "legend": {
            'verticalAlign': 'top',
            "itemStyle": {
                "fontWeight": 'nomal'
            }
        },
        "xAxis": {
            "categories": [
                '施工失败', 'wfg123', '申请软件', 'yzt100'
            ]
        },
        "yAxis": {
            "min": 0,
            "title": {
                "text": '单位 (条)'
            }
        },
        "tooltip": {
            "headerFormat": '<span style="font-size:10px">{point.key}</span>',
            "pointFormat": '' +
                '',
            "footerFormat": '<table><tbody><tr><td style="color:{series.color};padding:0">{series.name}: </td><td style="padding:0"><b>{point.y} 条</b></td></tr></tbody></table>',
            "shared": true,
            "useHTML": true
        },
        "credits": {
            "enabled": false
        },
        "plotOptions": {
            "column": {
                "pointPadding": 0.2,
                "borderWidth": 0
            }
        },
        "series": [{
            "name": '告警数量',
            "data": [2, 5, 3, 4]
        }]
    }



}]);