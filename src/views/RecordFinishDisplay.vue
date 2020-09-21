<template>
  <div id="finishDisplay">
    <top-header :left="leftBtn" :title="title" :right="rightBtn"></top-header>
    <div id="leafletMapFinish" class="map-content"></div>
    <v-container class="activity-info-container">
      <v-row no-gutters>
        <v-col>
          <!-- 距離 -->
          <div class="running-length-container">
            <v-row no-gutters>
              <v-col class="title">距離</v-col>
            </v-row>
            <v-row no-gutters>
              <v-col class="content">13.4 km</v-col>
            </v-row>
          </div>
        </v-col>
        <v-col>
          <!-- 平均速度 -->
          <div class="average-velocity-container">
            <v-row no-gutters>
              <v-col class="title">平均速度</v-col>
            </v-row>
            <v-row no-gutters>
              <v-col class="content">30.9 km/h</v-col>
            </v-row>
          </div>
        </v-col>
        <v-col>
          <!-- 走行時間 -->
          <div class="running-time-container">
            <v-row no-gutters>
              <v-col class="title">タイム</v-col>
            </v-row>
            <v-row no-gutters>
              <v-col class="content">1h 24m</v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>
    </v-container>
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

          <div id="uploadPhoto2box">
            <!-- <v-text-field
            class="btn-add-photo"
            @click="getPictureFromAlbum()"
            outlined
            label="写真を保存"
            readonly
            prepend-icon="insert_photo"
            height="13vh"
            ></v-text-field>-->
            <!-- <v-img :src="upImageURI" aspect-ratio="1" v-show="isImageShow"></v-img> -->

            <v-file-input
              prepend-icon="insert_photo"
              accept="image/*"
              multiple
              v-on:change="inputFileList($event)"
              label="写真を保存"
              height="15vh"
              outlined
              :clearable="false"
              message="tes"
            ></v-file-input>
            <div class="grid-container-uploaded-image" v-show="isImageShow">
              <!-- <div class="test-photo-box">aa</div>
              <div class="test-photo-box">aa</div>
              <div class="test-photo-box">aa</div>
              <div class="test-photo-box">aa</div>
              <div class="test-photo-box">aa</div>-->
              <div v-for="(image, id) in uploadedImagesForView" :key="id">
                <v-img
                  class="uploaded-photo"
                  :src="image"
                  @click="deletePhoto(id)"
                ></v-img>
              </div>
            </div>
          </div>
          <div class="mt-5"></div>
          <v-textarea
            v-model="activityTitle"
            label="活動の出来事"
            prepend-icon="notes"
            auto-grow
            outlined
          ></v-textarea>
          <v-select
            v-model="selectBike"
            :items="ownBikeList"
            label="使用したバイク"
            solo
            prepend-icon="motorcycle"
          ></v-select>
        </v-form>
        <div class="btn-activity-container">
          <v-btn
            class="btn-activity btn-abord-activity"
            outlined
            color="red"
            @click="deleteActivity"
            >アクティビティを破棄</v-btn
          >
        </div>
      </div>
    </v-container>
    <v-footer app>
      <div class="btn-activity-container">
        <v-btn
          class="btn-activity btn-save-activity"
          raised
          color="green"
          @click="saveActivity"
          >アクティビティを保存</v-btn
        >
      </div>
    </v-footer>
  </div>
</template>

<script>
import TopHeader from "@/components/TopHeader.vue";
import L from "leaflet";
export default {
  data() {
    return {
      /**
       * //component data
       */
      title: "アクティビティ保存",
      rightBtn: {
        id: 1,
        title: "",
        icon: "",
        goto: "",
        propItems: "",
        addCss: {},
      },
      leftBtn: {
        id: 1,
        title: "back",
        icon: "arrow_back_ios",
        goto: this.backRecord,
        propItems: "",
        addCss: {},
      },

      /**
       * //methods data
       */
      activityTitle: "",
      selectBike: "",
      ownBikeList: ["BikeTaro", "BikeZirou"],
      upImageURI: "",
      isImageShow: false,

      uploadedImagesForView: [],
      uploadedImages: [],
    };
  },
  computed: {},
  methods: {
    initMap() {
      let id = "leafletMapFinish";
      let tile_openStreetMap = new L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution:
            '© <a href="http://osm.org/copyright">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        }
      );
      let options = {
        center: [35.6831925, 139.7511307],
        zoom: 13,
        layers: [tile_openStreetMap],
        zoomControl: false,
      };
      let myMapFinish = L.map(id, options);
    },
    getPictureFromAlbum() {
      let onSuccess = (imageURI) => {
        console.log("imageURI", imageURI, this);
        this.upImageURI = imageURI;
        this.isImageShow = true;
      };
      let onFailed = (error) => {
        console.error("this is error:", error);
      };

      let options = {
        quality: 50,
        destinationType: navigator.camera.DestinationType.FILE_URI,
        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit: false,
        encodingType: navigator.camera.EncodingType.JPEG,
        targetWidth: 100, //px
        targetHeight: 100, //px,
        mediaType: navigator.camera.MediaType.ALLMEDIA, //only use except pictureSourceType.CAMERA
        correctOrientation: false,
        saveToPhotoAlbum: false,
      };
      window.navigator.camera.getPicture(onSuccess, onFailed, options);
    },
    inputFileList(event) {
      const fileList = event;
      console.log("fileList", fileList);
      this.uploadedImages = fileList;
      fileList.forEach((file) => {
        this.createImage(file);
      });
    },
    createImage(file) {
      // アップロードした画像を表示
      this.isImageShow = true;
      let reader = new FileReader();
      reader.onload = (e) => {
        var uploadedImage = e.target.result;
        this.uploadedImagesForView.push(uploadedImage);
      };
      reader.readAsDataURL(file);
    },
    deletePhoto(id) {
      if (window.confirm("削除しますか？")) {
        this.uploadedImagesForView.splice(id, 1);
        this.uploadedImages.splice(id, 1);

        if (this.uploadedImagesForView.length <= 0) {
          this.isImageShow = false;
        }
      }
    },
    backRecord() {
      this.$emit("backRecord");
    },
    saveActivity() {
      window.alert("保存しました");
      this.$router.push("/");
    },
    deleteActivity() {
      if (window.confirm("アクティビティを削除しますか？")) {
        this.$router.push("/");
      }
    },
  },
  watch: {},
  beforeCreate() {},
  mounted() {
    this.initMap();
  },
  components: {
    TopHeader,
  },
};
</script>

