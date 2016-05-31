'use strict';

/* Controllers */
  // signin controller
app.controller('SigninFormController', ['$scope', '$state', 'auth', '$auth', function($scope, $state, auth, $auth) {
    $scope.user = {};
    $scope.authError = null;
    $scope.roles = ["user", "admin"];
    $scope.$on('auth:login-success', function(ev, user) {
      user.roles = [ $scope.roles[user.role_id] ];
      auth.login(user.authentication_token, user);
      $state.go('app.dashboard-v1');
    });
    $scope.$on('auth:login-error', function(ev, reason) {
      $scope.authError = reason.errors[0];
    });
    $scope.login = function() {
      $scope.authError = "";
      $auth.submitLogin($scope.user);
    };

  }])
;
