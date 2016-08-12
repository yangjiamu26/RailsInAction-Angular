
$.ajaxSetup({
	cache:false
})

function updateHashWhenModal(url){
	if(url.indexOf("?")>-1){
	  var args=new Object();         

      var query = url.split("?")[1];
      var pairs=query.split("&");//在逗号处断开 
      for(var i=0;i<pairs.length;i++) 
      { 
        var pos=pairs[i].indexOf('=');//查找name=value 
        if(pos==-1) continue;//如果没有找到就跳过 
        var argname=pairs[i].substring(0,pos);//提取name 
        var value=pairs[i].substring(pos+1);//提取value 
        args[argname]=unescape(value);//存为属性 
      }
      window.modal_args = args;
	}else{
	  window.modal_args = [];
	}
}

//弹出窗
function showModal(url,callBack){
	var modal = $("#ajax_modal_0");
	
	updateHashWhenModal(url);
	
	modal.html("").load(url,function(data){
		modal.modal({'show':true, backdrop:'static',keyboard:false});
		if(callBack) callBack();
	});
};
function hideModal(){
	$("#ajax_modal_0").modal('hide');
};
function showModalSec(url,callBack){
	var modal = $("#ajax_modal_1");
	
	updateHashWhenModal(url);

	modal.html("").load(url,function(data){
		modal.modal({'show':true, backdrop:'static',keyboard:false});
		if(callBack) callBack();
	});
};
function hideModalSec(){
	$("#ajax_modal_1").modal('hide');
};
function showModalThir(url,callBack){
	var modal = $("#ajax_modal_2");
	
	updateHashWhenModal(url);
	
	modal.html("").load(url,function(data){
		modal.modal({'show':true, backdrop:'static',keyboard:false});
		if(callBack) callBack();
	});
};
function hideModalThir(){
	$("#ajax_modal_2").modal('hide');
};

if ($(".modal-draggable").length > 0) {
	$(".modal-draggable").on("shown.bs.modal",function(){
		$(this).find('.modal-dialog').draggable({ handle:'.modal-header'});
	})
};
if ($(".modal").length > 0) {
	$(".modal").on("hidden.bs.modal",function(){
		$(this).html("");
	})
};


function systemMessage(){
	this.alert = function(msg){
		$("body").append('<div class="modal fade" id="systemMessageAlertModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">'+
  							'<div class="modal-dialog modal-sm" role="document">' +
							    '<div class="modal-content">' +
							      '<div class="modal-header">' +
							        '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
							        '<h4 class="modal-title" id="myModalLabel">系统信息</h4>' +
							      '</div>' +
							      '<div class="modal-body">' +
							        msg +
							      '</div>' +
							      '<div class="modal-footer">' +
							        '<button type="button" class="btn btn-primary" data-dismiss="modal">确定</button>' +
							      '</div>' +
							    '</div>' +
							'</div>' +
						'</div>');
		var modal = $("#systemMessageAlertModal");
		modal.modal('show');
		modal.on("hidden.bs.modal",function(){
			modal.remove();
		})
	};
	this.confirm = function(msg,callBack,callBack2){
		$("body").append('<div class="modal fade" id="systemMessageConfirmModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">'+
  							'<div class="modal-dialog modal-sm" role="document">' +
							    '<div class="modal-content">' +
							      '<div class="modal-header">' +
							        '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
							        '<h4 class="modal-title" id="myModalLabel">系统信息</h4>' +
							      '</div>' +
							      '<div class="modal-body">' +
							        msg +
							      '</div>' +
							      '<div class="modal-footer">' +
							        '<button type="button" class="btn btn-default" id="systemMessageModalCancle" data-dismiss="modal">取消</button>' +
							        '<button type="button" class="btn btn-primary" id="systemMessageModalOk" data-dismiss="modal">确定</button>' +
							      '</div>' +
							    '</div>' +
							'</div>' +
						'</div>');
		var modal = $("#systemMessageConfirmModal");
		modal.modal('show');
		modal.on("hidden.bs.modal",function(){
			modal.remove();
		})
		$("#systemMessageModalOk",modal).on("click",function(){
			if(callBack){
				setTimeout(function(){
					callBack();
				},1000);
			}	
		});
		$("#systemMessageModalCancle",modal).on("click",function(){
			if(callBack2){
				setTimeout(function(){
					callBack2();
				},1000);
			}	
		});
	};
};
var systemMsg = new systemMessage();
window.alert = systemMsg.alert;
window.confirm = systemMsg.confirm;


//无刷新页面修改url后面的参数,params是一个js对象
function changeUrlWithParam(params){
	if(!params) return;
	var newUrl = window.location.href.substring(0,thisUrl.lastIndexOf("?"));
	var paramsStr = [];
	for(para in params){
		paramsStr.push(para + "=" + params[para]);
	}
	window.history.replaceState(null,null,newUrl + "?" + paramsStr.join("&"));
}
