<template>
  <div id="app">
    <!--<div class="navbar">-->
      <!--<router-link to="/">Buffer View</router-link>-->
      <!--<router-link to="hex">Hex View</router-link>-->
      <!--<router-link to="data">Data View</router-link>-->
    <!--</div>-->
    <router-view/>
  </div>
</template>

<script>
import PlainView from "./components/PlainView";
export default {
  name: 'App',
  components: {PlainView}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
  .navbar {
    margin-bottom: 2rem;
  }
</style>
