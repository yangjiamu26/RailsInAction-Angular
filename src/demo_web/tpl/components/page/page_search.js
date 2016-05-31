'use strict';

/* Controllers */

  // Form Search controller
app.controller('SearchDemoCtrl', ['$scope', function($scope) {

	$scope.tabData   = [
      {
        heading: 'All <span class="badge badge-sm m-l-xs">16</span>',
        route:   'app.page.search.all'
      },
      {
        heading: 'Users <span class="badge bg-danger badge-sm m-l-xs">6</span>',
        route:   'app.page.search.users'
      },
      {
        heading: 'Comments <span class="badge bg-primary badge-sm m-l-xs">9</span>',
        route:   'app.page.search.comments'
      },
    ];

}]);
    