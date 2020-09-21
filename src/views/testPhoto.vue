<template>
  <div>
    <v-btn @click="getPicture01()">getpicture1</v-btn>
    <v-btn @click="getPicture02()">getpicture2 SAVEDPHOTOALBUM</v-btn>
    <v-btn @click="getPicture03()">getpicture3 PHOTOLIBRARY</v-btn>

    <v-btn @click="capturePhoto()">写真を撮影</v-btn>
    <br />
    <v-btn @click="capturePhotoEdit()">写真を撮影して編集</v-btn>
    <br />
    <v-btn @click="getPhoto(pictureSource.PHOTOLIBRARY)">フォトライブラリから取得</v-btn>
    <br />
    <v-btn @click="getPhoto(pictureSource.SAVEDPHOTOALBUM)">フォトアルバムから取得</v-btn>
    <br />
    <img style="display:none;width:60px;height:60px;" id="smallImage" src />
    <img style="display:none;" id="largeImage" src />
    <v-btn @click="tes()">check state</v-btn>
  </div>
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
      pictureSourceType: "", // 写真ソース
      destinationType: "", // 戻り値のフォーマット
      imageData: "",
    };
  },
  computed: {},
  methods: {
    tes() {
      console.log(
        "check",
        this.pictureSource,
        this.destinationType,
        this.teee
        // this.imageData
      );
    },
    onFail(message) {
      alert("エラーが発生しました: " + message);
    },
    getPicture03() {
      let onSuccess = (imageURI) => {
        console.log("imageURI", imageURI);
      };
      let onFailed = (error) => {
        console.error("this is error:", error);
      };
      let options = {
        quality: 50,
        destinationType: this.destinationType.FILE_URI,
        sourceType: this.pictureSourceType.PHOTOLIBRARY,
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
    getPicture02() {
      let onSuccess = (imageURI) => {
        console.log("imageURI", imageURI);
      };
      let onFailed = (error) => {
        console.error("this is error:", error);
      };
      let options = {
        quality: 50,
        destinationType: this.destinationType.FILE_URI,
        sourceType: this.pictureSourceType.SAVEDPHOTOALBUM,
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
    getPicture01() {
      let onSuccess = (imageURI) => {
        console.log("imageURI", imageURI);
      };
      let onFailed = (error) => {
        console.error("this is error:", error);
      };
      let options = {
        quality: 50,
        destinationType: this.destinationType.FILE_URI,
        sourceType: this.pictureSourceType.CAMERA,
        allowEdit: false,
        encodingType: navigator.camera.EncodingType.JPEG,
        targetWidth: 100, //px
        targetHeight: 100, //px,
        // mediaType: navigator.camera.MediaType.ALLMEDIA, //only use except pictureSourceType.CAMERA
        correctOrientation: false,
        saveToPhotoAlbum: false,
      };
      window.navigator.camera.getPicture(onSuccess, onFailed, options);
    },
    onPhotoDataSuccess(imageData) {
      // 下記のコメントを外すことで Base64 形式のデータをログに出力
      // console.log(imageData);

      // 画像ハンドルを取得
      //
      var smallImage = window.document.getElementById("smallImage");

      // 画像要素を表示
      //
      smallImage.style.display = "block";

      // 取得した写真を表示
      // 画像のリサイズにインライン CSS を使用
      //
      smallImage.src = "data:image/jpeg;base64," + imageData;
      this.imageData = smallImage.src;
    },
    capturePhoto() {
      // 写真の撮影に成功した場合 (URI 形式)
      //
      console.log(
        "navigator.camera.DestinationType2",
        window.navigator.camera.DestinationType,
        this.destinationType
      );
      // 編集が許可された写真を撮影し、 Base64 形式のイメージとして取得する場合
      window.navigator.camera.getPicture(this.onPhotoDataSuccess, this.onFail, {
        quality: 50,
        destinationType: window.navigator.camera.DestinationType.DATA_URL,
      });
    },

    capturePhotoEdit() {
      // ボタンがクリックされた場合の処理
      //
      // 編集が許可された写真を撮影し、 Base64 形式のイメージとして取得する場合
      window.navigator.camera.getPicture(this.onPhotoDataSuccess, this.onFail, {
        quality: 20,
        allowEdit: true,
        destinationType: window.navigator.camera.destinationType.DATA_URL,
      });
    },
    getPhoto(source) {
      // ボタンがクリックされた場合の処理
      //
      // 写真をファイル URI として取得する場合

      // 写真の撮影に成功した場合 (URI  形式)
      //
      function onPhotoURISuccess(imageURI) {
        // 下記のコメントを外すことでファイル URI をログに出力
        // console.log(imageURI);

        // 画像ハンドルを取得
        //
        var largeImage = document.getElementById("largeImage");

        // 画像要素を表示
        //
        largeImage.style.display = "block";

        // 取得した写真を表示
        // 画像のリサイズにインライン CSS を使
        //
        largeImage.src = imageURI;
      }

      window.navigator.camera.getPicture(onPhotoURISuccess, this.onFail, {
        quality: 50,
        destinationType: window.navigator.camera.DestinationType.FILE_URI,
        sourceType: source,
      });
    },
  },
  watch: {},
  beforeCreate() {},
  created() {
    // Cordova 準備完了
    //
    let onDeviceReady = () => {
      console.log(this);
      this.pictureSourceType = window.navigator.camera.PictureSourceType;
      this.destinationType = window.navigator.camera.DestinationType;
    };

    // Cordova がデバイスと接続するまで待機
    //
    window.document.addEventListener("deviceready", onDeviceReady, false);
  },
  components: {},
};
</script>

<style lang="scss"></style>
