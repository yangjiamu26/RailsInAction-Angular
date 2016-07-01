var React = require('react');
var Router = require('react-router');
/*
<h1>this is about page</h1>
<p>{this.getPathname()}</p>
<p>this.getRoutes() : {this.getRoutes()}</p>
<p>this.getParams(): {this.getParams()}</p>
<p>this.getQuery(): {this.getQuery()}</p>
<div id="gf-about-text" dangerouslySetInnerHTML={{__html: content }}></div>
 */ 
var About = React.createClass({
	mixins: [ Router.State ],
	render: function(){
		return (
			<section className="gf-view" id="gf-about">
				<div id="gf-about-portrait"></div>

				<div id="gf-about-text">
					<h1>关于我们</h1>
					<h4 className="small-title">研究开发.</h4>
					<p>云宏信息科技股份有限公司奉行技术为本的发展路线，公司80%员工为技术开发人员，核心骨干人员曾任职于IBM、微软、Novell、Oracle、华为、腾讯、亚信联创等国际领先的高科技企业
					</p>
					<p>
						我们专注于云计算关键技术、架构、标准等方向，致力于为客户提供高可用、高安全的云计算产品及解决方案。自公司成立以来即持续投入，在云操作系统、云监控、云存储、大数据等深入研究，坚定地走国产自主的产品化道路，取得了多项创新成果，成功研发虚拟化平台CNware、云计算管理平台WinCloud、知库等产品。
					</p>
					<h4 className="small-title">xxxxxx.</h4>
					<p>同时，我们与科研机构、著名高校成立云计算联合实验室，加强研发创新，加速科研成果产业化；与国际领先的高科技企业及机构紧密合作，不断提升技术研发水平；与电信运营商、金融行业大客户建立了良好的关系，深入行业技术研究。
</p>

					<h4 className="small-title">xxxxx</h4>
					<p>
						云宏信息科技股份有限公司累计已获得120多项云计算关键技术相关的知识产权及专利，并获得诸多荣誉。
					</p>

					<a className="btn btn-ghost" href="#/contact">联系我们 →</a>

				</div>
			</section>
		)
	}
});

module.exports = About;