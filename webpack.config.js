module.exports = {
  context: __dirname,
  entry:   { 'SwiS': ['./src/index.js'] },
  output:  {
    filename:      '[name].js',
    library:       'SwiS',
    libraryTarget: 'umd',
    path:          __dirname + '/dist',
    publicPath:    '/'
  },

  externals: { 'lodash': 'umd lodash' },
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: { presets: ['es2015', 'stage-0'] }
    }]
  },

  resolve: {
    extensions: ['.js']
  }
};
