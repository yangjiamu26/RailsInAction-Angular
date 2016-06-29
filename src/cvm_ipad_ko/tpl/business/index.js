myApp.onPageInit("business-index", function(page) {
  function ViewModel(){
    this.pools_count = ko.observable("");
    this.businesses_count = ko.observable("");
    this.dataList = ko.observableArray([]);

    this.loading = false;
    this.page = 1;
    this.loadData = function(is_loadMore){
      var self = this;
      if (self.loading) return;
      self.loading = true;
      if(!is_loadMore) self.page = 1;

      $.ajax("tpl/business/index.json?id="+page.query.id+"&page="+self.page).done(function(data){
        self.loading = false;
        self.pools_count(data.pools_count);
        self.businesses_count(data.businesses_count);
        if(!is_loadMore){
          myApp.pullToRefreshDone();
          self.dataList.removeAll();
        }
        for(var i=0; i<data.dataList.length; i++){       
          self.dataList.push(data.dataList[i]);
        }
        self.page++;
        if(is_loadMore && (data.dataList.length < PAGE_SIZE)){
          myApp.detachInfiniteScroll($$(page.container).find('.infinite-scroll'));
          $$(page.container).find('.infinite-scroll-preloader').remove();
        }
      })
    }
  }
  var viewModel = new ViewModel();
  ko.applyBindings(viewModel, $$(page.container)[0]);

  viewModel.loadData();

  $$(page.container).find('.pull-to-refresh-content').on('refresh', function (e) {
    viewModel.loadData();
  });
  $$(page.container).find('.infinite-scroll').on('infinite', function () {
    viewModel.loadData(true);
  });
});