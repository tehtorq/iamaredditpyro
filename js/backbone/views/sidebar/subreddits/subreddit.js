var SidebarSubredditPartialView = Backbone.View.extend({
  tagName: 'li',

  events: {
    'click': 'show'
  },

  render: function() {
    var url = this.model.get('data').url;
    url = '#' + url.substr(1);

    var content = "<a href='#'>{{display_name}}</a>";//$('#sidebar-subreddit-template').html();
    content = content.replace(/{{display_name}}/g, this.model.get('data').display_name);
    content = content.replace(/{{url}}/g, url);
    
    this.$el.html(content);
    return this;
  },

  show: function(e) {
    //e.preventDefault();
    puts('show');
    App.switchUrl(this.model.get('data').url + '.json?jsonp=?');
  }

});
