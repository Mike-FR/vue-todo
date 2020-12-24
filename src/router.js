import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store";
const Login = () => import("./views/Login.vue");
const HomeLogged = () => import("./views/HomeLogged.vue");
const OidcCallback = () => import("./views/OidcCallback.vue");
const OidcCallbackError = () => import("./views/OidcCallbackError.vue");

import { vuexOidcCreateRouterMiddleware } from "vuex-oidc";

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
    { path: "*", redirect: "/" },
  ],
});

router.beforeEach(vuexOidcCreateRouterMiddleware(store, "oidcStore"));

export default router;
