
    $("#subpage_content").click(function(e){
        var E = e || window.event;
        var $target = $(E.target);
        if($target.parents("a.minus").length > 0)
        {
            var panel = $target.parents(".panel");
            var a = panel.children(".panel-body");
            var handler = $target.parents("a.minus");
            if (handler.hasClass("active")) {
                a.slideDown(200);
                panel.find("i").removeClass("fa-square-o");
                panel.find("i").addClass("fa-minus");
                handler.removeClass("active")
            } else {
                a.slideUp(200);
                panel.find("i").removeClass("fa-minus");
                panel.find("i").addClass("fa-square-o");
                handler.addClass("active")
            }
        } 
    })
