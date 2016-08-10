myApp.onPageInit("indexFilter-business", function(page) {
  function busdomain_ViewModel(){
  	var self = this;
    /*busdomain*/
    this.busdomain = {
      list:ko.observableArray([]),
      busdomainNum:'',
      projectNum:''
    };
    this.getSelectedBus = function(id){
      var name;
      for(var i=0;i<this.busdomain.list().length;i++){
        if(this.busdomain.list()[i].id == id){
          name = this.busdomain.list()[i].name;
          break;
        }
      }
      return name;
    }
    this.busdomainSelected = ko.observable("全部");
    this.setBusdomainSelected = function(object,event){
      var isAll,busId,busName;
      if(object.id){
        isAll = false;
        busId = object.id;
        busName = object.name;
        self.busdomainSelected(object.id);
      }else{
        isAll = true;
        busId = null;
        busName = null;
        self.busdomainSelected("全部");
      }
      window.business_index_viewModel.loadData(false,busId,busName);
    }
    this.getBusinessDomains = function(){
      RestServiceJs(BASE_URL+"/busdomain").query({},function(data){
        self.busdomain.busdomainNum=data.busdomainNum;
        self.busdomain.projectNum=data.projectNum;
        for(var i=0;i<data.data.length;i++){
          self.busdomain.list.push(data.data[i]);
        }
        window.business_index_viewModel.loadData();
      })
    }
  }
  var busViewModel = new busdomain_ViewModel();
  ko.applyBindings(busViewModel, $$(page.container)[0]);
  window.indexFilter_busdomain_viewModel = busViewModel;
});

myApp.onPageInit("indexFilter-pool", function(page) {
  function pool_ViewModel(){
  	var self = this;
    /*pool*/
    this.poolSelected = ko.observable("全部");
    this.setPoolSelected = function(object,event){
      var val = event.currentTarget.attributes["toselect"].nodeValue;
      self.poolSelected(val);
      var type = val == "全部" ? "" : val;
      window.pool_index_viewModel.loadData(false,type);
    }
  }
  var poolViewModel = new pool_ViewModel();
  ko.applyBindings(poolViewModel, $$(page.container)[0]);
  window.indexFilter_pool_viewModel = poolViewModel;
});

myApp.onPageInit("indexFilter-host", function(page) {
  function host_ViewModel(){
  	var self = this;
    /*host*/
    this.hosts = {
      WinServerList: ko.observableArray([]),
      VMwareList: ko.observableArray([]),
      PowerVMList: ko.observableArray([])
    };
    this.hostSelected = ko.observable("全部");
    this.setHostSelected = function(object,event){
      var hypervisor = event.currentTarget.attributes["hypervisor"].nodeValue;
      var val = event.currentTarget.attributes["toselect"].nodeValue;
      self.hostSelected(val);
      var hype = hypervisor ? hypervisor : "";
      var id = val.indexOf("全部")>-1 ? "" : val.replace(/[^0-9]/ig,"");
      window.HostIndex_viewModel.loadData(false, hype, id);
    }
    this.getResPools = function(){
      self.hosts.WinServerList.removeAll();
      self.hosts.VMwareList.removeAll();
      self.hosts.PowerVMList.removeAll();
      RestServiceJs(BASE_URL+"/resPool").query({"dcId":CVM_PAD.dcId,"hypervisor":"winserver"},function(data){
        for(var i=0;i<data.data.length;i++){
          self.hosts.WinServerList.push(data.data[i]);
        }
      });
      RestServiceJs(BASE_URL+"/resPool").query({"dcId":CVM_PAD.dcId,"hypervisor":"VMware"},function(data){
        for(var i=0;i<data.data.length;i++){
          self.hosts.VMwareList.push(data.data[i]);
        }
      });
      RestServiceJs(BASE_URL+"/resPool").query({"dcId":CVM_PAD.dcId,"hypervisor":"PowerVM"},function(data){
        for(var i=0;i<data.data.length;i++){
          self.hosts.PowerVMList.push(data.data[i]);
        }
      });
      window.HostIndex_viewModel.loadData();
    }
  }
  var hostViewModel = new host_ViewModel();
  ko.applyBindings(hostViewModel, $$(page.container)[0]);
  window.indexFilter_host_viewModel = hostViewModel;
});

myApp.onPageInit("indexFilter-vm", function(page) {
  function vm_ViewModel(){
  	var self = this;
    /*vm*/
    this.vmSelected = ko.observable("全部");
    this.setVmSelected = function(object,event){
      var hypervisor = event.currentTarget.attributes["hypervisor"].nodeValue || '';
      var val = event.currentTarget.attributes["toselect"].nodeValue;
      self.vmSelected(val);
      var hype = hypervisor ? hypervisor : "";
      //var id = val.indexOf("全部")>-1 ? "" : val.replace(/[^0-9]/ig,"");
      window.vm_index_viewModel.loadData(false, hype);
    }
  }
  var vmViewModel = new vm_ViewModel();
  ko.applyBindings(vmViewModel, $$(page.container)[0]);
  window.indexFilter_vm_viewModel = vmViewModel;
});

myApp.onPageInit("indexFilter-storage", function(page) {
  function storage_ViewModel(){
  	var self = this;
    /*storage*/
    this.storageSelected = ko.observable("全部");
    this.setStorageSelected = function(object,event){
      var hypervisor = event.currentTarget.attributes["hypervisor"].nodeValue || '';
      var val = event.currentTarget.attributes["toselect"].nodeValue;
      self.storageSelected(val);
      var hype = hypervisor ? hypervisor : "";
      //var id = val.indexOf("全部")>-1 ? "" : val.replace(/[^0-9]/ig,"");
      window.storage_index_viewModel.loadData(false, hype);
    }
  }
  var storageViewModel = new storage_ViewModel();
  ko.applyBindings(storageViewModel, $$(page.container)[0]);
  window.indexFilter_storage_viewModel = storageViewModel;
});