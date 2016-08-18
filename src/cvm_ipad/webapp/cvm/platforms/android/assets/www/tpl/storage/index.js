myApp.onPageInit("storage-index", function(page) {

<<<<<<< HEAD
  function ViewModel(){
    this.dataList = ko.observableArray([]);
    this.infos = ko.observable({
      "total":'',
      "share":'',
      "local":'',
      "used":'',
      "free":'',
      "svc":'',
      "nfs":'',
      "storage":''
    });

    this.loading = false;
    this.page = 1;
    this.loadData = function(is_loadMore){
      var self = this;
      if (self.loading) return;
      self.loading = true;
      if(!is_loadMore) self.page = 1;

      $.ajax("tpl/storage/index.json?id="+page.query.id+"&page="+self.page).done(function(data){
        self.infos(data);
        self.loading = false;
        if(!is_loadMore){
          myApp.pullToRefreshDone();
          self.dataList.removeAll();

          initStorage_share_chart(data.share,data.local);
          initStorage_use_chart(data.used,data.total);
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


// 存储池-是否共享占比图
function initStorage_share_chart(share, local) {
=======
// 存储池-是否共享占比图
function initStorage_share_chart(share, total) {
>>>>>>> 410cbf4f02d60d813dc036b1bd603eacd2f499a6
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
<<<<<<< HEAD
        labelFormat: '{name}：<b>{y:.2f}</b>GHz',
=======
        labelFormat: '{name}：<b>{y:.2f}</b>TB',
>>>>>>> 410cbf4f02d60d813dc036b1bd603eacd2f499a6
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
<<<<<<< HEAD
                  y: local,
=======
                  y: total-share,
>>>>>>> 410cbf4f02d60d813dc036b1bd603eacd2f499a6
                  color:"#f87b38"
              }
          ]
      }]
    });   
}


// 存储池-使用率占比图
<<<<<<< HEAD
function initStorage_use_chart(used, total) {
=======
function initStorage_use_chart(free, total) {
>>>>>>> 410cbf4f02d60d813dc036b1bd603eacd2f499a6
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
<<<<<<< HEAD
        labelFormat: '{name}：<b>{y:.2f}</b>GHz',
=======
        labelFormat: '{name}：<b>{y:.2f}</b>TB',
>>>>>>> 410cbf4f02d60d813dc036b1bd603eacd2f499a6
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
<<<<<<< HEAD
                  y: total-used,
=======
                  y: free,
>>>>>>> 410cbf4f02d60d813dc036b1bd603eacd2f499a6
                  color:"#fadf4f"
              },
              {
                  name: '已用',
<<<<<<< HEAD
                  y: used,
=======
                  y: total-free,
>>>>>>> 410cbf4f02d60d813dc036b1bd603eacd2f499a6
                  color:"#f87b38"
              }
          ]
      }]
    });   
}

<<<<<<< HEAD
// 单个存储池-使用率占比图
function initsingleStorage_use_chart() {
    $('#singleStorage_use_chart').highcharts({
      chart: {
          marginTop: 0,
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
        backgroundColor:"none",
        borderColor:"none",
        itemStyle: {
          
          fontWeight: 'normal'
        },
        labelFormat: '{name}：<b>{y}</b>GHz',
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
                  y: 2.73,
                  color:"#fadf4f"
              },
              {
                  name: '已用',
                  y: 5.81,
                  color:"#f87b38"
              }
          ]
      }]
    });   
}

// 单个存储池-分配率占比图
function initsingleStorage_assigned_chart() {
    $('#singleStorage_assigned_chart').highcharts({
      chart: {
          marginTop: 0,
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
        backgroundColor:"none",
        borderColor:"none",
        itemStyle: {
          
          fontWeight: 'normal'
        },
        labelFormat: '{name}：<b>{y}</b>GHz',
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
                  name: '未分配',
                  y: 3.73,
                  color:"#fadf4f"
              },
              {
                  name: '已分配',
                  y: 4.81,
                  color:"#f87b38"
              }
          ]
      }]
    });   
}
=======
  function ViewModel(){
    this.hypervisor = ko.observable("");
    this.resPoolId = ko.observable("");
    this.dataList = ko.observableArray([]);
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





>>>>>>> 410cbf4f02d60d813dc036b1bd603eacd2f499a6
