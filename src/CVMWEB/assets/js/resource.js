angular.module('app')
.factory("goLogin", function($resource, $q, baseUrl){ 
	return $resource(baseUrl+'/user/login', {}, {
		login: {method: 'POST'}
	})
})
.factory("loginOut", function($resource, $q, baseUrl){ 
	return $resource(baseUrl+'/user/logout', {}, {
		loginOut: {method: 'PUT'}
	})
})

.factory("OverviewRoomStatics", function($resource, $q, baseUrl){ 
	return $resource(baseUrl+'/rooms/statics', {}, {
		query: {method: 'GET',isArray:false}
	})
})
.factory("OverviewDcStatics", function($resource, $q, baseUrl){ 
	return $resource(baseUrl+'/datacenters/statics', {}, {
		query: {method: 'GET',isArray:false}
	})
})
.factory("OverviewAlarmsStatics", function($resource, $q, baseUrl){ 
	return $resource(baseUrl+'/datacenters/alarms/statics', {}, {
		query: {method: 'GET',isArray:false}
	})
})


.factory("AssetsManegeTreeNode", function($resource, $q, baseUrl){ 
	return $resource(baseUrl+'/assets/tree', {}, {
		query: {method: 'GET',isArray:false}
	})
})
.factory("Datacenters", function($resource, $q, baseUrl){ 
	return $resource(baseUrl+'/datacenters/:id', {id: '@id'}, {
		update:{method: 'PUT'},
		query: {method: 'GET',isArray:false}
	})
})
.factory("AssetsManegeRooms", function($resource, $q, baseUrl){ 
	return $resource(baseUrl+'/rooms/:id', {id: '@id'}, {
		update:{method: 'PUT'},
		query: {method: 'GET',isArray:false}
	})
})
.factory("AssetsManegeRoomFloors", function($resource, $q, baseUrl){ 
	return $resource(baseUrl+'/rooms/:id/floors', {id: '@id'}, {
		update:{method: 'PUT'},
		query: {method: 'GET',isArray:false}
	})
})
.factory("AssetsManegeFloors", function($resource, $q, baseUrl){ 
	return $resource(baseUrl+'/floors/:id', {id: '@id'}, {
		update:{method: 'PUT'},
		query: {method: 'GET',isArray:false}
	})
})
.factory("AssetsManegeFloorRacks", function($resource, $q, baseUrl){ 
	return $resource(baseUrl+'/floors/:id/racks', {id: '@id'}, {
		update:{method: 'PUT'},
		query: {method: 'GET',isArray:false}
	})
})
.factory("AssetsManegeRacks", function($resource, $q, baseUrl){ 
	return $resource(baseUrl+'/racks/:id', {id: '@id'}, {
		add:{method: 'POST'},
		update:{method: 'PUT'},
		query: {method: 'GET',isArray:false},
		del:{method:'DELETE'}
	})
})
.factory("AssetsManegeDevices", function($resource, $q, baseUrl){ 
	return $resource(baseUrl+'/devices/:id', {id: '@id'}, {
		add:{method:'POST'},
		update:{method: 'PUT'},
		query: {method: 'GET',isArray:false},
		del:{method:'DELETE'}
	})
})
.factory("AssetsManegeRackDevices", function($resource, $q, baseUrl){ 
	return $resource(baseUrl+'/racks/:id/devices', {id: '@id'}, {
		query: {method: 'GET',isArray:false}
	})
})
.factory("AssetsManegeHosts", function($resource, $q, baseUrl){ 
	return $resource(baseUrl+'/hosts/:id', {id: '@id'}, {
		add:{method:'POST'},
		update:{method: 'PUT'},
		query: {method: 'GET',isArray:false},
		del:{method:'DELETE'}
	})
})
.factory("AssetsManegeProjects", function($resource, $q, baseUrl){ 
	return $resource(baseUrl+'/projects/:id', {id: '@id'}, {
		add:{method:'POST'},
		update:{method: 'PUT'},
		query: {method: 'GET',isArray:false},
		del:{method:'DELETE'}
	})
})
.factory("AssetsManegeDevicesType", function($resource, $q, baseUrl){ 
	return $resource(baseUrl+'/deviceTypes/:id', {id: '@id'}, {
		add:{method:'POST'},
		update:{method: 'PUT'},
		query:{method: 'GET',isArray:false},
		del:{method:'DELETE'}
	})
})
.factory("AssetsManegeFreeLabel", function($resource, $q, baseUrl){ 
	return $resource(baseUrl+'/deviceTypeFields/:id', {id: '@id'}, {
		add:{method:'POST'},
		update:{method: 'PUT'},
		query:{method: 'GET',isArray:false},
		del:{method:'DELETE'}
	})
})

