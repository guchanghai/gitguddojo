<template>
  <div id="app">
    <landing/>
  </div>
</template>

<script>
  import { App } from './constant/app-constants';
  import landing from './pages/landing.vue'

  export default {
    name: App.APP_NAME,
    components: {
      landing
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
