myApp.onPageInit("volumn-list", function(page) {

  function ViewModel(){
    this.dataList = ko.observableArray([]);
<<<<<<< HEAD
=======
    this.fromPage = ko.observable('');
>>>>>>> 410cbf4f02d60d813dc036b1bd603eacd2f499a6

    this.loading = false;
    this.page = 1;
    this.loadData = function(is_loadMore){
      var self = this;
      if (self.loading) return;
      self.loading = true;
      if(!is_loadMore) self.page = 1;

<<<<<<< HEAD
      $.ajax("tpl/volumn/list.json?id="+page.query.id+"&page="+self.page).done(function(data){
        self.loading = false;
        if(!is_loadMore){
          myApp.pullToRefreshDone();
          self.dataList.removeAll();
        }
        for(var i=0; i<data.dataList.length; i++){       
          self.dataList.push(data.dataList[i]);
        }
        self.page++;
        if(is_loadMore && (data.dataList.length < PAGE_SIZE)){
=======
      var url;
      switch(page.query.fromPage){
        case "vm":
          this.fromPage("vm");
          url=BASE_URL+"/vm/"+page.query.id+"/disk";
          break;
        case "storage":
          this.fromPage("storage");
          url=BASE_URL+"/storagePool/"+page.query.id+"/disk";
          break;
      }

      RestServiceJs(url).query({"dcId":CVM_PAD.dcId,"hypervisor":page.query.hypervisor,"firstResult":(self.page-1)*PAGE_SIZE,"maxResult":PAGE_SIZE},function(data){
      //$$.getJSON("tpl/volumn/list.json?id="+page.query.id+"&page="+self.page, function(data){
        self.loading = false;
        if(!is_loadMore){
          myApp.pullToRefreshDone();
          myApp.attachInfiniteScroll($$(page.container).find('.infinite-scroll'));
          self.dataList.removeAll();
        }
        for(var i=0; i<data.data.length; i++){       
          self.dataList.push(data.data[i]);
        }
        self.page++;
        if(is_loadMore && (data.data.length < PAGE_SIZE)){
>>>>>>> 410cbf4f02d60d813dc036b1bd603eacd2f499a6
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