<style lang="scss">
#finishDisplay {
  $footer-height__here: 15vh;
  $font-size__here: 4vh;
  $title-region: 0.4;
  $content-region: 0.6;
  $add-info-region: 0.2;
  $title-font-size: 0.1;
  height: calc(100vh - #{$__header-tab-height} - #{$__footer-tab-height});
  overflow-y: scroll !important;
  .map-content {
    // margin-top: $__header-tab-height;
    width: 100vw;
    height: 30vh;
  }

  .activity-info-container {
    height: 8vh;
    padding: 0.5vh;
    background-color: lightgrey;
    line-height: 0;
    .row:first-child {
      height: 100%;
    }
    .col {
      height: 100%;
    }
    .running-time-container {
      // $running-time-height: 100vh- $__header-tab-height- $__footer-tab-height-100vw;
      $running-time-height: 100%;
      $running-time-font-size: $font-size__here;
      height: $running-time-height;
      border-left: solid 1px gray;
      .row:nth-child(1) {
        height: $running-time-height * $title-region !important;
      }
      .row:nth-child(2) {
        height: $running-time-height * $content-region !important;
      }
      .title {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: $running-time-font-size * $title-region !important;
      }
      .content {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: $running-time-font-size * $content-region;
      }
    }
    .average-velocity-container {
      $average-velocity-height: 100%;
      $average-velocity-font-size: $font-size__here;
      height: $average-velocity-height;
      border-left: solid 1px gray;
      .row:nth-child(1) {
        height: $average-velocity-height * $title-region !important;
      }
      .row:nth-child(2) {
        height: $average-velocity-height * $content-region !important;
      }
      .title {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: $average-velocity-font-size * $title-region !important;
      }
      .content {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: $average-velocity-font-size * $content-region;
      }
    }
    .running-length-container {
      $running-length-height: 100%;
      $running-length-font-size: $font-size__here;
      height: $running-length-height;
      // border-right: solid 1px gray;
      .row:nth-child(1) {
        height: $running-length-height * $title-region !important;
      }
      .row:nth-child(2) {
        height: $running-length-height * $content-region !important;
      }
      .title {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: $running-length-font-size * $title-region !important;
      }
      .content {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: $running-length-font-size * $content-region;
      }
    }
  }

  #edit-container {
    .ride-feel-container {
      border: solid 1px black;

      .title {
        height: 2em;
        text-align: center;
        border: solid 1px black;
        margin-bottom: 2vh;
      }
      .ride-feel {
        display: flex;
        justify-content: center;
        align-items: center;
        .v-btn {
          width: 90%;
        }
      }
    }

    .btn-add-photo {
      height: 15vh;
    }
    #uploadPhoto2box {
      $photo-add-container-height: 15vh;
      $photo-square-size: 10vh;

      position: relative;
      height: $photo-add-container-height;

      // .v-input__control   .v-text-field__slot {
      //   height: $photo-add-container-height;
      //   // z-index: 100;
      // }

      .v-file-input__text {
        display: none;
      }
      .grid-container-uploaded-image {
        position: absolute;
        width: minmax(
          $photo-square-size,
          calc(100vw - 12px - 33px - 3vw - 6vw)
        );
        top: 50%;
        left: calc(33px + 3vw);
        transform: translate(0%, -50%);
        display: grid;
        grid-template-rows: $photo-add-container-height - 5;
        grid-auto-columns: $photo-square-size;
        column-gap: 1vh;
        overflow-x: scroll;
        * {
          grid-row: 1;
        }
      }

      .uploaded-photo {
        height: $photo-square-size;
        width: $photo-square-size;
      }
    }
  }

  .btn-activity-container {
    width: 100%;
    height: $__footer-tab-height;
    display: flex;
    justify-content: center;
    align-items: center;
    .btn-activity {
      width: 80%;
      height: 50%;
      display: flex;
      justify-content: center;
      align-items: center;

      // .btn-abord-activity {
      // }
      // .btn-save-activity {
      // }
    }
  }

  .v-footer {
    height: $__footer-tab-height !important;
    padding: 0;
  }

  .test-photo-box {
    width: 10vh;
    height: 10vh;
    background-color: #fcc;
    border: solid 1px black;
  }
}
</style>
