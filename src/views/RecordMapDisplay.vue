<template>
  <!-- マップモード画面 -->
  <v-container id="mapDisplay">
    <div id="leafletMap" class="map-content"></div>
    <div class="info-container">
      <!-- 走行時間 -->
      <div class="running-time-container">
        <div class="title">タイム</div>
        <div class="content">
          {{ displayTime }}
          <v-btn @click="test1()">test1</v-btn>
        </div>
      </div>
      <!-- 平均速度 -->
      <div class="average-velocity-container">
        <div class="title">平均速度(km/h)</div>
        <div class="content">{{ displaySpeed }}</div>
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
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {
      /**
       * //component data
       */
      /**
       * //methods data
       */
      // displayPosition: [],
      // positionHistory: [],
      // watchPositionId: null,
      tes: null,
    };
  },
  computed: {
    ...mapState({
      displayTime: (state) => {
        let time = state.recordState.TimeAnimator.displayTime;

        return time;
      },
      mapComponent: (state) => state.recordState.mapComponent,
      displayPosition: (state) => state.recordState.displayPosition,
      displaySpeed: (state) =>
        state.recordState.DisplaySpeedAnimator.displaySpeed,
    }),
    // ...mapGetters({
    //   displayPosition2: (getters) => {
    //     window.alert("get!");
    //     return getters.recordState.displayPosition;
    //   },
    // }),
    // displayPosition3() {
    //   // console.log(this);
    //   return this.$store.getters["recordState/displayPosition"];
    // },
  },
  methods: {
    test1() {
      console.log(this.$store.state.recordState.positionHistory);

      // console.log(this.tes);
      // let LatLng = { lat: 35.6831925, lng: 139.7511307 };
      // let tes = {
      //   accuracy: 1044,
      //   bounds: { _southWest: LatLng, _northEast: LatLng },
      //   latitude: 34.701312,
      //   latlng: LatLng,
      //   longitude: 137.7140736,
      //   sourceTarget: 0,
      //   target: 0,
      //   timestamp: 1604758142275,
      //   type: "locationfound",
      // };
      // this.tes._setLocation(tes);
      // this.tes._events.locationfound(tes);
      //       accuracy: 1044
      // bounds: LatLngBounds {_southWest: LatLng, _northEast: LatLng}
      // latitude: 34.701312
      // latlng: LatLng {lat: 34.701312, lng: 137.7140736}
      // longitude: 137.7140736
      // sourceTarget: NewClass {…}
      // target: NewClass {…}
      // timestamp: 1604758142275
      // type: "locationfound"
      // console.log(L.Control.MyLocate);
      // L.Control.MyLocate._setLocation(LatLng);
      // L.Control.MyLocate._onLocationFound(posi);
    },
    initMap() {
      //変数宣言

      let that = this;
      let top = {
        myMap: null,
        defaultZoom: 15,
        mapId: "leafletMap",

        //init
        tileList: {},
        initTile() {
          //タイル設定
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

          this.tileList = {
            tile_kokudochiriin,
            tile_openStreetMap,
            GmapsROA,
            GmapsSAT,
            GmapsHYB,
            GmapsTER,
          };
        },
        initPositionIcon() {
          //現在位置のピンを生成
          let pulsingIcon2 = L.icon.pulse({
            iconSize: [15, 15],
            color: "#57c6fd",
            fillColor: "#57c6fd",
            heartbeat: 2,
          });
          this.$store.dispatch("recordState/setPositionIcon", pulsingIcon2);
        },
        initControllExtendLocationClass() {
          L.Control.MyLocate = L.Control.Locate.extend({
            // _drawMarker: function() {
            //   // override to customize the marker
            // },
            _setLocation(positionData) {
              // console.log(this);
              let { lat, lng, accuracy } = positionData;
              let latlng = { lat: lat, lng: lng };
              console.log("this.event,activate", this._event, this._active);

              //set
              this._event.latlng = latlng;
              this._event.accuracy = accuracy;

              this._onLocationFound(this._event);
            },
          });
          L.control.MyLocate = function(opts) {
            return new L.Control.MyLocate(opts);
          };
        },
        generateMap() {
          //地図生成
          let myMap = null;

          myMap = L.map(this.mapId, {
            center: that.displayPosition,
            zoom: this.defaultZoom,
            layers: [this.tileList.tile_openStreetMap],
            zoomControl: false,
          });
          that.$store.dispatch("recordState/setMapComponent", myMap);
          this.myMap = myMap;
        },
        addPositionTile() {
          //現在位置コントロール追加
          let locateOptions = {
            position: "bottomright",

            // markerStyle: pulsingIcon3,
            // strings: {
            //   title: "現在地を表示",
            //   popup: "いまここ",
            // },
            // watch: true,
            // locate: true,
            // setView: true,
            // enableHighAccuracy: true,

            setView: "untilPanOrZoom",
            clickBehavior: {
              inView: "setView",
              outOfView: "setView",
              inViewNotFollowing: "setView",
            },
            flyTo: true,
            returnToPrevBounds: true,
            cacheLocation: true,
            showCompass: true, //丸全体を表示するか
            drawCircle: true, //位置精度を表示するか //.leaflet-control-locate-circle
            drawMarker: true, //位置マーカーを表示するか //.leaflet-control-locate-marker
            // markerStyle: pulsingIcon3,
            markerStyle: {
              color: "#fff",
              fillColor: "#2A93EE",
              fillOpacity: 1,
              weight: 3,
              opacity: 1,
              radius: 9,
            },
            followMarkerStyle: {
              color: "#fcc",
              fillColor: "#FC8328",
              fillOpacity: 1,
              weight: 3,
              opacity: 1,
              radius: 9,
            },
            icon: "fa fa-map-marker",
            iconLoading: "fa fa-spinner fa-spin",
            iconElementTag: "v-icon",
            locateOptions: {
              watch: true,
              enableHighAccuracy: true,
            },
            getLocationBounds: function(locationEvent) {
              //位置を指定すると、カメラが変わる(setViewと同じ）
              // console.log("locationEvent", locationEvent);

              // let currentPosition = { lat: 35.6831925, lng: 139.7511307 };
              // locationEvent.bounds._southWest = currentPosition;
              // locationEvent.bounds._southWest = currentPosition;
              return locationEvent.bounds;
            },
            onLocationError: function(err) {
              //一応載せとく
              alert(err.message);
            }, // define an error callback function
            onLocationOutsideMapBounds: function(context) {
              //一応載せとく
              // called when outside map boundaries
              alert(context.options.strings.outsideMapBoundsMsg);
            },
          };
          var lc = L.control.locate(locateOptions).addTo(this.myMap);
          lc.start();
        },
        addMapTile() {
          //地図タイルコントロール生成
          this.myMap.addControl(
            new L.Control.Layers(
              {
                "Google Roadmap": this.tileList.GmapsROA,
                "Google Satellite": this.tileList.GmapsSAT,
                "Google Hybrid": this.tileList.GmapsHYB,
                "Google Terrain": this.tileList.GmapsTER,
                "open Street Map": this.tileList.tile_openStreetMap,
                "国土地理院 ": this.tileList.tile_kokudochiriin,
              },
              {}
            )
          );
        },
        watchPositionFoundByMap() {
          function onLocationFound(obj) {
            console.log("[found] position by map");
            let accuracy = obj.accuracy;
            // let foundedObj = {
            //   lat: obj.latitude,
            //   lng: obj.longitude,
            //   timestamp: obj.timestamp,
            //   accuracy: accuracy,
            // };
            // console.log(obj);

            that.$store.dispatch("recordState/setRecordHistory", obj);
            // L.marker(e.latlng)
            //   .addTo(map)
            //   .bindPopup("You are within " + radius + " meters from this point")
            //   .openPopup();
            // L.circle(e.latlng, radius).addTo(map);
          }
          this.myMap.on("locationfound", onLocationFound);
        },
        start() {
          this.initTile();
          this.generateMap();
          this.addMapTile();
          this.addPositionTile();
          this.watchPositionFoundByMap();
        },
      };

      top.start();
    },
  },
  watch: {},
  beforeCreate() {},
  created() {},
  mounted() {
    // this.initMapWithPosition();
    this.initMap();
  },
  components: {},
};
</script>

<style lang="scss">
.LocationMarker {
  background-color: red;
}
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

/* Compatible with Leaflet 0.7 */
.leaflet-control-locate a {
  font-size: 1.4em;
  color: #444;
  cursor: pointer;
}
.leaflet-control-locate.active a {
  color: #2074b6;
}
.leaflet-control-locate.active.following a {
  color: #fc8428;
}

.leaflet-control-locate-location circle {
  animation: leaflet-control-locate-throb 4s ease infinite;
}

@keyframes leaflet-control-locate-throb {
  0% {
    stroke-width: 1;
  }
  50% {
    stroke-width: 3;
    transform: scale(0.8, 0.8);
  }
  100% {
    stroke-width: 1;
  }
}

/*# sourceMappingURL=L.Control.Locate.css.map */
</style>
