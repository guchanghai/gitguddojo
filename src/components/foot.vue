<template>
  <div class="footer">
    <div class="background" />
    <b-container class="footer-links">
      <b-row>
        <b-col>About Us</b-col>
        <b-col>Support</b-col>
      </b-row>
      <b-row>
        <b-col>Blog</b-col>
        <b-col>Terms of Use</b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { APP_NAME } from "../constant/app-constants";

export default {
  data() {
    return {
      logoName: APP_NAME
    };
  }
};
</script>

<style scoped>
.footer {
  display: flex;
  position: relative;
  text-align: left;
  font-size: 36px;
}

.background {
  position: absolute;
  background-color: red;
  opacity: 0.6;
  line-height: 135px;
  width: 100%;
  height: 100%;
}

.footer-links {
  font-size: 16px;
  width: 20%;
  color: white;
  margin: 15px 0px 15px auto;
  font-weight: bold;
}

.col {
  cursor: pointer;
}
</style>
