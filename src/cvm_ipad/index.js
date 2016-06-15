// Determine theme depending on device

angular.module('app', []).controller('IndexController', ['$scope', '$compile', '$timeout', '$location',
  function($scope, $compile, $timeout, $location) {

    var href = document.location.href;
    var isMaterial = (href.indexOf("material") > -1);
    var is_v1 = false;//(href.indexOf("is_v1") > -1);
    var is_v2 = false;//(href.indexOf("is_v2") > -1);
    var is_v3 = false;//(href.indexOf("is_v3") > -1);
    var is_v4 = true;//(href.indexOf("is_v4") > -1);

    $scope.isMaterial = isMaterial;
    $scope.is_v1 = is_v1;
    $scope.is_v2 = is_v2;
    $scope.is_v3 = is_v3;
    $scope.is_v4 = is_v4;

    $scope.setColorTheme = function(color){
        $scope.color_theme = "theme-" + color;
    }
    $scope.setLayoutTheme = function(layout){
        $scope.layout_theme = layout ? "layout-" + layout : "";
    }

    // Welcome Screen
    //var ipc = new myapp.pages.IndexPageController(myApp, Dom7);

    //Dom7(document).on('ajaxStart', function (e) {
    //                myApp.showIndicator();
    //                });
    //Dom7(document).on('ajaxComplete', function () {
    //                myApp.hideIndicator();
    //                });



    var myApp = new Framework7({
      animateNavBackIcon: true,
      cache: false,
      cacheDuration: 1000 * 60 * 1,
      cacheIgnoreGetParameters: true,
      pushState: false,
      fastClicks: true,
      // Enable Material theme for Android device only
      material: isMaterial,
      materialPageLoadDelay: 0
    });


    Dom7(document).on('pageInit', function(e) {
      //console.log("pageInit");
      $compile(e.detail.page.navbarInnerContainer)($scope);
      $compile(e.srcElement)($scope);
      $scope.$apply();

      var page = e.detail.page;
      switch (page.name) {
        case "LoginVC":
          Dom7('.open-dashboard').on('click', function () {
            myApp.popup('.popup-dashboard');
          });
          break;
        case "home-index":
          initTotal_cpu_chart();
          initTotal_memory_chart();
          initTotal_storage_chart();
          break;
        case "business-show":
          myApp.addView('#view_business_summary', {dynamicNavbar: true,domCache: true,linksView:'#view-business'}).router.load({url: 'tpl/business/summary.html',animatePages: false});
          myApp.addView('#view_business_vm',      {dynamicNavbar: true,domCache: true,linksView:'#view-business'}).router.load({url: 'tpl/vm/list.html',animatePages: false});
          break;
        case "pool-index":
          initPool_vtype_chart();
          initPool_cpu_chart();
          initPool_memory_chart();
          initPool_storage_chart();
          break;
        case "pool-show":
          myApp.addView('#view_pool_summary', {dynamicNavbar: true,domCache: true,linksView:'#view-pool'}).router.load({url: 'tpl/pool/summary.html',animatePages: false});
          myApp.addView('#view_pool_host',    {dynamicNavbar: true,domCache: true,linksView:'#view-pool'}).router.load({url: 'tpl/host/list.html',animatePages: false});
          myApp.addView('#view_pool_vm',      {dynamicNavbar: true,domCache: true,linksView:'#view-pool'}).router.load({url: 'tpl/vm/list.html',animatePages: false});
          myApp.addView('#view_pool_storage', {dynamicNavbar: true,domCache: true,linksView:'#view-pool'}).router.load({url: 'tpl/storage/list.html',animatePages: false});
          break;
        case "pool-summary":
          initSinglePool_cpu_chart();
          initSinglePool_memory_chart();
          initSinglePool_storage_chart();
          break;
        case "host-index":
          initHost_status_chart();
          break;
        case "host-show":
          myApp.addView('#view_host_summary', {dynamicNavbar: true,domCache: true,linksView:'#view-host'}).router.load({url: 'tpl/host/summary.html',animatePages: false});
          myApp.addView('#view_host_vm',      {dynamicNavbar: true,domCache: true,linksView:'#view-host'}).router.load({url: 'tpl/vm/list.html',animatePages: false});
          myApp.addView('#view_host_storage', {dynamicNavbar: true,domCache: true,linksView:'#view-host'}).router.load({url: 'tpl/storage/list.html',animatePages: false});
          break;
        case "host-summary":
          initSingleHost_cpu_chart();
          initSingleHost_memory_chart();
          initSingleHost_storage_chart();
          break;          
        case "vm-index":
          initVm_os_chart();
          initVm_status_chart();
          break;
        case "vm-show":
          myApp.addView('#view_vm_summary', {dynamicNavbar: true,domCache: true,linksView:'#view-vm'}).router.load({url: 'tpl/vm/summary.html',animatePages: false});
          myApp.addView('#view_vm_performance',      {dynamicNavbar: true,domCache: true,linksView:'#view-vm'}).router.load({url: 'tpl/vm/performance.html',animatePages: false});
          myApp.addView('#view_vm_volumn', {dynamicNavbar: true,domCache: true,linksView:'#view-vm'}).router.load({url: 'tpl/volumn/list.html',animatePages: false});
          break;
        case "vm-performance":
          var calendarRange = myApp.calendar({
              input: '#vmPerformanceDate',
              dateFormat: 'yyyy.mm.dd',
              rangePicker: true,
              monthNames: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
              dayNames: ['周日','周一','周二','周三','周四','周五','周六'],
              dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六']
          });     
          initMemoryUse_chart();
          initcpuUse_chart1();
          initcpuUse_chart2();      
          break;
        case "storage-index":
          initStorage_share_chart();
          initStorage_use_chart();
          break;
        case "storage-show":
          myApp.addView('#view_storage_summary', {dynamicNavbar: true,domCache: true,linksView:'#view-storage'}).router.load({url: 'tpl/storage/summary.html',animatePages: false});
          myApp.addView('#view_storage_volumn', {dynamicNavbar: true,domCache: true,linksView:'#view-storage'}).router.load({url: 'tpl/volumn/list.html',animatePages: false});
          break;
        case "storage-summary":
          initsingleStorage_use_chart();
          initsingleStorage_assigned_chart();
          break;          
      }
    });

    Dom7('.open-dashboard').on('click', function () {
      myApp.popup('.popup-dashboard');
    });
    Dom7('#logout').on('click', function () {
      myApp.loginScreen();
    });

    myApp.addView('#view-login', {dynamicNavbar: !isMaterial,domCache: true}).router.load({url: 'tpl/LoginVC.html',animatePages: false});
  
    myApp.addView("#view-home",          {dynamicNavbar: !isMaterial,domCache: true,linksView: "#view-home"}).router.load({url: "tpl/home/index.html",animatePages: false});
    myApp.addView(".view-panel-right",   {dynamicNavbar: !isMaterial,domCache: true,linksView: ".view-panel-right"});
    myApp.addView("#view-business",      {dynamicNavbar: !isMaterial,domCache: true,linksView: "#view-business"}).router.load({url: "tpl/business/index.html",animatePages: false});
    myApp.addView("#view-pool",          {dynamicNavbar: !isMaterial,domCache: true,linksView: "#view-pool"}).router.load({url: "tpl/pool/index.html",animatePages: false});
    myApp.addView("#view-host",          {dynamicNavbar: !isMaterial,domCache: true,linksView: "#view-host"}).router.load({url: "tpl/host/index.html",animatePages: false});
    myApp.addView("#view-vm",            {dynamicNavbar: !isMaterial,domCache: true,linksView: "#view-vm"}).router.load({url: "tpl/vm/index.html",animatePages: false});

    myApp.addView("#view-storage",       {dynamicNavbar: !isMaterial,domCache: true,linksView: "#view-storage"}).router.load({url: "tpl/storage/index.html",animatePages: false});    
    myApp.addView("#view-settings-left", {dynamicNavbar: !isMaterial,domCache: true,linksView: "#view-settings-main"}).router.load({url: "tpl/settings/MineVC.html",animatePages: false});
    myApp.addView("#view-settings-main", {dynamicNavbar: !isMaterial,domCache: true});

    myApp.addView('#view-passwordformvc',   {dynamicNavbar: !isMaterial,domCache: true}).router.load({url: 'tpl/settings/PasswordFormVC.html',   animatePages: false});
    myApp.addView('#view-feedbackformvc',   {dynamicNavbar: !isMaterial,domCache: true}).router.load({url: 'tpl/settings/FeedbackFormVC.html',   animatePages: false});
  }
]);