'use strict';

angular.module('app')
.directive("myChart",function(){
	return{
		restrict: "E",
		template:"<div></div>",
		replace:true,
		scope:{
			ChartConfig:'=config',
			chartfunc:'&func'
		},
  		link: function(scope, element, attrs){
  			scope.$watch('ChartConfig',function(){
  				if(scope.chartfunc){
  					$(element).highcharts(scope.ChartConfig,scope.chartfunc);
  				}else{
  					$(element).highcharts(scope.ChartConfig);
  				}
  			});
  		}
	}
})