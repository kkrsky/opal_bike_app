<template>
  <div id="TopBike">
    <top-header :left="leftBtn" :title="title" :right="rightBtn"></top-header>
    <v-main>
      <div
        class="activity-history-container"
        v-for="cardItem in activityCardList"
        :key="cardItem.cardId"
        @click="gotoDetail(cardItem)"
      >
        <card-activity :cardItem="cardItem"></card-activity>
      </div>
    </v-main>
    <top-footer></top-footer>
  </div>
</template>

<script>
import TopHeader from "@/components/TopHeader.vue";
import TopFooter from "@/components/TopFooter.vue";
import CardActivity from "@/components/CardActivity.vue";
import ActivityDetailContent from "@/components/ActivityDetailContent.vue";
import UserShareHeader from "@/components/UserShareHeader.vue";

export default {
  data() {
    return {
      //component data
      title: "アクティビティ履歴",
      // rightBtnList: [],
      leftBtn: {},
      rightBtn: {
        id: 1,
        title: "settings",
        icon: "settings",
        goto: "topSetting",
        propItems: "",
        addCss: {},
      },
      activityCardList: [
        {
          cardId: 1,
          attribute: "fullActivity",
          flex: 12,
          testPicture: "https://picsum.photos/500",
          userCustomize: {
            title: "テストのライド1",
            description: "I ride a bike in some",
            feeling: "good",
            rideBike: "test zirou",
            savePhotos: [
              {
                //写真にメモを付属できる
                pictureId: 1,
                title: "test1",
                description: "this is test picture",
                src: "https://picsum.photos/400",
                position: [134, 30],
              },
              {
                //写真にメモを付属できる
                pictureId: 2,
                title: "test2",
                description: "this is test picture",
                src: "https://picsum.photos/100",
                position: [134, 30],
              },
            ],
          },
          activityData: {
            runDate: "Sun Sep 27 2020 18:10:50 GMT+0900 (日本標準時)",
            runTime: 5078, //sec
            runLength: 13.4, //km
            averageVeloccity: 30.9, //km/h
            gpsData: [
              { time: 0, position: [139.7013586, 35.6875364], speed: null },
              {
                time: 1000,
                position: [139.7013586, 35.6874364],
                speed: null,
              },
              {
                time: 2000,
                position: [139.7013586, 35.6872364],
                speed: null,
              },
            ],
          },
        },
        {
          cardId: 2,
          attribute: "fullActivity",
          flex: 12,
          testPicture: "https://picsum.photos/200",
          userCustomize: {
            title: "テストのライド2",
            description: "I got a pen",
            feeling: "good",
            rideBike: "test zirou",
            savePhotos: [
              {
                //写真にメモを付属できる
                pictureId: 1,
                title: "test1",
                description: "this is test picture 1",
                src: "https://picsum.photos/400",
                position: [134, 30],
              },
              {
                //写真にメモを付属できる
                pictureId: 2,
                title: "test2",
                description: "this is test picture 2",
                src: "https://picsum.photos/100",
                position: [134, 30],
              },
              {
                pictureId: 3,
                title: "test3",
                description: "this is test picture 3",
                src: "https://picsum.photos/100",
                position: [134, 30],
              },
              {
                pictureId: 4,
                title: "test4",
                description: "this is test picture 4",
                src: "https://picsum.photos/100",
                position: [134, 30],
              },
              {
                pictureId: 5,
                title: "test5",
                description: "this is test picture 5",
                src: "https://picsum.photos/100",
                position: [134, 30],
              },
              {
                pictureId: 6,
                title: "test6",
                description: "this is test picture 6",
                src: "https://picsum.photos/100",
                position: [134, 30],
              },
            ],
          },
          activityData: {
            runDate: "Sun Sep 27 2020 18:10:50 GMT+0900 (日本標準時)",
            runTime: 5078, //sec
            runLength: 13.4, //km
            averageVeloccity: 30.9, //km/h
            gpsData: [
              { time: 0, position: [139.7013586, 35.6875364], speed: null },
              {
                time: 1000,
                position: [139.7013586, 35.6874364],
                speed: null,
              },
              {
                time: 2000,
                position: [139.7013586, 35.6872364],
                speed: null,
              },
            ],
          },
        },
      ],
      //methods data
    };
  },
  computed: {},
  methods: {
    gotoDetail(cardItem) {
      // window.alert(cardItem.cardId);
      this.$router.push({
        name: "BikeActivityHistoryDetail",
        params: { cardItem: cardItem },
      });
    },
    tesDate() {
      let date = new Date();
      var getFullYear = date.getTime();
      console.log(date);
    },
  },
  watch: {},
  beforeCreate() {},
  created() {
    this.$store.dispatch("recordState/deleteCurrentWatchPosition");
    // this.$store.dispatch("recordState/initCurrentWatchPosition");
  },
  mounted() {},
  components: {
    TopHeader,
    TopFooter,
    CardActivity,
    ActivityDetailContent,
    UserShareHeader,
  },
};
</script>

<style lang="scss">
#TopBike {
}
</style>
