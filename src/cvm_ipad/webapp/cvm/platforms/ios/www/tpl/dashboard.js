myApp.onPageInit("dashboard", function(page) {
  // 首页cpu占比图
function initTotal_cpu_chart(data) {
    $('#total_cpu_chart').highcharts({
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
        backgroundColor:"none",
        borderColor:"none",
        itemStyle: {
          
          fontWeight: 'normal'
        },
        // labelFormatter: function() {  
        //             return this.name + '：' + '<span style="{color}">'+ this.y + 'GHz' + '</span>';  
        // }, 
<<<<<<< HEAD
        labelFormat: '{name}：<b>{y:.2f}</b>个',
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
                  y: data.cpuTotal - data.cpuUsed,
=======
                  y: data.x86TotalCpu - data.x86UsedCpu,
                  color:"#ffd800"
              }
          ]
      }]
    });   
}
function initTotal_cpu_chart2(data) {
    $('#total_cpu_chart2').highcharts({
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
                  y: data.pvmTotalCpu - data.pvmUsedCpu,
>>>>>>> 410cbf4f02d60d813dc036b1bd603eacd2f499a6
                  color:"#ffd800"
              }
          ]
      }]
    });   
}
// 首页内存占比图
function initTotal_memory_chart(data) {
    $('#total_memory_chart').highcharts({
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
        backgroundColor:"none",
        borderColor:"none",
        itemStyle: {
          
          fontWeight: 'normal'
        },
<<<<<<< HEAD
        labelFormat: '{name}：<b>{y:.2f}</b>G',
=======
        labelFormat: '{name}：<b>{y:.2f}</b>GB',
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
function initTotal_storage_chart(data) {
    $('#total_storage_chart').highcharts({
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
        backgroundColor:"none",
        borderColor:"none",
        itemStyle: {
          
          fontWeight: 'normal'
        },
<<<<<<< HEAD
        labelFormat: '{name}：<b>{y:.2f}</b>G',
=======
        labelFormat: '{name}：<b>{y:.2f}</b>GB',
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
  function ViewModel(){
    this.datacenters = ko.observableArray([]);
    this.infos = ko.observable({
      "storageTotal":0,
<<<<<<< HEAD
      "cpuTotal":0,
=======
      "x86TotalCpu":0,
      "pvmTotalCpu":0,
>>>>>>> 410cbf4f02d60d813dc036b1bd603eacd2f499a6
      "memoryTotal":0,
      "dcNum":0,
      "resPoolNum":0,
      "busdomainNum":0,
      "hostNum":0,
      "projectNum":0,
      "vmNum":0 
    });

    this.loading = false;
<<<<<<< HEAD
=======
    var self = this;
>>>>>>> 410cbf4f02d60d813dc036b1bd603eacd2f499a6
    this.loadData = function(){
      //在这里实现总览数据的加载
      if(this.loading) return;
      this.loading = true;
<<<<<<< HEAD
      var self = this;
      RestServiceJs(BASE_URL+"/overallDetails").query({},function(data){
        this.loading = false;
        self.infos(data);
        initTotal_cpu_chart(data);
        initTotal_memory_chart(data);
        initTotal_storage_chart(data);        
=======
      RestServiceJs(BASE_URL+"/overallDetails").query({},function(data){
        self.loading = false;
        data.x86TotalCpu = parseFloat((data.x86TotalCpu/1024).toFixed(2));
        data.x86UsedCpu = parseFloat((data.x86UsedCpu/1024).toFixed(2));
        data.memoryTotal = parseFloat((data.memoryTotal/1024).toFixed(2));
        data.memoryUsed = parseFloat((data.memoryUsed/1024).toFixed(2));
        self.infos(data);
        initTotal_cpu_chart(data);
        initTotal_cpu_chart2(data);
        initTotal_memory_chart(data);
        initTotal_storage_chart(data);
        if(data.isDemo){
            myApp.closeModal('.popup.modal-in');
            $$('#backToDasboard').show();
            setTimeout(function(){
              popoverClose();
            },0)
        }
>>>>>>> 410cbf4f02d60d813dc036b1bd603eacd2f499a6
      });
    };
    this.loadDatacenters = function(){
      var self = this;
      RestServiceJs(BASE_URL+"/datacenters").query({},function(data){
        self.datacenters(data.data);
      });
    }
    this.whichDc = ko.observable('');
    this.changeDc = function(id){
      this.whichDc(id);
    }
  }
  var viewModel = new ViewModel();
  ko.applyBindings(viewModel, $$(page.container)[0]);

  viewModel.loadData();
  viewModel.loadDatacenters();

  window.overview_viewModel = viewModel;

  // function ViewModel2(){
  //   this.datacenters = ko.observableArray([]);
  //   this.loadDatacenters = function(){
  //     var self = this;
  //     RestServiceJs(BASE_URL+"/datacenters").query({},function(data){
  //       self.datacenters(data.data);
  //     });
  //   }

  // }
  // var viewModel2 = new ViewModel2();
  // ko.applyBindings(viewModel2, document.getElementById("assistive"));
  // viewModel2.loadDatacenters();
  // windows.assistive_viewModel = viewModel2;
});



<<<<<<< HEAD
var view_panel_right, view_home, view_business, view_pool, view_host, view_vm, view_storage, view_settings_left, view_settings_right;
var is_reload = false;

function popoverClose(event){
  var datacenter_id = $(event.target).attr("datacenter_id");
  var datacenter_name = $(event.target).attr("datacenter_name");
  CVM_PAD.dcId = datacenter_id;
  CVM_PAD.dcName = datacenter_name;

  view_panel_right       = view_panel_right || myApp.addView(".view-panel-right",   {dynamicNavbar: false,domCache: true,linksView: ".view-panel-right"});
  
  view_home                     = view_home || myApp.addView("#view-home",          {dynamicNavbar: false,domCache: true,linksView: "#view-home"});
  view_business             = view_business || myApp.addView("#view-business",      {dynamicNavbar: false,domCache: true,linksView: "#view-business"});
  view_pool                     = view_pool || myApp.addView("#view-pool",          {dynamicNavbar: false,domCache: true,linksView: "#view-pool"});
  view_host                     = view_host || myApp.addView("#view-host",          {dynamicNavbar: false,domCache: true,linksView: "#view-host"});
  view_vm                         = view_vm || myApp.addView("#view-vm",            {dynamicNavbar: false,domCache: true,linksView: "#view-vm"});
  view_storage              =  view_storage || myApp.addView("#view-storage",       {dynamicNavbar: false,domCache: true,linksView: "#view-storage"});
  view_settings_left   = view_settings_left || myApp.addView("#view-settings-left", {dynamicNavbar: false,domCache: true,linksView: "#view-settings-main"});
  view_settings_right = view_settings_right || myApp.addView("#view-settings-main", {dynamicNavbar: false,domCache: true,linksView: "#view-settings-main"});

  view_home.router.load({           url: "tpl/home/index.html",animatePages: false, reload:is_reload});  
  view_business.router.load({       url: "tpl/business/index.html",animatePages: false, reload:is_reload});
  view_pool.router.load({           url: "tpl/pool/index.html",animatePages: false, reload:is_reload});
  view_host.router.load({           url: "tpl/host/index.html",animatePages: false, reload:is_reload});
  view_vm.router.load({             url: "tpl/vm/index.html",animatePages: false, reload:is_reload});
  view_storage.router.load({        url: "tpl/storage/index.html",animatePages: false, reload:is_reload});    
  view_settings_left.router.load({  url: "tpl/settings/index.html",animatePages: false, reload:is_reload});
  view_settings_right.router.load({ url: "tpl/settings/profile.html",animatePages: false, reload:is_reload});
=======
var indexFilter_business, indexFilter_pool, indexFilter_host, indexFilter_vm, indexFilter_storage, view_home, view_business, view_pool, view_host, view_vm, view_storage, view_settings_left, view_settings_right;
var is_reload = false;

function popoverClose(event){
  var datacenter_id = event && $(event.target).attr("datacenter_id") || 1;
  var datacenter_name = event && $(event.target).attr("datacenter_name") || "demo数据中心";
  CVM_PAD.dcId = datacenter_id;
  CVM_PAD.dcName = datacenter_name;

  indexFilter_business=indexFilter_business || myApp.addView('#indexFilter-business', {dynamicNavbar: false,domCache: true,linksView: "#indexFilter-business"});
  indexFilter_pool       = indexFilter_pool || myApp.addView('#indexFilter-pool',     {dynamicNavbar: false,domCache: true,linksView: "#indexFilter-pool"});
  indexFilter_host       = indexFilter_host || myApp.addView('#indexFilter-host',     {dynamicNavbar: false,domCache: true,linksView: "#indexFilter-host"});
  indexFilter_vm           = indexFilter_vm || myApp.addView('#indexFilter-vm',       {dynamicNavbar: false,domCache: true,linksView: "#indexFilter-vm"});
  indexFilter_storage = indexFilter_storage || myApp.addView('#indexFilter-storage',  {dynamicNavbar: false,domCache: true,linksView: "#indexFilter-storage"});
  
  view_home                     = view_home || myApp.addView("#view-home",            {dynamicNavbar: false,domCache: true,linksView: "#view-home"});
  view_business             = view_business || myApp.addView("#view-business",        {dynamicNavbar: false,domCache: true,linksView: "#view-business"});
  view_pool                     = view_pool || myApp.addView("#view-pool",            {dynamicNavbar: false,domCache: true,linksView: "#view-pool"});
  view_host                     = view_host || myApp.addView("#view-host",            {dynamicNavbar: false,domCache: true,linksView: "#view-host"});
  view_vm                         = view_vm || myApp.addView("#view-vm",              {dynamicNavbar: false,domCache: true,linksView: "#view-vm"});
  view_storage              =  view_storage || myApp.addView("#view-storage",         {dynamicNavbar: false,domCache: true,linksView: "#view-storage"});
  view_settings_left   = view_settings_left || myApp.addView("#view-settings-left",   {dynamicNavbar: false,domCache: true,linksView: "#view-settings-main"});
  view_settings_right = view_settings_right || myApp.addView("#view-settings-main",   {dynamicNavbar: false,domCache: true,linksView: "#view-settings-main"});

  indexFilter_business.router.load({ url: "tpl/filter/filter_business.html",animatePages: false, reload:is_reload});
  indexFilter_pool.router.load({     url: "tpl/filter/filter_pool.html",animatePages: false, reload:is_reload});
  indexFilter_host.router.load({     url: "tpl/filter/filter_host.html",animatePages: false, reload:is_reload});
  indexFilter_vm.router.load({       url: "tpl/filter/filter_vm.html",animatePages: false, reload:is_reload});
  indexFilter_storage.router.load({  url: "tpl/filter/filter_storage.html",animatePages: false, reload:is_reload});

  view_home.router.load({            url: "tpl/home/index.html",animatePages: false, reload:is_reload});  
  view_business.router.load({        url: "tpl/business/index.html",animatePages: false, reload:is_reload});
  view_pool.router.load({            url: "tpl/pool/index.html",animatePages: false, reload:is_reload});
  view_host.router.load({            url: "tpl/host/index.html",animatePages: false, reload:is_reload});
  view_vm.router.load({              url: "tpl/vm/index.html",animatePages: false, reload:is_reload});
  view_storage.router.load({         url: "tpl/storage/index.html",animatePages: false, reload:is_reload});    
  view_settings_left.router.load({   url: "tpl/settings/index.html",animatePages: false, reload:is_reload});
  view_settings_right.router.load({  url: "tpl/settings/profile.html",animatePages: false, reload:is_reload});
>>>>>>> 410cbf4f02d60d813dc036b1bd603eacd2f499a6

  myApp.showTab("#view-home");

  is_reload = true;

}

