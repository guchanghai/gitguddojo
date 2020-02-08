<template>
  <div class="main-action">
    <div>
      <b-button
        class="action-button main-button"
        variant="outline-primary"
        @click="lookForGroup"
      >Look for new group!</b-button>
    </div>
    <div>
      <b-button class="action-button" variant="info" @click="backToChatRoom">Back to chat room!</b-button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    lookForGroup(evt) {
      this.$router.replace("/main/friend");
      evt.preventDefault();
    },
    backToChatRoom(evt) {
      this.$store.commit("mode", "chat");
      this.$router.replace("/main/chat");
      evt.preventDefault();
    }
  }
};
</script>

<style scoped>
.main-action {
  margin: 300px auto 0px auto;
  align-items: center;
}

.action-button {
  margin: 20px;
  height: 45px;
  width: 25%;
  font-size: 24px;
  border-radius: 25px;
  color: black;
  font-weight: bold;
}

.main-button {
  height: 60px;
  width: 30%;
  font-size: 28px;
  background-color: white;
}
</style>