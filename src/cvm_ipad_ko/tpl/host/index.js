myApp.onPageInit("host-index", function(page) {
  initHost_status_chart();
});

// 物理机-状态占比
function initHost_status_chart() {
    $('#host_status_chart').highcharts({
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
                  name: '维护',
                  y: 2,
                  color:"#4791d2"
              },
              {
                  name: '故障',
                  y: 1,
                  color:"#ffd800"
              },
              {
                  name: '开机',
                  y: 5,
                  color:"#5bd544"
              }
          ]
        }]
    });
}