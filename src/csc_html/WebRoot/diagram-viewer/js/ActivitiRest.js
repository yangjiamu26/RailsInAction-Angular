//增加三处 encodeURIComponent,避免IE不采用UTF-8编码，而采用平台默认编码，可能导致乱码。 Added by liupx,10/10/13 

function isIE() { //ie?  
 if (!!window.ActiveXObject || "ActiveXObject" in window)  
    return true;  
  else  
    return false;  
}

var ActivitiRest = {
	options: {},
	getProcessDefinitionByKey: function(processDefinitionKey, callback) {
		var processDefinitionKey_=  processDefinitionKey;
		if(isIE()) { processDefinitionKey_ = encodeURIComponent(processDefinitionKey); }
		var url = Lang.sub(this.options.processDefinitionByKeyUrl, {processDefinitionKey: processDefinitionKey_});
		
		$.ajax({
			url: url,
			dataType: 'jsonp',
			jsonpCallback: 'activiti_jsonp',
			cache: false,
			async: true,
			success: function(data, textStatus) {
				var processDefinition = data;
				if (!processDefinition) {
					console.error("Process definition '" + processDefinitionKey + "' not found");
				} else {
				  callback.apply({processDefinitionId: processDefinition.id});
				}
			}
		}).done(function(data, textStatus) {
			console.log("ajax done");
		}).fail(function(jqXHR, textStatus, error){
			console.error('Get diagram layout['+processDefinitionKey+'] failure: ', textStatus, 'error: ', error, jqXHR);
		});
	},
	
	getProcessDefinition: function(processDefinitionId, callback) {
		var processDefinitionId_ = processDefinitionId;
		if(isIE()) { processDefinitionId_ = encodeURIComponent(processDefinitionId); }
		var url = Lang.sub(this.options.processDefinitionUrl, {processDefinitionId: processDefinitionId_});
		$.ajax({
			url: url,
			dataType: 'jsonp',
			jsonpCallback: 'activiti_jsonp',
			cache: false,
			async: true,
			success: function(data, textStatus) {
				var processDefinitionDiagramLayout = data;
				if (!processDefinitionDiagramLayout) {
					console.error("Process definition diagram layout '" + processDefinitionId + "' not found");
					return;
				} else {
					callback.apply({processDefinitionDiagramLayout: processDefinitionDiagramLayout});
				}
			}
		}).done(function(data, textStatus) {
			console.log("ajax done");
		}).fail(function(jqXHR, textStatus, error){
			console.log('Get diagram layout['+processDefinitionId+'] failure: ', textStatus, jqXHR);
		});
	},
	
	getHighLights: function(processInstanceId, callback) {
		var processInstanceId_ = processInstanceId;
		if(isIE()) { processInstanceId_ = encodeURIComponent(processInstanceId); }
		var url = Lang.sub(this.options.processInstanceHighLightsUrl, {processInstanceId: processInstanceId_});
		
		$.ajax({
			url: url,
			dataType: 'jsonp',
			jsonpCallback: 'activiti_jsonp',
			cache: false,
			async: true,
			success: function(data, textStatus) {
				console.log("ajax returned data");
				var highLights = data;
				if (!highLights) {
					console.log("highLights not found");
					return;
				} else {
					callback.apply({highLights: highLights});
				}
			}
		}).done(function(data, textStatus) {
			console.log("ajax done");
		}).fail(function(jqXHR, textStatus, error){
		  console.log('Get HighLights['+processInstanceId+'] failure: ', textStatus, jqXHR);
		});
	},
	getProcessTaskList : function(processInstanceId, callback) {
		var processInstanceId_ = processInstanceId;
		if(isIE()) { processInstanceId_ = encodeURIComponent(processInstanceId); }
		var url = Lang.sub(this.options.processTasksUrl, {processInstanceId: processInstanceId_});
		
		$.ajax({
			url: url,
			type: 'GET',
			dataType: 'json',
//			jsonpCallback: 'activiti_jsonp',
			cache: false,
			async: true,
			success: function(data, textStatus) {				
				console.log("ajax returned data");
				var processTasks = data.processList;
				if (!processTasks) {
					console.log("processTasks not found");
					return;
				} else {
					callback.apply({processTasks: processTasks});
				}
			}
		}).done(function(data, textStatus) {
			console.log("ajax done");
		}).fail(function(jqXHR, textStatus, error){
		  console.log('Get ProcessTasks['+processInstanceId+'] failure: ', textStatus, jqXHR);
		});
	}
};
