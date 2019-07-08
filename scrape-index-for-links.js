const jsdom = require("jsdom");
const { JSDOM } = jsdom;

module.exports = function scrapeIndexForLinks(config) {
  const { url, childElementCount } = config;
  return JSDOM.fromURL(url)
    .then(dom => {
      const { document } = dom.window;
      let allRows = document.querySelectorAll('tr')
      
      let results = []
      allRows.forEach((r) => {
        if (
          r.childElementCount === childElementCount &&
          rowContainsKidWithNumber(r)
        ) {
          let link = getLink(r)
          if (!!link.length) {
                    
            const site = getSite(r)
              .toLowerCase()
              .replace('-', ' ')
              .replace('_', ' ')
              .replace(',', ' ')
              .replace('(', ' ')
              .replace(')', ' ')
              .replace('\n', ' ')
              .replace('st-', 'st ')
              .replace('s-', 's ')
              .split(' ')
              .map( str => str.trim())
              .filter( str => str !== '')
              .join('_');
            // console.log('\n --> site: ', site)
            results.push({ link, site })
            
          }
        }
      })
      console.log('\n --> index links: ', results[0])

      return results.filter((r) => !!r.link && r.link.length > 0);
    })
}

// function getArrayIndexes (obj) {
//   return Object.keys(obj).filter(x => !Number.isNaN(Number(x)))
// }

function rowContainsKidWithNumber(row) {
  let kids = row.childNodes
  let kidWithNumberIndex = []
  Object.keys(kids).forEach((i) => {
    let k = kids[i]

    if (!Number.isNaN(Number(k.textContent.trim())) &&
      Number(k.textContent.trim()) > 0) {
      // console.log('\n pushing --> ', k.textContent.trim())
      kidWithNumberIndex.push(i);

    }  
  })
  // console.log('rowContainsKidWithNumber: ', !!kidWithNumberIndex.length, kidWithNumberIndex.length)
  return !!kidWithNumberIndex.length;
}

function getSite(row) {
  let kids = row.childNodes
  let site = '';
  Object.keys(kids).forEach((i) => {
    let k = kids[i]

    // if its not the number kid, it must be site
    if (Number.isNaN(Number(k.textContent.trim()))) {
      // console.log('\n pushing --> ', k.textContent.trim())
      site = k.textContent.trim()
    }  
  })
  // console.log('rowContainsKidWithNumber: ', !!kidWithNumberIndex.length, kidWithNumberIndex.length)
  return site;
}

function getLink(row) {
  let kids = row.children
  let result = []
  Object.keys(kids).forEach((i) => {
    let k = kids[i]
    let links = k.getElementsByTagName('a');

    if (links.length > 0) {
      // console.log('href: ', links[0].href)
      let href = links[0].href
      result.push(href)
    }
  })
  // console.log('getLink: ', result.length)
  return result[0];
}
