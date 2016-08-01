myApp.onPageInit("vm-index", function(page) {
  
  function ViewModel(){
    this.dataList = ko.observableArray([]);

    this.loading = false;
    this.page = 1;
    this.loadData = function(is_loadMore){
      var self = this;
      if (self.loading) return;
      self.loading = true;
      if(!is_loadMore) self.page = 1;

      $$.getJSON("tpl/vm/index.json?id="+page.query.id+"&page="+self.page,function(data){
        self.loading = false;
        if(!is_loadMore){
          myApp.pullToRefreshDone();
          self.dataList.removeAll();

          initVm_os_chart();
          initVm_status_chart();
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

// 单个虚拟机内存使用率曲线
function initMemoryUse_chart() {
    $('#memoryUse_chart').highcharts({
        title: {
            text: '内存使用率(%)',
        },
        credits:{
          enabled: false,
          text : ""
        },  
        colors: [
            '#E35733', // orange
            '#4c97d7', // blue
            '#52d74c', // green
            '#e268de' // purple
        ],               
        xAxis: {
            categories: ['06-08', '06-09', '06-10', '06-11', '06-12', '06-13','06-14', '06-15', '06-16', '06-17', '06-18', '06-19']
        },
        yAxis: {
            title: {
                text: ''
            },
        },        
        tooltip: {
            valueSuffix: '%'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0,
            itemMarginTop: 10
        },
        series: [{
            name: '内存使用率',
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }]
    });
}
// 单个虚拟机cpu总量使用率曲线
function initcpuUse_chart1() {
    $('#cpuUse_chart1').highcharts({
        title: {
            text: 'CPU使用率(%)',
        },
        credits:{
          enabled: false,
          text : ""
        },  
        colors: [
            '#E35733', // orange
            '#4c97d7', // blue
            '#52d74c', // green
            '#e268de' // purple
        ],               
        xAxis: {
            categories: ['06-08', '06-09', '06-10', '06-11', '06-12', '06-13','06-14', '06-15', '06-16', '06-17', '06-18', '06-19']
        },
        yAxis: {
            title: {
                text: ''
            },
        },        
        tooltip: {
            valueSuffix: '%'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0,
            itemMarginTop: 10
        },
        series: [{
            name: 'CPU使用率',
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }]
    });
}
// 单个虚拟机cpu线程使用率曲线
function initcpuUse_chart2() {
    $('#cpuUse_chart2').highcharts({
        title: {
            text: 'CPU使用率(%)',
        },
        credits:{
          enabled: false,
          text : ""
        },  
        colors: [
            '#E35733', // orange
            '#4c97d7', // blue
            '#52d74c', // green
            '#e268de' // purple
        ],               
        xAxis: {
            categories: ['06-08', '06-09', '06-10', '06-11', '06-12', '06-13','06-14', '06-15', '06-16', '06-17', '06-18', '06-19']
        },
        yAxis: {
            title: {
                text: ''
            },
        },        
        tooltip: {
            valueSuffix: '%'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0,
            itemMarginTop: 10
        },
        series: [{
            name: 'CPU0使用率',
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }, {
            name: 'CPU1使用率',
            data: [0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
        }, {
            name: 'CPU2使用率',
            data: [0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
        }, {
            name: 'CPU3使用率',
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
        }]
    });
}
