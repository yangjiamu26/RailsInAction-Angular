myApp.onPageInit("business-index", function(page) {

  function ViewModel(){
    var self=this;
    var time = new Date().getTime();
    this.Time = ko.observable(time);
    this.dcInfo = ko.observable({
      "name":CVM_IPHONE.dcName,
      "id":CVM_IPHONE.dcId
    });
    this.showDomainSearch = ko.observable(true);
    this.showDomain = function(){
      this.showDomainSearch(true);
    }
    this.showProject = function(){
      this.showDomainSearch(false);
    }

    var view_business_domain,view_business_project;
    var is_reload = false;
    this.loadData = function(){
      view_business_domain  =  view_business_domain || myApp.addView('#view_business_domain'+self.Time(), {dynamicNavbar: false,domCache: true, linksView:'#view-business'});
      view_business_project = view_business_project || myApp.addView('#view_business_project'+self.Time(), {dynamicNavbar: false,domCache: true, linksView:'#view-business'});
      view_business_domain.router.load({url: 'tpl/business/domain-list.html',animatePages: false, reload:is_reload});
      view_business_project.router.load({url: 'tpl/business/project-list.html',animatePages: false, reload:is_reload});
      is_reload = true;
    }
  }
  var viewModel = new ViewModel();
  ko.applyBindings(viewModel, $$(page.container)[0]);
  window.BusinessIndexVO = viewModel;
});