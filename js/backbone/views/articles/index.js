var ArticlesView = Backbone.View.extend({

  events: {
    // "click": 'showMenu',
    "click .comment_counter": 'viewComments'
  },

  initialize: function(params) {
    params = params || {};
    this.model = new Backbone.Model;
    this.model.url = params.url;
    this.collection = new Backbone.Collection;
    //this.listenTo(this.model, "change", this.render);
  },

  fetchArticles: function() {
    var m = new Backbone.Model;
    m.url = "http://www.reddit.com/.json";
    this.model.fetch({
      success: function() {
        this.collection.reset(this.model.get('data').children);
        this.render();
      }.bind(this)
    });
  },

  render: function() {
    _.each(this.collection.models, function(model) {
      var view = new ArticlePartialView({model: model});
      view.renderInto($('#article-list'));
    });

    return this;
  }

});