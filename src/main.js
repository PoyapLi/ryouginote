// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import store from './store'
import router from './router'

Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})

if (document.documentElement.clientWidth < 500) {
  const img = document.createElement('img');
  img.src = require('./assets/images/notice.png');
  img.style.position = 'fixed';
  img.style.left = '50%';
  img.style.top = '50%';
  img.style.transform = 'translate(-50%, -50%)';
  img.style.width = '300px';
  img.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
  img.style.zIndex = '101'
  document.body.appendChild(img);
}
