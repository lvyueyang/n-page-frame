const path = require('path')
const { ProgressPlugin, DefinePlugin } = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const createEntry = require('./config/plugin/createEntry')
const babelOptions = require('./babel.config')

const ROOT_PATH = process.cwd()
const PORT = 9001

module.exports = (env) => {
  const { entry, htmlWebpackPlugins } = createEntry({ include: env.include })
  let devtool = 'eval-cheap-module-source-map'
  const NODE_ENV = process.env.NODE_ENV
  if (NODE_ENV === 'production') {
    devtool = 'source-map'
  }

  return {
    entry,
    output: {
      path: path.join(ROOT_PATH, 'dist'),
      filename: '[name]_[fullhash].js'
    },
    devtool,
    devServer: {
      contentBase: path.join(ROOT_PATH, 'dist'),
      compress: true,
      hot: true,
      historyApiFallback: true,
      port: PORT
    },
    plugins: [
      new CleanWebpackPlugin(),
      ...htmlWebpackPlugins,
      new ProgressPlugin((percentage) => {
        if (percentage !== 1 || NODE_ENV === 'production') return
        setTimeout(() => {
          console.log('=======================================================================================')
          console.log('   启动成功')
          for (const page of Object.keys(entry)) {
            console.log(`   http://127.0.0.1:${PORT}/${page}`)
          }
          console.log('=======================================================================================')
        }, 0)
      }),
      new DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }),
      new VueLoaderPlugin()
    ],
    module: {
      rules: [
        {
          test: /\.less$/,
          use: ['style-loader', 'css-loader', 'less-loader']
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.vue$/,
          use: ['vue-loader']
        },
        {
          test: /\.m?(js)|(jsx)$/,
          exclude: /(node_modules|bower_components)/,
          include: path.resolve(__dirname, 'src'),
          use: {
            loader: 'babel-loader',
            options: babelOptions
          }
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: ['file-loader']
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource'
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.vue', '.less', '.css']
    }
  }
}
