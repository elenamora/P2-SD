import Vue from 'vue'
import Router from 'vue-router'
import Events from '@/components/Events.vue'
import Login from '@/components/Login.vue'
import createAccount from '@/components/createAccount.vue'
import CreateEvent from '@/components/CreateEvent.vue'
import updateEvent from '@/components/updateEvent.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Events',
      component: Events
    },
    {
      path: '/userlogin',
      name: 'Login',
      component: Login
    },
    {
      path: '/newaccount',
      name: 'createAccount',
      component: createAccount
    },
    {
      path: '/createEvent',
      name: 'createEvent',
      component: CreateEvent
    },
    {
      path: '/updateEvent',
      name: 'updateEvent',
      component: updateEvent
    }
  ]
})
