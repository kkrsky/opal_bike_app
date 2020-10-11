<template>
  <div id="BikeActivityHistoryDetail">
    <top-header :title="title" :right="rightBtn"></top-header>
    <v-main
      ><activity-detail-content
        class="activity-detail-container"
        :cardItem="cardItem"
      ></activity-detail-content
    ></v-main>

    <top-footer></top-footer>
  </div>
</template>

<script>
import TopHeader from "@/components/TopHeader.vue";
import TopFooter from "@/components/TopFooter.vue";
import ActivityDetailContent from "@/components/ActivityDetailContent.vue";

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
  components: { TopHeader, TopFooter, ActivityDetailContent },
};
</script>

<style lang="scss"></style>
