<template>
  <v-app>
    <!-- Must have the app property -->
    <v-app-bar app color="indigo" dark>
      <v-app-bar-nav-icon
        ><template>
          <v-icon>mdi-format-list-bulleted</v-icon>
        </template></v-app-bar-nav-icon
      >

      <v-toolbar-title>Notes app</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="() => {}">
            <v-list-item-title @click="deleteAllList"
              >Tout supprimer</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main class="main">
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
          <List v-for="list in user.lists" :key="list.id" :list="list" />
        </v-container>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import List from "./classes/List";
import User from "./classes/User";
import ListComponent from "./components/List";

export default {
  name: "App",
  components: {
    List: ListComponent,
  },
  data() {
    return {
      form: {
        title: "",
        user_id: 28,
      },
    };
  },
  computed: {
    user() {
      return User.query()
        .with("lists.items")
        .with("items")
        .find(28);
    },
  },
  methods: {
    createList() {
      List.insert({ data: this.form });
      this.form.title = "";
    },
    deleteAllList() {
      List.deleteAll();
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
      ],
    });
  },
};
</script>

<style lang="scss">
.main {
  background-color: #e8eaf6;
}
.create-input {
  width: 500px;
}
</style>
