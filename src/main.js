//内部jsライブラリ読み込み
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import virtualCordova from "./virtualCordova.js";
import tes from "./mixins/tes";

//外部jsライブラリ読み込み
let script = document.createElement("script");
script.src =
  "https://maps.googleapis.com/maps/api/js?key=" +
  process.env.APIKEY_GOOGLE_ANDROID;
document.head.appendChild(script);

//外部cssライブラリ読み込み
import "vuetify/dist/vuetify.min.css";
import "../node_modules/leaflet/dist/leaflet.css";

//ライブラリ宣言
Vue.config.productionTip = false;
// Vue.mixin(tes);
virtualCordova.start();

//Vue初期化
new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
