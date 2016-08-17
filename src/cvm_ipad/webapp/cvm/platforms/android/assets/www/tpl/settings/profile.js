myApp.onPageInit("settings-profile", function(page) {
<<<<<<< HEAD
=======
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
>>>>>>> 410cbf4f02d60d813dc036b1bd603eacd2f499a6

});