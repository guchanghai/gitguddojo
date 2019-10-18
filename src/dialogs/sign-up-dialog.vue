<template>
  <!-- Sign Up Modal dialog -->
  <b-modal id="sign-up-modal" centered hide-footer>
    <div class="sign-up-content">
      <b-row class="sign-up-item log-name">
        <b-button variant="danger" class="log-name-button sign-button" v-b-modal.sign-up-modal>{{this.logoName}}!</b-button>
      </b-row>
      <b-row class="sign-up-item get-started">
        <b-col>GET STARTED!</b-col>
      </b-row>
      <b-row class="sign-up-item terms">
        <b-col>By clicking Sign Up, you agreed to our Terms of use.</b-col>
      </b-row>
      <b-row class="sign-up-item with-email">
        <b-button variant="danger" class="log-name-button sign-button" v-b-modal.sign-up-modal>Sign Up with Email</b-button>
      <b-col></b-col>
      </b-row>
      <b-row class="sign-up-item with-facebook">
        <b-button variant="primary" class="log-name-button sign-button " v-b-modal.sign-up-modal>Sign Up with Facebook</b-button>
      </b-row>
      <b-row class="sign-up-item with-google">
        <b-button variant="primary" class="log-name-button sign-button" v-b-modal.sign-up-modal>Sign Up with Google</b-button>
      </b-row>
    </div>
  </b-modal>
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
  .sign-up-content {
    align-items: center;
    text-align: center;
  }

  .sign-up-item  {
    width: 40%;
    margin: 25px auto;
  }

  .sign-button {
    width: 400px;
    border-radius: 27px;
  }

  .terms {
    width: 80%;
    font-size: 12px;
  }
</style>
