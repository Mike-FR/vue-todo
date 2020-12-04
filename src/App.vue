<template>
  <div id="app">
    <List v-for="list in user.lists" :key="list.id" :list="list" />
  </div>
</template>

<script>
import List from "./classes/List";
import User from "./classes/User";
import ListComponent from "./components/List";

export default {
  name: "App",
  components: {
    List: ListComponent
  },
  data() {
    return {
      form: {
        title: "",
        user_id: 28
      }
    };
  },
  computed: {
    user() {
      return User.query()
        .with("lists.items")
        .with("items")
        .find(28);
    }
  },
  methods: {
    addList() {
      List.insert({ data: this.form });
    }
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
                  body: "banana"
                },
                {
                  id: 2,
                  body: "apple"
                }
              ]
            },
            {
              id: 50,
              title: "life goals"
            },
            {
              id: 52,
              title: "friends",
              items: [
                {
                  id: 12,
                  body: "Bob"
                },
                {
                  id: 22,
                  body: "Pete"
                }
              ]
            }
          ]
        }
      ]
    });
  }
};
</script>
