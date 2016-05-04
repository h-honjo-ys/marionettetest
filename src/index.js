server = sinon.fakeServer.create();
this.server.respondWith("GET", "/api/aaa",
          [200, { "Content-Type": "application/json" },
           '[{ "id": 12, "comment": "Hey there" }]']);

AppMain = new Backbone.Marionette.Application({
	regions: {
    "content": "#content",
	},
  onStart: function(){
    $('#btn_change').on('click',function(){
      AppMain.content.show(new Marionette.LayoutView({
        template: function(data){
          return 'errorView';
        },
      }));
    });
    $('#btn_response').on('click',function(){
      server.respond();
    });
  },
});

var Lv01 = Marionette.LayoutView.extend({
  template: function(data){
    return '<div id="yyy01"></div><div id="yyy02"></div><p id="btn">Layout</p>';
  },
  regions: {
    "yyy01": "#yyy01",
    "yyy02": "#yyy02",
  },
  onRender: function(){
    var self = this;
    $.ajax({
      url: "/api/aaa",
      success: function(){
        self.yyy01.show(new Iv01());
//					AppMain.content.currentView.getRegion("yyy01").show(new Iv01());
      },
      timeout: 1000000000
    });

  },
});

var Iv01 = Marionette.ItemView.extend({
  template: function(data){
    return '<div id="iii01"><p>Item</p></div>';
  },
  onRender: function(){

  },
});

AppMain.addInitializer(function(){

});

AppMain.content.show(new Lv01());







AppMain.start();
