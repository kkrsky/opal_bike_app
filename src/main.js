//内部jsライブラリ読み込み
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import checkAuthBeforeRoute from "./router/checkAuthBeforeRoute.js";
import helpers from "./mixins/helpers";

//for test
import virtualCordova from "./virtualCordova.js";
// virtualCordova.start();

//cssライブラリ読み込み
import "vuetify/dist/vuetify.min.css";
// import "../node_modules/leaflet/dist/leaflet.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";

//ライブラリ宣言
Vue.config.productionTip = false;
Vue.mixin(helpers);

// Vue.mixin(tes);

//Vue初期化
new Vue({
  router,
  store,
  vuetify,
  helpers,
  render: (h) => h(App),
}).$mount("#app");
