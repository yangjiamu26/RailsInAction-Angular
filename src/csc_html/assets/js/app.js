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