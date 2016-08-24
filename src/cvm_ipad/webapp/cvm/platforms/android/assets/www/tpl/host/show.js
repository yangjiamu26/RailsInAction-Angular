myApp.onPageInit("host-show", function(page) {
  function ViewModel(){
    this.name = ko.observable(page.query.name);
    this.summary = ko.observable({
      "resourcePoolName":'',
      "cpuSlots":'',
      "ip":'',
      "state":'',
      "runTime":''
    });
    this.hypervisor = ko.observable(page.query.hypervisor);
    this.loadData = function(){
      var self = this;

      RestServiceJs(BASE_URL+"/host/"+page.query.id+"/summary").query({"dcId":CVM_PAD.dcId,"resPoolId":page.query.resourcePoolId,"hypervisor":page.query.hypervisor},function(data){
        //$.ajax("tpl/host/summary.json?id="+page.query.id).done(function(data){
        myApp.pullToRefreshDone();
        data.runTime = getTheTime(new Date() - new Date(data.runTime*1000));
        self.summary(data);
        window.HostIndex_Summary_details_viewModel.loadData(data);
      });
      var links = page.query.linksView || 'view-host';
      myApp.addView('#view_host_summary', {dynamicNavbar: false,domCache: true,linksView:'#'+links}).router.load({url: 'tpl/host/summary.html?id='+page.query.id+'&resourcePoolId='+page.query.resourcePoolId+"&hypervisor="+page.query.hypervisor,animatePages: false});
      myApp.addView('#view_host_vm',      {dynamicNavbar: false,domCache: true,linksView:'#'+links}).router.load({url: 'tpl/vm/list.html?fromPage=host&id='+page.query.id+'&resourcePoolId='+page.query.resourcePoolId+"&hypervisor="+page.query.hypervisor,animatePages: false});
      myApp.addView('#view_host_storage', {dynamicNavbar: false,domCache: true,linksView:'#'+links}).router.load({url: 'tpl/storage/list.html?fromPage=host&id='+page.query.id+'&resourcePoolId='+page.query.resourcePoolId+"&hypervisor="+page.query.hypervisor,animatePages: false});
    };
  }
  var viewModel = new ViewModel();
  ko.applyBindings(viewModel, $$(page.container)[0]);
  window.HostIndex_Summary_viewModel = viewModel;
  viewModel.loadData();
});

