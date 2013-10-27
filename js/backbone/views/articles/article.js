var ArticlePartialView = Backbone.View.extend({

  events: {
    "click": 'showMenu',
    "click .comment_counter": 'viewComments'
  },

  initialize: function() {
    //this.listenTo(this.model, "change", this.render);
  },

  render: function() {
    var content = $('#article-template').html();
    content = content.replace(/{{title}}/g, this.model.get('data').title);
    content = content.replace(/{{num_comments}}/g, this.model.get('data').num_comments);
    content = content.replace(/{{tag}}/g, this.getTag());
    
    this.$el.html(content);
    return this;
  },

  getTag: function() {
    if (!this.model.get('data')) {
      return "";
    }

    return (this.model.get('data').ups - this.model.get('data').downs) + " points in " + this.model.get('data').subreddit + " by " + this.model.get('data').author;
  },

  showMenu: function() {
    var menu = $("#sample-menu");
    $(menu).show();
  },

  viewComments: function() {
    $("#comment-scene").attr('class', 'current skin-dark')
    $("#article-scene").attr('class', 'left')

    var commentsView = new CommentsView({
      url: "http://www.reddit.com" + this.model.get('data').permalink + ".json"
    });

    commentsView.setElement($('#comment-scene'));
    commentsView.fetchComments();
  }

});
