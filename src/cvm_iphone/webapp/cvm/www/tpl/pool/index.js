myApp.onPageInit("pool-index", function(page) {

  function ViewModel(){
    var self = this;
    this.hypervisor = ko.observable("");
    this.pools_count = ko.observable("");
    this.dataList = ko.observableArray([]);
    this.dcName = ko.observable(CVM_IPHONE.dcName);
    this.dcInfo = ko.observable({
      "id": CVM_IPHONE.dcId,
      "name": CVM_IPHONE.dcName
    });
    this.stat = ko.observable({
      "winserverNum": 0,
      "pvmCpuTotal": 0,
      "availMemory": 0,
      "storageTotal": 0,
      "X86AvailCpu": 0,
      "X86CpuTotal": 0,
      "pvmAvailCpu": 0,
      "availStorage": 0,
      "vmwareNum": 0,
      "memoryTotal": 0,
      "powerNum": 0,
      "size":0
    });

    this.loading = false;
    this.page = 1;
    this.noMore = ko.observable();
    self.isInit = true;
    this.loadData = function(is_loadMore,hypervisor){
      if(hypervisor){
        this.hypervisor(hypervisor);
      }else{
        this.hypervisor("");
      }
      if (self.loading) return;
      self.loading = true;
      if(!is_loadMore) self.page = 1;

      RestServiceJs.query(BASE_URL+"/resPool",{"dcId":CVM_IPHONE.dcId,"hypervisor":this.hypervisor(), "firstResult":(self.page-1)*PAGE_SIZE,"maxResult":PAGE_SIZE},function(data){
        //$.ajax("tpl/pool/index.json?id="+page.query.id+"&page="+self.page).done(function(data){

        self.loading = false;
        if(!is_loadMore){
          myApp.pullToRefreshDone();
          data.size = data.powerNum+data.vmwareNum+data.winserverNum;
          self.stat(data);
          if(!self.isInit){
            myApp.attachInfiniteScroll($$(page.container).find('.infinite-scroll'));
          }
          self.isInit = false;
          self.dataList.removeAll();

          var dataLength
          if(!data.data){
            dataLength = 0;
          }else{
            dataLength = data.data.length;
          }
          self.pools_count(dataLength);
          
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
  window.pool_index_viewModel = viewModel;

  $$(page.container).find('.pull-to-refresh-content').on('refresh', function (e) {
    viewModel.loadData(false, viewModel.hypervisor());
  });
  $$(page.container).find('.infinite-scroll').on('infinite', function () {
    viewModel.loadData(true, viewModel.hypervisor());
  });

});
