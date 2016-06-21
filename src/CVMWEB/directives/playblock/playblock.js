app.directive("playblock",function(){
  return{
    restrict: 'E',
    scope:{
    	panelData:"="
    },
    controller:function($scope){
      
    },
    templateUrl:'directives/playblock/tpl.html',
    compile:function(el,attrs,transclude){
      
    },
    replace:true
  }
});