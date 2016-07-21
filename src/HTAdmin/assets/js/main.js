// 触发点击
    $(window).load(function(){
      $("#nav_tabs .active a").trigger("click");
    })
// 把某页面load到右边#page-content层
  function showPageContent(url,func){    
    if(func != null) func();
    $("#page-content").html("").load(url);
  }
// ajax弹窗
  function showModal(url,daily){
    $("#ajax-modal").load(url, '', function(){
      $("#ajax-modal").modal();
    });
    
  }
