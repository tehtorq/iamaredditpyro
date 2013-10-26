(function () {

//   document.querySelector('#btn-buttons').addEventListener ('click', function () {
//   document.querySelector('#buttons').className = 'current';
//   document.querySelector('[data-position="current"]').className = 'left';
// });
// document.querySelector('#btn-buttons-back').addEventListener ('click', function () {
//   document.querySelector('#buttons').className = 'right';
//   document.querySelector('[data-position="current"]').className = 'current';
// });


  var articlesView = new ArticlesView({
    url: "http://www.reddit.com/.json"
  });

  articlesView.fetchArticles();
   
})();
