  $(function(){
      // 触发点击
      $("#nav_tabs .active a").trigger("click");
    })
// 把某页面load到右边#main_content层
  function showMainContent(url,func){    
    $("#main_content").html("").load(url,function(){
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
