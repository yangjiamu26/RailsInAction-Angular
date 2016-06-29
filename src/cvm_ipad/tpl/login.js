myApp.onPageInit("login", function(page) {
  function ViewModel(){
    this.network = ko.observable("http://192.168.1.1:8090/");
    this.username = ko.observable("admin")
    this.password = ko.observable("password");
    this.dashboard = null;
    this.login = function(){
      $.ajax("tpl/login.json").done(function(data){
        if(data.message=="success"){
          myApp.closeModal('.login-screen.modal-in');
          if(!this.dashboard){
            this.dashboard = myApp.addView('#view-dashboard', {dynamicNavbar: false,domCache: true});
          }
          this.dashboard.router.load({url: "tpl/dashboard.html",animatePages: false});
          myApp.popup('.popup-dashboard'); 
        }
      });
    }
  }
  ko.applyBindings(new ViewModel(), $$(page.container)[0]);
});