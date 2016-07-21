var $windowWidth = $(window).width();
var $navigationControl = $(".menu-control");
var $leftNavigation = $("#left-navigation");
var $minWrapper = $("#min-wrapper");
var $navigation = $("ul.mainNav");
jQuery(document).ready(function(a) {
    call_navigation();
    if ($windowWidth > 1025) {
        onDesktop()
    } else {
        if ($windowWidth < 500) {
            onPhoneDefault()
        } else {
            if ($windowWidth < 1025) {
                onTabletDefault()
            }
        }
    }
    minimize_left_menu_hover_Display();
     left_bar_minimize()
});

function call_navigation() {
    $navigation.multiAccordion({
        multiAccordion: true,
        speed: 500,
        closedSign: '<i class="fa fa-caret-down"></i>',
        openedSign: '<i class="fa fa-caret-up"></i>'
    })
}

function minimize_left_menu_hover_Display() {
    $("ul.mainNav li").hover(function() {
        if ($($leftNavigation).hasClass("active")) {
            $(this).children("ul").addClass("open")
        }
    }, function() {
        if ($($leftNavigation).hasClass("active")) {
            $(this).children("ul").removeClass("open");
            $(this).children("ul").removeAttr("style")
        }
    })
}

function dropDownMenuControl() {
    $("ul.mainNav li").children("ul").removeAttr("style")
}

function changeMenuSizeTriger() {
    $(window).trigger("resize")
}

function left_bar_minimize() {
    $($navigationControl).click(function() {
        if ($navigation.hasClass("active")) {
            $leftNavigation.removeClass("active");
            $navigation.removeClass("active");
            $minWrapper.removeClass("active");
            changeMenuSizeTriger()
        } else {
            $navigation.addClass("active");
            $minWrapper.addClass("active");
            $leftNavigation.addClass("active");
            $navigation.find("ul").removeAttr("style");
            changeMenuSizeTriger()
        }
    })
}

function onDesktop() {}

function onTabletDefault() {
    $navigation.addClass("active");
    $minWrapper.addClass("active");
    $leftNavigation.addClass("active");
    $navigation.slideDown()
}

function onTablet() {
    $navigation.addClass("active");
    $minWrapper.addClass("active");
    $leftNavigation.addClass("active")
}

function onPhoneDefault() {
    $navigation.addClass("mobile");
    $navigation.css("display", "none");
    $leftNavigation.css("width", "100%");
    $navigationControl.removeClass("spinIn").addClass("spinOut");
    $navigationControl.removeClass("active");
    $leftNavigation.children("ul").removeClass("active");
    $leftNavigation.removeClass("active");
    $($minWrapper).css("paddingLeft", "0")
}

function onPhone() {
    $($navigation).addClass("mobile");
    $($navigation).css("display", "none");
    $($leftNavigation).animate({
        width: "100%"
    }, 100, function() {
        $navigationControl.removeClass("spinIn").addClass("spinOut");
        $navigationControl.removeClass("active");
        $leftNavigation.children("ul").removeClass("active");
        $leftNavigation.removeClass("active")
    });
    $($minWrapper).animate({
        paddingLeft: "0"
    }, 100, function() {})
}
var resizeId;
$(window).resize(function() {
    clearTimeout(resizeId);
    resizeId = setTimeout(doneResizingLayout, 500)
});

function doneResizingLayout() {
    var a = $(window).width();
    if ($windowWidth != a) {
        if (a < 500) {
            onPhone()
        } else {
            if (a < 1025) {
                $leftNavigation.removeAttr("style");
                $minWrapper.removeAttr("style");
                $leftNavigation.removeAttr("style");
                $navigation.removeAttr("style");
                $navigation.removeClass("mobile");
                onTablet()
            } else {
                if (a > 1025) {
                    desktopResize()
                }
            }
        }
        $windowWidth = a
    } else {
        $windowWidth = a
    }
}

function desktopResize() {
    $leftNavigation.removeAttr("style");
    $minWrapper.removeAttr("style");
    $leftNavigation.removeAttr("style");
    $navigation.removeAttr("style");
    $navigation.removeClass("mobile");
    onDesktop()
}

function detectIE() {
    var c = window.navigator.userAgent;
    var b = c.indexOf("MSIE ");
    var a = c.indexOf("Trident/");
    if (b > 0) {
        return parseInt(c.substring(b + 5, c.indexOf(".", b)), 10)
    }
    if (a > 0) {
        var d = c.indexOf("rv:");
        return parseInt(c.substring(d + 3, c.indexOf(".", d)), 10)
    }
    return false
};

