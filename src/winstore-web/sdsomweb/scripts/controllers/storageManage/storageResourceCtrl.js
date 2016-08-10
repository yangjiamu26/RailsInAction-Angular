/*  *
    * created by wuchanggui 2014/12/19
    */
vsanApp.controller("storageResourceCtrl", ["$scope", "storageFactory", "mainFactory", "$filter",
    function ($scope, storageFactory, mainFactory, $filter) {
"use strict";

    $scope.snapModel = {};

    /**
    * 初始化函数
    */
    $scope.initPage = function () {
        $scope.snapLun = 'none';
        $scope.snapModel.sure2deleteSnap = "NO";
        $scope.snapModel.sure2rollbackSnap = "NO";
        $scope.isSnapRollingback = false;
        $scope.snapshotShow = false;//默认不显示快照
        $scope.initiatorShow = false;
        //初始显示存储池tab
        $scope.showTab = "pool";
        //获取存储池列表
        $scope.resourcePoolList();
        //初始化查询参数
        $scope.poolQueryParams = {
            pageno: 1,
            pagesize: 10
        };
        //删除快照如果已经有客户端连接该pool，需要再次确认
        $scope.sure2deleteLunAgain = false;
        //初始化存储策略
        $scope.storagePolicy = {
            default: "replicated",
            replicated: {
                enable: 1,
                default: 1,
                options: [2],
            },
            erasure: {
                enable: 0,
                datablock: {
                    default: 2,
                    options: [2],
                },
                parityblock: {
                    default: 1,
                    options: [1],
                }
            }
        };
        //延迟更新
        var timeoutId = setTimeout(function () {
            $scope.queryStoragePolicy();
        }, 2000);

        //获取存储池列表
        $scope.getPoolList();
        //样式修改
        $(".alarm-tab-header span").click(function (e) {
            if (this.className == "alarm-tab-active") {
                return;
            } else {
                $(this).removeClass("alarm-tab").addClass("alarm-tab-active");
                $(this).siblings().removeClass("alarm-tab-active").addClass("alarm-tab");
            }
        });
        //弹出框控制器
        $scope.modal = {
            message: "", //弹出框标题信息
            to: "", //当前要去做的业务
            sureTo: "", //确定时调用的方法
            set: function (message, to, func) {
                this.message = message;
                this.to = to;
                this.sureTo = func;
            },
            sure: function () {
                //当点击确定按钮，跳转到指定方法
                if (this.sureTo) {
                    this.sureTo();
                }
            }
        };
        //初始化信息提示
        var selectors = ["#poolModal input,select", "#poolAclSet input,select" ]
        for (var i = 0; i < selectors.length ; i++) {
            $(selectors[i]).each(function () {
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
        }
        //主机初始化
        $scope.host = {}, $scope.hostGroup = {};
        //阻止enter提交
        $("input[type='text']").keydown(function (event) {
            if(event.keyCode === 13) {
                event.preventDefault();
                event.returnValue = false;
                return;
            }
        });
    };
    //查询当前客户端ACL状态
    $scope.showInitiatorsSet = function(pool,num) {
        $scope.initiatorErrMsg = "";
        $scope.hideChartDiv();
        $("initiatorTabDiv").hide();
        $("#ShowInitiatorTr").remove();
        $scope.initiators = [];
        if ($scope.pool != 'none' && $scope.initiatorShow ) {
            if ($scope.initiatorShow) {
                $scope.pool = 'none';
            }
            $scope.initiatorShow = !$scope.initiatorShow;
            return ;
        } else {
            $scope.pool = pool;
            $scope.initiatorShow = true;
        }
        var _this = angular.element("#poolTr"+num);
        var content = "<tr id='ShowInitiatorTr' ng-show='snapshotShow'><td colspan=6 style='height:113px;background-color:#253143;'></td></tr>"
        _this.after(content);
        $("#initiatorTabDiv").show().css({left: _this.offset().left+20, top: _this.offset().top +40, width: _this.width()-40});
        // use acl interface for temp and add initiator interface later
        NProgress.start();
        storageFactory.queryPoolAcl(pool.poolName, function(response){
            if( response.success ) {
                $scope.initiatorErrMsg = "";
                var height = (response.data.length) * 38 ;
                $scope.initiators = response.data;
                var _thisTr = angular.element('#poolTr'+num);
                $("#ShowInitiatorTr").show().css({height: 113 + height});
                $("#initiatorTabDiv").show().css({left: _this.offset().left+20, top: _this.offset().top +40, width: _this.width()-40});

            } else {
                $scope.initiatorErrMsg = "initiator查找失败" + response.data ;
            }
        });
        NProgress.done();
    };
    //查询当前LUN下所有快照信息
    $scope.showSnapshot = function(snapLun, num){
        $("#snapTableDiv").hide();
        $('#ShowSnapshotTr').remove();
        $scope.snapshots = [];
        if($scope.snapLun != 'none' && snapLun.poolId===$scope.snapLun.poolId && snapLun.lunId===$scope.snapLun.lunId && $scope.snapshotShow){
            if($scope.snapshotShow){
                $scope.snapLun = 'none';
                $scope.lunIndexNum = 'none';
                $scope.isSnapRollingback = false;
            }
            $scope.snapshotShow = !$scope.snapshotShow;
            return;
        }else{
            $scope.snapLun = snapLun;
            $scope.lunIndexNum = num;
            $scope.snapshotShow = true;//显示快照列表
        };
        $scope.NoSnapErrMsg = "正在加载中...";
        var _this = angular.element('#lunTr'+num);
        var content = "<tr id='ShowSnapshotTr' ng-show='snapshotShow'><td colspan=5 style='height:113px;background-color:#253143;'></td></tr>";
        _this.after(content);
        $("#snapTableDiv").show().css({left: _this.offset().left+20, top: _this.offset().top +40, width: _this.width()-40});
        NProgress.start();
        storageFactory.queryAllSnapshot({poolId: snapLun.poolId, poolName: snapLun.poolName, lunName:snapLun.lunId},function(resData){
            if(1===resData.success){
                var height = (resData.data.length)*38;
                $scope.snapshots = resData.data;
                $scope.isSnapRollingback = false;
                angular.forEach($scope.snapshots, function(obj,index) {
                    if (1===obj.isRollingBack){
                        $scope.isSnapRollingback = true;
                    };
                });
                var _thisTr = angular.element('#lunTr'+num);
                $("#ShowSnapshotTr").show().css({height: 113 + height});
                $("#snapTableDiv").show().css({left: _this.offset().left+20, top: _this.offset().top +40, width: _this.width()-40});
                if ($scope.snapshots.length == 0){
                    $scope.NoSnapErrMsg = "没有快照信息";
                } else {
                    $scope.NoSnapErrMsg = "";
                };
            }else{
                $scope.NoSnapErrMsg = "查找快照失败： " + resData.message;
            }
            NProgress.done();
        });
    };

    $scope.setSnapErrMsg = function(msg) {
        $scope.snapErrMsg = msg;
        var timeoutId = setTimeout(function () {
            $scope.snapErrMsg = "";
        }, 5000);
    };
    $scope.setAclErrMsg = function(msg) {
        $scope.aclErrMsg = msg;
        var timeoutId = setTimeout(function () {
            $scope.snapErrMsg = "";
        }, 5000);
    };
    //取消快照操作时，重新加载快照信息以覆盖修改掉的信息，清掉用户输入的YES
    $scope.cancelSnap = function(){
        $scope.snapLun.sure2Snap = '';
        $scope.sure2Snap = false;
        $("#snapModal").modal("hide");
        $scope.snapshotShow = false;
        $scope.showSnapshot($scope.snapLun, $scope.lunIndexNum);
    }

    $scope.sure2addSnapshotOrRollback = function (addSnapshotOrRollback){
        if ( $scope.snapModel.sure2deleteSnap == 'YES') {
            storageFactory.queryPoolAcl($scope.snapLun.poolName, function (response) {
                if (response.success) {
                    var i = 0;
                    var length = response.data.length;
                    for ( i=0; i<length; i++) {
                        if (response.data[i].state == "active") {
                            if ( $scope.snapLun.sure2Snap != 'YES') {
                                $scope.sure2Snap = true;
                                // hint user that there are some initiators has connect.user can select want to continue.
                                $scope.setSnapErrMsg("请输入大写 'YES' 以确定操作！");
                                break;
                            };
                        }
                    }
                    if (i==length) {
                        addSnapshotOrRollback();
                        return false;
                    };
                }
            });
        } else {
            $scope.setSnapErrMsg("请输入大写 'YES' 以确定操作！");
        }
    }
    //提交请求：添加/修改/删除快照
    $scope.commitSnap = function(){
        var type = $scope.snapCommitType;
        if('add'===type){
            if ($scope.isSnapRollingback == true){
                $scope.setSnapErrMsg("快照回滚操作正在进行中，请稍后再操作");
                return;
            };
            if ($scope.snapLun.status != "正常") {
                $scope.setSnapErrMsg("Lun状态为 " + $scope.snapLun.status + " ，不能执行快照操作");
                return;
            };

            if($scope.snapModel.snapName===undefined){
                //$scope.showTipMsg("快照名称不能为空", "snapModel.snapName");
                $scope.setSnapErrMsg("快照名称不能为空");
                return;
            };
            var nameTest = /^[a-zA-Z0-9]{1,8}$/;
            if(!nameTest.test($scope.snapModel.snapName)){
                //$scope.showTipMsg("快照名称应由数字或字母组成，长度为8", "snapModel.snapName");
                $scope.setSnapErrMsg("快照名称应由数字或字母组成，长度为1至8");
                return;
            };
            if($scope.snapModel.remark===undefined){
                $scope.setSnapErrMsg("快照描述不能为空");
                return;
            };
            if($scope.snapModel.remark.length > 500){
                //$scope.showTipMsg("描述的字数应在500以内", "snapModel.snapName");
                $scope.setSnapErrMsg("描述的字数为:" + $scope.snapModel.remark.length + "，超过了500");
                return;
            };
            var remarkTest = /^[\x00-\x7F]{1,500}$/;
            if(!remarkTest.test($scope.snapModel.remark)){
                //$scope.showTipMsg("快照名称应由数字或字母组成，长度为8", "snapModel.snapName");
                $scope.setSnapErrMsg("描述的字符应为英文字符");
                return;
            };
            var isSnapNameExisted = false;
            angular.forEach($scope.snapshots, function(obj,index) {
                if ($scope.snapModel.snapName == obj.snapName){
                    isSnapNameExisted = true;
                };
            });
            if (isSnapNameExisted == true) {
                //$scope.showTipMsg("快照名称已存在，请使用其它名称", "snapModel.snapName");
                $scope.setSnapErrMsg("快照名称已存在，请使用其它名称");
                return;
            }
            NProgress.start();
            $scope.isAdd = true;
            storageFactory.addSnapshot({poolId:$scope.snapLun.poolId, poolName: $scope.snapLun.poolName, lunName: $scope.snapLun.lunId, snapName: $scope.snapModel.snapName, remark: $scope.snapModel.remark},function(resData){
                $scope.isAdd = false;
                if(1===resData.success){
                    $("#snapModal").modal("hide");
                    $scope.snapshotShow = false;
                    $scope.showSnapshot($scope.snapLun, $scope.lunIndexNum);
                }else{
                    $scope.setSnapErrMsg(resData.message);
                }
                NProgress.done();
            });
        }else if('update'===type){
            if($scope.snapModel.snapName===undefined){
                //$scope.showTipMsg("快照名称不能为空", "snapModel.snapName");
                $scope.setSnapErrMsg("快照名称不能为空");
                return;
            };
            if($scope.snapModel.remark===undefined){
                $scope.setSnapErrMsg("快照描述不能为空");
                return;
            };
            if($scope.snapModel.remark.length > 500){
                //$scope.showTipMsg("描述的字数应在500以内", "snapModel.snapName");
                $scope.setSnapErrMsg("描述的字数为:" + $scope.snapModel.remark.length + "，超过了500");
                return;
            };
            var remarkTest = /^[\x00-\x7F]{1,500}$/;
            if(!remarkTest.test($scope.snapModel.remark)){
                //$scope.showTipMsg("快照名称应由数字或字母组成，长度为8", "snapModel.snapName");
                $scope.setSnapErrMsg("描述的字符应为英文字符");
                return;
            };
            NProgress.start();
            storageFactory.updateSnapshot({poolId:$scope.snapLun.poolId, poolName: $scope.snapLun.poolName, lunName: $scope.snapLun.lunId, snapName: $scope.snapModel.snapName, remark:$scope.snapModel.remark},function(resData){
                if(1===resData.success){
                    $("#snapModal").modal("hide");
                    $scope.snapshotShow = false;
                    $scope.showSnapshot($scope.snapLun, $scope.lunIndexNum);
                }else{
                    $scope.setSnapErrMsg(resData.message);
                }
                NProgress.done();
            });
        }else if('delete'===type){
            if ($scope.isSnapRollingback == true){
                $scope.setSnapErrMsg("快照回滚操作正在进行中，请稍后再操作");
                return;
            };
            if ($scope.snapModel.sure2deleteSnap != "YES") {
                $scope.setSnapErrMsg("请输入大写 'YES' 确认删除操作");
                return;
            };
            NProgress.start();
            $scope.isAdd = true;
            storageFactory.deleteSnapshot({poolId:$scope.snapLun.poolId, poolName: $scope.snapLun.poolName, lunName: $scope.snapLun.lunId, snapName:$scope.snapModel.snapName},function(resData){
                $scope.isAdd = false;
                if(1===resData.success){
                    $("#snapModal").modal("hide");
                    $scope.snapshotShow = false;
                    $scope.showSnapshot($scope.snapLun, $scope.lunIndexNum);
                    $scope.snapModel.sure2deleteSnap = "NO";
                }else{
                    $scope.setSnapErrMsg(resData.message);
                };
                NProgress.done();
            });
        }else if('rollback'===type){
            var checkRollbackInfo = function(){        
                //make sure that user know there are some initiators also connect to this pool.
                if ($scope.isSnapRollingback == true){
                    $scope.setSnapErrMsg("快照回滚操作正在进行中，请稍后再操作");
                    return;
                };
                //坑！进行回滚确认的输入框和进行删除确认的输入框 用了同一个 ，都叫 snapModel.sure2deleteSnap
                if ($scope.snapModel.sure2deleteSnap != "YES") {
                    $scope.setSnapErrMsg("请输入大写 'YES' 确认回滚操作");
                    return;
                };
            };
            var RollbackOperate = function() {
                NProgress.start();
                storageFactory.rollbackSnapshot({poolId:$scope.snapLun.poolId, poolName: $scope.snapLun.poolName, lunName: $scope.snapLun.lunId, snapName:$scope.snapModel.snapName},function(resData){
                    if(1===resData.success){
                        $("#snapModal").modal("hide");
                        $scope.snapshotShow = false;
                        $scope.snapModel.sure2deleteSnap = "NO";
                        $scope.showSnapshot($scope.snapLun, $scope.lunIndexNum);
                    }else{
                        $scope.setSnapErrMsg(resData.message);
                    };
                    NProgress.done();
                });
            }
            $scope.sure2addSnapshotOrRollback( function(){
                checkRollbackInfo();
                RollbackOperate();
                $scope.snapLun.sure2Snap = '';
                $scope.sure2Snap = false;
            });
        }
    };
    //显示操作框
    $scope.showSnapModal = function(type, data){
        $scope.NoSnapErrMsg = "";
        $scope.snapErrMsg = "";
        $scope.snapModel = {};
        $scope.snapCommitType = type;
        if('add'===type){
            $scope.snapModelAdd = true;
            $scope.snapModelUpdate = false;
            $scope.snapModelDelete = false;
            $scope.snapModelRollback = false;
            $scope.snapMessage = '创建快照';
        }else if('update'===type){
            $scope.snapModelAdd = false;
            $scope.snapModelUpdate = true;
            $scope.snapModelDelete = false;
            $scope.snapModelRollback = false;
            $scope.snapMessage = '修改快照描述';
            $scope.snapModel = data;
            $("#snapModal").modal("show");
        }else if('rollback'===type){
            $scope.snapModelAdd = false;
            $scope.snapModelUpdate = false;
            $scope.snapModelDelete = false;
            $scope.snapModelRollback = true;
            $scope.snapMessage = '回滚快照';
            $("#snapModal").modal("show");
            $scope.snapModel = data;
        }else if('delete'===type){
            $scope.snapMessage = '删除快照';
            $scope.snapModel.sure2deleteSnap = "NO";
            $scope.snapModelAdd = false;
            $scope.snapModelUpdate = false;
            $scope.snapModelDelete = true;
            $scope.snapModelRollback = false;
            $scope.snapModel = data;
            $("#snapModal").modal("show");
        }
    };

    /******************************公共函数********************************************/
    /**
    * 查询系统存储策略
    */
    $scope.queryStoragePolicy = function() {
        //查询系统副本数
        storageFactory.resourcePoolStoragePolicy(function (response) {
            if (response.success) {
                $scope.storagePolicy = response.data;
            }
            // TODO: 如果获取失败了...
        });
    };

    $scope.updateErasurePolicy = function(datablock) {
        var range = [];
        for(var i = 1; i < datablock; i++) {
            range.push(i);
        };
        $scope.storagePolicy.erasure.parityblock.options = range;
    };
    /**
    * 显示提示信息
    */
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


    $scope.setStorageErrMsg = function(msg) {
        $scope.errMsg = msg;
        var timeoutId = setTimeout(function () {
            $scope.errMsg = "";
        }, 5000);
    };

    /**
    * 显示弹出框
    */
    $scope.showModal = function (to, obj) {
        $scope.setStorageErrMsg("");
        switch (to) {
        case "enableCephFS":
            $scope.modal.set("开启Ceph文件系统", to, $scope.enableCephFS);
            $("#poolModal").modal("show");
            return;
        case "addPool":
            $scope.modal.message = "创建存储池";
            $scope.modal.to = to;
            $scope.modal.sureTo = $scope.saveOrUpdatePool;
            $scope.apool = {};
            $scope.apool.storagePolicy = $scope.storagePolicy;
            $scope.apool.storagePolicy.selected = $scope.apool.storagePolicy.default;
            $scope.apool.storagePolicy.replicated.selected = $scope.apool.storagePolicy.replicated.default;
            $scope.apool.storagePolicy.erasure.datablock.selected = $scope.apool.storagePolicy.erasure.datablock.default;
            $scope.apool.storagePolicy.erasure.parityblock.selected = $scope.apool.storagePolicy.erasure.parityblock.default;

            var obj=document.getElementById('policySelect');
            obj.options.length=0;

            if($scope.apool.storagePolicy.replicated.enable){
                obj.options.add(new Option("副本策略","replicated"));
            }
            if($scope.apool.storagePolicy.erasure.enable){
                obj.options.add(new Option("纠删码(EC)策略","erasure"));
            }
            $scope.apoolRadios = false;
            $scope.apoolCheck = false;
            return;
        case "updatePool":
            $scope.apool = angular.copy(obj);
            $scope.apool.capacity_tb = ($scope.apool.capacity_bytes/1073741824).toFixed(2);
            $scope.modal.set("重命名存储池", to, $scope.saveOrUpdatePool);
            $("#poolModal").modal("show");
            return;
        case "updatePool":
            $scope.apool = angular.copy(obj);
            $scope.apool.capacity_tb = ($scope.apool.capacity_bytes/1073741824).toFixed(2);
            $scope.modal.set("重命名存储池", to, $scope.saveOrUpdatePool);
            $("#poolModal").modal("show");
            return;
        case "setPoolAccess":
            $scope.spool = angular.copy(obj);
            $scope.spool.capacity_tb = ($scope.apool.capacity_bytes/1073741824).toFixed(2);
            $scope.modal.set("设置存储池访问列表", to, $scope.setPoolAccessList);
            return;
        case "deletePool":
            $scope.pool4Delete = obj;
            $scope.modal.set("删除？", to, $scope.goDeletePool);
            $scope.apool = $scope.apool || {};
            $scope.apool.sure2deletePool = ""
            $("#poolModal").modal("show");
            return;
        case "setChap":
            $scope.poolChap = {
                poolName: obj.poolName,
                username: "",
                password: "",
            };
            $scope.pool4Chap = obj;
            //查询列表
            $scope.getPoolChapList();
            $scope.modal.set("CHAP设置：存储池pool", to, null);
            $("#poolModal").modal("show");
            return;
        case "addLun":
            //查询下拉列表
            $scope.alun = {};
            $scope.resourcePoolList();
            $scope.modal.set("创建LUN", to, $scope.saveOrUpdateLun)
            return;
        case "updateLun":
            if(!obj.disabled){
                $scope.alun = angular.copy(obj);
                $scope.alun.capacity_display = $scope.byteTosUnitSize($scope.alun.capacity_bytes);
                $scope.modal.set("调整LUN容量", to, $scope.saveOrUpdateLun);
                //$scope.getPoolCapacity($scope.alun.poolId);
                $("#poolModal").modal("show");
            }
            return;
        case "deleteLun":
            if(!obj.disabled){
                $scope.lun4Delete = obj;
                $scope.modal.set("删除？", to, $scope.goDeleteLun);
                $scope.alun = $scope.alun || {};
                $scope.alun.sure2deleteLun = "";
                $scope.alun.sure2deleteLunAgain = "";
            	$scope.sure2deleteLunAgain = false;
                $("#poolModal").modal("show");
            }
            return;
        }
    };

    /**
        * 轮换显示标签
        */
    $scope.showPoolTab = function () {
        $scope.showTab = "pool";
        $scope.getPoolList();
    };
    $scope.showLunTab = function () {
        $scope.showTab = "lun";
        $scope.getLunList();
    };
    $scope.showViewTab = function () {
        $scope.showTab = "view";
        $scope.tabChange();
    };

    /**
        * tab切换时清除函数
        */
    $scope.tabChange = function () {
        $scope.hideChartDiv();
        $scope.hideSnapTable();
        $scope.hideAclSet();
    };
    $scope.hideAclSet = function () {
        $("initiatorTabDiv").hide();
        $("#ShowInitiatorTr").remove();
        $scope.initiatorShow = false;
    };
    $scope.hideChartDiv = function() {
        $("#chartDiv").hide();
        $(".rrr").remove();
        $(".lrrr").remove();
    };
    $scope.hideSnapTable = function() {
        $("#snapTableDiv").hide();
        $('#ShowSnapshotTr').remove();
        $scope.snapshotShow = false;
    };

    /**
        * 增加选中样式
        */
    $scope.checkedOrNot = function (isOrNot) {
        if (isOrNot) {
            return "url('/sdsomweb/images/storage/btn_fuxuan_select.png') no-repeat left 55%";
        } else {
            return "url('/sdsomweb/images/storage/btn_fuxuan_default.png') no-repeat left 55%";
        }
    };
    /******************************公共函数完********************************************/

    /******************************存储池增删改查****************************************/
    //将系统容量全部给当前存储池
    $scope.givePoolAllCapacity = function () {
        $scope.apoolRadios = !$scope.apoolRadios;
    };

    //显示高级选项
    $scope.showRepSelect = function () {
        $scope.apoolCheck = !$scope.apoolCheck;
    };

    /**
    * 查询存储池列表
    */
    $scope.getPoolList = function () {
        //清除详情
        $scope.tabChange();

        $scope.queryStoragePolicy();

        //查询列表
        NProgress.start();
        storageFactory.queryResourcePool($scope.poolQueryParams, function (response) {
            if (response.success) {
                $scope.poolList = response.data[0];
                $scope.showflag = response.data[1];
                $scope.hideAclSet();
            }
            NProgress.done();
        });
    };

    //添加或修改存储池
    $scope.saveOrUpdatePool = function () {
        var lower_re = /^[a-z]{1,16}$/ ;
            if (!lower_re.test($scope.apool.poolName)) {
                $scope.showTipMsg("存储池名称必须由1到16个小写字母组成", "apool.poolName");
            return;
        }
        if (!$scope.apool.poolId && !$scope.apool.poolName) {
            $scope.showTipMsg("存储池名称不能为空", "apool.poolName");
            return;
        }
        if (!lower_re.test($scope.apool.newName)) {
            $scope.showTipMsg("存储池名称必须由1到16个小写字母组成", "apool.newName");
            return;
        }

        if ($scope.apool.poolId && !$scope.apool.newName) {
            $scope.showTipMsg("新存储池名称不能为空", "apool.newName");
            return;
        }

        var pool;
        if ($scope.apool.existed) {
            var poolNameExists = false;
            angular.forEach($scope.poolList, function(poolTemp,index){
                if (poolTemp.poolName == $scope.apool.newName) {
                    poolNameExists = true;
                    return;
                };
            });
            if (poolNameExists == true){
                $scope.showTipMsg("名称已存在", "apool.newName");
                return;
            };

            pool = {
                poolId: $scope.apool.poolId,
                poolName: $scope.apool.poolName,
                newPoolName: $scope.apool.newName,
            }
            NProgress.start();
            $scope.isAdd = true;
            storageFactory.updateResourcePool(pool, function (response) {
                if (response.success) {
                    //获取存储池列表
                    $scope.getPoolList();
                    $("#poolModal").modal("hide");
                } else {
                    $scope.setStorageErrMsg(response.message);
                }
                NProgress.done();
                $scope.isAdd = false;
            });
        } else {
            var poolNameExists = false;
            angular.forEach($scope.poolList, function(poolTemp,index){
                if (poolTemp.poolName == $scope.apool.poolName) {
                    poolNameExists = true;
                    return;
                };
            });
            if (poolNameExists == true){
                $scope.showTipMsg("名称已存在", "apool.poolName");
                return;
            };
            $scope.isAdd = true;
            spinner.show();
            pool = {
                poolName: $scope.apool.poolName,
                storagePolicy: {
                    policy: $scope.apool.storagePolicy.selected,
                    replicated: {
                        size: $scope.apool.storagePolicy.replicated.selected + 1,
                    },
                    erasure: {
                        datablock: $scope.apool.storagePolicy.erasure.datablock.selected,
                        parityblock: $scope.apool.storagePolicy.erasure.parityblock.selected
                    },
                },
            }
            NProgress.start();
            storageFactory.addResourcePool(pool, function (response) {
                spinner.hide();
                $scope.isAdd = false;
                if (response.success) {
                    //获取存储池列表
                    $scope.getPoolList();
                    $("#poolModal").modal("hide");
                } else {
                    $scope.setStorageErrMsg(response.message);
                }
                NProgress.done();
            });
        }
    };
    // 开启Ceph文件系统
    $scope.enableCephFS = function () {
        NProgress.start();
        $scope.isAdd = true;
        storageFactory.enableCephFS(function (response) {
            if (response.success) {
                $("#poolModal").modal("hide");
                $("#cephbtn").prop('disabled', true);
            } else {
                $scope.setStorageErrMsg(response.message);
            }
            NProgress.done();
            $scope.isAdd = false;
        });
    };

    /**
    * 删除存储池
    */
    $scope.goDeletePool = function () {
    if ($scope.apool.sure2deletePool == "YES") {
        NProgress.start();
        $scope.isAdd = true;
        storageFactory.deleteResourcePool($scope.pool4Delete.poolId, $scope.pool4Delete.poolName, function (response) {
            if (response.success) {
                //获取存储池列表
                $scope.getPoolList();
                $("#poolModal").modal("hide");
            } else {
                $scope.setStorageErrMsg(response.message);
            }
            NProgress.done();
            $scope.isAdd = false;
        });
    } else {
        //$scope.setStorageErrMsg("请输入大写 'YES' 以确定删除操作！");
         $scope.showTipMsg("请输入大写 'YES' 以确定删除操作！",'apool.sure2deletePool');
    }
    };

    //获取chap列表
    $scope.getPoolChapList = function () {
        $scope.poolChapList = null;
        NProgress.start();
        storageFactory.queryPoolChap($scope.pool4Chap.poolName, function (res) {
            if (res.success ){
                $scope.poolChapList = res.data.chapList;
            } else {
                $scope.poolChapList = null;
                $scope.showDialog("CHAP认证查询失败");
            }
        });
        NProgress.done();
    };
    //增加chap
    $scope.addPoolChap = function () {
        if (!$scope.poolChap.username || $scope.poolChap.username.length < 12) {
            $scope.showTipMsg("不小于12字符！", "poolChap.username");
            return;
        }
        if (!$scope.poolChap.password || $scope.poolChap.password.length < 12) {
            $scope.showTipMsg("不小于12字符！", "poolChap.password");
            return;
        }
        if ($scope.poolChap.mutul) {
            if (!$scope.poolChap.mutulUsername || $scope.poolChap.mutulUsername.length < 12) {
                $scope.showTipMsg("不小于12字符！", "poolChap.mutulUsername");
                return;
            }
            if (!$scope.poolChap.mutulPassword || $scope.poolChap.mutulPassword.length < 12) {
                $scope.showTipMsg("不小于12字符！", "poolChap.mutulPassword");
                return;
            }
        }
        NProgress.start();
        storageFactory.addPoolChap($scope.poolChap, function (res) {
            if (res.success) {
                $scope.getPoolChapList($scope.pool4Chap.poolName);
            } else {
                $scope.setStorageErrMsg('CHAP验证添加失败');
            }
            NProgress.done();
        });
    };
    //删除chap
    $scope.deletePoolChap = function (chap) {
        chap.poolName = $scope.pool4Chap.poolName;
        NProgress.start();
        storageFactory.deletePoolChap(chap, function (res) {
            if (res.success) {
                $scope.getPoolChapList($scope.pool4Chap.poolName);
            } else {
                $scope.setStorageErrMsg(response.message);
            }
            NProgress.done();
        });
    };
    /******************************存储池增删改查完****************************************/

    /******************************存储池授权控制****************************************/
    /*show dialog to operate pool's acl*/
        $scope.showPoolAclSet = function(pool){
            $scope.pool = pool;
            $scope.initiator = "";
            $scope.initiatorList = [];
            $scope.unauthInitiatorShow = false;
            $scope.unauthInitiatorList = [];
            $scope.queryPoolAcl(pool.poolName);
            $('#poolAclSet').modal('show');
        };

    /*add approval */
    $scope.addPoolAcl = function(initiator, poolName){
        if (initiator == ""){
            $scope.showTipMsg("名称不能为空。","initiator");
            return ;
        }

        var aclParams = {initiator:initiator, poolName:poolName};
        $scope._initiator = initiator;
        $scope._poolName = poolName;
        storageFactory.queryPoolAcl(poolName, function (response) {
            if (response.success) {
                var length = response.data.length;
                for (var i=0; i<length; i++) {
                    if (response.data[i].approved == 'yes') {
                        $('#sure2AddAcl').modal('show');
                        return;
                    }
                }
                NProgress.start();
                storageFactory.addPoolAcl(aclParams, function (response) {
                    if (response.success) {
                        $scope.queryPoolAcl(poolName);
                        $scope.initiator = "";
                    } else {
                        $scope.showDialog(response.message);
                    }
                    NProgress.done();
                });
            }
        });
    };

    /*query acl */
    $scope.queryPoolAcl = function(poolName){
        $scope.initiatorList = [];
        $scope.unauthInitiatorList = [];
        storageFactory.queryPoolAcl(poolName, function (response) {
            if (response.success) {
                var height = (response.data.length) * 38 ;
                $("#ShowInitiatorTr").show().css({height: 113 + height});
                $scope.initiators = response.data;
                var i = 0; length = response.data.length ;
                for (i = 0; i < length; i++){
                    if (response.data[i].approved == "yes") {
                        $scope.initiatorList.push(response.data[i].name);
                    } else {
                        $scope.unauthInitiatorList.push(response.data[i].name);
                    }
                }
            } else {
                $scope.showDialog("查询客户端访问控制列表失败");
            }
        });
    };

    /*remove approval */
    $scope.deletePoolAcl = function(initiator, poolName){
        var aclParams = {initiator:initiator, poolName:poolName};
        NProgress.start();
        //query acl and if the initiator is active , reject operation
        storageFactory.queryPoolAcl(poolName, function (response) {
            if (response.success) {
                var i = 0;
                var length = response.data.length ;
                for (i = 0 ; i < length; i++){
                    if (response.data[i].name == initiator) {
                        if (response.data[i].state == "active") {
                            $scope.showDialog("有客户端正在连接，请先断开连接");
                        }
                        else {
                            storageFactory.deletePoolAcl(aclParams, function (response) {
                                if (response.success) {
                                    $scope.queryPoolAcl(poolName);
                                } else {
                                    $scope.showDialog("取消授权失败");
                                }
                            });
                        }
                        break;
                    }
                }// end for
            } else {
                $scope.showDialog("取消授权失败");
            } 
        });
        NProgress.done();
    };

    /*delete initiator */
    $scope.delPoolInitiator = function(poolName, initiator) {
        var params = {initiator:initiator, poolName:poolName};
        NProgress.start();
        storageFactory.delPoolInitiator(params, function (response) {
            if (response.success) {
                $scope.queryPoolAcl(poolName);
            } else {
                $scope.showDialog("删除客户端失败，可能是网络不通或者该客户端状态为已连接");
            }
            NProgress.done();
        });
    }
    $scope.sure2AddApprovedShow = function(poolName) {
        storageFactory.queryPoolAcl(poolName, function (response) {
            if (response.success) {
                var length = response.data.length;
                for (var i=0; i<length; i++) {
                    if (response.data[i].approved == "yes") {
                        // there are some initiator has approved , need user make 
                        $('#sure2AddAcl').modal('show');
                        return false;
                    }
                }
                return true;
            }
        });
    }

    $scope.sure2AddApprovedHide = function() {
        $scope.sure2AddApproved = null;
    }

    $scope.sure2AddApprovedOperate = function() {
        var params = {initiator:$scope._initiator, poolName:$scope._poolName};
        if ($scope.sure2AddApproved == 'YES') {
            NProgress.start();
            storageFactory.addPoolInitiator(params, function (response) {
                if (response.success) {
                    $scope.queryPoolAcl($scope._poolName);
                } else {
                    $scope.showDialog("添加授权失败");
                }
            });
            $('#poolAclSet').modal('hide');
            $('#sure2AddAcl').modal('hide');
            $scope.sure2AddApproved = null;
        NProgress.done();
        } else {
            $scope.setAclErrMsg("请输入大写 'YES' 确认");
        }
    }
    /* add initiator */
    $scope.addPoolInitiator = function(initiator, poolName) {
         var lower_re = /^[a-z]{1,8}$/ ;
        if (initiator == ""){
            $scope.showTipMsg("名称不能为空。","initiator");
            return ;
        }
        //使用正则表达式判断是否为小写字母
        if(!lower_re.test(initiator)){
            $scope.showTipMsg("必须由1到8位小写字母组成","initiator");
            return ;
        }
        var params = {initiator:initiator, poolName:poolName};
        storageFactory.queryPoolAcl(poolName, function (response) {
            if (response.success) {
                var length = response.data.length;
                for (var i=0; i<length; i++) {
                    if (response.data[i].approved == "yes") {
                        $scope._initiator = initiator;
                        $scope._poolName = poolName;
                        // there are some initiator has approved , need user make 
                        $('#poolAclSet').modal('hide');
                        $('#sure2AddAcl').modal('show');
                        return;
                    }
                }
                NProgress.start();
                storageFactory.addPoolInitiator(params, function (response) {
                    if (response.success) {
                        $scope.queryPoolAcl(poolName);
                    } else {
                        $scope.showDialog("添加授权失败");
                    }
                    NProgress.done();
                });
                $('#poolAclSet').modal('hide');
            }
        });
    }

    /******************************存储池授权控制结束****************************************/

    /******************************LUN增删改查****************************************/
    /**
        * 动态查询存储池容量
        */
    $scope.$watch("alun.poolId", function (poolId) {
        if (poolId) {
            storageFactory.resourcePoolCapacity(poolId, function (response) {
                if (response.success) {
                    $scope.alun.capacity_tb_have = (response.data.capacity_bytes / 1073741824).toFixed(2);
                } else {
                    $scope.showDialog(response.message);
                    $scope.alun.capacity_tb_have = 0;
                }
            });
        } else {
            if ($scope.alun) $scope.alun.capacity_tb_have = 0;
        }
    });
    $scope.getPoolCapacity = function (poolId) {
    if (poolId) {
        storageFactory.resourcePoolCapacity(poolId, function (response) {
            if (response.success) {
                $scope.alun.capacity_tb_have = (response.data.capacity_bytes / 1073741824).toFixed(2);
            } else {
                $scope.showDialog(response.message);
                $scope.alun.capacity_tb_have = 0;
            }
        });
    } else {
        if ($scope.alun) $scope.alun.capacity_tb_have = 0;
    }
    };

    /**
    * 查询存储池列表
    */
    $scope.resourcePoolList = function () {
        //查询列表
        NProgress.start();
        storageFactory.resourcePoolList(function (response) {
            if (response.success) {
                $scope.apoolList = response.data[0];
                $scope.showflag = response.data[1];
            }
            NProgress.done();
        });
    };
    /**
    * 查询LUN列表
    */
    $scope.getLunList = function () {
        //清除详情
        $scope.tabChange();
        //查询列表
        NProgress.start();
        storageFactory.queryResourceLun($scope.poolQueryParams, function (response) {
            if (response.success) {
                $scope.lunList = response.data;
                $scope.hideSnapTable();
            }
            NProgress.done();
        });
    };

    /**
    * 带单位的大小转为字节数
    */
    $scope.unitSizeToBytes = function (unitValue) {
        //清除详情
        var array=new Array('Byte','KB','MB','GB','TB');
        var index = -1;
        for(var i = 0; i < array.length; i++){ //记录所在的位置
            if(unitValue.indexOf(array[i])!=-1){
                index=i;
                break;
            }
        };
        if (index == -1 || index < 2){
            // 单位不合法，至少需要MB
            return -1
        };
        var size = parseFloat(unitValue.substring(0,(unitValue.length-2))); //得到纯数字
        if (isNaN(size)){
            // 单位前面应为数据格式
            return -1
        };
        size *= Math.pow(1024, index)
        size = size.toFixed(0)
        return size;
    };

    /**
    * 字节数转为带单位的大小
    */
    $scope.byteTosUnitSize = function (byteValue) {
        if (!byteValue || isNaN(byteValue)) {
            return "";
        };
        var array = new Array('B','KB','MB','GB','TB');
        var index = -1;
        var value = byteValue;
        for (var i = 0; i < array.length; i++) {
            if (value < 1024) {
                index = i;
                break;
            }
            value /= 1024;
        }
        return (value).toFixed(2) + array[index]
    };

    //添加或修改LUN
    $scope.saveOrUpdateLun = function () {
        if (!$scope.alun.lunId) {
            $scope.showTipMsg("LUN ID不能为空", "alun.lunId");
            return;
        }
        if (isNaN($scope.alun.lunId)) {
            $scope.showTipMsg("LUN ID 必须为数字！", "alun.lunId");
            return;
        }
        if ($scope.alun.lunId > 254 || $scope.alun.lunId < 1) {
            $scope.showTipMsg("LUN ID 应为1至254之间的数字！", "alun.lunId");
            return;
        }
        if (!$scope.alun.poolName) {
            $scope.showTipMsg("请选择存储池！", "alun.poolName");
            return;
        }
        if (!$scope.alun.capacity_display) {
            $scope.showTipMsg("LUN容量不能为空", "alun.capacity_display");
            return;
        }
        var capacity_bytes = $scope.unitSizeToBytes($scope.alun.capacity_display)
        if (capacity_bytes == -1) {
            $scope.showTipMsg("容量输入不合法，单位需为MB、GB或TB！", "alun.capacity_display");
            return;
        }
        if (capacity_bytes < Math.pow(1024, 2)) {
            $scope.showTipMsg("容量最小支持 1MB", "alun.capacity_display");
            return;
        }
        if (capacity_bytes > (200*Math.pow(1024, 4))) {
            $scope.showTipMsg("容量最大支持 200TB", "alun.capacity_display");
            return;
        }

    var lun;
    //$("#poolModal").modal("hide");
    if ($scope.alun.existed) {
        if (capacity_bytes < $scope.alun.capacity_bytes){
            $scope.showTipMsg("容量不可小于原容量的大小：" + $scope.byteTosUnitSize($scope.alun.capacity_bytes), "alun.capacity_display");
            return;
        };
        lun = {
            lunId: $scope.alun.lunId,
            poolName: $scope.alun.poolName,
            capacity_bytes: capacity_bytes
        }
        NProgress.start();
        $scope.isAdd = true;
        storageFactory.updateResourceLun(lun, function (response) {
            if (response.success) {
                //获取LUN列表
                $scope.getLunList();
                //alert("修改成功！");
                $("#poolModal").modal("hide");
            } else {
                $scope.setStorageErrMsg(response.message);
            }
            NProgress.done();
            $scope.isAdd = false;
        });
    } else {
        lun = {
            lunId: $scope.alun.lunId,
            poolName: $scope.alun.poolName,
            capacity_bytes: capacity_bytes
        }
        spinner.show();
        $scope.isAdd = true;
        NProgress.start();
        storageFactory.addResourceLun(lun, function (response) {
            spinner.hide();
            $scope.isAdd = false;
            if (response.success) {
                //获取LUN列表
                $scope.getLunList();
                $("#poolModal").modal("hide");
            } else {
                $scope.setStorageErrMsg(response.message);
            }
            NProgress.done();
        });
    }
};

    /**
        * 删除LUN
        */
    $scope.goDeleteLun = function () {
        //$("#poolModal").modal("hide");
        if ($scope.alun.sure2deleteLun == "YES") {
            $scope.isAdd = true;
            // if some initiator has connect the pool ,need user to sure delete the lun again
            if (!$scope.sure2deleteLunAgain) {
                storageFactory.queryPoolAcl($scope.lun4Delete.poolName, function (response) {
                    if (response.success) {
                        var length = response.data.length;
                        for (var i=0; i< length; i++) {
                            if (response.data[i].state == "active"){
                                $scope.sure2deleteLunAgain = true;
                                $scope.isAdd = false;
                                return;
                            }
                        }
                        NProgress.start();
        		$scope.isAdd = true;
                        storageFactory.deleteResourceLun($scope.lun4Delete, function (response) {
            		$scope.lun4Delete.disabled = true;
                            if (response.success) {
                                //获取LUN列表
                                $scope.getLunList();
                                $("#poolModal").modal("hide");
                            } else {
                                $scope.setStorageErrMsg(response.message);
                            }
                            $scope.isAdd = false;
                            NProgress.done();
                        });
                    }

                });
            } else {
                if ($scope.alun.sure2deleteLunAgain == 'YES') {
                    NProgress.start();
                    storageFactory.deleteResourceLun($scope.lun4Delete, function (response) {
                        if (response.success) {
                            //获取LUN列表
                            $scope.getLunList();
                            $("#poolModal").modal("hide");
                        } else {
                            $scope.setStorageErrMsg(response.message);
                        }
                        $scope.isAdd = false;
                        NProgress.done();
                    });
                }
            }
        } else {
            $scope.setStorageErrMsg("请输入大写 'YES' 以确定删除操作!");
        }
        $scope.sure2deleteLunAgain = false;
    };

    /******************************LUN增删改查完****************************************/

    /*********************************详情图形展示*******************************************/
    $(window).resize(function () {
        if ($scope.poolOrLun && $scope.poolTrIdTemp && $("#chartDiv").is(":visible")) {
            $scope.dblClick($scope.poolTrIdTemp, $scope.poolOrLun);
            $scope.dblClick($scope.poolTrIdTemp, $scope.poolOrLun);
        }
    });
    /**
    * 双击显示详情
    */
    $scope.dblClick = function (id, pool) {
        $scope.hideAclSet();
        var _this = $("#poolTr"+id);
        if ($scope.poolTrIdTemp) {
            var _that = $(".rrr");
            if ($scope.poolTrIdTemp == id && _that.length > 0) {
                $("#chartDiv").hide();
                _that.remove();
                return;
            }
            _that.remove();
        }
        var content = "<tr class=rrr><td colspan=9 style='height:430px;background-color:#253143;'></td></tr>";
        _this.after(content);
        $("#chartDiv").show().css({left: _this.offset().left, top: _this.offset().top + 37, width: _this.width()});
        $scope.poolOrLun = pool;
        $scope.poolTrIdTemp = id;
        $("#chartDiv").height(430);
        setTimeout($scope.canvas, 10);
    };
    /**
        * lun双击显示详情
        */
    $scope.lunDblClick = function (id, lun) {
        var _this = $("#lunTr"+id);
        if ($scope.lunTrIdTemp) {
            var _that = $(".lrrr");
            if ($scope.lunTrIdTemp == id && _that.length > 0) {
                $("#chartDiv").hide();
                _that.remove();
                return;
            }
            _that.remove();
        }
        var content = "<tr class=lrrr><td colspan=9 style='height:180px;background-color:#253143;'></td></tr>";
        _this.after(content);
        $("#chartDiv").show().css({left: _this.offset().left, top: _this.offset().top + 37, width: _this.width()});
        $scope.poolOrLun = lun;
        $scope.lunTrIdTemp = id;
        $("#chartDiv").height(180);
        setTimeout($scope.canvas, 10);
    };

    /**
        * 绘制详情图
        */
    $scope.canvas = function () {
        //集群IOPS
        $scope.iopsChart = echarts.init(document.getElementById("iops"));
        //集群宽度
        $scope.mbpsChart = echarts.init(document.getElementById("mbps"));
        //时延
        //if (!$scope.capacityChart) $scope.capacityChart = echarts.init(document.getElementById("capacity"));
        //图形请求参数
        var queryParmas;
        if ($scope.poolOrLun.lunId) {
            queryParmas = {
            "lunId": $scope.poolOrLun.lunId,
            "from": "-1w",
            "target": "iops.rw mbps.rw capacity.rw"
            }
            storageFactory.lunPref(queryParmas, function (response) {
                if (response.success) {
                    var time = [];
                    var iops = [];
                    var mbps = [];
                    var capacity = [];
                    var datas = response.data.datapoints;
                    var maxIops = 0, maxMbps = 0;
                    for (var i = 0; i < datas.length; i++) {
                        time.push($filter("date")(1000*datas[i][0], "MM-dd"));
                        iops.push(datas[i][1]);
                        mbps.push(parseFloat((datas[i][2] / 1024).toFixed(2)));
                        capacity.push((datas[i][3]/ (1024 * 1024 * 1024)).toFixed(2));
                        if (datas[i][1] > maxIops) maxIops = datas[i][1];
                        if (datas[i][2] > maxMbps) maxMbps = datas[i][2];
                    }
                    var interval = Math.round(datas.length / 16);
                    maxMbps = parseInt((maxMbps/1024)) + 1;
                    $scope.iopsChart.setOption(iopsOption(time, iops, interval, maxIops), true);
                    $scope.mbpsChart.setOption(mbpsOption(time, mbps, interval, maxMbps), true);
                    //$scope.capacityChart.setOption(capacityOption(time,capacity,maxCapacity,interval), true);
                }
            });
        } else {
            queryParmas = {
            "poolId": $scope.poolOrLun.poolId,
            "from": "-1w",
            "target": "iops.rw mbps.rw capacity.rw"
            }
            storageFactory.poolPref(queryParmas, function (response) {
                if (response.success) {
                    var time = [];
                    var iops = [];
                    var mbps = [];
                    var capacity = [];
                    var datas = response.data.datapoints;
                    var maxIops = 0, maxMbps = 0;
                    for (var i = 0; i < datas.length; i++) {
                        time.push($filter("date")(1000*datas[i][0], "MM-dd"));
                        iops.push(datas[i][1]);
                        mbps.push(parseFloat((datas[i][2]/1024).toFixed(2)));
                        capacity.push((datas[i][3]/1073741824).toFixed(2));
                        if (datas[i][1] > maxIops) maxIops = datas[i][1];
                        if (datas[i][2] > maxMbps) maxMbps = datas[i][2];
                    }
                    var interval = Math.round(datas.length / 8);
                    maxMbps = parseInt((maxMbps/1024)) + 1;
                    $scope.iopsChart.setOption(iopsOption(time, iops, interval, maxIops), true);
                    $scope.mbpsChart.setOption(mbpsOption(time, mbps, interval, maxMbps), true);
                    //$scope.capacityChart.setOption(capacityOption(time,capacity,maxCapacity,interval), true);
                }
            });
        }
    };

    //绘制使用空间图
    var fSummaryOption = function(usedSpace,freeSpace){
        return {
            calculable : false,
            series : [
                {
                    name:'存储资源',
                    type:'pie',
                    center:['50%','50%'],
                    radius : ['60%', '80%'],
                    itemStyle : {
                        normal : {
                            label : {
                                show : false,
                                formatter : function (a,b,c){
                                    return 100 - c + '%'
                            },
                                textStyle: {
                                    baseline : 'top'
                                }
                            },
                            labelLine : {
                                show : false
                            }
                        },
                        emphasis : {
                            label : {
                                show : true,
                                position : 'center',
                                textStyle : {
                                    fontSize : '20',
                                    fontWeight : 'bold'
                                }
                            }
                        }
                    },
                    data:[
                        {
                            name: "使用空间",
                                value:usedSpace,
                                itemStyle:{
                                    normal:{
                                        color:'#488FD2',
                                    }
                                }
                        },{
                            name: "剩余空间",
                                value:freeSpace,
                                itemStyle:{
                                    normal:{
                                        color:'#F1F0F0'
                                    }
                                }
                        }
                    ]
                }
            ]
        };
    }

    //集群iops
    var iopsOption = function(times,values,interval,max){
        return {
            tooltip : {
                show:false,
                trigger: 'axis'
            },
            grid:{
                x:40,
                y:20,
                x2:20,
                y2:30,
                borderWidth:0
            },
            calculable : false,
            xAxis : [
                {
                    type : 'category',
                    boundaryGap: true,
                    axisLine: {
                        show: true,
                        lineStyle: { //x轴线样式
                            color: '#728092',
                            width: 0
                        }
                    },
                    axisTick: { //x坐标轴小标记
                        show: true,
                        onGap: false,
                        lineStyle: {
                            color: '#728092',
                            width: 1
                        }
                    },
                    axisLabel: { //坐标轴文本标签选项
                        show: true,
                        interval: interval || 3, //坐标轴显示全部
                        rotate: 0, //坐标轴顺时针45°显示
                        textStyle: {
                            color: '#728092',
                            fontSize:10
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    data : times
                }
            ],
            yAxis : [
                {
                    name:'IOPS',
                    type : 'value',
                    precision : 2,
                    max:max || 200,
                    min:0,
                    splitNumber:4,
                    axisLine: {
                        show: true,
                        lineStyle: { //y轴线样式
                            color: '#728092',
                            width: 1
                        }
                    },
                    axisLabel: {
                        show: true,
                        interval: 3, //坐标轴显示全部
                        rotate: 0, //坐标轴顺时针45°显示
                        textStyle: {
                            color: '#728092',
                            fontSize:10
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#728092'
                        }
                    }
                }
            ],
            series : [
                {
                    type:'line',
                    data:values,
                    symbol:'none',
                    itemStyle: {
                        normal: {
                            color:'#04CA4F',
                            areaStyle: {
                                color:'#537172',
                                type: 'default'
                            }
                        }
                    }
                }
            ]
        };
    }

    //集群io宽带
    var mbpsOption = function(times,values,interval,max){
        return {
            tooltip : {
                show:false,
                trigger: 'axis'
            },
            grid:{
                x:40,
                y:20,
                x2:20,
                y2:30,
                borderWidth:0
            },
            calculable : false,
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : true,
                    axisLine: {
                        show: true,
                        lineStyle: { //x轴线样式
                            color: '#728092',
                            width: 0
                        }
                    },
                    axisTick: { //x坐标轴小标记
                        show: true,
                        onGap: false,
                        lineStyle: {
                            color: '#728092',
                            width: 1
                        }
                    },
                    axisLabel: { //坐标轴文本标签选项
                        show: true,
                        interval: interval || 0, //坐标轴显示全部
                        rotate: 0, //坐标轴顺时针45°显示
                        textStyle: {
                            color: '#728092',
                            fontSize:10
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    data :times
                }
            ],
            yAxis : [
                {
                    name:'MBps',
                    type : 'value',
                    precision : 2,
                    boundaryGap : [0, 0],
                    max:max || 100,
                    min:0,
                    splitNumber:4,
                    axisLine: {
                        show: true,
                        lineStyle: { //y轴线样式
                            color: '#728092',
                            width: 1
                        }
                    },
                    axisLabel: {
                        show: true,
                        interval: 3, //坐标轴显示全部
                        rotate: 0, //坐标轴顺时针45°显示
                        textStyle: {
                            color: '#728092',
                            fontSize:10
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#728092'
                        }
                    }
                }
            ],
            series : [
                {
                    type:'line',
                    data:values,
                    symbol:'none',
                    itemStyle: {
                        normal: {
                            color:'#00ACFF',
                            areaStyle: {
                                color:'#305977',
                                type: 'default'
                            }
                        }
                    }
                }
            ]
        };
    }

    //容量
    var capacityOption = function(times,values,max,interval){
        return {
            tooltip : {
                show:false,
                trigger: 'axis'
            },
            grid:{
                x:40,
                y:20,
                x2:20,
                y2:30,
                borderWidth:0
            },
            calculable : false,
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : true,
                    axisLine: {
                        show: true,
                        lineStyle: { //x轴线样式
                            color: '#728092',
                            width: 0
                        }
                    },
                    axisTick: { //x坐标轴小标记
                        show: true,
                        onGap: false,
                        lineStyle: {
                            color: '#728092',
                            width: 1
                        }
                    },
                    axisLabel: { //坐标轴文本标签选项
                        show: true,
                        interval: interval || 3, //坐标轴显示全部
                        rotate: 0, //坐标轴顺时针45°显示
                        textStyle: {
                            color: '#728092',
                            fontSize:10
                        }
                    },
                    splitLine: {
                        show: false
                    },
                    data :times
                }
            ],
            yAxis : [
                {
                    name:'TB',
                    type : 'value',
                    precision : 2,
                    max:max || 100,
                    min:0,
                    splitNumber:4,
                    axisLine: {
                        show: true,
                        lineStyle: { //y轴线样式
                            color: '#728092',
                            width: 1
                        }
                    },
                    axisLabel: {
                        show: true,
                        interval: 3, //坐标轴显示全部
                        rotate: 0, //坐标轴顺时针45°显示
                        textStyle: {
                            color: '#728092',
                            fontSize:10
                        }
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: '#728092'
                        }
                    }
                }
            ],
            series : [
                {
                    type:'line',
                    data:values,
                    symbol:'none',
                    itemStyle: {
                        normal: {
                            color:'#00ACFF',
                            areaStyle: {
                                color:'#305977',
                                type: 'default'
                            }
                        }
                    }
                }
            ]
        };
    }
    /*********************************详情图形展示完*******************************************/

    /*******************************主机映射图********************************************/
//bootstrap2 popover控制方法
$scope.popoverCtr = function (id,eventName,content) {
    $('#'+id).popover({content: content});
    $('#'+id).popover('show')

    if(popoverId) clearTimeout(popoverId);
    var popoverId = setTimeout(function(){
        $('#'+id).popover('hide');
    }, 3000);

    //弹出提示对象，然后进行事件绑定
    $('#'+id).on(eventName, function(){
        $('#'+id).popover('hide');
    })


    }

    $scope.getHostList = function () {

    }
    /**
        * 主机映射视图操作方法
        */

    $scope.doView = function (handleName,title){
        $scope.view = handleName;
        $scope.viewTitle = title;
        $('#hostMapView').modal('show');

    }
    $scope.confirmView = function(type){
        if(type == 'createHost' || type == 'updateHost'){
            var isHostName = false, isOsType = false, isHostIp = false;
            if($scope.host.hostid == '' || $scope.host.hostid == undefined){
                $scope.popoverCtr('hostIdShow','click','主机名称不能为空');
                isHostName = true;
            }
            if($scope.host.osType == '' || $scope.host.osType == undefined){
                $scope.popoverCtr('osTypeShow','click','所属操作系统不能为空');
                isOsType = true;
            }
            var ipTest = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
            if(!ipTest.test($scope.host.hostIp)){
                $scope.popoverCtr('ipShow','click','请输入正确的ip地址');
                isHostIp = true;;
            }
            if(isHostName || isOsType || isHostIp) return;
            if(type == 'createHost'){
                storageFactory.createHost($scope.host, function(response){

    });
}
if(type == 'updateHost'){

    }

    }
    if(type == 'deleteHost'){
        storageFactory.deleteHost($scope.host, function(response){

    });
}
if(type == 'createGroup' || type == 'updateGroup'){
    storageFactory.createGroup($scope.hostGroup, function(response){

    });

    storageFactory.updateGroup($scope.hostGroup, function(response){

    });
}
if(type == 'deleteGroup'){
    storageFactory.deleteGroup($scope.hostGroup, function(response){

    });
}
$('#hostMapView').modal('hide');
}
/****************************主机映射完************************************************************/
}]);
