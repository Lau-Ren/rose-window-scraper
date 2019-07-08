var fs = require('fs')
var request = require('request');
module.exports = function downloadImages( imageSources, config) {
  const { filename, imgName, path} = config;
  // console.log('dowloading!!',)
  // return Promise.all(imageSources.slice(0, 2).map((src, i) => {
  return Promise.all(imageSources.map(({src, site}, i) => {
    return download(src, `./${path}${site}_${imgName}`, i, () => {
      // console.log('Finished downloading img! :)', i)
    })
  }))
  .catch(err => {
    console.log('DOWNLOAD ERROR: ', err)
    throw new Error(err)
  })
}

var download = function (src, filename, i, callback) {
  return request.head(src, function (err, res, body) {
    if(err) {
      console.log('ERROR HEAD: ', JSON.stringify({err, src, filename}, null, 2))
      throw new Error(err) 
    }
    if(res.statusCode === 200 && res.headers['content-type'] === 'image/jpeg') {
      // console.log('DOWNLOADING: ', res.statusCode, src, filename, i)
      return request(src)
        .on('error', function(err) { 
          console.log('IMG SRC ERROR: ', err)
          throw new Error(err) 
        })
        .pipe(fs.createWriteStream(`${filename}_${i}.jpg`))
        .on('close', callback)
    } else {
      console.log('ERROR DOWNLOADING', res.statusCode, src, filename, i)
      return;
    }

  });
  
  // request(src, function(err, res, html) {
  //   console.log('err', err)
  //   console.log('res', res)
  // }).pipe(fs.createWriteStream(filename))
};


