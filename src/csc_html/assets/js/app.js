//弹出窗
function showModal(url,callBack){
	var modal = $("#ajax_modal");
	modal.html("").load(url,function(data){
		modal.modal('show');
		if(callBack) callBack();
	});
};