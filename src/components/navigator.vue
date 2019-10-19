<template>
  <div class="navigator">
    <div class="background"/>
    <div class="logo">
      {{ logoName }}
    </div>
    <b-button variant="outline-secondary" class="login" @click="showLoginDialog">Log In</b-button>
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
    },
    methods: {
      showLoginDialog(){
        this.$bvModal.show( 'sign-in-modal' );
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
    z-index: 1;
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
    z-index: 2;
  }

  .login {
    border: none;
    line-height: 36px;
    font-size: 24px;
    font-weight: bold;
    margin: auto 0px auto auto;
    color: white;
    z-index: 2;
  }

  .login_icon {
    display: flex;
    height: 70px;
    margin: auto 40px;
    z-index: 2;
  }
</style>
