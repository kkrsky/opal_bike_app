<template>
  <div>
    <v-navigation-drawer app :right="true">
      <!-- -->
      <p>drawer</p>
    </v-navigation-drawer>

    <!-- -->
    <!-- <p>bar</p> -->
    <top-header :title="'standard'"></top-header>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <p>main</p>
      <!-- Provides the application the proper gutter -->
      <v-container>
        <p>container</p>
        <v-btn @click="isOpen = !isOpen">open</v-btn>
        <div v-show="isOpen">
          this is open
        </div>
      </v-container>
    </v-main>
    <top-footer></top-footer>
  </div>
</template>

<script>
import IconBtnTransition from "../components/IconBtnTransition.vue";
import TopHeader from "../components/TopHeader.vue";
import TopFooter from "@/components/TopFooter.vue";
export default {
  name: "App",

  components: {
    IconBtnTransition,
    TopHeader,
    TopFooter,
  },
  mounted() {
    console.log("top", this.$router);
  },

  data: () => ({
    //
    left: {
      id: 1,
      title: "tes",
      icon: "settings",
      goto: "topHome",
      propItems: "",
      addCss: {},
    },
    isOpen: false,
  }),
};
</script>
<style lang="scss"></style>
