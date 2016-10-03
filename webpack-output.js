var path = require('path');

var output = function(options) {
  var env = options.env;
  var packageJson = options.packageJson;
  var worona = options.worona;
  return {
    path: path.resolve('dist', env),
    publicPath: 'https://cdn.worona.io/packages/' + packageJson.name + '/dist/' + env + '/',
    filename: 'js/[name]-' + worona.slug + '.' + worona.service + '.' + worona.type + '.[chunkhash].js',
    library: worona.slug + '_' + worona.service + '_' + worona.type,
    libraryTarget: 'commonjs2',
    hashDigestLength: 32,
    chunkFilename: '[name].[chunkhash].js',
  };
};

module.exports = output;
