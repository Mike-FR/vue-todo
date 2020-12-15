<template>
  <div v-if="hasAccess">
    <AppBar />
    <v-layout fill-height>
      <v-container class="d-flex justify-center align-center">
        <router-link
          tag="button"
          :to="{ name: 'home' }"
          class="button"
          @click.prevent="authenticateOidc"
          >Se connecter</router-link
        >
      </v-container>
    </v-layout>
  </div>
</template>

<script>
import AppBar from "../components/AppBar";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Login",
  components: {
    AppBar,
  },
  computed: {
    ...mapGetters("oidcStore", ["oidcIsAuthenticated"]),
    hasAccess() {
      return this.oidcIsAuthenticated || this.$route.meta.isPublic;
    },
  },
  mounted() {
    if (this.oidcIsAuthenticated) {
      this.$router.push("/home");
    }
  },
  methods: {
    ...mapActions("oidcStore", ["authenticateOidc", "removeOidcUser"]),
  },
};
</script>

<style lang="scss" scoped>
.button {
  background: #3949ab;
  padding: 1rem 2rem;
  color: white;
  text-transform: uppercase;
  font-weight: 600;
  border-radius: 4px;
}
</style>
