<template>
  <div id="itemList">
    <!-- <v-row no-gutters v-for="item in listItems" :key="item.id"> -->
    <v-divider></v-divider>

    <v-list subheader>
      <div v-for="listItem in listItems" :key="listItem.id">
        <div class="list__normal" v-if="listItem.subItems === null">
          <v-subheader v-if="listItem.attribute === 'title'">{{
            listItem.title
          }}</v-subheader>
          <!-- <v-list-item-group color="primary"> -->
          <v-list-item class="btn" v-if="listItem.attribute !== 'title'">
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

            <v-list-item-content @click="clickedItem(listItem)">
              <v-list-item-title v-text="listItem.title"></v-list-item-title>
            </v-list-item-content>

            <v-list-item-icon v-if="listItem.iconRight !== null">
              <v-icon class="material-icons">{{ listItem.iconRight }}</v-icon>
              <!-- :color="listItem.active ? 'deep-purple accent-4' : 'grey'" -->
            </v-list-item-icon>
          </v-list-item>
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
              @click="clickedItem(subItem)"
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

              <v-list-item-content @click="clickedItem(subItem)">
                <v-list-item-title v-text="subItem.title"></v-list-item-title>
              </v-list-item-content>

              <v-list-item-icon v-if="subItem.iconRight !== null">
                <v-icon>{{ subItem.iconRight }}</v-icon>
                <!-- :color="listItem.active ? 'deep-purple accent-4' : 'grey'" -->
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
        </div>
      </div>
    </v-list>
    <v-divider></v-divider>
  </div>
</template>

<script>
export default {
  props: {
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
          },
        ];
      },
    },
  },
  data() {
    return { tes: "tes" };
  },
  methods: {
    clickedItem(listItem) {
      // listItem.active = !listItem.active;
      if (typeof listItem.goto === "function") {
        listItem.goto();
      } else if (listItem.goto === null) {
        //none
      } else if (listItem.propItems === null) {
        this.$router.push({ name: listItem.goto });
      } else {
        this.$router.push({ name: listItem.goto, params: listItem.propItems });
      }
    },
  },
};
</script>

<style lang="sass" scoped>
// #itemList {

// }
</style>
