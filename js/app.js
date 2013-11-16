(function () {

  var articlesView = new ArticlesView();
  articlesView.setElement($('#article-scene'));

  var sidebarSubredditsView = new SidebarSubredditsView({
    url: "http://www.reddit.com/reddits.json?jsonp=?"
  });

  sidebarSubredditsView.setElement($('#sidebar-subreddits-list'));

  var articlesHeader = new ArticlesHeaderView();
  articlesHeader.setElement($('#articles-header'));

  window.App = {

    switchUrl: function(url_partial) {
      puts("set url to " + url_partial);

      var url = "http://www.reddit.com/.json?jsonp=?";

      if (url_partial != undefined) {
        url = "http://www.reddit.com/" + url_partial;
      }

      articlesView.setUrl(url);
      articlesView.fetchArticles();
    },

    search: function(searchTerm) {
      puts("search for " + searchTerm);

      var url = "http://www.reddit.com/search.json?jsonp=?&q=" + searchTerm;

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
    },

    showLoading: function() {
      $('#loading').attr('class', 'show');
    },

    hideLoading: function() {
      $('#loading').attr('class', '');
    }

  };
  
  vent.on("scene:article", App.showArticleScene);
  vent.on("scene:comment", App.showCommentScene);
  vent.on("loading:true", App.showLoading);
  vent.on("loading:false", App.hideLoading);

  App.switchUrl();
  sidebarSubredditsView.fetchSubreddits();
   
})();
