import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login.vue'
import Notebooks from '@/components/NotebookList.vue'
import NoteDetail from "@/components/NoteDetail";
import TrashDetail from "@/components/TrashDetail";

Vue.use(Router)
// 解决控制台重复路由的报错
const originalReplace = Router.prototype.replace
Router.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err);
}

export default new Router({
  routes: [
    {
      path: '/',
      component: HelloWorld
    },
    {
      path: '/login',
      component: Login
    },
    {
      path:'/notebooks',
      component:Notebooks
    },
    {
      path:'/note',
      component:NoteDetail
    },
    {
      path:'/trash',
      component:TrashDetail
    }
  ]
})
