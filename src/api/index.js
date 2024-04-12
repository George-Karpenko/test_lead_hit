import createAuthApi from "./auth";

export default (http) => ({
  auth: createAuthApi(http),
});
