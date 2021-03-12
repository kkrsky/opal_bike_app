<template>
  <v-app>
    <v-snackbar v-model="isSnackbar" app top :timeout="snackbarObj.timeout">{{
      snackbarObj.message
    }}</v-snackbar>
    <transition :name="transitionName" mode="out-in">
      <router-view />
    </transition>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      transitionName: "none",
      // isSnackbar: true,
      // snackbarMessage: "hello",
    };
  },
  computed: {
    isSnackbar: {
      get() {
        return this.$store.getters["snackbarState/getIsSnackbar"];
      },
      set(bool) {
        this.$store.dispatch("snackbarState/setIsSnackbar", bool);
      },
    },
    snackbarObj: {
      get() {
        return this.$store.getters["snackbarState/getSnackbarObj"];
      },
      // set(val) {
      //   this.$store.dispatch("snackbarState/setMessage", val);
      // },
    },
  },
  methods: {
    test() {
      // console.log(this.$store.getters["snackbarState/getMessage"]);
      // console.log(this.isSnackbar, this.snackbarMessage);
      this.$store.dispatch("snackbarState/fire", { message: "fireee" });
    },
  },
  watch: {
    $route(to, from) {
      const toName = to.name;
      const fromName = from.name;

      if (fromName === "title" && toName === "login") {
        console.log("fireee");
        this.transitionName = "slide-up";
      } else {
        this.transitionName = "none";
      }
      // this.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
    },
  },
};
</script>
<style lang="scss">
#app {
  //背景設定
  color: white;
  background-image: url("./assets/background_base.png");
  background-color: rgba(0, 0, 0, 0.5);
  background-blend-mode: darken;
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}

// .tes {
//   animation: fadeOutUpBig; /* referring directly to the animation's @keyframe declaration */
//   animation-duration: 2s;
// }

// -enter{}
// -enter-active{}
// -enter-to{}
// -leave{}
// -leave-active{}
// -leave-to{}

/**
.slide-up
 */

// .slide-up-enter {
//   background-color: red;
// }
// .slide-up-enter-to {
//   background-color: red;
// }
// .slide-up-enter-active {
//   animation: fadeOutDown; /* referring directly to the animation's @keyframe declaration */
//   animation-duration: 3s;
//   background-color: red;
// }

.slide-up-leave {
  background-color: red;
}
.slide-up-leave-to {
  background-color: red;
}
.slide-up-leave-active {
  animation: fadeOutUpBig; /* referring directly to the animation's @keyframe declaration */
  animation-duration: 1s;
  background-color: red;
}
</style>
