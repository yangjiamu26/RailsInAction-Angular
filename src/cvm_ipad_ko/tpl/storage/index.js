
// 存储池-是否共享占比图
function initStorage_share_chart() {
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
                  name: '共享',
                  y: 4.73,
                  color:"#fadf4f"
              },
              {
                  name: '本地',
                  y: 3.81,
                  color:"#f87b38"
              }
          ]
      }]
    });   
}


// 存储池-使用率占比图
function initStorage_use_chart() {
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
