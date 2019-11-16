<template>
  <!-- Sign Up Modal dialog -->
  <b-modal id="sign-up-modal" ref="susi-modal" @show="initOptions" centered hide-footer>
    <div class="sign-up-content">
      <b-row class="sign-up-item log-name">
        <b-button variant="danger" class="log-name-button sign-button">{{this.logoName}}!</b-button>
      </b-row>
      <b-row class="sign-up-item get-started">
        <b-col>GET STARTED!</b-col>
      </b-row>
      <div>
        <b-row class="sign-up-item terms">
          <b-col>By clicking Sign Up, you agreed to our Terms of use.</b-col>
        </b-row>
        <sign-up-options @signUpOptions="onSignUpOptions" v-if="!signUpOption" />
        <sign-up-with-email v-else-if="signUpOption === 'signUpWithEmail'" />
        <b-row class="sign-in-link">
          <b-col>
            Has account already?
            <b-link @click="singin" href>Sign In</b-link>
          </b-col>
        </b-row>
      </div>
    </div>
  </b-modal>
</template>

<script>
import { App } from "../constant/app-constants";
import signUpOptions from "../components/susi/sign-up-options";
import signUpWithEmail from "../components/susi/sign-up-with-email";

export default {
  components: {
    signUpOptions,
    signUpWithEmail
  },
  data() {
    return {
      logoName: App.APP_NAME,
      signUpOption: ""
    };
  },
  methods: {
    initOptions() {
      this.signUpOption = "";
    },
    onSignUpOptions(option) {
      this.signUpOption = option;
    },
    singin() {
      this.$bvModal.hide("sign-up-modal");
      this.$bvModal.show("sign-in-modal");
    }
  }
};
</script>

<style scoped>
.sign-up-content {
  align-items: center;
  text-align: center;
}

.sign-up-item {
  width: 40%;
  margin: 25px auto;
}

.sign-button {
  width: 400px;
  border-radius: 27px;
}

.terms {
  width: 80%;
  font-size: 12px;
}

.sign-in-link {
  font-size: 16px;
  margin: 20px 0px;
}
</style>
