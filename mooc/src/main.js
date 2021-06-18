import { createApp } from 'vue'
import App from './App.vue'
import installElementPlus from './plugins/element'
import router from './router'
import axios from 'axios';
import VueAxios from 'vue-axios';
import * as echarts from 'echarts'

const app = createApp(App)
app.use(router)
app.use(VueAxios,axios);
app.config.globalProperties.echarts = echarts;
installElementPlus(app)
app.mount('#app')