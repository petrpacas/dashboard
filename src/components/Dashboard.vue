<template>
<div class="panel panel-default">
  <div class="panel-heading">SB Lending</div>
  <div class="panel-body">
  <div class="row">
    <div class="col-sm-6">
      <p>Project columns:</p>
      <ul>
        <li v-for="column in columns">
          {{ column.name }}
        </li>
      </ul>
    </div>
    <div class="col-sm-6">
      <p>Project cards:</p>
      <ul>
        <li v-for="card in cardsList">{{ card.id }}</li>
      </ul>
    </div>
    <!-- <div class="col-sm-6">
      <p>List of open issues:</p>
      <ul>
        <li v-for="issue in issues">[{{ issue.number }}] <a :href="issue.htmlUrl" target="_blank">{{ issue.title }}</a></li>
      </ul>
    </div> -->
  </div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      projectColumns: {},
      cardsList: {},
      issuesList: {}
    }
  },
  mounted: function () {
    var Octokat = require('octokat')
    var octo = new Octokat({
      // put your own token here
      token: 'xxx',
      acceptHeader: 'application/vnd.github.inertia-preview+json'
    })

    // columns
    octo.fromUrl('/projects/85268/columns').fetchAll((e, val) => {
      this.projectColumns = val

      for (var i = 0; i < this.projectColumns.length; i++) {
        // var id = this.projectColumns[i].id

        octo.fromUrl(this.projectColumns[i].cardsUrl).fetchAll((e2, val2) => {
          // for (var n = 0; n < val2.length; n++) {
          //   console.log(val2[n].content())
          // }
          this.cardsList = val2
        })
      }
    })

    // // issues
    // octo.repos('enrian', 'sblending').issues.fetchAll((e, val) => {
    //   var allIssues = val
    //   var trueIssues = {}

    //   for (var i = 0; i < allIssues.length; i++) {
    //     if (!allIssues[i].hasOwnProperty('pullRequest')) {
    //       trueIssues[i] = allIssues[i]
    //     }
    //   }

    //   this.issuesList = trueIssues
    // })
  },
  computed: {
    columns: function () {
      if (this.projectColumns) {
        return this.projectColumns
      }
      return 'Uh-oh...'
    },
    cards: function () {
      if (this.cardsList) {
        return this.cardsList
      }
      return 'Uh-oh...'
    }
    // issues: function () {
    //   if (this.issuesList) {
    //     return this.issuesList
    //   }
    //   return 'Uh-oh...'
    // }
  }
}
</script>

<style></style>
