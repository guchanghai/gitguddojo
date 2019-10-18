<template>
  <div class="navigator">
    <div class="background"/>
    <div class="logo">
      {{ logoName }}
    </div>
    <div class="login">
      Log In
    </div>
    <div class="login_icon">
      <img src="../assets/login.svg">
    </div>
  </div>
</template>

<script>
  import { App } from '../constant/app-constants';

  export default {
    data(){
      return {
        logoName: App.APP_NAME
      }
    }
  }
</script>

<style scoped>
  .background {
    position: absolute;
    background-color: black;
    opacity: 0.3;
    line-height: 135px;
    width: 100%;
    height: 100%;
  }

  .navigator {
    display: flex;
    position: relative;
    text-align: left;
    font-size: 36px;
    font-weight: bold;
    color: white;
  }

  .logo {
    line-height: 68px;
    margin: auto 0px auto 80px;
    color: white;
  }

  .login {
    line-height: 68px;
    font-size: 24px;
    margin: auto 0px auto auto;
    color: white;
  }

  .login_icon {
    display: flex;
    height: 70px;
    margin: auto 40px;
  }
</style>
