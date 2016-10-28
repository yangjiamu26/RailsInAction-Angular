myApp.onPageInit("business-project-index", function(page) {

  function ViewModel(){
    var self=this;
    var time = new Date().getTime();
    this.Time = ko.observable(time);
    this.domainInfo = ko.observable({
      "name":page.query.domainName,
      "id":page.query.domainId
    })
    this.loadData = function(){
      myApp.addView('#view_domain_project'+self.Time(), {dynamicNavbar: false,domCache: true, linksView:'#view-business'}).router.load({url: 'tpl/business/project-list.html?domainId='+page.query.domainId,animatePages: false});
    }
  }
  var viewModel = new ViewModel();
  ko.applyBindings(viewModel, $$(page.container)[0]);
  viewModel.loadData();
});