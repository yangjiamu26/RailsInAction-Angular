myApp.onPageInit("settings-profile", function(page) {
	function ViewModel(){
		var self = this;
		this.info = ko.observable({
			"name": "", 
			"account": "", 
			"roleName": "", 
			"email":"", 
			"telephone":""
		});
		this.loadInfo = function(){
			RestServiceJs(BASE_URL+"/user").get(USER_INFO.id,{},function(data){
				self.info(data);
			})
		}
	}
	var viewModel = new ViewModel();
	ko.applyBindings(viewModel, $$(page.container)[0]);
  	viewModel.loadInfo();

});