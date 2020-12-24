<template>
  <v-main class="d-flex align-center">
    <v-container class="d-flex justify-center">
      <v-progress-circular
        :size="50"
        color="indigo"
        indeterminate
      ></v-progress-circular>
    </v-container>
  </v-main>
</template>
<script>
import { mapActions } from "vuex";

export default {
  name: "OidcCallback",
  methods: {
    ...mapActions("oidcStore", ["oidcSignInCallback"]),
  },
  mounted() {
    this.oidcSignInCallback()
      .then((redirectPath) => {
        this.$router.push(redirectPath);
      })
      .catch(() => {
        this.$router.push("/oidc-callback-error"); // Handle errors any way you want
      });
  },
};
</script>
