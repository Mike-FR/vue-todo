<i18n>
{
  "fr": {
    "buttonLabel": "Se connecter"
  },
  "en": {
    "buttonLabel": "Login"
  }
}
</i18n>

<template>
  <v-main v-if="hasAccess" class="d-flex align-center">
    <v-container class="d-flex justify-center">
      <router-link
        tag="button"
        :to="{ name: 'home' }"
        class="button"
        @click.prevent="authenticateOidc"
        >{{ $t("buttonLabel") }}</router-link
      >
    </v-container>
  </v-main>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Login",
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
    ...mapActions("oidcStore", ["authenticateOidc"]),
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
