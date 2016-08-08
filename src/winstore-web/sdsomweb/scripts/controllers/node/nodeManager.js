/**
 * 硬件管理controller
 * @aothor wuchanggui
 * @date 2015/2/6
 */
vsanApp.controller("nodeManager", ["$scope", "nodeFactory", function ($scope, nodeFactory) {
	"use strict";
	/**
	 * 页面初始化
	 */
	$scope.initPage = function () {
		//系统信息
		$scope.system = {
			nodes: {}, //节点信息
			hard: {}, //硬件信息
			liveNode: {} //运行节点的情况
		};
		//获取节点信息
		nodeFactory.getSysNodes(function (response) {
			if (response.success) {
				$scope.system.nodes = response.data;
			}
		});
		//获取硬件信息
		nodeFactory.getSysHard(function (response) {
			if (response.success) {
				$scope.system.hard = response.data;
			}
		});
		//获取前后视图信息
		nodeFactory.getSysHardView(function (response) {
			if (response.success) {
				$scope.system.liveNode.total = response.data.total;
				$scope.system.liveNode.type = response.data.type;
//				$scope.system.liveNode.list = [];
//				angular.forEach(response.data.status, function(node) {
//					$scope.system.liveNode.list.push(node);
//				});
			}
		});
		//获取TOP3节点
		//请求IOPS
		$scope.iopsTop3 = [];
		nodeFactory.top3node({top: 3, resType: "IOPS"}, function (res) {
			if (res.success) {
				for (var i = 0; i < res.data.length; i++) {
					var obj = {
						nodeIp: res.data[i][1],
						iops: res.data[i][2]
					};
					$scope.iopsTop3.push(obj);
				}
			} else {
				$scope.showDialog(res.message);
			}
		});
		//请求MBPS
		$scope.mbpsTop3 = [];
		nodeFactory.top3node({top: 3, resType: "MBPS"}, function (res) {
			if (res.success) {
				for (var i = 0; i < res.data.length; i++) {
					var obj = {
						nodeIp: res.data[i][1],
						mbps: res.data[i][2]
					};
					$scope.mbpsTop3.push(obj);
				}
			} else {
				$scope.showDialog(res.message);
			}
		});
		//请求CPU
		$scope.cpuTop3 = [];
		nodeFactory.top3node({top: 3, resType: "CPU"}, function (res) {
			if (res.success) {
				for (var i = 0; i < res.data.length; i++) {
					var obj = {
						nodeIp: res.data[i][1],
						cpu: res.data[i][2]
					};
					$scope.cpuTop3.push(obj);
				}
			} else {
				$scope.showDialog(res.message);
			}
		});
		//请求MEM
		$scope.memTop3 = [];
		nodeFactory.top3node({top: 3, resType: "MEM"}, function (res) {
			if (res.success) {
				for (var i = 0; i < res.data.length; i++) {
					var obj = {
						nodeIp: res.data[i][1],
						mem: res.data[i][2]
					};
					$scope.memTop3.push(obj);
				}
			} else {
				$scope.showDialog(res.message);
			}
		});
	};
}]);
