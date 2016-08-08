myApp.onPageInit("vm-index", function(page) {
  
  function ViewModel(){
    this.hypervisor = ko.observable("");
    this.resPoolId = ko.observable("");
    this.dataList = ko.observableArray([]);
    this.vmNum = ko.observable("");

    this.loading = false;
    this.page = 1;
    this.loadData = function(is_loadMore, hypervisor, resPoolId){
      if(hypervisor){
        this.hypervisor(hypervisor);
      }else{
        this.hypervisor("");
      }
      if(resPoolId){
        this.resPoolId(resPoolId);
      }else{
        this.resPoolId("");
      }
      var self = this;
      if (self.loading) return;
      self.loading = true;
      if(!is_loadMore) self.page = 1;

      RestServiceJs(BASE_URL+"/vm").query({"dcId":CVM_PAD.dcId,"resPoolId":this.resPoolId(),"hypervisor":this.hypervisor(), "firstResult":(self.page-1)*PAGE_SIZE,"maxResult":self.page*PAGE_SIZE-1},function(data){
      //$$.getJSON("tpl/vm/index.json?id="+page.query.id+"&page="+self.page,function(data){
        self.loading = false;
        if(!is_loadMore){
          myApp.pullToRefreshDone();
          myApp.attachInfiniteScroll($$(page.container).find('.infinite-scroll'));
          self.dataList.removeAll();

          self.vmNum(data.size);
          var os = [0,0,0,0], status = [0,0,0];
          for(var i=0; i<data.data.length; i++){
            var reg1 = /windows/i,
                reg2 = /linux/i,
                reg3 = /aix/i;
            if(data.data[i].osVersion.match(reg1)&&data.data[i].osVersion.match(reg1).index>-1){
              os[0]+=1;
            }else if(data.data[i].osVersion.match(reg2)&&data.data[i].osVersion.match(reg2).index>-1){
              os[1]+=1;
            }else if(data.data[i].osVersion.match(reg3)&&data.data[i].osVersion.match(reg3).index>-1){
              os[2]+=1;
            }else{
              os[3]+=1;
            }
            if(data.data[i].state=="OK"){
              status[0]+=1;
            }else if(data.data[i].state=="STOPPED"){
              status[1]+=1;
            }else{
              status[2]+=1;
            }
          }
          initVm_os_chart(os);
          initVm_status_chart(status);
        }
        for(var i=0; i<data.data.length; i++){
          var reg1 = /windows/i,
              reg2 = /centos/i,
              reg3 = /redhat/i,
              reg4 = /suse/i;
          if(data.data[i].osVersion.match(reg1)&&data.data[i].osVersion.match(reg1).index>-1){
            data.data[i].type="windows";
          }else if(data.data[i].osVersion.match(reg2)&&data.data[i].osVersion.match(reg2).index>-1){
            data.data[i].type="centos";
          }else if(data.data[i].osVersion.match(reg3)&&data.data[i].osVersion.match(reg3).index>-1){
            data.data[i].type="redhat";
          }else if(data.data[i].osVersion.match(reg4)&&data.data[i].osVersion.match(reg4).index>-1){
            data.data[i].type="suse";
          }else{
            data.data[i].type="others";
          }
          switch(data.data[i].state){
            case 'STOPPED':
              data.data[i].state='已关机';
              data.data[i].stateCss='gray';
              break;
            case 'OK':
              data.data[i].state='运行中';
              data.data[i].stateCss='green';
              break;
            case 'disconnected':
              data.data[i].state='已断开';
              data.data[i].stateCss='gray';
              break;
            case 'STOPPING':
              data.data[i].state='正在关机';
              data.data[i].stateCss='orange';
              break;
            case 'STARTING':
              data.data[i].state='正在开机';
              data.data[i].stateCss='yellow';
              break;
            case 'DELETING':
              data.data[i].state='正在删除';
              data.data[i].stateCss='orange';
              break;
            case 'RESTARTING':
              data.data[i].state='正在重启';
              data.data[i].stateCss='yellow';
              break;
            case 'EXECUTING':
              data.data[i].state='正在部署';
              data.data[i].stateCss='yellow';
              break;
            case 'UNKNOWN':
              data.data[i].state='未知';
              data.data[i].stateCss='gray';
              break;
            case 'SUSPENDED':
              data.data[i].state='挂起';
              data.data[i].stateCss='orange';
              break;
            case 'RESIZING':
              data.data[i].state='调整中';
              data.data[i].stateCss='orange';
              break;
            case 'SUSPENDING':
              data.data[i].state='挂起中';
              data.data[i].stateCss='orange';
              break;
            case 'RESUMEING':
              data.data[i].state='恢复中';
              data.data[i].stateCss='orange';
              break;
            case 'CONVERTING':
              data.data[i].state='转换中';
              data.data[i].stateCss='orange';
              break;
            case 'RELOCATING':
              data.data[i].state='迁移中';
              data.data[i].stateCss='orange';
              break;
            case 'REVERTING':
              data.data[i].state='还原中';
              data.data[i].stateCss='orange';
              break;
            case 'SAVE_AS_TEMPLATE':
              data.data[i].state='另存为模板中';
              data.data[i].stateCss='orange';
              break;
          }
          
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
  window.vm_index_viewModel = viewModel;

  viewModel.loadData();

  $$(page.container).find('.pull-to-refresh-content').on('refresh', function (e) {
    viewModel.loadData(false, viewModel.hypervisor(), viewModel.resPoolId());
  });
  $$(page.container).find('.infinite-scroll').on('infinite', function () {
    viewModel.loadData(true, viewModel.hypervisor(), viewModel.resPoolId());
  });  
  
});


// 虚拟机-操作系统占比
function initVm_os_chart(os) {
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
                  y: os[0],
                  color:"#4791d2"
              },
              {
                  name: 'AIX',
                  y: os[2],
                  color:"#ffd800"
              },
              {
                  name: 'Linux',
                  y: os[1],
                  color:"#5bd544"
              },
              {
                  name: 'Other',
                  y: os[3],
                  color:"#fe9898"
              }
          ]
        }]
    });
}


// 虚拟机-状态占比
function initVm_status_chart(states) {
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
                  y: states[0],
                  color:"#5bd544"
              },
              {
                  name: '已关机',
                  y: states[1],
                  color:"#ffd800"
              },
              {
                  name: '其他',
                  y: states[2],
                  color:"#4791d2"
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
