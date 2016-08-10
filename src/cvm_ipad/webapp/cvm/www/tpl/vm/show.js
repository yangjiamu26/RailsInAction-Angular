myApp.onPageInit("vm-show", function(page) {
  function ViewModel(){
    var self = this;
    this.name = ko.observable(page.query.name);
    this.summary = ko.observable({
      "ip": '',
      "state":'',
      "runTime":''
    })

    this.loadData = function(){
      RestServiceJs(BASE_URL+"/vm/"+page.query.id+"/summary").query({"dcId":CVM_PAD.dcId,"hypervisor":page.query.hypervisor},function(data){
        console.log(data)
        self.summary(data);
        window.vm_summary_viewModal.loadData(data)
      });
      myApp.addView('#view_vm_summary', {dynamicNavbar: false,domCache: true,linksView:'#view-vm'}).router.load({url: 'tpl/vm/summary.html',animatePages: false});
      myApp.addView('#view_vm_performance',      {dynamicNavbar: false,domCache: true,linksView:'#view-vm'}).router.load({url: 'tpl/vm/performance.html',animatePages: false});
      myApp.addView('#view_vm_volumn', {dynamicNavbar: false,domCache: true,linksView:'#view-vm'}).router.load({url: 'tpl/volumn/list.html?fromPage=vm&hypervisor='+page.query.hypervisor+'&id='+page.query.id,animatePages: false});
    };
  }
  var viewModel = new ViewModel();
  ko.applyBindings(viewModel, $$(page.container)[0]);
  
  viewModel.loadData();
});