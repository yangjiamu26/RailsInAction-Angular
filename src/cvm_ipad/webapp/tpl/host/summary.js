myApp.onPageInit("host-summary", function(page) {
  function ViewModel(){
    this.summary = ko.observable({

    });
    this.loadData = function(){
      var self = this;
      $.ajax("tpl/host/summary.json?id="+page.query.id).done(function(data){
        myApp.pullToRefreshDone();
        self.summary(data);

        initSingleHost_cpu_chart();
        initSingleHost_memory_chart();
        initSingleHost_storage_chart();
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