$.ajaxSetup({
  cache: false
})

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

  myApp.addView("#view-home",          {dynamicNavbar: false,domCache: true,linksView: "#view-home"}).router.load({url: "tpl/home/index.html",animatePages: false});
  myApp.addView(".view-panel-right",   {dynamicNavbar: false,domCache: true,linksView: ".view-panel-right"});
  myApp.addView("#view-business",      {dynamicNavbar: false,domCache: true,linksView: "#view-business"}).router.load({url: "tpl/business/index.html",animatePages: false});
  myApp.addView("#view-pool",          {dynamicNavbar: false,domCache: true,linksView: "#view-pool"}).router.load({url: "tpl/pool/index.html",animatePages: false});
  myApp.addView("#view-host",          {dynamicNavbar: false,domCache: true,linksView: "#view-host"}).router.load({url: "tpl/host/index.html",animatePages: false});
  myApp.addView("#view-vm",            {dynamicNavbar: false,domCache: true,linksView: "#view-vm"}).router.load({url: "tpl/vm/index.html",animatePages: false});

  myApp.addView("#view-storage",       {dynamicNavbar: false,domCache: true,linksView: "#view-storage"}).router.load({url: "tpl/storage/index.html",animatePages: false});    
  myApp.addView("#view-settings-left", {dynamicNavbar: false,domCache: true,linksView: "#view-settings-main"}).router.load({url: "tpl/settings/index.html",animatePages: false});
  myApp.addView("#view-settings-main", {dynamicNavbar: false,domCache: true,linksView: "#view-settings-main"}).router.load({url: "tpl/settings/profile.html",animatePages: false});

})