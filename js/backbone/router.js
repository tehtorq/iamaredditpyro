var Router = Backbone.Router.extend({

  routes: {
    "r/:subreddit/": "setSubreddit"
  },

  setSubreddit: function(subreddit) {
    App.setSubreddit(subreddit);
  }

});
