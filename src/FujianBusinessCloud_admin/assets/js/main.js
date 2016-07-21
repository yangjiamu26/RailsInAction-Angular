function showModal(url){
    $("#ajax-modal").html("").load(url).modal();
    return false;
}
function showModal2(url){
    $("#ajax-modal2").html("").load(url).modal();
    return false;
}
function showMainContent(url){
	$("#main_content").html("").load(url);
	return false;
}