var requestNUM = 0;
function backToLogin(res){
  requestNUM = 0;
  myApp.showAssisTime = false;
  myApp.Login_Again = true;
  myApp.addView('#view-login', {dynamicNavbar: false,domCache: true}).router.load({url: 'tpl/login.html',animatePages: false});
  myApp.alert(res.msg,function(){
    myApp.closeModal('.popup.modal-in');
    return myApp.loginScreen();
  });
}
function checkNetWork(thisRequest){
  if(navigator.onLine!=true){
    if(thisRequest==1){
      myApp.alert('当前网络不可用，请检查您的网络设置！');
    }
    return;
  }
}
function RestServiceJs(newurl) {
  requestNUM = requestNUM+1;
  var url = newurl;
  if(newurl&&newurl.indexOf('demoapi')>-1) url = url+'.json';
  var self = {};
  self.myurl = url;  
  
  var client_token = "";
  var client_account = "";
  if(USER_INFO.token) client_token = USER_INFO.token;
  if(USER_INFO.tokenKey) client_account = USER_INFO.tokenKey
  self.post = function(params, callback, error) {
      var thisRequest = requestNUM;
      checkNetWork(thisRequest);
      
      params.client_token = client_token;
      params.client_account = client_account;
      $.ajax({
          type: 'POST',  
          url: self.myurl,  
          data: JSON.stringify(params),
          processData: false,  
          dataType: 'json',
          contentType: 'application/json',
          success: function(res){
            if(res.tokenCheck == false){
              if(thisRequest==1){
                backToLogin(res);
              }
            }else{
              requestNUM = 0;
              callback(res);
            }
          },  
          error: error ? error : function(req, status, ex) {
            console.log(req);
            if(req){
              if(req.responseText){
                if(JSON.parse(req.responseText).exception == 'sys.rest.connect.error'){
                  myApp.alert('请检查CSC服务是否正常！');
                }else{
                  myApp.alert(JSON.parse(req.responseText).exception);
                }
              }else if(req.statusText=='timeout'){
                myApp.alert('请求超时！');
              }else{
                myApp.alert('服务器异常或停止运行！');
              }
            }else{
              myApp.alert('未知错误！');
            }
          },  
          timeout:60000  
      });  
  };  
   
  self.put= function(params, callback, error) {
      var thisRequest = requestNUM;
      checkNetWork(thisRequest);

      params.client_token = client_token;
      params.client_account = client_account;
      $.ajax({
          type: 'PUT',  
          url: self.myurl,  
          data: JSON.stringify(params), 
          processData: false,  
          dataType: 'json',
          contentType: 'application/json',  
          success: function(res){
            if(res.tokenCheck == false){
              if(thisRequest==1){
                backToLogin(res);
              }
            }else{
              requestNUM = 0;
              callback(res);
            }
          },  
          error: error ? error : function(req, status, ex) {
            console.log(req);
            if(req){
              if(req.responseText){
                if(JSON.parse(req.responseText).exception == 'sys.rest.connect.error'){
                  myApp.alert('请检查CSC服务是否正常！');
                }else{
                  myApp.alert(JSON.parse(req.responseText).exception);
                }
              }else if(req.statusText=='timeout'){
                myApp.alert('请求超时！');
              }else{
                myApp.alert('服务器异常或停止运行！');
              }
            }else{
              myApp.alert('未知错误！');
            }
          },  
          timeout:60000  
      });  
  };  
   
  self.get = function(id, params, callback, error) {
      var thisRequest = requestNUM;
      checkNetWork(thisRequest);

      var end = '';
      if(self.myurl.indexOf('demoapi')>-1){
        self.myurl = self.myurl.replace('.json','');
        end = '.json';
      }
      params.client_token = client_token;
      params.client_account = client_account;
      $.ajax({
          type: 'GET',  
          url: self.myurl + '/' + id +end,
          data: params, 
          dataType: 'json',
          contentType: 'application/json',  
          success: function(res){
            if(res.tokenCheck == false){
              if(thisRequest==1){
                backToLogin(res);
              }
            }else{
              requestNUM = 0;
              callback(res);
            }
          },  
          error: error ? error : function(req, status, ex) {
            console.log(req);
            if(req){
              if(req.responseText){
                if(JSON.parse(req.responseText).exception == 'sys.rest.connect.error'){
                  myApp.alert('请检查CSC服务是否正常！');
                }else{
                  myApp.alert(JSON.parse(req.responseText).exception);
                }
              }else if(req.statusText=='timeout'){
                myApp.alert('请求超时！');
              }else{
                myApp.alert('服务器异常或停止运行！');
              }
            }else{
              myApp.alert('未知错误！');
            }
          }, 
          timeout:60000
      });  
  };
   
  self.query = function(params, callback, error) {
      var thisRequest = requestNUM;
      checkNetWork(thisRequest);

      params.client_token = client_token;
      params.client_account = client_account;
      $.ajax({
          type: 'GET',  
          url: self.myurl,
          data: params, 
          dataType: 'json',
          contentType: 'application/json',  
          success: function(res){
            if(res.tokenCheck == false){
              if(thisRequest==1){
                backToLogin(res);
              }
            }else{
              requestNUM = 0;
              callback(res);
            }
          },  
          error: error ? error : function(req, status, ex) {
            console.log(req);
            if(req){
              if(req.responseText){
                if(JSON.parse(req.responseText).exception == 'sys.rest.connect.error'){
                  myApp.alert('请检查CSC服务是否正常！');
                }else{
                  myApp.alert(JSON.parse(req.responseText).exception);
                }
              }else if(req.statusText=='timeout'){
                myApp.alert('请求超时！');
              }else{
                myApp.alert('服务器异常或停止运行！');
              }
            }else{
              myApp.alert('未知错误！');
            }
          }, 
          timeout:60000
      });  
  };  
   
  self.del = function(id, callback, error) {
      var thisRequest = requestNUM;
      checkNetWork(thisRequest);

      params.client_token = client_token;
      params.client_account = client_account;
      $.ajax({
          type: 'DELETE',  
          url: self.myurl + '/' + id,  
          dataType: 'json',
          contentType: 'application/json',  
          success: function(res){
            if(res.tokenCheck == false){
              if(thisRequest==1){
                backToLogin(res);
              }
            }else{
              requestNUM = 0;
              callback(res);
            }
          },  
          error: error ? error : function(req, status, ex) {
            console.log(req);
            if(req){
              if(req.responseText){
                if(JSON.parse(req.responseText).exception == 'sys.rest.connect.error'){
                  myApp.alert('请检查CSC服务是否正常！');
                }else{
                  myApp.alert(JSON.parse(req.responseText).exception);
                }
              }else if(req.statusText=='timeout'){
                myApp.alert('请求超时！');
              }else{
                myApp.alert('服务器异常或停止运行！');
              }
            }else{
              myApp.alert('未知错误！');
            }
          }, 
          timeout:60000  
      });  
  };

  return self;
}
