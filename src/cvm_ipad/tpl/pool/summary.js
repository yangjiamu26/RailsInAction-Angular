myApp.onPageInit("pool-summary", function(page) {
// 单个资源池-cpu占比图
function initSinglePool_cpu_chart(data) {
    $('#singlePool_cpu_chart').highcharts({
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
        labelFormat: '{name}：<b>{y:.2f}</b>颗',
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
                  y: data.cpu-data.availCpu,
                  color:"#ffd800"
              },
              {
                  name: '可用',
                  y: data.availCpu,
                  color:"#59cb5c"
              }
          ]
      }]
    });   
}
// 单个资源池-内存占比图
function initSinglePool_memory_chart(data) {
    $('#singlePool_memory_chart').highcharts({
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
                  y: data.memory-data.availMemory,
                  color:"#ffd800"
              },
              {
                  name: '可用',
                  y: data.availMemory,
                  color:"#59cb5c"
              }
          ]
      }]
    });   
}
// 单个资源池-存储占比图
function initSinglePool_storage_chart(data) {
    $('#singlePool_storage_chart').highcharts({
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
                  y: data.storage-data.availStorage,
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
    this.summary = ko.observable({
      "hostNum":"",
      "vmNum":"",
      "hypervisor":"",
      "cpu":"",
      "memory":"",
      "storage":""
    });
    this.loadData = function(){
      var self = this;
      RestServiceJs(BASE_URL+"/resPool").get(page.query.id,{"dcId":CVM_PAD.dcId,"hypervisor":page.query.hypervisor,"resourcePoolName":page.query.resourcePoolName},function(data){
      //$.ajax("tpl/pool/summary.json?id="+page.query.id).done(function(data){
        myApp.pullToRefreshDone();
        self.summary(data);

        initSinglePool_cpu_chart(data);
        initSinglePool_memory_chart(data);
        initSinglePool_storage_chart(data);
      });      
    };
  }
  var viewModel = new ViewModel();
  ko.applyBindings(viewModel, $$(page.container)[0]);
  
  viewModel.loadData();

  $$(page.container).find('.pull-to-refresh-content').on('refresh', function (e) {
    viewModel.loadData();
  });
});