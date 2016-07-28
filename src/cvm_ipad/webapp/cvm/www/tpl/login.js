var BASE_URL = '';
myApp.onPageInit("login", function(page) {
  function ViewModel(){
    var lastTime = parseInt(Storage.getItem('cacheTime'));
    var timeTakes = (new Date().getTime() - lastTime)/86400000;
    if(timeTakes>7){
      Storage.removeItem("userInfo");
      Storage.removeItem("cacheTime");
    }
    
    var baseNet = Storage.getItem("baseNet");
    var userInfo = JSON.parse(Storage.getItem("userInfo"));
    var Required = false;
    this.network = baseNet ? ko.observable(baseNet) : ko.observable("http://10.10.111.204:8095");
    this.username = userInfo ? ko.observable(userInfo.account) : ko.observable("admin");
    this.password = userInfo ? ko.observable(userInfo.password) : ko.observable("passw0rd");
    this.dashboard = null;
    this.login = function(){
      if(this.network()==""){
        myApp.alert('请填写网络！');
        return;
      }
      if(this.username()==""){
        myApp.alert('用户名不能为空！');
        return;
      }
      if(this.password()==""){
        myApp.alert('密码不能为空！');
        return;
      }
      var self = this;

      function goLogin(data){
        data.password = self.password();
        Storage.setItem("userInfo",JSON.stringify(data));
        Storage.setItem("cacheTime",new Date().getTime());

        myApp.closeModal('.login-screen.modal-in');
        if(!this.dashboard){
          this.dashboard = myApp.addView('#view-dashboard', {dynamicNavbar: false,domCache: true});
        }
        this.dashboard.router.load({url: "tpl/dashboard.html",animatePages: false});
        myApp.popup('.popup-dashboard');

        setTimeout(function(){
          $$("#assistive").show();
        },2000);
      }

      if(this.username()=="demo"&&this.password()=="demo"){
        BASE_URL = "demoapi";
        return goLogin({"name":"测试用户","account":"demo","password":"demo","flag":true,"token":"demo"})
      }

      Storage.setItem("baseNet",this.network());
      BASE_URL = Storage.getItem("baseNet") + "/pad/v3.0";
      
      RestServiceJs(BASE_URL+"/user/login").post({
        "account": this.username(),
        "password": this.password()
      },function(data){
        goLogin(data);
      });
    }
  }
  ko.applyBindings(new ViewModel(), $$(page.container)[0]);
});