import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import initNewRouter from "./router";
import initNewHttp from "./api/http";
import initNewApi from "./api/index";
import initNewStore from "./store";
import subscribe from "./store/subscribe";

Vue.config.productionTip = false;
let http = initNewHttp();
let api = initNewApi(http);
let store = initNewStore(api);
let router = initNewRouter(store);

store.commit("user/initialiseStore");

subscribe(store);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
