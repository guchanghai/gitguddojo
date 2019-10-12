<template>
  <b-container class="sign-up">
    <b-row class="title">
      <b-col>Team Up and Git Gud!</b-col>
    </b-row>
    <b-row class="action">
      <b-col>
        <b-button class="sign-up-button" v-b-modal.sign-up-modal>Sign Up</b-button>
      </b-col>
    </b-row>
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
  </b-container>
</template>

<script>
  import { App } from '../constant/appConstants';

  export default {
    data(){
      return {
        logoName: App.APP_NAME
      }
    }
  }
</script>

<style scoped>
  .sign-up {
    color: white;
    font-weight: bold;
  }

  .title {
    font-size: 48px;
  }

  .sign-up-button {
    width: 15%;
    margin-top: 20px;
    font-size: 24px;
    color: white;
    font-weight: bold;
    border-radius: 17px;
    border-width: 2px;
    border-color: white;
    background-color: inherit;
  }

  .get-started {
    font-style: italic;
  }

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
