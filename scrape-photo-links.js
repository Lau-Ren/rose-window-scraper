
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
let notImages = [
  'http://www.therosewindow.com/pilot/angel1.jpg', // angel dude
  'http://www.therosewindow.com/pilot/header.jpg', // header
  'http://www.therosewindow.com/header.jpg', //header
  'http://www.therosewindow.com/pilot/Chartres/littlerose.jpg', //little rose
  'http://www.therosewindow.com/pilot/StQuentin/stquentin-plan.jpg' // building plan
];
module.exports = function scrapePhotoLinks(indexLinks) {
  let results = [];
  
  // return Promise.all(indexLinks.slice(0, 2).map( (link, i) => {
  return Promise.all(indexLinks.map( ({ link, site }, i) => {
    return JSDOM.fromURL(link)
      .then(dom => {
        // console.log('index url i: ', i)
        const { document } = dom.window;
        let allImages = document.querySelectorAll('img')
        
        allImages.forEach(({ src }) => {
          if(!notImages.includes(src)) {
            results.push({
              src: src,
              site: site
            })
          } else {
            console.log('Excluding Image: ', src)
          }
        })
        return 
      })
  }))
  .then(() => {
    console.log('photo links total: ', results.length, results[0])
    const filtered = results.filter(i => i.src && i.src.length > 0);
    console.log('photo links filtered: ', filtered.length)
    return filtered;
    
  }) 
}