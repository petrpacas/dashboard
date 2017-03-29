<template>
  <div id="app">

    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="#">Dashboard</a>
        </div>

        <div class="collapse navbar-collapse" id="navbar">
          <ul class="nav navbar-nav navbar-right">
            <li><router-link to="/test"><span class="glyphicon glyphicon-globe"></span> Test link</router-link></li>
          </ul>
        </div>
      </div>
    </nav>

    <main class="container-fluid">
      <router-view></router-view>
    </main>

  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style src="./styles.scss" lang="scss"></style>
