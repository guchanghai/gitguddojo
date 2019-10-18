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
    <sign-up-dialog />
  </b-container>
</template>

<script>
  import signUpDialog from '../dialogs/sign-up-dialog';

  export default {
    components: {
      signUpDialog
    },
    data(){
      return {
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
</style>
