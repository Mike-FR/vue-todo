<template>
  <div>
    <AppBar />
    <v-layout fill-height>
      <v-container class="d-flex justify-center align-center">
        <v-progress-circular
          :size="50"
          color="indigo"
          indeterminate
        ></v-progress-circular>
      </v-container>
    </v-layout>
  </div>
</template>

<script>
import AppBar from "../components/AppBar";
import { mapActions } from "vuex";

export default {
  name: "OidcCallback",
  components: {
    AppBar
  },
  methods: {
    ...mapActions("oidcStore", ["oidcSignInCallback"])
  },
  mounted() {
    this.oidcSignInCallback()
      .then(redirectPath => {
        this.$router.push(redirectPath);
      })
      .catch(err => {
        console.error(err);
        this.$router.push("/oidc-callback-error"); // Handle errors any way you want
      });
  }
};
</script>

<style lang="scss" scoped></style>
