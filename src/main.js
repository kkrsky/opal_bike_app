import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import virtualCordova from "./virtualCordova.js";
import tes from "./mixins/tes";

Vue.config.productionTip = false;
// Vue.mixin(tes);
// virtualCordova.start();

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
