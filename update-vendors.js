var https = require('https');
var fs = require('fs');
var argv = require('yargs').argv;

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

download(
  'https://cdn.worona.io/packages/core-' + argv.service + '-worona/dist/prod/vendors/vendors-manifest.json',
  'node_modules/worona-packages/prod-vendors-manifest.json'
);

download(
  'https://cdn.worona.io/packages/core-' + argv.service + '-worona/dist/dev/vendors/vendors-manifest.json',
  'node_modules/worona-packages/dev-vendors-manifest.json'
);
