function RestServiceJs(newurl) {
  var self = {};
  self.myurl = newurl;  
   
  self.post = function(model, callback) {  
      $.ajax({  
          type: 'POST',  
          url: self.myurl,  
          data: JSON.stringify(model),  
          dataType: 'text',  
          processData: false,  
          contentType: 'application/json',  
          success: callback,  
          error: function(req, status, ex) {
            if(req.responseText){
              alert(JSON.parse(req.responseText).exception);
            }else{
              alert('錯誤！');
            }
          },  
          timeout:60000  
      });  
  };  
   
  self.put= function(model, callback) {  
      $.ajax({  
          type: 'PUT',  
          url: self.myurl,  
          data: JSON.stringify(model), 
          dataType: 'text',  
          processData: false,  
          contentType: 'application/json',  
          success: callback,  
          error: function(req, status, ex) {
            if(req.responseText){
              alert(JSON.parse(req.responseText).exception);
            }else{
              alert('錯誤！');
            }
          },  
          timeout:60000  
      });  
  };  
   
  self.get = function(id, callback) {  
      $.ajax({  
          type: 'GET',  
          url: self.myurl + '/' + id,  
          contentType: 'application/json',  
          success: callback,  
          error: function(req, status, ex) {
            if(req.responseText){
              alert(JSON.parse(req.responseText).exception);
            }else{
              alert('錯誤！');
            }
          }, 
          timeout:60000  
      });  
  };  
   
  self.query = function(callback) {
      
      $.ajax({  
          type: 'GET',  
          url: self.myurl,  
          contentType: 'application/json',  
          success: callback,  
          error: function(req, status, ex) {
            if(req.responseText){
              alert(JSON.parse(req.responseText).exception);
            }else{
              alert('錯誤！');
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
              alert(JSON.parse(req.responseText).exception);
            }else{
              alert('錯誤！');
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
              alert(JSON.parse(req.responseText).exception);
            }else{
              alert('錯誤！');
            }
          }, 
          timeout:60000  
      });  
  }

  return self;
}