myApp.onPageInit("dashboard", function(page) {
  function ViewModel(){
    this.datacenters = ko.observableArray([]);

    this.popover = function(data, event){
      myApp.popover($("#popover-datacenter").html(), event.target)
    };
    this.loadData = function(){
      //在这里实现总览数据的加载
    };
    this.loadDatacenters = function(){
      var self = this;
      $.ajax("tpl/dashboard.json").done(function(data){
        self.datacenters(data);
      });
    }
  }
  var viewModel = new ViewModel();
  ko.applyBindings(viewModel, $$(page.container)[0]);

  viewModel.loadData();
  viewModel.loadDatacenters();
});

var view_panel_right, view_home, view_business, view_pool, view_host, view_vm, view_storage, view_settings_left, view_settings_right;
var is_reload = false;

function popoverClose(event){
  var datacenter_id = $(event.target).attr("datacenter_id");

  view_panel_right       = view_panel_right || myApp.addView(".view-panel-right",   {dynamicNavbar: false,domCache: true,linksView: ".view-panel-right"});
  
  view_home                     = view_home || myApp.addView("#view-home",          {dynamicNavbar: false,domCache: true,linksView: "#view-home"});
  view_business             = view_business || myApp.addView("#view-business",      {dynamicNavbar: false,domCache: true,linksView: "#view-business"});
  view_pool                     = view_pool || myApp.addView("#view-pool",          {dynamicNavbar: false,domCache: true,linksView: "#view-pool"});
  view_host                     = view_host || myApp.addView("#view-host",          {dynamicNavbar: false,domCache: true,linksView: "#view-host"});
  view_vm                         = view_vm || myApp.addView("#view-vm",            {dynamicNavbar: false,domCache: true,linksView: "#view-vm"});
  view_storage              =  view_storage || myApp.addView("#view-storage",       {dynamicNavbar: false,domCache: true,linksView: "#view-storage"});
  view_settings_left   = view_settings_left || myApp.addView("#view-settings-left", {dynamicNavbar: false,domCache: true,linksView: "#view-settings-main"});
  view_settings_right = view_settings_right || myApp.addView("#view-settings-main", {dynamicNavbar: false,domCache: true,linksView: "#view-settings-main"});

  view_home.router.load({           url: "tpl/home/index.html?id="+datacenter_id,animatePages: false, reload:is_reload});  
  view_business.router.load({       url: "tpl/business/index.html?id="+datacenter_id,animatePages: false, reload:is_reload});
  view_pool.router.load({           url: "tpl/pool/index.html?id="+datacenter_id,animatePages: false, reload:is_reload});
  view_host.router.load({           url: "tpl/host/index.html?id="+datacenter_id,animatePages: false, reload:is_reload});
  view_vm.router.load({             url: "tpl/vm/index.html?id="+datacenter_id,animatePages: false, reload:is_reload});
  view_storage.router.load({        url: "tpl/storage/index.html?id="+datacenter_id,animatePages: false, reload:is_reload});    
  view_settings_left.router.load({  url: "tpl/settings/index.html?id="+datacenter_id,animatePages: false, reload:is_reload});
  view_settings_right.router.load({ url: "tpl/settings/profile.html?id="+datacenter_id,animatePages: false, reload:is_reload});

  myApp.showTab("#view-home");

  is_reload = true;

}