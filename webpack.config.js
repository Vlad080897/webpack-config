const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev
const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const optimaze = () => {
  const config = {
    splitChunks: {
      chunks: 'all'
    }
  }
  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetsPlugin(),
      new TerserPlugin()
    ]
  }
  return config
}
const cssLoader = extra => {
  const loaders = [
    MiniCssExtractPlugin.loader,
    'css-loader'
  ]
  if (extra) {
    loaders.push(extra)
  }

  return loaders
}
const jsLoaders = extra => {
  const loader = [
    {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-react', '@babel/preset-env']
      }
    }
  ]
  if (extra) {
    loader[0].options.presets.push(extra)
  }
  return loader
}
const getPlugins = () => {
  const base = [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/assets/favico.ico'),
          to: path.resolve(__dirname, 'dist')
        }
      ]
    })
  ]

  if (isProd) {
    base.push(new BundleAnalyzerPlugin)
  }

  return base
}

module.exports = {
  entry: ['@babel/polyfill', './src/index.js'],
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist')
  },
  optimization: optimaze(),
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@models': path.resolve(__dirname, 'src/components')
    }
  },
  plugins: getPlugins(),
  devServer: {
    port: 3001,
    hot: isDev
  },
  devtool: isDev ? 'source-map' : false,
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: cssLoader()

      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: cssLoader('less-loader')
      },
      {
        test: /\.s[ac]ss$/,
        exclude: /node_modules/,
        use: cssLoader('sass-loader')
      },
      {
        test: /\.xml$/,
        exclude: /node_modules/,
        use: ['xml-loader']
      },
      {
        test: /\.csv$/,
        exclude: /node_modules/,
        use: ['csv-loader']
      },
      {
        test: /\.png|jpg|jpeg$/,
        exclude: /node_modules/,
        use: ['file-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders()
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: jsLoaders()
      },
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        use: jsLoaders('@babel/preset-typescript')
      }
    ]
  }
}