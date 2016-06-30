myApp.onPageInit("business-summary", function(page) {
  function ViewModel(){
    this.summary = ko.observable({
      "vms_count": "", 
      "admin": "",
      "date": "",
      "user": "",
      "mark": ""
    });
    this.loadData = function(){
      var self = this;
      $.ajax("tpl/business/summary.json?id="+page.query.id).done(function(data){
        myApp.pullToRefreshDone();
        self.summary(data);

        initTotal_cpu_chart();
        initTotal_memory_chart();
        initTotal_storage_chart();
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