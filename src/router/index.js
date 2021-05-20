import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/base',
    name: 'base',
    component: () => import('../views/baseControl.vue')
  },
  {
    path: '/form',
    name: 'form',
    component: () => import('../views/form.vue')
  },
  {
    path: '/find',
    name: 'find',
    component: () => import('../views/find.vue')
  },
  {
    path: '/grid',
    name: 'grid',
    component: () => import('../views/grid.vue')
  },
  {
    path: '/crud',
    name: 'crud',
    component: () => import('../views/crud/index.vue'),
    children: [
      {
        path: ':moduleId',
        name: 'crud-list',
        props: true,
        component: () => import('../views/crud/list.vue')
      }
    ]
  },
  {
    path: '/crud2/:moduleId',
    name: 'crud2',
    component: () => import('../views/crud/index2.vue') 
  },
  {
    path: '/plat',
    name: 'plat',
    component: () => import('../views/help/index.vue'),
    children: [
      {
        path: ':moduleId',
        name: 'plat-list',
        props: true,
        component: () => import('../views/help/list.vue')
      },
      {
        path: 'baseset',
        name: 'plat-baseset',
        component: () => import('../views/help/base/index.vue')
      },
      {
        path: 'excel',
        name: 'plat-excel',
        component: () => import('../views/help/excel.vue')
      }
    ]
  },
  {
    path: '/tocol',
    name: 'tocol',
    component: () => import('../views/tocol.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  // base: '/blog/',
  routes
})

// console.log('创建路由——————', router)
export default router
