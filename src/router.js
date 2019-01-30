import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Sprints from './views/Sprints.vue'
import Tasks from './views/Tasks/Tasks.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home 
    },
    {
      path: '/sprints',
      name: 'sprints',
      component: Sprints
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: Tasks
    }
  ]
})
