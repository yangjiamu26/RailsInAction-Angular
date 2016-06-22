//弹出窗
function showModal(url,callBack){
	var modal = $("#ajax_modal_0");
	modal.html("").load(url,function(data){
		modal.modal('show');
		if(callBack) callBack();
	});
};
function showModalSec(url,callBack){
	var modal = $("#ajax_modal_1");
	modal.html("").load(url,function(data){
		modal.modal('show');
		if(callBack) callBack();
	});
};
function showModalThir(url,callBack){
	var modal = $("#ajax_modal_2");
	modal.html("").load(url,function(data){
		modal.modal('show');
		if(callBack) callBack();
	});
};
function systemMessage(){
	this.alert = function(msg,callBack){
		$("body").append('<div class="modal fade" id="systemMessageModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">'+
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
							        '<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>' +
							        '<button type="button" class="btn btn-primary" id="systemMessageModalOk" data-dismiss="modal">确定</button>' +
							      '</div>' +
							    '</div>' +
							'</div>' +
						'</div>');
		var modal = $("#systemMessageModal");
		modal.modal('show');
		modal.on("hidden.bs.modal",function(){
			modal.remove();
		})
		$("#systemMessageModalOk",modal).on("click",function(){
			if(callBack)
				callBack();
		});
		
	};
};
var systemMsg = new systemMessage();