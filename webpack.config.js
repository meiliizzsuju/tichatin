const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  mode: 'none',
  entry: {
    home: './src/index.js',
    v2: './src/v2.js'
  },
  resolve: {
    alias: {
      jquery: path.resolve(__dirname, 'src/vendors/jquery.js'),
    }
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.(jpe?g|jpg|png|gif|svg|ico)$/i,
        use: [{
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                outputPath: 'images/'
            }
        }]
      },
      {
        test: /\.(woff|woff2|ttf|otf)$/,
        loader: 'file-loader',
        include: [/fonts/],
  
        options: {
          name: '[hash].[ext]',
          outputPath: 'css/',
          publicPath: url => '../css/' + url
        }
      },
      {
        test: /\.(html)$/,
        use: {
            loader: 'html-loader',
            options: {
                attrs: ['img:src', 'link:href']
            }
        }
      }
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'V1',
      filename: './src/v1.html'
    }),
    new HtmlWebpackPlugin({
      title: 'V2',
      filename: './src/v2/index.html'
    })
  ],
  output: {
    filename: '[name]bundle.js',
    path: path.resolve(__dirname, 'dist'),
  }
};
