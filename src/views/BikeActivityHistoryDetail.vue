<template>
  <div id="BikeActivityHistoryDetail">
    <top-header :title="title" :right="rightBtn"></top-header>
    <v-main
      ><activity-detail
        class="activity-detail-container"
        :cardItem="cardItem"
      ></activity-detail
    ></v-main>

    <top-footer></top-footer>
  </div>
</template>

<script>
import TopHeader from "@/components/TopHeader.vue";
import TopFooter from "@/components/TopFooter.vue";
import ActivityDetail from "@/components/ActivityDetail.vue";

export default {
  props: { cardItem: { type: Object } },
  data() {
    return {
      /**
       * //component data
       */
      title: "アクティビティ詳細",
      rightBtn: {},

      /**
       * //methods data
       */
    };
  },
  computed: {},
  methods: {},
  watch: {},
  beforeCreate() {},
  mounted() {},
  components: { TopHeader, TopFooter, ActivityDetail },
};
</script>

<style lang="scss"></style>
