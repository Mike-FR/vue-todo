<i18n>
{
  "fr": {
    "createPlaceholder": "Créer une nouvelle note..."
  },
  "en": {
    "createPlaceholder": "Create a new note..."
  }
}
</i18n>

<template>
  <div>
    <AppBar @searching="search = $event" />
    <v-main>
      <v-container>
        <v-text-field
          v-model="listTitle"
          :label="$t('createPlaceholder')"
          solo-inverted
          counter
          maxlength="25"
          @keydown.enter="createList"
          class="create-input mt-12 mx-auto"
        >
          <template #append>
            <v-fade-transition>
              <v-icon v-if="listTitle" color="orange" @click="createList">
                mdi-plus-circle
              </v-icon>
            </v-fade-transition>
          </template>
        </v-text-field>
        <v-container class="d-flex flex-wrap mt-6">
          <List v-for="list in filteredLists" :key="list.id" :list="list" />
        </v-container>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import List from "../classes/List";
import User from "../classes/User";
import ListComponent from "../components/List";
import AppBar from "../components/AppBar";

import { mapGetters } from "vuex";

export default {
  name: "HomeLogged",
  components: {
    List: ListComponent,
    AppBar,
  },
  data() {
    return {
      listTitle: "",
      search: "",
    };
  },
  computed: {
    ...mapGetters("oidcStore", ["oidcUser"]),
    user() {
      return User.find(this.oidcUser.sub);
    },
    filteredLists() {
      return List.query()
        .where("user_id", this.user.id)
        .where("title", (value) =>
          value.toLowerCase().includes(this.search.toLowerCase())
        )
        .get();
    },
  },
  methods: {
    createList() {
      List.insert({
        data: { title: this.listTitle, user_id: this.oidcUser.sub },
      });
      this.listTitle = "";
    },
  },
  beforeMount() {
    if (this.oidcUser.sub === "67edcc6e-f338-4544-af51-2c220f67250b") {
      User.insert({
        data: {
          id: this.oidcUser.sub,
          name: this.oidcUser.name,
          email: this.oidcUser.email,
          lists: [
            {
              id: 50,
              title: "Achats",
            },
            {
              id: 55,
              title: "Courses",
              items: [
                {
                  id: 1,
                  body: "bananes",
                },
                {
                  id: 2,
                  body: "pommes",
                },
              ],
            },
            {
              id: 52,
              title: "Anniversaire",
              items: [
                {
                  id: 12,
                  body: "Jean",
                },
                {
                  id: 22,
                  body: "Fred",
                },
              ],
            },
          ],
        },
      });
    } else if (this.oidcUser.sub === "7edad362-d5eb-47cd-aa60-e3b9b8b8dd68") {
      User.insert({
        data: {
          id: this.oidcUser.sub,
          name: this.oidcUser.name,
          email: this.oidcUser.email,
          lists: [
            {
              id: 56,
              title: "Courses",
              items: [
                {
                  id: 21,
                  body: "fraises",
                },
                {
                  id: 11,
                  body: "coca-cola",
                },
              ],
            },
          ],
        },
      });
    }
  },
};
</script>

<style lang="scss">
.create-input {
  width: 500px;
}
</style>
