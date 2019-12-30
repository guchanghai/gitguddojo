<template>
  <div class="chat-history">
    <div class="history-title">Chat History</div>
    <b-list-group id="hisotry">
      <div v-for="history in chatHistoryRooms" :key="history.created">
        <b-list-group-item @click="onItemSelect(history.id)">
          <div class="history-content">
            <div class="history-header">
              <img src="../../assets/profile-header-icon.png" />
              <span class="history-time">{{ history.created.toLocaleString() }}</span>
            </div>
            <div class="history-body">{{ history.userNames }}</div>
          </div>
        </b-list-group-item>
      </div>
    </b-list-group>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
// import qs from "qs";

export default {
  components: {},
  data() {
    return {
      // historyRooms: []
    };
  },
  mounted() {},
  methods: {
    onItemSelect(roomId) {
      axios
        .get("/api/chat/room", {
          params: {
            roomId
          }
        })
        .then(
          function(response) {
            this.$store.commit("chatHistory", response.data.history);
          }.bind(this)
        );
    }
  },
  computed: {
    ...mapGetters(["chatHistoryRooms"])
  }
};
</script>

<style scoped>
#hisotry {
  height: 687px;
  overflow-y: scroll;
}

.history-title {
  color: red;
  font-weight: bold;
  margin: 10px 0px;
  font-size: 18px;
}

.history-header {
  text-align: left;
}

.chat-amount-img {
  width: 25px;
}

.history-content {
  cursor: pointer;
}

.history-body {
  overflow: hidden;
}
</style>
