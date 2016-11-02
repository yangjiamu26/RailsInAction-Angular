
myApp.onPageInit("pool-show", function(page) {

  // hostListclicked = false;
  // vmListclicks.pool = false;
  // storageListclicks.pool = false;
  function ViewModel(){
    var self = this;
    this.name = ko.observable(page.query.resourcePoolName);
    this.summary = ko.observable({
      'cpuUsed':1,
      'cpuTotal':1,
      'memoryUsed':1,
      'memoryTotal':1,
      'storageUsed':1,
      'storageTotal':1,
      'hostNum':2,
      'vmNum':4,
      'storageNum':3,
      'hypervisor':'',
      'resourcePoolId':'',
      'resourcePoolName':''
    });
    this.storageNum = ko.observable('-');
    this.loadData = function(){
      RestServiceJs.query(BASE_URL+"/storagePool",{"dcId":CVM_IPHONE.dcId,"resourcePoolId":page.query.id,"hypervisor":page.query.hypervisor},function(data){
        self.storageNum(data.size);
      });
      RestServiceJs.get(BASE_URL+"/resPool",page.query.id,{"dcId":CVM_IPHONE.dcId,"hypervisor":page.query.hypervisor,"resourcePoolName":page.query.resourcePoolName},function(data){

        myApp.pullToRefreshDone();
        data.cpuTotal = data.hypervisor == 'PowerVM' ? Number(Number(data.cpu).toFixed(2)) : Number((Number(data.cpu)/1000).toFixed(2));
        data.cpuUsed = data.hypervisor == 'PowerVM' ? Number(Number(data.cpu)-Number(data.availCpu).toFixed(2)) : Number((Number(data.cpu)/1000-Number(data.availCpu)/1000).toFixed(2));
        data.memoryTotal = Number((Number(data.memory)/1024).toFixed(2));
        data.memoryUsed = Number((Number(data.memory)/1024-Number(data.availMemory)/1024).toFixed(2));
        if(Number(data.storage)>1023){
          data.isTB = true;
          data.storageTotal = Number((Number(data.storage)/1024).toFixed(2));
          data.storageUsed = Number((Number(data.storage)/1024-Number(data.availStorage)/1024).toFixed(2));
        }else{
          data.isTB = false;
          data.storageTotal = Number((Number(data.storage)).toFixed(2));
          data.storageUsed = Number((Number(data.storage)-Number(data.availStorage)).toFixed(2));
        }
        data.storageNum = 0;
        self.summary(data);
      });
    };

  }
  var viewModel = new ViewModel();
  ko.applyBindings(viewModel, $$(page.container)[0]);

  viewModel.loadData();

  window.poolShow_index_viewModel = viewModel;

  $$(page.container).find('.pull-to-refresh-content').on('refresh', function (e) {
    viewModel.loadData();
  });
});

