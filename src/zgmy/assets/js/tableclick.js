!function ($) {

  "use strict"; // jshint ;_;
  $(document).on("click",function(e){
     var oEvent = e || event;
     var tagetTable = $(oEvent.target).parents("table");
     var tagerthBox=$(oEvent.target).parents(".fix-block");
      if(tagetTable)
       { 
          var tR = $(oEvent.target).parent("tr");
          tagetTable.find(".beclick").removeClass("beclick");
          tR.addClass("beclick");
          e.stopPropagation();
       };
      if(tagerthBox)
       { 
          var cB = $(oEvent.target).hasClass('item')?$(oEvent.target):$(oEvent.target).parents(".item");
          tagerthBox.find(".beclick-th").removeClass("beclick-th");
          cB.addClass("beclick-th");
          e.stopPropagation();
       };

  });
}(window.jQuery);