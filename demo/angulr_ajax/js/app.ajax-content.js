$(function(){
  //Load content via ajax
  function enableDemoAjax() {   
    if(!$.fn.ace_ajax) return;
 
    if(window.Pace) {
      window.paceOptions = {
        ajax: true,
        document: true,
        eventLag: false // disabled
        //elements: {selectors: ['.page-content-area']}
      }
    }
    var demo_ajax_options = {
       'close_active': true,
       
       'default_url': 'pages/dashboard',//default hash
       'content_url': function(hash) {
        //***NOTE***
        //this is for Ace demo only, you should change it to return a valid URL
        //please refer to documentation for more info
        //if( !hash.match(/^pages\//) ) return false;
        var path = document.location.pathname;
        //for example in Ace HTML demo version we convert /ajax/index.html#page/gallery to > /ajax/content/gallery.html and load it
        if(path.match(/(angulr_ajax\/)(index\.html)?/))
          return path.replace(/(angulr_ajax\/)(index\.html)?/, 'angulr_ajax/'+hash.replace(/^pages\//, '')+'.html') ;

        //for example in Ace PHP demo version we convert "ajax.php#page/dashboard" to "ajax.php?page=dashboard" and load it
        return path + "?" + hash.replace(/\//, "=");
        }       
    }
       
    //for IE9 and below we exclude PACE loader (using conditional IE comments)
    //for other browsers we use the following extra ajax loader options
    if(window.Pace) {
      demo_ajax_options['loading_overlay'] = 'body';//the opaque overlay is applied to 'body'
    }

    //initiate ajax loading on this element( which is .page-content-area[data-ajax-content=true] in Ace's demo)
    $('[data-ajax-content=true]').ace_ajax(demo_ajax_options)

    //if general error happens and ajax is working, let's stop loading icon & PACE
    $(window).on('error.ace_ajax', function() {
      $('[data-ajax-content=true]').each(function() {
        var $this = $(this);
        if( $this.ace_ajax('working') ) {
          if(window.Pace && Pace.running) Pace.stop();
          $this.ace_ajax('stopLoading', true);
        }
      })
    })
  }

  enableDemoAjax();
})  