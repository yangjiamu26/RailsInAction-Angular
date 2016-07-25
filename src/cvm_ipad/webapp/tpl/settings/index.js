myApp.onPageInit("settings-index", function(page) {
  $$('#logout').on('click', function () {
    myApp.loginScreen();
  });
});