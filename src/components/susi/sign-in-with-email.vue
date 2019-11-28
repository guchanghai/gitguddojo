<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
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

      <b-button calss="action-button" type="Sign Up" variant="primary">Log In</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: "",
        userName: "",
        steamId: "",
        password: ""
      },
      show: true
    };
  },
  methods: {
    onSubmit(evt) {
      this.$router.replace("/main");
      evt.preventDefault();
    },
    onReset(evt) {
      evt.preventDefault();

      // Reset our form values
      this.form.email = "";
      this.form.password = "";

      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
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
