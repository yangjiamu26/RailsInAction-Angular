myApp.onPageInit("vm-performance", function(page) {

// 单个虚拟机内存使用率曲线
function initMemoryUse_chart(data, xAxis) {
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
            categories: xAxis
        },
        yAxis: {
            title: {
                text: ''
            }
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
        series: [data]
    });
}
// 单个虚拟机cpu总量使用率曲线
function initcpuUse_chart1(data,xAxis) {
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
            categories: xAxis
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
        series: [data]
    });
}
// 单个虚拟机cpu线程使用率曲线
function initcpuUse_chart2(data,xAxis) {
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
            categories: xAxis
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
        series: data
    });
}

  function ViewModel(){
    var self = this;
    this.name = ko.observable(page.query.name);
    this.isShowCharts = ko.observable(true);
    this.memory = ko.observable('');

    this.timeItems = ko.observableArray(['最近十分钟','最近一小时','最近一天','最近一周','最近一个月','最近一年','自定义']);
    this.timeSelected = ko.observable("最近一小时");
    this.showSelect = ko.observable(false);

    this.setTimeSelected = function(val){
      self.timeSelected(val);
      var type="",start="",end="";
      switch(val){
        case '最近十分钟':
          type = 'cunstom';
          start = (Date.parse(new Date())-600000);
          end = Date.parse(new Date());
          break;
        case '最近一小时':
          type = "hour";
          start = (Date.parse(new Date())-3600000);
          end = Date.parse(new Date());
          break;
        case '最近一天':
          type = "day";
          start = (Date.parse(new Date())-86400000);
          end = Date.parse(new Date());
          break;
        case '最近一周':
          type = "week";
          start = (Date.parse(new Date())-604800000);
          end = Date.parse(new Date());
          break;
        case '最近一个月':
          type = "month";
          start = (Date.parse(new Date())-2592000000);
          end = Date.parse(new Date());
          break;
        case '最近一年':
          type = "year";
          start = (Date.parse(new Date())-31536000000);
          end = Date.parse(new Date());
          break;
        case '自定义':
          type = "cunstom";
          start = "";
          end = "";
          $$('#vmPerformanceDate').val('');
          break;
      }
      if(type=="cunstom" && start=="" && end==""){
        self.showSelect(true);
      }else{
        self.showSelect(false);
        self.loadData(type,start,end);
      }
    }

    this.loadData = function(type,start,end){

      RestServiceJs(BASE_URL+"/vm/"+page.query.id+"/statics").query({"dcId":CVM_PAD.dcId,"hypervisor":page.query.hypervisor,"type":type,"startTime":start||"","endTime":end||""},function(data){
        var startTime = new Date(Number(data.meta.start+"000"));
        var endTime = new Date(Number(data.meta.end+"000"));
        var timeRange = endTime - startTime;
        var isDay = false;
        if(timeRange > 86400000){
          isDay = true;
        }
        var Range = [];
        var calendarRange = myApp.calendar({
            input: '#vmPerformanceDate',
            dateFormat: 'yyyy.mm.dd',
            rangePicker: true,
            maxDate:new Date(),
            monthNames: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
            dayNames: ['周日','周一','周二','周三','周四','周五','周六'],
            dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],
            onChange:function(p,val,n){
              Range = val;
            },
            onClose:function(p){
              if(Range.length==2){
                self.loadData('cunstom',Range[0],Range[1]);
              }else if(Range.length==1){
                myApp.alert('请选择一个时间范围！',function(){
                  calendarRange.open();
                });
              }
            }
        });
        var xAxis = [];
        var memory = {
              "name":"内存使用率",
              "data":[]
            }
        var cpus = [];
        var cpu = {
              "name":"CPU使用率",
              "data":[]
            }
        var memoryIndex = 0;
        $.each(data.meta.legend,function(index,val){
          if(val.indexOf('cpu')>47){
            var val = val.slice(48);
            cpus.push({
              "name":val+"使用率",
              "data":[]
            })
          }
          if(val.indexOf('memory')>47){
            memoryIndex = index;
          }
        });
        for(var i=data.data.length-1;i>-1;i--){
          memory.data.push(Number(data.data[i].v[memoryIndex])/Number(self.memory())/10);
          xAxis.push(getDates(data.data[i].t, isDay));
          cpu.data[i] = 0;
          $.each(cpus,function(index,val){
            cpus[index].data.push(Number(data.data[i].v[index])*100);
            cpu.data[i] = cpu.data[i] + Number(data.data[i].v[index])*100;
          });
          cpu.data[i] = cpu.data[i]/cpus.length;
        }
        initMemoryUse_chart(memory,xAxis);
        initcpuUse_chart1(cpu,xAxis);
        initcpuUse_chart2(cpus,xAxis);
      }); 
    };
  }
  var viewModel = new ViewModel();
  ko.applyBindings(viewModel, $$(page.container)[0]);
  window.vm_performance_viewModel = viewModel;

  if(page.query.hypervisor == 'PowerVM'){
    viewModel.isShowCharts(false);
  }else{
    viewModel.setTimeSelected('最近一小时');
  }

  $$('#vm-times-show').on('click', function(event) {
    myApp.popover($("#popover-vm-times").html(), event.target)
  });
});

function getDates(s, isDay){
  var date = s.length == 10 ? new Date(Number(s)*1000) : new Date(Number(s));
  var year = date.getFullYear();
  var month = date.getMonth()+1;
  var day = date.getDate();
  var hour = date.getHours()<10 ? '0'+date.getHours() : date.getHours();
  var minutes = date.getMinutes()<10 ? '0'+date.getMinutes() : date.getMinutes();
  var seconds = date.getSeconds()<10 ? '0'+date.getSeconds() : date.getSeconds();
  if(isDay){
    return year+'-'+month+'-'+day+' '+hour+':'+minutes+':'+seconds;
  }
  return hour+':'+minutes+':'+seconds;
}