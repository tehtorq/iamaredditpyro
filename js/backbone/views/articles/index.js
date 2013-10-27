var ArticlesView = Backbone.View.extend({

  events: {
    // "click": 'showMenu',
    "click .comment_counter": 'viewComments'
  },

  initialize: function() {
    this.model = new Backbone.Model;
    this.collection = new Backbone.Collection;
    this.listenTo(this.model, 'change', this.setArticles);
    this.listenTo(this.collection, 'reset', this.render);
  },

  setUrl: function(url) {
    this.model.url = url;
  },

  fetchArticles: function() {
    this.collection.reset();
    this.model.fetch();
  },

  setArticles: function() {
    this.collection.reset(this.model.get('data').children);
  },

  render: function() {
    $('#article-list').html('');

    _.each(this.collection.models, function(model) {
      var view = new ArticlePartialView({model: model});
      view.renderInto($('#article-list'));
    });

    return this;
  }

});