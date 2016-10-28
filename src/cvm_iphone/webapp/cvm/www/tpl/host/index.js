myApp.onPageInit("host-index", function(page) {

  function ViewModel(){
    var self = this;
    this.dcInfo = ko.observable({
      "id": CVM_IPHONE.dcId,
      "name": CVM_IPHONE.dcName
    });
    this.hypervisor = ko.observable("");
    this.resPoolId = ko.observable("");
    this.hostId = ko.observable("");
    this.dataList = ko.observableArray([]);
    this.hostSize = ko.observable("");
    this.dcName = ko.observable(CVM_IPHONE.dcName);
    this.infos = ko.observable({
      'okHost':0,
      'stoppedHost':0,
      'otherHost':0,
      'size':0
    })

    this.loading = false;
    this.page = 1;
    this.noMore = ko.observable();
    self.isInit = true;
    this.loadData = function(is_loadMore,hypervisor,resPoolId,hostId){
      if(hypervisor){
        this.hypervisor(hypervisor);
      }else{
        this.hypervisor("");
      }
      if(resPoolId){
        this.resPoolId(resPoolId);
      }else{
        this.resPoolId("");
      }
      if(hostId){
        this.hostId(hostId);
      }else{
        this.hostId("");
      }
      if (self.loading) return;
      self.loading = true;
      if(!is_loadMore) self.page = 1;

      RestServiceJs.query(BASE_URL+"/host",{"dcId":CVM_IPHONE.dcId,"resPoolId":this.resPoolId(),"hypervisor":this.hypervisor(), "firstResult":(self.page-1)*PAGE_SIZE,"maxResult":PAGE_SIZE},function(data){
        self.loading = false;
        data.otherHost = Number(data.size)-Number(data.stoppedHost)-Number(data.okHost)
        self.infos(data);
        if(!is_loadMore){
          myApp.pullToRefreshDone();
          if(!self.isInit){
            myApp.attachInfiniteScroll($$(page.container).find('.infinite-scroll'));
          }
          self.isInit = false;
          self.dataList.removeAll();

          self.hostSize(data.size);
          var nums = [0,0,0,0];
          if(data.data){
            for(var i=0; i<data.data.length; i++){
              switch(data.data[i].state){
                case 'OK':
                  nums[0]++;
                  break;
                case 'RESTART':
                  nums[1]++;
                  break;
                case 'DISCONNECT':
                  nums[2]++;
                  break;
                case 'MAINTAIN':
                  nums[3]++;
                  break;
              }
            }
          }
          self.noMore(false);
          if(data.data.length < PAGE_SIZE) self.noMore(true);
        }
        for(var i=0; i<data.data.length; i++){
          data.data[i].memoryGB = (Number(data.data[i].memory)/1024).toFixed(2);
          switch(data.data[i].state){
            case 'OK':
              data.data[i].state='运行中';
              data.data[i].stateCss='green';
              break;
            case 'RESTART':
              data.data[i].state='重启中';
              data.data[i].stateCss='orange';
              break;
            case 'DISCONNECT':
              data.data[i].state='未运行';
              data.data[i].stateCss='gray';
              break;
            case 'MAINTAIN':
              data.data[i].state='维护';
              data.data[i].stateCss='gray';
              break;
          }
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
  window.HostIndex_viewModel = viewModel;

  $$(page.container).find('.pull-to-refresh-content').on('refresh', function (e) {
    viewModel.loadData(false, viewModel.hypervisor(), viewModel.resPoolId(), viewModel.hostId());
  });
  $$(page.container).find('.infinite-scroll').on('infinite', function () {
    viewModel.loadData(true, viewModel.hypervisor(), viewModel.resPoolId(), viewModel.hostId());
  });  
  
});

