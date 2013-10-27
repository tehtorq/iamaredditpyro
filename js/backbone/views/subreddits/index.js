var SubredditsView = Backbone.View.extend({

  initialize: function(params) {
    params = params || {};
    this.model = new Backbone.Model;
    this.model.url = params.url;
    this.collection = new Backbone.Collection;
  },

  fetchSubreddits: function() {
    this.model.fetch({
      success: function() {
        this.collection.reset(this.model.get('data').children);
        this.render();
      }.bind(this)
    });
  },

  render: function() {
    _.each(this.collection.models, function(model) {
      var view = new SubredditPartialView({model: model});
      view.renderInto($('#subreddit-list'));
    });

    return this;
  }

});