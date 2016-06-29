myApp.onPageInit("pool-summary", function(page) {
  
  function ViewModel(){
    this.summary = ko.observable({

    });
    this.loadData = function(){
      var self = this;
      $.ajax("tpl/pool/summary.json?id="+page.query.id).done(function(data){
        myApp.pullToRefreshDone();
        self.summary(data);

        initSinglePool_cpu_chart();
        initSinglePool_memory_chart();
        initSinglePool_storage_chart();
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