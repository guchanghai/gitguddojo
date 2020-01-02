<template>
  <div>
    <b-form>
      <b-form-group id="input-group-email" label-for="input-email">
        <b-form-input
          id="input-email"
          v-model="form.email"
          type="email"
          required
          placeholder="Email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-password" label-for="input-password">
        <b-form-input
          id="input-password"
          v-model="form.password"
          required
          type="password"
          placeholder="Password"
        ></b-form-input>
      </b-form-group>
    </b-form>
    <b-button calss="action-button" type="Sign Up" variant="primary" @click="onSubmit">Log In</b-button>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";

export default {
  data() {
    return {
      form: {
        email: "",
        userName: "",
        steamId: "",
        password: ""
      }
    };
  },
  methods: {
    async onSubmit(evt) {
      try {
        await axios.post(
          "/api/login/",
          qs.stringify({
            username: this.form.email,
            password: this.form.password
          })
        );

        this.$router.replace("main");
      } catch (error) {
        this.$store.commit("notification", "login in failed!");
      }

      evt.preventDefault();
    }
  }
};
</script>

<style scoped>
.form-control {
  margin: 0px auto;
  width: 70%;
}

.action-button {
  margin: 0px 20px;
}
</style>
