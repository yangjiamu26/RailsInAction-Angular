/**
 * Created by zjt on 2016/8/19 0019.
 */
vsanApp.factory("cnwareFactory", ["Restangular", function (Restangular) {
    "use strict";

    return {
         //查询存储池
        queryCNwarePool: function (queryParams, callback) {
            Restangular.all(urlConfig.get("queryCNwarePool")).post(queryParams).then(callback);
        },
        //查询LUN
        queryCNwareLun: function (queryParams, callback) {
            Restangular.all(urlConfig.get("queryCNwareLun")).post(queryParams).then(callback);
        },
            //获取存储池详情
        poolPref: function (queryParams, callback) {
            Restangular.all(urlConfig.get("poolPref")).post(queryParams).then(callback);
        },
            //获取LUN详情
        lunPref: function (queryParams, callback) {
            Restangular.all(urlConfig.get("lunPref")).post(queryParams).then(callback);
        },
};
}]);
