<template>
  <div>
    <top-header></top-header>
    <v-btn @click="getCurrentPosition()">get gps</v-btn>
    <v-btn @click="tes1()">tes1</v-btn>
    <v-btn @click="tes2()">test2</v-btn>
    <v-btn @click="tes3()">test3</v-btn>
    <v-btn @click="addPosition()">add position</v-btn>
    <p>{{ currentPosition }}</p>
    <div class="title">tes title</div>
    <p>
      this isDiagnostic
      <span>{{ isDiagnostic }}</span>
    </p>
    <p>
      this isDiagnosti
      <span>{{ isDevice }}</span>
    </p>
    <p>
      this isGeolocation
      <span>{{ isGeolocation }}</span>
    </p>

    <v-btn @click="watchCurrentPosition()">watch gps</v-btn>
    <v-btn @click="watchCurrentPositionEnd()">end watch gps</v-btn>
    <p>watch gps</p>
    <ul>
      <li v-for="(item, index) in watchPosition" :key="index">{{ item }}</li>
    </ul>

    <div id="leafletMap"></div>
    <v-container id="edit-container">
      <div class="ride-feel-container">
        <div class="title">my feeling</div>
        <v-row no-gutters>
          <v-col class="ride-feel">
            <v-btn>good</v-btn>
          </v-col>
          <v-col class="ride-feel">
            <v-btn>normal</v-btn>
          </v-col>
          <v-col class="ride-feel">
            <v-btn>bad</v-btn>
          </v-col>
        </v-row>
      </div>
      <div class="ride-customize-container">
        <v-form>
          <v-text-field
            v-model="activityTitle"
            label="アクティビティのタイトル"
            clearable
            prepend-icon="title"
          ></v-text-field>
          <v-text-field
            v-model="activityTitle"
            label="アクティビティのタイトル"
            :clearable="tes"
            prepend-icon="insert_photo"
          ></v-text-field
          ><v-text-field
            v-model="activityTitle"
            label="アクティビティのタイトル"
            :clearable="tes"
            prepend-icon="insert_photo"
          ></v-text-field
          ><v-text-field
            v-model="activityTitle"
            label="アクティビティのタイトル"
            :clearable="tes"
            prepend-icon="insert_photo"
          ></v-text-field>
        </v-form>
      </div>
    </v-container>
    <top-footer></top-footer>
  </div>
</template>

<script>
import { mapState } from "vuex";
import TopHeader from "@/components/TopHeader.vue";
import TopFooter from "@/components/TopFooter.vue";

import L from "leaflet";
import "leaflet.gridlayer.googlemutant/Leaflet.GoogleMutant";

export default {
  data() {
    return {
      currentPosition: [],
      watchPosition: [],
      watchId: "",
      performance: 0,
    };
  },
  computed: {
    ...mapState("cds", ["isDevice", "isDiagnostic", "isGeolocation"]),
    ...mapState({
      watchPositionId: (state) => state.recordState.watchPositionId,
    }),
    watchedPosition() {
      // return ...this.watchPosition
    },
  },
  created() {
    this.$store.dispatch("cds/checkState");
    this.$store.dispatch("recordState/deleteCurrentWatchPosition");
    this.$store.dispatch("recordState/initCurrentWatchPosition");

    // this.initMap();
  },
  mounted() {
    // console.log("leaflet", leaflet);
    this.initMap();
  },
  methods: {
    tes1() {
      // this.$store.dispatch("cds/checkState");
      console.log(this.watchPositionId);
    },
    tes2() {
      this.$store.dispatch("recordState/setWatchPositionId", {
        id: "0001",
        keyName: "test",
      });
      console.log("set");
    },
    tes3() {
      // this.$store.dispatch("recordState/setWatchPositionId", {
      //   keyName: "test3",
      //   id: "0003",
      // });
      // console.log("set");
      let dp = [35.6831925, 139.7511307];
      this.mapComponent.setView(dp, 10);
    },
    addPosition() {
      let position = {
        lat: 35.6831925,
        lng: 139.7511307,
      };
      this.$store.dispatch("recordState/setDisplayPosition", position);
    },
    getCurrentPosition() {
      console.log("getCurrentPosition start", window.navigator.geolocation);

      let options = {
        maximumAge: 3000,
        enableHighAccuracy: true,
        timeout: 50000,
      };
      this.performance = performance.now();
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
          let time = performance.now();
          console.log("perform", time - this.performance);

          this.currentPosition = [
            position.coords.longitude,
            position.coords.latitude,
          ];
        },
        (error) => {
          console.log(("error:", error));
        },
        options
      );
    },
    watchCurrentPosition() {
      console.log("start");
      this.performance = performance.now();
      let onSuccess = (position) => {
        let time = performance.now();
        console.log("perform", time - this.performance);
        this.performance = time;

        let location = [position.coords.latitude, position.coords.longitude];
        this.watchPosition.push(location);
      };
      let onFailed = (error) => {
        alert(
          "code: " + error.code + "\n" + "message: " + error.message + "\n"
        );
      };
      let options = {
        maximumAge: 3000,
        enableHighAccuracy: true,
        timeout: 5000,
      };

      let watchId = navigator.geolocation.watchPosition(
        onSuccess,
        onFailed,
        options
      );
      this.watchId = watchId;
    },
    watchCurrentPositionEnd() {
      console.log("end");
      navigator.geolocation.clearWatch(this.watchId);
    },
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
        // center: [35.6831925, 139.7511307],
        center: [51.5, -0.09],
        zoom: 13,
        layers: [tile_openStreetMap],
        zoomControl: false,
      });
      // this.$store.dispatch("recordState/setMapComponent", mymap);

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

      //現在位置のピンを生成
      let pulsingIcon2 = L.icon.pulse({
        iconSize: [15, 15],
        color: "#57c6fd",
        fillColor: "#57c6fd",
        heartbeat: 2,
      });
      // this.$store.dispatch("recordState/setPositionIcon", pulsingIcon2);
      let dp = [35.6831925, 139.7511307];
      L.marker(dp, { icon: pulsingIcon2 }).addTo(mymap);
      mymap.setView([35.4, 136], 10);
      var marker = L.marker([51.5, -0.09]).addTo(mymap);
      var circle = L.circle([51.508, -0.11], {
        color: "red",
        fillColor: "#f03",
        fillOpacity: 0.5,
        radius: 500,
      }).addTo(mymap);

      var polygon = L.polygon([
        [51.509, -0.08],
        [51.503, -0.06],
        [51.51, -0.047],
      ]).addTo(mymap);

      marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
      circle.bindPopup("I am a circle.");
      polygon.bindPopup("I am a polygon.");

      var popup = L.popup()
        .setLatLng([51.5, -0.09])
        .setContent("I am a standalone popup.")
        .openOn(mymap);

      function onMapClick(e) {
        // alert("You clicked the map at " + e.latlng);
        popup
          .setLatLng(e.latlng)
          .setContent("You clicked the map at " + e.latlng.toString())
          .openOn(mymap);
      }

      mymap.on("click", onMapClick);
      this.mapComponent = mymap;
    },
  },
  components: {
    TopHeader,
    TopFooter,
  },
};
</script>

<style lang="scss">
#leafletMap {
  width: 100%;
  height: 300px;
}
</style>
