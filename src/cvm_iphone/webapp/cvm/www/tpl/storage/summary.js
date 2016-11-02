myApp.onPageInit("storage-summary", function(page) {
  // vmListclicks.host = false;
  // storageListclicks.host = false;
//   {
//   "id": "9",
//   "name": "Local storage",
//   "datacenterId": 1,
//   "datacenterName": null,
//   "resourcePoolName": null,
//   "resourcePoolId": null,
//   "path": "/dev/disk/by-id/scsi-SATA_WDC_WD10EZEX-60_WD-WCC3F5VVRHTV-part3",
//   "storageTotal": 923.5,
//   "availStorage": 443.93,
//   "type": "lvm",
//   "vdisk": 26,
//   "vmNum": 12,
//   "hostNum": 1,
//   "state": "OK",
//   "shared": "false",
//   "hypervisor": null,
//   "hostIp": null,
//   "allocatedStorage": 448.36,
//   "hostIds": null
// }
  function ViewModel(){
    var self = this;
    this.name = ko.observable(page.query.name);
    this.belongTab = page.query.belongTab ? ko.observable(page.query.belongTab) : ko.observable("");
    this.hypervisor = ko.observable(page.query.hypervisor);
    this.dataList = ko.observableArray([]);
    this.summary = ko.observable({
      "storageTotal":'',
      "vdisk":'',
      "hostNum":'',
      "vmNum":'',
      "type":'',
      "path":'',
      'shared':'',
      "storageUsed":''
    });
    this.loadData = function(){
      var self = this;
      RestServiceJs.query(BASE_URL+"/storagePool/"+page.query.id+"/summary",{"dcId":CVM_IPHONE.dcId,"hypervisor":page.query.hypervisor},function(data){
        myApp.pullToRefreshDone();
        data.storageUsed = Number((Number(data.storageTotal)-Number(data.availStorage)).toFixed(2));
        switch(data.type){
          case 'udev':
            data.type = '可移动存储';
            break;
          case 'lvm':
            data.type = '本地LVM卷组';
            break;
          case 'ext':
            data.type = '本地EXT';
            break;
          case 'nfs':
            data.type = 'NFS共享存储';
            break;
          case 'lvmoiscsi':
            data.type = '软件ISCSI';
            break;
          case 'lvmohba':
            data.type = '硬件HBA';
            break;
          case 'NFS':
            data.type = 'NFS共享存储';
            break;
          case 'FCSAN':
            data.type = 'FC SAN';
            break;
          case 'iSCSI':
            data.type = 'iSCSI';
            break;
          case 'LOCAL':
            data.type = '本地存储';
            break;
          case 'UNKNOW':
            data.type = '未知';
            break;
          case 'LVPOOL':
            data.type = '本地LVM卷组';
            break;
          case 'SVC_POOL':
            data.type = 'SVC存储池';
            break;
          case 'EMC_POOL':
            data.type = 'EMC VNX存储池';
            break;
          case 'DS4700_POOL':
            data.type = 'DS4700存储池';
            break;
          case 'NETAPP_POOL':
            data.type = 'NETAPP FAS存储池';
            break;
          default:
            data.type = '未知';
            break;
        }
        self.summary(data);
      });
      RestServiceJs.query(BASE_URL+"/storagePool/"+page.query.id+"/disk",{"dcId":CVM_IPHONE.dcId,"hypervisor":page.query.hypervisor},function(data){
        self.loading = false;
        self.dataList.removeAll();
        for(var i=0; i<data.data.length; i++){
          switch(data.data[i].type){
            case 'system':
              data.data[i].type = '系统盘';
              break;
            case 'data':
              data.data[i].type = '数据盘';
              break;
            case 'unknown':
              data.data[i].type = '未知';
              break;
            case 'SYSTEM':
              data.data[i].type = '系统盘';
              break;
            case 'USER':
              data.data[i].type = '数据盘';
              break;
            case 'SUSPEND':
              data.data[i].type = '未知';
              break;
            case 'HA_STATEFILE':
              data.data[i].type = '其他';
              break;
            case 'REDO_LOG':
              data.data[i].type = '其他';
              break;
            case 'BLOCK':
              data.data[i].type = '存储LUN';
              break;
            default:
              data.data[i].type = '未知';
              break;
          }
          self.dataList.push(data.data[i]);
        }
      });
    }
  }
  var viewModel = new ViewModel();
  ko.applyBindings(viewModel, $$(page.container)[0]);
  window.HostIndex_Summary_viewModel = viewModel;
  viewModel.loadData();

  $$(page.container).find('.pull-to-refresh-content').on('refresh', function (e) {
    viewModel.loadData();
  });
  
});
