var S_positonX = null;
var S_positonY = null;
var jiguiType = ["设备柜","电源柜","ODF柜"];
var QUYU = [
	{
		"pid":"zhuji",
		"name":"主机租赁区",
		"jgList":["JG-zj1001","JG-zj1002","JG-zj1003","JG-zj1004","JG-zj1005","JG-zj1006","JG-zj1007"],
		"info":"主机租赁区是用来放置用于租赁设备的设备柜。"
	},
	{
		"pid":"safe",
		"name":"网络安全区",
		"jgList":["JG-sf1001","JG-sf1002","JG-sf1003","JG-sf1004","JG-sf1005","JG-sf1006","JG-sf1007"],
		"info":"网络安全区是用来放置网络安全设备的设备柜。"
	}
]

var JIGUI = null;

var SERVERS = [
	{
		"name":"主机1",
		"pid":"SER-zj0001",
		"eleType":3,
		"type":1,
		"position":1,
		"u":1,
		"img":"modules/visualization/images/server1.jpg"
	},
	{
		"name":"主机2",
		"pid":"SER-zj0002",
		"eleType":3,
		"type":1,
		"position":3,
		"u":1,
		"img":"modules/visualization/images/server1.jpg"
	},
	{
		"name":"刀箱1",
		"pid":"BOX-dx0001",
		"eleType":2,
		"type":3,
		"position":7,
		"u":9,
		"img":"modules/visualization/images/server3.jpg"
	},
	{
		"name":"主机5",
		"pid":"SER-zj0005",
		"eleType":3,
		"type":1,
		"position":25,
		"u":3,
		"img":"modules/visualization/images/server1.jpg"
	},
	{
		"name":"主机6",
		"pid":"SER-zj0006",
		"eleType":3,
		"type":1,
		"position":27,
		"u":3,
		"img":"modules/visualization/images/server1.jpg"
	},
	{
		"name":"主机7",
		"pid":"SER-zj0007",
		"eleType":3,
		"type":1,
		"position":29,
		"u":3,
		"img":"modules/visualization/images/server1.jpg"
	}
]