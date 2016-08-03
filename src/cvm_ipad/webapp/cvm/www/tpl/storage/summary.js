myApp.onPageInit("storage-summary", function(page) {
  
  function ViewModel(){
    this.summary = ko.observable({

    });
    this.loadData = function(){
      var self = this;
      $$.getJSON("tpl/storage/summary.json?id="+page.query.id, function(data){
        myApp.pullToRefreshDone();
        self.summary(data);

        initsingleStorage_use_chart();
        initsingleStorage_assigned_chart();
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