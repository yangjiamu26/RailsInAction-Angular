myApp.onPageInit("project-list", function(page) {
  function ViewModel(){
    var self=this;
    this.loadData = function(){
    }
  }
  var viewModel = new ViewModel();
  ko.applyBindings(viewModel, $$(page.container)[0]);
  window.BusinessProjectVO = viewModel;
  viewModel.loadData();
});