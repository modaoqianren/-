import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// 引入restet.css
import './assets/css/reset.css'

// 引入公共组件
import './components'

// 引入过滤器
import './filters'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import './less/element-variables.scss'
Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
