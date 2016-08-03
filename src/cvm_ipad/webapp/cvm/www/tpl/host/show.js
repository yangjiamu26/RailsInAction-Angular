myApp.onPageInit("host-show", function(page) {
  function ViewModel(){
    this.name = ko.observable(page.query.name);

    this.loadData = function(){
      myApp.addView('#view_host_summary', {dynamicNavbar: false,domCache: true,linksView:'#view-host'}).router.load({url: 'tpl/host/summary.html?id='+page.query.id,animatePages: false});
      myApp.addView('#view_host_vm',      {dynamicNavbar: false,domCache: true,linksView:'#view-host'}).router.load({url: 'tpl/vm/list.html?fromPage=host&id='+page.query.id+'&resourcePoolId='+page.query.resourcePoolId,animatePages: false});
      myApp.addView('#view_host_storage', {dynamicNavbar: false,domCache: true,linksView:'#view-host'}).router.load({url: 'tpl/storage/list.html',animatePages: false});
    };
  }
  var viewModel = new ViewModel();
  ko.applyBindings(viewModel, $$(page.container)[0]);
  
  viewModel.loadData();
});

// 单个资源池-cpu占比图
function initSingleHost_cpu_chart() {
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
                  y: 11.93,
                  color:"#ffd800"
              },
              {
                  name: '未用',
                  y: 25.19,
                  color:"#4395d5"
              }
          ]
      }]
    });   
}
// 单个资源池-内存占比图
function initSingleHost_memory_chart() {
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
                  y: 112.64,
                  color:"#ffd800"
              },
              {
                  name: '未用',
                  y: 76.11,
                  color:"#4395d5"
              }
          ]
      }]
    });   
}
// 单个资源池-存储占比图
function initSingleHost_storage_chart() {
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
                  y: 4.73,
                  color:"#ffd800"
              },
              {
                  name: '未用',
                  y: 3.81,
                  color:"#4395d5"
              }
          ]
      }]
    });   
}