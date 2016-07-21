//cookie操作
(function($){
	$.cookie = function(name, value, options) {
		if (typeof value != 'undefined') { 
			options = options || {};
			if (value === null) {
				value = '';
				options.expires = -1;
			}
			var expires = '';
			if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
				var date;
				if (typeof options.expires == 'number') {
					date = new Date();
					date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
				} else {
					date = options.expires;
				}
				expires = '; expires=' + date.toUTCString(); 
			}
			var path = options.path ? '; path=' + options.path : '';
			var domain = options.domain ? '; domain=' + options.domain : '';
			var secure = options.secure ? '; secure' : '';
			document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
		} else {
			var cookieValue = null;
			if (document.cookie && document.cookie != '') {
				var cookies = document.cookie.split(';');
				for (var i = 0; i < cookies.length; i++) {
					var cookie = jQuery.trim(cookies[i]);
					if (cookie.substring(0, name.length + 1) == (name + '=')) {
						cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
						break;
					}
				}
			}
			return cookieValue;
		}
	};
	
})(jQuery);


$(function(){
	$(document).bind("click",function(event){
		var e = event?event:window.event;
		var $t = $(e.target||e.srcElement); 
		if($t.parents(".search_top").length < 1)
		{
			$(".search_top #keyword").height(20);
			//$(".search_top #toggle_group").hide();
		}
			
	})
})

//将查询关键字写入cookie
function setKeywords(){
	$.cookie("keyword",$("#keyword").val())
}

//如果有cookie则textarea默认是cookie内容
function getKeywords(){
	if(typeof $.cookie("keyword") != 'undefined' )
      $("#keyword").val($.cookie("keyword"));
}

//显示删除近似病和同异词兼容ie6
function bindDelFun(){
	if(navigator.userAgent.indexOf("MSIE 6.0")>0)
      $(".item > span").unbind("mouseover.DelSpan,mouseout.DelSpan").bind("mouseover.DelSpan",function(){
        $(this).addClass("hover").siblings().removeClass("hover");
      }).bind("mouseout.DelSpan",function(){
        $(this).removeClass("hover");
      })
}