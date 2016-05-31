// Determine theme depending on device

angular.module('app', []).controller('IndexController', ['$scope', '$compile', '$timeout', '$location',
    function($scope, $compile, $timeout, $location) {

        var href = document.location.href;
        var isAndroid = (href.indexOf("android") > -1);
        var is_v1 = (href.indexOf("is_v1") > -1);
        var is_v2 = (href.indexOf("is_v2") > -1);
        var is_v3 = (href.indexOf("is_v3") > -1);
        var isMaterial = isAndroid || (href.indexOf("material") > -1);

        $scope.isAndroid = isAndroid;
        $scope.isMaterial = isMaterial;
        $scope.is_v1 = is_v1;
        $scope.is_v2 = is_v2;
        $scope.is_v3 = is_v3;

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

        $timeout(function() {

            var myApp = new Framework7({
                animateNavBackIcon: true,
                cache: true,
                cacheDuration: 1000 * 60 * 1,
                cacheIgnoreGetParameters: true,
                pushState: false,
                fastClicks: true,
                // Enable Material theme for Android device only
                material: isMaterial,
                materialPageLoadDelay: 0
            });


            Dom7(document).on('pageInit', function(e) {
                console.log("pageInit");
                $compile(e.detail.page.navbarInnerContainer)($scope);
                $compile(e.srcElement)($scope);
                $scope.$apply();

                var page = e.detail.page;
                switch (page.name) {
                    case "ContactTabVC":
                        var linksView = '#view-contact';
                        if(is_v1) linksView = "#view-contact-main";
                        if(is_v2) linksView = ".view-main";
                        if(is_v3) linksView = ".view-main";

                        myApp.addView("#contact-tab1", {dynamicNavbar: false, domCache: true, linksView: linksView}).router.load({url: "UserListVC.html",     animatePages: false});
                        myApp.addView("#contact-tab2", {dynamicNavbar: false, domCache: true, linksView: linksView}).router.load({url: "GroupListVC.html",    animatePages: false});
                        myApp.addView("#contact-tab3", {dynamicNavbar: false, domCache: true, linksView: linksView}).router.load({url: "OrgListVC.html",      animatePages: false});
                        myApp.addView("#contact-tab4", {dynamicNavbar: false, domCache: true, linksView: linksView}).router.load({url: "CustomerList2VC.html",animatePages: false});
                        myApp.addView("#contact-tab5", {dynamicNavbar: false, domCache: true, linksView: linksView}).router.load({url: "TaListVC.html",       animatePages: false});
                        break;
                    case "AffairTabVC":
                        myApp.addView("#affair-tab1", {dynamicNavbar: false,domCache: true, linksView: '#view-home'}).router.load({url: "AffairListVC.html",animatePages: false});
                        myApp.addView("#affair-tab2", {dynamicNavbar: false,domCache: true, linksView: '#view-home'}).router.load({url: "AffairListVC.html",animatePages: false});
                        break;
                    case "DocuTabVC":
                        myApp.addView("#docu-tab1", {dynamicNavbar: false,domCache: true, linksView: '#view-home'}).router.load({url: "DocuListVC.html",animatePages: false});
                        myApp.addView("#docu-tab2", {dynamicNavbar: false,domCache: true, linksView: '#view-home'}).router.load({url: "DocuListVC.html",animatePages: false});
                        myApp.addView("#docu-tab3", {dynamicNavbar: false,domCache: true, linksView: '#view-home'}).router.load({url: "DocuListVC.html",animatePages: false});
                        myApp.addView("#docu-tab4", {dynamicNavbar: false,domCache: true, linksView: '#view-home'}).router.load({url: "DocuListVC.html",animatePages: false});
                        break;
                    case "CustomerTabVC":
                        myApp.addView("#customer-tab1", {dynamicNavbar: false,domCache: true, linksView: '#view-home'}).router.load({url: "CustomerListVC.html",animatePages: false});
                        myApp.addView("#customer-tab2", {dynamicNavbar: false,domCache: true, linksView: '#view-home'}).router.load({url: "CustomerListVC.html",animatePages: false});
                        myApp.addView("#customer-tab3", {dynamicNavbar: false,domCache: true, linksView: '#view-home'}).router.load({url: "CustomerListVC.html",animatePages: false});
                        break;
                    case "NoticeTabVC":
                        myApp.addView("#notice-tab1", {dynamicNavbar: false,domCache: true, linksView: '#view-work'}).router.load({url: "NoticeListVC.html",animatePages: false});
                        myApp.addView("#notice-tab2", {dynamicNavbar: false,domCache: true, linksView: '#view-work'}).router.load({url: "NoticeListVC.html",animatePages: false});
                        myApp.addView("#notice-tab3", {dynamicNavbar: false,domCache: true, linksView: '#view-work'}).router.load({url: "NoticeListVC.html",animatePages: false});
                        break;
                    case "AttentionTabVC":
                        myApp.addView("#attention-tab1", {dynamicNavbar: false,domCache: true, linksView: '#view-mine'}).router.load({url: "AttentionListVC.html",animatePages: false});
                        myApp.addView("#attention-tab2", {dynamicNavbar: false,domCache: true, linksView: '#view-mine'}).router.load({url: "AttentionListVC.html",animatePages: false});
                        break;
                }
            });

            myApp.addView('#view-login', {dynamicNavbar: !isMaterial,domCache: true}).router.load({url: 'LoginVC.html',animatePages: false});
            
            if (is_v1) {
                myApp.addView("#view-home-left",    {dynamicNavbar: !isMaterial,domCache: true,linksView: "#view-home-main"}).router.load({url: "HomeVC.html",animatePages: false});
                myApp.addView("#view-work-left",    {dynamicNavbar: !isMaterial,domCache: true,linksView: "#view-work-main"}).router.load({url: "WorkVC.html",animatePages: false});
                myApp.addView("#view-chat-left",    {dynamicNavbar: !isMaterial,domCache: true,linksView: "#view-chat-main"}).router.load({url: "ChatListVC.html",animatePages: false});
                myApp.addView("#view-contact-left", {dynamicNavbar: !isMaterial,domCache: true,linksView: "#view-contact-main"}).router.load({url: "ContactTabVC.html",animatePages: false});
                myApp.addView("#view-mine-left",    {dynamicNavbar: !isMaterial,domCache: true,linksView: "#view-mine-main"}).router.load({url: "MineVC.html",animatePages: false});

                myApp.addView("#view-home-main",    {dynamicNavbar: !isMaterial,domCache: true})
                myApp.addView("#view-work-main",    {dynamicNavbar: !isMaterial,domCache: true})
                myApp.addView("#view-chat-main",    {dynamicNavbar: !isMaterial,domCache: true})
                myApp.addView("#view-contact-main", {dynamicNavbar: !isMaterial,domCache: true})
                myApp.addView("#view-mine-main",    {dynamicNavbar: !isMaterial,domCache: true})
            } else if (is_v2 || is_v3) {
                myApp.addView("#view-home",    {dynamicNavbar: !isMaterial,domCache: true,linksView: ".view-main"}).router.load({url: "HomeVC.html",      animatePages: false});
                myApp.addView("#view-work",    {dynamicNavbar: !isMaterial,domCache: true,linksView: ".view-main"}).router.load({url: "WorkVC.html",      animatePages: false});
                myApp.addView("#view-chat",    {dynamicNavbar: !isMaterial,domCache: true,linksView: ".view-main"}).router.load({url: "ChatListVC.html",  animatePages: false});
                myApp.addView("#view-contact", {dynamicNavbar: !isMaterial,domCache: true,linksView: ".view-main"}).router.load({url: "ContactTabVC.html",animatePages: false});
                myApp.addView("#view-mine",    {dynamicNavbar: !isMaterial,domCache: true,linksView: ".view-main"}).router.load({url: "MineVC.html",      animatePages: false});

                myApp.addView('.view-left', {dynamicNavbar: !isMaterial,domCache: true})
                myApp.addView('.view-main', {dynamicNavbar: !isMaterial,domCache: true})
            } else {
                myApp.addView("#view-home",    {dynamicNavbar: !isMaterial,domCache: true}).router.load({url: "HomeVC.html",      animatePages: false});
                myApp.addView("#view-work",    {dynamicNavbar: !isMaterial,domCache: true}).router.load({url: "WorkVC.html",      animatePages: false});
                myApp.addView("#view-chat",    {dynamicNavbar: !isMaterial,domCache: true}).router.load({url: "ChatListVC.html",  animatePages: false});
                myApp.addView("#view-contact", {dynamicNavbar: !isMaterial,domCache: true}).router.load({url: "ContactTabVC.html",animatePages: false});
                myApp.addView("#view-mine",    {dynamicNavbar: !isMaterial,domCache: true}).router.load({url: "MineVC.html",      animatePages: false});
            }

            myApp.addView('#view-affairformvc',     {dynamicNavbar: !isMaterial,domCache: true}).router.load({url: 'AffairFormVC.html',     animatePages: false});
            myApp.addView('#view-docuformvc',       {dynamicNavbar: !isMaterial,domCache: true}).router.load({url: 'DocuFormVC.html',       animatePages: false});
            myApp.addView('#view-customerformvc',   {dynamicNavbar: !isMaterial,domCache: true}).router.load({url: 'CustomerFormVC.html',   animatePages: false});
            myApp.addView('#view-visitformvc',      {dynamicNavbar: !isMaterial,domCache: true}).router.load({url: 'VisitFormVC.html',      animatePages: false});
            myApp.addView('#view-dailyformvc',      {dynamicNavbar: !isMaterial,domCache: true}).router.load({url: 'DailyFormVC.html',      animatePages: false});
            myApp.addView('#view-weeklyformvc',     {dynamicNavbar: !isMaterial,domCache: true}).router.load({url: 'WeeklyFormVC.html',     animatePages: false});
            myApp.addView('#view-vacationformvc',   {dynamicNavbar: !isMaterial,domCache: true}).router.load({url: 'VacationFormVC.html',   animatePages: false});
            myApp.addView('#view-overtimeformvc',   {dynamicNavbar: !isMaterial,domCache: true}).router.load({url: 'OvertimeFormVC.html',   animatePages: false});
            myApp.addView('#view-tripformvc',       {dynamicNavbar: !isMaterial,domCache: true}).router.load({url: 'TripFormVC.html',       animatePages: false});
            myApp.addView('#view-chatformvc',       {dynamicNavbar: !isMaterial,domCache: true}).router.load({url: 'ChatFormVC.html',       animatePages: false});
            myApp.addView('#view-conversationvc',   {dynamicNavbar: !isMaterial,domCache: true}).router.load({url: 'ConversationVC.html',   animatePages: false});
            myApp.addView('#view-groupformvc',      {dynamicNavbar: !isMaterial,domCache: true}).router.load({url: 'GroupFormVC.html',      animatePages: false});
            myApp.addView('#view-userformvc',       {dynamicNavbar: !isMaterial,domCache: true}).router.load({url: 'UserFormVC.html',       animatePages: false});
            myApp.addView('#view-passwordformvc',   {dynamicNavbar: !isMaterial,domCache: true}).router.load({url: 'PasswordFormVC.html',   animatePages: false});
            myApp.addView('#view-feedbackformvc',   {dynamicNavbar: !isMaterial,domCache: true}).router.load({url: 'FeedbackFormVC.html',   animatePages: false});
            myApp.addView('#view-checkinoutformvc', {dynamicNavbar: !isMaterial,domCache: true}).router.load({url: 'CheckinoutFormVC.html', animatePages: false});
            myApp.addView('#view-workcycleformvc',  {dynamicNavbar: !isMaterial,domCache: true}).router.load({url: 'WorkCycleFormVC.html',  animatePages: false});

        });



    }
]);