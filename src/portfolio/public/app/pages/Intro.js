 var React = require('react');
var Typer = require('../components/Typer.js');

var Intro = React.createClass({
	// componentDidMount:function(){
	// 	// let's insert our big backgournd video;

	// },
	render: function(){
		return (
			<section className="gf-view" id="gf-intro">
				<div className="gf-centered-wraper">
					<header className="gf-centered">
						<br/><br/><br/>
						<h1 className="ua-line-loadin">新三板挂牌</h1>
						<h2>自主研发</h2>
						<h3>第一品牌&nbsp;
							<Typer words={'CNWare 虚拟化||MS 监控||CSC 云服务||知库云盘||大数据||一体机'}/>
						</h3>
						<p>云宏信息科技股份有限公司</p>
						<a className="btn btn-ghost btn-lg" href="#/project"> 我们的产品 →</a>
					</header>
				</div>
				<div className="cover-mat"></div>
				<video id="video_background" autoPlay="true" preload="auto" loop="loop" muted="muted" volume="0">
					<source src="video/splash.webm" type="video/webm"/> 
					<source src="video/splash.mp4" type="video/mp4"/> 
					your browser is way too old!
				</video>
			</section>
		)
	}
});

module.exports = Intro;