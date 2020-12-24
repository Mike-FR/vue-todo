<template>
  <v-app>
    <AppBar/>
    <router-view />
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
.v-main {
  background-color: #e8eaf6;
}
</style>
