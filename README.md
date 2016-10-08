# Vue Github Card

> Github card component using Vue.js

![](screenshot.png)

## Usage

### .vue files

```html
<template>
	<div>
		<github-card v-model="username"></github-card>
	</div>
</template>

<script>
import GithubCard from 'GithubCard'

export default {
	data () {
		return {
			username: ''
		}
	},
	components {
		GithubCard
	}
}
</script>
```

### .html files

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Github card using Vue.js</title>
  <link rel="stylesheet" href="app.css">
</head>
<body>
	<div id="app">
	    <github-card v-model="username"></github-card>
	</div>
  <script src="https://vuejs.org/js/vue.min.js"></script>
  <script>
		var app = new Vue({
		  el: '#app',
		  components: {
		    GithubCard
		  }
		});
	</script>
</body>
</html>
```

## License

MIT © [Dang Van Thanh](http://dangthanh.org)
