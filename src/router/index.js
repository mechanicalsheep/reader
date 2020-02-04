import Vue from 'vue'
import VueRouter from 'vue-router'
import ReaderScreen from '../views/ReaderScreen'

Vue.use(VueRouter)

const routes = [
  {
    path: '/readerScreen',
    name: 'ReaderScreen',
    component: ReaderScreen
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
  },
  {
    path: '/',
    name: 'login',
    component: function(){
      return import('../views/Login.vue')
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
