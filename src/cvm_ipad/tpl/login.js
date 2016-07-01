var BASE_URL = '';
myApp.onPageInit("login", function(page) {
  function ViewModel(){
    var baseNet = Storage.getItem("baseNet");
    var userInfo = Storage.getItem("userInfo");
    var Required = false;
    this.network = baseNet ? ko.observable(baseNet) : ko.observable("");
    this.username = userInfo ? ko.observable(userInfo.network) : ko.observable("");
    this.password = userInfo ? ko.observable(userInfo.network) : ko.observable("");
    this.dashboard = null;
    this.login = function(){
      if(this.network()==""){
        alert('请填写网络！');
        Required = true;
      }
      if(this.username()==""){
        alert('用户名不能为空！');
        Required = true;
      }
      if(this.password()==""){
        alert('用户名不能为空！');
        Required = true;
      }
      if(Required){
        Required = false;
        return;
      }
      Storage.setItem("baseNet",this.network());
      BASE_URL = Storage.getItem("baseNet") + "/pad/v3.0";

      RestServiceJs(BASE_URL+"/user/login").post({
        "account": this.username(),
        "password": this.password()
      },function(data){
        Storage.setItem("userInfo",data);

        myApp.closeModal('.login-screen.modal-in');
        if(!this.dashboard){
          this.dashboard = myApp.addView('#view-dashboard', {dynamicNavbar: false,domCache: true});
        }
        this.dashboard.router.load({url: "tpl/dashboard.html",animatePages: false});
        myApp.popup('.popup-dashboard'); 
        
      });
    }
  }
  ko.applyBindings(new ViewModel(), $$(page.container)[0]);
});