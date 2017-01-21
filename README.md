# Vue Github Card

> Github card component using Vue.js

![](screenshot.png)

## Install

```
# yarn (recommend)
$ yarn install vue-github-card

# npm
$ npm install vue-github-card --save
```

## Usage

```html
<template>
	<div>
		<github-card v-model="username"></github-card>
	</div>
</template>

<script>
import GithubCard from 'vue-github-card'

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

## Build Setup

You can use [vue-cli](https://github.com/vuejs/vue-cli) with [vue-rollup-boilerplate](https://github.com/dangvanthanh/vue-rollup-boilerplate).

## License

MIT © [Dang Van Thanh](http://dangthanh.org)
