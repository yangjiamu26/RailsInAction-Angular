myApp.onPageInit("settings-password", function(page) {
  $$('.save-password').on('click', function () {
      myApp.alert('恭喜，密码修改成功!');
  });
});