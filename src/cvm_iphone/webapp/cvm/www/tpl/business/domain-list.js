
myApp.onPageInit("domain-list", function(page) {

  function ViewModel(){
    var self=this;
    this.searchVal = ko.observable('');
    this.SearchKeyup = function(e){
		if(e.keycode == 13){
			self.startSearch();
		}
	}
    this.startSearch = function(){
    	if(!!self.searchVal()){
    		self.loadData(self.searchVal());
    	}
    };
    this.busdomain = {
      list:ko.observableArray([]),
      busdomainNum:ko.observable(),
      projectNum:ko.observable()
    };

    this.loading = false;
    this.page = 1;
    this.noMore = ko.observable();
    self.isInit = true;
    this.loadData = function(searchVal,is_loadMore){
      if (self.loading) return;
      self.loading = true;
      if(!is_loadMore) self.page = 1;

      RestServiceJs.query(BASE_URL+"/busdomain",{"dcId":CVM_IPHONE.dcId,"name":searchVal},function(data){
      	myApp.pullToRefreshDone();
      	self.loading = false;
        if(!is_loadMore){
          myApp.pullToRefreshDone();
          self.busdomain.busdomainNum(data.busdomainNum);
          self.busdomain.projectNum(data.projectNum);
          if(!self.isInit){
            myApp.attachInfiniteScroll($$(page.container).find('.infinite-scroll'));
          }
          self.isInit = false;
          self.busdomain.list.removeAll();

          var dataLength
          if(!data.data){
            dataLength = 0;
          }else{
            dataLength = data.data.length;
          }
          
          self.noMore(false);
          if(data.data.length < PAGE_SIZE) self.noMore(true);
        }
        
        for(var i=0;i<data.data.length;i++){
          self.busdomain.list.push(data.data[i]);
        }
        self.page++;
        if(is_loadMore && (data.data.length < PAGE_SIZE)){
          myApp.detachInfiniteScroll($$(page.container).find('.infinite-scroll'));
          $$(page.container).find('.infinite-scroll-preloader').remove();
          self.noMore(true);
        }
      });
    };
  }
  var viewModel = new ViewModel();
  ko.applyBindings(viewModel, $$(page.container)[0]);
  window.BusinessDomainVO = viewModel;
  viewModel.loadData();

  $$(page.container).find('.pull-to-refresh-content').on('refresh', function (e) {
    viewModel.loadData();
  });
  $$(page.container).find('.infinite-scroll').on('infinite', function () {
    viewModel.loadData(viewModel.searchVal(),true);
  });  
});