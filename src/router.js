import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store";
import Login from "./views/Login.vue";
import HomeLogged from "./views/HomeLogged.vue";
import OidcCallback from "./views/OidcCallback.vue";
import OidcCallbackError from "./views/OidcCallbackError.vue"
import { vuexOidcCreateRouterMiddleware } from 'vuex-oidc'

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
      meta: {
        title: "Login page",
        isPublic: true,
      },
    },
    {
      path: "/home",
      name: "home",
      component: HomeLogged,
      meta: {
        title: "Home page",
      },
    },
    {
      path: "/oidc-callback", // Needs to match redirectUri in you oidcSettings
      name: "oidcCallback",
      component: OidcCallback,
    },
    {
      path: "/oidc-callback-error",
      name: "oidcCallbackError",
      component: OidcCallbackError,
      meta: {
        isPublic: true,
      },
    },
  ],
});

router.beforeEach(vuexOidcCreateRouterMiddleware(store, "oidcStore"));

export default router;
