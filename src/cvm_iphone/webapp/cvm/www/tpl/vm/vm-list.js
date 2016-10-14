myApp.onPageInit("vm-list", function(page) {
  function ViewModel(){
    var self=this;
    this.loadData = function(){
    }
  }
  var viewModel = new ViewModel();
  ko.applyBindings(viewModel, $$(page.container)[0]);
  window.vmListVO = viewModel;
  viewModel.loadData();
});