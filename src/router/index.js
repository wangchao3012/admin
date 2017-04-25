import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '@/App'

import Home from '@/page/home'
import login from '@/page/login'
import Index from '@/page/index' 

import user_list from '@/page/user/list' 
import role_list from '@/page/role/list' 
import menu_list from '@/page/menu/list' 

import demo_table from '@/page/demo/table'
import demo_echart from '@/page/demo/echart'
import demo_modal from '@/page/demo/modal'


Vue.use(VueRouter)


const routes = [
  {
    path: '/login',
    name: 'login',
    component: login,

  },
  {
    path: '/',
    name: 'index',
    component: Index,
    children: [
      {
        path: 'user/list',
        component: user_list
      },
      {
        path: 'role/list',
        component: role_list
      },
      {
        path: 'menu/list',
        component: menu_list
      }, 
      {
        path: '/demo/table',
        component: demo_table
      }
      ,
      {
        path: '/demo/echart',
        component: demo_echart,
      },
      {
        path: '/demo/modal',
        component: demo_modal,
      }
    ]
  }

]

export default new VueRouter({
  mode: 'history',
  routes
}) 