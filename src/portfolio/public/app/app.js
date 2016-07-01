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
	    		<img src="img/d5logo.jpg" alt="云宏信息"/>
	    	</div>
	    	<nav id="gf-nav">
	    		<ul id="gf-nav-main-link">
	    			<li><Link to="intro">我们的介绍</Link></li>
	    			<li><Link to="projects">我们的产品</Link></li>
	    			<li><Link to="portfolio">我们的画册</Link></li>
	    			<li><Link to="about">关于我们</Link></li>
	    			<li><a href="#" target="_blank">企业微信号</a></li>
	    			<li><Link to="contact">联系我们</Link></li>
	    		</ul>
	    		<div id="gf-nav-bottom">
	    			<ul id="gf-nav-social-link">
	    				<li><a href="#" target="_blank">CNWare</a></li>
	    				<li><a href="#" target="_blank">海泰大数据</a></li>
	    				<li><a href="http://www.zkuyun.com" target="_blank">知库</a></li>
	    			</ul>
	    			<p>由 <span style={{color:"#F0696C"}}>❤</span> <a href="#">研发中心团队</a>设计, 版权所有 <a href="#" target="_blank">Winhong</a></p>
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