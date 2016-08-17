
function RestServiceJs(newurl) {
<<<<<<< HEAD
  var self = {};
  self.myurl = newurl;  
=======
  var url = newurl;
  if(newurl&&newurl.indexOf('demoapi')>-1) url = url+'.json';
  var self = {};
  self.myurl = url;  
>>>>>>> 410cbf4f02d60d813dc036b1bd603eacd2f499a6
   
  self.post = function(model, callback) {  
      $.ajax({  
          type: 'POST',  
<<<<<<< HEAD
          url: self.myurl,
          data: JSON.stringify(model),
          processData: false,  
          contentType: 'application/json',
          success: callback,  
          error: function(req, status, ex) {
             alert("readyState: " + req.readyState + "\n" +
                "responseText: "+ req.responseText + "\n" +
                "status: " + req.status + "\n" +
                "text status: " + status + "\n" +
                "error: " + ex);
             
=======
          url: self.myurl,  
          data: JSON.stringify(model),
          processData: false,  
          dataType: 'json',
          contentType: 'application/json',
          success: callback,  
          error: function(req, status, ex) {
>>>>>>> 410cbf4f02d60d813dc036b1bd603eacd2f499a6
            if(req.responseText){
              myApp.alert(JSON.parse(req.responseText).exception);
            }else{
              myApp.alert('错误！');
            }
          },  
          timeout:60000  
<<<<<<< HEAD
      });
  };
=======
      });  
  };  
>>>>>>> 410cbf4f02d60d813dc036b1bd603eacd2f499a6
   
  self.put= function(params, callback) {  
      $.ajax({  
          type: 'PUT',  
          url: self.myurl,  
          data: JSON.stringify(params), 
          processData: false,  
<<<<<<< HEAD
=======
          dataType: 'json',
>>>>>>> 410cbf4f02d60d813dc036b1bd603eacd2f499a6
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
<<<<<<< HEAD
      $.ajax({  
          type: 'GET',  
          url: self.myurl + '/' + id,
          data: params, 
=======
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
>>>>>>> 410cbf4f02d60d813dc036b1bd603eacd2f499a6
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
<<<<<<< HEAD
=======
          dataType: 'json',
>>>>>>> 410cbf4f02d60d813dc036b1bd603eacd2f499a6
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
<<<<<<< HEAD
=======
          dataType: 'json',
>>>>>>> 410cbf4f02d60d813dc036b1bd603eacd2f499a6
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
<<<<<<< HEAD
}
=======
}
>>>>>>> 410cbf4f02d60d813dc036b1bd603eacd2f499a6
