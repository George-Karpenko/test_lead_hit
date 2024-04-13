import Vue from "vue";
import VueRouter from "vue-router";
import AuthorizationView from "../views/AuthorizationView.vue";

Vue.use(VueRouter);

export default function initNewRouter(store) {
  const routes = [
    {
      path: "/",
      name: "authorization",
      component: AuthorizationView,
      async beforeEnter(from, to, next) {
        store.getters["user/userIdSite"] ? next({ name: "analytics" }) : next();
      },
    },
    {
      path: "/analytics",
      name: "analytics",
      component: () => import("../views/AnalyticsView.vue"),
      async beforeEnter(from, to, next) {
        !store.getters["user/userIdSite"]
          ? next({ name: "authorization" })
          : next();
      },
    },
    {
      path: "/:any(.*)",
      async beforeEnter(from, to, next) {
        !store.getters["user/userIdSite"]
          ? next({ name: "authorization" })
          : next({ name: "analytics" });
      },
    },
  ];
  const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
  });

  return router;
}
