'use strict';

/* Controllers */

angular.module('app')
  .controller('AppCtrl', ['$scope', '$translate', '$localStorage', '$window', 'auth', '$auth',
    function(              $scope,   $translate,   $localStorage,   $window, auth, $auth) {
      // add 'ie' classes to html
      var isIE = !!navigator.userAgent.match(/MSIE/i);
      isIE && angular.element($window.document.body).addClass('ie');
      isSmartDevice( $window ) && angular.element($window.document.body).addClass('smart');

      // config
      $scope.app = {
        name: 'Angulr',
        version: '2.0.1',
        // for chart colors
        color: {
          primary: '#7266ba',
          info:    '#23b7e5',
          success: '#27c24c',
          warning: '#fad733',
          danger:  '#f05050',
          light:   '#e8eff0',
          dark:    '#3a3f51',
          black:   '#1c2b36'
        },
        settings: {
          themeID: 1,
          navbarHeaderColor: 'bg-black',
          navbarCollapseColor: 'bg-white-only',
          asideColor: 'bg-black',
          headerFixed: true,
          asideFixed: false,
          asideFolded: false,
          asideDock: false,
          container: false
        }
      }

      // save settings to local storage
      if ( angular.isDefined($localStorage.settings) ) {
        $scope.app.settings = $localStorage.settings;
      } else {
        $localStorage.settings = $scope.app.settings;
      }
      $scope.$watch('app.settings', function(){
        if( $scope.app.settings.asideDock  &&  $scope.app.settings.asideFixed ){
          // aside dock and fixed must set the header fixed.
          $scope.app.settings.headerFixed = true;
        }
        // save to local storage
        $localStorage.settings = $scope.app.settings;
      }, true);

      // angular translate
      $scope.lang = { isopen: false };
      $scope.langs = {"zh-CN": "中文", en:'English', de_DE:'German', it_IT:'Italian'};
      $scope.selectLang = $scope.langs[$translate.proposedLanguage()] || "中文";
      $scope.setLang = function(langKey, $event) {
        // set the current lang
        $scope.selectLang = $scope.langs[langKey];
        // You can change the language during runtime
        $translate.use(langKey);
        $scope.lang.isopen = !$scope.lang.isopen;
      };

      function isSmartDevice( $window )
      {
          // Adapted from http://www.detectmobilebrowsers.com
          var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
          // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
          return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
      }

      $scope.logout = function(){
        $auth.signOut()
        .then(function(resp) {
          auth.logout();
        })
        .catch(function(resp) {
          //still have bugs in /api/auth/sign_out
          auth.logout();
        });
      }

      $scope.leftOpen = function () {
        $scope.$broadcast('leftHello', {message : $scope.message});
      };

      $scope.rightOpen = function () {
        $scope.$broadcast('rightHello', {message : $scope.message});
      };

      $scope.topOpen = function () {
        $scope.$broadcast('topHello', {message : $scope.message});
      };

      $scope.bottomOpen = function () {
        $scope.$broadcast('bottomHello', {message : $scope.message});
      };


  }]);

//left panel controller
angular.module('app').controller('PanelLeftCtrl', ['$scope', 'panels', function ($scope, panels) {

  $scope.$on('leftHello', function(event, args) {

    $scope.message = args.message;

    panels.open("test01");
  });
}]);


//right panel controller
angular.module('app').controller('PanelRightCtrl', ['$scope', 'panels', function ($scope, panels) {

  $scope.$on('rightHello', function(event, args) {

    $scope.message = args.message;

    panels.open("test02");
  });
}]);


//top panel controller
angular.module('app').controller('PanelTopCtrl', ['$scope', 'panels', function ($scope, panels) {

  $scope.$on('topHello', function(event, args) {

    $scope.message = args.message;

    panels.open("test03");
  });
}]);


//bottom panel controller
angular.module('app').controller('PanelBottomCtrl', ['$scope', 'panels', function ($scope, panels) {

  $scope.$on('bottomHello', function(event, args) {

    $scope.message = args.message;

    panels.open("test04");
  });

  //close callback
  $scope.bottomClose = function () {

    window.alert('Close Callback!!');
  };
}]);