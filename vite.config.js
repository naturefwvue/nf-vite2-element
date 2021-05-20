import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from "path" // 主要用于alias文件路径别名

const pathResolve = (dir) => resolve(__dirname, ".", dir)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  devtools: true,
  resolve: {
    alias: {
      "/@": resolve(__dirname, ".", 'src'),
      "/config": pathResolve("public/config"),
      "/json": pathResolve("public/json"),
      "/com": pathResolve("src/components"),
      "/ctrl": pathResolve("src/control-web"),
      "/nf-control-web": pathResolve("packages/index.js"),
      "/comps": pathResolve("src/components"),
      "/views": pathResolve("src/views")
    }
  },
  // base: "vue3-blog", // 便于发布到gitee
  // 打包配置
  build: {
    target: 'modules',
    // outDir: 'dist', //指定输出路径
    // assetsDir: 'assets', // 指定生成静态资源的存放路径
    minify: 'terser' // 混淆器，terser构建后文件体积更小
  },
  // 本地运行配置，及反向代理配置
  server: {
    cors: true, // 默认启用并允许任何源
    open: false, // 在服务器启动时自动在浏览器中打开应用程序
    //反向代理配置，注意rewrite写法，开始没看文档在这里踩了坑
    proxy: {
      '/api': {
        target: 'http://localhost:9000',   //代理接口
        changeOrigin: true
        // rewrite: (path) => path // .replace(/^\/api/, '')
      }
    }
  }
})
