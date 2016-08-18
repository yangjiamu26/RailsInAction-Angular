myApp.onPageInit("storage-show", function(page) {
  function ViewModel(){
    this.name = ko.observable(page.query.name);

    this.loadData = function(){
<<<<<<< HEAD
      myApp.addView('#view_storage_summary', {dynamicNavbar: false,domCache: true,linksView:'#view-storage'}).router.load({url: 'tpl/storage/summary.html',animatePages: false});
      myApp.addView('#view_storage_volumn', {dynamicNavbar: false,domCache: true,linksView:'#view-storage'}).router.load({url: 'tpl/volumn/list.html',animatePages: false});  
=======
      myApp.addView('#view_storage_summary', {dynamicNavbar: false,domCache: true,linksView:'#view-storage'}).router.load({url: 'tpl/storage/summary.html?id='+page.query.id+'&hypervisor='+page.query.hypervisor,animatePages: false});
      myApp.addView('#view_storage_volumn', {dynamicNavbar: false,domCache: true,linksView:'#view-storage'}).router.load({url: 'tpl/volumn/list.html?fromPage=storage&id='+page.query.id+'&hypervisor='+page.query.hypervisor,animatePages: false});  
>>>>>>> 410cbf4f02d60d813dc036b1bd603eacd2f499a6
    };
  }
  var viewModel = new ViewModel();
  ko.applyBindings(viewModel, $$(page.container)[0]);
  
  viewModel.loadData();
});