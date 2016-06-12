
// 虚拟机-操作系统占比
function initVm_os_chart() {
    $('#vm_os_chart').highcharts({
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
                innerSize: '40%',
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
            name: '操作系统',
            data: [{
                  name: 'Windows',
                  y: 40,
                  color:"#4791d2"
              },
              {
                  name: 'AIX',
                  y: 10,
                  color:"#ffd800"
              },
              {
                  name: 'Linux',
                  y: 28,
                  color:"#5bd544"
              }
          ]
        }]
    });
}


// 虚拟机-状态占比
function initVm_status_chart() {
    $('#vm_status_chart').highcharts({
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
                innerSize: '40%',
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
            data: [{
                  name: '运行中',
                  y: 55,
                  color:"#4791d2"
              },
              {
                  name: '已关机',
                  y: 10,
                  color:"#ffd800"
              },
              {
                  name: '其他',
                  y: 13,
                  color:"#5bd544"
              }
          ]
        }]
    });
}