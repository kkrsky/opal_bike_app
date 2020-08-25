import Vue from "vue";
import VueRouter from "vue-router";
import Auth from "../api/auth.js";

//views
import TopPage from "../views/TopPage.vue";
import TitlePage from "../views/TitlePage.vue";
import TopHome from "../views/TopHome.vue";
import TopBike from "../views/TopBike.vue";
import TopRecord from "../views/TopRecord.vue";
import TopProfile from "../views/TopProfile.vue";
import TopSetting from "../views/TopSetting.vue";
import Login from "../views/Login.vue";
import SignUp from "../views/SignUp.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "TopPage",
    component: TopPage,
    meta: { requiredAuth: true }, //コンポーネントの表示には認証が必要と定義する
    beforeEnter: (to, from, next) => {
      if (to.matched.some((record) => record.meta.requiredAuth)) {
        Auth.currentAuthenticatedUser("isAuth 2") // 認証済みのユーザが存在するかどうかをチェックする関数
          .then(() => {
            next();
          })
          .catch((error) => {
            console.error(error);
            next({
              path: "title",
              query: { redirect: to.fullPath },
            });
          });
      }
      next();
    },
  },
  {
    path: "/topHome",
    name: "topHome",
    component: TopHome,
  },
  {
    path: "/topBike",
    name: "topBike",
    component: TopBike,
  },
  {
    path: "/topRecord",
    name: "topRecord",
    component: TopRecord,
  },
  {
    path: "/topProfile",
    name: "topProfile",
    component: TopProfile,
  },
  {
    path: "/topSetting",
    name: "topSetting",
    component: TopSetting,
  },
  {
    path: "/notifications",
    name: "notifications",
    component: TopSetting,
  },

  // {
  //   path: "/about",
  //   name: "home",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
  {
    path: "/title",
    name: "title",
    component: TitlePage,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/signUp",
    name: "signUp",
    component: SignUp,
  },
];

const router = new VueRouter({
  // mode: "history", //これだと実機でrouterが動かない
  base: "/",
  routes,
  scrollBehavior(to, from, savedPosition) {
    // console.log("savedPosition", savedPosition, to, from);
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

export default router;
