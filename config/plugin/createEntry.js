const path = require('path')
const fs = require('fs')
const fse = require('fs-extra')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const SRC_PATH = path.join(__dirname, '../../src')
const PAGE_PATH = path.join(SRC_PATH, 'pages')

function initEntry ({ include } = {}) {
  const includesPages = include?.split(',') || []
  let pages = fs.readdirSync(PAGE_PATH)
  if (process.env.NODE_ENV === 'development' && includesPages.length > 0) {
    pages = pages.filter((page) => includesPages.includes(page))
    console.log(`编译 ${include} 页面`)
  } else {
    console.log('编译全部页面')
  }
  const entry = {}
  const htmlWebpackPlugins = []
  for (const page of pages) {
    const entryHtml = path.join(PAGE_PATH, `${page}/index.html`)
    const entryJs = path.join(PAGE_PATH, `${page}/index.js`)
    const isHtmlExist = fse.pathExistsSync(entryHtml)
    // 之所以不判断 js 是为了用报错做提醒用
    if (isHtmlExist) {
      if (!entryJs) {
        throw new Error(`${page} 缺少 index.js 文件`)
      }
      entry[page] = path.join(PAGE_PATH, `./${page}/index.js`)
      htmlWebpackPlugins.push(
        new HtmlWebpackPlugin({
          filename: `${page}/index.html`,
          template: entryHtml,
          chunks: [page],
          minify: false
        })
      )
    }
  }

  return {
    entry,
    htmlWebpackPlugins
  }
}

module.exports = initEntry
