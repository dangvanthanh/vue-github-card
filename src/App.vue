<template>
  <div class="app">
    <h1>Github card using Vue.js</h1>
    <github-card v-model="username"></github-card>
  </div>
</template>

<script>
import GithubCard from './components/GithubCard.vue'

export default {
  name: 'app',
  components: { GithubCard },
  data () {
    return {
      username: ''
    }
  }
}
</script>

<style>
.app {
  max-width: 768px;
  margin: 0 auto;
}
</style>
