<template>
  <div v-if="show" class="main-notification">
    <b-alert :show="show" variant="warning" @dismissed="dissmissed">
      <p class="content">{{this.notification.content}}</p>
    </b-alert>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {
    dissmissed() {
      this.$store.commit("notification", {
        content: "",
        dismissSecs: 0
      });
    }
  },
  computed: {
    ...mapGetters(["notification"]),
    show() {
      return this.notification.dismissSecs;
    }
  }
};
</script>

<style scoped>
.main-notification {
  position: absolute;
  width: 400px;
  height: 100px;
  margin: -50px 0 0 -200px;
  top: 50%;
  left: 50%;
  z-index: 9999;
}

.content {
  font-size: 36px;
  margin-top: 10px;
}
</style>