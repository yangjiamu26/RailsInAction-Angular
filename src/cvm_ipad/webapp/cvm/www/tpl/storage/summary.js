myApp.onPageInit("storage-summary", function(page) {

// 单个存储池-使用率占比图
function initsingleStorage_use_chart(data) {
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
                  y: data.availStorage,
                  color:"#fadf4f"
              },
              {
                  name: '已用',
                  y: data.storageTotal-data.availStorage,
                  color:"#f87b38"
              }
          ]
      }]
    });   
}

// 单个存储池-分配率占比图
function initsingleStorage_assigned_chart(data) {
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
                  y: data.storageTotal-data.allocatedStorage,
                  color:"#fadf4f"
              },
              {
                  name: '已分配',
                  y: data.allocatedStorage,
                  color:"#f87b38"
              }
          ]
      }]
    });   
}

  function ViewModel(){
    this.summary = ko.observable({
      "storageTotal":'',
      "vdisk":'',
      "hostNum":'',
      "vmNum":'',
      "type":'',
      "path":'',
      "shared":''
    });
    this.hypervisor = ko.observable(page.query.hypervisor);
    this.loadData = function(){
      var self = this;
      RestServiceJs(BASE_URL+"/storagePool/"+page.query.id+"/summary").query({"dcId":CVM_PAD.dcId,"hypervisor":page.query.hypervisor},function(data){
      //$$.getJSON("tpl/storage/summary.json?id="+page.query.id, function(data){
        myApp.pullToRefreshDone();
        switch(data.type){
          case 'udev':
            data.type = '可移动存储';
            break;
          case 'nfs':
            data.type = 'NFS';
            break;
          case 'lvm':
            data.type = '本地LVM';
            break;
          case 'LOCAL':
            data.type = '本地存储';
            break;
          case 'LVPOOL':
            data.type = '本地LVM卷组';
            break;
        }
        self.summary(data);

        initsingleStorage_use_chart(data);
        if(page.query.hypervisor=='winserver'){
          initsingleStorage_assigned_chart(data);
        }
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