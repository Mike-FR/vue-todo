<template>
  <v-app>
    <AppBar v-if="hasAccess" />
    <router-view />
  </v-app>
</template>

<script>
import AppBar from "./components/AppBar";
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    AppBar,
  },
  computed: {
    ...mapGetters("oidcStore", ["oidcIsAuthenticated"]),
    hasAccess() {
      return this.oidcIsAuthenticated || this.$route.meta.isPublic;
    },
  },
};
</script>

<style lang="scss">
.v-main {
  background-color: #e8eaf6;
}
</style>
