$.ajaxSetup({
  cache: false
})
PAGE_SIZE = 6;

var $$ = Dom7;
var myApp = new Framework7({
  animateNavBackIcon: true,
  modalTitle: '',
  cache: false,
  cacheDuration: 1000 * 60 * 1,
  cacheIgnoreGetParameters: true,
  pushState: false
});

$(function(){

  myApp.addView('#view-login', {dynamicNavbar: false,domCache: true}).router.load({url: 'tpl/login.html',animatePages: false});

});
