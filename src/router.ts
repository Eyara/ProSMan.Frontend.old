import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Sprints from "./views/Sprints.vue";
import Tasks from "./views/Tasks/Tasks.vue";
import Login from "./views/Login.vue";
import Today from "./views/Today.vue";
import Dashboard from "./views/Dashboard.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/sprints",
      name: "sprints",
      component: Sprints
    },
    {
      path: "/tasks",
      name: "tasks",
      component: Tasks
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/today",
      name: "today",
      component: Today
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard
    }
  ]
});
