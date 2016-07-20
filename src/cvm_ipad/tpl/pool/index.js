myApp.onPageInit("pool-index", function(page) {
  // 资源池-虚拟化类型占比
function initPool_vtype_chart(data) {
    $('#pool_vtype_chart').highcharts({
        chart: {
            marginTop: 0,
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
          margin: 0,
          layout: 'vertical',
          borderColor:"none",
          padding:0,
          labelFormat: '{name}：<b>{y}</b> 个',
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
            name: '虚拟化类型',
            data: [{
                  name: 'Winserver',
                  y: data.winserverNum,
                  color:"#4791d2"
              },
              {
                  name: 'VMware',
                  y: data.vmwareNum,
                  color:"#ffd800"
              },
              {
                  name: 'PowerVM',
                  y: data.powerNum,
                  color:"#5bd544"
              }
          ]
        }]
    });
}
// 资源池-cpu占比图
function initPool_cpu_chart(data) {
    $('#pool_cpu_chart').highcharts({
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
        labelFormat: '{name}：<b>{y:.2f}</b>Ghz',
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
                  y: (data.cpuTotal-data.availCpu)/1024,
                  color:"#ffd800"
              },
              {
                  name: '可用',
                  y: (data.availCpu)/1024,
                  color:"#59cb5c"
              }
          ]
      }]
    });   
}
// 资源池-内存占比图
function initPool_memory_chart(data) {
    $('#pool_memory_chart').highcharts({
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
        labelFormat: '{name}：<b>{y:.2f}</b>G',
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
                  y: (data.memoryTotal-data.availMemory)/1024,
                  color:"#ffd800"
              },
              {
                  name: '可用',
                  y: (data.availMemory)/1024,
                  color:"#59cb5c"
              }
          ]
      }]
    });   
}
// 资源池-存储占比图
function initPool_storage_chart(data) {
    $('#pool_storage_chart').highcharts({
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
        labelFormat: '{name}：<b>{y:.2f}</b>G',
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
                  y: data.storageTotal-data.availStorage,
                  color:"#ffd800"
              },
              {
                  name: '可用',
                  y: data.availStorage,
                  color:"#59cb5c"
              }
          ]
      }]
    });   
}

  function ViewModel(){
    this.hypervisor = ko.observable("");
    this.pools_count = ko.observable("");
    this.dataList = ko.observableArray([]);

    this.loading = false;
    this.page = 1;
    this.loadData = function(is_loadMore,hypervisor){
      if(hypervisor){
        this.hypervisor(hypervisor);
      }else{
        this.hypervisor("");
      }
      var self = this;
      if (self.loading) return;
      self.loading = true;
      if(!is_loadMore) self.page = 1;

      RestServiceJs(BASE_URL+"/resPool").query({"dcId":CVM_PAD.dcId,"hypervisor":this.hypervisor(), "firstResult":(self.page-1)*PAGE_SIZE+1,"maxResult":self.page*PAGE_SIZE},function(data){
        //$.ajax("tpl/pool/index.json?id="+page.query.id+"&page="+self.page).done(function(data){

        self.loading = false;
        if(!is_loadMore){
          myApp.pullToRefreshDone();
          self.dataList.removeAll();

          self.pools_count(data.data.length);
          initPool_vtype_chart(data);
          initPool_cpu_chart(data);
          initPool_memory_chart(data);
          initPool_storage_chart(data);
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
  viewModel.loadData();
  window.pool_index_viewModel = viewModel;

  $$(page.container).find('.pull-to-refresh-content').on('refresh', function (e) {
    viewModel.loadData(false, this.hypervisor());
  });
  $$(page.container).find('.infinite-scroll').on('infinite', function () {
    viewModel.loadData(true, this.hypervisor());
  });  
  
});

