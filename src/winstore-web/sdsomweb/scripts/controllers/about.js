'use strict';

/**
 * @ngdoc function
 * @name vsanApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the vsanApp
 */
angular.module('vsanApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
