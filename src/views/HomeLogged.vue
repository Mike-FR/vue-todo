<template>
  <div>
    <AppBar @searching="search = $event" />
    <v-main>
      <v-container>
        <v-text-field
          v-model="form.title"
          label="Créer une nouvelle note..."
          solo-inverted
          counter
          maxlength="25"
          @keydown.enter="createList"
          class="create-input mt-12 mx-auto"
        >
          <template #append>
            <v-fade-transition>
              <v-icon v-if="form.title" color="orange" @click="createList">
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
      form: {
        title: "",
        user_id: 28,
      },
      search: "",
    };
  },
  computed: {
    ...mapGetters("oidcStore", ["oidcIsAuthenticated", "oidcUser"]),
    user() {
      return User.find(28);
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
      List.insert({ data: this.form });
      this.form.title = "";
    },
  },
  beforeMount() {
    User.insert({
      data: [
        {
          id: 28,
          name: "Mike",
          email: "mike@gmail.com",
          lists: [
            {
              id: 55,
              title: "Courses",
              items: [
                {
                  id: 1,
                  body: "banana",
                },
                {
                  id: 2,
                  body: "apple",
                },
              ],
            },
            {
              id: 50,
              title: "Achats",
            },
            {
              id: 52,
              title: "Anniversaire",
              items: [
                {
                  id: 12,
                  body: "Bob",
                },
                {
                  id: 22,
                  body: "Pete",
                },
              ],
            },
          ],
        },
        {
          id: 29,
          name: "Laura",
          email: "laura@gmail.com",
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
                  body: "coca",
                },
              ],
            },
          ],
        },
      ],
    });
  },
};
</script>

<style lang="scss">
.create-input {
  width: 500px;
}
</style>
