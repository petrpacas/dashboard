<template>
  <div class="row">
    <div class="col-sm-3">
      <div class="panel panel-default">
        <div class="panel-heading">@{{ user.login }}</div>
        <div class="panel-body">
          <p><img class="img-responsive" :src="user.avatarUrl" alt="User's profile picture"></p>
        </div>
      </div>
    </div>

    <div class="col-sm-9">
      <div class="panel panel-default">
        <div class="panel-heading">SB Lending</div>
        <div class="panel-body">
        <p>List of open issues:</p>
        <ul>
          <li v-for="issue in issues">[{{ issue.number }}] <a :href="issue.htmlUrl" target="_blank">{{ issue.title }}</a></li>
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
      userData: {},
      issuesList: {}
    }
  },
  mounted: function () {
    var Octokat = require('octokat')
    var octo = new Octokat({
      token: 'xxx'
      // put your own token here
    })

    octo.user.fetch((e, val) => {
      this.userData = val
    })

    octo.repos('enrian', 'sblending').issues.fetchAll((e, val) => {
      var allIssues = val
      var trueIssues = {}

      for (var i = 0; i < allIssues.length; i++) {
        if (!allIssues[i].hasOwnProperty('pullRequest')) {
          trueIssues[i] = allIssues[i]
        }
      }

      this.issuesList = trueIssues
    })
  },
  computed: {
    user: function () {
      if (this.userData) {
        return this.userData
      }
      return 'Uh-oh...'
    },
    issues: function () {
      if (this.issuesList) {
        return this.issuesList
      }
      return 'Uh-oh...'
    }
  }
}
</script>

<style></style>
