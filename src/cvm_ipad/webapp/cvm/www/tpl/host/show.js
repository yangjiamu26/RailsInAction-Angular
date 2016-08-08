myApp.onPageInit("host-show", function(page) {
  function ViewModel(){
    this.name = ko.observable(page.query.name);
    this.summary = ko.observable({
      "ip":'',
      "state":'',
      "runTime":''
    });
    this.loadData = function(){
      var self = this;

      RestServiceJs(BASE_URL+"/host/"+page.query.id+"/summary").query({"dcId":CVM_PAD.dcId,"resPoolId":page.query.resourcePoolId,"hypervisor":page.query.hypervisor},function(data){
        //$.ajax("tpl/host/summary.json?id="+page.query.id).done(function(data){
        myApp.pullToRefreshDone();
        var getTime = function(minseconds){
              var seconds = minseconds/1000;
              var day = parseInt(seconds/86400);
              var hour = parseInt((seconds-86400*day)/3600);
              var minute = parseInt((seconds-86400*day-hour*3600)/60);
              var second = parseInt(seconds-86400*day-hour*3600-minute*60);
              return day+'天'+hour+'小时'+minute+'分'+second+'秒'
            }
        data.runTime = getTime(data.runTime);
        self.summary(data);
        window.HostIndex_Summary_details_viewModel.loadData(data);
      });
      myApp.addView('#view_host_summary', {dynamicNavbar: false,domCache: true,linksView:'#view-host'}).router.load({url: 'tpl/host/summary.html?id='+page.query.id+'&resourcePoolId='+page.query.resourcePoolId+"&hypervisor="+page.query.hypervisor,animatePages: false});
      myApp.addView('#view_host_vm',      {dynamicNavbar: false,domCache: true,linksView:'#view-host'}).router.load({url: 'tpl/vm/list.html?fromPage=host&id='+page.query.id+'&resourcePoolId='+page.query.resourcePoolId+"&hypervisor="+page.query.hypervisor,animatePages: false});
      myApp.addView('#view_host_storage', {dynamicNavbar: false,domCache: true,linksView:'#view-host'}).router.load({url: 'tpl/storage/list.html?fromPage=host&id='+page.query.id+'&resourcePoolId='+page.query.resourcePoolId+"&hypervisor="+page.query.hypervisor,animatePages: false});
    };
  }
  var viewModel = new ViewModel();
  ko.applyBindings(viewModel, $$(page.container)[0]);
  window.HostIndex_Summary_viewModel = viewModel;
  viewModel.loadData();
});

