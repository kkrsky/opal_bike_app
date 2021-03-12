<template>
  <div id="ItemList">
    <!-- <v-row no-gutters v-for="item in listItems" :key="item.id"> -->
    <!-- <v-divider color="white"></v-divider> -->
    <div :class="listItem.isDisable ? 'disable-all' : null">
      <v-list subheader color="custom-color">
        <div class="list__normal" v-if="listItem.subItems === null">
          <v-subheader v-if="listItem.attribute === 'title'">{{
            listItem.title
          }}</v-subheader>
          <!-- <v-list-item-group color="primary"> -->
          <v-list-item
            :class="listItem.isDisable ? null : 'btn'"
            v-if="listItem.attribute === 'item'"
          >
            <v-list-item-avatar
              v-if="
                listItem.iconLeft !== null && listItem.pictureLeftSrc === null
              "
            >
              <v-icon class="material-icons">{{ listItem.iconLeft }}</v-icon>
            </v-list-item-avatar>
            <v-list-item-avatar v-if="listItem.pictureLeftSrc !== null">
              <v-img :src="listItem.pictureLeftSrc"></v-img>
            </v-list-item-avatar>

            <v-list-item-content
              @click="listItem.isDisable ? null : clickedItem(listItem)"
            >
              <v-list-item-title v-text="listItem.title"></v-list-item-title>
            </v-list-item-content>

            <v-list-item-icon v-if="listItem.iconRight !== null">
              <v-icon class="material-icons">{{ listItem.iconRight }}</v-icon>
              <!-- :color="listItem.active ? 'deep-purple accent-4' : 'grey'" -->
            </v-list-item-icon>
          </v-list-item>

          <v-dialog
            v-model="dialog.isDialog"
            scrollable
            max-width="300px"
            id="Dialog"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-list-item
                :class="listItem.isDisable ? null : 'btn'"
                v-if="listItem.attribute === 'dialog'"
              >
                <v-list-item-avatar
                  v-if="
                    listItem.iconLeft !== null &&
                      listItem.pictureLeftSrc === null
                  "
                >
                  <v-icon class="material-icons">{{
                    listItem.iconLeft
                  }}</v-icon>
                </v-list-item-avatar>
                <v-list-item-avatar v-if="listItem.pictureLeftSrc !== null">
                  <v-img :src="listItem.pictureLeftSrc"></v-img>
                </v-list-item-avatar>

                <v-list-item-content
                  @click="listItem.isDisable ? null : clickedItem(listItem)"
                  v-bind="listItem.isDisable ? null : attrs"
                  v-on="listItem.isDisable ? null : on"
                >
                  <v-list-item-title
                    v-text="listItem.title"
                  ></v-list-item-title>
                </v-list-item-content>

                <v-list-item-icon v-if="listItem.iconRight !== null">
                  <v-icon class="material-icons">{{
                    listItem.iconRight
                  }}</v-icon>
                  <!-- :color="listItem.active ? 'deep-purple accent-4' : 'grey'" -->
                </v-list-item-icon>
              </v-list-item>
            </template>
            <v-card>
              <div
                v-for="dialogObj in autoLoadData.dialogList"
                :key="dialogObj.id"
              >
                <!-- <v-card-title
                v-if="autoLoadData.dialogList[0].attribute === 'title'"
                >{{ autoLoadData.dialogList[0].label }}</v-card-title
              > -->
                <div v-show="dialogObj.attribute === 'title'">
                  <v-card-title>{{ dialogObj.label }}</v-card-title>
                  <v-divider></v-divider>
                </div>
                <v-card-text
                  v-show="dialogObj.attribute === 'item'"
                  class="list-item__dialog"
                >
                  <v-radio-group v-model="dialog.selected" column>
                    <!-- <v-radio label="Bangladesh" value="bangladesh"></v-radio> -->

                    <v-radio
                      :label="dialogObj.label"
                      :value="dialogObj.value"
                      :key="dialogObj.id"
                      @click="click_dialog(dialogObj.id)"
                    ></v-radio>
                  </v-radio-group>
                </v-card-text>
              </div>
            </v-card>
          </v-dialog>
        </div>
        <div class="list__dropdown" v-if="listItem.subItems !== null">
          <v-list-group
            v-model="listItem.active"
            :prepend-icon="listItem.iconLeft"
            no-action
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title v-text="listItem.title"></v-list-item-title>
              </v-list-item-content>
            </template>

            <v-list-item
              v-for="subItem in listItem.subItems"
              :key="subItem.id"
              @click="listItem.isDisable ? null : clickedItem(subItem)"
            >
              <v-list-item-avatar
                v-if="
                  subItem.iconLeft !== null && subItem.pictureLeftSrc === null
                "
              >
                <v-icon class="material-icons">{{ subItem.iconLeft }}</v-icon>
              </v-list-item-avatar>
              <v-list-item-avatar v-if="subItem.pictureLeftSrc !== null">
                <v-img :src="subItem.pictureLeftSrc"></v-img>
              </v-list-item-avatar>

              <v-list-item-content
                @click="listItem.isDisable ? null : clickedItem(subItem)"
              >
                <v-list-item-title v-text="subItem.title"></v-list-item-title>
              </v-list-item-content>

              <v-list-item-icon v-if="subItem.iconRight !== null">
                <v-icon>{{ subItem.iconRight }}</v-icon>
                <!-- :color="listItem.active ? 'deep-purple accent-4' : 'grey'" -->
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
        </div>
      </v-list>
      <v-divider v-if="listItem.attribute === 'title'"></v-divider>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    listItem: {
      type: Object,
    },
    listItems: {
      type: [Object, Array],
      default: () => {
        return [
          {
            id: 1,
            attribute: "title", //リストの属性
            title: "this is TopTitle", //表示するタイトル
            iconRight: null,
            iconLeft: null,
            pictureLeftSrc: null, //左側にアイコン画像
            goto: null, //遷移先のページ(routerを使う場合はname,クリック時に実行する関数でも可能)
            propItems: null, //クリックした時に次のcomponentまたは関数に渡すアイテム(未実装)
            addCss: {}, //固有リストにCSSを適応
            active: false, //クリック時にactiveになる(未実装)
            subItems: null, //null以外はドロップダウン型のリストになる
            isDisable: false, //リストボタンが押せなくなる
            reload: 0, //コンポーネント更新用
          },
          {
            id: 2,
            attribute: "item",
            title: "item1",
            iconRight: "arrow_forward_ios",
            iconLeft: "info",
            pictureLeftSrc: null,
            goto: null,
            propItems: null,
            addCss: {},
            active: false,

            subItems: [
              {
                id: 1,
                attribute: "item",
                title: "subitem1",
                iconRight: null,
                iconLeft: "map",
                pictureLeftSrc: null,
                goto: null,
                propItems: null,
                addCss: {},
                active: false,
              },
              {
                id: 2,
                attribute: "item",
                title: "subitem2",
                iconRight: null,
                iconLeft: null,
                pictureLeftSrc: null,
                goto: null,
                propItems: null,
                addCss: {},
                active: false,
              },
            ],
            isDisable: false,
            reload: 0,
          },
          {
            id: 3,
            attribute: "item",
            title: "item2",
            iconRight: "arrow_forward_ios",
            iconLeft: "info",
            pictureLeftSrc: null,
            goto: null,
            propItems: null,
            addCss: {},
            active: false,
            subItems: null,
            isDisable: false,
            reload: 0,
          },
          {
            id: 4,
            attribute: "item",
            title: "item3",
            iconRight: "arrow_forward_ios",
            iconLeft: "info",
            pictureLeftSrc: null,
            goto: null,
            propItems: null,
            addCss: {},
            active: false,
            subItems: [
              {
                id: 1,
                attribute: "item",
                title: "subitem1",
                iconRight: "arrow_forward_ios",
                iconLeft: "map",
                pictureLeftSrc: null,
                goto: null,
                propItems: null,
                addCss: {},
                active: false,
              },
              {
                id: 2,
                attribute: "item",
                title: "subitem2",
                iconRight: "arrow_forward_ios",
                iconLeft: "map",
                pictureLeftSrc: null,
                goto: null,
                propItems: null,
                addCss: {},
                active: false,
              },
            ],
            isDisable: false,
            reload: 0,
          },
          {
            id: 5,
            attribute: "dialog",
            title: "ECOモード",
            iconRight: "arrow_forward_ios",
            iconLeft: "flag",
            pictureLeftSrc: null,
            goto: null,
            propItems: null,
            addCss: {},
            active: false,
            subItems: null,
            isDisable: false,
            reload: 0,
          },
        ];
      },
    },
  },
  data() {
    return {
      tes: "tes",
      dialog: { isDialog: false, selected: "" },
      autoLoadData: {
        dialogList: [],
      },
    };
  },
  methods: {
    clickedItem(listItem) {
      //goto が関数であれば、それを実行する
      // listItem.active = !listItem.active;
      if (typeof listItem.goto === "function") {
        listItem.goto(listItem.propItems);
      } else if (listItem.goto === null) {
        //none
      } else if (listItem.propItems === null) {
        this.$router.push({ name: listItem.goto });
      } else {
        this.$router.push({ name: listItem.goto, params: listItem.propItems });
      }
    },
    autoLoad() {
      //propsのデータをscopedのdataにロードする。
      // this.listItems.forEach((data) => {
      //   if (data.attribute === "dialog") {
      //     this.autoLoadData.dialogList = data.propItems;
      //   }
      // });
      // console.log(this.listItem.id);
      if (this.listItem.attribute === "dialog") {
        this.autoLoadData.dialogList = this.listItem.propItems;
      }
    },
    clicked(item) {
      //任意の要素がクリックされた時に発動する関数
    },
    click_dialog(dialogId) {
      //dialogがクリックされた時に発動する関数

      this.dialog.isDialog = false;
      let findObj = this.autoLoadData.dialogList.find((val) => {
        return val.id === dialogId;
      });
      this.$emit("click_dialog", findObj);
    },
  },
  mounted() {
    this.autoLoad();
    // console.log(this.listItem);
  },
};
</script>

<style lang="scss" scoped>
#ItemList {
  .disable-all {
    background-color: rgba(190, 190, 190, 0.5);
    * {
      color: rgba(190, 190, 190, 1) !important;
    }
  }
  .custom-color {
    // background-color: aquamarine;
    // border-color: aqua;
    opacity: 0.8;
  }
}
.v-dialog {
  background-color: red;

  .list-item__dialog {
    padding: 0 1rem !important;
  }
}
</style>
