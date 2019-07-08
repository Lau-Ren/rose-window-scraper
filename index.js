
var Promise = require('promise');
var request = require('request');
var cheerio = require('cheerio');
const jsdom = require("jsdom");
var tap = require('./tap.js');
var scrapeIndexForLinks = require('./scrape-index-for-links.js');
var scrapePhotoLinks = require('./scrape-photo-links.js');
var downloadImages = require('./download-images.js');
const { JSDOM } = jsdom;
var config = require('./config.js')

doWork(config.english);

function doWork(config) {
  return scrapeIndexForLinks(config)
    .then((x) => tap(x, 'SCRAPED INDEX LINKS'))
    .then(scrapePhotoLinks)
    .then((x) => tap(x, 'SCRAPED PHOTO LINKS'))
    .then((res) => downloadImages(res, config))
    .then((x) => tap(x, 'DOWNLOADED PHOTOS'))
    .catch((err) => {
      console.log('\nError\n', err)

    })
}
