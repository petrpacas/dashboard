<template>
<div class="panel panel-default">
  <div class="panel-heading">SB Lending</div>
  <div class="panel-body">
    <p>Project columns:</p>
    <ul>
      <li v-for="column in projectColumns">
        {{ column.name }}
        <ul>
          <li v-for="card in column.cardsList">
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
  mounted: function () {
    var Octokat = require('octokat')
    var octo = new Octokat({
      // put your own token here
      token: 'xxx',
      acceptHeader: 'application/vnd.github.inertia-preview+json'
    })

    var getCards = function (columns, columnsId, column) {
      octo.fromUrl('/projects/columns/' + columnsId + '/cards').fetchAll((er, cards) => {
        columns[column].cardsList = cards
      })
    }

    octo.fromUrl('/projects/85268/columns').fetchAll((e, cols) => {
      this.projectColumns = cols
      for (var col = 0; col < cols.length; col++) {
        getCards(this.projectColumns, this.projectColumns[col].id, col)
      }
    })
  }
}
</script>

<style></style>
