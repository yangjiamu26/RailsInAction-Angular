angular.module('app').config(
    ['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('app.monitor', {
                    url: '/monitor',
                    template: '<div class="app-content-body" ui-view></div>'
                })
                .state('app.monitor.warning', {
                    url: '/warning',
                    templateUrl: 'tpl/monitor/warning.html'
                })
                .state('app.monitor.notic', {
                    url: '/notic',
                    templateUrl: 'tpl/monitor/notic.html'
                })
                .state('app.monitor.log', {
                    url: '/log',
                    templateUrl: 'tpl/monitor/log.html'
                })
        }
    ]
);