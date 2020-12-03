import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Upload from '../views/Upload.vue'
import Thought from '../views/Stream.vue'
import Hi from '../views/Hi.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/upload',
    name: 'upload',
    component: Upload
  },
  {
    path: '/thought',
    name: 'thought',
    component: Thought
  },
  {
    path: '/hi',
    name: 'hi',
    component: Hi
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
