import { createApp } from 'vue'
import App from './App.vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import router from "./router";
import store from "./store";

import './assets/theme.less'

createApp(App)
  .use(store)
  .use(router)
  .use(Antd)
  .mount('#app')