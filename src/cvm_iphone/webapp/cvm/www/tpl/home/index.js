myApp.onPageInit("home-index", function(page) {
  myApp.hideToolbar('.toolbar');
  function ViewModel(){
    var self = this;
    this.dcInfo = ko.observable({
        "id": "",
        "name": "总览"
      });
    this.setDcInfo = function(){
      this.dcInfo({
        "id": CVM_IPHONE.dcId,
        "name": CVM_IPHONE.dcName
      });
    }
    this.infos = ko.observable({
      "vmNumber": "",
      "cpuCoreNumber":"",
      "x86TotalCpu": "",
      "pvmTotalCpu": "",
      "memoryTotal": "",
      "storageTotal": "",
      "busDomainNum": "",
      "projectNum": "",
      "resPoolNumber": "",
      "hostNubmer": ""
    });
    this.stat = ko.observable({
      "x86TotalCpu": "",
      "x86UsedCpu": 0,
      "pvmTotalCpu": "",
      "pvmUsedCpu": 0,
      "memoryTotal": "",
      "memoryUsed": 0,
      "storageTotal": "",
      "storageUsed": 0,
      "isTB":false
    });

    this.infos2 = ko.observable({
      "storageTotal":0,
      "x86TotalCpu":0,
      "pvmTotalCpu":0,
      "memoryTotal":0,
      "isTB":false
    });
    
    //this.loading = false;
    this.loadData = function(DcId){
      // if(this.loading) return;
      // this.loading = true;
      var url1,url2;
      if(DcId){
        url1 = BASE_URL+"/overallDetails/"+CVM_IPHONE.dcId+"/resourceSummary";
        url2 = BASE_URL+"/overallDetails/"+CVM_IPHONE.dcId+"/resourceStat";
      }else{
        url1 = BASE_URL+"/overallDetails/resourceSummary";
        url2 = BASE_URL+"/overallDetails/resourceStat";
      }
      RestServiceJs.query(url1,{},function(data){
        myApp.pullToRefreshDone();
        data.memoryTotal = Number((Number(data.memorySize)/1024).toFixed(2));
        data.storageTotal = Number((Number(data.storageSize)/1024).toFixed(2));
        self.infos(data);
      });
      RestServiceJs.query(url2,{},function(data){
        data.x86TotalCpu = Number((Number(data.x86TotalCpu)/1000).toFixed(2));
        data.x86UsedCpu = Number((Number(data.x86UsedCpu)/1000).toFixed(2));
        data.memoryTotal = Number((Number(data.memoryTotal)/1024).toFixed(2));
        data.memoryUsed = Number((Number(data.memoryUsed)/1024).toFixed(2));
        if(Number(data.storageTotal)>1023){
          data.isTB = true;
          data.storageTotal = Number((Number(data.storageTotal)/1024).toFixed(2));
          data.storageUsed = Number((Number(data.storageUsed)/1024).toFixed(2));
        }else{
          data.isTB = false;
          data.storageTotal = Number(Number(data.storageTotal).toFixed(2));
          data.storageUsed = Number(Number(data.storageUsed).toFixed(2));
        }
        
        data.pvmTotalCpu = Number(Number(data.pvmTotalCpu).toFixed(2));
        data.pvmUsedCpu = Number(Number(data.pvmUsedCpu).toFixed(2));
        self.stat(data);
      },null,true);
    }
    this.whichDc = ko.observable('');
    this.changeDc = function(id,name){
      if(id){
        CVM_IPHONE.dcId = id;
        CVM_IPHONE.dcName = name;
      }else{
        CVM_IPHONE.dcId = '';
        CVM_IPHONE.dcName = name;
      }
      this.setDcInfo();
      this.whichDc(id);
      /*重载页面 start*/
      reloadPages();
      /*重载页面 end*/
    }
  }
  var viewModel = new ViewModel();
  ko.applyBindings(viewModel, $$(page.container)[0]);
  window.indexHome_viewModel = viewModel;

  window.indexPopover_viewModel.loadDatacenters();
  viewModel.loadData();
  // viewModel.setDcInfo();

  $$(page.container).find('.pull-to-refresh-content').on('refresh', function (e) {
    viewModel.loadData();
  });

});

var is_reload_pages = false;
function reloadPages(){

  indexFilter_pool       = indexFilter_pool || myApp.addView('#indexFilter-pool',     {dynamicNavbar: false,domCache: true,linksView: "#indexFilter-pool"});
  indexFilter_host       = indexFilter_host || myApp.addView('#indexFilter-host',     {dynamicNavbar: false,domCache: true,linksView: "#indexFilter-host"});
  indexFilter_vm           = indexFilter_vm || myApp.addView('#indexFilter-vm',       {dynamicNavbar: false,domCache: true,linksView: "#indexFilter-vm"});
  indexFilter_storage = indexFilter_storage || myApp.addView('#indexFilter-storage',  {dynamicNavbar: false,domCache: true,linksView: "#indexFilter-storage"});
  
  view_business             = view_business || myApp.addView("#view-business",        {dynamicNavbar: false,domCache: true,linksView: "#view-business"});
  view_pool                     = view_pool || myApp.addView("#view-pool",            {dynamicNavbar: false,domCache: true,linksView: "#view-pool"});
  view_host                     = view_host || myApp.addView("#view-host",            {dynamicNavbar: false,domCache: true,linksView: "#view-host"});
  view_vm                         = view_vm || myApp.addView("#view-vm",              {dynamicNavbar: false,domCache: true,linksView: "#view-vm"});
  view_storage              =  view_storage || myApp.addView("#view-storage",         {dynamicNavbar: false,domCache: true,linksView: "#view-storage"});
  view_settings            =  view_settings || myApp.addView("#view-settings",   {dynamicNavbar: false,domCache: true,linksView: "#view-settings"});
  

  indexFilter_pool.router.load({     url: "tpl/filter/filter_pool.html",animatePages: false, reload:is_reload_pages});
  indexFilter_host.router.load({     url: "tpl/filter/filter_host.html",animatePages: false, reload:is_reload_pages});
  indexFilter_vm.router.load({       url: "tpl/filter/filter_vm.html",animatePages: false, reload:is_reload_pages});
  indexFilter_storage.router.load({  url: "tpl/filter/filter_storage.html",animatePages: false, reload:is_reload_pages});

  view_business.router.load({        url: "tpl/business/index.html",animatePages: false, reload:is_reload_pages});
  view_pool.router.load({            url: "tpl/pool/index.html",animatePages: false, reload:is_reload_pages});
  view_host.router.load({            url: "tpl/host/index.html",animatePages: false, reload:is_reload_pages});
  view_vm.router.load({              url: "tpl/vm/index.html",animatePages: false, reload:is_reload_pages});
  view_storage.router.load({         url: "tpl/storage/index.html",animatePages: false, reload:is_reload_pages});    
  view_settings.router.load({   url: "tpl/settings/index.html",animatePages: false, reload:is_reload_pages});

  is_reload_pages = true;
  reSetAllRequets();
}