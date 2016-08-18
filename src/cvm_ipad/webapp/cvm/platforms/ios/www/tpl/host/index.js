myApp.onPageInit("host-index", function(page) {
<<<<<<< HEAD
  
  function ViewModel(){
    this.dataList = ko.observableArray([]);

    this.loading = false;
    this.page = 1;
    this.loadData = function(is_loadMore){
      var self = this;
      if (self.loading) return;
      self.loading = true;
      if(!is_loadMore) self.page = 1;

      $.ajax("tpl/host/index.json?id="+page.query.id+"&page="+self.page).done(function(data){
        self.loading = false;
        if(!is_loadMore){
          myApp.pullToRefreshDone();
          self.dataList.removeAll();

          initHost_status_chart();
        }
        for(var i=0; i<data.dataList.length; i++){       
          self.dataList.push(data.dataList[i]);
        }
        self.page++;
        if(is_loadMore && (data.dataList.length < PAGE_SIZE)){
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

// 物理机-状态占比
function initHost_status_chart() {
=======
  // 物理机-状态占比
function initHost_status_chart(nums) {
>>>>>>> 410cbf4f02d60d813dc036b1bd603eacd2f499a6
    $('#host_status_chart').highcharts({
        chart: {
            marginTop: 15,
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            backgroundColor: "none"
        },
        title: {
            text: ''
        },
        credits:{
          enabled: false,
          text : ""
        }, 
        legend:{
          layout: 'vertical',
          align: 'right',
          verticalAlign: 'middle',
          borderColor:"none",
          labelFormat: '{name}：<b>{y}</b> 台',
          itemMarginTop: 10,
          itemStyle: {
            
            fontWeight: 'normal',
            fontSize:'12px'
          },          
        },
        plotOptions: {
            pie: {
                borderWidth:0,
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        series: [{
            type: 'pie',
            name: '状态',
<<<<<<< HEAD
            data: [{
                  name: '维护',
                  y: 2,
                  color:"#4791d2"
              },
              {
                  name: '故障',
                  y: 1,
                  color:"#ffd800"
              },
              {
                  name: '开机',
                  y: 5,
                  color:"#5bd544"
=======
            data: [
              {
                  name: '开机',
                  y: nums[0],
                  color:"#5bd544"
              },{
                  name: '重启',
                  y: nums[1],
                  color:"#ffd800"
              },{
                  name: '关机',
                  y: nums[2],
                  color:"#666"
              },{
                  name: '维护',
                  y: nums[3],
                  color:"#4791d2"
>>>>>>> 410cbf4f02d60d813dc036b1bd603eacd2f499a6
              }
          ]
        }]
    });
<<<<<<< HEAD
}
=======
}
  
  function ViewModel(){
    this.hypervisor = ko.observable("");
    this.resPoolId = ko.observable("");
    this.hostId = ko.observable("");
    this.dataList = ko.observableArray([]);
    this.hostSize = ko.observable("");

    this.loading = false;
    this.page = 1;
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
      var self = this;
      if (self.loading) return;
      self.loading = true;
      if(!is_loadMore) self.page = 1;

      RestServiceJs(BASE_URL+"/host").query({"dcId":CVM_PAD.dcId,"resPoolId":this.resPoolId(),"hypervisor":this.hypervisor(), "firstResult":(self.page-1)*PAGE_SIZE,"maxResult":PAGE_SIZE},function(data){
      //$.ajax("tpl/host/index.json?id="+page.query.id+"&page="+self.page).done(function(data){
        self.loading = false;
        if(!is_loadMore){
          myApp.pullToRefreshDone();
          myApp.attachInfiniteScroll($$(page.container).find('.infinite-scroll'));
          self.dataList.removeAll();

          self.hostSize(data.size);
          var nums = [0,0,0,0];
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
          initHost_status_chart(nums);
        }
        for(var i=0; i<data.data.length; i++){
          switch(data.data[i].state){
            case 'OK':
              data.data[i].state='运行中';
              data.data[i].stateCss='green';
              break;
            case 'RESTART':
              data.data[i].state='重启中';
              data.data[i].stateCss='green';
              break;
            case 'DISCONNECT':
              data.data[i].state='未运行';
              data.data[i].stateCss='green';
              break;
            case 'MAINTAIN':
              data.data[i].state='维护';
              data.data[i].stateCss='green';
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
  window.HostIndex_viewModel = viewModel;

  window.indexFilter_host_viewModel.getResPools();

  $$(page.container).find('.pull-to-refresh-content').on('refresh', function (e) {
    viewModel.loadData(false, viewModel.hypervisor(), viewModel.resPoolId(), viewModel.hostId());
  });
  $$(page.container).find('.infinite-scroll').on('infinite', function () {
    viewModel.loadData(true, viewModel.hypervisor(), viewModel.resPoolId(), viewModel.hostId());
  });  
  
});

>>>>>>> 410cbf4f02d60d813dc036b1bd603eacd2f499a6
