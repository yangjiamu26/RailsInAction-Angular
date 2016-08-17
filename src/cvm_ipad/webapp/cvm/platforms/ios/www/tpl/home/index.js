myApp.onPageInit("home-index", function(page) {
  function ViewModel(){
    this.dcInfo = ko.observable({
        "id": "",
        "name": ""
      });
    this.setDcInfo = function(){
      this.dcInfo({
        "id": CVM_PAD.dcId,
        "name": CVM_PAD.dcName
      });
    }
    this.stat = ko.observable({
      "vmNum": "",
<<<<<<< HEAD
      "cpuTotal": "",
=======
      "x86TotalCpu": "",
      "pvmTotalCpu": "",
>>>>>>> 410cbf4f02d60d813dc036b1bd603eacd2f499a6
      "memoryTotal": "",
      "storageTotal": "",
      "busdomainNum": "",
      "projectNum": "",
      "resPoolNum": "",
      "hostNum": ""
    });
    this.loadData = function(){
      var self = this;
      RestServiceJs(BASE_URL+"/overallDetails").get(CVM_PAD.dcId,{},function(data){
        myApp.pullToRefreshDone();
<<<<<<< HEAD
        self.stat(data);
        initTotal_cpu_chart_home(data);
=======
        data.x86TotalCpu = parseFloat((data.x86TotalCpu/1024).toFixed(2));
        data.x86UsedCpu = parseFloat((data.x86UsedCpu/1024).toFixed(2));
        data.memoryTotal = parseFloat((data.memoryTotal/1024).toFixed(2));
        data.memoryUsed = parseFloat((data.memoryUsed/1024).toFixed(2));
        self.stat(data);
        initTotal_cpu_chart_home(data);
        initTotal_cpu_chart_home2(data);
>>>>>>> 410cbf4f02d60d813dc036b1bd603eacd2f499a6
        initTotal_memory_chart_home(data);
        initTotal_storage_chart_home(data);
      });
    }
  }
  var viewModel = new ViewModel();
  ko.applyBindings(viewModel, $$(page.container)[0]);

  viewModel.loadData();
  viewModel.setDcInfo();

  $$(page.container).find('.pull-to-refresh-content').on('refresh', function (e) {
    viewModel.loadData();
  });

});
// 首页cpu占比图
function initTotal_cpu_chart_home(data) {
    $('#total_cpu_chart_home').highcharts({
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
        // labelFormatter: function() {  
        //             return this.name + '：' + '<span style="{color}">'+ this.y + 'GHz' + '</span>';  
        // }, 
<<<<<<< HEAD
        labelFormat: '{name}：<b>{y}</b>个',
=======
        labelFormat: '{name}：<b>{y:.2f}</b>GHz',
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
          name: 'CPU',
          data: [{
                  name: '已用',
<<<<<<< HEAD
                  y: data.cpuUsed,
=======
                  y: data.x86UsedCpu,
>>>>>>> 410cbf4f02d60d813dc036b1bd603eacd2f499a6
                  color:"#4791d2"
              },
              {
                  name: '未用',
<<<<<<< HEAD
                  y: data.cpuTotal-data.cpuUsed,
=======
                  y: data.x86TotalCpu-data.x86UsedCpu,
                  color:"#ffd800"
              }
          ]
      }]
    });   
}
function initTotal_cpu_chart_home2(data) {
    $('#total_cpu_chart_home2').highcharts({
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
        // labelFormatter: function() {  
        //             return this.name + '：' + '<span style="{color}">'+ this.y + 'GHz' + '</span>';  
        // }, 
        labelFormat: '{name}：<b>{y:.2f}</b>核',
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
          name: 'CPU',
          data: [{
                  name: '已用',
                  y: data.pvmUsedCpu,
                  color:"#4791d2"
              },
              {
                  name: '未用',
                  y: data.pvmTotalCpu-data.pvmUsedCpu,
>>>>>>> 410cbf4f02d60d813dc036b1bd603eacd2f499a6
                  color:"#ffd800"
              }
          ]
      }]
    });   
}
// 首页内存占比图
function initTotal_memory_chart_home(data) {
    $('#total_memory_chart_home').highcharts({
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
<<<<<<< HEAD
        labelFormat: '{name}：<b>{y}</b>G',
=======
        labelFormat: '{name}：<b>{y:.2f}</b>G',
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
          name: '内存',
          data: [{
                  name: '已用',
                  y: data.memoryUsed,
                  color:"#4791d2"
              },
              {
                  name: '未用',
                  y: data.memoryTotal - data.memoryUsed,
                  color:"#ffd800"
              }
          ]
      }]
    });   
}
// 首页存储占比图
function initTotal_storage_chart_home(data) {
    $('#total_storage_chart_home').highcharts({
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
<<<<<<< HEAD
        labelFormat: '{name}：<b>{y}</b>G',
=======
        labelFormat: '{name}：<b>{y:.2f}</b>G',
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
                  name: '已用',
                  y: data.storageUsed,
                  color:"#4791d2"
              },
              {
                  name: '未用',
                  y: data.storageTotal - data.storageUsed,
                  color:"#ffd800"
              }
          ]
      }]
    });   
}
