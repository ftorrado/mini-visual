const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');

const debug = process.env.NODE_ENV !== "production";

const CSSModuleLoader = {
  loader: 'css-loader',
  options: {
    modules: true,
    sourceMap: true,
    localIdentName: debug ? '[local]__[hash:base64:5]' : '[hash:base64:5]',
    minimize: true
  }
};

const CSSLoader = {
  loader: 'css-loader',
  options: {
    modules: false,
    sourceMap: true,
    minimize: true
  }
};

const postCSSLoader = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    sourceMap: true,
    plugins: () => [
      autoprefixer({
        browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9']
      })
    ]
  }
};

module.exports = {
  entry: path.resolve(__dirname, 'lib/MiniVisual.js'),
  output: { /*Webpack producing results*/
    libraryTarget: 'umd',
    path: path.resolve(__dirname, "dist"),
    filename: "mini-visual-react.js",
  },
  mode: debug ? 'development' : 'production',
  devtool: debug ? 'inline-sourcemap' : false,
  module: {
    rules: [{
      test: /\.scss$/,
      exclude: /\.mod\.scss$/,
      use: [
        'style-loader',
        CSSLoader,
        postCSSLoader,
        'sass-loader',
      ],
    }, {
      test: /\.mod\.scss$/,
      use: [
        'style-loader',
        CSSModuleLoader,
        postCSSLoader,
        'sass-loader',
      ],
    }, {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
      },
    }],
    //noParse: [ '/dist/dummyD3.js' ],
  },
  /*resolve: {
    alias: {
      d3: './dist/dummyD3.js'
    }
  },*/
  externals: {
    d3: {
      root: 'd3',
      commonjs2: 'd3',
      commonjs: 'd3',
      amd: 'd3',
    },
    react: {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react',
    },
    'react-dom':  {
      root: 'ReactDOM',
      commonjs2: 'react-dom',
      commonjs: 'react-dom',
      amd: 'react-dom',
    },
  },
  plugins: debug ? [
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
  ] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
};
