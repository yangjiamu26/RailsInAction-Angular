// 触发点击
    $(window).load(function(){
      $("#nav_tabs .active").trigger("click");
      $("#nav_tabs .active a").trigger("click");
    })
// 把某页面load到主页面#main_content层
  function showMainContent(url,func){   
    $("#main_content").html("").load(url,function(){
      if(func != null) func();
    }); 
  }
// 把某页面load到主页面#dashboard_content层
  function showDashboardContent(url,func){   
    $("#dashboard_content").html("").load(url,function(){
      if(func != null) func();
    }); 
  }
// 把某页面load到#menu_content层
function showMenuContent(url,func){   
  $("#left-navigation").html("").load(url,function(){
    if(func != null) func();
  }); 
}
// 把某页面load到#page_content层
  function showPageContent(url,func){   
    $("#page_content").html("").load(url,function(){
      if(func != null) func();
    }); 
  }  
// 把某页面load到#subPpage_content层
  function showSubPageContent(url,func){    
    $("#subpage_content").html("").load(url,function(){
      if(func != null) func();
    });
  }  
// ajax弹窗
  function showModal(url,daily){
    $("#ajax-modal").load(url, '', function(){
      $("#ajax-modal").modal();
    });
    
  }
// 弹窗可拖动，需跟jquery-ui.js一起用
  if ($(".modal-draggable").length > 0) {
    $(".modal-draggable").draggable()
  }

