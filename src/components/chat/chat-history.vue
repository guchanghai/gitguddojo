<template>
  <div class="chat-history">
    <div class="history-title">Chat History</div>
    <b-list-group id="hisotry">
      <div v-for="history in chatHistoryRooms" :key="history.created">
        <b-list-group-item @click="onItemSelect(history.id)" :class="isCurrentRoom(history.id) ? 'current-history' : ''">
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
            this.$store.commit("currentChatRoom", roomId);
          }.bind(this)
        );
    },
    isCurrentRoom( roomId ){
      return roomId === this.currentChatRoomId;
    }
  },
  computed: {
    ...mapGetters(["chatHistoryRooms", "currentChatRoomId"])
  }
};
</script>

<style scoped>
#hisotry {
  height: 687px;
  overflow-y: scroll;
}

.current-history {
  background-color: cornsilk;
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
  text-align: left;
}
</style>
