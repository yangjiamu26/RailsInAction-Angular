/**
 * calendarDemoApp - 0.1.3
 */

app.controller('FullcalendarCtrl', ['$scope', '$http', function($scope, $http) {

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    /* event source that contains custom events on the scope */
    // $scope.events = [
    //   {title:'All Day Event', start: new Date(y, m, 1), className: ['b-l b-2x b-info'], location:'New York', info:'This a all day event that will start from 9:00 am to 9:00 pm, have fun!'},
    //   {title:'Dance class', start: new Date(y, m, 3), end: new Date(y, m, 4, 9, 30), allDay: false, className: ['b-l b-2x b-danger'], location:'London', info:'Two days dance training class.'},
    //   {title:'Game racing', start: new Date(y, m, 6, 16, 0), className: ['b-l b-2x b-info'], location:'Hongkong', info:'The most big racing of this year.'},
    //   {title:'Soccer', start: new Date(y, m, 8, 15, 0), className: ['b-l b-2x b-info'], location:'Rio', info:'Do not forget to watch.'},
    //   {title:'Family', start: new Date(y, m, 9, 19, 30), end: new Date(y, m, 9, 20, 30), className: ['b-l b-2x b-success'], info:'Family party'},
    //   {title:'Long Event', start: new Date(y, m, d - 5), end: new Date(y, m, d - 2), className: ['bg-success bg'], location:'HD City', info:'It is a long long event'},
    //   {title:'Play game', start: new Date(y, m, d - 1, 16, 0), className: ['b-l b-2x b-info'], location:'Tokyo', info:'Tokyo Game Racing'},
    //   {title:'Birthday Party', start: new Date(y, m, d + 1, 19, 0), end: new Date(y, m, d + 1, 22, 30), allDay: false, className: ['b-l b-2x b-primary'], location:'New York', info:'Party all day'},
    //   {title:'Repeating Event', start: new Date(y, m, d + 4, 16, 0), alDay: false, className: ['b-l b-2x b-warning'], location:'Home Town', info:'Repeat every day'},      
    //   {title:'Click for Google', start: new Date(y, m, 28), end: new Date(y, m, 29), url: 'http://google.com/', className: ['b-l b-2x b-primary']},
    //   {title:'Feed cat', start: new Date(y, m+1, 6, 18, 0), className: ['b-l b-2x b-info']}
    // ];
    $scope.events = [];
    $scope.eventSources = [$scope.events];

    $scope.get_events = function(){
      $http.get("http://localhost:3000/fullcalendar_engine/events/get_events?start=1463846400&end=1464451200&_=1464153552265").success(function(data){
        for(var i=0; i<data.length; i++){
          $scope.events.push(data[i]);
        }
      })
    }
    $scope.get_events();

    /* alert on dayClick */
    $scope.precision = 400;
    $scope.lastClickTime = 0;
    $scope.alertOnEventClick = function( date, jsEvent, view ){
      var time = new Date().getTime();
      if(time - $scope.lastClickTime <= $scope.precision){
          $scope.events.push({
            title: 'New Event',
            start: date,
            className: ['b-l b-2x b-info']
          });
      }
      $scope.lastClickTime = time;
    };
    /* alert on Drop */
    $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
       $scope.alertMessage = ('Event Droped to make dayDelta ' + delta);
    };
    /* alert on Resize */
    $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view){
       $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
    };

    $scope.overlay = $('.fc-overlay');
    $scope.alertOnMouseOver = function( event, jsEvent, view ){
      $scope.event = event;
      $scope.overlay.removeClass('left right top').find('.arrow').removeClass('left right top pull-up');
      var wrap = $(jsEvent.target).closest('.fc-event');
      var cal = wrap.closest('.calendar');
      var left = wrap.offset().left - cal.offset().left;
      var right = cal.width() - (wrap.offset().left - cal.offset().left + wrap.width());
      var top = cal.height() - (wrap.offset().top - cal.offset().top + wrap.height());
      if( right > $scope.overlay.width() ) { 
        $scope.overlay.addClass('left').find('.arrow').addClass('left pull-up')
      }else if ( left > $scope.overlay.width() ) {
        $scope.overlay.addClass('right').find('.arrow').addClass('right pull-up');
      }else{
        $scope.overlay.find('.arrow').addClass('top');
      }
      if( top < $scope.overlay.height() ) { 
        $scope.overlay.addClass('top').find('.arrow').removeClass('pull-up').addClass('pull-down')
      }
      (wrap.find('.fc-overlay').length == 0) && wrap.append( $scope.overlay );
    }

    /* config object */
    $scope.uiConfig = {
      calendar:{
        height: 450,
        editable: true,
        header:{
          left: 'prev',
          center: 'title',
          right: 'next'
        },
        firstDay: 0,
        dayClick: $scope.alertOnEventClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
        eventMouseover: $scope.alertOnMouseOver
      }
    };
    
    /* add custom event*/
    $scope.addEvent = function() {
      var start = new Date();
      var end = new Date(start.getTime()+15*60*1000);

      var event = {
        title: 'New Event',
        description: 'New Event Description',
        starttime: start,
        start: start,
        endtime: end,
        end: end,
        all_day: 0,
        period: 'Does not repeat',
        frequency: 1
      };
      $http.post("http://localhost:3000/fullcalendar_engine/events", {
        event: event
      }).then(function(){
        $scope.get_events();
      });
    };

    /* remove event */
    $scope.remove = function(index) {
      $scope.events.splice(index,1);
    };

    /* Change View */
    $scope.changeView = function(view, calendar) {
      $('.calendar').fullCalendar('changeView', view);
    };

    $scope.today = function(calendar) {
      $('.calendar').fullCalendar('today');
    };
    
}]);
/* EOF */