<template>
  <div class="sign-up-options">
    <b-row class="sign-up-item with-email">
      <b-button variant="danger" class="log-name-button sign-button" @click="onSignUpWithEmail">Sign Up with Email</b-button>
    </b-row>
    <b-row class="sign-up-item with-facebook">
      <b-button variant="primary" class="log-name-button sign-button" @click="onSignUpWithFacebook">Sign Up with Facebook</b-button>
    </b-row>
    <b-row class="sign-up-item with-google">
      <b-button variant="primary" class="log-name-button sign-button" @click="onSignUpWithGoogle">Sign Up with Google</b-button>
    </b-row>
  </div>
</template>

<script>
  export default {
    data(){
      return {
      }
    },
    methods: {
      onSignUpWithEmail(){
        this.$emit( 'signUpOptions', 'signUpWithEmail' );
      },
      onSignUpWithGoogle(){
        window.location = '/api/auth/google/';
      },
      onSignUpWithFacebook(){
        window.location = '/api/auth/facebook/';
      }
    }
  }
</script>

<style scoped>
  .sign-up-item  {
    width: 45%;
    margin: 25px auto;
  }

  .sign-button {
    width: 400px;
    border-radius: 27px;
  }
</style>
