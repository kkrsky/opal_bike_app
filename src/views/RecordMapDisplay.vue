<template>
  <!-- マップモード画面 -->
  <v-container id="mapDisplay">
    <div id="leafletMap" class="map-content"></div>
    <div class="info-container">
      <!-- 走行時間 -->
      <div class="running-time-container">
        <div class="title">タイム</div>
        <div class="content">01:24:50</div>
      </div>
      <!-- 平均速度 -->
      <div class="average-velocity-container">
        <div class="title">平均速度(km/h)</div>
        <div class="content">30.9</div>
      </div>
      <!-- 距離 -->
      <div class="running-length-container">
        <div class="title">距離(km)</div>
        <div class="content">13.4</div>
      </div>
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
  methods: {
    initMap() {
      let id = "leafletMap";

      let tile_kokudochiriin = new L.tileLayer(
        "http://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png",
        {
          attribution:
            "<a href='http://www.gsi.go.jp/kikakuchousei/kikakuchousei40182.html' target='_blank'>国土地理院</a>",
        }
      );

      let tile_openStreetMap = new L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution:
            '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        }
      );
      var GmapsROA = L.gridLayer.googleMutant({
        maxZoom: 24,
        type: "roadmap", //地図
      });

      var GmapsSAT = L.gridLayer.googleMutant({
        maxZoom: 24,
        type: "satellite", //航空写真
      });
      var GmapsHYB = L.gridLayer.googleMutant({
        maxZoom: 24,
        type: "hybrid", //航空写真&ラベル
      });
      var GmapsTER = L.gridLayer.googleMutant({
        maxZoom: 24,
        type: "terrain", //地形地図
      });

      var mymap = L.map(id, {
        center: [35.6831925, 139.7511307],
        zoom: 13,
        layers: [tile_openStreetMap],
        zoomControl: false,
      });

      mymap.addControl(
        new L.Control.Layers(
          {
            "Google Roadmap": GmapsROA,
            "Google Satellite": GmapsSAT,
            "Google Hybrid": GmapsHYB,
            "Google Terrain": GmapsTER,
            "open Street Map": tile_openStreetMap,
            "国土地理院 ": tile_kokudochiriin,
          },
          {}
        )
      );
    },
  },
  watch: {},
  beforeCreate() {},
  mounted() {
    this.initMap();
  },
  components: {},
};
</script>

<style lang="scss">
#mapDisplay {
  $footer-height__here: 15vh;
  $font-size__here: 18vw;
  $map-height__here: 40vh;

  $info-title-size__adjust: 0.3;
  $title-region: 0.2;
  $content-region: 0.6;
  $add-info-region: 0.2;
  $title-font-size: 0.1;

  padding: 0px;

  .map-content {
    width: 100vw;
    height: $map-height__here;
  }
  .info-container {
    $container-height: calc(
      100vh - #{$__header-tab-height} - #{$footer-height__here} - 40vh
    );
    height: $container-height;
    display: grid;
    grid-template:
      "header header" 50%
      "left   right" 50%
      /50vw 50vw;
    .running-time-container {
      grid-area: header;
      @include activity-info-grid__record(
        $font-size__here,
        $info-title-size__adjust
      );
    }
    .average-velocity-container {
      grid-area: left;
      @include activity-info-grid__record(
        $font-size__here,
        $info-title-size__adjust
      );
    }

    .running-length-container {
      grid-area: right;
      @include activity-info-grid__record(
        $font-size__here,
        $info-title-size__adjust
      );
    }
    // .running-time-container {
    //   // $running-time-height: 100vh- $__header-tab-height- $__footer-tab-height-100vw;
    //   $running-time-height: 100%;
    //   $running-time-font-size: $font-size__here;
    //   height: $running-time-height;
    //   border-bottom: solid 1px gray;
    //   .title {
    //     display: flex;
    //     justify-content: center;
    //     align-items: flex-end;
    //     height: $running-time-height * $title-region;
    //   }
    //   .content {
    //     display: flex;
    //     justify-content: center;
    //     align-items: center;
    //     height: $running-time-height * 0.8;
    //     font-size: $running-time-font-size;
    //   }
    // }
    // .average-velocity-container {
    //   $average-velocity-height: 100%;
    //   $average-velocity-font-size: $font-size__here;
    //   height: $average-velocity-height;
    //   border-right: solid 1px gray;
    //   .title {
    //     display: flex;
    //     justify-content: center;
    //     align-items: flex-end;
    //     height: $average-velocity-height * $title-region;
    //   }
    //   .content {
    //     display: flex;
    //     justify-content: center;
    //     align-items: center;
    //     height: $average-velocity-height * $content-region;
    //     font-size: $average-velocity-font-size;
    //   }
    // }
    // .running-length-container {
    //   $running-length-height: 100%;
    //   $running-length-font-size: $font-size__here;
    //   height: $running-length-height;
    //   border-left: solid 1px gray;

    //   .title {
    //     display: flex;
    //     justify-content: center;
    //     align-items: flex-end;
    //     height: $running-length-height * $title-region;
    //   }
    //   .content {
    //     display: flex;
    //     justify-content: center;
    //     align-items: center;
    //     height: $running-length-height * $content-region;
    //     font-size: $running-length-font-size;
    //   }
    // }
  }
}
</style>
