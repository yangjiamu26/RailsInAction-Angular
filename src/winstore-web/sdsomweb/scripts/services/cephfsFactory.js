
/**
    * created by zjt
    * 2016-08-11
    */
vsanApp.factory("cephfsFactory", ["Restangular", function (Restangular) {
    "use strict";
        return{
            //添加Ceph文件系统z
            addCephFS: function (callback) {
                Restangular.all(urlConfig.get("addCephFS")).post().then(callback);
            },
            //删除Ceph文件系统z
            deleteCephFS: function (callback) {
                Restangular.all(urlConfig.get("deleteCephFS")).post().then(callback);
            },
            //查询创建ceph文件系统是否存在及客户端
            checkShowflagAndClients:function(callback){
                Restangular.all(urlConfig.get("checkShowflagAndClients")).post().then(callback);
            }
            }
    }]);