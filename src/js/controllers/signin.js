'use strict';

/* Controllers */
  // signin controller
app.controller('SigninFormController', ['$scope', '$http', '$state', 'auth', function($scope, $http, $state, auth) {
    $scope.user = {};
    $scope.authError = null;
    $scope.login = function() {
      $scope.authError = null;
      // Try to login
      $http.post('http://localhost:3000/users/sign_in.json', {user: {email: $scope.user.email, password: $scope.user.password}})
      .then(function(response) {
        if ( !response.data.authentication_token ) {
          $scope.authError = 'Email or Password not right';
        }else{
          $scope.user.email = response.data.email;
          $scope.user.roles = ["admin"];

          if(response.data.authentication_token){
            alert("登陆成功");
            auth.login(response.data.authentication_token, $scope.user);
            $state.go('app.dashboard-v1');
          }
        }
      }, function(x) {
        $scope.authError = 'Server Error';
      });
    };
  }])
;