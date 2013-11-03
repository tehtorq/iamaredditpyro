var CommentPartialView = Backbone.View.extend({
  tagName: 'li',

  events: {
    "click": 'toggleVisibility'
  },

  initialize: function() {
    this.listenTo(this.model, "change", this.render);
  },

  render: function() {
    var content = "";

    if (this.model.get('hidden') != true) {
      var content = $('#comment-template').html();
      content = content.replace(/{{body}}/g, this.model.get('data').body);
      content = content.replace(/{{indent}}/g, 10 + this.model.get('data').indent * 4);
      content = content.replace(/{{author}}/g, this.model.get('data').author);
      content = content.replace(/{{score}}/g, this.model.get('data').ups - this.model.get('data').downs);
      content = content.replace(/{{created}}/g, moment.unix(this.model.get('data').created_utc).fromNow());
      content = content.replace(/{{hiding_comments}}/g, ((this.model.get('hiding_comments') || 0) > 0) ? 'hiding ' + this.model.get('hiding_comments') + ' comments' : '');
    }
    
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

  toggleVisibility: function() {
    var index = this.collection.indexOf(this.model);

    if (index == (this.collection.length - 1)) {
      return;
    }

    var hidden;

    if ((this.model.get('hiding_comments') || 0) > 0) {
      hidden = false;
    }
    else {
      hidden = true;
    }

    var first_candidate = index + 1;
    var indent = parseInt(this.model.get('data').indent);
    var check = true;
    var checked_until = index;
    var remove = false;

    while ((check == true) && (checked_until < (this.collection.length - 1))) {
      var next_model = this.collection.at(checked_until+1);

      if ((next_model.get('kind') != 't1') || (parseInt(next_model.get('data').indent) > indent)) {
        remove = true;
        checked_until += 1;
      }
      else {
        check = false;
      }
    }

    if (remove == true) {
      if (hidden == true) {
        this.model.set({hiding_comments: checked_until - index});
      }
      else {
        this.model.set({hiding_comments: 0}); 
      }

      for (var i = first_candidate; i <= checked_until; i++) {
        this.collection.at(i).set({hidden: hidden, hiding_comments: 0});
      }
    }

  }

});
