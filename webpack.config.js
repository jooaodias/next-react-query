/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');

const htmlWebPackPlugin = new HtmlWebPackPlugin({
  template: './public/index.html',
  filename: './index.html',
  hash: true,
});

const sassLoader = {
  test: /\.s[ac]ss$/i,
  exclude: /node_modules/,
  use: [
    // Creates `style` nodes from JS strings
    'style-loader',
    // Translates CSS into CommonJS
    'css-loader',

    //Compile the url()
    // 'url-loader',
    // Compiles Sass to CSS
    'sass-loader',
  ],
};

const alias = {
  _app: path.resolve('./', 'src', 'app'),
  _assets: path.resolve('./', 'src', 'assets'),
  _components: path.resolve('./', 'src', 'components'),
  _services: path.resolve('./', 'src', 'services'),
  _adapters: path.resolve('./', 'src', 'adapters'),
  _constants: path.resolve('./', 'src', 'constants'),
  _context: path.resolve('./', 'src', 'context'),
  _interfaces: path.resolve('./', 'src', 'interfaces'),
  _utils: path.resolve('./', 'src', 'utils'),
  _context: path.resolve('./', 'src', 'context'),
  'react-dom': '@hot-loader/react-dom',
};

const devServer = {
  static: path.join(__dirname, 'build'),
  compress: true,
  port: 4000,
  host: 'localhost',
};

const config = {
  mode: 'development',
  entry: ['./src/index.tsx'],
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
      },
      sassLoader,
    ],
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias,
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'main-[chunkhash].js',
    publicPath: '/',
  },

  devServer,

  plugins: [
    new ForkTsCheckerWebpackPlugin({
      async: false,
      eslint: {
        files: 'src',
      },
    }),
    htmlWebPackPlugin,
  ],
};

// export default config;
module.exports = () => {
  return config;
};
