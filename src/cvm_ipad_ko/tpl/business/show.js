myApp.onPageInit("business-show", function(page) {
  myApp.addView('#view_business_summary', {dynamicNavbar: false,domCache: true,linksView:'#view-business'}).router.load({url: 'tpl/business/summary.html',animatePages: false});
  myApp.addView('#view_business_vm',      {dynamicNavbar: false,domCache: true,linksView:'#view-business'}).router.load({url: 'tpl/vm/list.html',animatePages: false});
});