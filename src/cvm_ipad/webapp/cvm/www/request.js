
function RestServiceJs(newurl) {
  var url = newurl;
  if(newurl&&newurl.indexOf('demoapi')>-1) url = url+'.json';
  var self = {};
  self.myurl = url;  
   
  self.post = function(model, callback) {  
      $.ajax({  
          type: 'POST',  
          url: self.myurl,  
          data: JSON.stringify(model),
          processData: false,  
          contentType: 'application/json',
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
  };  
   
  self.put= function(params, callback) {  
      $.ajax({  
          type: 'PUT',  
          url: self.myurl,  
          data: JSON.stringify(params), 
          processData: false,  
          contentType: 'application/json',  
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
  };  
   
  self.get = function(id, params, callback) {
      $.ajax({  
          type: 'GET',  
          url: self.myurl + '/' + id,
          data: params, 
          contentType: 'application/json',  
          success: callback,  
          error: function(req, status, ex) {
            console.log(req.responseText)
            if(req.responseText){
              myApp.alert(JSON.parse(req.responseText).exception);
            }else{
              myApp.alert('错误！');
            }
          }, 
          timeout:60000  
      });  
  };
   
  self.query = function(params, callback) {
      $.ajax({  
          type: 'GET',  
          url: self.myurl,
          data: params, 
          contentType: 'application/json',  
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
  };  
   
  self.del = function(id, callback) {  
      $.ajax({  
          type: 'DELETE',  
          url: self.myurl + '/' + id,  
          contentType: 'application/json',  
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