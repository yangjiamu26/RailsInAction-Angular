myApp.onPageInit("host-list", function(page) {

  function ViewModel(){
    this.dataList = ko.observableArray([]);
    this.hypervisor = ko.observable("");
    this.resPoolId = ko.observable("");

    this.loading = false;
    this.page = 1;
    this.noMore = ko.observable();
    this.loadData = function(is_loadMore, hypervisor, resPoolId){
      if(hypervisor){
        this.hypervisor(hypervisor);
      }else if(page.query.hypervisor){
        this.hypervisor(page.query.hypervisor);
      }else{
        this.hypervisor("");
      }
      if(resPoolId){
        this.resPoolId(resPoolId);
      }else if(page.query.id){
        this.resPoolId(page.query.id);
      }else{
        this.resPoolId("");
      }
      var self = this;
      if (self.loading) return;
      self.loading = true;
      if(!is_loadMore) self.page = 1;

      RestServiceJs(BASE_URL+"/resPool/"+page.query.id+"/host").query({"dcId":CVM_PAD.dcId,"hypervisor":this.hypervisor(),"firstResult":(self.page-1)*PAGE_SIZE,"maxResult":PAGE_SIZE},function(data){
      //$.ajax("tpl/host/list.json?id="+page.query.id+"&page="+self.page).done(function(data){
        self.loading = false;
        if(!is_loadMore){
          myApp.pullToRefreshDone();
          myApp.attachInfiniteScroll($$(page.container).find('.infinite-scroll'));
          self.dataList.removeAll();
          self.noMore(false);
          if(data.data.length < PAGE_SIZE) self.noMore(true);
        }
        for(var i=0; i<data.data.length; i++){
          self.dataList.push(data.data[i]);
        }
        self.page++;
        if(is_loadMore && (data.data.length < PAGE_SIZE)){
          myApp.detachInfiniteScroll($$(page.container).find('.infinite-scroll'));
          $$(page.container).find('.infinite-scroll-preloader').remove();
          self.noMore(true);
        }
      })
    }
  }
  var viewModel = new ViewModel();
  ko.applyBindings(viewModel, $$(page.container)[0]);

  viewModel.loadData(false);

  $$(page.container).find('.pull-to-refresh-content').on('refresh', function (e) {
    viewModel.loadData(false,viewModel.hypervisor(),viewModel.resPoolId());
  });
  $$(page.container).find('.infinite-scroll').on('infinite', function () {
          console.log(1)
    viewModel.loadData(true,viewModel.hypervisor(),viewModel.resPoolId());
  });  

});