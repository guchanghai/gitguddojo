<template>
  <div class="sign-up-options">
    <b-row class="sign-up-item with-email">
      <b-button variant="danger" class="log-name-button sign-button">Sign Up with Email</b-button>
    </b-row>
    <b-row class="sign-up-item with-facebook">
      <b-button variant="primary" class="log-name-button sign-button ">Sign Up with Facebook</b-button>
    </b-row>
    <b-row class="sign-up-item with-google">
      <b-button variant="primary" class="log-name-button sign-button">Sign Up with Google</b-button>
    </b-row>
  </div>
</template>

<script>
  export default {
    data(){
      return {
      }
    }
  }
</script>

<style scoped>
  .sign-up-item  {
    width: 40%;
    margin: 25px auto;
  }

  .sign-button {
    width: 400px;
    border-radius: 27px;
  }
</style>
