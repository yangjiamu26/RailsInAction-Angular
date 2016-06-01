

angular.module('app').controller('ResourceResourceCtrl', function($scope, $timeout) {


    $scope.tabData   = [
      {
        heading: '云主机',
        route:   'app.resource.resource.host'
      },
      {
        heading: '云硬盘',
        route:   'app.resource.resource.storage'
      },
      {
        heading: '云模板',
        route:   'app.resource.resource.template'
      },
      {
        heading: '资源回收',
        route:   'app.resource.resource.recovery'
      },
      {
        heading: 'IP池',
        route:   'app.resource.resource.ippool'
      }
    ];

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
    name: "资产",
    open: true,
    url: "#/app/resource/property",
    target: "_self",
    children: [{
      name: "机房1",
      url: "#/app/resource/computerroom",
      target: "_self",
      open: true,
      children: [{
        name: "机层1",
        url: "#/app/resource/hostlevel",
        target: "_self",
        open: true,
        children: [{
          name: "机柜1",
          url: "#/app/resource/cabinet",
          target: "_self"
        }, {
          name: "机柜2",
          url: "#/app/resource/cabinet",
          target: "_self"
        }]
      }, {
        name: "机层2"
      }]
    }, {
      name: "机房2",
      open: true,
      children: [{
        name: "机层1"
      }, {
        name: "机层1"
      }, {
        name: "机层1"
      }, {
        name: "机层1"
      }]
    }, {
      name: "机房3",
      isParent: true
    }]
  }];
});