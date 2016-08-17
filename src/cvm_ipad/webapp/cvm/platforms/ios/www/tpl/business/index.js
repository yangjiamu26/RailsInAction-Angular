myApp.onPageInit("business-index", function(page) {
  // 业务域-cpu占比图
function init_cpu_chart(data) {
  console.log(data)
    $('#business_cpu_chart').highcharts({
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
          
          fontWeight: 'normal',
          fontSize:'12px'
        },
<<<<<<< HEAD
        labelFormat: '{name}：<b>{y}</b>GHz',
=======
        labelFormat: '{name}：<b>{y}</b>个',
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
                  color:'#6d6d72',
                  distance: -25,
                  style:{
                    fontSize:'12px',
                    fontWeight:'normal'
                  },
                  format: '{point.percentage:.1f}%'
              },
              showInLegend: true
          }
      },
      series: [{
          type: 'pie',
          name: 'CPU',
          data: [{
                  name: '已用',
                  y: data.cpuUsed,
                  color:"#ffd800"
              },
              {
                  name: '未用',
                  y: data.cpuTotal-data.cpuUsed,
                  color:"#59cb5c"
              }
          ]
      }]
    });   
}
// 资源池-内存占比图
function init_memory_chart(data) {
  console.log(data)
    $('#business_memory_chart').highcharts({
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
          
          fontWeight: 'normal',
          fontSize:'12px'
        },
        labelFormat: '{name}：<b>{y}</b>G',
      },
      plotOptions: {
          pie: {
              innerSize: '70%',
              borderWidth:1,
              allowPointSelect: false,
              cursor: 'pointer',
              dataLabels: {
                  enabled: true,
                  color:'#6d6d72',
                  distance: -25,
                  style:{
                    fontSize:'12px',
                    fontWeight:'normal'
                  },
                  format: '{point.percentage:.1f}%'
              },
              showInLegend: true
          }
      },
      series: [{
          type: 'pie',
          name: '内存',
          data: [{
                  name: '已用',
                  y: data.memoryUsed,
                  color:"#ffd800"
              },
              {
                  name: '未用',
                  y: data.memoryTotal-data.memoryUsed,
                  color:"#59cb5c"
              }
          ]
      }]
    });   
}
// 资源池-存储占比图
function init_storage_chart(data) {
  console.log(data)
    $('#business_storage_chart').highcharts({
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
          
          fontWeight: 'normal',
          fontSize:'12px'
        },
        labelFormat: '{name}：<b>{y}</b>G',
      },
      plotOptions: {
          pie: {
              innerSize: '70%',
              borderWidth:1,
              allowPointSelect: false,
              cursor: 'pointer',
              dataLabels: {
                  enabled: true,
                  color:'#6d6d72',
                  distance: -25,
                  style:{
                    fontSize:'12px',
                    fontWeight:'normal'
                  },
                  format: '{point.percentage:.1f}%'
              },
              showInLegend: true
          }
      },
      series: [{
          type: 'pie',
          name: '存储',
          data: [{
                  name: '已用',
                  y: data.storageUsed,
                  color:"#ffd800"
              },
              {
                  name: '未用',
                  y: data.storageTotal-data.storageUsed,
                  color:"#59cb5c"
              }
          ]
      }]
    });   
}

  function ViewModel(){
    this.busdomainNum = ko.observable("");
    this.projectNum = ko.observable("");
    this.dataList = ko.observableArray([]);
    this.busdomainName = ko.observable("");
    this.isShowAll = ko.observable(true);
    this.projectNum2 = ko.observable("");

    this.loading = false;
    this.page = 1;
    this.loadData = function(is_loadMore, id, name){
      var self = this;
      if (self.loading) return;
      self.loading = true;
      if(!is_loadMore) self.page = 1;

      if(id&&name){
        this.isShowAll(false);
        this.busdomainName(name);
      }else{
        this.isShowAll(true);
<<<<<<< HEAD
        this.busdomainNum(window.indexFilter_viewModel.busdomain.busdomainNum);
      }
      
      RestServiceJs(BASE_URL+"/busdomain/projects").query({"vdcId":id?id:"", "firstResult":(self.page-1)*PAGE_SIZE,"maxResult":self.page*PAGE_SIZE-1},function(data){
=======
        this.busdomainNum(window.indexFilter_busdomain_viewModel.busdomain.busdomainNum);
      }
      
      RestServiceJs(BASE_URL+"/busdomain/projects").query({"vdcId":id?id:"", "firstResult":(self.page-1)*PAGE_SIZE,"maxResult":PAGE_SIZE},function(data){
>>>>>>> 410cbf4f02d60d813dc036b1bd603eacd2f499a6

        self.projectNum(data.size);
        if(id&&name){
          init_cpu_chart(data.busdomain);
          init_memory_chart(data.busdomain);
          init_storage_chart(data.busdomain);
        }

        self.loading = false;
        if(!is_loadMore){
          myApp.pullToRefreshDone();
<<<<<<< HEAD
=======
          myApp.attachInfiniteScroll($$(page.container).find('.infinite-scroll'));
>>>>>>> 410cbf4f02d60d813dc036b1bd603eacd2f499a6
          self.dataList.removeAll();
        }
        if(is_loadMore && (data.data.length < PAGE_SIZE)){
          myApp.detachInfiniteScroll($$(page.container).find('.infinite-scroll'));
          $$(page.container).find('.infinite-scroll-preloader').remove();
          return;
        }
        for(var i=0; i<data.data.length; i++){       
          self.dataList.push(data.data[i]);
        }
        self.page++;
      });

    }
  }
  var viewModel = new ViewModel();
  ko.applyBindings(viewModel, $$(page.container)[0]);

  window.business_index_viewModel = viewModel;

  $$(page.container).find('.pull-to-refresh-content').on('refresh', function (e) {
    viewModel.loadData();
  });
  $$(page.container).find('.infinite-scroll').on('infinite', function () {
    viewModel.loadData(true);
  });

<<<<<<< HEAD
  window.indexFilter_viewModel.getBusinessDomains();
=======
  window.indexFilter_busdomain_viewModel.getBusinessDomains();
>>>>>>> 410cbf4f02d60d813dc036b1bd603eacd2f499a6
});


