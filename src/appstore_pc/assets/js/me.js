  $(function(){
      // 触发点击
      $("#nav_tabs .active a").trigger("click");
      // 判断url传值，以打开弹窗
      validateEmail();
    })
// 把某页面load到右边#main_content层
  function showMainContent(url,func){    
    if(func != null) func();
    $("#main_content").html("").load(url);
  }
  // 把某页面load到#appstorelist层
  function showAppStoreList(url,func){    
    if(func != null) func();
    $("#appstorelist").html("").load(url);
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

//如果是验证邮件跳转
  function validateEmail(){
    var Url = window.location.href;
    if(Url.indexOf("validate") > -1)
    {
      var Validation = Url.substring(Url.indexOf("validate") + 9,Url.indexOf("pass") - 1);
      var Passed = Url.substring(Url.indexOf("pass") + 5,Url.length);
      if(Validation == "yes" && Passed == "true")
        showModal("pages/register-step-pwd.html");
    }
  }