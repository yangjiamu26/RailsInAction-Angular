myApp.onPageInit("vm-list", function(page) {

  function ViewModel(){
    this.dataList = ko.observableArray([]);
    this.fromPage = ko.observable();
<<<<<<< HEAD
=======
    this.hypervisor = ko.observable(page.query.hypervisor);
>>>>>>> 410cbf4f02d60d813dc036b1bd603eacd2f499a6

    this.loading = false;
    this.page = 1;
    this.loadData = function(is_loadMore){
      var self = this;
      if (self.loading) return;
      self.loading = true;
      if(!is_loadMore) self.page = 1;

      var url;
      var resourcePoolId='';
      switch(page.query.fromPage){
        case "project":
          this.fromPage("project");
          url=BASE_URL+"/project/"+page.query.id+"/vm";
          break;
        case "pool":
          this.fromPage("pool");
          url=BASE_URL+"/resPool/"+page.query.id+"/vm";
          resourcePoolId=page.query.id;
          break;
        case "host":
          this.fromPage("host");
          url=BASE_URL+"/host/"+page.query.id+"/vm";
<<<<<<< HEAD
          break;
      }
      RestServiceJs(url).query({"dcId":CVM_PAD.dcId,"hypervisor":page.query.hypervisor,"resourcePoolId":resourcePoolId,"firstResult":(self.page-1)*PAGE_SIZE,"maxResult":self.page*PAGE_SIZE-1},function(data){
=======
          resourcePoolId=page.query.resourcePoolId
          break;
      }
      RestServiceJs(url).query({"dcId":CVM_PAD.dcId,"hypervisor":page.query.hypervisor || '',"resourcePoolId":resourcePoolId,"firstResult":(self.page-1)*PAGE_SIZE,"maxResult":PAGE_SIZE},function(data){
>>>>>>> 410cbf4f02d60d813dc036b1bd603eacd2f499a6
      //$.ajax("tpl/vm/list.json?id="+page.query.id+"&page="+self.page).done(function(data){
        self.loading = false;
        if(!is_loadMore){
          myApp.pullToRefreshDone();
<<<<<<< HEAD
=======
          myApp.attachInfiniteScroll($$(page.container).find('.infinite-scroll'));
>>>>>>> 410cbf4f02d60d813dc036b1bd603eacd2f499a6
          self.dataList.removeAll();
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
              data.data[i].stateCss='gray';
              break;
            case 'OK':
              data.data[i].state='运行中';
              data.data[i].stateCss='green';
              break;
            case 'disconnected':
              data.data[i].state='已断开';
              data.data[i].stateCss='gray';
              break;
            case 'STOPPING':
              data.data[i].state='正在关机';
              data.data[i].stateCss='orange';
              break;
            case 'STARTING':
              data.data[i].state='正在开机';
              data.data[i].stateCss='yellow';
              break;
            case 'DELETING':
              data.data[i].state='正在删除';
              data.data[i].stateCss='orange';
              break;
            case 'RESTARTING':
              data.data[i].state='正在重启';
              data.data[i].stateCss='yellow';
              break;
            case 'EXECUTING':
              data.data[i].state='正在部署';
              data.data[i].stateCss='yellow';
              break;
            case 'UNKNOWN':
              data.data[i].state='未知';
              data.data[i].stateCss='gray';
              break;
            case 'SUSPENDED':
              data.data[i].state='挂起';
              data.data[i].stateCss='orange';
              break;
            case 'RESIZING':
              data.data[i].state='调整中';
              data.data[i].stateCss='orange';
              break;
            case 'SUSPENDING':
              data.data[i].state='挂起中';
              data.data[i].stateCss='orange';
              break;
            case 'RESUMEING':
              data.data[i].state='恢复中';
              data.data[i].stateCss='orange';
              break;
            case 'CONVERTING':
              data.data[i].state='转换中';
              data.data[i].stateCss='orange';
              break;
            case 'RELOCATING':
              data.data[i].state='迁移中';
              data.data[i].stateCss='orange';
              break;
            case 'REVERTING':
              data.data[i].state='还原中';
              data.data[i].stateCss='orange';
              break;
            case 'SAVE_AS_TEMPLATE':
              data.data[i].state='另存为模板中';
              data.data[i].stateCss='orange';
              break;
          }
          
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

  viewModel.loadData();

  $$(page.container).find('.pull-to-refresh-content').on('refresh', function (e) {
    viewModel.loadData();
  });
  $$(page.container).find('.infinite-scroll').on('infinite', function () {
    viewModel.loadData(true);
  });
});