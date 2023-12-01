import './assets/base.scss';
// 引入vant所需样式
import 'vant/es/dialog/style'
import './assets/fontIcon/iconfont.css'
import './assets/fontIcon2/iconfont.css'
import { createApp } from 'vue'
// import { createPinia } from 'pinia'
import pinia from './stores/store';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
