'use strict';

// signup controller
app.controller('SignupFormController', ['$scope', '$http', '$state', function($scope, $http, $state) {
    $scope.user = {};
    $scope.authError = null;
    $scope.signup = function() {
      $scope.authError = null;
      // Try to create
      $http.post('http://localhost:3000/users.json', {user: {email: $scope.user.email, password: $scope.user.password}})
      .then(function(response) {
        if ( !response.data.authentication_token ) {
          $scope.authError = response;
        }else{
          $scope.user.email = response.data.email;
          $scope.user.authentication_token = response.data.authentication_token;
          $state.go('app.dashboard-v1');
        }
      }, function(x) {
        $scope.authError = 'Server Error';
      });
    };
  }])
 ;