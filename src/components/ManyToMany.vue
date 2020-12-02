<template>
  <div>
    <ul v-for="user in users" :key="user.id">
      <h1>{{ user.name }}</h1>
      <li v-for="role in user.roles" :key="role.id" v-text="role.title"></li>
    </ul>

    <button @click="changeRole">Update Role</button>
  </div>
</template>

<script>
import Role from "../classes/Role";
import User from "../classes/User";

export default {
  computed: {
    users() {
      return User.query()
        .with("roles")
        .get();
    },
  },
  mounted() {
    User.insert({
      data: [
        {
          id: 28,
          name: "Luke",
          email: "Luke@gmail.com",
          roles: [
            {
              id: 43,
              title: "admin",
            },
            {
              id: 44,
              title: "designer",
            },
          ],
        },
        {
          id: 29,
          name: "Aaron",
          email: "aaron@gmail.com",
          roles: [
            {
              id: 44,
              title: "designer",
            },
          ],
        },
      ],
    });
  },
  methods: {
    changeRole() {
      Role.update({
        where: 44,
        data: {
          title: "viewer",
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
