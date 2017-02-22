<template>
  <div class="row">
    <div class="col-sm-3">
      <div class="panel panel-default">
        <div class="panel-heading">@{{ user.login }}</div>
        <div class="panel-body">
          <p><img class="img-responsive" :src="user.avatar_url" alt="User's profile picture"></p>
        </div>
      </div>
    </div>

    <div class="col-sm-9">
      <div class="panel panel-default">
        <div class="panel-heading">SB Lending</div>
        <div class="panel-body">
        <p>List of open issues:</p>
        <ul>
          <li v-for="issue in issues">{{ issue.title }}</li>
        </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      myGitHubData: {}
    }
  },
  mounted: function () {
    this.GitHubAPI.get('/user', {}, [this.myGitHubData, 'userData'])
    this.GitHubAPI.get('/repos/enrian/sblending/issues', {}, [this.myGitHubData, 'sblendingIssues'])
  },
  computed: {
    user: function () {
      if (this.myGitHubData.userData) {
        return this.myGitHubData.userData
      }
      return '...uh oh...'
    },
    issues: function () {
      if (this.myGitHubData.sblendingIssues) {
        return this.myGitHubData.sblendingIssues
      }
      return '...uh oh...'
    }
  }
}
</script>

<style></style>
