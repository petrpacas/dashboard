<template>
<div class="panel panel-default">
  <div class="panel-heading">SB Lending</div>
  <div class="panel-body">
    <p>Project columns:</p>
    <ul>
      <li v-for="column in columns">
        {{ column.name }}
      </li>
    </ul>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      projectColumns: {
        cardsList: {}
      }
    }
  },
  mounted: function () {
    var Octokat = require('octokat')
    var octo = new Octokat({
      // put your own token here
      token: 'xxxxx',
      acceptHeader: 'application/vnd.github.inertia-preview+json'
    })

    // columns
    octo.fromUrl('/projects/85268/columns').fetchAll((e, cols) => {
      this.projectColumns = cols

      for (var col = 0; col < cols.length; col++) {
        var id = this.projectColumns[col].id
        octo.fromUrl('/projects/columns/' + id + '/cards').fetchAll((e2, cards) => {
          this.projectColumns[col].cardsList = cards
          // for (var card = 0; card < cards.length; card++) {
          //   this.projectColumns[col].cardsList = cards[card]
          // }
        })
      }
    })
  },
  computed: {
    columns: function () {
      if (this.projectColumns) {
        return this.projectColumns
      }
      return 'Uh-oh...'
    }
  }
}
</script>

<style></style>
