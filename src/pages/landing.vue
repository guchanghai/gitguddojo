<template>
  <div class="landing-page">
    <navigator class="navigator-bar"/>
    <div class="main-action">
      <sign-up class="sign-up"/>
    </div>
    <foot class="foot-bar"/>
  </div>
</template>

<script>
  import foot from '../components/foot';
  import navigator from '../components/navigator';
  import signUp from '../components/sign-up';

  export default {
    components: {
      foot,
      navigator,
      signUp
    }
  }
</script>

<style scoped>
  .landing-page {
    position:absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;
    margin: 0 auto;
    background: url('../assets/r6-background.svg');
    background-size: cover;
  }

  .main-action {
    position: absolute;
    top: 40%;
    display: table;
    width: 100%;
  }

  .sign-up {
    display: table-cell;
    vertical-align: middle;
  }

  .foot-bar {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
  }
</style>
