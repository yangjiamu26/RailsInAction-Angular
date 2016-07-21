function showModal(url){
    $("#ajax_modal").html("").load(url).modal();
    return false;
}
function showModal_2(url){
	console.log($("#ajax_modal2").length)
    $("#ajax_modal2").html("").load(url).modal();
    return false;
}
function showMainContent(url){
	$("#main_content").html("").load(url);
	return false;
}
function showWizard(url) {
    $("#ajax-wizard").html('');//防止url指向页面不存在
    $("#ajax-wizard").load(url, '', function () {
        wizard.show();
    });
}