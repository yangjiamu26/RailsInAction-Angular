
function RestServiceJs(newurl) {
  var url = newurl;
  if(newurl&&newurl.indexOf('demoapi')>-1) url = url+'.json';
  var self = {};
  self.myurl = url;  
   
  self.post = function(model, callback, error) {  
      $.ajax({  
          type: 'POST',  
          url: self.myurl,  
          data: JSON.stringify(model),
          processData: false,  
          dataType: 'json',
          contentType: 'application/json',
          success: callback,  
          error: error ? error : function(req, status, ex) {
            console.log(req);
            if(req){
              if(req.responseText){
                if(JSON.parse(req.responseText).exception == 'sys.rest.connect.error'){
                  myApp.alert('请检查CSC服务是否正常！');
                }else{
                  myApp.alert(JSON.parse(req.responseText).exception);
                }
              }else{
                myApp.alert('错误！');
              }
            }else{
              myApp.alert('请求超时！');
            }
          },  
          timeout:60000  
      });  
  };  
   
  self.put= function(params, callback, error) {  
      $.ajax({  
          type: 'PUT',  
          url: self.myurl,  
          data: JSON.stringify(params), 
          processData: false,  
          dataType: 'json',
          contentType: 'application/json',  
          success: callback,  
          error: error ? error : function(req, status, ex) {
            console.log(req);
            if(req){
              if(req.responseText){
                if(JSON.parse(req.responseText).exception == 'sys.rest.connect.error'){
                  myApp.alert('请检查CSC服务是否正常！');
                }else{
                  myApp.alert(JSON.parse(req.responseText).exception);
                }
              }else{
                myApp.alert('错误！');
              }
            }else{
              myApp.alert('请求超时！');
            }
          },  
          timeout:60000  
      });  
  };  
   
  self.get = function(id, params, callback, error) {
    var end = '';
      if(self.myurl.indexOf('demoapi')>-1){
        self.myurl = self.myurl.replace('.json','');
        end = '.json';
      }
      $.ajax({  
          type: 'GET',  
          url: self.myurl + '/' + id +end,
          data: params, 
          dataType: 'json',
          contentType: 'application/json',  
          success: callback,  
          error: error ? error : function(req, status, ex) {
            console.log(req);
            if(req){
              if(req.responseText){
                if(JSON.parse(req.responseText).exception == 'sys.rest.connect.error'){
                  myApp.alert('请检查CSC服务是否正常！');
                }else{
                  myApp.alert(JSON.parse(req.responseText).exception);
                }
              }else{
                myApp.alert('错误！');
              }
            }else{
              myApp.alert('请求超时！');
            }
          }, 
          timeout:60000  
      });  
  };
   
  self.query = function(params, callback, error) {
      $.ajax({  
          type: 'GET',  
          url: self.myurl,
          data: params, 
          dataType: 'json',
          contentType: 'application/json',  
          success: callback,  
          error: error ? error : function(req, status, ex) {
            console.log(req);
            if(req){
              if(req.responseText){
                if(JSON.parse(req.responseText).exception == 'sys.rest.connect.error'){
                  myApp.alert('请检查CSC服务是否正常！');
                }else{
                  myApp.alert(JSON.parse(req.responseText).exception);
                }
              }else{
                myApp.alert('错误！');
              }
            }else{
              myApp.alert('请求超时！');
            }
          }, 
          timeout:60000  
      });  
  };  
   
  self.del = function(id, callback, error) {  
      $.ajax({  
          type: 'DELETE',  
          url: self.myurl + '/' + id,  
          dataType: 'json',
          contentType: 'application/json',  
          success: callback,  
          error: error ? error : function(req, status, ex) {
            console.log(req);
            if(req){
              if(req.responseText){
                if(JSON.parse(req.responseText).exception == 'sys.rest.connect.error'){
                  myApp.alert('请检查CSC服务是否正常！');
                }else{
                  myApp.alert(JSON.parse(req.responseText).exception);
                }
              }else{
                myApp.alert('错误！');
              }
            }else{
              myApp.alert('请求超时！');
            }
          }, 
          timeout:60000  
      });  
  };  
   
  self.loadTmpl = function(turl, callback) {  
      $.ajax({  
          url: turl,  
          success: callback,  
          error: function(req, status, ex) {
            if(req.responseText){
              myApp.alert(JSON.parse(req.responseText).exception);
            }else{
              myApp.alert('错误！');
            }
          }, 
          timeout:60000  
      });  
  }

  return self;
}
