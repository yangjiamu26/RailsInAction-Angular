myApp.onPageInit("business-project-index", function(page) {

  function ViewModel(){
    var self=this;
    var time = new Date().getTime();
    this.Time = ko.observable(time);
    this.dcInfo = ko.observable({
      "name":'asda'
    })
    this.loadData = function(){
      myApp.addView('#view_domain_project'+self.Time(), {dynamicNavbar: false,domCache: true, linksView:'#view-business'}).router.load({url: 'tpl/business/project-list.html',animatePages: false});
    }
  }
  var viewModel = new ViewModel();
  ko.applyBindings(viewModel, $$(page.container)[0]);
  window.BusinessIndexVO = viewModel;
  viewModel.loadData();
});