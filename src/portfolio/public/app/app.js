var { Link, RouteHandler } = require('react-router');
var RouteCover = require('./components/RouteCover.js');

var React = require('react');
var PropTypes = React.PropTypes;

// -------------------- components ---------
var Navtoggle = require('./components/Navtoggle.js');

var App = React.createClass({
  // propTypes: {
  //   params: PropTypes.object.isRequired,
  //   query: PropTypes.object.isRequired
  // },
  componentDidMount: function(){

  },
  render: function() {
  	var navSvg = '<svg data-points-hover="114.9,800.5 20,800.5 114.9,0 114.9,0 " id="nav-svg" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 115.9 800" style="enable-background:new 0 0 115.9 800;" xml:space="preserve"> \
  	</svg>';

    return (
    	<div id="gf-app">
	    	<div id="gf-main">
	    		<RouteHandler {...this.props}/>
	    	</div>
	    	<RouteCover />
	    	<div id="gf-logo">
	    		<img src="img/d5logo.svg" alt="第五维度工作室"/>
	    	</div>
	    	<nav id="gf-nav">
	    		<ul id="gf-nav-main-link">
	    			<li><Link to="intro">Intro</Link></li>
	    			<li><Link to="projects">Projects</Link></li>
	    			<li><Link to="portfolio">Portfolio</Link></li>
	    			<li><Link to="about">About</Link></li>
	    			<li><a href="http://eisneim.github.io/" target="_blank">Blog</a></li>
	    			<li><Link to="contact">Contact</Link></li>
	    		</ul>
	    		<div id="gf-nav-bottom">
	    			<ul id="gf-nav-social-link">
	    				<li><a href="http://github.com/eisneim" target="_blank">Github</a></li>
	    				<li><a href="http://weibo.com/eineim" target="_blank">Weibo</a></li>
	    				<li><a href="http://www.zhihu.com/people/eisneim" target="_blank">知乎</a></li>
	    			</ul>
	    			<p>Designed with <span style={{color:"#F0696C"}}>❤</span> by <a href="http://glexe.com">Eisneim</a>, this site is opensourced on <a href="https://github.com/eisneim/gortfolio" target="_blank">github</a></p>
	    		</div>
	    		<div id="nav-svg-wrap" dangerouslySetInnerHTML={{__html: navSvg }}></div>
	    	</nav>
	    	<Navtoggle />
        </div>
    );
  }

});

// ---------- register hash change event to do some transation;
// window.addEventListener("hashchange", onHashChange);
// function onHashChange(e){
// 	/*
// 		newURl, oldURL,
// 	 */ 
	
// }





module.exports = App;