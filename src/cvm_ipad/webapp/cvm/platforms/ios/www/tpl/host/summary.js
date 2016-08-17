myApp.onPageInit("host-summary", function(page) {
<<<<<<< HEAD
  function ViewModel(){
    this.summary = ko.observable({

    });
    this.loadData = function(){
      var self = this;
      $.ajax("tpl/host/summary.json?id="+page.query.id).done(function(data){
        myApp.pullToRefreshDone();
        self.summary(data);

        initSingleHost_cpu_chart();
        initSingleHost_memory_chart();
        initSingleHost_storage_chart();
      });      
=======
  // 单个资源池-cpu占比图
function initSingleHost_cpu_chart(data) {
  var unit = "GHz";
  if(data.hypervisor=="PowerVM") unit = "核";
    $('#singleHost_cpu_chart').highcharts({
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
        labelFormat: '{name}：<b>{y:.2f}</b>'+unit,
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
                  y: data.totalCpu-data.availCpu,
                  color:"#ffd800"
              },
              {
                  name: '未用',
                  y: data.availCpu,
                  color:"#4395d5"
              }
          ]
      }]
    });   
}
// 单个资源池-内存占比图
function initSingleHost_memory_chart(data) {
    $('#singleHost_memory_chart').highcharts({
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
        labelFormat: '{name}：<b>{y:.2f}</b>GB',
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
                  name: '未用',
                  y: data.availMemory,
                  color:"#4395d5"
              }
          ]
      }]
    });   
}
// 单个资源池-存储占比图
function initSingleHost_storage_chart(data) {
    $('#singleHost_storage_chart').highcharts({
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
                  name: '未用',
                  y: data.availStorage,
                  color:"#4395d5"
              }
          ]
      }]
    });   
}
  function ViewModel(){
    this.summary = ko.observable({
      "hypervisor":'',
      "vmNum":'',
      "runningVmNum":'',
      "cpuUnit":'',
      "cpuSlots":'',
      "cpuSpeed":'',
      "model":'',
      "vendor":'',
      "memory":'',
      "storage":''
    });
    this.loadData = function(data){
      var self = this;
      data.cpuSpeed = Number((parseFloat(data.cpuSpeed)/1024).toFixed(2));
      data.totalCpu = Number((parseFloat(data.totalCpu)/1024).toFixed(2));
      data.memory = Number((parseFloat(data.memory)/1024).toFixed(2));
      data.storage = Number((parseFloat(data.storage)/1024).toFixed(2));
      data.availCpu = Number((parseFloat(data.availCpu)/1024).toFixed(2));
      data.availMemory = Number((parseFloat(data.availMemory)/1024).toFixed(2));
      data.availStorage = Number((parseFloat(data.availStorage)/1024).toFixed(2));
      self.summary(data);
      initSingleHost_cpu_chart(data);
      initSingleHost_memory_chart(data);
      initSingleHost_storage_chart(data);
>>>>>>> 410cbf4f02d60d813dc036b1bd603eacd2f499a6
    };
  }
  var viewModel = new ViewModel();
  ko.applyBindings(viewModel, $$(page.container)[0]);
<<<<<<< HEAD
  
  viewModel.loadData();
=======
  window.HostIndex_Summary_details_viewModel = viewModel;
>>>>>>> 410cbf4f02d60d813dc036b1bd603eacd2f499a6

  $$(page.container).find('.pull-to-refresh-content').on('refresh', function (e) {
    viewModel.loadData();
  });
});