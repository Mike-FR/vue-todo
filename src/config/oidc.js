export const oidcSettings = {
  authority: "http://localhost:8080/auth/realms/todo_realm",
  clientId: "todo-vue",
  redirectUri: "http://localhost:8081/oidc-callback",
  responseType: "id_token token",
  scope: "openid profile",
  post_logout_redirect_uri: "http://localhost:8081/"
};
