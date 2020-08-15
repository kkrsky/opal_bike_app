<template>
  <div>
    <v-btn @click="getCurrentPosition()">get gps</v-btn>
    <v-btn @click="tes1()">tes1</v-btn>
    <v-btn @click="tes2()">test</v-btn>
    <p>{{ currentPosition }}</p>
    <p>
      this isDiagnostic
      <span>{{ isDiagnostic }}</span>
    </p>
    <p>
      this isDiagnosti
      <span>{{ isDevice }}</span>
    </p>

    <v-btn @click="watchCurrentPosition()">watch gps</v-btn>
    <v-btn @click="watchCurrentPositionEnd()">end watch gps</v-btn>
    <p>watch gps</p>
    <ul>
      <li v-for="(item,index) in watchPosition" :key="index">{{item}}</li>
    </ul>
  </div>
</template>

<script>
import { mapState } from "vuex";

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
    ...mapState("cds", ["isDevice", "isDiagnostic"]),
    watchedPosition() {
      // return ...this.watchPosition
    },
  },
  created() {
    this.$store.dispatch("cds/checkState");
  },
  methods: {
    tes1() {
      this.$store.dispatch("cds/checkState");
    },
    tes2() {
      // ftes();
    },
    getCurrentPosition() {
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
          this.currentPosition = [
            position.coords.longitude,
            position.coords.latitude,
          ];
        },
        (error) => {
          console.log(("error:", error));
        },
        { enableHighAccuracy: true }
      );
    },
    watchCurrentPosition() {
      console.log("start");
      let onSuccess = (position) => {
        let nowTime = performance.now();
        let divTime = nowTime - this.performance;
        this.performance = nowTime;

        let location = [
          divTime,
          position.coords.latitude,
          position.coords.longitude,
        ];
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
        timeout: 50000,
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
  },
};
</script>

<style></style>
