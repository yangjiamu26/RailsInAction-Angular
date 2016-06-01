app.controller('settingUserController', function($scope, $timeout) {
  $scope.ztreeSetting = {
    //
  };

  $scope.ztreeData = [{
      name: "组织目录",
      open: true,
      children: [{
        name: "研发部"
      }, {
        name: "市场部"
      }, {
        name: "财务部"
      }, {
        name: "人事部"
      }, {
        name: "总裁办"
      }]
    }


  ];
});