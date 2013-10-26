Backbone.$.ajaxSettings.xhr = function () {
  return new window.XMLHttpRequest({mozSystem: true})
};

_.extend(Backbone.View.prototype, {
  renderInto: function(selector) {
    var el = this.render().el;
    selector.append(el);
    return this;
  }
});

var puts = function(string) {
  return console.log(string);
}
