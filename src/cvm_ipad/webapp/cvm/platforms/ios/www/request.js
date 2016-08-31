var requestNUM = 0;
var errerNUM = [0,0,0,0,0];
var intervalCheckNte = null;
var interAlert = false;

function startCheckNet(){
    intervalCheckNte = setInterval(function(){
      checkNetWork(1);
    },500);
}

function backToLogin(res){
  requestNUM = 0;
  myApp.showAssisTime = false;
  myApp.Login_Again = true;
  if(!myApp.isInLoginPage) myApp.addView('#view-login', {dynamicNavbar: false,domCache: true}).router.load({url: 'tpl/login.html',animatePages: false});
  clearInterval(intervalCheckNte);
  interAlert = false;
  $$("#assistive").hide();
  if(res&&res.tokenCheck==false){
    myApp.alert('您的登陆已过期，请重新登陆！',function(){
      myApp.closeModal('.popup.modal-in');
      return myApp.loginScreen();
    });
  }
  if(res&&res.msg){
    myApp.alert(res.msg,function(){
      myApp.closeModal('.popup.modal-in');
      return myApp.loginScreen();
    });
  }else{
    myApp.closeModal('.popup.modal-in');
    return myApp.loginScreen();
  }
}
function checkNetWork(thisRequest,callback){
  if(callback){
    setTimeout(function(){
      if(navigator.onLine){
        callback();
      }else{
        if(thisRequest>1||interAlert) return;
        myApp.alert('当前网络不可用，请检查您的网络设置！',function(){
          return backToLogin();
        });
      }
    },200);
  }else{
    if(!navigator.onLine){
      if(interAlert) return;
      interAlert = true;
      myApp.alert('当前网络不可用，请检查您的网络设置！',function(){
        return backToLogin();
      });
    }
  }
}
function alertErrer(req, status, ex){
  checkNetWork(1,function(){
    if(req){
      if(req.responseText){
        if(JSON.parse(req.responseText).exception == 'sys.rest.connect.error'){
          errerNUM[0]++;
          if(errerNUM[0]==1){
            myApp.alert('请检查CSC服务是否正常！',function(){
              errerNUM[0]=0;
            });
          }
        }else{
          errerNUM[1]++;
          if(errerNUM[1]==1){
            myApp.alert(JSON.parse(req.responseText).exception,function(){
              errerNUM[1]=0;
            });
          }
        }
      }else if(req.statusText=='timeout'){
        errerNUM[2]++;
        if(errerNUM[2]==1){
          myApp.alert('请求超时！',function(){
            errerNUM[2]=0;
          });
        }
      }else{
        errerNUM[3]++;
        if(errerNUM[3]==1){
          myApp.alert('服务器异常或停止运行！',function(){
            errerNUM[3]=0;
          });
        }
      }
    }else{
      errerNUM[4]++;
      if(errerNUM[4]==1){
        myApp.alert('未知错误！',function(){
          errerNUM[4]=0;
        });
      }
    }
  });
  
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
      checkNetWork(thisRequest,function(){
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
              alertErrer(req, status, ex);
            },  
            timeout:60000  
        });
      });
  };  
   
  self.put= function(params, callback, error) {
      var thisRequest = requestNUM;
      checkNetWork(thisRequest,function(){
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
            alertErrer(req, status, ex);
          },  
          timeout:60000  
        });  
      });
  };  
   
  self.get = function(id, params, callback, error) {
      var thisRequest = requestNUM;
      checkNetWork(thisRequest,function(){
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
              alertErrer(req, status, ex);
            }, 
            timeout:60000
        });
      });
  };
   
  self.query = function(params, callback, error) {
      var thisRequest = requestNUM;
      checkNetWork(thisRequest,function(){
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
              alertErrer(req, status, ex);
            }, 
            timeout:60000
        });  
      });
  };  
   
  // self.del = function(id, callback, error) {
  //     var thisRequest = requestNUM;
  //     checkNetWork(thisRequest,function(){
  //       params.client_token = client_token;
  //       params.client_account = client_account;
  //       $.ajax({
  //           type: 'DELETE',  
  //           url: self.myurl + '/' + id,  
  //           dataType: 'json',
  //           contentType: 'application/json',  
  //           success: function(res){
  //             if(res.tokenCheck == false){
  //               if(thisRequest==1){
  //                 backToLogin(res);
  //               }
  //             }else{
  //               requestNUM = 0;
  //               callback(res);
  //             }
  //           },  
  //           error: error ? error : function(req, status, ex) {
  //             alertErrer(req, status, ex);
  //           }, 
  //           timeout:60000  
  //       });  
  //     });
  // };

  return self;
}

