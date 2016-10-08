<template>
	<div class="github-container">
		<github-card v-model="username"></github-card>
	</div>
</template>

<script>
import GithubCard from './githubcard.vue'

export default {
  data () {
    return {
			username: ''
		}
  },
  components: {
		GithubCard
	}
}
</script>

<style>
*,
*:before,
*:after {
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
}

body {
	margin: 0;
	color: #444;
	font-size: 16px;
}

.github-container {
	max-width: 25rem;
	margin: 50px auto;
}
</style>
