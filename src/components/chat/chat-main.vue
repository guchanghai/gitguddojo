<template>
  <!-- Chat Modal dialog -->
  <div v-if="dataReady">
    <div class="chat-content">
      <div class="chat-header">
        <div>{{chatUsers}}</div>
        <div>
          <span>
            <img class="chat-amount-img" src="../../assets/member-icon.png" />
          </span>
          <span class="chat-amount-text">{{chatUsersAmount}}</span>
        </div>
      </div>
      <b-list-group id="messages">
        <div v-for="message in chatMessage" :key="message.time.toString()">
          <b-list-group-item>
            <div class="message-content">
              <div class="message-header">
                <img src="../../assets/profile-header-icon.png" />
                <span class="message-user-name">{{ message.userName }}</span>
                <span class="message-time">{{ message.time.toLocaleString() }}</span>
              </div>
              <div class="message-body">{{ message.message }}</div>
            </div>
          </b-list-group-item>
        </div>
      </b-list-group>
      <b-form v-if="isCurrentChatActive" class="send-message-form">
        <b-form-textarea
          id="message"
          v-model="form.message"
          rows="2"
          placeholder="Enter your message..."
          autocomplete="off"
          v-on:keyup="keyMonitor"
        />
        <b-button class="send-button" variant="primary" @click="onSubmit">Send</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import qs from "qs";

export default {
  components: {},
  data() {
    return {
      socket: null,
      dataReady: false,
      historyRooms: [],
      form: {
        message: ""
      }
    };
  },
  async mounted() {
    let activeRoomId;

    // Create new room if new friends selected
    if (this.friends && this.friends.length) {
      // create a new room
      activeRoomId = await this.createChatRoom();

      // Clear the friends selected
      this.$store.commit("friends", []);
    }

    // Find history rooms
    await this.findChatHistory();

    // Continue the current room or select the first room
    if (!activeRoomId) {
      if (this.currentChatRoomId) {
        activeRoomId = this.currentChatRoomId;
      } else if (this.chatHistoryRooms[0]) {
        activeRoomId = this.chatHistoryRooms[0].id;
      }
    }

    // Set the new room or the first histroy room as the active room
    if (activeRoomId) {
      await this.$store.dispatch("changeRoom", activeRoomId);
    }

    this.dataReady = true;
  },
  methods: {
    initOptions() {},
    onSubmit() {
      if (this.activeSocket && this.activeSocket.emit) {
        this.activeSocket.emit("message", {
          from: this.profile.username,
          userId: this.profile.id,
          message: this.form.message
        });
        this.form.message = "";
      }
    },
    keyMonitor() {
      if (event.key == "Enter") {
        this.onSubmit();
      }
    },
    findChatHistory() {
      return axios
        .get("/api/chat/rooms", {
          params: {
            userId: this.profile.id
          }
        })
        .then(
          function(response) {
            this.$store.commit("chatHistoryRooms", response.data.rooms);
          }.bind(this)
        );
    },
    async createChatRoom() {
      const chatUsers = this.friends.map(friend => {
        return {
          id: friend.id,
          name: friend.name,
          streamId: friend.streamId
        };
      });

      chatUsers.push({
        id: this.profile.id,
        name: this.profile.username
      });

      const response = await axios.post(
        "/api/chat/room",
        qs.stringify({
          users: chatUsers
        })
      );

      const roomId = response.data.id;
      return roomId;
    },
    scrollMessage() {
      setTimeout(() => {
        this.$el.querySelector("#messages").scrollTop =
          this.$el.querySelector("#messages").scrollHeight + 112;
      }, 500);
    }
  },
  computed: {
    ...mapGetters([
      "activeSocket",
      "profile",
      "friends",
      "chatHistory",
      "currentChatRoom",
      "currentChatRoomId",
      "chatHistoryRooms"
    ]),
    chatUsersAmount() {
      return (this.currentChatRoom.userNames || "").split(",").length;
    },
    chatUsers() {
      return this.currentChatRoom.userNames;
    },
    chatMessage() {
      this.scrollMessage();
      return this.chatHistory;
    },
    isCurrentChatActive() {
      // status === 1 means the room is open at the server side
      return this.currentChatRoom && this.currentChatRoom.status === 1;
    }
  }
};
</script>

<style scoped>
.chat-content {
  text-align: left;
}

.chat-header {
  padding: 5px 20px;
  background-color: white;
  border-bottom-style: groove;
}

.chat-amount-img {
  width: 25px;
}

.chat-amount-text {
  vertical-align: bottom;
}

form {
  padding: 3px;
  bottom: 0;
  width: 80%;
  border-top-style: groove;
}

form textarea {
  outline: 1px;
  padding: 10px;
  width: 80%;
  height: 80px;
  margin-right: 0.5%;
  margin: 3px 0 0 3px;
  background-color: white;
}

form button {
  width: 20%;
  background: rgb(130, 224, 255);
  border: none;
  padding: 10px;
  margin-left: 10px;
}

#messages {
  list-style-type: none;
  padding: 0;
  max-height: 540px;
  overflow-y: auto;
  scroll-behavior: auto;
}

#messages li {
  padding: 2px 10px;
}

.message-header {
  text-align: left;
}

.message-user-name {
  margin: 0px 20px;
}

.message-body {
  text-align: left;
  margin-left: 80px;
}

#messages li:nth-child(odd) {
  background: #eee;
}

.send-message-form {
  display: inline-flex;
  position: fixed;
  bottom: 10px;
}

.send-button {
  font-size: 36px;
  font-weight: bold;
}
</style>
