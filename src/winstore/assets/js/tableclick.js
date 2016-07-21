!function ($) {

  "use strict"; // jshint ;_;
  $(document).on("click",function(e){
     var oEvent = e || event;
     var tagetTable = $(oEvent.target).parents("table");
     var tagerCardBox=$(oEvent.target).parents(".fix-bfc");
     var tagerCardBox2=$(oEvent.target).parents(".fix-bfc2");
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
      if(tagerCardBox2)
       { 
          var cB2 = $(oEvent.target).hasClass('fix-card2')?$(oEvent.target):$(oEvent.target).parents(".fix-card2");
          tagerCardBox2.find(".beclick-card2").removeClass("beclick-card2");
          cB2.addClass("beclick-card2");
          e.stopPropagation();
       };

  });
}(window.jQuery);