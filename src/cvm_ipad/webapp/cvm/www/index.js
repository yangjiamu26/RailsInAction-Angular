var Storage = window.localStorage;
var CVM_PAD = {};

$.ajaxSetup({
  cache: false
})
PAGE_SIZE = 12;

var $$ = Dom7;
var myApp = new Framework7({
  animateNavBackIcon: true,
  modalTitle: '',
  cache: false,
  cacheDuration: 0,//1000 * 60 * 1,
  cacheIgnoreGetParameters: true,
  allowDuplicateUrls: true,
  pushState: false
});

$$(document).on('ajaxStart', function (e) {
    myApp.showIndicator();
});
$$(document).on('ajaxComplete', function () {
    myApp.hideIndicator();
});

$(function(){

  myApp.addView('#view-login', {dynamicNavbar: false,domCache: true}).router.load({url: 'tpl/login.html',animatePages: false});

  /*filter*/
  function ViewModel(){
    var self = this;
    this.page = ko.observable("");
    this.changePage = function(str){
      this.page(str);
    }
    this.busdomain = {
      list:ko.observableArray([]),
      busdomainNum:'',
      projectNum:''
    };
    this.getSelectedBus = function(id){
      var name;
      for(var i=0;i<this.busdomain.list().length;i++){
        if(this.busdomain.list()[i].id == id){
          name = this.busdomain.list()[i].name;
          break;
        }
      }
      return name;
    }
    /*busdomain*/
    this.busdomainSelected = ko.observable("全部");
    this.setBusdomainSelected = function(object,event){
      var isAll,busId,busName;
      if(object.id){
        isAll = false;
        busId = object.id;
        busName = object.name;
        self.busdomainSelected(object.id);
      }else{
        isAll = true;
        busId = null;
        busName = null;
        self.busdomainSelected("全部");
      }
      window.business_index_viewModel.loadData(false,busId,busName);
    }
    this.getBusinessDomains = function(){
      RestServiceJs(BASE_URL+"/busdomain").query({},function(data){
        self.busdomain.busdomainNum=data.busdomainNum;
        self.busdomain.projectNum=data.projectNum;
        for(var i=0;i<data.data.length;i++){
          self.busdomain.list.push(data.data[i]);
        }
        window.business_index_viewModel.loadData();
      })
    }

    /*pool*/
    this.poolSelected = ko.observable("全部");
    this.setPoolSelected = function(object,event){
      var val = event.currentTarget.attributes["toselect"].nodeValue;
      self.poolSelected(val);
      var type = val == "全部" ? "" : val;
      window.pool_index_viewModel.loadData(false,type);
    }

    /*host*/
    this.hosts = {
      WinServerList: ko.observableArray([]),
      VMwareList: ko.observableArray([]),
      PowerVMList: ko.observableArray([])
    };
    this.hostSelected = ko.observable("全部");
    this.setHostSelected = function(object,event){
      var hypervisor = event.currentTarget.attributes["hypervisor"].nodeValue;
      var val = event.currentTarget.attributes["toselect"].nodeValue;
      self.hostSelected(val);
      var hype = hypervisor ? hypervisor : "";
      var id = val.indexOf("全部")>-1 ? "" : val.replace(/[^0-9]/ig,"");
      window.HostIndex_viewModel.loadData(false, hype, id);
    }
    this.getResPools = function(){
      self.hosts.WinServerList.removeAll();
      self.hosts.VMwareList.removeAll();
      self.hosts.PowerVMList.removeAll();
      RestServiceJs(BASE_URL+"/resPool").query({"dcId":CVM_PAD.dcId,"hypervisor":"winserver"},function(data){
        for(var i=0;i<data.data.length;i++){
          self.hosts.WinServerList.push(data.data[i]);
        }
      });
      RestServiceJs(BASE_URL+"/resPool").query({"dcId":CVM_PAD.dcId,"hypervisor":"VMware"},function(data){
        for(var i=0;i<data.data.length;i++){
          self.hosts.VMwareList.push(data.data[i]);
        }
      });
      RestServiceJs(BASE_URL+"/resPool").query({"dcId":CVM_PAD.dcId,"hypervisor":"PowerVM"},function(data){
        for(var i=0;i<data.data.length;i++){
          self.hosts.PowerVMList.push(data.data[i]);
        }
      });
      window.HostIndex_viewModel.loadData();
    }

    /*vm*/
    this.vmSelected = ko.observable("全部");
    this.setVmSelected = function(object,event){
      var hypervisor = event.currentTarget.attributes["hypervisor"].nodeValue || '';
      var val = event.currentTarget.attributes["toselect"].nodeValue;
      self.vmSelected(val);
      var hype = hypervisor ? hypervisor : "";
      //var id = val.indexOf("全部")>-1 ? "" : val.replace(/[^0-9]/ig,"");
      window.vm_index_viewModel.loadData(false, hype);
    }

    
  }
  var viewModel = new ViewModel();
  ko.applyBindings(viewModel, document.getElementById("indexFilter"));
  window.indexFilter_viewModel = viewModel;

  /*assistive touch*/
  var win_w = parseInt($$("body").width());
  $$('.assistive').css("left",win_w-60+'px');
  var def_y,def_x,new_y,new_x,_touch,def_left,def_top;
  $$('.assistive').on('touchstart', function(event) {
    ismove = false;
    _touch = $$(this);
    event.preventDefault();
    var e = event.touches[0];
    def_x = e.clientX;
    def_y = e.clientY;
    def_left = parseInt(_touch.css('left'));
    def_top = parseInt(_touch.css('top'));
    _touch.css({'-webkit-transition':'',"opacity":1});
  });
  $$('.assistive').on('touchmove', function(event) {
    setTimeout(function(){
      ismove = true;
    },200)
    
    event.preventDefault();
    var e = event.touches[0];
    new_x = e.clientX;
    new_y = e.clientY;
    _touch.css({'left':def_left+(new_x-def_x)+'px','top':def_top+(new_y-def_y)+'px'});
    event.stopPropagation();
  });
  function EndTouch(){
    if(parseInt(_touch.css('left'))>win_w/2-30){
      if(parseInt(_touch.css('top'))<0){
        $$('.assistive').css({'left': (win_w-60)+'px','top': '10px','-webkit-transition': 'left 0.5s ease'});
      }else if(parseInt(_touch.css('top'))>$$(window).height()-60){
        $$('.assistive').css({'left': (win_w-60)+'px','top': $$(window).height()-70+'px','-webkit-transition': 'left 0.5s ease'});
      }else{
        $$('.assistive').css({'left': (win_w-60)+'px','-webkit-transition': 'left 0.5s ease'});
      }
    }else{
      if(parseInt(_touch.css('top'))<0){
        $$('.assistive').css({'left': '0px','top': '10px','-webkit-transition': 'left 0.5s ease'});
      }else if(parseInt(_touch.css('top'))>$$(window).height()-60){
        $$('.assistive').css({'left': '0px','top': $$(window).height()-70+'px','-webkit-transition': 'left 0.5s ease'});
      }else{
        $$('.assistive').css({'left': '0px','-webkit-transition': 'left 0.5s ease'});
      }
    }
    setTimeout(function(){
      _touch.css({"opacity":0.5});
    },1000);
  }
  $$('.assistive').on('touchout', function(event) {
    EndTouch();
  });
  $$('.assistive').on('touchend', function(event) {
    EndTouch();
  });
  var ismove = false;
  $$('.assistive').on('click', function(event) {
    if(ismove) return;
    myApp.popover($("#popover-datacenter").html(), event.target)
  });

});
