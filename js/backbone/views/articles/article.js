var ArticlePartialView = Backbone.View.extend({
  tagName: 'li',
  className: 'reddit_article',

  events: {
    "click": 'showMenu',
    "click .comment_counter": 'viewComments',
    "click img": "viewImage"
  },

  initialize: function() {
    //this.listenTo(this.model, "change", this.render);
  },

  render: function() {
    var content = $('#article-template').html();
    content = content.replace(/{{title}}/g, this.model.get('data').title);
    content = content.replace(/{{num_comments}}/g, this.model.get('data').num_comments);
    content = content.replace(/{{tag}}/g, this.getTag());
    content = content.replace(/{{thumbnail}}/g, this.getThumbnail());
    
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
  },

  getThumbnail: function() {
    var thumbnail_url = "";

    if ((this.model.get('data').thumbnail) && (this.model.get('data').thumbnail != "")) {

      var image_link = this.model.get('data').thumbnail;
        
      if (image_link.indexOf('/static/') != -1) {
        image_link = 'http://reddit.com' + image_link;
      }
        
      if ((image_link == 'self') || (image_link == 'nsfw') || (image_link == 'default')) {
        image_link = "./images/" + image_link + "-thumbnail.png";
      }

      if (this.model.get('data').url) {
        parsed_url = Linky.parse(this.model.get('data').url);

        if (parsed_url.type == 'image') {
          if (!image_link) {
            image_link = './images/picture.png';
          }
          thumbnail_url = '<img class="reddit_thumbnail" src="'+image_link+'" id="image_'+this.model.get('data').id+'">';
        }
        else if (parsed_url.type == 'youtube_video') {
          if (!image_link) {
            image_link = './images/youtube.png';
          }
          thumbnail_url = '<img class="reddit_thumbnail" src="'+image_link+'" id="youtube_'+this.model.get('data').id+'">';
        }
        else if (parsed_url.type == 'web') {
          if (!image_link) {
            image_link = './images/web.png';
          }

          thumbnail_url = '<img class="reddit_thumbnail" src="'+image_link+'" id="web_'+this.model.get('data').id+'">';
        }
      }
    }

    return thumbnail_url;
  },

  viewImage: function() {
    window.open(this.model.get('data').url, '_blank');

    // var activity = new MozActivity({
    //   name: "open",
    //   data: {
    //     type: [
    //       "image/jpeg",
    //       "image/png",
    //       "image/gif",
    //       "image/bmp"
    //     ],
    //     url: this.model.get('data').url
    //   }
    // });
  }

});
