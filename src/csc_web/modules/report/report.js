angular.module('report', ['ui.router']).config(
	[   
		'$stateProvider', 
		'$urlRouterProvider', 
		function ($stateProvider,   $urlRouterProvider) {
			$stateProvider
			.state('app.report', {
                url: '/report',
                template: '<div class="app-content-body" ui-view></div>'
            	})
				.state('app.report.businessreport', {
					url: '/businessreport',
					templateUrl: 'modules/report/businessreport.html'
	      		})
	      		.state('app.report.vmreport', {
					url: '/vmreport',
					templateUrl: 'modules/report/vmreport.html'
	      		})
		},
	]
)
