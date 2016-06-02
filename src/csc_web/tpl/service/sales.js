app.controller('SalesCtrl', ['$scope', function($scope) {
  $scope.folds = [
    {name: '云主机', filter:''},
    {name: '云硬盘', filter:'starred'},
    {name: '云软件', filter:'sent'},
    {name: '公网IP', filter:'important'},
    {name: '路由器', filter:'draft'},
    {name: 'SSH密钥', filter:'trash'},
    {name: '防火墙', filter:'firewall'},
    {name: '负载均衡器', filter:'tune'}

  ];

}]);

app.controller('MailListCtrl', ['$scope', 'mails', '$stateParams', function($scope, mails, $stateParams) {
  $scope.fold = $stateParams.fold;
  mails.all().then(function(mails){
    $scope.mails = mails;
  });
}]);

app.controller('MailDetailCtrl', ['$scope', 'mails', '$stateParams', function($scope, mails, $stateParams) {
  $scope.mailId = $stateParams.mailId;
  mails.get($stateParams.mailId).then(function(mail){
    $scope.mail = mail;
  })
}]);

app.controller('MailNewCtrl', ['$scope', function($scope) {
  $scope.mail = {
    to: '',
    subject: '',
    content: ''
  }
  $scope.tolist = [
    {name: 'James', email:'james@gmail.com'},
    {name: 'Luoris Kiso', email:'luoris.kiso@hotmail.com'},
    {name: 'Lucy Yokes', email:'lucy.yokes@gmail.com'}
  ];
}]);

angular.module('app').directive('labelColor', function(){
  return function(scope, $el, attrs){
    $el.css({'color': attrs.color});
  }
});