/*
                            ___      _  _       
                     _     / __)    | |(_)      
  ____  ___   ____ _| |_ _| |__ ___ | | _  ___  
 / _  |/ _ \ / ___|_   _|_   __) _ \| || |/ _ \ 
( (_| | |_| | |     | |_  | | | |_| | || | |_| |
 \___ |\___/|_|      \__) |_|  \___/ \_)_|\___/ 
(_____|                                         

================================================
author: eisneim 

 */


'use strict';
var React = require('react');
var Router = require('react-router');
var routes = require('./routes.js');

var navActions = require('./actions/navActions.js');
var routeCoverActions = require('./actions/routeCoverActions.js');
var request = require('superagent');

/**
 *  first run don't have anything rendered on page, so it is special,
 *  we can do some initial load animation
 */
var isFirstRun = true;

/**
 * !!! bad hacky way here!!!, backend is not done  yet ,so i'll just put some shared data here
 */
var sharedData = {};
/**
 * some routes have mananl leaving animation, below are some top level routes
 * that need auto add leaving anition;
 */
var leaveAnimRoutes = ['intro','about','ideas','contact'];
/**
 * some of the routes need to preload a lot of stuff 
 * so we need to proveide longer route transition animation;
 */
var longLoad = ['projects','portfolio'];
var noLoadFromThose = ['portfolioItem','project'];

var loadUrl = {
  projects: 'data/projects.json',
  portfolio: 'data/portfolio.json',
  project: 'data/projects.json',
  portfolioItem: 'data/portfolio.json',
}

var previousRoute;
/**
 * we have route transtion animation on long load routes,
 * for those routes: 
 *   when route change start ,start a timer that have the shortest lenght to finish animation
 *   shouldRouteTransionDone == true only when both animtion and xhr request both finished
 */
var xhrLoadDone,routeAnimationDone;

Router.run(routes,function(Handler,state) {
  var routeName = state.routes[ state.routes.length-1 ].name ;
  
	/**
	* 每当路由改变，这里都会运行一次，可以在这里检查那些需要载入动画，以及关闭侧栏；
	*/
 	navActions.toggle('close');

 	if( longLoad.indexOf( routeName ) > -1 && noLoadFromThose.indexOf(previousRoute) == -1 ){
    var preloadedData;

 		routeCoverActions.start();
    // set a minimal length to make sure animation is done;
    setTimeout( function(){
      routeAnimationDone = true;
      renderLongLoadRoute(Handler,state,preloadedData);
    }, isFirstRun?0:900)

 		longLoadInterceptor( routeName, function(req,res){
      preloadedData = res.body;

      xhrLoadDone = true;
			renderLongLoadRoute(Handler,state,preloadedData);

 		});

 	}else if( leaveAnimRoutes.indexOf( routeName ) > -1 ){ 
    var $view = document.querySelector('.gf-view');
 		if($view) $view.classList.add('fade-out');
 		setTimeout(function(){
 			React.render(<Handler {...state} sharedData={sharedData}/>, document.body );
 		},300);
  }else if( loadUrl[routeName] ){ 
    request.get( loadUrl[routeName] ).end(function(req,res){
      React.render(<Handler {...state} preload={res.body} sharedData={sharedData}/>, document.body );
    });
 	}else{

 		React.render(<Handler {...state} sharedData={sharedData}/>, document.body );
 	}
  /**
   * record previus route so we can have more controll;
   */
  previousRoute = routeName;
  if(isFirstRun) isFirstRun = false;
});

function longLoadInterceptor(routeName , callback){
  var url = loadUrl[routeName];
  if(url){
    request.get(url).end(callback)
  }else{
    setTimeout(callback,800);
  }
}

function renderLongLoadRoute(Handler,state, preloadedData){
  if( xhrLoadDone && routeAnimationDone) {
    React.render(<Handler {...state} preload={preloadedData } sharedData={sharedData}/>, document.body );
    // hide animation;
    routeCoverActions.finish();
    // for next route cahgne
    xhrLoadDone = false;
    routeAnimationDone = false;
  }
}