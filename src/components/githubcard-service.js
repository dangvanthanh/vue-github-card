let GithubCardService = {
  fetchUsername(username) {
    return new Promise(function (resolve, reject) {
      fetch(`https://api.github.com/users/${username}`)
        .then((res) => res.json())
        .then((data) => {
          resolve(data)
        })
    })
  },
  fetchReposByUsername(username) {
    return new Promise(function (resolve, reject) {
      fetch(`https://api.github.com/users/${username}/repos`)
        .then((res) => res.json())
        .then((data) => {
          resolve(data)
        })
    })
  }
}

export default GithubCardService
