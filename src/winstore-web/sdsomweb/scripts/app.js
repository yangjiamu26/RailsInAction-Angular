'use strict';

/**
 * @ngdoc overview
 * @name vsanApp
 * @description
 * # vsanApp
 *
 * Main module of the application.
 */
var vsanApp = angular
  .module('vsanApp', [
    'ngAnimate',
    'ngCookies',
    'ui.router',
    'restangular'
  ]);

vsanApp.config(function(RestangularProvider) {
	  RestangularProvider.setResponseExtractor(function(response, operation) {
		  if (!response.success && response.message == 'PERMISSION DENIED') {
			window.location = '/sdsomweb/#/login';
		  } else {
			return response;
		  }
	});
});

