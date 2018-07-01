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
  mode: 'production',
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader'
    }]
  },
  resolve: {
    extensions: ['.js']
  }
};
