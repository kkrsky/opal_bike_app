<template>
  <div id="topRecord">
    <top-header
      :title="title"
      :left="leftBtn"
      :right="rightBtn"
      v-show="!isSimpleDisplay && !isFinishDisplay"
    ></top-header>
    <v-main app>
      <!-- マップモード画面 -->
      <record-map-display
        v-show="!isSimpleDisplay && !isFinishDisplay"
      ></record-map-display>
      <!-- シンプルモード画面 -->
      <record-simple-display
        v-show="isSimpleDisplay && !isFinishDisplay"
      ></record-simple-display>

      <!--アクティビティ完了画面-->
      <record-finish-display
        v-if="isFinishDisplay"
        @backRecord="backRecord"
      ></record-finish-display>
    </v-main>

    <!-- <top-footer></top-footer> -->
    <v-footer app v-show="!isFinishDisplay">
      <v-container>
        <v-row no-gutters>
          <v-col class="footer-container">
            <v-btn
              class="footer-btn btn-start"
              v-show="showStart"
              @click="startRecord"
              >start</v-btn
            >
            <v-btn
              class="footer-btn btn-stop"
              v-show="showStop"
              @click="stopRecord"
              >stop</v-btn
            >
            <v-btn
              class="footer-btn btn-finish"
              v-show="showFinish"
              @click="finishRecord"
              >finish</v-btn
            >
            <div
              class="btn footer-btn btn-map"
              @click="isSimpleDisplay = !isSimpleDisplay"
            >
              <v-icon class="matrial-icons">map</v-icon>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </div>
</template>

<script>
import TopHeader from "@/components/TopHeader.vue";
import TopFooter from "@/components/TopFooter.vue";
import IconBtnTransition from "@/components/IconBtnTransition.vue";
import RecordMapDisplay from "./RecordMapDisplay.vue";
import RecordSimpleDisplay from "./RecordSimpleDisplay.vue";
import RecordFinishDisplay from "./RecordFinishDisplay.vue";

import L from "leaflet";
import "leaflet.gridlayer.googlemutant/Leaflet.GoogleMutant";

export default {
  data() {
    return {
      //component data
      title: "record",
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
      leftBtn: {
        id: 1,
        title: "back",
        icon: "arrow_back_ios",
        goto: "back",
        propItems: "",
        addCss: {},
      },
      //methods data
      showStart: true,
      showStop: false,
      showFinish: false,
      isSimpleDisplay: false,
      isFinishDisplay: true,
    };
  },
  computed: {},
  methods: {
    showBtnChanger(start, stop, finish) {
      if (start === "allToggle") {
        this.showStart = !this.showStart;
        this.showStop = !this.showStop;
        this.showFinish = !this.showFinish;
      } else {
        if (start === "toggle") this.showStart = !this.showStart;
        else this.showStart = Boolean(start);

        if (stop === "toggle") this.showStop = !this.showStop;
        else this.showStop = Boolean(stop);

        if (finish === "toggle") this.showFinish = !this.showFinish;
        else this.showFinish = Boolean(finish);
      }
    },
    startRecord() {
      this.showBtnChanger(false, true, false);
    },
    stopRecord() {
      this.showBtnChanger(true, false, true);
    },
    finishRecord() {
      //終了しますか？確認
      if (window.confirm("終了しますか？")) {
        //初期表示画面
        this.showBtnChanger(true, false, false);
        this.isFinishDisplay = true;
      }
    },
    backRecord() {
      this.isFinishDisplay = false;
    },
    /**
     * map
     */
  },
  watch: {},
  beforeCreate() {},
  mounted() {
    // this.initMap();
  },
  created() {
    this.isFinishDisplay = false;
  },
  components: {
    TopHeader,
    TopFooter,
    IconBtnTransition,
    RecordMapDisplay,
    RecordSimpleDisplay,
    RecordFinishDisplay,
  },
};
</script>

<style lang="scss">
#topRecord {
  $footer-height__here: 15vh;
  $font-size__here: 18vw;
  .v-main {
    padding: 0px !important;
    margin-top: $__header-tab-height;
    height: calc(100vh - #{$footer-height__here} - #{$__header-tab-height});
  }

  .v-footer {
    height: $footer-height__here;
  }
  .footer-container {
    display: flex;
    justify-content: center;
  }

  .footer-btn {
    margin: 0 4vw;
  }
  .btn-map {
    position: absolute;
    top: 50%;
    right: 0px;
    margin: 0px;
    height: $__icon-size__square + 0.5;
    width: $__icon-size__square + 0.5;
    transform: translate(-50%, -50%);
    border-radius: 100%;
    border: solid 1px black;
    // filter: drop-shadow(2px 2px 2px rgb(0, 0, 0));
    // background-color: white;
    // box-shadow: 0 10px 25px 0 rgba(0, 0, 0, 0.5);

    .v-icon {
      font-size: $__icon-size__square;
    }
  }
}
</style>
