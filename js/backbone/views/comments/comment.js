var CommentPartialView = Backbone.View.extend({

  events: {
    // "click": 'showMenu',
    "click .comment_counter": 'viewComments'
  },

  initialize: function() {
    //this.listenTo(this.model, "change", this.render);
  },

  render: function() {
    var content = $('#comment-template').html();
    content = content.replace(/{{body}}/g, this.model.get('data').body);
    puts(this.model.get('data').indent);
    content = content.replace(/{{indent}}/g, 10 + this.model.get('data').indent * 4);
    // content = content.replace(/{{num_comments}}/g, this.model.get('data').num_comments);
    // content = content.replace(/{{tag}}/g, this.getTag());
    
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
    puts("click");
    var menu = $("#sample-menu");
    $(menu).show();
  }

});
