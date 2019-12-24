<template>
  <!-- Chat Modal dialog -->
  <b-modal id="chat-modal" ref="chat-modal" @show="initOptions" centered hide-footer>
    <div class="chat-content">
      <b-list-group id="messages">
        <div v-for="message in messages" :key="message.time.toString()">
          <b-list-group-item>{{ message.content }}</b-list-group-item>
        </div>
      </b-list-group>
      <b-form class="send-message-form">
        <b-form-input id="message" v-model="form.message" autocomplete="off" />
        <b-button variant="primary" @click="onSubmit">Send</b-button>
      </b-form>
    </div>
  </b-modal>
</template>

<script>
import axios from "axios";
import io from "socket.io-client";
import qs from "qs";

export default {
  components: {},
  data() {
    return {
      messages: [],
      form: {
        message: ""
      }
    };
  },
  mounted() {
    axios
      .post(
        "/api/chat/room",
        qs.stringify({
          userId: "1",
          users: ["1"]
        })
      )
      .then(function(response) {
        const roomId = response.data.id;

        this.socket = io.connect(`/api/chat/${roomId}`);
        this.socket.on(
          "welcome-message",
          function(msg) {
            this.messages.push({
              time: new Date(),
              content: msg
            });
          }.bind(this)
        );
        this.socket.on(
          "broadcast-message",
          function(msg) {
            this.messages.push({
              time: new Date(),
              content: msg
            });
          }.bind(this)
        );
      }.bind( this ));
  },
  methods: {
    initOptions() {},
    onSubmit() {
      this.socket.emit("message", this.form.message);
    }
  }
};
</script>

<style scoped>
form {
  padding: 3px;
  bottom: 0;
  width: 100%;
}
form input {
  outline: 1px;
  padding: 10px;
  width: 70%;
  margin-right: 0.5%;
  margin: 3px 0 0 3px;
  background-color: white;
}
form button {
  width: 25%;
  background: rgb(130, 224, 255);
  border: none;
  padding: 10px;
  margin-left: 10px;
}
#messages {
  height: 300px;
  list-style-type: none;
  padding: 0;
}
#messages li {
  padding: 5px 10px;
}
#messages li:nth-child(odd) {
  background: #eee;
}
.send-message-form {
  display: inline-flex;
}
</style>
