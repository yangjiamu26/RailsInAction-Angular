myApp.onPageInit("settings-profile", function(page) {
	function ViewModel(){
		this.info = ko.observable({
			"name": "", 
			"account": "", 
			"role": "", 
			"email":"", 
			"telephone":""
		});
		this.loadInfo = function(){
			RestServiceJs(BASE_URL+"/user").query({},function(data){
				self.info(data);
			})
		}
	}
	var viewModel = new ViewModel();
	ko.applyBindings(viewModel, $$(page.container)[0]);
  	viewModel.loadInfo();

});