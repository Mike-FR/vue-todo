<template>
  <div id="app">
    <ManyToMany/>
    <div style="float:left">
      <h1>{{ user.name }}</h1>

      <input type="text" v-model="form.title" />
      <button @click="addList">Add list</button>

      <ListComponent v-for="list in user.lists" :key="list.id" :list="list" />
    </div>
    <div style="float: right">
      <ul>
        <li v-for="item in user.items" :key="item.id" v-text="item.body"></li>
      </ul>
    </div>
  </div>
</template>

<script>
import List from "./classes/List";
import User from "./classes/User";
import ListComponent from "./components/List";
import ManyToMany from "./components/ManyToMany";

export default {
  name: "App",
  components: {
    ListComponent,
    ManyToMany
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
    addList() {
      List.insert({ data: this.form });
    },
  },
  beforeMount() {
    User.insert({
      data: [
        {
          id: 28,
          name: "Luke",
          email: "Luke@gmail.com",
          lists: [
            {
              id: 55,
              title: "shopping",
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
              title: "life goals",
            },
            {
              id: 52,
              title: "friends",
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
