module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {loader: 'style-loader'},
          {loader: 'css-loader', options: { importLoaders: 1 }},
          {loader: 'postcss-loader'}
        ],
        include: __dirname + '/src'
      }
    ],
    plugins: [
      new webpack.DefinePlugin({
        '__VUE_OPTIONS_API__': JSON.stringify(true),
        '__VUE_PROD_DEVTOOLS__': JSON.stringify(false)
      }),
    ]
  }
}
