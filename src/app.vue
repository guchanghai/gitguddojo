<template>
  <div id="app-main">
    <router-view class="view"></router-view>
    <alert />
  </div>
</template>

<script>
import { CONST } from "./constant/app-constants";
import alert from "./dialogs/alert";

export default {
  name: CONST.APP_NAME,
  components: {
    alert
  }
};
</script>

<style>
body {
  margin: 0px;
}

#app-main {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: absolute;
  text-align: center;
  color: #2c3e50;
  height: 100%;
  width: 100%;
}
</style>
