import Vue from 'vue'
import Router from 'vue-router'

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
      alias:'/notebooks',
      component: () => import('@/components/NotebookList.vue')
    },
    {
      path: '/login',
      component: () => import('@/components/Login.vue')
    },
    {
      path:'/note',
      component: () => import('@/components/NoteDetail.vue')
    },
    {
      path:'/trash',
      component: () => import('@/components/TrashDetail.vue')
    }
  ]
})
