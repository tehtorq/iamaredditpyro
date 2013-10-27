var CommentsView = Backbone.View.extend({

  events: {
    "click #btn-buttons-back": 'goBack'
  },

  initialize: function(params) {
    this.collection = new Backbone.Collection;
    params = params || {};
    this.url = params.url
    this.listenTo(this.collection, 'reset', this.render);
  },

  fetchComments: function() {
    this.collection.reset();
    
    var collection = new Backbone.Collection;
    collection.url = this.url;
    collection.fetch({
      success: function() {
        var json = collection.toJSON();
        var children = json[1];
        var array = [];
        this.populateReplies(children.data.children, 0, array);
        this.collection.reset(array);
      }.bind(this)
    });
  },

  render: function() {
    $('#comment-list').html('');

    _.each(this.collection.models, function(comment) {
      var view = new CommentPartialView({model: comment});
      view.renderInto($('#comment-list'));          
    });

    return this;
  },

  populateReplies: function(replies, indent, array) {
    _.each(replies, function(child) {
      if (child.kind != 'more') {
        child.data.indent = indent;
        //child.easyLinksHTML = StageAssistant.easylinksFormatter(child)

        array.push(child);

        var data = child.data;

        if ((data.replies !== undefined) && (data.replies.data !== undefined) && (data.replies.data.children !== undefined)) {
          //if (child.hiding_comments == 0) {
          this.populateReplies(data.replies.data.children, (indent + 1), array);
          //}
        }
      }
    }.bind(this));
  },

  goBack: function() {
    $("#comment-scene").attr('class', 'right skin-dark');
    $("#article-scene").attr('class', 'current');
  }

});