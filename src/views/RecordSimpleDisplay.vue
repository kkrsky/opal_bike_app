<template>
  <!-- シンプルモード画面 -->
  <v-container id="simpleDisplay">
    <!-- 走行時間 -->
    <div class="running-time-container">
      <v-row no-gutters>
        <v-col class="title">タイム</v-col>
      </v-row>
      <v-row no-gutters>
        <v-col class="content">01:24:50</v-col>
      </v-row>
    </div>

    <!-- 平均速度 -->
    <div class="average-velocity-container">
      <v-row no-gutters>
        <v-col class="title">平均速度</v-col>
      </v-row>
      <v-row no-gutters>
        <v-col class="content">30.9</v-col>
      </v-row>
      <v-row no-gutters>
        <v-col class="add-info">km/h</v-col>
      </v-row>
    </div>

    <!-- 距離 -->
    <div class="running-length-container">
      <v-row no-gutters>
        <v-col class="title">距離</v-col>
      </v-row>
      <v-row no-gutters>
        <v-col class="content">13.4</v-col>
      </v-row>
      <v-row no-gutters>
        <v-col class="add-info">km</v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
// import TopFooter from "@/components/TopFooter.vue";

export default {
  data() {
    return {
      /**
       * //component data
       */
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
  components: {},
};
</script>

<style lang="scss">
#simpleDisplay {
  $footer-height__here: 15vh;
  $font-size__here: 18vw;

  $title-region: 0.2;
  $content-region: 0.6;
  $add-info-region: 0.2;
  $title-font-size: 0.1;

  margin-top: -$__header-tab-height;
  padding: 1.5vh;

  .running-time-container {
    $running-time-height: 20vh;
    $running-time-font-size: 20vw;
    height: $running-time-height;
    .title {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      height: $running-time-height * $title-region;
    }
    .content {
      display: flex;
      justify-content: center;
      align-items: center;
      height: $running-time-height * 0.8;
      font-size: $running-time-font-size;
    }
  }
  .average-velocity-container {
    $average-velocity-height: 37vh;
    $average-velocity-font-size: 30vw;
    height: $average-velocity-height;
    .title {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      height: $average-velocity-height * $title-region;
    }
    .content {
      display: flex;
      justify-content: center;
      align-items: center;
      height: $average-velocity-height * $content-region;
      font-size: $average-velocity-font-size;
    }
    .add-info {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      height: $average-velocity-height * $add-info-region;
    }
  }
  .running-length-container {
    $running-length-height: 25vh;
    $running-length-font-size: 20vw;
    height: $running-length-height;
    .title {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      height: $running-length-height * $title-region;
    }
    .content {
      display: flex;
      justify-content: center;
      align-items: center;
      height: $running-length-height * $content-region;
      font-size: $running-length-font-size;
    }
    .add-info {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      height: $running-length-height * $add-info-region;
    }
  }
}
</style>
