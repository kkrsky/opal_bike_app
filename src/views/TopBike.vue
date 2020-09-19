<template>
  <div id="topBike">
    <top-header :title="title" :right="rightBtn"></top-header>
    <v-main>this is bike</v-main>
    <top-footer></top-footer>
  </div>
</template>

<script>
import TopHeader from "@/components/TopHeader.vue";
import TopFooter from "@/components/TopFooter.vue";

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
  },
};
</script>

<style lang="scss"></style>
