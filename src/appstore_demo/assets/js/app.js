$(function(){
  $("body").on("touchstart.showmenu","#showmenu1",function(){
    var menu = $('#index_menu1');
    menu.toggleClass("active");
    if(menu.hasClass("active"))
      menu.bind("touchend.showmenu",function(){
        menu.removeClass("active").unbind("touchend.showmenu");
      })
  });

  // page_orientationchange();
})

function browser(){
  var agent = navigator.userAgent;
  var browser = '';
  if(agent.indexOf("iPhone") > -1)
    browser = 'safari';
  return browser;
}

function showSearchResult(obj){
    $(".loading").show();
    $('.table-view').hide();
    var searchword = $(obj).val();
    $(obj).val('企业').blur();
    setTimeout(function(){
      $(".loading").hide();
      if(searchword.length > 1)
      {
      	$('#search_result_nodata').show().find("#keyword").html(searchword);//模拟搜索功能
      	$('#search_result_havedata').hide();
      }
      else
      {
      	$('#search_result_nodata').hide();
      	$('#search_result_havedata').show();
      }
    },3000);
}
function showAutoCompelete(){
	$('#search_result_nodata').hide();
  $('#search_result_havedata').hide();
	$("#autocompelete").show();
  $('header').removeClass("shadow-5");
}
function hideAutoCompelete(){
	$("#autocompelete").hide();
  $('header').addClass("shadow-5");
}
//模拟搜索功能
function channelsearch(obj){
  var searchword = $(obj).find('input').val();
  $("#channel_nodata,#channel_data").hide();
  $(".loading").show();
  setTimeout(function(){
      $(".loading").hide();
      if(searchword.length > 1)
      {
        $('#channel_data').hide();
        $('#channel_nodata,#channel_nodata_recommend').show();
      }
      else
      {
        $('#channel_data').show();
        $('#channel_nodata,#channel_nodata_recommend').hide();
      }
  },3000);
}

//判断是否微信
function is_weixn(){
  var ua = navigator.userAgent.toLowerCase();
  if(ua.match(/MicroMessenger/i)=="micromessenger") {
      return true;
  } else {
      return false;
  }
}

//如果是微信,禁止下载
function stopDownload(e){
  e = e.originalEvent || e;
  if(is_weixn())
  {
    e.preventDefault();
    //alert("如果没有跳转，你可能使用了最新版微信，点击右上角跳转按钮，选择在浏览器打开，一样可以下载哦。","下载不成功")
    $("#isweixin_poplayer").show().bind("click.showweixin_poplayer",function(){
      $(this).hide().unbind("click.showweixin_poplayer");
    });
  }
}

//获取链接参数
function getParam(paras){
  var returnValue;
  var url = window.location.href;
  var paraString = url.substring(url.indexOf("?")+1,url.length).split("&");
  var paraObj = {};
  for (i=0; j=paraString[i]; i++){ 
    paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length); 
  } 
  returnValue = paraObj[paras.toLowerCase()];
  return returnValue; 
}

function segmented(obj,direction){
  var nav = $(obj).parents('nav');
  var line = nav.find('.segmented-line');
  var width = nav.find('.segmented-control').find("a").eq(0).width();
  line.css("width",width);
  if(direction == 'left')
    line.css("left",10);
  else
    line.css("left",width+10);
}

$(window).bind("orientationchange", function(event) { 
  page_orientationchange();
});

function page_orientationchange(){
  var w = $(window).width();
  var h = $(window).height();
  if(w > h)
    $('body').append('<div class="touyun"></div>')
  else
    $('.touyun').remove();
}

// !(function () {
//   'use strict';

//   var start     = {};
//   var touchMove = false;
//   var distanceX = false;
//   var moveX = 0;
//   var toggleObj = false;
//   var moveItem = false;
//   var touchObj = false;
//   var moveArea = false;

//   var findItem = function (target) {
//     return moveItem = $(target).parents(".showcontrol");
//   };

//   window.addEventListener('touchstart', function (e) {
//     e = e.originalEvent || e;

//     toggleObj = findItem(e.target);
    
//     if (!toggleObj) {
//       return;
//     }
//     moveArea = moveItem.parents("li").find(".controllayer").width();
//     start     = { pageX : e.touches[0].pageX, pageY : e.touches[0].pageY };

//     touchMove = false;
//     moveX = typeof(moveItem.attr("movex")) == 'undefined' ? 0 : parseInt(toggleObj.attr("movex"));
//     moveItem.find(".movelayer").removeClass("transition-1");
//   });

//   window.addEventListener('touchmove', function (e) {
//     e = e.originalEvent || e;

//     if (e.touches.length > 1) {
//       return; 
//     }

//     if (!toggleObj || toggleObj.length < 1) {
//       return;
//     }

//     touchMove = true;
//     distanceX = e.touches[0].pageX - start.pageX;
//     if(distanceX > 20)
//       e.preventDefault();
//     if(distanceX < 0 && (-distanceX > moveArea))
//     {
//     	toggleObj.attr("isopen","true");
//     	return;
//     }
//     if(moveX > 0)
//     {
//     	toggleObj.attr("isopen","false");
//     	return;
//     }
//     if(toggleObj.attr("isopen") != "true" && distanceX > 0)
//     	return;

//     if(distanceX < 0 )
//    	{
//    		if(distanceX < -moveArea)
//    			distanceX = -moveArea
//    		moveX = distanceX;
//    	}
//    	if(distanceX > 0 )
//    	 moveX = -moveArea + distanceX;

//     moveItem.find(".movelayer").css('transform','translate3d(' + moveX + 'px,0,0)').attr("movex",moveX);

//     if(moveX == 0)
//     	toggleObj.attr("isopen","false");


//   });

//   window.addEventListener('touchend', function (e) {
//   	if(distanceX < 0)
//   	{
//   		if( -distanceX > moveArea/2)
//   		{
//   			moveItem.find(".movelayer").addClass("transition-1").css('transform','translate3d(' + (-moveArea) + 'px,0,0)').attr("movex",-moveArea);
//   			toggleObj.attr("isopen","true");
//   		}
//   		else
//   		{
//   			moveItem.find(".movelayer").addClass("transition-1").css('transform','translate3d(' + 0 + 'px,0,0)').attr("movex",0);
//   			toggleObj.attr("isopen","false");
//   		}
//   	}
//   	if(distanceX > 0)
//   	{
//   		if( distanceX > moveArea/2)
//   		{
//   			moveItem.find(".movelayer").addClass("transition-1").css('transform','translate3d(' + 0 + 'px,0,0)').attr("movex",0);
//   			toggleObj.attr("isopen","false");
//   		}
//   		else
//   		{
//   			moveItem.find(".movelayer").addClass("transition-1").css('transform','translate3d(' + (-moveArea) + 'px,0,0)').attr("movex",-moveArea);
//   			toggleObj.attr("isopen","true");
//   		}
//   	}
//   	touchMove = false;
//   });

// }());