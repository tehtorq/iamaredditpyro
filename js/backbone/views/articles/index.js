var ArticlesView = Backbone.View.extend({

  initialize: function() {
    _.bindAll(this, 'scroll');
    $('#article-list').scroll(_.throttle(this.scroll, 500, {leading: false}));

    this.model = new Backbone.Model;
    this.collection = new Backbone.Collection;
    //this.listenTo(this.model, 'change', this.setArticles);
    this.listenTo(this.model, 'loadmore', this.loadMore);
    this.listenTo(this.collection, 'reset', this.render);
    this.listenTo(this.collection, 'add', this.addArticle);
  },

  setUrl: function(url) {
    this.model.url = url;
  },

  fetchArticles: function() {
    this.collection.reset();
    this.loading = true;
    vent.trigger('loading:true');

    this.model.fetch({
      // dataType: 'jsonp',
      success: function() {
        this.collection.add(this.model.get('data').children);
        vent.trigger('loading:false');
        this.loading = false;
      }.bind(this)
    });
  },

  addArticle: function(article) {
    var view = new ArticlePartialView({model: article});
    view.renderInto(this.$('#article-list'));
  },

  render: function() {
    this.$('#article-list').html('');
    return this;
  },

  scroll: function() {
    //puts('scroll');
    if (this.loading) {
      return;
    }

    if (($('.reddit_article').last().position().top - $('.reddit_article').parent().height()) < 100) {
      //puts("load next page");
      this.model.trigger('loadmore');
    }
  },

  loadMore: function() {
    var after = this.collection.last().get('data').name;
    this.loading = true;
    vent.trigger('loading:true')

    this.model.fetch({
      data: $.param({after: after}),
      success: function() {
        this.collection.add(this.model.get('data').children);
        vent.trigger('loading:false')
        this.loading = false;
      }.bind(this)
    });
  }

});