/* eslint-disable */
var webpack = require('webpack');
var path = require('path');
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var definePlugin = function(config) {
  var nodeEnv = config.env === 'dev' ? 'development' : 'production';
  return new webpack.DefinePlugin({ 'process.env': {
    NODE_ENV: JSON.stringify(nodeEnv),
    SERVICE_ENV: JSON.stringify(config.service),
  } });
};

var lodashModuleReplacementPlugin = function() {
  return new LodashModuleReplacementPlugin({
    currying: true,
    flattening: true,
    placeholders: true,
    collections: true,
  });
};

var dllReferencePlugin = function(config) {
  return new webpack.DllReferencePlugin({
    context: path.resolve('.'),
    manifest: require('.worona/' + config.service + '/' + config.env + '/vendors-manifest.json'),
  });
};

var contextReplacementPlugin = function() {
  new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en|es/);
};

var extractTextPlugin = function(config) {
  if (config.env === 'prod')
    return new ExtractTextPlugin('css/' + config.name + '.[contenthash].css');
};

var htmlWebpackPlugin = function(config) {
  var files = require('.worona/' + config.service + '/' + config.env + '/core-files.json');
  return new HtmlWebpackPlugin({
    inject: false,
    title: 'Worona ' + config.service + ' (PKG DEV)',
    template: path.resolve('node_modules', 'worona-packages', 'webpack', 'html', 'index.html'),
    favicon: path.resolve('node_modules', 'worona-packages', 'webpack', 'html', 'favicon.png'),
    vendorsFile: files.vendors,
    coreFile: files.core,
    devServer: 'http://localhost:3333',
    window: {
      publicPath: 'https://precdn.worona.io/packages/dist/',
      __worona__: { [config.env]: true, [config.location]: true },
    },
    appMountId: 'root',
    minify: { preserveLineBreaks: true, collapseWhitespace: true },
  });
};

module.exports = {
  definePlugin: definePlugin,
  lodashModuleReplacementPlugin: lodashModuleReplacementPlugin,
  dllReferencePlugin: dllReferencePlugin,
  htmlWebpackPlugin: htmlWebpackPlugin,
  extractTextPlugin: extractTextPlugin,
  contextReplacementPlugin: contextReplacementPlugin,
};
