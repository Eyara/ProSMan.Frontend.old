import Vue from "vue";
import Router from "vue-router";

const Home = () => /* webpackChunkName: "home" */ import ("./views/Home.vue");
const Sprints = () => /* webpackChunkName: "sprints" */ import ("./views/Sprints.vue");
const Tasks = () => /* webpackChunkName: "tasks" */ import ("./views/Tasks/Tasks.vue");
const Login = () => /* webpackChunkName: "login" */ import ("./views/Login.vue");
const Today = () => /* webpackChunkName: "today" */ import ("./views/Today.vue");
const Dashboard = () => /* webpackChunkName: "home" */ import ("./views/Dashboard.vue");

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
