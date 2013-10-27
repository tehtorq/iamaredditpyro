var CommentPartialView = Backbone.View.extend({
  tagName: 'li',

  events: {
    "click .comment_counter": 'viewComments',
    "click": 'showMenu'
  },

  initialize: function() {
    //this.listenTo(this.model, "change", this.render);
  },

  render: function() {
    var content = $('#comment-template').html();
    content = content.replace(/{{body}}/g, this.model.get('data').body);
    content = content.replace(/{{indent}}/g, 10 + this.model.get('data').indent * 4);
    content = content.replace(/{{author}}/g, this.model.get('data').author);
    content = content.replace(/{{score}}/g, this.model.get('data').ups - this.model.get('data').downs);
    content = content.replace(/{{created}}/g, moment.unix(this.model.get('data').created_utc).fromNow());
    
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
