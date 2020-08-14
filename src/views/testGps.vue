<template>
  <div>
    <v-btn @click="getCurrentPosition()">get gps</v-btn>
    <v-btn @click="tes1()">tes1</v-btn>
    <v-btn @click="tes2()">test</v-btn>
    <p>{{ currentPosition }}</p>
    <p>
      this isDiagnostic <span>{{ isDiagnostic }}</span>
    </p>
    <p>
      this isDiagnosti <span>{{ isDevice }}</span>
    </p>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      currentPosition: [],
    };
  },
  computed: {
    ...mapState("cds", ["isDevice", "isDiagnostic"]),
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
  },
};
</script>

<style></style>
