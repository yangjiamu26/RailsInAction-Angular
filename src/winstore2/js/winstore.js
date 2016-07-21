$(document).ready(function(){
	//存储文件列表绑定点击事件
	bindEvent("e_dbclick","e_noclick","click.fileselect",function(thisObj){
		$("input[type='checkbox']",thisObj).click();
	},function(thisObj){
		if(thisObj.attr("type") == "checkbox")
			return false;
		else
			return true;
	});
	bindEvent("e_dbclick","e_noclick","dblclick.fileopen",function(thisObj){
		$(".item-line-title a",thisObj)[0].click();
	},null);
})
function bindEvent(className,notClass,eventType,callBack,beforeCallback){
	$("." + className).bind(eventType,function(event){
		var e = event?event:window.event;
		var t = e.target||e.srcElement;
		var $t = $(t);
		if($t.hasClass(notClass)) 
			return true;
		else if(beforeCallback == null || beforeCallback($t))
			callBack($(this));
	})
}

!function ($) {

  "use strict"; 
  $(document).on("click",function(e){
     var oEvent = e || event;
     var tagerthBox=$(oEvent.target).parents(".fix-block");
      if(tagerthBox)
       { 
          var cB = $(oEvent.target).hasClass('email-list-item')?$(oEvent.target):$(oEvent.target).parents(".email-list-item");
          tagerthBox.find(".list-active").removeClass("list-active");
          cB.addClass("list-active");
          e.stopPropagation();
       };

  });
}(window.jQuery);