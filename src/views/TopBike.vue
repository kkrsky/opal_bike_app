<template>
  <div id="topBike">
    <top-header :title="title" :right="rightBtn"></top-header>
    <v-main>this is bike</v-main>
    <test-photo></test-photo>
    <top-footer></top-footer>
  </div>
</template>

<script>
import TopHeader from "@/components/TopHeader.vue";
import TopFooter from "@/components/TopFooter.vue";
import testPhoto from "../views/testPhoto.vue";
export default {
  data() {
    return {
      //component data
      title: "topBike",
      // rightBtnList: [],
      // leftBtn: {},
      rightBtn: {
        id: 1,
        title: "settings",
        icon: "settings",
        goto: "topSetting",
        propItems: "",
        addCss: {},
      },

      //methods data
    };
  },
  computed: {},
  methods: {},
  watch: {},
  beforeCreate() {},
  mounted() {},
  components: {
    TopHeader,
    TopFooter,
    testPhoto,
  },
};
</script>

<style lang="scss"></style>
