<template>
  <v-app-bar app color="indigo" dark>
    <v-app-bar-nav-icon
      ><template>
        <v-icon>mdi-format-list-bulleted</v-icon>
      </template></v-app-bar-nav-icon
    >

    <v-toolbar-title>Notes app</v-toolbar-title>

    <v-spacer v-if="oidcIsAuthenticated"></v-spacer>

    <v-text-field
      v-if="oidcIsAuthenticated"
      placeholder="Rechercher une liste..."
      prepend-inner-icon="mdi-magnify"
      filled
      dense
      clearable
      class="expanding-search mt-6"
      :class="{ closed: searchClosed && !search }"
      @focus="searchClosed = false"
      @blur="searchClosed = true"
      @input="$emit('searching', $event)"
    ></v-text-field>

    <v-menu v-if="oidcIsAuthenticated" left bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item @click="deleteAllList">
          <v-list-item-title>Tout supprimer</v-list-item-title>
        </v-list-item>
        <v-list-item @click.prevent="signOut">
          <v-list-item-title>Se déconnecter</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-tooltip v-if="oidcIsAuthenticated" bottom :nudge-bottom="16">
      <template v-slot:activator="{ on, attrs }">
        <v-icon v-bind="attrs" v-on="on">mdi-account-circle</v-icon>
      </template>
      <span>{{ oidcUser.email }}</span>
    </v-tooltip>
  </v-app-bar>
</template>

<script>
import List from "../classes/List";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      searchClosed: true,
      search: "",
    };
  },
  computed: {
    ...mapGetters("oidcStore", ["oidcIsAuthenticated", "oidcUser"]),
  },
  methods: {
    ...mapActions("oidcStore", ["signOutOidc"]),

    deleteAllList() {
      List.deleteAll();
    },
    signOut() {
      this.signOutOidc().then(() => {
        this.$router.push("/");
      });
    },
  },
};
</script>

<style lang="scss">
.v-input.expanding-search {
  transition: max-width 0.3s;
  max-width: 250px;
  .v-input__slot {
    cursor: pointer;
    &::before,
    &::after {
      border-color: transparent !important;
    }
  }
  &.closed {
    max-width: 45px;
    .v-input__slot {
      background: transparent !important;
    }
  }
}
</style>
