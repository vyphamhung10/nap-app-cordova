const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  context: __dirname + '/lib',
  entry: {
    app: './index.js',
  },
  output: {
    path: __dirname + '/www/bundle',
    filename: '[name].js',
    publicPath: '',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
      },
      {
        test:/\.scss$/,
        use:['style-loader','css-loader', 'sass-loader']
     },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                // minimize: true,
                sourceMap: true,
                importLoaders: 1,
              }
            },
            'postcss-loader',
          ],
        }),
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('[name].css'),
  ],

  devServer: {
    contentBase: __dirname + '/www',
  },

  devtool: 'eval-source-map'
};

if (process.env.NODE_ENV === 'production') {
  config.devtool = 'source-map';
}

module.exports = config;
