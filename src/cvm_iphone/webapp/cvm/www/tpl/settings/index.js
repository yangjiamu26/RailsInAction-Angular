myApp.onPageInit("settings-index", function(page) {
  $$('.setLogout').on('click', function (){
    myApp.confirm('确定退出当前用户吗？',function(){
      myApp.Login_Again = true;
      myApp.showAssisTime = false;
      myApp.addView('#view-login', {dynamicNavbar: false,domCache: true}).router.load({url: 'tpl/login.html',animatePages: false});
      Storage.removeItem("userInfo");
      USER_INFO.password = '';
      USER_INFO.token = '';
      USER_INFO.tokenKey = '';
      Storage.setItem("userInfo",JSON.stringify(USER_INFO));
      window.indexHome_viewModel.whichDc('');
      window.indexPopover_viewModel.inHome(true);
      window.indexPopover_viewModel.inResouce(false);
      myApp.hidePreloader();
      reSetAllRequets();
      myApp.loginScreen();
    });
  });

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
    var self = this;
    this.save = function(){
      if(self.info().oldPassword == '' || self.info().newPassword_a == '' || self.info().newPassword_b == ''){
        myApp.alert('密码不能为空!');
        return;
      }
      if(self.info().oldPassword != USER_INFO.password){
        myApp.alert('密码错误!');
        return;
      }
      if(self.info().newPassword_a != self.info().newPassword_b){
        myApp.alert('请输入一致的新密码!');
        return;
      }
      if(self.info().newPassword_a.length<6){
        myApp.alert('密码最少6位!');
        return;
      }
      self.saveNow(self.info().oldPassword, self.info().newPassword_a);
    }
    this.info = ko.observable({
      "oldPassword": "", 
      "newPassword_a": "", 
      "newPassword_b": "",
    });
    var client_token = USER_INFO.token;
      var client_account = USER_INFO.tokenKey
    this.saveNow = function(oldPassword, password){
      RestServiceJs.put(BASE_URL+"/user/"+USER_INFO.id+"?client_token="+client_token+"&client_account="+client_account,{"password":password,"oldPassword":oldPassword},function(data){
        myApp.alert('恭喜，密码修改成功!');
        self.info({
          "oldPassword": "", 
          "newPassword_a": "", 
          "newPassword_b": "",
        });
      })
    }
  }
  var viewModel = new ViewModel();
  ko.applyBindings(viewModel, $$(page.container)[0]);
});

myApp.onPageInit("settings-personalInfo", function(page) {
  function ViewModel(){
    var self = this;
    this.info = ko.observable({
      "name": "", 
      "account": "", 
      "roleName": "", 
      "email":"", 
      "mobilephone":""
    });
    this.loadInfo = function(){
      RestServiceJs.get(BASE_URL+"/user",USER_INFO.id,{},function(data){
        self.info(data);
      })
    }
  }
  var viewModel = new ViewModel();
  ko.applyBindings(viewModel, $$(page.container)[0]);
  viewModel.loadInfo();
});