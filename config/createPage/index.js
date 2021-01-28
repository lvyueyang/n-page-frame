const fse = require('fs-extra')
const path = require('path')
console.log('a')

const PAGE_PATH = path.join(__dirname, '../../src/pages')
const [, , name, type = 'default'] = process.argv // 项目名称
const p = path.join(PAGE_PATH, name);

(function () {
  if (fse.pathExistsSync(p)) {
    console.log('=======================================================================================')
    console.log(`   页面「 ${name} 」已存在！！！`)
    console.log('=======================================================================================')
    return
  }
  fse.copySync(path.join(__dirname, 'template', type), path.join(PAGE_PATH, name))
  if (fse.pathExistsSync(p)) {
    console.log('=======================================================================================')
    console.log(`   页面「 ${name} 」创建完成，使用 ${type} 环境`)
    console.log('   请重启项目')
    console.log('=======================================================================================')
  }
})()
