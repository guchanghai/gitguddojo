<template>
  <!-- Sign Up Modal dialog -->
  <b-modal id="sign-in-modal" @show="initOptions" centered hide-footer>
    <div class="sign-up-content">
      <b-row class="sign-up-item log-name">
        <b-button variant="danger" class="log-name-button sign-button">{{this.logoName}}!</b-button>
      </b-row>
      <b-row class="sign-up-item get-started">
        <b-col>GET STARTED!</b-col>
      </b-row>
      <div>
        <b-row class="sign-up-item terms">
          <b-col>By clicking Sign in, you agreed to our Terms of use.</b-col>
        </b-row>
        <sign-in-with-email />
        <b-row class="sign-up-item create-account">
          <b-col>Don’t have an account? <span class="sign-up-link" @click="onSignUpClicked">Sign Up</span></b-col>
        </b-row>
      </div>
    </div>
  </b-modal>
</template>

<script>
  import { App } from '../constant/app-constants';
  import signInWithEmail from '../components/susi/sign-in-with-email';

  export default {
    components: {
      signInWithEmail
    },
    data(){
      return {
        logoName: App.APP_NAME,
        signUpOption: ''
      }
    },
    methods: {
      initOptions(){
        this.signUpOption = '';
      },
      onSignUpOptions( option ){
        this.signUpOption = option;
      },
      onSignUpClicked(){
        this.$bvModal.hide( 'sign-in-modal' );
        this.$bvModal.show( 'sign-up-modal' );
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

  .create-account {
    width: 80%;
    font-size: 16px;
  }

  .sign-up-link {
    text-decoration: underline;
    cursor: pointer;
  }
</style>
