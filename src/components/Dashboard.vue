<template>
  <div class="panel panel-default">
    <div class="panel-heading">SB Lending</div>
    <div class="panel-body">
      <ul class="columns">
        <li class="columns-item" v-for="column in projectColumns">
          <h5>{{ column.name }}</h5>
          <ul class="cards">
            <li class="cards-item" v-for="card in column.cardsList">
              {{ card.id }}
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
        toolkit.fromUrl('/projects/columns/' + id + '/cards').fetchAll((e, value) => {
          this.$set(object[i], 'cardsList', value)
        })
      },
      getIssue: function (toolkit, object, i) {
        toolkit.fromUrl(object.cardsList[i].contentUrl).fetchAll((e, value) => {
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
          // for (var card = 0; card < this.projectColumns[col].cardsList.length; card++) {
          //   this.getIssue(octo, this.projectColumns[col], card)
          // }
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
      min-width: 200px;
      max-width: 200px;
    }
  }

  .cards {
    height: 50vh;
    overflow-y: scroll;
    list-style: none;
    padding: 0 0 0 20px;
    margin: 0;
    &-item {
      margin: 5px 0 0;
    }
  }
</style>
