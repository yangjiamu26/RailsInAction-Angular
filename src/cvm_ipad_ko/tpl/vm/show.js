myApp.onPageInit("vm-show", function(page) {
  function ViewModel(){
    this.name = ko.observable(page.query.name);

    this.loadData = function(){
      myApp.addView('#view_vm_summary', {dynamicNavbar: false,domCache: true,linksView:'#view-vm'}).router.load({url: 'tpl/vm/summary.html',animatePages: false});
      myApp.addView('#view_vm_performance',      {dynamicNavbar: false,domCache: true,linksView:'#view-vm'}).router.load({url: 'tpl/vm/performance.html',animatePages: false});
      myApp.addView('#view_vm_volumn', {dynamicNavbar: false,domCache: true,linksView:'#view-vm'}).router.load({url: 'tpl/volumn/list.html',animatePages: false});
    };
  }
  var viewModel = new ViewModel();
  ko.applyBindings(viewModel, $$(page.container)[0]);
  
  viewModel.loadData();
});