angular.module('app')

.controller('visualmapCtrl', function($scope, $modal, $http, $q, AssetsManegeTreeNode, fileUrl, AssetsManegeRooms) {
    
    $scope.urlhead = fileUrl;
    $scope.rooms = AssetsManegeRooms.query();
    $scope.selectCity = {
       name:'南宁市'
    }
})

.directive("visualMap", function(){ 
  	return { 
  		restrict: "E",
  		template:"<div></div>",
  		replace:true,
      scope:{
        roomslist:'=',
        itemchange:'&',
        selectCity:'='
      },
  		link: function(scope, element, attrs){
        var RES = scope.roomslist;
        var init = [{city:'南宁市',value:0}];
        for(var i=0;i<RES.length;i++){
          var done = false;
          $.each(init, function(j,val){
            if(RES[i].city==val.city){
              init[j].value++;
              done = true;
            }
          });
          if(done) continue;
          init.push({
            city:RES[i].city,
            value:1
          })
        }

        var mapRooms = [];
        for(var i=0;i<init.length;i++){
            var bool = i==0 ? true : false;
            var item = {
              name: init[i].city,
              value:init[i].value,
              selected:bool,
              label: {
                normal: {
                    show: true
                },
                emphasis: {
                  show: true,
                  formatter:'{b}  {c}',
                  textStyle:{
                    color: '#c00',
                    fontSize:16,
                    fontWeight:'bold'
                  }
                }
              }
            }
            mapRooms.push(item);
        }

  			$(element[0]).height($(window).height()-100);
  			require([
                'echarts',
                'echarts/chart/map',
			    'echarts/config'
            ], function (echarts, map, config) {

            	$.get('bower_components/echarts/map/json/province/guangxi.json', function (chinaJson) {
    				    echarts.registerMap('guangxi', chinaJson);
    				    var chart = echarts.init(element[0]);
    				    chart.setOption({
    				        series : [
                                {
                                    name: '机房分布',
                                    type: 'map',
                                    map: 'guangxi',
                                    label: {
                                        normal: {
                                            show: true
                                        },
                                        emphasis: {
                                            show: true,
                                        }
                                    },
                                    data:mapRooms
                                }
                            ]
    				    });
					
      					chart.on(config.EVENT.CLICK, function (param){
                    if(!param.value) return;
                    var gx_citys = ["南宁市","桂林市","柳州市","梧州市","贵港市","玉林市","钦州市","桂林市","北海市","来宾市","白色市","贺州市","崇左市","防城港市"];
                    for(var i=0;i<gx_citys.length;i++){
                        chart._api.dispatchAction({
                            type: 'mapUnSelect',
                            name:gx_citys[i]
                        })
                    }
                    chart._api.dispatchAction({
                        type: 'mapSelect',
                        name: param.name
                    })
                    scope.$apply(function(){
                      scope.selectCity.name = param.name;
                    })
      					});

				      });

            });
  		}
  	}
})