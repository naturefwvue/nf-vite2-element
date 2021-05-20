import { createApp } from 'vue'
import App from './App.vue'
import router from './router' // 路由
import store from './store-ds' // 轻量级状态

import websqlHelp from './store-websql/index'

// UI库
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale/lang/zh-cn'

// 拖拽
import dialogDrag from './control-web/js/dialogDrag.js'

const app = createApp(App)
app.config.devtools = true
app.config.productionTip = false

app.directive('mydrag', {
  mounted(el) {
    console.log('拖拽', el)
    alert('拖拽')
  }
})

app.use(router) // 路由
  .use(store) // 简易状态
  .use(websqlHelp) // 访问webSQL
  .use(dialogDrag) // 对话框的拖拽
  .use(ElementPlus, { locale, size: 'small' }) // UI库
  .mount('#app')
