angular.module('monitor', ['ui.router']).config(
	[          '$stateProvider', '$urlRouterProvider', 
	function ($stateProvider,   $urlRouterProvider) {
			$stateProvider
			.state('app.monitor', {
                url: '/monitor',
                template: '<div class="app-content-body" ui-view></div>'
            })
            .state('app.monitor.warning', {
                url: '/warning',
                templateUrl: 'modules/monitor/warning.html'
            })
            .state('app.monitor.notic', {
                url: '/notic',
                templateUrl: 'modules/monitor/notic.html'
            })
            .state('app.monitor.log', {
                url: '/log',
                templateUrl: 'modules/monitor/log.html'
            })
		}
	]
);
