!function ($) {

  "use strict"; // jshint ;_;
  $(document).on("click",function(e){
     var oEvent = e || event;
     var tagetTable = $(oEvent.target).parents("table");
     var tagerCardBox=$(oEvent.target).parents(".fix-bfc");
      if(tagetTable)
       { 
          var tR = $(oEvent.target).parent("tr");
          tagetTable.find(".beclick").removeClass("beclick");
          tR.addClass("beclick");
          e.stopPropagation();
       };
      if(tagerCardBox)
       { 
          var cB = $(oEvent.target).hasClass('fix-card')?$(oEvent.target):$(oEvent.target).parents(".fix-card");
          tagerCardBox.find(".beclick-card").removeClass("beclick-card");
          cB.addClass("beclick-card");
          e.stopPropagation();
       };

  });
}(window.jQuery);

function tableOddEvenClass(){
  var TableObj = $("table");
  TableObj.each(function(n,v){
    $(v).find("tr").each(function(n,v){
      if(n%2 == 1)
        $(v).addClass("oddtrforie")
    })
  })
}