.factory("VisualizationVms", function($resource, $q, baseUrl){ 
	return $resource(baseUrl+'/devices/:id/vms', {id: '@id'}, {
		query: {method: 'GET',isArray:false}
	})
})
.factory("VisualizationVm", function($resource, $q, baseUrl){
	return $resource(baseUrl+'/vms/:id/static', {id:'@id'}, {
		query: {method: 'GET',isArray:false}
	})
})

.factory("MonitorDatacentersStatics", function($resource, $q, baseUrl){ /*monitor*/
	return $resource(baseUrl+'/datacenters/:id/statics', {id: '@id'}, {
		query: {method: 'GET',isArray:false}
	})
})
.factory("MonitorDatacentersHosts", function($resource, $q, baseUrl){
	return $resource(baseUrl+'/datacenters/:id/hosts', {id: '@id'}, {
		query: {method: 'GET',isArray:false}
	})
})
.factory("MonitorDcAlarmsStatics", function($resource, $q, baseUrl){
	return $resource(baseUrl+'/datacenters/alarms/statics', {}, {
		query: {method: 'GET',isArray:false}
	})
})

.factory("MonitorBusinessTree", function($resource, $q, baseUrl){
	return $resource(baseUrl+'/domain/tree', {}, {
		query: {method: 'GET',isArray:false}
	})
})
.factory("MonitorDomainStatics", function($resource, $q, baseUrl){
	return $resource(baseUrl+'/domain/statics', {}, {
		query: {method: 'GET',isArray:false}
	})
})
.factory("MonitorDomainInfo", function($resource, $q, baseUrl){
	return $resource(baseUrl+'/domain', {id:'@id'}, {
		query: {method: 'GET',isArray:false}
	})
})

.factory("MonitorProjectsStatics", function($resource, $q, baseUrl){
	return $resource(baseUrl+'/projects/statics', {}, {
		query: {method: 'GET',isArray:false}
	})
})
.factory("MonitorProjectsInfo", function($resource, $q, baseUrl){
	return $resource(baseUrl+'/projects/:id', {id:'@id'}, {
		query: {method: 'GET',isArray:false}
	})
})
.factory("MonitorProjectsTopo", function($resource, $q, baseUrl){
	return $resource(baseUrl+'/projects/topography', {}, {
		query: {method: 'GET',isArray:true}
	})
})

.factory("MonitorVmsStatics", function($resource, $q, baseUrl){
	return $resource(baseUrl+'/vms/statics', {}, {
		query: {method: 'GET',isArray:false}
	})
})
.factory("MonitorVmsInfo", function($resource, $q, baseUrl){
	return $resource(baseUrl+'/vms/:id', {id:'@id'}, {
		query: {method: 'GET',isArray:false}
	})
})
.factory("MonitorVmBaseInfo", function($resource, $q, baseUrl){
	return $resource(baseUrl+'/vms/:id/statics', {id:'@id'}, {
		query: {method: 'GET',isArray:false}
	})
})

.factory("SettingIndexConfigs", function($resource, $q, baseUrl){
	return $resource(baseUrl+'/indexConfigs/:id', {id: '@id'}, {
		add:{method:'POST'},
		update:{method: 'PUT'},
		query:{method: 'GET',isArray:false}
	})
})
.factory("SettingLargeScreenConfigs", function($resource, $q, baseUrl){
	return $resource(baseUrl+'/largeScreenConfigs/:id', {id: '@id'}, {
		add:{method:'POST'},
		update:{method: 'PUT'},
		query:{method: 'GET',isArray:false},
		del:{method:'DELETE'}
	})
})
.factory("SettingProfileConfigs", function($resource, $q, baseUrl){
	return $resource(baseUrl+'/overallProfileConfigs/:id', {id: '@id'}, {
		add:{method:'POST'},
		update:{method: 'PUT'},
		query:{method: 'GET',isArray:false}
	})
})
.factory("SettingProfileDetailList", function($resource, $q, baseUrl){
	return $resource(baseUrl+'/overallProfileConfigs/:id/details', {id: '@id'}, {
		add:{method:'POST'},
		update:{method: 'PUT'},
		query:{method: 'GET',isArray:false}
	})
})
.factory("SettingProfileDetails", function($resource, $q, baseUrl){
	return $resource(baseUrl+'/overallProfileConfigs/details/:id', {id: '@id'}, {
		add:{method:'POST'},
		update:{method: 'PUT'},
		query:{method: 'GET',isArray:false},
		del:{method:'DELETE'}
	})
})












