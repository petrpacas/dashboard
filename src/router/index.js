import Vue from 'vue'
import Router from 'vue-router'
import Test from 'components/Test'
import Dashboard from 'components/Dashboard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    }
  ]
})
