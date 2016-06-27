var GithubCard = { template: "<div class=github-card><div class=github-card__search><div class=github-card__form><input type=search placeholder=\"Type Github Username + Enter\" class=github-card__textfield v-model=username @keyup.enter=onSubmit></div></div><div class=github-card__profile v-if=\"msg.length > 0\"><div class=github-card__error>{{{msg}}}</div></div><div class=github-card__profile v-if=isFoundProfile><div class=github-card__header><div class=github-card__image><img v-bind:src=profile.avatar alt=\"\"></div><div class=github-card__name><a v-bind:href=profile.url target=_blank>{{profile.name}}</a></div><div class=github-card__location>{{profile.location}}</div></div><div class=github-card__status><div class=github-card__item><a v-bind:href=profile.reposUrl target=_blank><strong class=github-card__count>{{profile.repos}}</strong> <span class=github-card__muted>Repository</span></a></div><div class=github-card__item><a v-bind:href=profile.followersUrl target=_blank><strong class=github-card__count>{{profile.followers}}</strong> <span class=github-card__muted>Followers</span></a></div><div class=github-card__item><a v-bind:href=profile.followingUrl target=_blank><strong class=github-card__count>{{profile.following}}</strong> <span class=github-card__muted>Following</span></a></div></div></div></div>",
  data: function data() {
    return {
      username: '',
      profile: {},
      isFoundProfile: false,
      msg: ''
    };
  },

  props: {
    user: {
      type: String
    }
  },
  ready: function ready() {
    if (this.user) {
      this.username = this.user;
      this.onSubmit();
    }
  },

  methods: {
    onSubmit: function onSubmit() {
      var self = this;
      var urlGithubProfile = 'https://api.github.com/users/' + self.username;

      if (self.username.trim() === '') {
        return;
      }

      fetch(urlGithubProfile).then(function (res) {
        return res.json();
      }).then(function (data) {
        self.username = '';

        if (data.message === 'Not Found') {
          self.profile = {};
          self.isFoundProfile = false;
          self.msg = '\n              <h3>Oops !!!</h3>\n              <p>The component couldn\'t find github username the you were looking for. Try again.</p>\n            ';
          return;
        }

        self.msg = '';
        self.isFoundProfile = true;
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
        };
      });
    }
  }
};

var app = new Vue({
  el: 'body',
  components: {
    GithubCard: GithubCard
  }
});