angular.module('app').config(
    [
        '$stateProvider',
        '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('app.home', {
                    url: '/home',
                    templateUrl: 'tpl/home/home.html',
                    ncyBreadcrumb: {
                        label: '公告板'
                    },
                    resolve: {
                        deps: ['$ocLazyLoad',
                          function($ocLazyLoad) {
                            return $ocLazyLoad.load('tpl/home/home.js');
                          }
                        ]
                    }
                })
                .state('app.custom', {
                    url: '/custom',
                    templateUrl: 'tpl/home/custom.html',
                    ncyBreadcrumb: {
                        label: '首页配置'
                    }
                })
        },
    ]);