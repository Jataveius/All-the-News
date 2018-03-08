var axios = require("axios");
var cheerio = require("cheerio");


var scrape = function() {
  return axios.get("https://www.npr.org/sections/news/").then(function(res) {
    var $ = cheerio.load(res.data);
    var articles = [];
    $(".item-info").each(function(i, element) {

      var head = $(this)
        .children(".title")
        .text()
        .trim();

      var url = $(this)
        .children(".title")
        .children("a")
        .attr("href");

      var sum = $(this)
        .children(".teaser")
        .text()
        .trim();

      if (head && sum && url) {

        var headNeat = head.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();
        var sumNeat = sum.replace(/(\r\n|\n|\r|\t|\s+)/gm, " ").trim();

        var dataToAdd = {
          headline: headNeat,
          summary: sumNeat,
          url: url
        };

        articles.push(dataToAdd);
      }
    });
    return articles;
  });
};


module.exports = scrape;