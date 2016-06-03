// Determine theme depending on device

angular.module('app', []).controller('IndexController', ['$scope', '$compile', '$timeout', '$location',
    function($scope, $compile, $timeout, $location) {

        var href = document.location.href;
        var isMaterial = (href.indexOf("material") > -1);
        var is_v1 = (href.indexOf("is_v1") > -1);
        var is_v2 = (href.indexOf("is_v2") > -1);
        var is_v3 = (href.indexOf("is_v3") > -1);
        var is_v4 = (href.indexOf("is_v4") > -1);

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
            //console.log("pageInit");
            $compile(e.detail.page.navbarInnerContainer)($scope);
            $compile(e.srcElement)($scope);
            $scope.$apply();

            var page = e.detail.page;
            switch (page.name) {
                case "ContactTabVC":
                    var linksView = '#view-contact';
                    if(is_v1 || is_v4) linksView = "#view-contact-main";
                    if(is_v2 || is_v3) linksView = ".view-main";

                    myApp.addView("#contact-tab1", {dynamicNavbar: false, domCache: true, linksView: linksView}).router.load({url: "tpl/contact/user/UserListVC.html",     animatePages: false});
                    myApp.addView("#contact-tab2", {dynamicNavbar: false, domCache: true, linksView: linksView}).router.load({url: "tpl/contact/group/GroupListVC.html",    animatePages: false});
                    myApp.addView("#contact-tab3", {dynamicNavbar: false, domCache: true, linksView: linksView}).router.load({url: "tpl/contact/org/OrgListVC.html",      animatePages: false});
                    myApp.addView("#contact-tab4", {dynamicNavbar: false, domCache: true, linksView: linksView}).router.load({url: "tpl/contact/customer/CustomerList2VC.html",animatePages: false});
                    myApp.addView("#contact-tab5", {dynamicNavbar: false, domCache: true, linksView: linksView}).router.load({url: "tpl/contact/ta/TaListVC.html",       animatePages: false});
                    break;
                case "AffairTabVC":
                    myApp.addView("#affair-tab1", {dynamicNavbar: false,domCache: true, linksView: '#view-home'}).router.load({url: "tpl/work/affair/AffairListVC.html",animatePages: false});
                    myApp.addView("#affair-tab2", {dynamicNavbar: false,domCache: true, linksView: '#view-home'}).router.load({url: "tpl/work/affair/AffairListVC.html",animatePages: false});
                    break;
                case "DocuTabVC":
                    myApp.addView("#docu-tab1", {dynamicNavbar: false,domCache: true, linksView: '#view-home'}).router.load({url: "tpl/work/doc/DocuListVC.html",animatePages: false});
                    myApp.addView("#docu-tab2", {dynamicNavbar: false,domCache: true, linksView: '#view-home'}).router.load({url: "tpl/work/doc/DocuListVC.html",animatePages: false});
                    myApp.addView("#docu-tab3", {dynamicNavbar: false,domCache: true, linksView: '#view-home'}).router.load({url: "tpl/work/doc/DocuListVC.html",animatePages: false});
                    myApp.addView("#docu-tab4", {dynamicNavbar: false,domCache: true, linksView: '#view-home'}).router.load({url: "tpl/work/doc/DocuListVC.html",animatePages: false});
                    break;
                case "CustomerTabVC":
                    myApp.addView("#customer-tab1", {dynamicNavbar: false,domCache: true, linksView: '#view-home'}).router.load({url: "tpl/contact/customer/CustomerListVC.html",animatePages: false});
                    myApp.addView("#customer-tab2", {dynamicNavbar: false,domCache: true, linksView: '#view-home'}).router.load({url: "tpl/contact/customer/CustomerListVC.html",animatePages: false});
                    myApp.addView("#customer-tab3", {dynamicNavbar: false,domCache: true, linksView: '#view-home'}).router.load({url: "tpl/contact/customer/CustomerListVC.html",animatePages: false});
                    break;
                case "NoticeTabVC":
                    myApp.addView("#notice-tab1", {dynamicNavbar: false,domCache: true, linksView: '#view-work'}).router.load({url: "tpl/work/notice/NoticeListVC.html",animatePages: false});
                    myApp.addView("#notice-tab2", {dynamicNavbar: false,domCache: true, linksView: '#view-work'}).router.load({url: "tpl/work/notice/NoticeListVC.html",animatePages: false});
                    myApp.addView("#notice-tab3", {dynamicNavbar: false,domCache: true, linksView: '#view-work'}).router.load({url: "tpl/work/notice/NoticeListVC.html",animatePages: false});
                    break;
                case "AttentionTabVC":
                    myApp.addView("#attention-tab1", {dynamicNavbar: false,domCache: true, linksView: '#view-mine'}).router.load({url: "tpl/contact/attention/AttentionListVC.html",animatePages: false});
                    myApp.addView("#attention-tab2", {dynamicNavbar: false,domCache: true, linksView: '#view-mine'}).router.load({url: "tpl/contact/attention/AttentionListVC.html",animatePages: false});
                    break;
            }
        });

        myApp.addView('#view-login', {dynamicNavbar: !isMaterial,domCache: true}).router.load({url: 'tpl/LoginVC.html',animatePages: false});
        
        $scope.$on("$includeContentLoaded", function(event, src){
            console.log("src="+src)
            if (src=='tpl/tablet_v1.html' || src=="tpl/tablet_v4.html") {
                myApp.addView("#view-home-left",    {dynamicNavbar: !isMaterial,domCache: true,linksView: "#view-home-main"}).router.load({url: "tpl/home/HomeVC.html",animatePages: false});
                myApp.addView("#view-work-left",    {dynamicNavbar: !isMaterial,domCache: true,linksView: "#view-work-main"}).router.load({url: "tpl/work/WorkVC.html",animatePages: false});
                myApp.addView("#view-chat-left",    {dynamicNavbar: !isMaterial,domCache: true,linksView: "#view-chat-main"}).router.load({url: "tpl/chat/ChatListVC.html",animatePages: false});
                myApp.addView("#view-contact-left", {dynamicNavbar: !isMaterial,domCache: true,linksView: "#view-contact-main"}).router.load({url: "tpl/contact/ContactTabVC.html",animatePages: false});
                myApp.addView("#view-mine-left",    {dynamicNavbar: !isMaterial,domCache: true,linksView: "#view-mine-main"}).router.load({url: "tpl/mine/MineVC.html",animatePages: false});

                myApp.addView("#view-home-main",    {dynamicNavbar: !isMaterial,domCache: true})
                myApp.addView("#view-work-main",    {dynamicNavbar: !isMaterial,domCache: true})
                myApp.addView("#view-chat-main",    {dynamicNavbar: !isMaterial,domCache: true})
                myApp.addView("#view-contact-main", {dynamicNavbar: !isMaterial,domCache: true})
                myApp.addView("#view-mine-main",    {dynamicNavbar: !isMaterial,domCache: true})
            } else if (src=='tpl/tablet_v2.html' || src=="tpl/tablet_v3.html") {
                myApp.addView('.view-left', {dynamicNavbar: !isMaterial,domCache: true})
                myApp.addView('.view-main', {dynamicNavbar: !isMaterial,domCache: true})

                myApp.addView("#view-home",    {dynamicNavbar: !isMaterial,domCache: true,linksView: ".view-main"}).router.load({url: "tpl/home/HomeVC.html",      animatePages: false});
                myApp.addView("#view-work",    {dynamicNavbar: !isMaterial,domCache: true,linksView: ".view-main"}).router.load({url: "tpl/work/WorkVC.html",      animatePages: false});
                myApp.addView("#view-chat",    {dynamicNavbar: !isMaterial,domCache: true,linksView: ".view-main"}).router.load({url: "tpl/chat/ChatListVC.html",  animatePages: false});
                myApp.addView("#view-contact", {dynamicNavbar: !isMaterial,domCache: true,linksView: ".view-main"}).router.load({url: "tpl/contact/ContactTabVC.html",animatePages: false});
                myApp.addView("#view-mine",    {dynamicNavbar: !isMaterial,domCache: true,linksView: ".view-main"}).router.load({url: "tpl/mine/MineVC.html",      animatePages: false});
            } else if (src=='tpl/phone.html') {
                myApp.addView("#view-home",    {dynamicNavbar: !isMaterial,domCache: true}).router.load({url: "tpl/home/HomeVC.html",      animatePages: false});
                myApp.addView("#view-work",    {dynamicNavbar: !isMaterial,domCache: true}).router.load({url: "tpl/work/WorkVC.html",      animatePages: false});
                myApp.addView("#view-chat",    {dynamicNavbar: !isMaterial,domCache: true}).router.load({url: "tpl/chat/ChatListVC.html",  animatePages: false});
                myApp.addView("#view-contact", {dynamicNavbar: !isMaterial,domCache: true}).router.load({url: "tpl/contact/ContactTabVC.html",animatePages: false});
                myApp.addView("#view-mine",    {dynamicNavbar: !isMaterial,domCache: true}).router.load({url: "tpl/mine/MineVC.html",      animatePages: false});
            }
        })
        

        myApp.addView('#view-affairformvc',     {dynamicNavbar: !isMaterial,domCache: true}).router.load({url: 'tpl/work/affair/AffairFormVC.html',     animatePages: false});
        myApp.addView('#view-docuformvc',       {dynamicNavbar: !isMaterial,domCache: true}).router.load({url: 'tpl/work/doc/DocuFormVC.html',       animatePages: false});
        myApp.addView('#view-customerformvc',   {dynamicNavbar: !isMaterial,domCache: true}).router.load({url: 'tpl/contact/customer/CustomerFormVC.html',   animatePages: false});
        myApp.addView('#view-visitformvc',      {dynamicNavbar: !isMaterial,domCache: true}).router.load({url: 'tpl/contact/visit/VisitFormVC.html',      animatePages: false});
        myApp.addView('#view-dailyformvc',      {dynamicNavbar: !isMaterial,domCache: true}).router.load({url: 'tpl/work/daily/DailyFormVC.html',      animatePages: false});
        myApp.addView('#view-weeklyformvc',     {dynamicNavbar: !isMaterial,domCache: true}).router.load({url: 'tpl/work/weekly/WeeklyFormVC.html',     animatePages: false});
        myApp.addView('#view-vacationformvc',   {dynamicNavbar: !isMaterial,domCache: true}).router.load({url: 'tpl/work/vacation/VacationFormVC.html',   animatePages: false});
        myApp.addView('#view-overtimeformvc',   {dynamicNavbar: !isMaterial,domCache: true}).router.load({url: 'tpl/work/overtime/OvertimeFormVC.html',   animatePages: false});
        myApp.addView('#view-tripformvc',       {dynamicNavbar: !isMaterial,domCache: true}).router.load({url: 'tpl/work/trip/TripFormVC.html',       animatePages: false});
        myApp.addView('#view-chatformvc',       {dynamicNavbar: !isMaterial,domCache: true}).router.load({url: 'tpl/chat/ChatFormVC.html',       animatePages: false});
        myApp.addView('#view-conversationvc',   {dynamicNavbar: !isMaterial,domCache: true}).router.load({url: 'tpl/chat/conversation/ConversationVC.html',   animatePages: false});
        myApp.addView('#view-groupformvc',      {dynamicNavbar: !isMaterial,domCache: true}).router.load({url: 'tpl/contact/group/GroupFormVC.html',      animatePages: false});
        myApp.addView('#view-userformvc',       {dynamicNavbar: !isMaterial,domCache: true}).router.load({url: 'tpl/contact/user/UserFormVC.html',       animatePages: false});
        myApp.addView('#view-passwordformvc',   {dynamicNavbar: !isMaterial,domCache: true}).router.load({url: 'tpl/mine/PasswordFormVC.html',   animatePages: false});
        myApp.addView('#view-feedbackformvc',   {dynamicNavbar: !isMaterial,domCache: true}).router.load({url: 'tpl/mine/FeedbackFormVC.html',   animatePages: false});
        myApp.addView('#view-checkinoutformvc', {dynamicNavbar: !isMaterial,domCache: true}).router.load({url: 'tpl/work/checkout/CheckinoutFormVC.html', animatePages: false});
        myApp.addView('#view-workcycleformvc',  {dynamicNavbar: !isMaterial,domCache: true}).router.load({url: 'tpl/work/workcycle/WorkCycleFormVC.html',  animatePages: false});

    }
]);