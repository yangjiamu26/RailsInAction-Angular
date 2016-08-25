/**
    * created by wuchanggui 2014/12/19
    */
vsanApp.controller("cephFSCtrl", ["$scope", "cephfsFactory", "$filter", "$state", "$timeout", "$stateParams",
    function ($scope, cephfsFactory, $filter, $state, $timeout, $stateParams) {
    "use strict";
    /**
        * 初始化函数
        */
    $scope.initPage = function () {
        //存放后台返回的ceph信息列表
        $scope.showflag=true;
        $scope.del_showflag=true;
        $scope.queryShowflagAndClients();
        //初始化按钮可用状态
        //$scope.queryShowflag();
        //初始化cephfs客户端列表
        //$scope.queryCephfsClient();
    };

        //初始化创建ceph文件系统按钮及文件系统
    $scope.queryShowflagAndClients = function(){
         NProgress.start();
        cephfsFactory.checkShowflagAndClients( function (response) {
            if (response.success) {
                    //如果文件系统已经存在
                    if(response.data[0]==1){
                       //如果客户端存在则启动按钮不可用
                        $scope.showflag=true;
                        $scope.del_showflag=true;
                        //显示客户端
                        $scope.clientList = response.data[1];
                    }else if(response.data[0]==2){
                        if(response.data[1]){
                            $scope.showflag=true;
                            $scope.del_showflag=false;
                            var info="[{'tip':'已创建文件系统，无连接客户端！'}]";
                            $scope.clientTip=eval(info);
                        }else{
                            $scope.showflag=false;
                            $scope.del_showflag=true;
                            var info="[{'tip':'未创建文件系统，无连接客户端！'}]";
                            $scope.clientTip=eval(info);
                        }
                    }
            }else{
                $scope.showflag=true;
                $scope.del_showflag=true;
                var info="[{'tip':'初始化失败'}]";
                $scope.clientTip=eval(info);
            }
        })
        NProgress.done();
    };





    // 开启Ceph文件系统
    $scope.enableCephFS = function () {
        //创建过程中创建按钮不可用
        $scope.showflag=true;
        NProgress.start();
        cephfsFactory.addCephFS(function (response) {
            if (response.success) {
                $scope.setSuccNoticeMsg('创建ceph文件系统成功！');
                $scope.showflag=true;
                $scope.del_showflag=false;
                var info="[{'tip':'已创建文件系统，无连接客户端'}]";
                $scope.clientTip=eval(info);
            } else {
                if(response.message=="Illegal operation"){
                    $scope.setFailNoticeMsg('非法操作！');
                    NProgress.done();
                    return;
                }
                //创建失败则创建按钮仍可用
                $scope.showflag=false;
                $scope.setFailNoticeMsg('创建ceph文件系统失败！');
            }
            NProgress.done();
        });
    };


    // 删除Ceph文件系统
    $scope.disableCephFS = function () {
        //删除过程删除按钮不可用
        $scope.del_showflag=true;
        NProgress.start();
        cephfsFactory.deleteCephFS(function (response) {
            if (response.success) {
                $scope.setSuccNoticeMsg('删除ceph文件系统成功！');
                $scope.showflag=false;
                $scope.del_showflag=true;
                var info="[{'tip':'未创建文件系统，无连接客户端'}]";
                $scope.clientTip=eval(info);
            } else {
                if(response.message=="Illegal operation"){
                    $scope.setFailNoticeMsg('非法操作！');
                    NProgress.done();
                    return;
                }
                //删除失败则按钮仍可以使用
                $scope.del_showflag=false;
                $scope.setFailNoticeMsg('删除ceph文件系统失败！');
            }
            NProgress.done();
        });
    };

    //提示对话框
     $scope.showCephMsg = function(msg) {
        $scope.showDialog(msg);
    };

}]);

