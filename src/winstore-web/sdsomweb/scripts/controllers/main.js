'use strict';

/**
    * @ngdoc function
    * @name vsanApp.controller:MainCtrl
    * @description
    * # MainCtrl
    * Controller of the vsanApp
    */
vsanApp.controller('MainCtrl', function ($scope,$state,$rootScope,mainFactory) {
    $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
    ];

    $scope.systemMode = {};
    $scope.systemMode.isNormal = true;

    //ip正则
    var IP_REGEXP = /^((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])$/;
    var ZERO_IP_REGEXP = /^([0]{1,}\.){3}[0]{1,}$/;
    var FULL_IP_REGEXP = /^(255\.){3}255$/;
    // 以字母开头，长度在6-18之间，只能包含字符、数字和下划线。
    var PASSWORD_REGEXP = /^[a-zA-Z]([a-zA-Z0-9_]){5,17}$/;

    $scope.confirm = {};

    $scope.disk = {};
    $scope.initNProgress = function () {
        NProgress.configure({ minimum: 0.8 });
        NProgress.configure({ ease: 'ease', speed: 1000 });
//        NProgress.configure({ showSpinner: false });
    }

    $scope.init = function(){
        $scope.initNProgress();
        $scope.licenseCheck2();
        $scope.storageManageShow = false;//菜单默认收缩
        $scope.cnwareShow = false;
        $scope.nodeManageShow = false;
        $scope.mainManageShow = false;
        $scope.backGroundColor1 ='mainMenuStyle';
        $scope.uName =  urlConfig.get("userName");
        $scope.emergencyModeString = ""

        if($scope.uName){
            addCookie("userName",$scope.uName,0);
        }else{
            $scope.uName = getCookie("userName");
        }

        if (typeof($scope.uName) == "undefined") {
            $state.transitionTo("loginManager");
            return;
        }
        $scope.queryDiskReplaceMode();

        mainFactory.queryAllConfrim(function(datas){
            if(1===datas.success){
                $scope.confirm = datas.data;
            }else{
                $scope.confirm = {
                    critical:"0",
                    warning:"0",
                    info:"0"
                }
            }
        });
        $scope.showSystemMode();
//        //测试数据
//        $scope.serverList = [{"id":"001","servername":"djdyeff@sina.com"},
//                             {"id":"002","servername":"liii@sina.com"},
//                             {"id":"003","servername":"ceshi@sina.com"},
//                             {"id":"004","servername":"123@163.com"}
//        ]
        //查询邮件联系人
        mainFactory.querySysEmail(function (res) {
            if (res.success) {
                $scope.emailList = res.data;
            }
        });
        //查询邮件服务状态
        mainFactory.queryEmailService(function (res) {
            if (res.success) {
                $scope.esEnabled = res.data.enabled;
            }
        });
        mainFactory.queryDiskReplaceMode(function (res) {
            if (res.success) {
                $scope.disk.replaceModeSet = res.data.diskReplaceMode;
                $scope.disk.replaceMode = res.data.diskReplaceMode;
            }
        });
    };
    $scope.queryDiskReplaceMode = function() {
        mainFactory.queryDiskReplaceMode(function (res) {
            if (res.success) {
                $scope.disk.replaceModeSet = res.data.diskReplaceMode;
                $scope.disk.replaceMode = res.data.diskReplaceMode;
            }
        });
    }

    // Check emergence mode
    $scope.showSystemMode = function(){
        mainFactory.querySdsomOpMode(function(datas){
            if(1===datas.success){
                if ('emergency' == datas.data.opmode) {
                    $scope.systemMode.isNormal = false;
                    $scope.emergencyModeString = "管理系统进入维护模式！"
                } else {
                    $scope.systemMode.isNormal = true;
                    $scope.emergencyModeString = ""
                }
            }else{
                $scope.systemMode.isNormal = true;
                $scope.emergencyModeString = ""
            }
        });
    };

    //控制菜单收缩与显示
    $scope.showStorageManage = function(){
        $scope.storageManageShow = !$scope.storageManageShow;
    };
    $scope.showCnwareManage = function(){
        $scope.cnwareShow = !$scope.cnwareShow;
    };
    $scope.showNodeManage = function(){
        $scope.nodeManageShow = !$scope.nodeManageShow;
    };
    $scope.showMainManage = function(){
        $scope.mainManageShow = !$scope.mainManageShow;
    };
    //控制菜单背景色
    $scope.changeBgColor = function(num){
        $scope.backGroundColor1 ='';
        $scope.backGroundColor2 ='';
        $scope.backGroundColor3 ='';
        $scope.backGroundColor4 ='';
        $scope.backGroundColor5 ='';
        $scope.backGroundColor6 ='';
        $scope.backGroundColor7 ='';
        $scope.backGroundColor8 ='';
        $scope.backGroundColor9 ='';
        $scope.backGroundColor10 ='';
        $scope.backGroundColor11 ='';
        $scope.backGroundColor12 ='';
        $scope.backGroundColor13 ='';
        $scope.backGroundColor14 ='';
        $scope.backGroundColor15 ='';
        $scope.backGroundColor16 ='';
        $scope.backGroundColor17 ='';
        $scope.backGroundColor18 ='';
        $scope.backGroundColor19 ='';
        $scope.backGroundColor20 ='';
        $scope.backGroundColor21 ='';
        switch(num){
            case 1:$scope.backGroundColor1 ='mainMenuStyle'; return;
            case 2:$scope.backGroundColor2 ='mainMenuStyle'; return;
            case 3:$scope.backGroundColor3 ='mainMenuStyle'; return;
            case 4:$scope.backGroundColor4 ='mainMenuStyle'; return;
            case 5:$scope.backGroundColor5 ='mainMenuStyle'; return;
            case 6:$scope.backGroundColor6 ='mainMenuStyle'; return;
            case 7:$scope.backGroundColor7 ='mainMenuStyle'; return;
            case 8:$scope.backGroundColor8 ='mainMenuStyle'; return;
            case 9:$scope.backGroundColor9 ='mainMenuStyle'; return;
            case 10:$scope.backGroundColor10 ='mainMenuStyle'; return;
            case 11:$scope.backGroundColor11 ='mainMenuStyle'; return;
            case 12:$scope.backGroundColor12 ='mainMenuStyle'; return;
            case 13:$scope.backGroundColor13 ='mainMenuStyle'; return;
            case 14:$scope.backGroundColor14 ='mainMenuStyle'; return;
            case 15:$scope.backGroundColor15 ='mainMenuStyle'; return;
            case 16:$scope.backGroundColor16 ='mainMenuStyle'; return;
            case 17:$scope.backGroundColor17 ='mainMenuStyle'; return;
            case 18:$scope.backGroundColor18 ='mainMenuStyle'; return;
            case 19:$scope.backGroundColor19 ='mainMenuStyle'; return;
            case 20:$scope.backGroundColor20 ='mainMenuStyle'; return;
            case 21:$scope.backGroundColor21 ='mainMenuStyle'; return;
            }
    };
    //新增server
    $scope.addServer = function () {
        if(!$scope.serverName){
            $scope.showTipMsg("NTP Server 不能为空","serverName");
            //需要改成Tip
            return;
        }
        if (!IP_REGEXP.test($scope.serverName)) {
            $scope.showTipMsg("时间服务器IP不合法！","serverName");
            return;
        }
        if (ZERO_IP_REGEXP.test($scope.serverName) || FULL_IP_REGEXP.test($scope.serverName)) {
            $scope.showTipMsg("时间服务器IP不合法！","serverName");
            return;
        }

        NProgress.start();
        $scope.isAdd = true;
        mainFactory.addServer({"servername":$scope.serverName}, function (response){
            if (response.success) {
                $scope.showDialog("时间服务器添加成功");
                $scope.queryServer();
            } else {
                $scope.showDialog("时间服务器添加失败");
            }
            $scope.isAdd = false;
            NProgress.done();
        })
    }
    //查询server
    $scope.queryServer = function () {
        mainFactory.queryServer(function(response){
            $scope.serverList = response.data;
        })
    }
    //删除server
    $scope.delServer = function () {
        $('#deleteNtp').modal('hide');
        angular.forEach($scope.serverList, function (server,index) {
            if(server.id == $scope.tempObj.id){
                $scope.serverList.splice(index, 1);
            }
        })
        NProgress.start();
        mainFactory.delServer({"id":$scope.tempObj.id},function(response){
            if(!response.success) {
                $scope.showDialog("时间服务器删除失败");
            }
            NProgress.done();
        })
    }
    //配置NTP server取消时，隐藏删除div
    $scope.hideDelDiv = function () {
        $('#deleteNtp').modal('hide');
    }
    //查询SMTP
    $scope.querySmtp = function () {
        mainFactory.querySmtp(function(response){
            $scope.smtp = response.data;
        })
    }
    //配置SMTP
    $scope.addSmtp = function () {
        if($scope.smtp.address == "" || $scope.smtp.address == null){
            $scope.showDialog("配置地址{FQDN或者IP}不能为空");
            return;
        }
        if($scope.smtp.secureMode == "" || $scope.smtp.secureMode == null){
            $scope.showDialog("配置安全模式不能为空");
            return;
        }
        if($scope.smtp.user == "" || $scope.smtp.user == null){
            $scope.showDialog("用户名不能为空");
            return;
        }
        if($scope.smtp.password == "" || $scope.smtp.password == null){
            $scope.showDialog("密码不能为空");
            return;
        }
        $('#dSmtpSet').modal('hide');
        NProgress.start();
        mainFactory.addSmtp($scope.smtp,function(response){
            if (response.success) {
                $scope.showDialog("配置SMTP成功");
            } else {
                $scope.showDialog("配置SMTP失败");
            }
            NProgress.done();
        })
    }
    $scope.rebalance_disabled = false;
    $scope.rebalance_setting = function () {
        $scope.rebalance_disabled = true;
    }

    //配置rebalance时间
    $scope.rebalanceTimeNow = 48;
    $scope.rebalanceTimeOption = "1";
    $scope.getRebalance = function () {
        mainFactory.getRebalance(function (res) {
            if(res.success){
                $scope.rebalanceTimeNow = res.data.mon_osd_down_out_interval
                if ($scope.rebalanceTimeNow > 0 && $scope.rebalanceTimeNow < 60){
                    $scope.rebalanceTimeNow = 1;
                    $scope.rebalanceTimeOption = "2";
                }
                else if($scope.rebalanceTimeNow >= 60 && $scope.rebalanceTimeNow < 60 * 60){
                    $scope.rebalanceTimeNow = $scope.rebalanceTimeNow / 60;
                    $scope.rebalanceTimeOption = "2";
                }
                else if($scope.rebalanceTimeNow >= 60 * 60 && $scope.rebalanceTimeNow < 60 * 60 * 24){
                    $scope.rebalanceTimeNow = $scope.rebalanceTimeNow / (60 * 60);
                    $scope.rebalanceTimeOption = "1";
                }
                else if($scope.rebalanceTimeNow >= 60 * 60 * 24){
                    $scope.rebalanceTimeNow = $scope.rebalanceTimeNow / (60 * 60 * 24);
                    $scope.rebalanceTimeOption = "0";
                }
            }
        });
        $('#RBSet').modal('show');
    }

    $scope.updateRebalance = function () {

        //验证时间段是否为整数
        var time_reg= /^[1-9][0-9]*$/ ;
        if(!time_reg.test($scope.rebalanceTimeNow)) {
            $scope.showTipMsg('只能输入正整数', 'rebalanceTimeNow');
            return;
        }

        var time = 0;
        switch($scope.rebalanceTimeOption){
            case "0":
                time = $scope.rebalanceTimeNow * 24 * 60 * 60;
                break;
            case "1":
                time = $scope.rebalanceTimeNow * 60 * 60;
                break;
            case "2":
                time = $scope.rebalanceTimeNow * 60;
                break;
            };
        mainFactory.updateRebalance({"rebalance_time":time}, function (res) {
            $scope.rebalance_disabled = false;
            $('#RBSet').modal('hide');
            if (res.success) {
                $scope.setSuccNoticeMsg("设置成功");
            }
            else{
                $scope.setFailNoticeMsg("设置失败");
            }
        });
    }
    $scope.rebalance_disabled_reset = function () {
        $scope.rebalance_disabled = false;
    }
    //显示modal
    $scope.showModal = function (id,obj) {
        $scope.tempObj = obj;
        $('#'+id).modal('show');
    }

    //使用对话框来替代系统alert 做提示信息
    $scope.showDialog = function (msg)
    {
        $('#AlertInfo').modal('show');
        $scope.DialogInfo = msg;
    }
    //配置 模式
    $scope.opmodeSet = function(modetype){
        NProgress.start();
        mainFactory.setOpMode({"mode":modetype}, function (res) {
            if (res.success) {
                $scope.setSuccNoticeMsg(res.message);
            }
            NProgress.done();
        });
    }
    //配置NTP Server
    $scope.showNtpSet = function(){
        $scope.serverName = null;
        $scope.queryServer();
        $('#dNtpSet').modal('show');
    }
    $scope.showDiskReplceSet = function(){
        $('#diskReplaceMode').modal('show');
    }
    //配置Email联系人
    $scope.showEmailPeopleSet = function(){
        $scope.sysEmail = "";
        $('#dEmailPeopleSet').modal('show');
    };
    //新增联系人
    $scope.addSysEmail = function (email) {
        if (!email) {
            $scope.showDialog("请填写email地址！");
            return;
        }
        if (!/^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(email)) {
            $scope.showDialog("请填写正确的邮件地址!");
            return;
        }
        NProgress.start();
        mainFactory.addSysEmail({email: email}, function (res) {
            if (res.success) {
                $scope.sysEmail = "";
                //查询邮件联系人
                mainFactory.querySysEmail(function (res) {
                    if (res.success) {
                        $scope.emailList = res.data;
                    }
                });
                $scope.showDialog("添加成功！");
            } else {
                $scope.showDialog(res.message);
            }
            NProgress.done();
        });
    };
    //删除邮件
    $scope.deleteSysEmail = function (email) {
        if (confirm("确定删除" + email.email + "?")) {
            NProgress.start();
            mainFactory.deleteSysEmail(email.id, function (res) {
                if (res.success) {
                    $scope.showDialog("删除成功！");
                    //查询邮件联系人
                    mainFactory.querySysEmail(function (res) {
                        if (res.success) {
                            $scope.emailList = res.data;
                        }
                    });
                } else {
                    $scope.showDialog(res.message);
                }
                NProgress.done();
            })
        }
    };

    //配置Email服务管理
    $scope.showEmailServerSet = function(){
        $('#dEmailServerSet').modal('show');
        //查询邮件服务状态
        mainFactory.queryEmailService(function (res) {
            if (res.success) {
                $scope.esEnabled = res.data.enabled;
            }
        });
    };
    //启用和停用邮件服务
    $scope.enableEs = function () {
        $('#dEmailServerSet').modal('hide');
        NProgress.start();
        mainFactory.updateEmailService($scope.esEnabled, function (res) {
            if (res.success) {
                $scope.showDialog("更新成功！");
            } else {
                $scope.showDialog(res.message);
            }
            NProgress.done();
        })
    };
    //配置SMTP
    $scope.showSmipSet = function(){
        $scope.smtp={};
        $scope.querySmtp();
        $('#dSmtpSet').modal('show');
    }
    //关于
    $scope.showAbout = function(){
        $('#about').modal('show');
    }
    //修改密码
    $scope.showChangePassword = function(){
        $('#changePassword').modal('show');
    }
    //退出
    $scope.showLogout = function () {
        $('#logout').modal('show');
    };

    //授权检测1
    $scope.licenseCheckComplete = false;
    $scope.licenseCheckNum = 0;
    $scope.licenseCheck1 = function(){
            NProgress.start();
            mainFactory.queryAllLicense(function(responseData){
                var trialVersion = false;
                var licenseData  = responseData.data.license_data;
                if(responseData.success == 1 && licenseData.length > 0){
                    $scope.licenseCheckComplete = true;
                    var minData = licenseData[0].expiredtime;
                    for(var i = 0; i < licenseData.length; i ++){
                        if(licenseData[i].license == ""){
                            trialVersion = true;
                        }
                        if(licenseData[i].expiredtime <  minData){
                            minData = licenseData[i].expiredtime;
                        }
                    }
                    if(minData == 0){
                        if(trialVersion){
                            $scope.licenseInfo = "试用许可证已失效！";
                            var obj = document.getElementById("licenseInfo");
                            obj.style.color = "#FA0B0B";
                        }else{
                            $scope.licenseInfo = "商用许可证已失效！";
                            var obj = document.getElementById("licenseInfo");
                            obj.style.color = "#FA0B0B";
                        }
                        return;
                    }
                    var subtract = Math.floor((minData) / (60 * 60 * 24));
                    if(0 < subtract && subtract <= 30){
                        if(trialVersion){
                            $scope.licenseInfo = "您正在使用试用许可证，还有" + subtract + "天失效！";
                        }else{
                            $scope.licenseInfo = "您正在使用商用许可证，还有" + subtract + "天失效！";
                        }
                    }else if(subtract == 0){
                        subtract = Math.floor((minData) / (60 * 60));
                        if(trialVersion){
                            $scope.licenseInfo = "您正在使用试用许可证，还有" + subtract + "小时失效！";
                        }else{
                            $scope.licenseInfo = "您正在使用商用许可证，还有" + subtract + "小时失效！";
                        }
                    }else{
                        $scope.licenseInfo = "";
                    }
                }
                else{
                    $scope.licenseInfo = "";
                }
            NProgress.done();
            });
    };

    //授权检测2
    $scope.licenseCheck2 = function(){
        if($scope.licenseCheckComplete){
            if($scope.licenseCheckProgress) clearTimeout($scope.licenseCheckProgress);
        }else{
            if($scope.licenseCheckNum == 3){
                if($scope.licenseCheckProgress) clearTimeout($scope.licenseCheckProgress);
                $scope.licenseInfo = "License查询失败！";
            }else{
                $scope.licenseCheck1();
                $scope.licenseCheckNum ++;
                if($scope.licenseCheckProgress) clearTimeout($scope.licenseCheckProgress);
                $scope.licenseCheckProgress = setTimeout(function(){
                    $scope.licenseCheck2();
                }, 5000);
            }
        }

    };

    $scope.licenseList = null;
    $scope.used_capacity = null;
    $scope.authorized_capacity = null;
    //授权信息管理
    $scope.licenseQuery_licenseBoxShow = function(type){
        //Alarm
        //Detail
        NProgress.start();
        mainFactory.queryAllLicense(function(responseData){
            if(responseData.success == 1 && responseData.data.license_data.length > 0){
                $scope.licenseList = responseData.data.license_data;
                $scope.used_capacity = responseData.data.used_capacity;
                $scope.authorized_capacity = responseData.data.authorized_capacity;
                if(type == "Alarm"){
                    $scope.licenseAlarmBoxCheck();
                }
                if(type == "Detail"){
                   $scope.licenseDetailBoxShow();
                }
            }
            else{
                $scope.licenseList = null;
                $scope.used_capacity = null;
                $scope.authorized_capacity = null;
            }
        });
        NProgress.done();
    };

    $scope.licenseDetailBoxShow = function(){
        $('#license').modal.defaults.backdrop = "static";
        $('#license').modal.defaults.keyboard = false;
        $("#license").modal('show');
    }

    $scope.licenseAlarmBoxCheck = function(){
        var license_length = $scope.licenseList.length;
        var register_status = false;
        var show_alarm_windows = 0;
        if(license_length == 0){
            return;
        }
        if($scope.licenseList[0].license == ""){
            register_status = false;
        }
        else{
            register_status = true;
        }
        for(var i = 0;i < license_length; i++){
            if (register_status){
                if($scope.licenseList[i].license == ""){
                    show_alarm_windows = 1;
                }
            }
            else{
                if($scope.licenseList[i].license != ""){
                    show_alarm_windows = 1;
                }
            }
        }
        if(show_alarm_windows == 1){
            $('#license_register_alarm').modal.defaults.backdrop = "static";
            $('#license_register_alarm').modal.defaults.keyboard = false;
            $("#license_register_alarm").modal('show');
        }
        else if(show_alarm_windows == 0){
            $scope.licenseDetailBoxShow();
        }
    }

    $scope.closeLicenseBoxCheck = function(){
        var license_length = $scope.licenseList.length;
        var register_status = false;
        //show_alarm_windows 0 代表不需要show license_register_alarm box
        var show_alarm_windows = 0;
        if(license_length == 0){
            return;
        }
        if($scope.licenseList[0].license == ""){
            register_status = false;
        }
        else{
            register_status = true;
        }
        for(var i = 0;i < license_length; i++){
            if (register_status){
                if($scope.licenseList[i].license == ""){
                    show_alarm_windows = 1;
                }
            }
            else{
                if($scope.licenseList[i].license != ""){
                    show_alarm_windows = 1;
                }
            }
        }
        if(show_alarm_windows == 1){
            $('#license_register_alarm').modal.defaults.backdrop = "static";
            $('#license_register_alarm').modal.defaults.keyboard = false;
            $("#license_register_alarm").modal('show');
            $("#license").modal('hide');
        }
        else if(show_alarm_windows == 0){
            $("#license").modal('hide');
        }
    }

    $scope.showLicense_tip = function(){
        $("#license_register_alarm").modal('hide');
        $('#license').modal.defaults.backdrop = "static";
        $('#license').modal.defaults.keyboard = false;
        $("#license").modal('show');
    }

    //显示节点授权详情
    $scope.showLicenseDetail = function(detail){
        //day
        $scope.licenseDetail = detail;
        var day = (detail.expiredtime) / (60 * 60 * 24);
        if(day > 365){
            $scope.expiredtime_str = Math.floor(day / 365) + "年 " + Math.floor(day%365) + "天";
        }else if(1 < day && day <= 365){
            $scope.expiredtime_str = Math.floor(day) + "天 " + Math.floor(day%1*24) + "小时";
        }else if(0 < day && day <= 1){
            //minute
            var minute = day * 24 * 60;
            if(60 < minute){
                $scope.expiredtime_str = Math.floor(minute / 60) + "小时 " + Math.floor(minute%60) + "分钟";
            }else{
                $scope.expiredtime_str = Math.floor(minute) + "分钟";
            }
        }else if(day == 0){
            $scope.expiredtime_str = "已失效";
        }else{
            $scope.expiredtime_str = "异常";
        }
        $scope.newLicense = detail.license;
        $scope.licenseErrorMsg = "";
        $("#license").modal("hide");
        $("#licenseDetail").modal("show");
    };

    //关闭授权详情页面
    $scope.closeLicenseDetail = function(){
        $("#licenseDetail").modal("hide");
        $scope.licenseQuery_licenseBoxShow("Detail");
    };

    //更新授权
    $scope.updateLicense = function(){
        var param = {
            "hostid":$scope.licenseDetail.hostid,
            "license":$scope.newLicense
        };
        NProgress.start();
        $scope.isAdd = true
        mainFactory.updateLicense(param,function(responseData){
            if(responseData.success == 1){
                //更新授权成功
                $scope.licenseErrorMsg = "";
                $scope.closeLicenseDetail();
            }else{
                //更新授权失败
                $scope.licenseErrorMsg = responseData.message;
            }
            NProgress.done();
            $scope.isAdd = false;
        });
    };

    $scope.logout = function () {
        var param = {}
        NProgress.start();
        mainFactory.logout(param,function(responseData){
            $('#logout').modal('hide');
            delCookie("userName");
            urlConfig.remove("userName");
            $state.transitionTo("loginManager");
            NProgress.done();
        });
    }
    //设置定时任务
    clearInterval(mainTimeTicker);
    $scope.checkSystemModeCount = 0;
    $scope.lastIntervalCheckStartTime = Date.parse(new Date());
    $scope.lastIntervalCheckFinishTime = $scope.lastIntervalCheckStartTime;
    var mainTimeTicker = setInterval(function(){
        var milliseconds = Date.parse( new Date());
        if ($scope.lastIntervalCheckStartTime <= $scope.lastIntervalCheckFinishTime && $scope.lastIntervalCheckFinishTime + 15000 < milliseconds) {
            $scope.lastIntervalCheckStartTime = Date.parse(new Date());
            mainFactory.queryAllConfrim(function(datas){  
                if(1===datas.success){
                    $scope.confirm = datas.data;
                };
                $scope.lastIntervalCheckFinishTime = Date.parse(new Date());
            });
        }
        $scope.checkSystemModeCount += 1;
        if ($scope.checkSystemModeCount >= 1) {
            $scope.checkSystemModeCount = 0;
            $scope.showSystemMode();
        }
    },10000);

    //这个操作会在页面切换时候停掉获取告警数量的定时器。但这个定时器应该在所有界面都不需要被停的。
    /*
    $rootScope.$on("$stateChangeStart", cancelTimer);
    function cancelTimer(event, toState, toParams, fromState, fromParams) {
        clearInterval(mainTimeTicker);
    }
    */
    //coockie
    function addCookie(objName,objValue,objHours){//添加cookie
        var str = objName + "=" + escape(objValue);
        if(objHours > 0){//为0时不设定过期时间，浏览器关闭时cookie自动消失
            var date = new Date();
            var ms = objHours*3600*1000;
            date.setTime(date.getTime() + ms);
            str += "; expires=" + date.toGMTString();
        }
        document.cookie = str;
    }

    function getCookie(objName){//获取指定名称的cookie的值
        var arrStr = document.cookie.split("; ");
        for(var i = 0;i < arrStr.length;i ++){
            var temp = arrStr[i].split("=");
            if(temp[0] == objName) return unescape(temp[1]);
        }
    }

    function delCookie(name){//为了删除指定名称的cookie，可以将其过期时间设定为一个过去的时间
        var date = new Date();
        date.setTime(date.getTime() - 10000);
        document.cookie = name + "=a; expires=" + date.toGMTString();
    }

    //修改密码
    $scope.changePD = function(){
        if(!$scope.oldPassword){
            $scope.showTipMsg("原始密码不得为空！","oldPassword");
        }else if(!$scope.newPassword ){
            $scope.showTipMsg("新密码不得为空","newPassword");
        }else if($scope.newPassword != $scope.newPassword2){
            $scope.showTipMsg("两次输入密码不相同，请重新输入","newPassword2");
        }else if($scope.newPassword == $scope.oldPassword){
            $scope.showTipMsg("新密码不得和原始密码相同","newPassword");
        }else if (!PASSWORD_REGEXP.test($scope.newPassword)) {
            $scope.showTipMsg("密码应以字母开头，长度在6-18之间，只能包含字母、数字或下划线！","newPassword");
        }else {
            mainFactory.updatePassword({oldPassword:$scope.oldPassword,newPassword:$scope.newPassword},function(resData){
                if(1==resData.success){
                    $("#changePassword").modal('hide');
//                    $scope.showDialog("修改成功");
                    $scope.logout();
                }else{
                    $scope.showDialog("修改失败");
                    $("#changePassword").modal('hide');
                }
            });
        }
    };
    $scope.updateDiskReplaceMode = function () {
        var data = { "diskReplaceMode" : $scope.disk.replaceMode }
        NProgress.start();
        mainFactory.updateDiskReplaceMode( data, function(res){
            $("#diskReplaceMode").modal('hide');
            if (res.success) {
                $scope.setSuccNoticeMsg("设置成功");
            } else {
                $scope.setFailNoticeMsg("设置失败");
            }
            $scope.queryDiskReplaceMode();
        });
        NProgress.done();
    }

    //跳转到事件Tab
    $scope.goToEvent = function () {
        $state.transitionTo("mainManager.alarm", {type: "Event"});
    };
    //跳转到告警页面
    $scope.goToAlarm = function () {
        $state.transitionTo("mainManager.alarm", {type: ""});
    };

    /**
     * 设置提示信息
    **/
    $scope.setNoticeMsg = function (val) {
        $scope.setNoticeMsg = val;
        if ($scope.noticeTime) clearTimeout($scope.noticeTime);
        $("#failNoticeMsg").hide();
        $("#setNoticeMsg").show();
        $scope.noticeTime = setTimeout(function () {
            $scope.setNoticeMsg = "";
            $scope.noticeTime = null;
            $("#setNoticeMsg").hide();
        }, 0);
    };

    $scope.setSuccNoticeMsg = function (val) {
        $scope.succNoticeMsg = val;
        if ($scope.succTime) clearTimeout($scope.succTime);
        $("#failNoticeMsg").hide();
        $("#succNoticeMsg").show();
        $scope.succTime = setTimeout(function () {
            $scope.succNoticeMsg = "";
            $scope.succTime = null;
            $("#succNoticeMsg").hide();
        }, 5000);
    };
    $scope.setFailNoticeMsg = function (val) {
        $scope.failNoticeMsg = val;
        if ($scope.failTime) clearTimeout($scope.failTime);
        $("#succNoticeMsg").hide();
        $("#failNoticeMsg").show();
        $scope.failTime = setTimeout(function () {
            $scope.failNoticeMsg = "";
            $scope.failTime = null;
            $("#failNoticeMsg").hide();
        }, 5000);
    };
    $scope.setWaitNoticeMsg = function (val) {
        $scope.succNoticeMsg = val;
        $("#failNoticeMsg").hide();
        $("#succNoticeMsg").show();
    };

    $scope.showTipMsg = function (tipMsg, ngModel) {
        var _this = $("[ng-model='"+ngModel+"']");
        _this.data("tipMsg", tipMsg);
        _this.popover("show");
        if (_this.data("timeoutId")) {
            clearTimeout(_this.data("timeoutId"));
        }
        var timeoutId = setTimeout(function () {
            _this.popover("hide");
        }, 3000);
        _this.data("timeoutId", timeoutId);
        _this.focus();
    };
    var selectors = ["#dNtpSet input" , "#changePassword input","#RBSet input"]
    for (var i = 0; i < selectors.length; i++) {
        $(selectors[i]).each(function () {
            var _this = $(this);
            _this.popover({
                trigger: "manual",
                placement: "top",
                html: true,
                content: function () {
                    if (_this.data("tipMsg")) {
                        return "<div>" + _this.data("tipMsg") + "</div>";
                    }
                    return "";
                }
            });
        });

    }
/*    $("#dNtpSet input").each(function () {
        var _this = $(this);
        _this.popover({
            trigger: "manual",
            placement: "top",
            html: true,
            content: function () {
                if (_this.data("tipMsg")) {
                    return "<div style='color:#000;'>" + _this.data("tipMsg") + "</div>";
                }
                return "";
            }
        });
    });
*/
});

Date.prototype.format = function(format){
    var o = {
        "M+" : this.getMonth()+1, //month
        "d+" : this.getDate(), //day
        "h+" : this.getHours(), //hour
        "m+" : this.getMinutes(), //minute
        "s+" : this.getSeconds(), //second
        "q+" : Math.floor((this.getMonth()+3)/3), //quarter
        "S" : this.getMilliseconds() //millisecond
    }

    if(/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }

    for(var k in o) {
        if(new RegExp("("+ k +")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
        }
    }
    return format;
}
