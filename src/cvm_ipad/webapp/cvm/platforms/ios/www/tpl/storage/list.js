myApp.onPageInit("storage-list", function(page) {

  function ViewModel(){
    this.dataList = ko.observableArray([]);
    this.fromPage=ko.observable("");
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
      switch(page.query.fromPage){
        case "pool":
          this.fromPage("pool");
          url=BASE_URL+"/resPool/"+page.query.id+"/storagePool";
          break;
        case "host":
          this.fromPage("host");
          url=BASE_URL+"/host/"+page.query.id+"/storagePool";
          break;
      }
      
<<<<<<< HEAD
      RestServiceJs(url).query({"dcId":CVM_PAD.dcId,"hypervisor":page.query.hypervisor,"firstResult":(self.page-1)*PAGE_SIZE,"maxResult":self.page*PAGE_SIZE-1},function(data){
=======
      RestServiceJs(url).query({"dcId":CVM_PAD.dcId,"hypervisor":page.query.hypervisor,"firstResult":(self.page-1)*PAGE_SIZE,"maxResult":PAGE_SIZE},function(data){
>>>>>>> 410cbf4f02d60d813dc036b1bd603eacd2f499a6
        //$.ajax("tpl/storage/index.json?id="+page.query.id+"&page="+self.page).done(function(data){
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
          switch(data.data[i].state){
            case 'plugException':
              data.data[i].state='挂载异常';
              data.data[i].stateCss='orange';
              break;
            case 'OK':
              data.data[i].state='活动';
              data.data[i].stateCss='green';
              break;
            case 'unPlug':
              data.data[i].state='未挂载';
              data.data[i].stateCss='gray';
              break;
            case 'INACTIVE':
              data.data[i].state='未活动';
              data.data[i].stateCss='gray';
              break;
            case 'Deleting':
              data.data[i].state='删除中';
              data.data[i].stateCss='orange';
              break;
            case 'UnPluging':
              data.data[i].state='卸载中';
              data.data[i].stateCss='orange';
              break;
            case 'Pluging':
              data.data[i].state='挂载中';
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