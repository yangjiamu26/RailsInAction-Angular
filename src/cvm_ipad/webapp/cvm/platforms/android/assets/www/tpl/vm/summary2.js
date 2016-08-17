myApp.onPageInit("vm-summary2", function(page) {
  
  function ViewModel(){
    this.summary = ko.observable({
<<<<<<< HEAD

    });
    this.loadData = function(){
      var self = this;
      $.ajax("tpl/vm/summary2.json?id="+page.query.id).done(function(data){
        myApp.pullToRefreshDone();
        self.summary(data);

        initsingleStorage_use_chart();
        initsingleStorage_assigned_chart();
      });      
=======
      "vcpu":'',
      "memoryType":'',
      "memory":'',
      "type":'',
      "osVersion":''
    });
    this.showShare = ko.observable('false');
    this.loadData = function(data){
      var self = this;
      if(page.query.hypervisor=='winserver'){
        self.showShare('true');
        if(data.memoryType=='shared'){
          data.memoryType = '共享';
        }
        if(data.memoryType=='privilege'){
          data.memoryType = '专享';
        }
        if(data.memoryType=='reservation'){
          data.memoryType = '预留';
        }
        if(data.memoryType=='custom'){
          data.memoryType = '自定义调整';
        }
      }else{
        self.showShare('false');
      }
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
  window.vm_summary2_viewModal = viewModel;
>>>>>>> 410cbf4f02d60d813dc036b1bd603eacd2f499a6

  $$(page.container).find('.pull-to-refresh-content').on('refresh', function (e) {
    viewModel.loadData();
  });
});