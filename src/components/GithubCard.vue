<template>
  <div class="github-card">
    <div class="github-card-search">
      <div class="github-card-form">
        <input type="search" placeholder="Type Github Username + Enter" class="github-card-textfield" v-model="username" @keyup.enter="onSubmit">
      </div>
    </div>
    <div class="github-card-profile" v-if="msg.length > 0">
      <div class="github-card-error">
        {{{msg}}}
      </div>
    </div>
    <div class="github-card-profile" v-if="isFoundProfile">
      <div class="github-card-header">
        <div class="github-card-image">
          <img v-bind:src="profile.avatar" alt="" />
        </div>
        <div class="github-card-name"><a v-bind:href="profile.url" target="_blank">{{profile.name}}</a></div>
        <div class="github-card-location">{{profile.location}}</div>
      </div>
      <div class="github-card-status">
        <div class="github-card-item">
          <a v-bind:href="profile.reposUrl" target="_blank">
              <strong class="github-card-item-count">{{profile.repos}}</strong>
              <span class="github-card-item-muted">Repository</span>
          </a>
        </div>
        <div class="github-card-item">
          <a v-bind:href="profile.followersUrl" target="_blank">
              <strong class="github-card-item-count">{{profile.followers}}</strong>
              <span class="github-card-item-muted">Followers</span>
          </a>
        </div>
        <div class="github-card-item">
          <a v-bind:href="profile.followingUrl" target="_blank">
              <strong class="github-card-item-count">{{profile.following}}</strong>
              <span class="github-card-item-muted">Following</span>
          </a>
        </div>
      </div>
    </div>
    <div class="github-card-repos" v-if="isFoundProfile && repos.length">
			<h3 class="github-card-repos-title">Top repository</h3>
      <div class="github-card-repo" v-for="repo in repos">
        <div class="github-card-item github-card-repo-name">
          <a v-bind:href="repo.repoUrl">{{repo.name}}</a>
        </div>
        <div class="github-card-item github-card-repo-language">{{repo.language}}</div>
        <div class="github-card-item github-card-repo-stars">
					<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 32 32"><path d="M31.881 12.557a2.303 2.303 0 0 0-1.844-1.511l-8.326-1.238-3.619-7.514C17.711 1.505 16.896 1 16 1s-1.711.505-2.092 1.294l-3.619 7.514-8.327 1.238A2.3 2.3 0 0 0 .12 12.557a2.207 2.207 0 0 0 .537 2.285l6.102 6.092-1.415 8.451a2.224 2.224 0 0 0 .948 2.203 2.351 2.351 0 0 0 2.449.131L16 27.811l7.26 3.908a2.367 2.367 0 0 0 2.449-.131 2.225 2.225 0 0 0 .947-2.203l-1.416-8.451 6.104-6.092c.603-.603.81-1.485.537-2.285zm-8.293 6.806a2.216 2.216 0 0 0-.627 1.934l1.416 8.451-7.26-3.906a2.361 2.361 0 0 0-2.235 0l-7.26 3.906 1.416-8.451a2.212 2.212 0 0 0-.626-1.934L2.31 13.271l8.326-1.24a2.306 2.306 0 0 0 1.743-1.268L16 3.251l3.62 7.513a2.31 2.31 0 0 0 1.742 1.268l8.328 1.24-6.102 6.091z"/></svg>
					{{repo.stars}}
				</div>
      </div>
    </div>
  </div>
</template>

<script>
import GithubCardService from '../services/githubcard'

export default {
  data () {
    return {
      profile: {},
      repos: [],
      isFoundProfile: false,
      msg: ''
    }
  },
  props: {
    username: {
      type: String
    }
  },
  ready () {
    if (this.username) {
      this.onSubmit()
    }
  },
  methods: {
    onSubmit () {
      let self = this

      if (self.username.trim() === '') {
        return
      }

			self.username = self.username.trim()

      GithubCardService.fetchUsername(self.username).then(self.getProfileByUsername)
      GithubCardService.fetchReposByUsername(self.username).then(self.getReposByUsername)
    },
    getProfileByUsername (data) {
      let self = this
      self.username = ''

       if (data.message === 'Not Found') {
         self.profile = {}
         self.isFoundProfile = false
         self.msg = `
           <h3>Oops !!!</h3>
           <p>The component couldn't find github username the you were looking for. Try again.</p>
         `
         return
       }

       self.msg = ''
       self.isFoundProfile = true
       self.profile = {
         name: data.name,
         avatar: data.avatar_url,
         location: data.location,
         url: data.html_url,
         repos: data.public_repos,
         reposUrl: data.html_url + '?tab=repositories',
         followers: data.followers,
         followersUrl: data.html_url + '/followers',
         following: data.following,
         followingUrl: data.html_url + '/following'
       }
    },
    getReposByUsername (data) {
      let self = this

   		let responseData = data.filter((d) => {
   			return d.stargazers_count > 0
   		}).sort((a, b) => {
   			return a.stargazers_count < b.stargazers_count ? 1 : -1
   		}).map((d) => {
   			return {
   				name: d.name,
   				stars: d.stargazers_count,
   				language: d.language,
   				repoUrl: d.html_url
   			}
   		})

   		if (responseData.length) {
   			self.repos = responseData
   		} else {
        self.repos = []
      }
    }
  }
}
</script>

<style>
.github-card {
  max-width: 25rem;
}

.github-card a {
  color: #444;
  transition: color .5s ease;
}

.github-card a:hover,
.github-card a:focus {
  color: #666;
}

.github-card-search {
  margin-bottom: 1rem;
}

.github-card-textfield {
  border: 1px solid rgba(34, 36, 38, .15);
  color: #444;
  font-size: 1rem;
  padding: .5rem;
  width: 100%;
}

.github-card-textfield:hover,
.github-card-textfield:focus {
  outline: none;
}

.github-card-error {
  padding: .5rem 1rem;
}

.github-card-profile {
  border: 1px solid #ddd;
}

.github-card-header {
  padding: .5rem .5rem .5rem 4.5rem;
  position: relative;
  min-height: 4.5rem;
}

.github-card-image {
  border-radius: 0.25rem;
  overflow: hidden;
  position: absolute;
  top: .5rem;
  left: .5rem;
  width: 3.5rem;
}

.github-card-image > img {
  max-width: 100%;
  height: auto;
}

.github-card-name > a {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1;
  text-decoration: none;
  margin-bottom: .25rem;
}

.github-card-status {
  border-top: 1px solid #ddd;
}

.github-card-item {
  border-left: 1px solid #ddd;
  display: inline-block;
  vertical-align: top;
  text-align: center;
  padding: .5rem .25rem;
  margin-right: -.25rem;
  width: 33.33333%;
}

.github-card-item:first-child {
  border-left: 0;
}

.github-card-item > a {
  text-decoration: none;
  cursor: pointer;
}

.github-card-count {
  display: block;
  font-size: 1.3rem;
  font-weight: 700;
}

.github-card-repos {
	border: 1px solid #ddd;
}

.github-card-repos-title {
	margin: .5rem;
	font-size: 16px;
	text-transform: uppercase;
}

.github-card-repo {
	border-top: 1px solid #ddd;
}

.github-card-repo:first-child {
	border-top: 0;
}

.github-card-repo-name a {
	color: #337ab7;
	display: block;
	text-align: left;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	padding: 0 .25rem;
}

.github-card-repo-name a:hover,
.github-card-repo-name a:focus {
	color: #337ab7;
	text-decoration: underline;
}
</style>
