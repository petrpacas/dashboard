<template>
  <div class="panel panel-default">
    <div class="panel-heading">SB Lending</div>
    <div class="panel-body">
      <ul class="columns">
        <li class="columns-item" v-for="column in projectColumns">
          <h4>{{ column.name }}</h4>
          <ul class="issues">
            <li class="issues-item" v-for="card in column.cardsList">
              {{ card.id }}:
              <br>
              <a v-bind:href="card.issue.htmlUrl" target="_blank">{{ card.issue.title }}</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        projectColumns: {}
      }
    },
    methods: {
      getCards: function (toolkit, object, id, i) {
        toolkit.fromUrl('/projects/columns/' + id + '/cards').fetchAll((e1, value) => {
          this.$set(object[i], 'cardsList', value)
          for (var card = 0; card < object[i].cardsList.length; card++) {
            this.getIssue(toolkit, object[i], card)
          }
        })
      },
      getIssue: function (toolkit, object, i) {
        toolkit.fromUrl(object.cardsList[i].contentUrl).fetch((e2, value) => {
          this.$set(object.cardsList[i], 'issue', value)
        })
      }
    },
    mounted: function () {
      var Octokat = require('octokat')
      var octo = new Octokat({
        // put your own token here
        token: 'xxx',
        acceptHeader: 'application/vnd.github.inertia-preview+json'
      })

      octo.fromUrl('/projects/85268/columns').fetchAll((e, cols) => {
        this.projectColumns = cols
        for (var col = 0; col < cols.length; col++) {
          this.getCards(octo, this.projectColumns, this.projectColumns[col].id, col, 'cards')
        }
      })
    }
  }
</script>

<style lang="scss" scoped>
  .columns {
    width: 100%;
    overflow-x: scroll;
    display: flex;
    flex-direction: row;
    list-style: none;
    padding: 0;
    margin: 0;
    &-item {
      min-width: 300px;
      max-width: 300px;
      & + & {
        margin-left: 20px;
      }
    }
  }

  .issues {
    height: calc(100vh - 250px);
    overflow-y: scroll;
    list-style: none;
    padding: 10px;
    margin: 0;
    background: #eee;
    &-item {
      & + & {
        margin: 20px 0 0;
      }
    }
  }
</style>
