// 触发点击
    $(window).load(function(){
      $("#tree_tabs .active a").trigger("click");
    })
// 把某页面load到右边#main_content层
  function showMainContent(url,func){    
    if(func != null) func();
    $("#main_content").html("").load(url);
  }
// 把某页面load到右边#tree_content层
  function showTreeContent(url,func){    
    if(func != null) func();
    $("#tree_content").html("").load(url);
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
// bootstrap样式，在小屏幕下，收缩左边菜单
  $(document).ready(function() {
    $('[data-toggle=offcanvas]').click(function() {
      $('.row-offcanvas').toggleClass('active');
    });
  });

