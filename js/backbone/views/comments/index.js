var CommentsView = Backbone.View.extend({

  events: {
    "click .button-back": 'goBack'
  },

  initialize: function() {
    this.collection = new Backbone.Collection;
    this.listenTo(this.collection, 'reset', this.render);
  },

  setUrl: function(url) {
    this.url = url;
  },

  fetchComments: function() {
    this.collection.reset();
    vent.trigger('loading:true')
    
    var collection = new Backbone.Collection;
    collection.url = this.url;
    collection.fetch({
      success: function() {
        var json = collection.toJSON();
        var children = json[1];
        var array = [];

        var firstPost = json[0].data.children[0];
        firstPost.data.body = firstPost.data.title + "<br><br>" + firstPost.data.selftext;
        firstPost.data.indent = 0;
        array.push(firstPost);

        this.populateReplies(children.data.children, 0, array);
        this.collection.reset(array);
        vent.trigger('loading:false')
      }.bind(this)
    });
  },

  render: function() {
    $('#comment-list').html('');

    _.each(this.collection.models, function(comment) {
      var view = new CommentPartialView({model: comment, collection: this.collection});
      view.renderInto($('#comment-list'));          
    }.bind(this));

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
    vent.trigger('scene:article');
    //window.location = '#article-scene';
    // $("#comment-scene").attr('class', 'right skin-dark');
    // $("#article-scene").attr('class', 'current skin-dark');
  }

});