import Vue from "vue";
import Vuex from "vuex";
import VuexORM from "@vuex-orm/core";
import Item from "../classes/Item";
import User from "../classes/User";
import List from "../classes/List";

import { vuexOidcCreateStoreModule } from "vuex-oidc";
import { oidcSettings } from "../config/oidc";

Vue.use(Vuex);

const database = new VuexORM.Database();

database.register(Item);
database.register(User);
database.register(List);

export default new Vuex.Store({
  state: {
    search: "",
  },
  mutations: {
    searching(state, value) {
      state.search = value;
    },
  },
  getters: {
    searchValue: (state) => state.search,
  },
  modules: {
    oidcStore: vuexOidcCreateStoreModule(oidcSettings, {
      namespaced: true,
      isAuthenticatedBy: "access_token",
    }),
  },
  plugins: [VuexORM.install(database)],
});
