import Vue from 'vue'
import GithubCard from './components/githubcard.vue'

window.Vue = Vue

const app = new Vue({
  el: 'body',
  components: {
    GithubCard
  }
})
