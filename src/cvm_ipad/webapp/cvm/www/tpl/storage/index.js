myApp.onPageInit("storage-index", function(page) {

// 存储池-是否共享占比图
function initStorage_share_chart(share, total) {
    $('#storage_share_chart').highcharts({
      chart: {
          marginTop: 10,
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          backgroundColor: "none"
      },
      exporting:{
          enabled: false
      },
      credits:{
          enabled: false,
          text : ""
      },

      title: {
          floating:true,
          text: ''
      },
      legend:{
        enabled:true,
        margin: 0,
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        itemMarginTop: 10,
        backgroundColor:"none",
        borderColor:"none",
        itemStyle: {
          
          fontWeight: 'normal'
        },
        labelFormat: '{name}：<b>{y:.2f}</b>TB',
      },
      plotOptions: {
          pie: {
              innerSize: '70%',
              borderWidth:1,
              allowPointSelect: false,
              cursor: 'pointer',
              dataLabels: {
                  enabled: true,
                  distance: -25,
                  color: '#6d6d72',
                  style:{
                    fontSize:'13px'
                  },
                  connectorColor: '#000000',
                  format: '{point.percentage:.1f} %'
              },
              showInLegend: true
          }
      },
      series: [{
          type: 'pie',
          name: '存储',
          data: [{
                  name: '共享',
                  y: share,
                  color:"#fadf4f"
              },
              {
                  name: '本地',
                  y: total-share,
                  color:"#f87b38"
              }
          ]
      }]
    });   
}


// 存储池-使用率占比图
function initStorage_use_chart(free, total) {
    $('#storage_use_chart').highcharts({
      chart: {
          marginTop: 10,
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          backgroundColor: "none"
      },
      exporting:{
          enabled: false
      },
      credits:{
          enabled: false,
          text : ""
      },

      title: {
          floating:true,
          text: ''
      },
      legend:{
        enabled:true,
        margin: 0,
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        itemMarginTop: 10,
        backgroundColor:"none",
        borderColor:"none",
        itemStyle: {
          
          fontWeight: 'normal'
        },
        labelFormat: '{name}：<b>{y:.2f}</b>TB',
      },
      plotOptions: {
          pie: {
              innerSize: '70%',
              borderWidth:1,
              allowPointSelect: false,
              cursor: 'pointer',
              dataLabels: {
                  enabled: true,
                  distance: -25,
                  color: '#6d6d72',
                  style:{
                    fontSize:'13px'
                  },
                  connectorColor: '#000000',
                  format: '{point.percentage:.1f} %'
              },
              showInLegend: true
          }
      },
      series: [{
          type: 'pie',
          name: '存储',
          data: [{
                  name: '未用',
                  y: free,
                  color:"#fadf4f"
              },
              {
                  name: '已用',
                  y: total-free,
                  color:"#f87b38"
              }
          ]
      }]
    });   
}

  function ViewModel(){
    this.hypervisor = ko.observable("");
    this.resPoolId = ko.observable("");
    this.dataList = ko.observableArray([]);
    this.dcName = ko.observable(CVM_PAD.dcName);
    this.infos = ko.observable({
      "totalSize":'',
      "sharedSize":'',
      "local":'',
      "used":'',
      "availSize":'',
      "svc":'',
      "nfs":'',
      "storage":''
    });

    this.loading = false;
    this.page = 1;
    this.loadData = function(is_loadMore, hypervisor, resPoolId){
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
      var self = this;
      if (self.loading) return;
      self.loading = true;
      if(!is_loadMore) self.page = 1;

      RestServiceJs(BASE_URL+"/storagePool").query({"dcId":CVM_PAD.dcId,"resPoolId":this.resPoolId(),"hypervisor":this.hypervisor(), "firstResult":(self.page-1)*PAGE_SIZE,"maxResult":PAGE_SIZE},function(data){
      //$$.getJSON("tpl/storage/index.json?id="+page.query.id+"&page="+self.page,function(data){
        data.totalSize = Number((Number(data.totalSize)/1024).toFixed(2));
        data.sharedSize = Number(data.sharedSize/1024);
        data.availSize = Number(data.availSize/1024);
        self.infos(data);
        self.loading = false;
        if(!is_loadMore){
          myApp.pullToRefreshDone();
          myApp.attachInfiniteScroll($$(page.container).find('.infinite-scroll'));
          self.dataList.removeAll();

          initStorage_share_chart(data.sharedSize,data.totalSize);
          initStorage_use_chart(data.availSize,data.totalSize);
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
  window.storage_index_viewModel = viewModel;
  
  viewModel.loadData();

  $$(page.container).find('.pull-to-refresh-content').on('refresh', function (e) {
    viewModel.loadData();
  });
  $$(page.container).find('.infinite-scroll').on('infinite', function () {
    viewModel.loadData(true);
  });  
  
});





