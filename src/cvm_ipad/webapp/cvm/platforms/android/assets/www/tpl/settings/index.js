myApp.onPageInit("settings-index", function(page) {
  $$('#logout').on('click', function (){
    myApp.confirm('确定退出当前用户吗？',function(){
    	myApp.Login_Again = true;
    	myApp.showAssisTime = false;
    	myApp.addView('#view-login', {dynamicNavbar: false,domCache: true}).router.load({url: 'tpl/login.html',animatePages: false});
    	Storage.removeItem("userInfo");
	  	USER_INFO.password = '';
      USER_INFO.token = '';
      USER_INFO.tokenKey = '';
      Storage.setItem("userInfo",JSON.stringify(USER_INFO));
	    myApp.closeModal('.popup.modal-in');
	    myApp.loginScreen();
  	});
  });
});