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
      {
        path: 'updateUser',
        name: 'updateUser',
        component: () => import('@/views/user/list/update'),
        meta: {title: '用户修改', icon: 'list'}
      },
    ]
  },
  {
    path: '/sounds',
    name: 'sounds',
    component: Layout,
    redirect: '/sounds/soundsList',
    meta: {title: '音效', icon: 'sounds'},
    children: [
      //音效列表
      {
        path: 'soundsList',
        name: 'soundsList',
        component: () => import('@/views/sounds/list/index'),
        meta: {title: '音效列表', icon: 'list'}
      },
      {
        path: 'updateSound',
        name: 'updateSound',
        component: () => import('@/views/sounds/list/update'),
        meta: {title: '修改音效', icon: 'list'}
      },

      //产品分类
      {
        path: 'category',
        name: 'category',
        component: () => import('@/views/sounds/category/index'),
        meta: {title: '分类列表', icon: 'product-add'}
      },
      
      {
        path: 'addCategory',
        name: 'addCategory',
        component: () => import('@/views/sounds/category/add'),
        meta: {title: '添加分类', icon: 'product-add'}
      },

      {
        path: 'updateCategory',
        name: 'updateCategory',
        component: () => import('@/views/sounds/category/update'),
        meta: {title: '修改分类', icon: 'product-add'}
      },

    ]
  },

]

const router = new VueRouter({
  routes
})

export default router
