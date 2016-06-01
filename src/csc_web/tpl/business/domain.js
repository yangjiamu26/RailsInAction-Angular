angular.module('app').controller('BusinessDomainCtrl', function($scope, $timeout) {
  $scope.ztreeSetting = {
    view: {
      selectedMulti: false
    },
    data: {
      key: {
        title: "t"
      },
      simpleData: {
        enable: true
      }
    },
    callback: {

    }
  };

  $scope.ztreeData = [{
      name: "业务系统目录",
      open: true,

      children: [{
        name: "业务域1",
        open: true,
        url: "#/app/business/system",
        children: [{
          name: "业务系统1",

          url: "#/app/business/sysdetails",
          target: "_self"
        }, {
          name: "业务系统2"
        }, {
          name: "业务系统3"
        }, {
          name: "业务系统4"
        }]
      }, {
        name: "业务域2",
        children: [{
          name: "业务系统1"
        }, {
          name: "业务系统1"
        }, {
          name: "业务系统1"
        }, {
          name: "业务系统1"
        }]
      }]
    }


  ];
});
