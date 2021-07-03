import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Welcome from "../views/Welcome.vue";
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Welcome",
    component: Welcome,
  },
  {
    path: "/search",
    name: "Results",
    component: () => import("../views/Results.vue"),
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
