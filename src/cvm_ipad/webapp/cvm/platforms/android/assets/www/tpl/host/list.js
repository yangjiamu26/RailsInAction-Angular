myApp.onPageInit("host-list", function(page) {

  function ViewModel(){
    this.dataList = ko.observableArray([]);
    this.hypervisor = ko.observable("");
    this.resPoolId = ko.observable("");

    this.loading = false;
    this.page = 1;
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

      RestServiceJs(BASE_URL+"/resPool/"+page.query.id+"/host").query({"dcId":CVM_PAD.dcId,"hypervisor":this.hypervisor(),"firstResult":(self.page-1)*PAGE_SIZE,"maxResult":self.page*PAGE_SIZE-1},function(data){
      //$.ajax("tpl/host/list.json?id="+page.query.id+"&page="+self.page).done(function(data){
        self.loading = false;
        if(!is_loadMore){
          myApp.pullToRefreshDone();
          self.dataList.removeAll();
        }
        for(var i=0; i<data.data.length; i++){
          self.dataList.push(data.data[i]);
        }
        self.page++;
        if(is_loadMore && (data.data.length < PAGE_SIZE)){
          myApp.detachInfiniteScroll($$(page.container).find('.infinite-scroll'));
          $$(page.container).find('.infinite-scroll-preloader').remove();
        }
      })
    }
  }
  var viewModel = new ViewModel();
  ko.applyBindings(viewModel, $$(page.container)[0]);

  viewModel.loadData(false,"","");

  $$(page.container).find('.pull-to-refresh-content').on('refresh', function (e) {
    viewModel.loadData();
  });
  $$(page.container).find('.infinite-scroll').on('infinite', function () {
    viewModel.loadData(true);
  });  

});