angular.module('app').controller('serviceServerHostListCtrl', ['$scope', '$filter', 'server', function($scope, $filter, server) {
  server.getHostData(function(data) {
    var Data = data.cloudHostServices;
    _.map(Data, function(num, key) {
      num.priceType = "小时计费";
      num.parameter = num.cpuSize + "core/" + num.memorySize + "G/" + num.diskSize + "G";
    });
    $scope.datas = data.cloudHostServices;

  });
}])