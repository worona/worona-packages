var env = 'prod';
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var StatsWriterPlugin = require('webpack-stats-plugin').StatsWriterPlugin;
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

module.exports = function(packageJson) {
  var worona = packageJson.worona = packageJson.worona || {};

  return {
    entry: {
      main: path.resolve('src', 'index.js'),
    },
    output: {
      path: path.resolve('dist', env),
      publicPath: 'https://cdn.worona.io/packages/' + packageJson.name + '/dist/' + env + '/',
      filename: 'js/' + worona.slug + '.' + worona.service + '.' + worona.type + '.[chunkhash].js',
      library: worona.slug + '_' + worona.service + '_' + worona.type,
      libraryTarget: 'commonjs2',
      hashDigestLength: 32,
      chunkFilename: '[name].[chunkhash].js',
    },
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /(node_modules)/,
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract('style-loader', [
            'css-loader?modules',
            'postcss-loader',
          ]),
        },
        {
          test: /\.s[ac]ss$/,
          loader: ExtractTextPlugin.extract('style-loader', [
            'css-loader',
            'sass-loader',
          ]),
        },
        {
          test: /\.(png|jpg|gif)$/,
          loader: 'file-loader?name=images/[name].[hash].[ext]',
          exclude: /(node_modules)/,
        },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'url-loader?limit=10000&minetype=application/font-woff&name=fonts/[name].[hash].[ext]',
        },
        {
          test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file-loader?name=fonts/[name].[hash].[ext]',
        },
        {
          test: /locales\/.+\.json$/,
          loader: 'bundle-loader?name=locales/[name]',
        },
        {
          test: /\.json$/,
          loader: 'json-loader?name=jsons/[name].[hash].[ext]',
          exclude: /(node_modules)/,
        },
      ],
    },
    resolve: {
      extensions: ['', '.js', '.jsx'],
    },
    postcss: function () {
      return [require('postcss-cssnext')()];
    },
    stats: { children: false },
    plugins: [
      new webpack.DefinePlugin({ 'process.env': { NODE_ENV: JSON.stringify('production') } }),
      new LodashModuleReplacementPlugin(),
      new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new ExtractTextPlugin('css/' + worona.slug + '.styles.[contenthash].css'),
      new webpack.DllReferencePlugin({
        context: '../..',
        manifest: require('./' + env + '-vendors-manifest.json'),
      }),
      new StatsWriterPlugin({
        filename: '../../package.json',
        fields: ['chunks', 'assets'],
        transform: function (data) {
          worona[env] = worona[env] || {};
          worona[env].files = [];
          worona[env].assets = {};
          data.assets.forEach(function(asset) {
            var hash, ext, type;
            try {
              hash = /\.([a-z0-9]{32})\.\w+?$/.exec(asset.name)[1];
              type = /^(\w+)\//.exec(asset.name)[1];
            } catch (error) {
              throw new Error('Hash or type couldn\'t be extracted from ' + asset.name);
            }
            if ((type === 'fonts') || (type === 'css')) {
              worona[env].assets[type] = worona[env].assets[type] || [];
              worona[env].assets[type].push(packageJson.name + '/dist/' + env + '/' + asset.name);
            }
            worona[env].files.push({
              file: packageJson.name + '/dist/' + env + '/' + asset.name,
              hash: hash,
            });
          });
          data.chunks.forEach(function(chunk) {
            chunk.files.forEach(function(file, index) {
              if (chunk.names[index] === 'main') {
                worona[env].main = packageJson.name + '/dist/' + env + '/' + file;
              }
            });
          });
          return JSON.stringify(packageJson, null, 2);
        }
      }),
    ],
  };
};
