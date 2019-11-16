<template>
  <div class="main-action">
    <b-button
      class="main-action-button"
      variant="outline-primary"
      @click="lookForGroup"
    >Look for group!</b-button>
  </div>
</template>

<script>
export default {
  methods: {
    lookForGroup(evt) {
      this.$router.replace("/main/friend");
      evt.preventDefault();
    }
  }
};
</script>

<style scoped>
.main-action {
  margin: 300px auto 0px auto;
}

.main-action-button {
  height: 60px;
  width: 30%;
  border-radius: 25px;
  font-size: 28px;
  background-color: white;
  color: black;
  font-weight: bold;
}
</style>