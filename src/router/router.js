import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/cascade',
      name: 'cascade',
      component: () => import('../views/Cascade/QueryBox.vue'),
      meta: {
        title: '行政区划罗列查询框'
      }
    },
    {
      path: '/testPage',
      name: 'testPage',
      component: () => import('../components/TestPage1.vue'),
      meta: {
        title: '测试页面'
      }
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About.vue')
    }
  ]
})
