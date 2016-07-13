$(function(){
  window.api = {
    vm: new (Backbone.Model.extend({urlRoot: 'api/vms'})),
    vms: new (Backbone.Collection.extend({url: 'api/vms.json'})),

    volumn: new (Backbone.Model.extend({urlRoot: 'api/volumns'})),

    host: new (Backbone.Model.extend({
      urlRoot: 'api/hosts',
      initialize: function(){
        this.volumns = new (Backbone.Collection.extend({parse:function(response){ return response.results }}));
      }
    })),
    hosts: new (Backbone.Collection.extend({url: 'api/hosts.json', parse:function(response){ return response.results }}))
  }

  api.host.on("change:id", function(model, id) {
    api.host.volumns.url = api.host.urlRoot+"/"+id+"/volumns";
  });
})
