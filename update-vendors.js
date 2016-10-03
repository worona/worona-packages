var https = require('https');
var fs = require('fs');
var entries = require('./webpack-entries');

var download = function(url, dest, cb) {
  var file = fs.createWriteStream(dest);
  var request = https.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close(cb);  // close() is async, call cb after close completes.
    });
  }).on('error', function(err) { // Handle errors
    fs.unlink(dest); // Delete the file async. (But we don't check the result)
    if (cb) cb(err.message);
  });
};

entries().forEach(function(entry){
  download(
    'https://cdn.worona.io/packages/core-' + entry + '-worona/dist/prod/vendors/vendors-manifest.json',
    'node_modules/worona-packages/prod-' + entry + '-vendors-manifest.json'
  );
  download(
    'https://cdn.worona.io/packages/core-' + entry + '-worona/dist/dev/vendors/vendors-manifest.json',
    'node_modules/worona-packages/dev-' + entry + '-vendors-manifest.json'
  );
});
