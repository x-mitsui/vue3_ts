const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
module.exports = {
  // 1.配置方式一: CLI提供的属性
  // outputDir: './build',
  // publicPath: './',
  // 2.配置方式二: 和webpack属性完全一致, 最后会进行合并

  configureWebpack: {
    resolve: {
      alias: {
        components: '@/components' //"@"对应"src"已经在vue源码中配置了
      }
    },
    //配置webpack自动按需引入element-plus，
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  }
}
