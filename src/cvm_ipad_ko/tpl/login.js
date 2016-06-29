myApp.onPageInit("login", function(page) {
  function ViewModel(){
    this.network = "http://192.168.1.1:8090/";
    this.username = "admin"
    this.password = "password";
    this.login = function(){
      if(this.username=="admin" && this.password=="password"){
        myApp.closeModal('.login-screen.modal-in');
        myApp.popup('.popup-dashboard'); 
      }
    }
  }
  ko.applyBindings(new ViewModel(), $$(page.container)[0]);
});