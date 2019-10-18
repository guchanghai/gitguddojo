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
      <!-- sign-up-options /-->
      <sign-up-with-email />
    </div>
  </b-modal>
</template>

<script>
  import { App } from '../constant/app-constants';
  import signUpOptions from '../components/sign-up-options';
  import signUpWithEmail from '../components/sign-up-with-email';

  export default {
    components: {
      signUpOptions,
      signUpWithEmail
    },
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
