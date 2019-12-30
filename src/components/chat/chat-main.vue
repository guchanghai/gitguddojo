<template>
  <!-- Chat Modal dialog -->
  <div>
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
        <div v-for="message in chatHistory" :key="message.time.toString()">
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
      <b-form class="send-message-form">
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
import io from "socket.io-client";
import qs from "qs";

export default {
  components: {},
  data() {
    return {
      historyRooms: [],
      form: {
        message: ""
      }
    };
  },
  mounted() {
    const self = this;
    this.joinChatRoom().then(() => {
      // set
      // to include the new created room
      self.findChatHistory();
    });
  },
  methods: {
    initOptions() {},
    onSubmit() {
      this.socket.emit("message", {
        from: this.profile.username,
        userId: this.profile.id,
        message: this.form.message
      });
      this.form.message = "";
    },
    keyMonitor() {
      if (event.key == "Enter") {
        this.onSubmit();
      }
    },
    findChatHistory() {
      axios
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
    joinChatRoom() {
      return axios
        .post(
          "/api/chat/room",
          qs.stringify({
            userId: this.profile.id,
            users: this.friends
          })
        )
        .then(
          function(response) {
            const roomId = response.data.id;
            // Set current room ID
            this.$store.commit("currentChatRoom", roomId);

            this.socket = io.connect(`/api/chat/${roomId}`);
            this.socket.on(
              "welcome-message",
              function(message) {
                this.$store.commit('chatHistory', []);
                this.$store.commit('chatMessage', message);
              }.bind(this)
            );
            this.socket.on(
              "broadcast-message",
              function(message) {
                this.$store.commit('chatMessage', message);

                setTimeout(() => {
                  this.$el.querySelector("#messages").scrollTop =
                    this.$el.querySelector("#messages").scrollHeight + 112;
                }, 500);
              }.bind(this)
            );
          }.bind(this)
        );
    }
  },
  computed: {
    ...mapGetters(["profile", "friends", "chatHistory"]),
    chatUsersAmount() {
      return this.friends ? this.friends.length : 0;
    },
    chatUsers() {
      return this.friends
        ? this.friends.map(user => user.name).join(" , ")
        : "";
    },
    chatMessage() {
      return this.chatHistory;
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
