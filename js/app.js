(function () {

  var articlesView = new ArticlesView();
  articlesView.setElement($('#article-scene'));

  var sidebarSubredditsView = new SidebarSubredditsView({
    url: "http://www.reddit.com/reddits.json"
  });

  sidebarSubredditsView.setElement($('#sidebar-subreddits-list'));

  var searchButton = new SearchButtonView();
  searchButton.setElement($('#search'));

  window.App = {

    switchSubreddit: function(subreddit) {
      puts("set subreddit to " + subreddit);

      var url = "http://www.reddit.com/.json";

      if (subreddit != undefined) {
        url = "http://www.reddit.com/" + subreddit + ".json"
      }

      articlesView.setUrl(url);
      articlesView.fetchArticles();
    },

    search: function(searchTerm) {
      puts("search for " + searchTerm);

      var url = "http://www.reddit.com/search.json?q=" + searchTerm;

      articlesView.setUrl(url);
      articlesView.fetchArticles();
    },

    showArticleScene: function() {
      //window.location = '#article-scene';
      $("#article-scene").attr('class', 'current skin-dark');
      $("#comment-scene").attr('class', 'right skin-dark');
    },

    showCommentScene: function() {
      //window.location = '#comment-scene';
      $("#article-scene").attr('class', 'left skin-dark');
      $("#comment-scene").attr('class', 'current skin-dark');
    }

  };
  
  vent.on("scene:article", App.showArticleScene);
  vent.on("scene:comment", App.showCommentScene);

  App.switchSubreddit();
  sidebarSubredditsView.fetchSubreddits();
   
})();
