/* eslint-disable */
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var babel = function(config) {
  return {
    test: /\.jsx?$/,
    loader: 'babel-loader',
    include: /src\/(dashboard|app)\//,
    query: {
      presets: ['es2015','react','stage-0'],
      plugins: ['lodash'],
    }
  };
};

var css = function(config) {
  if (config.env === 'dev') {
    return {
      test: /\.css$/,
      loaders: [
        'style-loader',
        'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
        'postcss-loader',
      ],
    };
  } else {
    return {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style-loader', [
        'css-loader?modules',
        'postcss-loader',
      ]),
    };
  }
};

var sass = function(config) {
  if (config.env === 'dev' || config.type === 'core') {
    return {
      test: /\.s[ac]ss$/,
      loaders: [
        'style-loader',
        'css-loader',
        'sass-loader',
      ],
    };
  } else {
    return {
      test: /\.s[ac]ss$/,
      loader: ExtractTextPlugin.extract('style-loader', [
        'css-loader',
        'sass-loader',
      ]),
    };
  }
};

var sass = function(config) {
  return {
    test: /\.s[ac]ss$/,
    loaders: [
      'style-loader',
      'css-loader',
      'sass-loader',
    ],
  };
};

var image = function(config) {
  return {
    test: /\.(png|jpg|gif)$/,
    loader: 'file-loader',
    query: {
      name: '/images/[name].[hash].[ext]',
    },
  };
}

var font = function(config) {
  return {
    test: /\.(eot|svg|ttf|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'file-loader',
    query: {
      name: '/fonts/[name].[hash].[ext]',
    },
  };
}

var locale = function(config) {
  return {
    test: /locales\/.+\.json$/,
    loader: 'bundle-loader',
    query: {
      name: '/locales/[name]',
    },
  };
};

var json = function(config) {
  return {
    test: /\.json$/,
    loader: 'json-loader',
  };
};

module.exports = {
  babel: babel,
  css: css,
  sass: sass,
  image: image,
  font: font,
  locale: locale,
  json: json,
};
