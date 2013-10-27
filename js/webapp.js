(function () {

  function scroll () {
 alert("scroll event detected! " + window.pageXOffset + " " + window.pageYOffset);
 // note: you can use window.innerWidth and window.innerHeight to access the width and height of the viewing area
}

  window.onscroll = scroll;

  var router = new Router();
  Backbone.history.start();

  var articlesView = new ArticlesView();
  articlesView.setElement($('#article-scene'));

  var sidebarSubredditsView = new SidebarSubredditsView({
    url: "http://www.reddit.com/reddits.json"
  });

  sidebarSubredditsView.setElement($('#sidebar-subreddits-list'));

  window.App = {

    setSubreddit: function(subreddit) {
      puts("set subreddit to " + subreddit);

      url = "http://www.reddit.com/.json";

      if (subreddit != undefined) {
        url = "http://www.reddit.com/r/" + subreddit + ".json"
      }

      articlesView.setUrl(url);
      articlesView.fetchArticles();
    }

  };

  _.extend(App, Backbone.Events);


  App.setSubreddit();
  sidebarSubredditsView.fetchSubreddits();
   
})();
