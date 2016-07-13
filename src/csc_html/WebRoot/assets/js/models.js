$(function(){
  window.api = {
    vm: new (Backbone.Model.extend({urlRoot: 'api/vms'})),
    vms: new (Backbone.Collection.extend({url: 'api/vms.json'})),

    hosts: new (Backbone.Collection.extend({url: 'api/hosts.json', parse:function(response){ return response.results }}))
  }
})
