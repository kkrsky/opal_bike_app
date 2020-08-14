<template>
  <v-app>
    <v-navigation-drawer app right="true">
      <!-- -->
      <p>drawer</p>
    </v-navigation-drawer>

    <v-app-bar app>
      <!-- -->
      <p>bar</p>
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <p>main</p>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <p>container</p>
        <test-gps></test-gps>
      </v-container>
    </v-main>

    <v-footer app>
      <!-- -->
      <p>footer</p>
    </v-footer>
  </v-app>
</template>

<script>
import testGps from "./views/testGps.vue";

export default {
  name: "App",

  components: {
    testGps,
  },

  data: () => ({
    //
  }),
};
</script>
