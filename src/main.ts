import './assets/base.scss';
import './assets/fontIcon/iconfont.css'
import './assets/fontIcon2/iconfont.css'
import 'amfe-flexible' // rem 布局适配

// 引入vant所需样式
import 'vant/es/dialog/style'
// import 'vant/es/toast/style'

import { createApp } from 'vue'

// 引入pinia
// import { createPinia } from 'pinia'
import pinia from './stores/store';

import App from './App.vue'
import router from './router'
import 'amfe-flexible' // rem 布局适配


const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
