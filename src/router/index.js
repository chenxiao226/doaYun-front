import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "../components/Layout.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "/",
        name: "Main",
        component: () =>
          import(/* webpackChunkName: "main" */ "../views/Main.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },{
    path: "/register",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/Register.vue"),
  },{
    path:"/forget",
    name:"Forget",
    component: () =>
      import(/* webpackChunkName: "forget" */ "../views/Forget.vue"),
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
