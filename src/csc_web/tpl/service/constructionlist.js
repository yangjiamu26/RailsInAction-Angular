angular.module('app').controller('serviceCstlCtrl', ['$scope', function($scope) {
  	$scope.switchFilter = function() {
	    $('.adv-filter-btn').toggleClass('filterhasbg');
	    $('.adv-filter-btn').find("span").toggleClass('rotate180');
	    $(".adv-filter").toggleClass('hide');
	}

  	$scope.tabData   = [
      {
        heading: '虚资源施工',
        route:   'app.service.constructionlist.virtual'
      },
      {
        heading: '软件施工',
        route:   'app.service.constructionlist.software'
      }
    ];
}])