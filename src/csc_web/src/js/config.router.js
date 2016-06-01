'use strict';

/**
 * Config for the router
 */
angular.module('app')
  .run(
    [          '$rootScope', '$state', '$stateParams',
      function ($rootScope,   $state,   $stateParams) {
          $rootScope.$state = $state;
          $rootScope.$stateParams = $stateParams;        
      }
    ]
  )
  .config(
    [          '$stateProvider', '$urlRouterProvider', 'JQ_CONFIG', 
      function ($stateProvider,   $urlRouterProvider, JQ_CONFIG) {
          $urlRouterProvider
              .otherwise('app/home');
          $stateProvider
          .state('app', {
              abstract: true,
              url: '/app',
              templateUrl: 'modules/blocks/app.html'
          })
      }
    ]
  );
