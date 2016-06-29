myApp.onPageInit("vm-show", function(page) {
  myApp.addView('#view_vm_summary', {dynamicNavbar: false,domCache: true,linksView:'#view-vm'}).router.load({url: 'tpl/vm/summary.html',animatePages: false});
  myApp.addView('#view_vm_performance',      {dynamicNavbar: false,domCache: true,linksView:'#view-vm'}).router.load({url: 'tpl/vm/performance.html',animatePages: false});
  myApp.addView('#view_vm_volumn', {dynamicNavbar: false,domCache: true,linksView:'#view-vm'}).router.load({url: 'tpl/volumn/list.html',animatePages: false});
});