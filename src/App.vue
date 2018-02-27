<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view name="a"/>
    <router-view name="b"/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  height: 100%;
  padding: 0;
}
.column {
  float: left;
  padding-top: 50px;
}
body, html{
  margin: 0;
  padding:0;
  height: 100%;
}
</style>
