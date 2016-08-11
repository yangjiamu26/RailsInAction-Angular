/**
 * Created by peishilong on 2014/6/3.
 */

vsanApp.config(function ($stateProvider, $urlRouterProvider) {
    "use strict";

    $stateProvider
        
//        .state("deviceTaskUpdate", {
//            url: "/equipment/device/Update_:taskId.html",
//            templateUrl: "views/task/equipment/saveOrUpdate.html",
//            controller: "deviceTaskAddOrUpdate"
//        })
        
	    .state("mainManager", {
	        url: "/main",
	        templateUrl: "views/main.html",
	        controller: "MainCtrl"
	    })
        //登陆
        .state("loginManager", {
            url: "/login",
            templateUrl: "views/login.html",
            controller:"loginController"
        })
        .state("configManager", {
        	url:"/config",
        	templateUrl:"views/configure.html",
        	controller:"configController"
        })
        .state("mainManager.mainPage",{
            url:'/mainPage',
            views:{
                'top_view':{
                    templateUrl: "views/main/mainPageTop.html",
                    controller:'mainPageTopCtrl'
                },
                'bot_view':{
                    templateUrl: "views/main/mainPageBot.html",
                    controller:'mainPageBotCtrl'
                }
            }
        })
        .state("mainManager.storageManage",{
            url:'/storageManage',
            views:{
                'top_view':{
                    templateUrl: "views/storageManage/storageTop.html",
                    controller:'storageTopCtrl'
                },
                'bot_view':{
                    templateUrl: "views/main/mainPageBot.html",
                    controller:'mainPageBotCtrl'
                }
            }
        })
        .state("mainManager.alarm", {
        	url: "/system/alarm",
        	views: {
        		"top_view": {
        			templateUrl: "views/alarm/alarmManager.html",
        			controller: "alarmManagerCtrl"
        		}
        	}
        })
        .state("mainManager.event", {
        	url: "/system/event",
        	views: {
        		"top_view": {
        			templateUrl: "views/alarm/eventManager.html",
        			controller: "eventManagerCtrl"
        		}
        	}
        })
        .state("mainManager.log", {
        	url: "/system/log",
        	views: {
        		"top_view": {
        			templateUrl: "views/alarm/logManager.html",
        			controller: "logManagerCtrl"
        		}
        	}
        })
        .state("mainManager.storagePool", {
        	url: "/storage/resource",
        	views: {
        		"top_view": {
        			templateUrl: "views/storageManage/resourcePool.html",
        			controller: "storageResourceCtrl"
        		}
        		//"bot_view": {
        		//	templateUrl: "views/storageManage/mainPageBot.html",
        		//	controller: "mainPageBotCtrl"
        		//}
        	}
        })
        .state("mainManager.storageLun", {
        	url: "/storage/lun",
        	views: {
        		"top_view": {
        			templateUrl: "views/storageManage/resourceLun.html",
        			controller: "storageLunCtrl"
        		}
        	}
        })
        .state("mainManager.nodeManager", {
        	url: "/node/manager",
        	views: {
        		"top_view": {
        			templateUrl: "views/node/nodeManager.html",
        			controller: "nodeManager"
        		},
        		"bot_view": {
        			templateUrl: "views/storageManage/mainPageBot.html",
        			controller: "mainPageBotCtrl"
        		}
        	}
        })
        .state("mainManager.nodeView", {
        	url: "/node/view",
        	views: {
        		"top_view": {
        			templateUrl: "views/node/nodeView.html",
        			controller: "nodeViewManager"
        		}
        	}
        })
        /********************************************************
         * 第三期
         ********************************************************
         */
        .state('mainManager.ipManager', { //IP修改
        	url: '/node/network',
        	views: {
        		'top_view': {
        			templateUrl: 'views/node/ipManager.html',
        			controller: 'ipManagerCtrl'
        		}
        	}
        })
        .state('mainManager.nodeAdd', { //节点扩容
        	url: '/node/add',
        	views: {
        		'top_view': {
        			templateUrl: 'views/node/nodeAdd.html',
        			controller: 'nodeAddCtrl'
        		}
        	}
        })
        ;

    //默认跳转
    $urlRouterProvider.otherwise("/login");

});
