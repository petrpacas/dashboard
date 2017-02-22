import Vue from 'vue'
import Router from 'vue-router'
import Test from 'components/Test'
import DoneWeekly from 'components/DoneWeekly'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'DoneWeekly',
      component: DoneWeekly
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    }
  ]
})
