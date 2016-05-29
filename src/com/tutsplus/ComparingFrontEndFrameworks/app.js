+function(){
  var app = angular.module('com.tutsplus.ComparingFrontEndFrameworks' , ['ui.router', 'ngResource']);

  app.config(function($stateProvider) {
    $stateProvider
      .state('app.contacts', {
        abstract: true,
        url: "/contacts",
        templateUrl: 'com/tutsplus/ComparingFrontEndFrameworks/index.html'
      })
      .state('app.contacts.index', {
        url: "/index",
        controller: 'ContactListController',
        templateUrl: 'com/tutsplus/ComparingFrontEndFrameworks/views/list.html'
      })
      .state('app.contacts.new', {
        url: '/new',
        controller: 'ContactNewController',
        templateUrl: 'com/tutsplus/ComparingFrontEndFrameworks/views/new.html'
      })
      .state('app.contacts.detail', {
        url: "/{id}",
        controller: 'ContactSingleController',
        templateUrl: 'com/tutsplus/ComparingFrontEndFrameworks/views/single.html'
      })
  });

  app.factory('Contacts', function($resource) {
    return $resource('http://localhost:3000/api/contacts/:id', { id: '@id' }, {
      'update': {method: 'PUT'}
    });
  });



  app.controller('ContactListController', function($scope, Contacts) {
    $scope.contacts = Contacts.query();
  });

  app.controller('ContactSingleController', function($scope, Contacts, $stateParams, $state) {

    $scope.contact = Contacts.get({ id: $stateParams.id });

    $scope.update = function() {
      $scope.contact.$update(function(){
        $state.go("app.contacts.index");
      });
    };

    $scope.delete = function() {
      $scope.contact.$delete();
      $state.go("app.contacts.index");
    }
  });


  app.controller('ContactNewController', function($scope, Contacts, $state) {
    $scope.contact = new Contacts();

    $scope.add = function() {
      $scope.contact.$save();
      $state.go("app.contacts.index")
    };
  });
}();