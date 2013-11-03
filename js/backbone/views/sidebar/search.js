var SearchButtonView = Backbone.View.extend({

  events: {
    'click': 'search',
    // "click #search-buttons-back": 'goBack'
  },

  search: function() {
    puts("search clicked");
    vent.trigger('scene:search');
    //App.search('test');

    // $("#comment-scene").attr('class', 'right skin-dark');
    // $("#article-scene").attr('class', 'right skin-dark');
    // $("#search-scene").attr('class', 'current skin-dark');
  },

  goBack: function() {
    // $("#comment-scene").attr('class', 'right skin-dark');
    // $("#search-scene").attr('class', 'right skin-dark');
    // $("#article-scene").attr('class', 'current skin-dark');
  }

});