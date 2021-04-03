import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Layout from "@/layout/index.vue"

Vue.use(VueRouter)

const routes = [ 
  {
    path: '/',
    name: 'Layout',
    component: Layout
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: Layout,
    redirect: '/user/userList',
    meta: {title: '用户', icon: 'user'},
    children: [
      //用户列表
      {
        path: 'userList',
        name: 'userList',
        component: () => import('@/views/user/list/index'),
        meta: {title: '用户列表', icon: 'list'}
      },
    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
