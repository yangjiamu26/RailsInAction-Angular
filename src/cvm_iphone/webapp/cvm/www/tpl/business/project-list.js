myApp.onPageInit("project-list", function(page) {
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
    		console.log(self.searchVal());
    		self.loadData(self.searchVal());
    	}
    };
    this.busdomainNum = ko.observable("");
    this.projectNum = ko.observable("");
    this.dataList = ko.observableArray([]);
    this.busdomainName = ko.observable("");
    this.busdomainId = ko.observable("");
    this.isShowAll = ko.observable(true);
    this.projectNum2 = ko.observable("");
    this.dcName = ko.observable(CVM_IPHONE.dcName);
    if(page.query.domainId){
    	this.busdomainId(page.query.domainId);
    }

    this.loading = false;
    this.page = 1;
    this.noMore = ko.observable();
    self.isInit = true;
    this.loadData = function(is_loadMore, id, name){
      if (self.loading) return;
      self.loading = true;
      if(!is_loadMore) self.page = 1;

      // if(id&&name){
      //   this.isShowAll(false);
      //   this.busdomainId(id);
      //   this.busdomainName(name);
      // }else{
      //   this.isShowAll(true);
      //   this.busdomainId("");
      //   this.busdomainNum("");
      // }
      
      RestServiceJs.query(BASE_URL+"/busdomain/projects",{"dcId":CVM_IPHONE.dcId,"vdcId":self.busdomainId(), "firstResult":(self.page-1)*PAGE_SIZE,"maxResult":PAGE_SIZE},function(data){

        self.loading = false;
        if(!is_loadMore){
          myApp.pullToRefreshDone();
          if(!self.isInit){
            myApp.attachInfiniteScroll($$(page.container).find('.infinite-scroll'));
          }
          self.isInit = false;
          self.dataList.removeAll();
          self.noMore(false);
          if(data.data.length < PAGE_SIZE) self.noMore(true);
        }
        self.projectNum(data.size);
        for(var i=0; i<data.data.length; i++){       
          self.dataList.push(data.data[i]);
        }
        self.page++;

        if(is_loadMore && (data.data.length < PAGE_SIZE)){
          myApp.detachInfiniteScroll($$(page.container).find('.infinite-scroll'));
          $$(page.container).find('.infinite-scroll-preloader').remove();
          self.noMore(true);
        }
      });

    }
  }
  var viewModel = new ViewModel();
  ko.applyBindings(viewModel, $$(page.container)[0]);
  viewModel.loadData();

  $$(page.container).find('.pull-to-refresh-content').on('refresh', function (e) {
    viewModel.loadData(false,viewModel.busdomainId(),viewModel.busdomainName());
  });
  $$(page.container).find('.infinite-scroll').on('infinite', function () {
    viewModel.loadData(true,viewModel.busdomainId(),viewModel.busdomainName());
  });
});