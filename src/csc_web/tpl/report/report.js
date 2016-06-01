angular.module('app').config(
	[
		'$stateProvider',
		'$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {
			$stateProvider
				.state('app.report', {
					url: '/report',
					template: '<div class="app-content-body" ui-view></div>'
				})
				.state('app.report.businessreport', {
					url: '/businessreport',
					templateUrl: 'tpl/report/businessreport.html'
				})
				.state('app.report.vmreport', {
					url: '/vmreport',
					templateUrl: 'tpl/report/vmreport.html'
				})
		},
	]
)