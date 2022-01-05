// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import {MessageBox,Dropdown,DropdownItem,DropdownMenu,Dialog,Input} from 'element-ui'
import App from './App'
import store from './store'
import router from './router'

Vue.use(Dialog)
Vue.use(Input)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.config.productionTip = false
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;

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
