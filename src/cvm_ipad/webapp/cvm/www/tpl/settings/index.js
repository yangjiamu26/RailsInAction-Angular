myApp.onPageInit("settings-index", function(page) {
  $$('#logout').on('click', function (){
    myApp.confirm('确定退出当前用户吗？',function(){
    	myApp.showAssisTime = false;
    	myApp.addView('#view-login', {dynamicNavbar: false,domCache: true}).router.load({url: 'tpl/login.html',animatePages: false});
    	Storage.removeItem("userInfo");
	  	USER_INFO = {};
	    myApp.closeModal('.popup.modal-in');
	    myApp.loginScreen();
  	});
  });
});