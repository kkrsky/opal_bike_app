//内部jsライブラリ読み込み
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import firebase from "firebase";
import { firebaseConfig } from "./config/config.js";
import dotenv from "dotenv";
import checkAuthBeforeRoute from "./router/checkAuthBeforeRoute.js";
import Fcm from "./fcm.js";

//for test
import virtualCordova from "./virtualCordova.js";
import tes from "./mixins/tes";
// virtualCordova.start();

// window.alert("main.js mounted");
window.document.addEventListener("deviceready", () => {
  console.log("main.js deviceready");
  Fcm.init();
});

//外部jsライブラリ読み込み
dotenv.config();
firebase.initializeApp(firebaseConfig);
let script = window.document.createElement("script");
script.src =
  "https://maps.googleapis.com/maps/api/js?key=" +
  process.env.APIKEY_GOOGLE_ANDROID +
  "&callback=initMap";
window.initMap = function() {
  console.log("google1", window.google);
};
window.document.head.appendChild(script);
// checkAuthBeforeRoute.init(router);

//cssライブラリ読み込み
import "vuetify/dist/vuetify.min.css";
import "leaflet/dist/leaflet.css";
import "@ansur/leaflet-pulse-icon/dist/L.Icon.Pulse.css";
import "leaflet.locatecontrol/dist/L.Control.Locate.css";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import "animate.css/animate.css";
import "@mdi/font/css/materialdesignicons.css";
import "@fortawesome/fontawesome-free/js/fontawesome";
import "@fortawesome/fontawesome-free/js/solid";
import "@fortawesome/fontawesome-free/js/regular";

//ライブラリ宣言
Vue.config.productionTip = false;
// Vue.mixin(tes);

//Vue初期化
let app = new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

app.$store.dispatch("recordState/initDisplayPosition");
