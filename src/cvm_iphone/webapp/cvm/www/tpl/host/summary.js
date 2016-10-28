myApp.onPageInit("host-show", function(page) {
  // vmListclicks.host = false;
  // storageListclicks.host = false;
  
  function ViewModel(){
    var self = this;
    this.name = ko.observable(page.query.name);
    this.belongTab = page.query.belongTab ? ko.observable(page.query.belongTab) : ko.observable("");
    this.summary = ko.observable({
      "resourcePoolName":'',
      "cpuSlots":'',
      "ip":'',
      "state":'',
      "runTime":'',
      'cpuUsed':0,
      'cpuTotal':0,
      'memoryUsed':0,
      'memoryTotal':0,
      'storageUsed':0,
      'storageTotal':0,
      'hostNum':0,
      'vmNum':0,
      'storageNum':0
    });
    this.hypervisor = ko.observable(page.query.hypervisor);
    this.loadData = function(){
      RestServiceJs.query(BASE_URL+"/host/"+page.query.id+"/summary",{"dcId":CVM_IPHONE.dcId,"resPoolId":page.query.resourcePoolId,"hypervisor":page.query.hypervisor},function(data){
        myApp.pullToRefreshDone();
        data.runTime = getTheTime(new Date() - new Date(data.runTime*1000));
        data.cpuSpeed = Number((Number(data.cpuSpeed)/1000).toFixed(2));
        data.cpuTotal = data.totalCpu || 0;
        data.cpuUsed = Number(data.totalCpu || 0) - Number(data.availCpu || 0);
        data.memoryTotal = data.memory || 0;
        data.memoryUsed = Number(data.memory || 0) - Number(data.availMemory || 0);
        data.storageTotal = data.storage || 0;
        data.storageUsed = Number(data.storage || 0) - Number(data.availStorage || 0);

        data.storageNum = 0;
        self.summary(data);

        // var thisInterval = setInterval(function(){
        //   if(window.HostIndex_Summary_details_viewModel){
        //     if(window.HostIndex_Summary_details_viewModel.loadData){
        //       clearInterval(thisInterval);
        //       window.HostIndex_Summary_details_viewModel.loadData(data);
        //     }
        //   }
        // },200);

      });
    };
  }
  var viewModel = new ViewModel();
  ko.applyBindings(viewModel, $$(page.container)[0]);
  window.HostIndex_Summary_viewModel = viewModel;
  viewModel.loadData();
});

// {
//   "id": 3,
//   "resourcePoolId": 2,
//   "resourcePoolName": "项目组测试环境",
//   "name": "xenserver-103",
//   "ip": "192.168.206.103",
//   "vmNum": 8,
//   "runningVmNum": 4,
//   "hypervisor": "winserver",
//   "cpuSpeed": 2660.00,
//   "model": "Intel(R) Core(TM)2 Quad CPU    Q8400  @ 2.66GHz",
//   "vendor": "GenuineIntel",
//   "cpuUnit": 4.00,
//   "memory": null,
//   "availMemory": null,
//   "storage": null,
//   "availStorage": null,
//   "state": "OK",
//   "runTime": 1475027000,
//   "cpuSlots": 1,
//   "datacenterId": 0,
//   "datacenterName": null,
//   "availCpu": null,
//   "totalCpu": null
// }
