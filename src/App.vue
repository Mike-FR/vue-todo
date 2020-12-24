<template>
  <v-app>
    <AppBar/>
    <router-view class="main" />
  </v-app>
</template>

<script>
import AppBar from "./components/AppBar";

export default {
  name: "App",
  components: {
    AppBar,
  },
};
</script>

<style lang="scss">
.main {
  background-color: #e8eaf6;
  height: 100%;
}
</style>
