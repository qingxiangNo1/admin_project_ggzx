import { createApp } from 'vue'
import App from '@/App.vue'
//引入element-plus插件与样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//配置element-plus国际化
//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
//引入路由
import router from './router'
//引入仓库
import pinia from './store'
//获取应用实例对象
const app = createApp(App)
//element-plus国际化配置
app.use(ElementPlus, {
  locale: zhCn,
})
//安装elementui-plus插件
app.use(ElementPlus)
//安装仓库
app.use(pinia)
//svg需要的配置代码
import 'virtual:svg-icons-register'
//使用自定义函数：注册全局组件
import globalComponent from '@/components'
app.use(globalComponent)
//引入全局样式
import '@/styles/index.scss'
// 注册模板路由
app.use(router)

//将应用挂载到挂载点上
app.mount('#app')
//测试axios
