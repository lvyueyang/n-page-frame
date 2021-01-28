## 基本之外的操作
1. 可以在 package.json script.start 后面添加参数，只编译指定的页面  
``` sh 
"webpack serve --env development --env include=vue-demo"
```  
2. 可以使用 `npm run create [页面名称] [页面类型]` 来快速创建新的页面  
``` sh
# 创建一个 无框架 类型的页面
npm run create pageName  
# 创建一个 vue 类型的页面
npm run create pageName vue  
# 创建一个 react 类型的页面
npm run create pageName react 

```