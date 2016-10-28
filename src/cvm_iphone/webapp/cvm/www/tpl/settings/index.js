myApp.onPageInit("settings-index", function(page) {
  function ViewModel(){

    var self=this;
    var time = new Date().getTime();
    this.Time = ko.observable(time);

   //var changePassword,personalInfo;
    var is_reload = false;
   this.loadInfo = function(){

      
    }
   
  }
  var viewModel = new ViewModel();
  ko.applyBindings(viewModel, $$(page.container)[0]);
  window.SettingsVO = viewModel;
  viewModel.loadInfo();

});

myApp.onPageInit("settings-password", function(page) {

     function ViewModel(){

    
    var is_reload = false;
   this.loadInfo = function(){
    }
   
  }
  var viewModel = new ViewModel();
  ko.applyBindings(viewModel, $$(page.container)[0]);
  window.SettingsVO = viewModel;
  viewModel.loadInfo();
});

myApp.onPageInit("settings-personalInfo", function(page) {

     function ViewModel(){

    
    var is_reload = false;
   this.loadInfo = function(){
    }
   
  }
  var viewModel = new ViewModel();
  ko.applyBindings(viewModel, $$(page.container)[0]);
  window.SettingsVO = viewModel;
  viewModel.loadInfo();
});