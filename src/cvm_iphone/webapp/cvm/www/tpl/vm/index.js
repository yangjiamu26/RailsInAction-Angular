myApp.onPageInit("vm-index", function(page) {
  function ViewModel(){
    this.hypervisor = ko.observable("");
    this.resPoolId = ko.observable("");
    this.hostId = ko.observable("");
    this.dataList = ko.observableArray([]);
    this.dcName = ko.observable(CVM_IPHONE.dcName);
    this.vmNum = ko.observable("");
    this.okStateVm = ko.observable("");
    this.stoppeStatedVm = ko.observable("");
    this.otherStatedVm = ko.observable("");

    this.loading = false;
    this.page = 1;
    this.noMore = ko.observable();
    self.isInit = true;
    this.loadData = function(is_loadMore, hypervisor, resPoolId, hostId){
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
      var self = this;
      if (self.loading) return;
      self.loading = true;
      if(!is_loadMore) self.page = 1;

      RestServiceJs.query(BASE_URL+"/vm",{"dcId":CVM_IPHONE.dcId,"resourcePoolId":this.resPoolId(),"ownerHostId":this.hostId(),"hypervisor":this.hypervisor(), "firstResult":(self.page-1)*PAGE_SIZE,"maxResult":PAGE_SIZE},function(data){
      //$$.getJSON("tpl/vm/index.json?id="+page.query.id+"&page="+self.page,function(data){
        self.loading = false;
        if(!is_loadMore){
          myApp.pullToRefreshDone();
          if(!self.isInit){
            myApp.attachInfiniteScroll($$(page.container).find('.infinite-scroll'));
          }
          self.isInit = false;
          self.dataList.removeAll();

          var os = [data.winVm,data.linuxVm,data.othersVm], status = [data.okStateVm,data.stoppeStatedVm,data.otherStatedVm];
          self.vmNum(data.size);
          self.okStateVm(data.okStateVm);
          self.stoppeStatedVm(data.stoppeStatedVm);
          self.otherStatedVm(data.otherStatedVm);

          self.noMore(false);
          if(data.data.length < PAGE_SIZE) self.noMore(true);
        }
        for(var i=0; i<data.data.length; i++){
          var reg1 = /windows/i,
              reg2 = /centos/i,
              reg3 = /redhat/i,
              reg4 = /suse/i;
          if(data.data[i].osVersion.match(reg1)&&data.data[i].osVersion.match(reg1).index>-1){
            data.data[i].type="windows";
          }else if(data.data[i].osVersion.match(reg2)&&data.data[i].osVersion.match(reg2).index>-1){
            data.data[i].type="centos";
          }else if(data.data[i].osVersion.match(reg3)&&data.data[i].osVersion.match(reg3).index>-1){
            data.data[i].type="redhat";
          }else if(data.data[i].osVersion.match(reg4)&&data.data[i].osVersion.match(reg4).index>-1){
            data.data[i].type="suse";
          }else{
            data.data[i].type="others";
          }
          switch(data.data[i].state){
            case 'STOPPED':
              data.data[i].state='已关机';
              data.data[i].stateCss='poweroff';
              break;
            case 'OK':
              data.data[i].state='运行中';
              data.data[i].stateCss='green';
              break;
            case 'disconnected':
              data.data[i].state='已断开';
              data.data[i].stateCss='poweroff';
              break;
            case 'STOPPING':
              data.data[i].state='正在关机';
              data.data[i].stateCss='warning';
              break;
            case 'STARTING':
              data.data[i].state='正在开机';
              data.data[i].stateCss='warning';
              break;
            case 'DELETING':
              data.data[i].state='正在删除';
              data.data[i].stateCss='warning';
              break;
            case 'RESTARTING':
              data.data[i].state='正在重启';
              data.data[i].stateCss='warning';
              break;
            case 'EXECUTING':
              data.data[i].state='正在部署';
              data.data[i].stateCss='warning';
              break;
            case 'UNKNOWN':
              data.data[i].state='未知';
              data.data[i].stateCss='poweroff';
              break;
            case 'SUSPENDED':
              data.data[i].state='挂起';
              data.data[i].stateCss='warning';
              break;
            case 'RESIZING':
              data.data[i].state='调整中';
              data.data[i].stateCss='warning';
              break;
            case 'SUSPENDING':
              data.data[i].state='挂起中';
              data.data[i].stateCss='warning';
              break;
            case 'RESUMEING':
              data.data[i].state='恢复中';
              data.data[i].stateCss='warning';
              break;
            case 'CONVERTING':
              data.data[i].state='转换中';
              data.data[i].stateCss='warning';
              break;
            case 'RELOCATING':
              data.data[i].state='迁移中';
              data.data[i].stateCss='warning';
              break;
            case 'REVERTING':
              data.data[i].state='还原中';
              data.data[i].stateCss='warning';
              break;
            case 'SAVE_AS_TEMPLATE':
              data.data[i].state='另存为模板中';
              data.data[i].stateCss='warning';
              break;
            default:
              data.data[i].state='异常';
              data.data[i].stateCss='danger';
              break;
          }
          data.data[i].memory = Number((Number(data.data[i].memory)/1024).toFixed(2));
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
  window.vmIndexVO = viewModel;

  $$(page.container).find('.pull-to-refresh-content').on('refresh', function (e) {
    viewModel.loadData(false,viewModel.hypervisor(),viewModel.resPoolId(),viewModel.hostId());
  });
  $$(page.container).find('.infinite-scroll').on('infinite', function () {
    viewModel.loadData(true,viewModel.hypervisor(),viewModel.resPoolId(),viewModel.hostId());
  });
});