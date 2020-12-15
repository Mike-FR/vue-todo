import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import vuetify from "./plugins/vuetify";
// import Keycloak from "keycloak-js";
import VueLogger from "vuejs-logger";

Vue.use(VueLogger);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

// let initOptions = {
//   url: "http://localhost:8080/auth",
//   realm: "todo_realm",
//   clientId: "todo-vue",
//   onLoad: "login-required",
// };

// let keycloak = Keycloak(initOptions);

// keycloak
//   .init({ onLoad: initOptions.onLoad })
//   .then((auth) => {
//     if (!auth) {
//       window.location.reload();
//     } else {
//       Vue.$log.info("Authenticated");

//       new Vue({
//         router,
//         store,
//         vuetify,
//         render: (h) => h(App, { props: { keycloak: keycloak } }),
//       }).$mount("#app");
//     }

//     //Token Refresh
//     setInterval(() => {
//       keycloak
//         .updateToken(70)
//         .then((refreshed) => {
//           if (refreshed) {
//             Vue.$log.info("Token refreshed" + refreshed);
//           } else {
//             Vue.$log.warn(
//               "Token not refreshed, valid for " +
//                 Math.round(
//                   keycloak.tokenParsed.exp +
//                     keycloak.timeSkew -
//                     new Date().getTime() / 1000
//                 ) +
//                 " seconds"
//             );
//           }
//         })
//         .catch(() => {
//           Vue.$log.error("Failed to refresh token");
//         });
//     }, 6000);
//   })
//   .catch(() => {
//     Vue.$log.error("Authenticated Failed");
//   });
