myApp.onPageInit("vm-summary", function(page) {
<<<<<<< HEAD
  
  function ViewModel(){
    this.summary = ko.observable({

    });
    this.loadData = function(){
      var self = this;
      $.ajax("tpl/vm/summary.json?id="+page.query.id).done(function(data){
        myApp.pullToRefreshDone();
        self.summary(data);

        initsingleStorage_use_chart();
        initsingleStorage_assigned_chart();
      });      
=======
  function ViewModel(){
    var self = this;
    this.hypervisor = ko.observable(page.query.hypervisor);
    this.summary = ko.observable({
      "osVersion": "",
      "cpu": "",
      "maxcpu": "",
      "mincpu": "",
      "vcpu": "",
      "maxVcpu": "",
      "minVcpu": "",
      "memory": "",
      "maxMemory": "",
      "minMemory": "",
      "type":'',
      "network": []
    });
    this.loadData = function(data){
      myApp.pullToRefreshDone();
      self.summary(data);
>>>>>>> 410cbf4f02d60d813dc036b1bd603eacd2f499a6
    };
  }
  var viewModel = new ViewModel();
  ko.applyBindings(viewModel, $$(page.container)[0]);
<<<<<<< HEAD
  
  viewModel.loadData();
=======
  window.vm_summary_viewModal = viewModel;
>>>>>>> 410cbf4f02d60d813dc036b1bd603eacd2f499a6

  $$(page.container).find('.pull-to-refresh-content').on('refresh', function (e) {
    viewModel.loadData();
  });
});