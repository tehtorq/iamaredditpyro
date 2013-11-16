var ArticlesHeaderView = Backbone.View.extend({

  events: {
    'click #show-search-input': 'search',
    'submit #search-input-form': 'submit'
  },

  search: function() {
    $('#search-input-form').toggle();
    $('span', this.el).toggleClass('search');
    $('span', this.el).toggleClass('cancel');
    puts("search clicked");
    vent.trigger('scene:search');
    //App.search('test');
  },

  submit: function() {
    puts("submitted");

    var search_term = this.$('#search-term').val();

    if (search_term.indexOf('/r/') === 0) {
      App.switchUrl(search_term + '.json');
    } else {
      App.switchUrl('search.json?q=' + search_term);
    }
  }



});