// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueResource from 'vue-resource'
import GitHubAPI from 'vue-github-api'
import App from './App'
import router from './router'

Vue.use(VueResource)
Vue.use(GitHubAPI, { token: 'your access token' })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

Vue.GitHubAPI.get('/projects', {}, [this.myGitHubData, 'projects'])
