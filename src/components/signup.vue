<template>
  <b-container class="sign-up">
    <b-row class="title">
      <b-col>Team Up and Git Gud!</b-col>
    </b-row>
    <b-row class="action">
      <b-col>Sign Up</b-col>
    </b-row>
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

  .action {
    margin: 20px auto 0px auto;
    font-size: 24px;
    width: 15%;
    cursor: pointer;
  }

  .action .col {
    border: white 1px solid;
    border-radius: 17px;
  }
</style>
