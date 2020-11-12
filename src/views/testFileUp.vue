<template>
  <div>
    <v-card-actions>
      <v-btn flat icon @click="pickImage">
        <v-icon class="primary--text">add_a_photo</v-icon>
      </v-btn>
      <input
        type="file"
        style="display: none;"
        ref="image"
        v-on:change="onFileChange"
        mulitple="multiple"
      />
    </v-card-actions>
    <v-card-text>
      <div v-for="(uploadedImage,id) in uploadedImagesForView" class="uploadImage" :key="id">
        <v-btn fab dark small color="primary" @click="clearImage(id)">
          <v-icon>clear</v-icon>
        </v-btn>
        <img :src="uploadedImage" />
      </div>
      <div v-show="uploadedImagesForView.length>0" class="uploadImage">
        <v-btn fab color="primary" @click="pickImage">
          <v-icon>add_a_photo</v-icon>
        </v-btn>
      </div>
    </v-card-text>
    <p class="container">
      <v-btn
        block
        large
        class="red"
        v-bind:class="{'accent-1' : post.content.length ==0}"
        dark
        @click="postContent"
      >
        <v-icon>edit</v-icon>投稿する
      </v-btn>
    </p>
  </div>
</template>

<script>
// import TopFooter from "@/components/TopFooter.vue";

// import axios from "axios";
let fileMaxSize = 2000000;
let fileMaxCount = 5;
let fileExtensions = ["jpg", "jpeg", "png", "bmp", "gif"];
export default {
  name: "PostView",
  data() {
    return {
      post: {
        type: "",
        content: "",
        uid: "",
        uploadedImages: [],
      },
      dialog: false,
      uploadedImagesForView: [],
      isError: false,
      errorMessage: "",
    };
  },
  mounted() {
    var user = firebase.auth().currentUser;
    this.post.uid = user.uid;
  },
  methods: {
    postContent: function () {
      // 入力がなければ何もしない。
      if (this.post.content.length === 0 || this.post.type === "") {
        return;
      }
      this.dialog = true;
      this.addPost();
    },
    setType: function (tmp) {
      this.post.type = tmp;
    },
    addPost: async function () {
      let config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      var formData = new FormData();
      formData.append("type", this.post.type);
      formData.append("content", this.post.content);
      formData.append("uid", this.post.uid);
      for (var i = 0; i < this.post.uploadedImages.length; i++) {
        var name = "uploadedImages[" + i + "]";
        formData.append(name, this.post.uploadedImages[i]);
      }
      await axios
        .post("http://localhost:20000/addPost", formData, config)
        .then((response) => {
          this.dialog = false;
          alert("Thank you !!　投稿しました");
          this.$router.push("/");
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    // ファイル選択を表示
    pickImage() {
      this.$refs.image.click();
    },
    // ファイルアップが完了したら動作
    onFileChange(e) {
      let files = e.target.files || e.dataTransfer.files;
      // ファイルのチェック
      // ファイルタイプ
      var myFileType = files[0].type;
      var fileTypeCheck = false;
      for (var i = 0; i < fileExtensions.length; i++) {
        var fileExtension = fileExtensions[i];
        if (myFileType.indexOf(fileExtension) > -1) {
          fileTypeCheck = true;
          break;
        }
      }
      if (!fileTypeCheck) {
        this.isError = true;
        this.errorMessage = "アップロードできるファイルは画像のみです。";
        return;
      }
      // ファイルサイズ
      if (files[0].size > fileMaxSize) {
        this.isError = true;
        this.errorMessage = "ファイルサイズが大きすぎます。";
        return;
      }
      // ファイル枚数
      if (this.post.uploadedImages.length + 1 > fileMaxCount) {
        this.isError = true;
        this.errorMessage =
          "アップロードできるファイルは最大" + fileMaxCount + "ファイルです。";
        return;
      }
      this.post.uploadedImages.push(files[0]);
      this.createImage(files[0]);
    },
    // アップロードした画像を表示
    createImage(file) {
      let reader = new FileReader();
      reader.onload = (e) => {
        var uploadedImage = e.target.result;
        this.uploadedImagesForView.push(uploadedImage);
      };
      reader.readAsDataURL(file);
    },
    clearImage(id) {
      this.uploadedImagesForView.splice(id, 1);
      this.post.uploadedImages.splice(id, 1);
    },
  },
  components: {},
};
</script>

<style lang="scss"></style>
