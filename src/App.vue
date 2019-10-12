<template>
  <div id="app">
    <landing/>
  </div>
</template>

<script>
  import { App } from './constant/appConstants';
import Landing from './components/landing.vue'

export default {
  name: App.APP_NAME,
  components: {
    Landing
  }
}
</script>

<style>
  body {
    margin: 0px;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 100%;
  }
</style>
