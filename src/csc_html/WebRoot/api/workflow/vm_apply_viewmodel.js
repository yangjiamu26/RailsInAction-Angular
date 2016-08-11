function ViewModel(){
  	      var self = this;
  	      this.currentVO = ko.validatedObservable({
  	        id: ko.observable(),
  	        instanceName: ko.observable(""),
  	        vdcId: ko.observable(""),
  	        vdcName:ko.observable(""),
  	        azName:ko.observable(""),
  	        vpcName:ko.observable(""),
  	        partition: ko.observable(),
  	        osType: ko.observable(""),
  	        osVersion: ko.observable(""),
  	        osVersionName: ko.observable(""),
  	        vcpu: ko.observable(""),
  	        memory: ko.observable(""),
  	        storage: ko.observable(""),
  	        ipPool: ko.observable(""),
  	        network: ko.observable(""),
  	        networkName: ko.observable(""),
  	        assignIp: ko.observable(""),
  	        account: ko.observable(""),
  	        password: ko.observable(""),
  	        repeatPassword: ko.observable(""),
  	        isBind: ko.observable(""),
  	        sshKey: ko.observable(""),
  	        expireType:ko.observable(""),
  	        expireValue:ko.observable(""),
  	        expireText:ko.observable(""),
  	        busSysUuid:ko.observable(""),
 	          //分区
             partitions: ko.observableArray([]),
             //硬盘
             mountDisks : ko.observableArray([]),
             applyVmList:ko.observableArray([]),
             
             softwares : ko.observableArray([]),
             vdcList:ko.observableArray([]),
             azList:ko.observableArray([]),
             osTypeList:ko.observableArray([]),
             osVersionList:ko.observableArray([]),
             cpuList:ko.observableArray([]),
             memoryList:ko.observableArray([]),
             vpcList:ko.observableArray([]),
             privateNetworkList:ko.observableArray([]),
             bussyList:ko.observableArray([]),
             sshList:ko.observableArray([]),
             billRuleList:ko.observableArray([])
  	      });
  	      
  	      
  	      
  	      function VmVo(){
  	    	  this.instanceName = ko.observable();
  	    	  this.vdcName = ko.observable();
  	    	  this.vpcName = ko.observable();
  	    	  this.azName = ko.observable();
  	    	  this.osVersionName = ko.observable();
  	    	  this.vcpu = ko.observable();
  	    	  this.memory = ko.observable();
  	    	  this.storage = ko.observable();
  	    	  this.networkName = ko.observable();
  	    	  this.ip = ko.observable();  
  	      }
  		  
  	      function MountDiskVO(){
                this.name = ko.observable();
                this.vdcName = ko.observable();
                this.azName = ko.observable();
                this.vmName = ko.observable();
                this.size = ko.observable();
                this.type = ko.observable();
                this.serviceUuid = ko.observable();
                this.serviceName = ko.observable();
                this.billRuleUuid = ko.observable();
                this.billRuleText = ko.observable();
                this.applyType = ko.observable();
                this.applyNum = ko.observable();
                this.applyTime = ko.observable();
                this.applyText = ko.observable();
                this.billRuleList=ko.observableArray([]);
                this.price = ko.observable();
          }
  	      
  	      function setArrayCharge(attr){
    	    	var arrayCharge = [];
    	    	if(attr !=null){
    	    		for(var i=0;i<attr.length;i++){
        	    		if(attr[i]=="DAY"){
        	    			arrayCharge.push({name:"按天",value:"DAY"});
        	    		}else if(attr[i]=="MONTH"){
        	    			arrayCharge.push({name:"按月",value:"MONTH"});
        	    		}else if(attr[i]=="QUARTER"){
        	    			arrayCharge.push({name:"按季度",value:"QUARTER"});
        	    		}else{
        	    			arrayCharge.push({name:"按年",value:"YEAR"});
        	    		}
        	    	}
    	    	}
    	    	return arrayCharge;
    	    }
  		  
  		  var  inParamData = {"resourceType":"VM","orderItems":[
  		                                                        {"instanceName":"d01","serviceUuid":"6d1dd0c2-7fcd-4e11-8f44-9a2e9cae58c0","isBill":"false","expireType":"2","expireValue":"3","billcycle":"DAY","fee":"1110元/天","metaData":"{\"resBaseInfo\":{\"volumeSize\":\"10\"}}","resourceType":"DISK","relateUuid":"99924abf-4b9e-4815-8c6c-d182061a3e07"},
  		                                                        {"instanceName":"d02","serviceUuid":"ea312741-014f-4080-af58-6d0eb1c45cfc","isBill":"false","expireType":"2","expireValue":"3","billcycle":"MONTH","fee":"2000元/月","metaData":"{\"resBaseInfo\":{\"volumeSize\":\"20\"}}","resourceType":"DISK","relateUuid":"99924abf-4b9e-4815-8c6c-d182061a3e07"},
  		                                                        {"instanceName":"xxx","serviceUuid":"8507c5d1-76c7-4e08-8a57-55e6b0375bc2","isBill":"false","expireType":"3","expireValue":"2016-08-09","billcycle":"DAY","fee":"52元/天","metaData":"{\"resBaseInfo\":{\"azUuid\":\"000eb1c8-ac92-4b39-96cc-b2dc19f2c4b7\",\"osType\":\"linux\",\"osVersion\":\"8c0b816e-3448-473a-854f-0c13315e0719\",\"memory\":\"8\",\"name\":\"xxx\",\"storage\":\"10\",\"vcpu\":\"8\",\"vdcUuid\":\"3b8a7d11-02e3-4e44-bb71-1e7f2fb36ecf\",\"vpcUuid\":\"d50125e6-9d32-4e02-941c-fbbf4688ee0f\",\"partitionList\":[{}],\"networkList\":[{\"networkId\":\"437f6417-0483-4418-b0f1-62d4c6ef4d3d\"}],\"ip\":\"10.10.10.10\",\"account\":\"a\",\"password\":\"b\",\"repeatPassword\":\"b\",\"sshIsMount\":\"NO\",\"busSysUuid\":\"ed81da58-e30d-4395-b089-857cf1890a44\"}}","desc":"tset","azUuid":"000eb1c8-ac92-4b39-96cc-b2dc19f2c4b7","resourceType":"VM","relateUuid":"99924abf-4b9e-4815-8c6c-d182061a3e07"}]}

  		  var vmOrderItems = [];
  		  var diskOrderItems= [];
  		  for(var i=0;i<inParamData.orderItems.length;i++){
  			  var orderItem = inParamData.orderItems[i];
  			  if(orderItem.resourceType == "VM"){
  				  vmOrderItems.push(orderItem);
  			  }else if(orderItem.resourceType == "DISK"){
  				  diskOrderItems.push(orderItem);
  			  }
  		  }
  		 
  		    var vmOrderItemVO = vmOrderItems[0];
  		    var serviceUuid=vmOrderItemVO.serviceUuid;
  		    var metaData = JSON.parse(vmOrderItemVO.metaData);
  		    var vmInParamData = metaData.resBaseInfo;
            var vdcUuid=vmInParamData.vdcUuid;
            var azUuid=vmInParamData.azUuid;
            var vpcUuid=vmInParamData.vpcUuid;
            var osType=vmInParamData.osType;
            var osVersionUuid = vmInParamData.osVersion;
            var networks = vmInParamData.networkList;
            var selelctNetworkUuid = networks[0]?networks[0].networkId:"";
            console.log("vmOrderItemVOvmOrderItemVOvmOrderItemVOvmOrderItemVOvmOrderItemVO",vmOrderItemVO)
            var callbackParam = {};
            callbackParam.vmOrderItemVO = vmOrderItemVO;
            callbackParam.self = self;
            var uri="serviceUuid="+serviceUuid+"&vdcUuid="+vdcUuid+"&azUuid="+azUuid+"&vpcUuid="+vpcUuid+"&osType="+osType;
            csc.rest.get("api/v5.0.0/cart/getCartSelectList?"+uri, function(result,textStatus,callbackCustParam){
               csc.rest.get("api/v5.0.0/bussys?vdcuuid="+vdcUuid,function(result2,textStatus,callbackCustParam){
                   csc.rest.get("api/v5.0.0/sshKeys?getList=true&azUuid="+azUuid+"&vcdUuid="+vdcUuid+"&userUuid=",function(result3,textStatus,callbackCustParam){
                  	 
                	 var vmOrderItemVO = callbackParam.vmOrderItemVO;
                	 var self = callbackParam.self;
                	 console.log("********************###################")
                  	 console.log(result)
                  	 console.log(result2)
                  	 console.log(result3)
                  	 console.log("********************###################")
                  	  
                      self.currentVO().sshList(result3.results);
                      self.currentVO().bussyList(result2.results); 
                      var vdcList = result.vdcList;
                      for(var i=0;i<vdcList.length;i++){
                    	  var vdcVO = vdcList[i];
                    	  if(vdcUuid == vdcVO.uuid){
                    		  vmOrderItemVO.vdcName = vdcVO.name;
                    		  break;
                    	  }
                      }
                      self.currentVO().vdcList(vdcList);
                    
                      var vpcList = result.vpcList;
                      for(var i=0;i<vpcList.length;i++){
                    	  var vpcVO = vpcList[i];
                    	  if(vpcUuid == vpcVO.uuid){
                    		  vmOrderItemVO.vpcName = vpcVO.name;
                    		  break;
                    	  }
                      }
                      self.currentVO().vpcList(vpcList);
                      
                      
                      var networkList = result.networkList;
                      for(var i=0;i<networkList.length;i++){
                    	  var networkVO = networkList[i];
                    	  if(selelctNetworkUuid == networkVO.uuid){
                    		  vmOrderItemVO.networkName = networkVO.name;
                    		  break;
                    	  }
                      }
                      self.currentVO().privateNetworkList(networkList);
                      
                      
                      var azList = result.azList;
                      for(var i=0;i<azList.length;i++){
                    	  var azVO = azList[i];
                    	  if(azUuid == azVO.uuid){
                    		  vmOrderItemVO.azName = azVO.name;
                    		  break;
                    	  }
                      }
                      self.currentVO().azList(azList);
                      self.currentVO().osTypeList(result.osTypeList);
                      self.currentVO().cpuList(result.cpuList);
                      self.currentVO().memoryList(result.memoryList);
                      
                      var osVersionList = result.osVersionList;
                      for(var i=0;i<osVersionList.length;i++){
                    	  var osVersionVO = osVersionList[i];
                    	  if(osVersionUuid == osVersionVO.uuid){
                    		  vmOrderItemVO.osVersionName = osVersionVO.opSysVersion;
                    		  break;
                    	  }
                      }
                      self.currentVO().osVersionList(result.osVersionList);
                      self.currentVO.fromJSON(vmInParamData);
                      self.currentVO.fromJSON({
                      	instanceName:vmOrderItemVO.instanceName,
                      	expireType:vmOrderItemVO.expireType,
                      	expireValue:vmOrderItemVO.expireValue
                      });
                      
                      
                    
                    
                     vmOrderItems.forEach(function(e){
                    	      console.log("vmOrderItems",e)
                    	      var metaDataJson = JSON.parse(e.metaData);
                              var vmInfoData = metaDataJson.resBaseInfo;
                              var vmVo =new VmVo();
                              vmVo.instanceName(e.instanceName);
                              vmVo.vdcName(e.vdcName);
	                          vmVo.vpcName(e.vpcName);
	                          vmVo.azName(e.azName);
	                          vmVo.osVersionName(e.osVersionName);
	                          vmVo.vcpu(vmInfoData.vcpu);
	                          vmVo.memory(vmInfoData.memory);
	                          vmVo.storage(vmInfoData.storage);
	                          vmVo.networkName(e.networkName);
	                          vmVo.ip(vmInfoData.ip);
	                          self.currentVO().applyVmList.push(vmVo);
                      });
                      
                     
                     for(var i =0;i<diskOrderItems.length;i++){
                    	  var diskOrderItemVO = diskOrderItems[i];
                    	  var selectVmOrderItemVO = null;
	                   	  for(var j =0;j<vmOrderItems.length;j++){
	                   		  var vmOrderItemVO = vmOrderItems[j];
	                   		  if(diskOrderItemVO.relateUuid && vmOrderItemVO.relateUuid == diskOrderItemVO.relateUuid){
	                   			 selectVmOrderItemVO = vmOrderItemVO;
	                   			  break;
	                   		  }
	                   	  }
	                   	  
	                   	if(selectVmOrderItemVO){
	                   		diskOrderItemVO.vdcName = selectVmOrderItemVO.vdcName;
	                   		diskOrderItemVO.azName = selectVmOrderItemVO.azName;
	                   		diskOrderItemVO.vmName = selectVmOrderItemVO.instanceName;
	                   	} 
	                   	  
	                  
                      	csc.rest.get("api/v5.0.0/service/getServiceInfo/"+diskOrderItemVO.serviceUuid, function(serviceVO,textStatus,callbackCustParam){
                      		 csc.rest.get("api/v5.0.0/cart/getCartSelectList?serviceUuid="+diskOrderItemVO.serviceUuid, function(res,textStatus,callbackCustParam){
                      			  var diskOrderItemVO = callbackCustParam;
                      		 	  var metaDataJson = JSON.parse(diskOrderItemVO.metaData);
                                  var diskData = metaDataJson.resBaseInfo;
                               	  var vo=new MountDiskVO();
                               	   vo.vdcName(diskOrderItemVO.vdcName);
                               	   vo.azName(diskOrderItemVO.azName);
                               	   vo.vmName(diskOrderItemVO.vmName);
                               	   vo.name(diskOrderItemVO.instanceName);
                                   vo.size(diskData.volumeSize);
                                   vo.serviceUuid(diskOrderItemVO.serviceUuid);
                                   vo.serviceName(serviceVO.name);
                                   vo.billRuleUuid(diskOrderItemVO.billcycle);
                                   console.log("=====",diskOrderItemVO.billcycle,res.chargeList)
                                    var billTxt = "";
                                    if(diskOrderItemVO.billcycle=="DAY"){
                                    	billTxt = "按天"
	                   	    		}else if(diskOrderItemVO.billcycle=="MONTH"){
	                   	    			billTxt = "按月"
	                   	    		}else if(diskOrderItemVO.billcycle=="QUARTER"){
	                   	    			billTxt = "按季度"
	                   	    		}else{
	                   	    			billTxt = "按年"
	                   	    		}
                                   vo.billRuleText(billTxt);
                                   vo.billRuleList(setArrayCharge(res.chargeList));
                                   vo.price(diskOrderItemVO.price);
                                   self.currentVO().mountDisks.push(vo);
                               },function(){},callbackCustParam);
                      	},function(){},diskOrderItemVO)
                     }
                     
                      
                      console.log(self.currentVO.toJSON())
                      
                      var v="";
                      if("1"==vmOrderItemVO.expireType){
                          v="永久";
                      }else if("2"==vmOrderItemVO.expireType){
                          v=vmOrderItemVO.expireValue+"个月";
                      }else if("3"==vmOrderItemVO.expireType){
                          v= "有效期至:"+vmOrderItemVO.expireValue.substr(0,10); 
                      }
                      self.currentVO().expireText(v);
                      self.currentVO().billRuleList(setArrayCharge(result.chargeList));
                     
                      console.log("currentVO",self.currentVO.toJSON())
                     
                   },function(){},callbackParam);                             
               },function(){},callbackParam);
           },function(){},callbackParam);
  	   }