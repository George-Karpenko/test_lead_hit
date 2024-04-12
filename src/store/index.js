import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import initModuleUser from "./user";

export default function initNewStore(api) {
  let user = initModuleUser(api.auth);

  let store = new Vuex.Store({
    modules: {
      user,
    },
    strict: process.env.NODE_ENV !== "production",
  });

  return store;
}
