myApp.onPageInit("business-summary", function(page) {
  function ViewModel(){
    this.summary = ko.observable({
      "vmNum": "", 
      "manager": "",
      "creatime": "",
      "creator": "",
      "desc": ""
    });
    this.loadData = function(){
      var self = this;
      RestServiceJs.get(BASE_URL+"/project",page.query.id,{},function(data){
        myApp.pullToRefreshDone();
        self.summary(data);
      });      
    };
  }
  var viewModel = new ViewModel();
  ko.applyBindings(viewModel, $$(page.container)[0]);
  
  viewModel.loadData();

  $$(page.container).find('.pull-to-refresh-content').on('refresh', function (e) {
    viewModel.loadData();
  });
});