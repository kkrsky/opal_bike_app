<template>
  <div id="topHome">
    <!-- <top-header :title="title"></top-header> -->
    <!-- <v-main>this is tes{{ title }}</v-main> -->
    <!-- <test-file-up></test-file-up> -->
    <record-finish></record-finish>
    <top-footer></top-footer>
  </div>
</template>

<script>
import TopHeader from "@/components/TopHeader.vue";
import TopFooter from "@/components/TopFooter.vue";
// import testFileUp from "../views/testFileUp.vue";
import RecordFinish from "./RecordFinishDisplay.vue";
export default {
  data() {
    return {
      //component data
      title: "home",

      // rightBtnList: [],
      // leftBtn: {},
      //methods data
    };
  },
  computed: {},
  methods: {
    tes2() {
      window.alert("tesss");
    },
  },
  watch: {},
  beforeCreate() {},
  mounted() {},
  components: {
    TopHeader,
    TopFooter,
    // testFileUp,
    RecordFinish,
  },
};
</script>

<style lang="scss"></style>
