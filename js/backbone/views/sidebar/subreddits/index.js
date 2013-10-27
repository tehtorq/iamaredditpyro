var SidebarSubredditsView = Backbone.View.extend({

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
      var view = new SidebarSubredditPartialView({model: model});
      view.renderInto($('#sidebar-subreddit-list'));
    });

    return this;
  }

});