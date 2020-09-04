<template>
  <v-app>
    <transition :name="transitionName" mode="out-in">
      <router-view />
    </transition>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return { transitionName: "none" };
  },

  watch: {
    $route(to, from) {
      const toName = to.name;
      const fromName = from.name;

      if (fromName === "title" && toName === "login") {
        console.log("fireee");
        this.transitionName = "slide-up";
      }
      // this.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
    },
  },
};
</script>
<style lang="scss">
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
