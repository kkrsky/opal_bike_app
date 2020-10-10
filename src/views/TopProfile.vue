<template>
  <div id="topProfile">
    <top-header
      :title="title"
      :left="leftBtn"
      :right="rightBtnList"
    ></top-header>
    <v-main>this is {{ title }}</v-main>
    <activity-detail></activity-detail>
    <card-activity></card-activity>
    <top-footer></top-footer>
  </div>
</template>

<script>
import TopHeader from "@/components/TopHeader.vue";
import TopFooter from "@/components/TopFooter.vue";
import CardActivity from "@/components/CardActivity.vue";
import ActivityDetail from "@/components/ActivityDetail.vue";
export default {
  data() {
    return {
      //component data
      title: "profile",
      rightBtnList: null,
      leftBtn: null,

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
    CardActivity,
    ActivityDetail,
  },
};
</script>

<style lang="scss"></style>
