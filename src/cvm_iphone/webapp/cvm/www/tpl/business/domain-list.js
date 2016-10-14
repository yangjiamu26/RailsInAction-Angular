myApp.onPageInit("domain-list", function(page) {
  function ViewModel(){
    var self=this;
    this.loadData = function(){
    }
  }
  var viewModel = new ViewModel();
  ko.applyBindings(viewModel, $$(page.container)[0]);
  window.BusinessDomainVO = viewModel;
  viewModel.loadData();
});