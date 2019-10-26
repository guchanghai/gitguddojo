<template>
  <div id="app">
    <!-- landing/ -->
    <app-main/>
  </div>
</template>

<script>
  import { App } from './constant/app-constants';
  import landing from './pages/landing.vue'
  import appMain from './pages/app-main.vue'

  export default {
    name: App.APP_NAME,
    components: {
      landing,
      appMain
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
    position: absolute;
    text-align: center;
    color: #2c3e50;
    height: 100%;
    width: 100%;
  }
</style>
