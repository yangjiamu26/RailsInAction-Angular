myApp.onPageInit("storage-show", function(page) {
  myApp.addView('#view_storage_summary', {dynamicNavbar: false,domCache: true,linksView:'#view-storage'}).router.load({url: 'tpl/storage/summary.html',animatePages: false});
  myApp.addView('#view_storage_volumn', {dynamicNavbar: false,domCache: true,linksView:'#view-storage'}).router.load({url: 'tpl/volumn/list.html',animatePages: false});  
});