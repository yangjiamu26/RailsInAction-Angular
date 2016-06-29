angular.module('app')
// .factory("goLogin", function($resource, $q){ 
// 	return $resource(baseUrl+'/user/login', {}, {
// 		login: {method: 'POST'}
// 	})
// })
// .factory("loginOut", function($resource, $q){ 
// 	return $resource(baseUrl+'/user/logout', {}, {
// 		loginOut: {method: 'PUT'}
// 	})
// })


// .factory("AssetsManegeRacks", function($resource, $q){ 
// 	return $resource(baseUrl+'/racks/:id', {id: '@id'}, {
// 		add:{method: 'POST'},
// 		update:{method: 'PUT'},
// 		query: {method: 'GET',isArray:false},
// 		del:{method:'DELETE'}
// 	})
// })

.service("cvmPadApp", function($q){ 
	// return $resource(baseUrl+'/user/login', {}, {
	// 	login: {method: 'POST'}
	// })
	this.indexRes = function(){
		var deferrd = $q.defer();
		var res = {
			"cpuUsed":41,
			"storageTotal":1500.0,
			"cpuTotal":300.0,
			"memoryTotal":100.0,
			"storageUsed":423.0,
			"memoryUsed":45.0,
			"dcNum":3, //数据中心数量
			"resPoolNum":3,//资源池数量
			"busdomainNum":2, //业务域数量
			"hostNum":300,//物理机数量
			"projectNum":100, //业务系统数量
			"vmNum":423 
		}
		deferrd.resolve(res);
		return deferrd.promise;
	}
})
